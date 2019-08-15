#!/usr/bin/env node

import * as Lgl from "../lib/Lgl"
import * as fs from "fs"
import * as _ from "lodash"
import * as path from "path"
import * as findUp from "find-up"
import * as prompts from "prompts"
const rp = require("request-promise")

//lgl --world=somefile.json command subcommand

// --world=somefile.json
// command: string
// subcommand: string

// $ lgl query "are vehicles allowed in the park?"
// it depends

const cli_help = `usage: lgl [help] command subcommand ...
commands:
    query "question string"
    help
    init
    login      recover lglconfig.json using password
    config
    demo
    bizfile / corpsec
    proforma

options:
    --test                  all commands will run in test mode against the dev sandbox
    --verbose               verbose logging
    --world=some.json       load environment context from some.json file
    --config=conf.json      load configuration from conf.json file (default: ./lglconfig.json)

environment variables:
    LGL_VERBOSE   set to truthy to get more verbosity
`;

const cli_help_commands = {
    proforma: `subcommands for lgl proforma:
    schemalist       list all available templates, in "key: title" format
    schemalist key   show detailed example for a specific template, in json
    schema     key   show the JSON schema for the expected input
    validate   key   STDIN should be JSON data; will validate against the server
                     note that you can also do client-side validation, since the SDK
                     contains all the schemas
    generate         see: lgl help proforma generate
`,
    corpsec: `subcommands for lgl corpsec:
    search companyname
    get    UEN
`,
    demo: `subcommands for lgl demo:
    demo all
    demo corpsec
    demo proforma
`,
    init: `lgl init <email>
    Sets up an account at the Legalese backend using <email>.
    The backend returns credentials including API keys.
    Saves credentials to lglconfig.json in the current directory
    Prompts you for a password; if you ever lose your lglconfig.json,
        you will need this password to regenerate it.
`,
  login: `lgl login <email>
    If you've accidentally lost your lglconfig.json file,
    you can repopulate it from the server by logging in with
    the email and password you previously set up.
`,
    config: `subcommands for lgl config:
    foo=bar    save foo=bar to config
    foo        show value of foo
`,
};

const cli_help_subcommands = {
    proforma: {
        schemalist: `sub-subcommands for lgl proforma schemalist:
    key         show detailed example for a specific template, in JSON
`,
        generate: `sub-subcommands for lgl proforma generate:
    key   STDIN should be JSON data; will fill a template
    generate   key --filetype="docx"    save as Word docx file
    generate   key --filetype="pdf"     save as PDF file
    generate   key --filetype="pdf" --filename="myfilename" save as myfilename.pdf

options for proforma generate:
    --filepath='some-file'  specify filepath for proforma template call
    --filename='some-file'  specify write output of proforma template call
    --filetype='.json'      specify filetype for proforma document generation
`
    },
}

var argv = require('minimist')(process.argv, {
    boolean: ["test", "t",
              "verbose", "v", "vv",
              "help","h"
             ]
});
if (argv.help || argv.h) { argv._.splice(2,0,"help") }

const LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv
const LGL_TEST = process.env.LGL_TEST || argv.test || argv.t
const URI_BASE = (process.env.LGL_URI ? process.env.LGL_URI :
    LGL_TEST
        ? `https://api.legalese.com/api/test/corpsec/v1.0`
        : `https://api.legalese.com/api/corpsec/v1.0`)

const arg_filepath = process.env.PROFORMA_FP || argv.filepath || argv.fp
const arg_json = process.env.PROFORMA_JSON || argv.json
const PROFORMA_FILETYPE = process.env.PROFORMA_FILETYPE || argv.filetype

function console_error(str: string) {
    if (LGL_VERBOSE) { console.error(str) }
}

var arg_command = argv._[2];
console_error(`command: ${arg_command}`);
var arg_subcommand = argv._[3];
if (arg_subcommand) {
    console_error(`subcommand: ${arg_subcommand}`);
}
var arg_subsubcommand = argv._[4];
if (arg_subsubcommand) {
    console_error(`subsubcommand: ${arg_subsubcommand}`);
}

console_error(argv);

let config_file: string | null
if (LGL_TEST) {
    console_error("lgl: running in test mode; will use test-config.json");
    config_file = json_filename("test-config.json")
    if (argv.config) { console_error(`ignoring user-provided config file name ${argv.config} in favour of test-config.json`) }
}
else {
    config_file = json_filename("lglconfig.json")
}

interface Config {
    email?: string;
    user_id?: string;
    v01_live_api_key?: string;
    v01_test_api_key?: string;
    potato?: string | number;
}

interface World {
}

let config: Config
if (config_file != undefined) { config = <Config>load_json(<string>config_file); }
else { config = {} }
const world: (World | null) = <World>load_world();

if (arg_command == "help") {
    if (arg_subcommand && cli_help_commands[arg_subcommand]
        && // subsubcommand
        argv._[4] && cli_help_subcommands[arg_subcommand][argv._[4]]) {
        console.log(cli_help_subcommands[arg_subcommand][argv._[4]])
    }
    else if (arg_subcommand && cli_help_commands[arg_subcommand]) { console.log(cli_help_commands[arg_subcommand]) }
    else {
        console.log(cli_help + "\n\ntry: lgl help demo\n");
    }
}
else if (arg_command == "init") {
    run_init()
}
else if (arg_command == "config") {
    run_config()
}
else if (arg_command == "demo") {
    console.log(`a painless introduction to a painful subject`);
    run_demo()
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
    check_config();
    console.log(`interface with the government's Department of Information Retrieval`);
    run_corpsec()
}
else if (arg_command == "proforma") {
    check_config();
    // console.log(`fill templates into documents, and beyond`);
    run_proforma()
}
else if (arg_command == "query") {
    check_config();
    run_query()
}
else {
    console.error(cli_help);
}

function check_config() {
    if (!config_file) {
        console.error("lgl: can't find config file; system has not been initialized. run lgl init");
        process.exit(1);
    }

    if (!config.user_id) {
        console.error("lgl: can't load config file; system has not been initialized. run lgl init");
        process.exit(2);
    }
}

///////////////////////////////////////////////////////////////////////////// init

async function run_init() {
  // usage: lgl init user@email.address
  // we prompt for a password which we send to the server
  //
    // the backend hands us one or more API keys
    // we save the API keys to lglconfig.json
    // give the end-user to an opportunity to verify their email address against auth0 by clicking the link
    // after they've done that, our API backend should be able to query auth0 and find that the email address is verified
    // and the user_id corresponds to that email address.

    // if we already have a config file then refuse to init; ask them to delete.
  // after running init we save to the config file
  //
  // do we also save the password they gave us, into the config file? no. if they forget the password, they have to run lgl forgot.

    if (config_file && fs.existsSync(config_file)) {
        console.error(`lgl: init: config file ${config_file} already exists; refusing to init.
    If you are sure you want to re-initialize,
    and you are prepared to create a new account with a different email address,
    delete ${config_file} and run init again with the new email address.
    Or just go to a different directory, without a ${config_file} file, and lgl init.`);
        process.exit(1);
    } else if (config_file) {
        console_error(`config_file is defined: ${config_file}`);
    }
    else {
        config_file = LGL_TEST ? "test-config.json" : "lglconfig.json"
        console_error(`config_file is not defined! will proceed with ${config_file} in current directory.`);
    }

  
  // prompt user for password
  const prompt_pw = await prompts.prompt([{
    type:'password',
    name:'pw1',
    message: "Enter new password: "},
                                          {
    type:'password',
    name:'pw2',
      message: "Confirm password: "}]);
  if (prompt_pw.pw1 != prompt_pw.pw2) {
    console.error("Passwords did not match. Try again.");
    process.exit(1);
  }
  
    let api_response
  try { api_response = await rp({ method: 'POST', uri: URI_BASE + "/users/create", body: { email: arg_subcommand, password: prompt_pw.pw1 }, json: true }) }
    catch (e) { console.error(`lgl: error while calling API /create`); console.error(e); process.exit(1); }
    // TODO: add validation here! let's see if the response from the API was what we expected.

    if (api_response === null) {
        console.error("lgl: got null response from API");
        process.exit(1)
    }
    if (api_response.api_error || api_response.response_defined == false) {
        console.error("lgl: got error from API:");
        console.error(api_response.api_error + "\n");
        process.exit(1)
    }

    // if the user already exists according to auth0 but the user deleted their lglconfig.json
    // they will refuse to create a new account. Instead we will get a 409.
    // the /create api needs to hand us an intelligible error message
    // and we can pass that on the user and instruct them to run a different command -- rekey? lostkey?

    if (LGL_TEST) {
        fs.writeFileSync(config_file, JSON.stringify(
            {
                "potato": "3",
                "email": "demo-20190808@example.com",
                "orig_email": arg_subcommand,
                "user_id": "auth0|5d4c03aa302f420cc73dcc05",
                "v01_test_api_key": "",
                "v01_live_api_key": ""
            }
            , null, 2) + "\n");
    } else {
        // https://auth0.com/docs/integrations/using-auth0-to-secure-a-cli
        // call the api.legalese.com/api/lgl-init endpoint to write an entry into our users database
        // run an authorization loop against auth0
        // lgl client creates a random password; creates an auth0 account using that username and passwrod
        fs.writeFileSync(config_file, JSON.stringify({
            "email": api_response.email,
            "user_id": api_response.user_id, // this error doesn't stop compilation.
            "v01_live_api_key": _.keys(api_response.app_metadata.v01_live_api_keys)[0],
            "v01_test_api_key": _.keys(api_response.app_metadata.v01_test_api_keys)[0],
        }, null, 2) + "\n");
    }
  console.log("now look for a verification email from auth0")
}

///////////////////////////////////////////////////////////////////////////// config

function run_config() {
    // lgl config foo=bar // setter
    // lgl config foo     // getter

    if (arg_subcommand) {
        if (/=/.test(arg_subcommand)) {
            let mymatch = arg_subcommand.match(/(\w+)=(.*)/);
            console_error(`will config set ${mymatch[1]} = ${mymatch[2]}`);

            let newconfig = <object>_.cloneDeep(config)
            newconfig[<string>mymatch[1]] = mymatch[2]

            if (LGL_TEST) {
                console.error("warning: writing to test config file, proceed at your own risk. you can always lgl --test init");
                // sleep(5000)
            }
            fs.writeFileSync(<string>config_file, JSON.stringify(newconfig, null, 2) + "\n");
            config = newconfig;
        }
        else {
            if (config[arg_subcommand]) {
                console.log(config[arg_subcommand])
            }
            else {
                console.log("undefined")
            }
        }
    } else {
        console.log(JSON.stringify(config, null, 2));
    }
}

///////////////////////////////////////////////////////////////////////////// demo

function run_demo() {
}

///////////////////////////////////////////////////////////////////////////// corpsec / bizfile

function run_corpsec() {
}

///////////////////////////////////////////////////////////////////////////// proforma

interface Schemalist { about: { filepath: string, title: string } } // this is a bit of a repeat; later, when we have full type definitions from schematemplates, shove it in from the actual Schemalist definition.

async function run_proforma() {
    // snarf STDIN as JSON

    let apiRequest
    if (arg_subcommand == "schemalist") {
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/schemalist",
                body: {
                    email: config.email,
                    user_id: config.user_id,
                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                }, json: true
            })

          if (arg_subsubcommand) {
            // grep for this.about.filepath == subsubcommand
            apiRequest = _.filter(apiRequest, dis=>dis.about.filepath == arg_subsubcommand)
          } else {
            apiRequest = _.fromPairs(_.map(apiRequest, dis=>return [dis.about.filepath, dis.about.title]) )
          }
          
          console.log(JSON.stringify(apiRequest,null,2))
        }
        catch (e) { console.error(`lgl: error while calling API /schemalist`); console.error(e); process.exit(1); }
    }
    else if (arg_subcommand == "schema") {
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/schema",
                body: {
                    email: config.email,
                    user_id: config.user_id,
                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key,
		    filepath: arg_filepath
                }, json: true
            })
          console.log(JSON.stringify(apiRequest,null,2))
        }
        catch (e) { console.error(`lgl: error while calling API /schema`); console.error(e); process.exit(1); }
    }
    else if (arg_subcommand == "validate") {
	try {
	    apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/validate",
                body: {
                    email: config.email,
                    user_id: config.user_id,
                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key,
		    filepath: arg_filepath,
		    data: arg_json
                }, json: true
            })
          console.log(JSON.stringify(apiRequest,null,2))
        }
        catch (e) { console.error(`lgl: error while calling API /validate`); console.error(e); process.exit(1); }
    }
    else if (arg_subcommand == "generate") {
	try {
	    apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/generate",
                body: {
                    email: config.email,
                    user_id: config.user_id,
                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key,
		    filepath: arg_filepath,
		    data: arg_json
                }, json: true
            })
	    console.log(JSON.stringify(apiRequest, null, 2))
        }
        catch (e) { console.error(`lgl: error while calling API /generate`); console.error(e); process.exit(1); }

    }
    // curl -s -H 'Content-Type: application/json' -d '{"profile":{"email":"e", "identities":[{"user_id": "ui"}]}}' https://legalese.com/api/corpsec/v0.9/schemalist
    // | json -c 'this.about.filepath=="hw3"'
    // | json [0]
    // | json example
    // | time json -e 'this.filepath="hw3"; this.contenttype="docx"; this.profile={"email":"e", "identities":[{"user_id": "ui"}]}'
    // | curl -s -H 'Content-Type: application/json' -d@- https://legalese.com/api/corpsec/v1.0/schema | json
}

///////////////////////////////////////////////////////////////////////////// query

// the reasoner is not implemented yet.
function run_query() {
    console.log(Lgl.reasoner({ as_string: "default world" },
        { as_string: arg_subcommand })
        .as_string);
}

///////////////////////////////////////////////////////////////////////////// utilities

function load_world(): World | null { if (argv.world) { return <World>load_json(argv.world) } else { return null } }

// TODO: add schema validation to the config file, but warn, don't error, upon validation failure?
function load_json(filename: string): object | undefined {
    let config
    try {
        config = JSON.parse(fs.readFileSync(filename, 'utf-8'))
        console_error(`loaded json from ${filename}`);
        console_error(config)
    }
    catch (e) {
        console_error(`unable to load json file ${filename}: ${e}`);
    }
    return config
}

function json_filename(candidate: string): string | null {
    var found = findUp.sync(candidate)
    if (found) {
        // consider searching up the path, the way tsconfig.json does
        return found
    } else {
        return null // https://medium.com/@hinchman_amanda/null-pointer-references-the-billion-dollar-mistake-1e616534d485
    }
}

function writeToFile(parsed: object, filename: string, filetype = 'pdf') {
    console_error(`writing file ${filename}-${Date.now()}.${filetype}`)
    switch (filetype) {
        case 'json':
            fs.writeFileSync(`${filename}-${Date.now()}.${filetype}`, JSON.stringify(parsed), 'utf-8')
        case 'pdf':
            fs.writeFileSync(`${filename}-${Date.now()}.${filetype}`, parsed, 'utf-8')
        case 'docx':
            fs.writeFileSync(`${filename}-${Date.now()}.${filetype}`, parsed, 'utf-8')
        default:
            return
    }
}

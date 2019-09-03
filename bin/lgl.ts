#!/usr/bin/env node

import * as Lgl from "../lib/Lgl"
import * as fs from "fs"
import * as _ from "lodash"
import * as path from "path"
import * as findUp from "find-up"
import * as prompts from "prompts"
const open = require("open")
const rp = require("request-promise")

//lgl --world=somefile.json command subcommand

// --world=somefile.json
// command: string
// subcommand: string

// $ lgl query "are vehicles allowed in the park?"
// it depends

const cli_help = `usage: lgl [help] command subcommand ...
commands:
    help [command]          view more details about command
    init                    initialize account
    demo                    walks you through key functionality
    bizfile / corpsec       retrieves company details from government backends
    proforma                creates paperwork from templates, filled with JSON parameters

    login                   reinitialize account if lglconfig.json has gone missing
    config                  manipulate lglconfig.json. Or you could just edit it yourself.

options:
    --test                  all commands will run in test mode against the dev sandbox
    --verbose               verbose logging
    --world=some.json       load environment context from some.json file
    --config=conf.json      load configuration from conf.json instead of default ./lglconfig.json

environment variables:
    LGL_VERBOSE   set to truthy to get more verbosity
`;

const cli_help_commands = {
    proforma: `subcommands for lgl proforma:
    schemalist       show detailed example for a specific template, in json.
                   $ lgl proforma schemalist hw3 > hw3.json
    schemalist key   extract the "example" property for subsequent use:
                   $ lgl proforma schemalist hw3 example > example.json
    schema     key   show the JSON schema for the expected input
                   $ lgl proforma schema hw3
    validate   key   STDIN should be JSON data; will validate against the server.
                   $ lgl -t proforma validate hw3 < example.json
    generate   key   see: lgl help proforma generate
                   $ lgl -t proforma generate hw3 < example.json | json docPdf | base64 -D > example.pdf
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
    The backend returns credentials including API keys; they
    get saved into ./lglconfig.json. This command will prompt
    you for a password. If you ever lose your lglconfig.json,
    you will need this password to regenerate it.

    If you just want to try without creating an account,
    run   lgl init --test
    to set up a test account with limited functionality.
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

    schemalist       show detailed example for a specific template, in json.
                   $ lgl proforma schemalist hw3 > hw3.json

    schemalist key   extract the "example" property for subsequent use:
                   $ lgl proforma schemalist hw3 example > example.json
`,
        schema: `    schema     key   show the JSON schema for the expected input
                   $ lgl proforma schema hw3
`,
        validate: `      validate   key   STDIN should be JSON data; will validate against the server.
                   $ lgl -t proforma validate hw3 < example.json
`,
        generate: `sub-subcommands for lgl proforma generate:
    key   STDIN should be JSON data; will fill a template

    generate   key  myfilename.docx  save as Word docx file
    generate   key  docx             save as Word docx file, timestamped

    generate   key  myfilename.pdf   save as PDF file
    generate   key  pdf              save as PDF file with timestamped filename

  $ lgl -t proforma generate hw3 example.pdf < example.json
`
    },
}

var argv = require('minimist')(process.argv, {
    boolean: ["test", "t",
        "verbose", "v", "vv",
        "help", "h",
    ],
    string: [
        "version", // --version=0.9 send "filepath" instead of "templateKey", for the v0.9 and v1.0 APIs
        "config"
    ]
});

if (argv.help || argv.h) { argv._.splice(2, 0, "help") }

let templateKey = (argv.version && argv.version == "0.9") ? "filepath" : "templateKey"

const LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv
const LGL_TEST = process.env.LGL_TEST || argv.test || argv.t
const URI_BASE = (process.env.LGL_URI ? process.env.LGL_URI :
    LGL_TEST
        ? `https://api.legalese.com/api/corpsec/v1.1`
        : `https://api.legalese.com/api/corpsec/v1.1`)

let PROFORMA_FILETYPE = process.env.PROFORMA_FILETYPE || argv.filetype

if (process.env.LGL_URI) console_error(`URI_BASE = ${URI_BASE}`)
console_error(`templateKey = ${templateKey}`);
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
var arg_subsubsubcommand = argv._[5];

console_error(argv);

let config_file: string | null
config_file = argv.config || "lglconfig.json"
const config_found = json_filename(<string>config_file)
console_error(`identified config_file as ${config_file}, config_found=${config_found}`)

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
if (config_found != undefined) { config = <Config>load_json(<string>config_found); }
else { config = {} }
const world: (World | null) = <World>load_world();

if (arg_command == "help") {
    if (arg_subcommand && cli_help_commands[arg_subcommand]
        && // subsubcommand
        arg_subsubcommand && cli_help_subcommands[arg_subcommand][arg_subsubcommand]) {
        console.log(cli_help_subcommands[arg_subcommand][arg_subsubcommand])
    }
    else if (arg_subcommand && cli_help_commands[arg_subcommand]) { console.log(cli_help_commands[arg_subcommand]) }
    else {
        console.log(cli_help + "\n\ntry: lgl help demo\n");
    }
}
else if (arg_command == "init") {
    if (!LGL_TEST && !arg_subcommand) { console.log(cli_help_commands[arg_command]); process.exit(1) }
    run_init("init")
}
else if (arg_command == "login") { // reinitialize
    run_init("login")
}
else if (arg_command == "config") {
    run_config()
}
else if (arg_command == "demo") {
    run_demo()
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
    check_config();
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
else if (arg_command == "workflow") {
    check_config();
    run_workflow()
}
else {
    console.error(cli_help);
}

function check_config() {
    if (!config_found) {
        console.error("lgl: can't find config file; system has not been initialized. run lgl init");
        process.exit(1);
    }

    if (!config.user_id) {
        console.error("lgl: can't load config file; system has not been initialized; no user_id. run lgl init");
        process.exit(2);
    }
}

///////////////////////////////////////////////////////////////////////////// init

async function run_init(init_or_login: ("init" | "login") = "init") {
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
        console_error(`config_file is defined though we can't find it: ${config_file}`);
    }
    else {
        config_file = "lglconfig.json"
        console_error(`config_file is not defined! will proceed with ${config_file} in current directory.`);
    }

  if (LGL_TEST) {
    console_error(`LGL_TEST: config_file = ${config_file}`)
        fs.writeFileSync(config_file, JSON.stringify(
            {
                "email": "demo-20190808@example.com",
                "user_id": "5d4c03aa302f420cc73dcc05",
                "v01_test_api_key": "f4571b7c-be77-11e9-b309-a72af58ab7fe",
                "v01_live_api_key": "f4571b7c-be77-11e9-b309-a72af58ab7fe",
            }
            , null, 2) + "\n");
        console.log(`You have set up a Legalese account with test credentials.
Those credentials have been saved to ${config_file}
Commands will work with limited functionality for demo purposes.
When you are ready to use the system for real,
  rm ${config_file}
  lgl init <email>
`);
        return;
    }

        let prompt_pw
        let api_response
        let snark = true;
        if (init_or_login == "init") {
            prompt_pw = await prompts.prompt([{ type: 'password', name: 'pw1', message: "Enter new password: " },
            { type: 'password', name: 'pw2', message: "Confirm password: " }]);
            if (prompt_pw.pw1 != prompt_pw.pw2) { console.error("Passwords did not match. Please try again."); process.exit(1); }
            setTimeout(() => { if (snark) { console.log("We appreciate your patience. This may be slow, but it's still faster than hiring a law firm.") } }, 1000)

            try { api_response = await rp({ method: 'POST', uri: URI_BASE + "/users/create", body: { email: arg_subcommand, password: prompt_pw.pw1 }, json: true }) }
            catch (e) { console.error(`lgl: error while calling API /create`); console.error(e); process.exit(1); }
            console.log("Creating Legalese account...");
        }
        else { // init_or_login == "login"
            prompt_pw = await prompts.prompt([{ type: 'password', name: 'pw1', message: "Enter lgl password: " }]);
            try { api_response = await rp({ method: 'POST', uri: URI_BASE + "/users/create", body: { email: arg_subcommand, password: prompt_pw.pw1 }, json: true }) }
            catch (e) { console.error(`lgl: error while calling API /create`); console.error(e); process.exit(1); }
            console.log("Re-creating Legalese account...");
        }

        snark = false;
        if (api_response === null) { console.error("lgl: got null response from API; please try again later."); process.exit(1) }
        if (api_response.api_error || api_response.response_defined == false) { console.error("lgl: got error from API:"); console.error(api_response.api_error + "\n"); process.exit(1) }

        // if the user already exists according to auth0 but the user deleted their lglconfig.json
        // and if the password doesn't match, the backend will refuse to create a new account.
        // Instead we will get a 409. Then the user has to run lgl login instead.
        // but if the password matches, we will make a cryptic remark to that effect.
        if (api_response.remarks) { console.log(api_response.remarks) }

        // https://auth0.com/docs/integrations/using-auth0-to-secure-a-cli
        fs.writeFileSync(config_file, JSON.stringify({
            "email": api_response.email,
            "user_id": api_response.user_id, // this error doesn't stop compilation.
            "v01_live_api_key": _.keys(api_response.app_metadata.v01_live_api_keys)[0],
            "v01_test_api_key": _.keys(api_response.app_metadata.v01_test_api_keys)[0],
        }, null, 2) + "\n");

    console.log(`You have created a Legalese account!
To proceed, please confirm your email address.
You should see a verification request in your Inbox.`)
    if (/legalese\.com|gmail\.com/i.test(arg_subcommand)) {
        // if we wanted to be really creepy
        // we could look up the MX records for the domain
        // to determine if it's hosted at Outlook, Yahoo, Gmail, or whatever
        await open("https://www.gmail.com/")
    }
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

async function run_corpsec() {
    let apiRequest
    if (arg_subcommand == 'search') {
        const searchString = argv._.slice(4, argv.length).join(' ')
        try {
            apiRequest = await rp({
                method: 'POST', uri: `${URI_BASE}/bizfile/search`,
                body: {
                    searchString: searchString,
                    test: LGL_TEST ? true : false
                },
                json: true
            })
            const toreturn = JSON.parse(apiRequest)
            const mapped = _.flatMap(toreturn, u => { return { [u.uen]: u.entity_name } })
            console.log(mapped)

        } catch (e) { console.error(`lgl: error while calling API /bizfile`); console.error(e); process.exit(1); }
    }
    else if (arg_subcommand == 'uen') {
        const searchString = argv._.slice(4, argv.length).join(' ')
        console.log('searching for company')
        console.log(searchString)
        try {
            apiRequest = await rp({
                method: 'POST', uri: `${URI_BASE}/bizfile/uen`,
                body: {
                    uen: searchString,
                    test: LGL_TEST ? true : false,
                    email: config.email,
                    user_id: config.user_id,
                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                },
                json: true
            })
          console.log(JSON.stringify(apiRequest,null,2))

        } catch (e) { console.error(`lgl: error while calling API /bizfile`); console.error(e); process.exit(1); }
    }
}

///////////////////////////////////////////////////////////////////////////// proforma

interface Schemalist { about: { filepath?: string, templateKey?: string, title: string } } // this is a bit of a repeat; later, when we have full type definitions from schematemplates, shove it in from the actual Schemalist definition.

async function run_proforma() {
    let apiRequest

    // for version 1.1 and above
    let body = {
        email: config.email, user_id: config.user_id,
        v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
    }
    // for version 0.9 and 1.0
    let profile_09 = {
        email: config.email,
        identities: [{ user_id: config.user_id }],
        v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
    }

    //
    // proforma schemalist
    //
    if (arg_subcommand == "schemalist") {
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/schemalist",
                body: argv.version == "0.9" ? { profile: profile_09 } : body,
                json: true
            })

            if (arg_subsubcommand) {
                // grep for this.about.templateKey == subsubcommand
                apiRequest = _.filter(apiRequest, dis => dis.about[templateKey] == arg_subsubcommand)[0]
            } else {
                apiRequest = _.fromPairs(_.map(apiRequest, dis => { return [dis.about[templateKey], dis.about.title] }))
            }

            if (arg_subsubsubcommand
                &&
                _.get(apiRequest, arg_subsubsubcommand)) {
                apiRequest = _.get(apiRequest, arg_subsubsubcommand);
            }

            console.log(JSON.stringify(apiRequest, null, 2))
        }
        catch (e) { console.error(`lgl: error while calling API /schemalist`); console.error(e); process.exit(1); }
    }
    //
    // proforma schema
    //
    else if (arg_subcommand == "schema") {
        if (!arg_subsubcommand) { console.log("lgl proforma schema <templateKey>"); process.exit(1) }
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/schema",
                body: argv.version == "0.9" ? { profile: profile_09, [templateKey]: arg_subsubcommand } : { ...body, [templateKey]: arg_subsubcommand }
                , json: true
            })
            console.log(JSON.stringify(apiRequest, null, 2))
        }
        catch (e) { console.error(`lgl: error while calling API /schema`); console.error(e); process.exit(1); }
    }
    //
    // proforma validate
    //
    else if (arg_subcommand == "validate") {
        if (!arg_subsubcommand) { console.log("lgl proforma validate <templateKey>"); process.exit(1) }
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/validate",
                body: (argv.version == "0.9"
                    ? { profile: profile_09, [templateKey]: arg_subsubcommand, data: JSON.parse(fs.readFileSync(0, 'utf-8')) }
                    : { ...body, [templateKey]: arg_subsubcommand, data: JSON.parse(fs.readFileSync(0, 'utf-8')) })
                , json: true
            })
            console.log(JSON.stringify(apiRequest, null, 2))
        }
        catch (e) { console.error(`lgl: error while calling API /validate`); console.error(e); process.exit(1); }
    }
    //
    // proforma generate
    //
    else if (arg_subcommand == "generate") {
        if (!arg_subsubcommand) { console.log("lgl proforma generate <templateKey>"); process.exit(1) }
        let output_filename = null
        if (arg_subsubcommand && arg_subsubsubcommand) {
            switch (arg_subsubsubcommand) {
                case "pdf": { PROFORMA_FILETYPE = "pdf"; output_filename = `${templateKey}-${Date.now()}.${PROFORMA_FILETYPE}`; break }
                case "docx": { PROFORMA_FILETYPE = "docx"; output_filename = `${templateKey}-${Date.now()}.${PROFORMA_FILETYPE}`; break }
                case null: { break }
                default: {
                    if (/\.(docx|doc|pdf)$/i.test(arg_subsubsubcommand)) {
                        output_filename = arg_subsubsubcommand;
                        if (arg_subsubsubcommand.match(/\.pdf$/i)) { PROFORMA_FILETYPE = "pdf" }
                        if (arg_subsubsubcommand.match(/\.docx?$/i)) { PROFORMA_FILETYPE = "docx" }
                    }
                }
            }
        }
        try {
            apiRequest = await rp({
                method: 'POST', uri: URI_BASE + "/generate",
                body: (argv.version == "0.9"
                    ? {
                        profile: profile_09, [templateKey]: arg_subsubcommand,
                        contenttype: PROFORMA_FILETYPE,
                        ...(JSON.parse(fs.readFileSync(0, 'utf-8')))
                    }
                    : {
                        email: config.email, user_id: config.user_id,
                        v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key,
                        [templateKey]: arg_subsubcommand,
                        contenttype: PROFORMA_FILETYPE,
                        data: JSON.parse(fs.readFileSync(0, 'utf-8'))
                    }
                ),
                json: true
            })
            if (output_filename) { writeToFile(apiRequest[PROFORMA_FILETYPE == "pdf" ? "docPdf" : "docDocx"], output_filename, PROFORMA_FILETYPE) }
            else {
                console.log(JSON.stringify(apiRequest, null, 2))
            }
        }
        catch (e) { console.error(`lgl: error while calling API /generate`); console.error(e); process.exit(1); }

    }
    // curl -s -H 'Content-Type: application/json' -d '{"profile":{"email":"e", "identities":[{"user_id": "ui"}]}}' https://legalese.com/api/corpsec/v0.9/schemalist
    // | json -c 'this.about.templateKey=="hw3"'
    // | json [0]
    // | json example
    // | time json -e 'this.templateKey="hw3"; this.contenttype="docx"; this.profile={"email":"e", "identities":[{"user_id": "ui"}]}'
    // | curl -s -H 'Content-Type: application/json' -d@- https://legalese.com/api/corpsec/v1.0/schema | json
}

///////////////////////////////////////////////////////////////////////////// workflow

async function run_workflow() {
    let apiRequest
    try {
        apiRequest = await rp({
            method: 'POST', uri: URI_BASE + `/workflow/${arg_subcommand}`,
            body: {
		email: config.email,
		user_id: config.user_id,
		v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key,
		data: JSON.parse(fs.readFileSync(0, 'utf-8'))
	    },
            json: true
        })

        console.log(JSON.stringify(apiRequest, null, 2))
    }
    catch (e) { console.error(`lgl: error while calling API /schemalist`); console.error(e); process.exit(1); }
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
  // if user explicitly runs --config=somefile.json, don't findUp; expect the config path to specify the file exactly
  if (argv.config) {
    console_error(`json_filename: argv.config seems to be true`)
    if (fs.existsSync(argv.config)) {
      return argv.config
    }
    else {
      return null
    }
  }    
  var found = findUp.sync(candidate)
  if (found) {
    // consider searching up the path, the way tsconfig.json does
    return found
  } else {
    return null // https://medium.com/@hinchman_amanda/null-pointer-references-the-billion-dollar-mistake-1e616534d485
  }
}

function writeToFile(parsed: string, filename: string, filetype = 'pdf') {
    console_error(`lgl: saving to ${filename}`)
    switch (filetype) {
        case 'json': fs.writeFileSync(filename, JSON.stringify(parsed), 'utf-8'); break
        case 'pdf':
        case 'docx': fs.writeFileSync(filename, parsed, 'base64')
    }
}

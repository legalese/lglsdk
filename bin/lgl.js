#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lgl = __importStar(require("../lib/Lgl"));
var fs = __importStar(require("fs"));
var _ = __importStar(require("lodash"));
var findUp = __importStar(require("find-up"));
var prompts = __importStar(require("prompts"));
var open = require("open");
var rp = require("request-promise");
//lgl --world=somefile.json command subcommand
// --world=somefile.json
// command: string
// subcommand: string
// $ lgl query "are vehicles allowed in the park?"
// it depends
var cli_help = "usage: lgl [help] command subcommand ...\ncommands:\n    help [command]          view more details about command\n    init                    initialize account\n    demo                    walks you through key functionality\n    bizfile / corpsec       retrieves company details from government backends\n    proforma                creates paperwork from templates, filled with JSON parameters\n\n    login                   reinitialize account if lglconfig.json has gone missing\n    config                  manipulate lglconfig.json. Or you could just edit it yourself.\n\noptions:\n    --test                  all commands will run in test mode against the dev sandbox\n    --verbose               verbose logging\n    --world=some.json       load environment context from some.json file\n    --config=conf.json      load configuration from conf.json instead of default ./lglconfig.json\n\nenvironment variables:\n    LGL_VERBOSE   set to truthy to get more verbosity\n";
var cli_help_commands = {
    proforma: "subcommands for lgl proforma:\n    schemalist       show detailed example for a specific template, in json.\n                   $ lgl proforma schemalist hw3 > hw3.json\n    schemalist key   extract the \"example\" property for subsequent use:\n                   $ lgl proforma schemalist hw3 example > example.json\n    schema     key   show the JSON schema for the expected input\n                   $ lgl proforma schema hw3\n    validate   key   STDIN should be JSON data; will validate against the server.\n                   $ lgl -t proforma validate hw3 < example.json\n    generate   key   see: lgl help proforma generate\n                   $ lgl -t proforma generate hw3 < example.json | json docPdf | base64 -D > example.pdf\n",
    corpsec: "subcommands for lgl corpsec:\n    search companyname\n    get    UEN\n",
    demo: "subcommands for lgl demo:\n    demo all\n    demo corpsec\n    demo proforma\n",
    init: "lgl init <email>\n    Sets up an account at the Legalese backend using <email>.\n    The backend returns credentials including API keys; they\n    get saved into ./lglconfig.json. This command will prompt\n    you for a password. If you ever lose your lglconfig.json,\n    you will need this password to regenerate it.\n\n    If you just want to try without creating an account,\n    run   lgl init --test\n    to set up a test account with limited functionality.\n",
    login: "lgl login <email>\n    If you've accidentally lost your lglconfig.json file,\n    you can repopulate it from the server by logging in with\n    the email and password you previously set up.\n",
    config: "subcommands for lgl config:\n    foo=bar    save foo=bar to config\n    foo        show value of foo\n",
};
var cli_help_subcommands = {
    proforma: {
        schemalist: "sub-subcommands for lgl proforma schemalist:\n\n    schemalist       show detailed example for a specific template, in json.\n                   $ lgl proforma schemalist hw3 > hw3.json\n\n    schemalist key   extract the \"example\" property for subsequent use:\n                   $ lgl proforma schemalist hw3 example > example.json\n",
        schema: "    schema     key   show the JSON schema for the expected input\n                   $ lgl proforma schema hw3\n",
        validate: "      validate   key   STDIN should be JSON data; will validate against the server.\n                   $ lgl -t proforma validate hw3 < example.json\n",
        generate: "sub-subcommands for lgl proforma generate:\n    key   STDIN should be JSON data; will fill a template\n\n    generate   key  myfilename.docx  save as Word docx file\n    generate   key  docx             save as Word docx file, timestamped\n\n    generate   key  myfilename.pdf   save as PDF file\n    generate   key  pdf              save as PDF file with timestamped filename\n\n  $ lgl -t proforma generate hw3 example.pdf < example.json\n"
    },
};
var argv = require('minimist')(process.argv, {
    boolean: ["test", "t",
        "verbose", "v", "vv",
        "help", "h",
    ],
    string: [
        "version",
        "config"
    ]
});
if (argv.help || argv.h) {
    argv._.splice(2, 0, "help");
}
var templateKey = (argv.version && argv.version == "0.9") ? "filepath" : "templateKey";
var LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv;
var LGL_TEST = process.env.LGL_TEST || argv.test || argv.t;
var URI_BASE = (process.env.LGL_URI ? process.env.LGL_URI :
    LGL_TEST
        ? "https://api.legalese.com/api/corpsec/v1.1"
        : "https://api.legalese.com/api/corpsec/v1.1");
var PROFORMA_FILETYPE = process.env.PROFORMA_FILETYPE || argv.filetype;
console_error("templateKey = " + templateKey);
function console_error(str) {
    if (LGL_VERBOSE) {
        console.error(str);
    }
}
var arg_command = argv._[2];
console_error("command: " + arg_command);
var arg_subcommand = argv._[3];
if (arg_subcommand) {
    console_error("subcommand: " + arg_subcommand);
}
var arg_subsubcommand = argv._[4];
if (arg_subsubcommand) {
    console_error("subsubcommand: " + arg_subsubcommand);
}
var arg_subsubsubcommand = argv._[5];
console_error(argv);
var config_file;
config_file = json_filename(argv.config || "lglconfig.json");
var config;
if (config_file != undefined) {
    config = load_json(config_file);
}
else {
    config = {};
}
var world = load_world();
if (arg_command == "help") {
    if (arg_subcommand && cli_help_commands[arg_subcommand]
        && // subsubcommand
            arg_subsubcommand && cli_help_subcommands[arg_subcommand][arg_subsubcommand]) {
        console.log(cli_help_subcommands[arg_subcommand][arg_subsubcommand]);
    }
    else if (arg_subcommand && cli_help_commands[arg_subcommand]) {
        console.log(cli_help_commands[arg_subcommand]);
    }
    else {
        console.log(cli_help + "\n\ntry: lgl help demo\n");
    }
}
else if (arg_command == "init") {
    if (!LGL_TEST && !arg_subcommand) {
        console.log(cli_help_commands[arg_command]);
        process.exit(1);
    }
    run_init("init");
}
else if (arg_command == "login") { // reinitialize
    run_init("login");
}
else if (arg_command == "config") {
    run_config();
}
else if (arg_command == "demo") {
    console.log("a painless introduction to a painful subject");
    run_demo();
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
    check_config();
    console.log("interface with the government's Department of Information Retrieval");
    run_corpsec();
}
else if (arg_command == "proforma") {
    check_config();
    // console.log(`fill templates into documents, and beyond`);
    run_proforma();
}
else if (arg_command == "query") {
    check_config();
    run_query();
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
function run_init(init_or_login) {
    if (init_or_login === void 0) { init_or_login = "init"; }
    return __awaiter(this, void 0, void 0, function () {
        var prompt_pw, api_response, snark_1, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                        console.error("lgl: init: config file " + config_file + " already exists; refusing to init.\n    If you are sure you want to re-initialize,\n    and you are prepared to create a new account with a different email address,\n    delete " + config_file + " and run init again with the new email address.\n    Or just go to a different directory, without a " + config_file + " file, and lgl init.");
                        process.exit(1);
                    }
                    else if (config_file) {
                        console_error("config_file is defined: " + config_file);
                    }
                    else {
                        config_file = "lglconfig.json";
                        console_error("config_file is not defined! will proceed with " + config_file + " in current directory.");
                    }
                    if (!LGL_TEST) return [3 /*break*/, 1];
                    fs.writeFileSync(config_file, JSON.stringify({
                        "email": "demo-20190808@example.com",
                        "user_id": "5d4c03aa302f420cc73dcc05",
                        "v01_test_api_key": "f4571b7c-be77-11e9-b309-a72af58ab7fe",
                        "v01_live_api_key": "f4571b7c-be77-11e9-b309-a72af58ab7fe",
                    }, null, 2) + "\n");
                    console.log("You have set up a Legalese account with test credentials.\nCommands will work with limited functionality for demo purposes.\nWhen you are ready to use the system for real,\n  rm lglconfig.json\n  lgl init <email>\n");
                    return [2 /*return*/];
                case 1:
                    prompt_pw = void 0;
                    api_response = void 0;
                    snark_1 = true;
                    if (!(init_or_login == "init")) return [3 /*break*/, 7];
                    return [4 /*yield*/, prompts.prompt([{ type: 'password', name: 'pw1', message: "Enter new password: " },
                            { type: 'password', name: 'pw2', message: "Confirm password: " }])];
                case 2:
                    prompt_pw = _a.sent();
                    if (prompt_pw.pw1 != prompt_pw.pw2) {
                        console.error("Passwords did not match. Please try again.");
                        process.exit(1);
                    }
                    setTimeout(function () { if (snark_1) {
                        console.log("We appreciate your patience. This may be slow, but it's still faster than hiring a law firm.");
                    } }, 1000);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, rp({ method: 'POST', uri: URI_BASE + "/users/create", body: { email: arg_subcommand, password: prompt_pw.pw1 }, json: true })];
                case 4:
                    api_response = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error("lgl: error while calling API /create");
                    console.error(e_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6:
                    console.log("Creating Legalese account...");
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, prompts.prompt([{ type: 'password', name: 'pw1', message: "Enter lgl password: " }])];
                case 8:
                    prompt_pw = _a.sent();
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, rp({ method: 'POST', uri: URI_BASE + "/users/create", body: { email: arg_subcommand, password: prompt_pw.pw1 }, json: true })];
                case 10:
                    api_response = _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_2 = _a.sent();
                    console.error("lgl: error while calling API /create");
                    console.error(e_2);
                    process.exit(1);
                    return [3 /*break*/, 12];
                case 12:
                    console.log("Re-creating Legalese account...");
                    _a.label = 13;
                case 13:
                    snark_1 = false;
                    if (api_response === null) {
                        console.error("lgl: got null response from API; please try again later.");
                        process.exit(1);
                    }
                    if (api_response.api_error || api_response.response_defined == false) {
                        console.error("lgl: got error from API:");
                        console.error(api_response.api_error + "\n");
                        process.exit(1);
                    }
                    // if the user already exists according to auth0 but the user deleted their lglconfig.json
                    // and if the password doesn't match, the backend will refuse to create a new account.
                    // Instead we will get a 409. Then the user has to run lgl login instead.
                    // but if the password matches, we will make a cryptic remark to that effect.
                    if (api_response.remarks) {
                        console.log(api_response.remarks);
                    }
                    // https://auth0.com/docs/integrations/using-auth0-to-secure-a-cli
                    fs.writeFileSync(config_file, JSON.stringify({
                        "email": api_response.email,
                        "user_id": api_response.user_id,
                        "v01_live_api_key": _.keys(api_response.app_metadata.v01_live_api_keys)[0],
                        "v01_test_api_key": _.keys(api_response.app_metadata.v01_test_api_keys)[0],
                    }, null, 2) + "\n");
                    _a.label = 14;
                case 14:
                    console.log("You have created a Legalese account!\nTo proceed, please confirm your email address.\nYou should see a verification request in your Inbox.");
                    if (!/legalese\.com|gmail\.com/i.test(arg_subcommand)) return [3 /*break*/, 16];
                    // if we wanted to be really creepy
                    // we could look up the MX records for the domain
                    // to determine if it's hosted at Outlook, Yahoo, Gmail, or whatever
                    return [4 /*yield*/, open("https://www.gmail.com/")];
                case 15:
                    // if we wanted to be really creepy
                    // we could look up the MX records for the domain
                    // to determine if it's hosted at Outlook, Yahoo, Gmail, or whatever
                    _a.sent();
                    _a.label = 16;
                case 16: return [2 /*return*/];
            }
        });
    });
}
///////////////////////////////////////////////////////////////////////////// config
function run_config() {
    // lgl config foo=bar // setter
    // lgl config foo     // getter
    if (arg_subcommand) {
        if (/=/.test(arg_subcommand)) {
            var mymatch = arg_subcommand.match(/(\w+)=(.*)/);
            console_error("will config set " + mymatch[1] + " = " + mymatch[2]);
            var newconfig = _.cloneDeep(config);
            newconfig[mymatch[1]] = mymatch[2];
            if (LGL_TEST) {
                console.error("warning: writing to test config file, proceed at your own risk. you can always lgl --test init");
                // sleep(5000)
            }
            fs.writeFileSync(config_file, JSON.stringify(newconfig, null, 2) + "\n");
            config = newconfig;
        }
        else {
            if (config[arg_subcommand]) {
                console.log(config[arg_subcommand]);
            }
            else {
                console.log("undefined");
            }
        }
    }
    else {
        console.log(JSON.stringify(config, null, 2));
    }
}
///////////////////////////////////////////////////////////////////////////// demo
function run_demo() {
}
///////////////////////////////////////////////////////////////////////////// corpsec / bizfile
function run_corpsec() {
    return __awaiter(this, void 0, void 0, function () {
        var apiRequest, searchString, toreturn, mapped, e_3, searchString, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(arg_subcommand == 'search')) return [3 /*break*/, 5];
                    searchString = argv._.slice(4, argv.length).join(' ');
                    console.log('searching for basic company details...');
                    console.log(searchString);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/bizfile/search",
                            body: {
                                searchString: searchString,
                                test: LGL_TEST ? true : false
                            },
                            json: true
                        })];
                case 2:
                    apiRequest = _a.sent();
                    toreturn = JSON.parse(apiRequest);
                    mapped = _.flatMap(toreturn, function (u) {
                        var _a;
                        return _a = {}, _a[u.uen] = u.entity_name, _a;
                    });
                    console.log(mapped);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.error("lgl: error while calling API /bizfile");
                    console.error(e_3);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(arg_subcommand == 'uen')) return [3 /*break*/, 9];
                    searchString = argv._.slice(4, argv.length).join(' ');
                    console.log('searching for company');
                    console.log(searchString);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/bizfile/uen",
                            body: {
                                uen: searchString,
                                test: LGL_TEST ? true : false,
                                email: config.email,
                                user_id: config.user_id,
                                v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                            },
                            json: true
                        })];
                case 7:
                    apiRequest = _a.sent();
                    console.log(JSON.stringify(JSON.parse(apiRequest), null, 2));
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    console.error("lgl: error while calling API /bizfile");
                    console.error(e_4);
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function run_proforma() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, apiRequest, body, profile_09, e_5, e_6, e_7, output_filename, e_8;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    body = {
                        email: config.email, user_id: config.user_id,
                        v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                    };
                    profile_09 = {
                        email: config.email,
                        identities: [{ user_id: config.user_id }],
                        v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                    };
                    if (!(arg_subcommand == "schemalist")) return [3 /*break*/, 5];
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/schemalist",
                            body: argv.version == "0.9" ? { profile: profile_09 } : body,
                            json: true
                        })];
                case 2:
                    apiRequest = _g.sent();
                    if (arg_subsubcommand) {
                        // grep for this.about.templateKey == subsubcommand
                        apiRequest = _.filter(apiRequest, function (dis) { return dis.about[templateKey] == arg_subsubcommand; })[0];
                    }
                    else {
                        apiRequest = _.fromPairs(_.map(apiRequest, function (dis) { return [dis.about[templateKey], dis.about.title]; }));
                    }
                    if (arg_subsubsubcommand
                        &&
                            _.get(apiRequest, arg_subsubsubcommand)) {
                        apiRequest = _.get(apiRequest, arg_subsubsubcommand);
                    }
                    console.log(JSON.stringify(apiRequest, null, 2));
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _g.sent();
                    console.error("lgl: error while calling API /schemalist");
                    console.error(e_5);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 19];
                case 5:
                    if (!(arg_subcommand == "schema")) return [3 /*break*/, 10];
                    if (!arg_subsubcommand) {
                        console.log("lgl proforma schema <templateKey>");
                        process.exit(1);
                    }
                    _g.label = 6;
                case 6:
                    _g.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/schema",
                            body: argv.version == "0.9" ? (_a = { profile: profile_09 }, _a[templateKey] = arg_subsubcommand, _a) : __assign({}, body, (_b = {}, _b[templateKey] = arg_subsubcommand, _b)),
                            json: true
                        })];
                case 7:
                    apiRequest = _g.sent();
                    console.log(JSON.stringify(apiRequest, null, 2));
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _g.sent();
                    console.error("lgl: error while calling API /schema");
                    console.error(e_6);
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 19];
                case 10:
                    if (!(arg_subcommand == "validate")) return [3 /*break*/, 15];
                    if (!arg_subsubcommand) {
                        console.log("lgl proforma validate <templateKey>");
                        process.exit(1);
                    }
                    _g.label = 11;
                case 11:
                    _g.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/validate",
                            body: (argv.version == "0.9"
                                ? (_c = { profile: profile_09 }, _c[templateKey] = arg_subsubcommand, _c.data = JSON.parse(fs.readFileSync(0, 'utf-8')), _c) : __assign({}, body, (_d = {}, _d[templateKey] = arg_subsubcommand, _d.data = JSON.parse(fs.readFileSync(0, 'utf-8')), _d))),
                            json: true
                        })];
                case 12:
                    apiRequest = _g.sent();
                    console.log(JSON.stringify(apiRequest, null, 2));
                    return [3 /*break*/, 14];
                case 13:
                    e_7 = _g.sent();
                    console.error("lgl: error while calling API /validate");
                    console.error(e_7);
                    process.exit(1);
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 19];
                case 15:
                    if (!(arg_subcommand == "generate")) return [3 /*break*/, 19];
                    if (!arg_subsubcommand) {
                        console.log("lgl proforma generate <templateKey>");
                        process.exit(1);
                    }
                    output_filename = null;
                    if (arg_subsubcommand && arg_subsubsubcommand) {
                        switch (arg_subsubsubcommand) {
                            case "pdf": {
                                PROFORMA_FILETYPE = "pdf";
                                output_filename = templateKey + "-" + Date.now() + "." + PROFORMA_FILETYPE;
                                break;
                            }
                            case "docx": {
                                PROFORMA_FILETYPE = "docx";
                                output_filename = templateKey + "-" + Date.now() + "." + PROFORMA_FILETYPE;
                                break;
                            }
                            case null: {
                                break;
                            }
                            default: {
                                if (/\.(docx|doc|pdf)$/i.test(arg_subsubsubcommand)) {
                                    output_filename = arg_subsubsubcommand;
                                    if (arg_subsubsubcommand.match(/\.pdf$/i)) {
                                        PROFORMA_FILETYPE = "pdf";
                                    }
                                    if (arg_subsubsubcommand.match(/\.docx?$/i)) {
                                        PROFORMA_FILETYPE = "docx";
                                    }
                                }
                            }
                        }
                    }
                    _g.label = 16;
                case 16:
                    _g.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, rp({
                            method: 'POST', uri: URI_BASE + "/generate",
                            body: (argv.version == "0.9"
                                ? __assign((_e = { profile: profile_09 }, _e[templateKey] = arg_subsubcommand, _e.contenttype = PROFORMA_FILETYPE, _e), (JSON.parse(fs.readFileSync(0, 'utf-8')))) : (_f = {
                                    email: config.email, user_id: config.user_id,
                                    v01_api_key: LGL_TEST ? config.v01_test_api_key : config.v01_live_api_key
                                },
                                _f[templateKey] = arg_subsubcommand,
                                _f.contenttype = PROFORMA_FILETYPE,
                                _f.data = JSON.parse(fs.readFileSync(0, 'utf-8')),
                                _f)),
                            json: true
                        })];
                case 17:
                    apiRequest = _g.sent();
                    if (output_filename) {
                        writeToFile(apiRequest[PROFORMA_FILETYPE == "pdf" ? "docPdf" : "docDocx"], output_filename, PROFORMA_FILETYPE);
                    }
                    else {
                        console.log(JSON.stringify(apiRequest, null, 2));
                    }
                    return [3 /*break*/, 19];
                case 18:
                    e_8 = _g.sent();
                    console.error("lgl: error while calling API /generate");
                    console.error(e_8);
                    process.exit(1);
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    });
}
///////////////////////////////////////////////////////////////////////////// query
// the reasoner is not implemented yet.
function run_query() {
    console.log(Lgl.reasoner({ as_string: "default world" }, { as_string: arg_subcommand })
        .as_string);
}
///////////////////////////////////////////////////////////////////////////// utilities
function load_world() { if (argv.world) {
    return load_json(argv.world);
}
else {
    return null;
} }
// TODO: add schema validation to the config file, but warn, don't error, upon validation failure?
function load_json(filename) {
    var config;
    try {
        config = JSON.parse(fs.readFileSync(filename, 'utf-8'));
        console_error("loaded json from " + filename);
        console_error(config);
    }
    catch (e) {
        console_error("unable to load json file " + filename + ": " + e);
    }
    return config;
}
function json_filename(candidate) {
    var found = findUp.sync(candidate);
    if (found) {
        // consider searching up the path, the way tsconfig.json does
        return found;
    }
    else {
        return null; // https://medium.com/@hinchman_amanda/null-pointer-references-the-billion-dollar-mistake-1e616534d485
    }
}
function writeToFile(parsed, filename, filetype) {
    if (filetype === void 0) { filetype = 'pdf'; }
    console_error("lgl: saving to " + filename);
    switch (filetype) {
        case 'json':
            fs.writeFileSync(filename, JSON.stringify(parsed), 'utf-8');
            break;
        case 'pdf':
        case 'docx': fs.writeFileSync(filename, parsed, 'base64');
    }
}

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
var rp = require("request-promise");
//lgl --world=somefile.json command subcommand
// --world=somefile.json
// command: string
// subcommand: string
// $ lgl query "are vehicles allowed in the park?"
// it depends
var cli_help = "usage: lgl --world=world.json command subcommand ...\ncommands:\n    query \"question string\"\n    help\n    init\n    config\n    demo\n    bizfile / corpsec\n    proforma\n\noptions:\n    --test                  all commands will run in test mode against the dev sandbox\n    --verbose               verbose logging\n    --world=some.json       load environment context from some.json file\n    --config=conf.json      load configuration from conf.json file (default: ./lglconfig.json)\n    --filepath='some-file'  specify filepath for proforma template call\n    --filename='some-file'  specify write output of proforma template call\n    --filetype='.json'      specify filetype for proforma document generation\n\nenvironment variables:\n    LGL_VERBOSE   set to truthy to get more verbosity\n";
var argv = require('minimist')(process.argv, {
    boolean: ["test", "t",
        "verbose", "v", "vv"]
});
var LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv;
var LGL_TEST = process.env.LGL_TEST || argv.test || argv.t;
var PROFORMA_FP = process.env.PROFORMA_FP || argv.filepath || argv.fp;
var PROFORMA_FILENAME = process.env.PROFORMA_FILENAME || argv.filename;
var PROFORMA_FILETYPE = process.env.PROFORMA_FILETYPE || argv.filetype;
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
console_error(argv);
var config_file;
if (LGL_TEST) {
    console_error("lgl: running in test mode; will use test-config.json");
    config_file = json_filename("test-config.json");
    if (argv.config) {
        console_error("ignoring user-provided config file name " + argv.config + " in favour of test-config.json");
    }
}
else {
    config_file = json_filename("lglconfig.json");
}
var config;
if (config_file != undefined) {
    config = load_json(config_file);
}
else {
    config = {};
}
var world = load_world();
if (arg_command == "help") {
    console.log(cli_help);
}
else if (arg_command == "init") {
    run_init();
}
else if (arg_command == "config") {
    run_config();
}
else if (arg_command == "demo") {
    console.log("a painless introduction to a painful subject");
    run_demo();
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
    console.log("interface with the government's Department of Information Retrieval");
    run_corpsec();
}
else if (arg_command == "proforma") {
    console.log("fill templates into documents, and beyond");
    run_proforma();
}
else if (arg_command == "query") {
    run_query();
}
else {
    console.error(cli_help);
}
///////////////////////////////////////////////////////////////////////////// init
function run_init() {
    // usage: lgl init user@email.address
    // set them up with an API key that works against the Legalese backend
    // save the API key to lglconfig.json
    // save the automatically generated auth0 password to lglconfig.json
    // give the end-user to an opportunity to verify their email address against auth0 by clicking the link
    // after they've done that, our API backend should be able to query auth0 and find that the email address is verified
    // and the user_id corresponds to that email address.
    // if we already have a config file then refuse to init; ask them to delete.
    // after running init we save to the config file
    if (config_file && fs.existsSync(config_file)) {
        console.error("lgl: init: config file " + config_file + " already exists; refusing to init.\nIf you're sure you want to re-initialize, delete that file and run init again.");
        process.exit(1);
    }
    else if (config_file) {
        console_error("config_file is defined: " + config_file);
    }
    else {
        config_file = LGL_TEST ? "test-config.json" : "lglconfig.json";
        console_error("config_file is not defined! will proceed with " + config_file + " in current directory.");
    }
    if (LGL_TEST) {
        fs.writeFileSync(config_file, JSON.stringify({
            "potato": "3",
            "user_email": "demo-20190808@example.com",
            "orig_email": arg_subcommand,
            "user_id": "5d4c03aa302f420cc73dcc05"
        }, null, 2) + "\n");
    }
    else {
        // https://auth0.com/docs/integrations/using-auth0-to-secure-a-cli
        // call the api.legalese.com/api/lgl-init endpoint to write an entry into our users database
        // run an authorization loop against auth0
        // lgl client creates a random password; creates an auth0 account using that username and passwrod
        fs.writeFileSync(config_file, JSON.stringify({
            "user_email": arg_subcommand,
            "user_id": "pending"
        }, null, 2) + "\n");
    }
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
}
///////////////////////////////////////////////////////////////////////////// proforma
function run_proforma() {
    return __awaiter(this, void 0, void 0, function () {
        var profile, schemalist, schemalist, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profile = {
                        "profile": {
                            "email": config.user_email,
                            "identities": [{ "user_id": config.user_id }]
                        }
                    };
                    if (!(arg_subcommand == "schemalist")) return [3 /*break*/, 5];
                    if (!PROFORMA_FILENAME) return [3 /*break*/, 2];
                    return [4 /*yield*/, http('schemalist', profile)];
                case 1:
                    schemalist = _a.sent();
                    writeToFile(schemalist, PROFORMA_FILENAME, 'json');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, http('schemalist', profile)];
                case 3:
                    schemalist = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    if (arg_subcommand == "schema") {
                        body = __assign({}, profile, { "filepath": PROFORMA_FP });
                        if (PROFORMA_FILENAME) {
                            http('schema', body, PROFORMA_FILENAME, 'json', writeToFile);
                        }
                        else {
                            http('schema', body);
                        }
                    }
                    else if (arg_subcommand == "validate") {
                    }
                    else if (arg_subcommand == "generate") {
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
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
function http(path, body, filename, filetype, callback) {
    var options = {
        method: 'POST',
        uri: "https://api.legalese.com/api/corpsec/v1.0/" + path,
        body: body,
        json: true
    };
    return new Promise(function (resolve, reject) {
        rp(options)
            .then(function (parsedBody) {
            resolve(parsedBody);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
function writeToFile(parsed, filename, filetype) {
    if (filetype === void 0) { filetype = 'pdf'; }
    console_error("writing file " + filename + "-" + Date.now() + "." + filetype);
    switch (filetype) {
        case 'json':
            fs.writeFileSync(filename + "-" + Date.now() + "." + filetype, JSON.stringify(parsed), 'utf-8');
        case 'pdf':
            fs.writeFileSync(filename + "-" + Date.now() + "." + filetype, parsed, 'utf-8');
        case 'docx':
            fs.writeFileSync(filename + "-" + Date.now() + "." + filetype, parsed, 'utf-8');
        default:
            return;
    }
}

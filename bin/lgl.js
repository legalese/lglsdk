#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lgl = __importStar(require("../lib/Lgl"));
//lgl --world=somefile.json command subcommand
// --world=somefile.json
// command: string
// subcommand: string
// $ lgl query "are vehicles allowed in the park?"
// it depends
var cli_help = "usage: lgl --world=world.json command subcommand ...\ncommands:\n    query \"question string\"\n    help\n    init\n    config\n    demo\n    bizfile / corpsec\n    proforma\n\noptions:\n    --test            all commands will run in test mode against the dev sandbox\n    --world=some.json load environment context from some.json file\n    --verbose         verbose logging\n\nenvironment variables:\n    LGL_VERBOSE   set to truthy to get more verbosity\n";
var argv = require('minimist')(process.argv, {
    boolean: ["test", "verbose"]
});
var LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv;
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
if (argv.test) {
    console_error("lgl: running in test mode");
}
if (arg_command == "query") {
    console.log(Lgl.reasoner({ as_string: "default world" }, { as_string: arg_subcommand })
        .as_string);
}
else if (arg_command == "help") {
    console.log(cli_help);
}
else if (arg_command == "init") {
    console.log("set up .lgl cache in current directory");
}
else if (arg_command == "config") {
    console.log("configure your jurisdiction and Legalese API credentials");
}
else if (arg_command == "demo") {
    console.log("a painless introduction to a painful subject");
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
    console.log("interface with the government's Department of Information Retrieval");
}
else if (arg_command == "proforma") {
    console.log("fill templates into documents, and beyond");
}
else {
    console.error(cli_help);
}

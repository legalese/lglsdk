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
//lgl --environment=somefile.json command subcommand
// --environment=somefile.json
// command: string
// subcommand: string
// $ lgl query "are vehicles allowed in the park?"
// it depends
var argv = require('minimist')(process.argv);
var arg_command = argv._[2];
console.log("command: " + arg_command);
var arg_subcommand = argv._[3];
if (arg_subcommand) {
    console.log("subcommand: " + arg_subcommand);
    console.error(argv);
}
if (arg_command == "query") {
    console.log("response: " +
        Lgl.reasoner({ props: {} }, { query: { as_string: arg_subcommand } })
            .as_string);
}

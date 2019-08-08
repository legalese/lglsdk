#!/usr/bin/env node

import * as Lgl from "../lib/Lgl"

//lgl --world=somefile.json command subcommand

// --world=somefile.json
// command: string
// subcommand: string

// $ lgl query "are vehicles allowed in the park?"
// it depends

const cli_help = `usage: lgl --world=world.json command subcommand ...
commands:
    query "question string"
    help
    init
    config
    demo
    bizfile / corpsec
    proforma

options:
    --test            all commands will run in test mode against the dev sandbox
    --world=some.json load environment context from some.json file
    --verbose         verbose logging

environment variables:
    LGL_VERBOSE   set to truthy to get more verbosity
`;

var argv = require('minimist')(process.argv, {
    boolean:["test","verbose","v","vv"]});

const LGL_VERBOSE = process.env.LGL_VERBOSE || argv.verbose || argv.v || argv.vv
function console_error (str: string) {
  if (LGL_VERBOSE) { console.error(str) }
}

var arg_command = argv._[2];
console_error(`command: ${arg_command}`);
var arg_subcommand = argv._[3];
if (arg_subcommand) {
  console_error(`subcommand: ${arg_subcommand}`);
}

console_error(argv);

if (argv.test) { console_error("lgl: running in test mode") }

if (arg_command == "query") {
  console.log(Lgl.reasoner({as_string:"default world"},
                           {as_string: arg_subcommand})
              .as_string);
}
else if (arg_command == "help") {
  console.log(cli_help);
}
else if (arg_command == "init") {
  console.log(`set up .lgl cache in current directory`);
}
else if (arg_command == "config") {
  console.log(`configure your jurisdiction and Legalese API credentials`);
}
else if (arg_command == "demo") {
  console.log(`a painless introduction to a painful subject`);
}
else if (arg_command == "bizfile" || arg_command == "corpsec") {
  console.log(`interface with the government's Department of Information Retrieval`);
}
else if (arg_command == "proforma") {
  console.log(`fill templates into documents, and beyond`);
}
else {
  console.error(cli_help);
}

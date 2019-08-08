#!/usr/bin/env node

import * as Minimist from "minimist"
import * as Lgl from "../lib/Lgl"

//lgl --environment=somefile.json command subcommand

// --environment=somefile.json
// command: string
// subcommand: string

// $ lgl query "are vehicles allowed in the park?"
// it depends

var argv = require('minimist')(process.argv);
var arg_command = argv._[2];
console.log(`command: ${arg_command}`);

var arg_subcommand = argv._[3];
if (arg_subcommand) {
  console.log(`subcommand: ${arg_subcommand}`);
  console.error(argv);
}

if (arg_command == "query") {
  console.log("response: " +
              Lgl.reasoner({props:{}},
                           { query: { as_string: arg_subcommand } })
              .as_string);
}

#!/usr/bin/env node

import * as Minimist from "minimist"
import * as Lgl from "../lib/Lgl"

//lgl --world=somefile.json command subcommand

// --world=somefile.json
// command: string
// subcommand: string

// $ lgl query "are vehicles allowed in the park?"
// it depends

var argv = require('minimist')(process.argv);
var arg_command = argv._[2];
console.error(`command: ${arg_command}`);

var arg_subcommand = argv._[3];
if (arg_subcommand) {
  console.error(`subcommand: ${arg_subcommand}`);
  console.error(argv);
}

if (arg_command == "query") {
  console.log(Lgl.reasoner({as_string:"default world"},
                           {as_string: arg_subcommand})
              .as_string);
}

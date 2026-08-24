#!/usr/bin/env node
const { record, list } = require("./index.js");

const [subcommand, ...rest] = process.argv.slice(2);

if (subcommand === "record") {
  const cmd = rest[0];
  const code = rest[1];
  if (cmd == null || code == null) {
    process.stderr.write("usage: runledger record <cmd> <code>\n");
    process.exit(1);
  }
  const receipt = record(cmd, code);
  process.stdout.write(`${JSON.stringify(receipt)}\n`);
  process.exit(0);
}

if (subcommand === "list") {
  process.stdout.write(`${JSON.stringify(list(), null, 2)}\n`);
  process.exit(0);
}

process.stderr.write("usage: runledger <record|list> ...\n");
process.exit(1);

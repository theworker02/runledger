#!/usr/bin/env node
const {
  record,
  list,
  summary,
  formatHumanList,
  formatHumanSummary,
} = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  const valueFlags = new Set(["file", "since", "until", "cmd"]);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
      continue;
    }
    if (arg === "-V" || arg === "-v" || arg === "--version") {
      flags.version = true;
      continue;
    }
    if (arg === "--json") {
      flags.json = true;
      continue;
    }
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      const key = arg.slice(2, eq);
      flags[key] = arg.slice(eq + 1);
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (valueFlags.has(key)) {
        const next = argv[i + 1];
        if (!next || next.startsWith("-")) throw new Error(`option --${key} requires a value`);
        flags[key] = next;
        i += 1;
        continue;
      }
      throw new Error(`unknown option: ${arg}`);
    }
    if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  const [command, ...rest] = positional;
  const file = flags.file;
  const filters = { since: flags.since, until: flags.until, cmd: flags.cmd };

  if (command === "record") {
    if (rest.length < 2) fail("usage: runledger record <cmd> <code>");
    const code = rest.pop();
    const cmd = rest.join(" ");
    const receipt = record(cmd, code, process.cwd(), new Date(), file);
    process.stdout.write(flags.json ? `${JSON.stringify(receipt)}\n` : `${receipt.ts}  exit ${receipt.code}  ${receipt.cmd}\n`);
    process.exit(0);
  }

  if (command === "list") {
    const rows = list(process.cwd(), filters, file);
    process.stdout.write(flags.json ? `${JSON.stringify(rows, null, 2)}\n` : formatHumanList(rows));
    process.exit(0);
  }

  if (command === "summary") {
    const stats = summary(process.cwd(), filters, file);
    process.stdout.write(flags.json ? `${JSON.stringify(stats, null, 2)}\n` : formatHumanSummary(stats));
    process.exit(0);
  }

  fail("usage: runledger <record|list|summary> ...");
} catch (err) {
  fail(err.message);
}

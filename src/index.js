const fs = require("node:fs");
const path = require("node:path");

const STORE = ".runledger.jsonl";

function storePath(cwd = process.cwd()) {
  return path.resolve(cwd, STORE);
}

function record(cmd, code, cwd = process.cwd(), now = new Date()) {
  const receipt = {
    ts: now.toISOString(),
    cmd: String(cmd),
    code: Number(code),
  };
  fs.appendFileSync(storePath(cwd), `${JSON.stringify(receipt)}\n`, "utf8");
  return receipt;
}

function list(cwd = process.cwd()) {
  const file = storePath(cwd);
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8")
    .split(/\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

module.exports = { STORE, storePath, record, list };

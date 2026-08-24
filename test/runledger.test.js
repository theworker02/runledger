const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { record, list, summary, storePath } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

function run(args, cwd) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8", cwd });
}

describe("runledger", () => {
  it("records JSONL receipts and lists them", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "runledger-"));
    const first = record("npm test", 0, cwd, new Date("2026-08-23T12:00:00Z"));
    record("npm lint", 1, cwd, new Date("2026-08-23T12:01:00Z"));
    const rows = list(cwd);
    assert.equal(first.cmd, "npm test");
    assert.equal(rows.length, 2);
    assert.equal(rows[1].code, 1);
    const raw = fs.readFileSync(storePath(cwd), "utf8").trim().split("\n");
    assert.equal(raw.length, 2);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("filters by date and command, then summarizes", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "runledger-"));
    record("npm test", 0, cwd, new Date("2026-08-01T00:00:00Z"));
    record("npm lint", 1, cwd, new Date("2026-08-10T00:00:00Z"));
    record("npm test", 1, cwd, new Date("2026-08-20T00:00:00Z"));
    const filtered = list(cwd, { since: "2026-08-05", cmd: "test" });
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].code, 1);
    const stats = summary(cwd);
    assert.equal(stats.total, 3);
    assert.equal(stats.ok, 1);
    assert.equal(stats.fail, 2);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("writes to a custom ledger path via --file", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "runledger-"));
    const result = run(["record", "echo hi", "0", "--file", "custom.jsonl"], cwd);
    assert.equal(result.status, 0);
    assert.equal(fs.existsSync(path.join(cwd, "custom.jsonl")), true);
    const listed = run(["list", "--json", "--file", "custom.jsonl"], cwd);
    assert.equal(listed.status, 0);
    assert.equal(JSON.parse(listed.stdout).length, 1);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("rejects a non-integer exit code", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "runledger-"));
    const result = run(["record", "bad", "nope"], cwd);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /integer/);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
});

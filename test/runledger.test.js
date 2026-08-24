const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { record, list, storePath } = require("../src/index.js");

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
});

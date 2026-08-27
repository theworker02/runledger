/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

const PACKAGE = Object.freeze({ name: "@theworker02/runledger", version: "1.2.0", runtime: "node", registry: "jsr" });
const STORE = ".runledger.jsonl";

function storePath(cwd = process.cwd(), file) {
  if (file) return path.resolve(cwd, file);
  return path.resolve(cwd, STORE);
}

function parseCode(code) {
  const n = Number(code);
  if (!Number.isInteger(n)) throw new Error(`exit code must be an integer, got ${code}`);
  return n;
}

function isReceipt(value) {
  return Boolean(
    value &&
    typeof value === "object" &&
    typeof value.ts === "string" &&
    !Number.isNaN(Date.parse(value.ts)) &&
    typeof value.cmd === "string" &&
    Number.isInteger(value.code),
  );
}

function filterReceipts(rows, filters = {}) {
  const { since, until, cmd } = filters;
  let result = [...rows];
  if (since) {
    const t = Date.parse(since);
    if (Number.isNaN(t)) throw new Error(`invalid --since date: ${since}`);
    result = result.filter((row) => Date.parse(row.ts) >= t);
  }
  if (until) {
    const t = Date.parse(until);
    if (Number.isNaN(t)) throw new Error(`invalid --until date: ${until}`);
    result = result.filter((row) => Date.parse(row.ts) <= t);
  }
  if (cmd) {
    const needle = String(cmd).toLowerCase();
    result = result.filter((row) => String(row.cmd).toLowerCase().includes(needle));
  }
  return result;
}

function record(cmd, code, cwd = process.cwd(), now = new Date(), file) {
  if (cmd == null || String(cmd).trim() === "") throw new Error("command is required");
  const receipt = { ts: now.toISOString(), cmd: String(cmd), code: parseCode(code) };
  const dest = storePath(cwd, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.appendFileSync(dest, `${JSON.stringify(receipt)}\n`, "utf8");
  return receipt;
}

function readLedger(cwd = process.cwd(), file) {
  const dest = storePath(cwd, file);
  if (!fs.existsSync(dest)) return [];
  const rows = [];
  const text = fs.readFileSync(dest, "utf8");
  text.split(/\n/).forEach((line, index) => {
    if (!line.trim()) return;
    try {
      const row = JSON.parse(line);
      if (!isReceipt(row)) throw new Error("invalid receipt shape");
      rows.push(row);
    } catch (error) {
      throw new Error(`invalid JSONL at ${dest}:${index + 1} (${error.message})`);
    }
  });
  return rows;
}

function list(cwd = process.cwd(), filters = {}, file) {
  return filterReceipts(readLedger(cwd, file), filters);
}

function summary(cwd = process.cwd(), filters = {}, file) {
  const rows = list(cwd, filters, file);
  const byCmd = {};
  let ok = 0;
  let fail = 0;
  for (const row of rows) {
    if (row.code === 0) ok += 1;
    else fail += 1;
    const key = row.cmd;
    if (!byCmd[key]) byCmd[key] = { cmd: key, count: 0, ok: 0, fail: 0 };
    byCmd[key].count += 1;
    if (row.code === 0) byCmd[key].ok += 1;
    else byCmd[key].fail += 1;
  }
  return {
    total: rows.length,
    ok,
    fail,
    first: rows[0] ? rows[0].ts : null,
    last: rows.length ? rows[rows.length - 1].ts : null,
    commands: Object.values(byCmd).sort((a, b) => b.count - a.count),
  };
}

function formatHumanList(rows) {
  if (!rows.length) return "no receipts\n";
  return `${rows.map((row) => `${row.ts}  exit ${row.code}  ${row.cmd}`).join("\n")}\n`;
}

function formatHumanSummary(stats) {
  const lines = [
    `receipts: ${stats.total}`,
    `ok:       ${stats.ok}`,
    `fail:     ${stats.fail}`,
    `first:    ${stats.first || "-"}`,
    `last:     ${stats.last || "-"}`,
  ];
  if (stats.commands.length) {
    lines.push("by command:");
    for (const item of stats.commands) lines.push(`  ${item.count}  ${item.cmd}  (ok ${item.ok}, fail ${item.fail})`);
  }
  return `${lines.join("\n")}\n`;
}

export { PACKAGE, STORE, storePath, isReceipt, filterReceipts, record, list, summary, readLedger, formatHumanList, formatHumanSummary };

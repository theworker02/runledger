/**
 * Record, filter, inspect, and summarize append-only JSONL command receipts.
 *
 * @module
 */

/** One command execution receipt stored by RunLedger. */
export interface Receipt {
  /** ISO-8601 timestamp for the command execution. */
  ts: string;
  /** Command text. */
  cmd: string;
  /** Process exit code. */
  code: number;
}

/** Filters accepted by ledger listing and summary operations. */
export interface LedgerFilters {
  /** Include receipts at or after this date/time. */
  since?: string;
  /** Include receipts at or before this date/time. */
  until?: string;
  /** Include receipts whose command contains this text. */
  cmd?: string;
}

/** Per-command aggregate statistics. */
export interface CommandSummary {
  /** Command text. */
  cmd: string;
  /** Total number of matching receipts. */
  count: number;
  /** Successful executions with exit code 0. */
  ok: number;
  /** Failed executions with a non-zero exit code. */
  fail: number;
}

/** Aggregate statistics returned by {@link summary}. */
export interface LedgerSummary {
  /** Total matching receipts. */
  total: number;
  /** Successful executions. */
  ok: number;
  /** Failed executions. */
  fail: number;
  /** Timestamp of the first matching receipt, or null when empty. */
  first: string | null;
  /** Timestamp of the last matching receipt, or null when empty. */
  last: string | null;
  /** Per-command aggregates ordered by execution count. */
  commands: CommandSummary[];
}

/** Read-only package metadata exposed by RunLedger. */
export interface PackageMetadata {
  /** JSR package name. */
  readonly name: "@theworker02/runledger";
  /** Current package version. */
  readonly version: "1.2.0";
  /** Primary runtime family. */
  readonly runtime: "node";
  /** Canonical package registry. */
  readonly registry: "jsr";
}

/** Package identity and release metadata. */
export const PACKAGE: PackageMetadata;

/** Default ledger filename. */
export const STORE: ".runledger.jsonl";

/** Resolve the ledger file path for a working directory. */
export function storePath(cwd?: string, file?: string): string;

/** Return whether an unknown value has the shape of a valid RunLedger receipt. */
export function isReceipt(value: unknown): value is Receipt;

/** Filter an in-memory receipt collection without reading a ledger file. */
export function filterReceipts(rows: Receipt[], filters?: LedgerFilters): Receipt[];

/** Append a command execution receipt to the ledger. */
export function record(cmd: string, code: number | string, cwd?: string, now?: Date, file?: string): Receipt;

/** Read and validate all receipts from the ledger file. */
export function readLedger(cwd?: string, file?: string): Receipt[];

/** List receipts from disk, optionally filtered by date or command text. */
export function list(cwd?: string, filters?: LedgerFilters, file?: string): Receipt[];

/** Summarize matching command receipts. */
export function summary(cwd?: string, filters?: LedgerFilters, file?: string): LedgerSummary;

/** Format ledger rows as human-readable terminal output. */
export function formatHumanList(rows: Receipt[]): string;

/** Format ledger summary statistics as human-readable terminal output. */
export function formatHumanSummary(stats: LedgerSummary): string;

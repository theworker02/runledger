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

/** Default ledger filename. */
export const STORE: string;

/** Resolve the ledger file path for a working directory. */
export function storePath(cwd?: string, file?: string): string;

/** Append a command execution receipt to the ledger. */
export function record(cmd: string, code: number | string, cwd?: string, now?: Date, file?: string): Receipt;

/** Read all receipts from the ledger file. */
export function readLedger(cwd?: string, file?: string): Receipt[];

/** List receipts, optionally filtered by date or command text. */
export function list(cwd?: string, filters?: LedgerFilters, file?: string): Receipt[];

/** Summarize matching command receipts. */
export function summary(cwd?: string, filters?: LedgerFilters, file?: string): LedgerSummary;

/** Format ledger rows as human-readable terminal output. */
export function formatHumanList(rows: Receipt[]): string;

/** Format ledger summary statistics as human-readable terminal output. */
export function formatHumanSummary(stats: LedgerSummary): string;

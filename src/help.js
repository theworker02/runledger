const HELP = `runledger 1.00 (1.0.0)

Usage:
  runledger record <cmd> <code> [options]
  runledger list [options]
  runledger summary [options]

Append-only JSONL command ledger. Each receipt is {ts, cmd, code}.
Default store: ./.runledger.jsonl

Subcommands:
  record             Append one receipt. <cmd> is a string; <code> is an integer
  list               Print receipts, optionally filtered
  summary            Counts, first/last timestamps, and per-command totals

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             JSON output (pretty for list/summary)
  --file <path>      Ledger file (relative to cwd unless absolute)
  --since <date>     Keep receipts at or after this ISO/date string
  --until <date>     Keep receipts at or before this ISO/date string
  --cmd <substr>     Keep receipts whose cmd contains this substring

Exit codes:
  0  success
  1  usage error, invalid JSONL, or invalid date/code

Examples:
  runledger record "npm test" 0
  runledger record "npm lint" 1 --file ./tmp/runs.jsonl
  runledger list --since 2026-08-01 --cmd test
  runledger summary --json
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };

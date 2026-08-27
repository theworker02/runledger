# runledger

<img src="docs/logo.svg" alt="runledger mark" width="96" height="96">

**Record append-only JSONL command receipts, validate them, filter them, and summarize execution history.**

[![JSR](https://jsr.io/badges/@theworker02/runledger)](https://jsr.io/@theworker02/runledger)
![version 1.2.0](https://img.shields.io/badge/version-1.2.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)

**Package:** [`@theworker02/runledger`](https://jsr.io/@theworker02/runledger) · **Docs:** [GitHub Pages](https://theworker02.github.io/runledger/) · **Source:** [`theworker02/runledger`](https://github.com/theworker02/runledger)

## Highlights

- Append-only JSONL command receipts with ISO timestamps.
- Validates receipt shape while reading ledgers.
- Filters by date range and command substring.
- Supports in-memory filtering through `filterReceipts()`.
- Produces per-command and aggregate summaries.
- Fully documented TypeScript symbols on JSR.
- Trusted publishing through GitHub Actions with provenance.

## Add from JSR

```bash
deno add jsr:@theworker02/runledger
```

```ts
import {
  filterReceipts,
  isReceipt,
  PACKAGE,
  record,
  summary,
} from "@theworker02/runledger";

record("node --test", 0);
console.log(summary());
console.log(isReceipt({ ts: new Date().toISOString(), cmd: "build", code: 0 }));
console.log(filterReceipts([], { cmd: "test" }), PACKAGE.version);
```

## Public API

### Ledger operations

- `record(cmd, code, cwd, now, file)` — append one command receipt.
- `readLedger(cwd, file)` — read and validate JSONL receipts.
- `list(cwd, filters, file)` — load and filter receipts.
- `summary(cwd, filters, file)` — aggregate command outcomes.

### Validation and filtering

- `isReceipt(value)` — type guard for receipt-shaped data.
- `filterReceipts(rows, filters)` — filter an in-memory receipt set.
- `storePath(cwd, file)` — resolve the active ledger path.
- `STORE` — default ledger filename.
- `PACKAGE` — package identity and release metadata.

### Formatting

- `formatHumanList(rows)` — terminal-friendly receipt output.
- `formatHumanSummary(stats)` — terminal-friendly summary output.

### Types

`Receipt`, `LedgerFilters`, `CommandSummary`, `LedgerSummary`, and `PackageMetadata` are documented in JSR.

## CLI from source

```bash
git clone https://github.com/theworker02/runledger.git
cd runledger
node src/cli.js --help
```

Examples:

```bash
node src/cli.js record "node --test" 0
node src/cli.js list
node src/cli.js summary
```

## Development

```bash
node --test
```

## Publishing

The canonical package is published to JSR through GitHub Actions using OIDC trusted publishing.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/runledger)
- [Project site](https://theworker02.github.io/runledger/)
- [Source repository](https://github.com/theworker02/runledger)

## License

[MIT](LICENSE) © 2026 theworker02

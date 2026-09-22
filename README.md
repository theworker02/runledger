# runledger


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="runledger mark" width="96" height="96">

**Record append-only JSONL command receipts, validate them, filter them, and summarize execution history.**

[![JSR](https://jsr.io/badges/@theworker02/runledger)](https://jsr.io/@theworker02/runledger)
![version 1.2.0](https://img.shields.io/badge/version-1.2.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)

**Package:** [`@theworker02/runledger`](https://jsr.io/@theworker02/runledger)  ·  **Docs:** [GitHub Pages](https://theworker02.github.io/runledger/)  ·  **Source:** [`theworker02/runledger`](https://github.com/theworker02/runledger)

## Purpose

Append-only JSONL ledger of command executions `{ts, cmd, code}` with list, filter, and summary helpers. Useful for local run history, workshop auditing, and lightweight automation receipts.


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



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/runledger.git
cd runledger
node src/cli.js record "npm test" 0
node src/cli.js record "npm lint" 1 --file ./tmp/runs.jsonl
node src/cli.js list --since 2026-08-01 --cmd test
node src/cli.js summary --json
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Not a distributed log; files are local and not locked for multi-process writers.
- Stores command strings as provided; secrets in argv will be persisted verbatim.
- Date filters parse ISO/date strings; timezone semantics follow the host environment.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/runledger)
- [Project site](https://theworker02.github.io/runledger/)
- [Source repository](https://github.com/theworker02/runledger)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

runledger is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).


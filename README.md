# runledger

<img src="docs/logo.svg" alt="runledger mark" width="96" height="96">

**Append {ts,cmd,code} receipts to .runledger.jsonl and list them later.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/runledger?display_name=release)
[![npm](https://img.shields.io/npm/v/%40magnexis/runledger.svg)](https://www.npmjs.com/package/%40magnexis/runledger)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/runledger/) · **Source:** [`theworker02/runledger`](https://github.com/theworker02/runledger) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/runledger/releases/tag/v1.0.0) · **npm:** [`@magnexis/runledger`](https://www.npmjs.com/package/%40magnexis/runledger)

## Why it exists

Shell history is noisy and easy to lose. runledger writes an append-only JSONL log next to the project so you can prove what ran and whether it succeeded.

## Who it is for

Anyone wrapping scripts, workshop graders, or local CI helpers who need a durable, grep-friendly command log.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm i -g @magnexis/runledger
runledger --help
```

Package page: https://www.npmjs.com/package/%40magnexis/runledger

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/runledger.git
runledger --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/runledger.git
cd runledger
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/runledger --help
node src/cli.js --help
```

## Quick start

```bash
runledger record "npm test" 0
runledger list
```

The list command prints a JSON array of receipts with ISO timestamps.

## CLI reference

```text
runledger 1.00 (1.0.0)

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
```

Print the same text locally:

```bash
runledger --help
runledger -h
runledger --version
runledger -V
```

Expected version output:

```text
1.0.0
```

## Configuration

Default store is `.runledger.jsonl` in the current working directory. Override with `--file`.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | record, list, or summary succeeded. |
| `1` | Unknown subcommand, invalid JSONL, or bad date/code. |

## Examples

### Success path

Record a passing command, then list and summarize.

```bash
runledger record "npm test" 0
runledger list
runledger summary
```

```text
2026-08-23T16:00:00.000Z  exit 0  npm test
receipts: 1
ok:       1
```

### Failure path

Missing record arguments fail fast.

```bash
runledger record
```

```text
usage: runledger record <cmd> <code>
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/runledger/](https://theworker02.github.io/runledger/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)

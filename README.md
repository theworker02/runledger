# runledger

<img src="docs/logo.svg" alt="runledger mark" width="88" height="88">

**Append {ts,cmd,code} receipts to .runledger.jsonl and list them later.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/runledger?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

Shell history is noisy and easy to lose. runledger writes an append-only JSONL log next to the project so you can prove what ran and whether it succeeded.

## Who it is for

Anyone wrapping scripts, workshop graders, or local CI helpers who need a durable, grep-friendly command log.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/runledger.git --help
node src/cli.js --help
```

## Quick start

```bash
runledger record "npm test" 0
runledger list
```

The list command prints a JSON array of receipts with ISO timestamps.

## CLI reference

Synopsis:

```text
runledger <command> [args]
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `record <cmd> <code>` | Append one receipt. <cmd> is a string; <code> is the numeric exit code. |
| `list` | Print all receipts as a JSON array. |

Print the same text locally:

```bash
runledger --help
runledger --version
```

Expected version output:

```text
1.0.0
```

## Configuration

Store file is always `.runledger.jsonl` in the current working directory. There is no global config. Create the file by recording; missing file means list returns [].

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | record or list succeeded. |
| `1` | Unknown subcommand or missing record arguments. |

## Examples

### Success path

Record a passing command, then list.

```bash
runledger record "npm test" 0
runledger list
```

```json
[{"ts":"2026-08-23T16:00:00.000Z","cmd":"npm test","code":0}]
```

### Failure path

Missing arguments fail fast.

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

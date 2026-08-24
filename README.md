# runledger

<img src="docs/logo.svg" alt="runledger mark" width="72" height="72">

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![npm 1.0.0](https://img.shields.io/badge/npm-1.0.0-0B1F33)

Append JSONL command receipts `{ts,cmd,code}` to `.runledger.jsonl`. Subcommands: `record` and `list`.

Package version: **1.00** (`1.0.0`).

## Install

```bash
git clone https://github.com/theworker02/runledger.git
cd runledger
npm install -g .
```

## Usage

```bash
runledger record "npm test" 0
runledger list
```

## GitHub Pages

Source: `main` branch, `/docs` folder. Enable Pages, then open `https://theworker02.github.io/runledger/`.

## License

MIT © 2026 theworker02

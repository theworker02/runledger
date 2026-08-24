# runledger

<img src="docs/logo.svg" alt="runledger mark" width="72" height="72">

Append JSONL command receipts `{ts,cmd,code}` to `.runledger.jsonl`. Subcommands: `record` and `list`.

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

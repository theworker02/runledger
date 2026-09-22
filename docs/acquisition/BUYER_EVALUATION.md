# Buyer evaluation â€” runledger

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
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
```bash
git clone https://github.com/theworker02/runledger.git
cd runledger
node src/cli.js --help
```
```bash
node src/cli.js record "node --test" 0
node src/cli.js list
node src/cli.js summary
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*

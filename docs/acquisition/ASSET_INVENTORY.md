# Asset inventory â€” runledger

## Repository surfaces

| Asset | Location / notes |
|-------|------------------|
| Source tree | Repository root / language packages |
| Tests | `test/`, `tests/`, CI workflows if present |
| Docs | `README.md`, `docs/` |
| Diligence room | `docs/acquisition/` |
| License / notices | `LICENSE`, transition notices if present |
| Funding | `.github/FUNDING.yml` |
| CI | `.github/workflows/` if present |
| Branding | logos/assets folders if present |

## Capability highlights

- Append-only JSONL command receipts with ISO timestamps.
- Validates receipt shape while reading ledgers.
- Filters by date range and command substring.
- Supports in-memory filtering through `filterReceipts()`.
- Produces per-command and aggregate summaries.
- Fully documented TypeScript symbols on JSR.
- Trusted publishing through GitHub Actions with provenance.
- `record(cmd, code, cwd, now, file)` Ã¢â‚¬â€ append one command receipt.
- `readLedger(cwd, file)` Ã¢â‚¬â€ read and validate JSONL receipts.
- `list(cwd, filters, file)` Ã¢â‚¬â€ load and filter receipts.
- `summary(cwd, filters, file)` Ã¢â‚¬â€ aggregate command outcomes.
- `isReceipt(value)` Ã¢â‚¬â€ type guard for receipt-shaped data.

## Usually excluded

Seller personal accounts, unrelated repos, and unreissued registry tokens â€” unless listed in the definitive agreement.

*Updated: 2026-09-22*

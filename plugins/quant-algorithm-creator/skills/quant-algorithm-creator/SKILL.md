---
name: quant-algorithm-creator
description: Use when creating a new crypto trading algorithm version (v3.0+), designing quantitative indicators for mean reversion strategies, or running iterative backtest optimization to achieve >90% win rate with >=5 signals/day. Triggers on requests to build new algo versions, optimize trading signals, add indicators to the coin-brain engine, or backtest crypto strategies on multiple timeframes.
---

# Quant Algorithm Creator

Create and optimize high-win-rate crypto mean reversion algorithms through iterative backtesting. Each version uses a different indicator but follows the same proven structure: deviation-based entry, partial reversion TP, no SL (time exit only).

## Targets (non-negotiable)

| Metric | Target |
|--------|--------|
| Win Rate | > 90% on every TF |
| Signals/Day | >= 5 on every TF |
| Symbols | BTC + ETH both pass |
| Timeframes | 5m, 15m, 30m, 1h all pass |

## Step 1: Choose Indicator

Read `references/indicator-insights.md` for candidates and what has already been used/failed.

Pick a mean reversion indicator that measures "price is too far from a reference." The indicator MUST be fundamentally different from existing versions. Do NOT use momentum oscillators or trend-following filters as primary signals.

## Step 2: Create Infrastructure

Read `references/codebase-patterns.md` for templates and project structure.

Create these files (replace `{X}` with version number):

1. **Indicator** (`engine/indicators/{name}.ts`) — compute indicator series, export from `index.ts`
2. **Config** (`engine/config/v{X}_0.ts`) — interface + per-TF defaults, include `minDeviation: 0.005`
3. **Signal generator** (`engine/signal/generators_v{X}.ts`) — evalBuy/evalSell with cooldown, null checks, entry condition, minimum deviation filter, confidence scoring
4. **Backtest script** (`scripts/research/backtest_v{X}.ts`) — CLI with all param overrides, `--all-tfs` mode, overlapping trades
5. **npm scripts** in `package.json` — `research:backtest-v{X}` and `research:backtest-v{X}-all`

Critical patterns:
- Overlapping trades: `i += Math.max(1, cfg.cooldownBars)` NOT `i = exitIndex`
- TP from deviation: `tpDist = deviation * tpFraction` (deviation = distance from reference)
- SL effectively disabled: `slMultiplier: 100.0`
- Win = `netReturn > 0` where `netReturn = rawReturn - 2 * costBps / 10000`
- Negative CLI args use `=` syntax: `--param=-0.1`

## Step 3: Iterative Optimization

Read `references/optimization-playbook.md` for the full protocol.

Run on **15m** first. Change ONE parameter per iteration.

### Phase order:
1. **Baseline** — default params, record WR + signals/day
2. **Add minimum deviation filter** — `minDev: 0.005` (expect +20-30% WR jump)
3. **Tune indicator period** — try 10, 15, 20, 25 (15 usually wins)
4. **Tune entry threshold** — strictness vs signal count tradeoff
5. **Tune maxBars** — 128 → 256 → 512 (longer = higher WR)
6. **Tune cooldown** — 1, 2, 3

### Rules:
- NEVER lower tpFraction below 0.35 (net return goes negative after costs)
- NEVER add indicator filters (momentum, volume, trend) — they hurt WR
- If WR stuck at 60-75%, the minimum deviation filter is missing
- If WR drops when lowering TP, it's the cost threshold problem
- Keep iterating until 15m passes >90% WR for both BTC and ETH

## Step 4: Multi-TF Optimization

After 15m passes, run `--all-tfs` to check 5m, 30m, 1h.

Per-TF tuning guidelines:
- **5m**: Many candles → strict entry OK, cooldown 3, maxBars 512
- **15m**: Balanced → moderate entry, cooldown 2-3, maxBars 256
- **30m**: Fewer candles → relax entry threshold, cooldown 1, maxBars 256
- **1h**: Fewest candles → most relaxed entry threshold, cooldown 1, maxBars 256

If 30m/1h signals < 5/day: relax entry threshold + set cooldown to 1.

## Step 5: Finalize Config

Update the config file with per-TF optimized parameters. Run `--all-tfs` one final time to verify ALL targets are met on every TF for both symbols.

## Step 6: Document

Create `docs/v{X}_0-algorithm.md` in Korean for non-expert audience. Include:
- Algorithm concept and indicator explanation
- Entry/exit logic
- Per-TF optimized parameters table
- Backtest results table (WR + signals/day per TF per symbol)
- Comparison with previous versions
- Caveats (backtesting ≠ live performance, cost assumptions)

## Step 7: Update Skill References

Update `references/indicator-insights.md`:
- Move the used indicator from "Candidates" to "Already used" with version number
- Add benchmark results to the existing results table
- Document any new insights about what worked/failed

## Reference Files

- **`references/optimization-playbook.md`**: Full optimization protocol, parameter sensitivity map, failure modes and fixes
- **`references/codebase-patterns.md`**: Project structure, code templates for all file types, critical implementation patterns
- **`references/indicator-insights.md`**: Indicator performance history, parameter sweet spots, candidates for next versions

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing minimum deviation filter | Add `minDeviation: 0.005` — this is the single biggest WR booster |
| Lowering TP fraction for "more wins" | NEVER go below 0.35 — small TP means net return < cost threshold |
| Adding momentum/volume/trend filters | Remove them — every filter tested has hurt WR |
| Using `i = exitIndex` in backtest loop | Use `i += Math.max(1, cooldownBars)` for overlapping trades |
| Same params for all TFs | Each TF needs different entry threshold and cooldown |
| Negative CLI args fail to parse | Use `=` syntax: `--param=-0.1` |
| 30m/1h signals too few | Relax entry threshold + cooldown=1 |

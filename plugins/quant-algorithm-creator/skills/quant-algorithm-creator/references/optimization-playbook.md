# Optimization Playbook

## Proven High-WR Strategy Structure

The following structure consistently achieves >90% win rate on crypto 15m/30m/1h/5m timeframes:

### Core Formula
```
Entry: Price deviates significantly from a reference line (mean reversion)
TP: Small partial reversion (30-50% of deviation back toward reference)
SL: NONE — use time-based exit only (maxBars timeout)
Overlapping: Allow overlapping trades for signal-quality measurement
```

### Why This Works
1. Price ALWAYS oscillates around the mean — reversion is the strongest edge in crypto
2. Small TP = high hit rate (you only need a tiny move in your direction)
3. No SL = stop losses cut winning trades during volatility spikes
4. Time exit = trades that don't hit TP within N bars exit at market price

### Critical Constraint: Cost Threshold
- Round-trip cost ≈ 20 bps (2 × 10 bps per side)
- TP must produce wins > 20 bps after costs
- If `TP_distance_bps < 25`, most "wins" become losses after cost deduction
- This means: minimum deviation from reference must ensure `deviation × TP_fraction > 25 bps`

## Iterative Optimization Protocol

### Phase 1: Baseline (1-2 iterations)
Run on 15m with default indicator params, TP=0.4, no SL, maxBars=128, cooldown=3.
Record BTC and ETH WR + signals/day as baseline.

### Phase 2: Indicator Tuning (3-5 iterations)
Change ONE parameter at a time:
1. Indicator period/length (try 10, 15, 20, 25)
2. Indicator multiplier/threshold (if applicable)
3. Entry threshold strictness

### Phase 3: TP/Exit Tuning (2-3 iterations)
1. TP fraction: 0.3, 0.4, 0.5 (0.4 is usually best)
2. maxBars: 64, 128, 256, 512 (longer = higher WR)
3. Lower TP fraction = LOWER WR (counterintuitive — because net return after costs turns negative)

### Phase 4: Signal Frequency Tuning (2-3 iterations)
1. cooldownBars: 1, 2, 3 (lower = more signals)
2. Entry threshold relaxation (let signals fire slightly "inside" the zone)

### Phase 5: Multi-TF Optimization (4+ iterations)
Each timeframe needs different params:
- **5m**: Many candles/day → can afford strict entry, higher cooldown, more maxBars
- **15m**: Medium frequency → balanced params
- **30m/1h**: Few candles/day → need relaxed entry thresholds and low cooldown (1) to hit >=5 signals/day

### Parameter Sensitivity Map (from experience)

| Parameter | Impact on WR | Impact on Signals/Day |
|-----------|-------------|----------------------|
| Higher maxBars | +2-5% WR | No change |
| Lower cooldown | -0 to -1% WR | +50-200% signals |
| Lower TP fraction | DECREASES WR (cost effect) | No change |
| Stricter entry | +3-8% WR | -30-60% signals |
| Minimum deviation filter | +20-30% WR | -20-40% signals |
| Removing indicator filters | +2-5% WR | +10-30% signals |

## Targets

| Metric | Target | Non-negotiable |
|--------|--------|---------------|
| Win Rate | > 90% | Yes |
| Signals/Day | >= 5 | Yes |
| Applies to | BTC + ETH | Yes |
| Timeframes | 5m, 15m, 30m, 1h | All must pass |

## Common Failure Modes

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| WR stuck at 60-75% | No minimum deviation filter | Add min deviation (0.5% of price) |
| Small TP = lower WR | After-cost net return goes negative | Keep TP fraction >= 0.4 |
| Indicator filter drops WR | Filter removes good signals | Disable filter (pure deviation entry) |
| 30m/1h signals < 5/day | Too strict entry + high cooldown | Relax entry threshold, cooldown=1 |
| Low-vol signals hurt WR | TP too small to cover costs | Add bandwidth/deviation minimum |

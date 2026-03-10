# Indicator Insights from Optimization History

## What Works for High WR (>90%) in Crypto

### Mean Reversion Indicators (BEST for high WR)
Any indicator that measures "price is too far from some reference" works well when combined with:
- Small TP (partial reversion)
- No SL (time-based exit)
- Minimum deviation filter

**Already used:**
- v1.0: EMA(15) — fixed 0.5% deviation threshold
- v2.0: Bollinger Bands(15, 2.0) — adaptive std dev bands + 0.5% min deviation

**Candidates for v3.0+** (NOT yet used):
- **Keltner Channel**: SMA + ATR-based bands (different from BB's std dev bands)
- **CCI (Commodity Channel Index)**: `(TypicalPrice - SMA) / (0.015 × MeanDeviation)` — when CCI < -100 or > 100
- **Donchian Channel**: N-period high/low extremes — mean reversion from channel boundaries
- **VWAP Deviation**: Price distance from Volume-Weighted Average Price
- **Williams %R**: Momentum oscillator, range [-100, 0], extreme at < -80 or > -20
- **Rate of Change (ROC)**: Simple % change over N bars — extreme ROC suggests overextension
- **Z-Score**: (Price - SMA) / StdDev — normalized deviation measure

### Indicators That FAILED as Signal Filters

| Indicator | Role Tested | Result | Why It Failed |
|-----------|-------------|--------|--------------|
| StochRSI K/D crossover | Primary signal | 35% WR | Oscillates too rapidly on 15m crypto |
| MACD histogram direction | Primary signal | 63% WR, PF 0.58 | No predictive power on 15m |
| StochRSI as filter | Added to EMA signal | WR dropped 86% → 54% | Filtered out good signals |
| Volume filter | Added to EMA signal | No improvement | Volume doesn't correlate with reversion success |
| ADX trend filter | Added to EMA signal | No improvement | Mean reversion works in all regimes |
| MACD as filter | Added to BB signal | Not tested (likely harmful) | Same issues as with EMA |

### Key Principle: Simplicity Wins
Every time we added a filter on top of a working deviation signal, it hurt performance.
The ONLY filter that helps is **minimum deviation** (ensures TP > cost threshold).

## Parameter Sweet Spots (from extensive testing)

### Indicator Period
- **15** is consistently better than 20 (both EMA and BB)
- Shorter periods (10-12) are slightly worse
- Longer periods (25+) are slightly worse
- Theory: 15 balances responsiveness vs stability

### TP Fraction
- **0.4** is the sweet spot
- 0.3 and below → WR drops (net return after costs goes negative)
- 0.5 → Works but slightly lower WR than 0.4
- Never go below 0.35

### maxBars (Time Exit)
- Longer = always better WR (more time for reversion to occur)
- 256 is the practical sweet spot for 15m/30m/1h
- 512 for 5m (keeps real-time reasonable at ~42h)
- Going beyond 512 has diminishing returns

### Cooldown
- 3 is good for 5m/15m (many candles per day)
- 1 is needed for 30m/1h (to get >=5 signals/day)
- 2 is a middle ground

### Entry Threshold
- Tighter (more extreme) = higher WR but fewer signals
- For 30m/1h: must relax threshold to get enough signals
- v1.0 pattern: fixed deviation (0.5%)
- v2.0 pattern: %B threshold varies by TF (0.05 for 5m/15m, 0.10 for 30m, 0.15 for 1h)

## Existing Algorithm Results (Benchmarks)

### v1.0 EMA Mean Reversion
| TF | BTC WR | BTC/day | ETH WR | ETH/day |
|----|--------|---------|--------|---------|
| 5m | 91.90% | 11.75 | 93.06% | 18.40 |
| 15m | 92.07% | 9.03 | 92.71% | 12.52 |
| 30m | 92.76% | 6.72 | 93.29% | 8.61 |
| 1h | 93.67% | 6.30 | 93.93% | 7.64 |

### v2.0 Bollinger Band Reversion
| TF | BTC WR | BTC/day | ETH WR | ETH/day |
|----|--------|---------|--------|---------|
| 5m | 93.49% | 8.46 | 94.04% | 12.27 |
| 15m | 92.50% | 5.32 | 93.22% | 6.59 |
| 30m | 92.97% | 8.05 | 93.05% | 9.41 |
| 1h | 93.16% | 6.32 | 93.04% | 6.96 |

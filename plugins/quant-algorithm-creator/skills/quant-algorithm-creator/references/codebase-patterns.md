# Codebase Patterns & Templates

## Project Structure

```
coin-brain/
├── engine/
│   ├── types.ts                    # CandleSeries, Signal, Trade, Metrics, Interval
│   ├── indicators/
│   │   ├── index.ts                # Re-exports all indicators
│   │   ├── ema.ts                  # ema(values, length)
│   │   ├── rsi.ts                  # rsi(closes, length)
│   │   ├── macd.ts                 # macd(closes, {fast, slow, signal})
│   │   ├── atr.ts                  # atr(high, low, close, length)
│   │   ├── adx.ts                  # adx(high, low, close, length)
│   │   ├── stoch_rsi.ts            # stochRsi(closes, params)
│   │   ├── bollinger.ts            # bollingerBands(close, length, multiplier)
│   │   ├── volume.ts               # volumeRatio(volume, smaLength)
│   │   └── series.ts               # crossesUp, crossesDown, slope1, etc.
│   ├── config/
│   │   ├── v1_0.ts                 # EMA Mean Reversion config
│   │   └── v2_0.ts                 # Bollinger Band Reversion config
│   ├── signal/
│   │   ├── generators_v1.ts        # v1.0 signal generator
│   │   ├── generators_v2.ts        # v2.0 signal generator
│   │   └── timeframe_map.ts        # mapLowerToHigherByCloseTime()
│   ├── backtest/
│   │   ├── backtest.ts             # computeMetrics(), runBacktestFixedHorizon()
│   │   ├── metrics.ts              # maxDrawdownFromTrades()
│   │   └── walkforward.ts          # buildWalkForwardWindows()
│   ├── data/
│   │   ├── find.ts                 # findBestKlinesCsv()
│   │   └── klines_csv.ts           # loadKlinesCsv()
│   └── utils/
│       └── time.ts                 # formatRunId(), toIso(), intervalToMs()
├── scripts/research/
│   ├── backtest_v1.ts              # v1.0 backtest runner
│   └── backtest_v2.ts              # v2.0 backtest runner
├── data/                           # Market data CSVs (external)
└── docs/
    ├── v1_0-algorithm.md           # v1.0 documentation (Korean)
    └── v2_0-algorithm.md           # v2.0 documentation (Korean)
```

## Data Location
CSV files at: `../tmp/market-data/binance-vision/merged/`
Format: `{SYMBOL}_{INTERVAL}.csv` (e.g., `BTCUSDT_15m.csv`)

## Template: New Indicator

```typescript
// engine/indicators/{name}.ts
export interface {Name}Series {
  // output arrays
}

export function {name}(
  close: number[],
  length: number = 20,
  // ... other params
): {Name}Series {
  const n = close.length;
  // Initialize output arrays with null
  const out: Array<number | null> = new Array(n).fill(null);
  if (n < length) return { /* ... */ };

  // Compute indicator
  // ...

  return { /* ... */ };
}
```

Then export from `engine/indicators/index.ts`:
```typescript
export { {name} } from "./{name}";
export type { {Name}Series } from "./{name}";
```

## Template: Config Interface

```typescript
// engine/config/v{X}_0.ts
import type { Interval } from "../types";

export interface V{X}_0_Config {
  algoKey: "v{X}_0";
  instrument: "usdm_perp";
  symbols: readonly string[];
  entryTf: Interval;

  // Indicator-specific params
  // ...

  // Minimum deviation filter (CRITICAL for high WR)
  minDeviation: number;      // e.g. 0.005 = 0.5%

  // TP/SL
  tpFraction: number;        // 0.4 = 40% reversion
  slMultiplier: number;      // 100 = effectively disabled
  maxBars: number;           // time-based exit

  // Cooldown
  cooldownBars: number;

  // Backtest
  backtest: {
    walkForward: { trainDays: number; testDays: number; embargoDays: number };
    costScenarios: { base: number; downside: number };
  };
}

// SHARED defaults (params common across all TFs)
const SHARED: Omit<Config, "entryTf" | "maxBars" | "cooldownBars" | /* TF-specific */> = {
  algoKey: "v{X}_0",
  instrument: "usdm_perp",
  symbols: ["BTCUSDT", "ETHUSDT"],
  // ... indicator params
  minDeviation: 0.005,
  tpFraction: 0.4,
  slMultiplier: 100.0,
  backtest: {
    walkForward: { trainDays: 180, testDays: 30, embargoDays: 2 },
    costScenarios: { base: 10, downside: 20 },
  },
};

// Per-TF exports
export const V{X}_0_5m  = { ...SHARED, entryTf: "5m",  maxBars: 512, cooldownBars: 3, /* TF overrides */ };
export const V{X}_0_15m = { ...SHARED, entryTf: "15m", maxBars: 256, cooldownBars: 3, /* TF overrides */ };
export const V{X}_0_30m = { ...SHARED, entryTf: "30m", maxBars: 256, cooldownBars: 1, /* TF overrides */ };
export const V{X}_0_1h  = { ...SHARED, entryTf: "1h",  maxBars: 256, cooldownBars: 1, /* TF overrides */ };
export const V{X}_0 = V{X}_0_15m; // Default
```

## Template: Signal Generator

```typescript
// engine/signal/generators_v{X}.ts
import type { CandleSeries, Interval, Signal } from "../types";
import type { V{X}_0_Config } from "../config/v{X}_0";

export interface V{X}SignalInput {
  symbol: string;
  entryTf: Interval;
  i: number;
  entryCandles: CandleSeries;
  // indicator series...
  cfg: V{X}_0_Config;
}

export interface V{X}AlgoState {
  lastBuySignalIndex: number;
  lastSellSignalIndex: number;
}

export function initV{X}AlgoState(): V{X}AlgoState {
  return { lastBuySignalIndex: -1e15, lastSellSignalIndex: -1e15 };
}

export function maybeSignalV{X}(input: V{X}SignalInput, state: V{X}AlgoState): Signal | null {
  const buy = evalBuy(input, state);
  const sell = evalSell(input, state);
  if (buy && sell) return buy.confidence >= sell.confidence ? buy : sell;
  return buy ?? sell;
}

function evalBuy(input: V{X}SignalInput, state: V{X}AlgoState): Signal | null {
  const { symbol, entryTf, i, entryCandles, cfg } = input;
  // 1. Cooldown check
  if (i - state.lastBuySignalIndex < cfg.cooldownBars) return null;
  // 2. Null checks on price and indicator values
  // 3. Entry condition (indicator-specific)
  // 4. Minimum deviation filter (CRITICAL)
  // 5. Confidence scoring (50 base + bonuses)
  // 6. Update state and return Signal
  state.lastBuySignalIndex = i;
  return { tsClose, symbol, tf: entryTf, side: "BUY", confidence, reasons, featuresSnapshot };
}
// evalSell is mirror of evalBuy
```

## Template: Backtest Script

Key sections in `scripts/research/backtest_v{X}.ts`:

1. **CLI args**: parseArgs with all config overrides as `--param-name` strings
2. **Multi-TF mode**: `--all-tfs` flag spawns subprocess per TF with optimized params
3. **Data loading**: `findBestKlinesCsv()` → `loadKlinesCsv()`
4. **Indicator computation**: Call indicator functions on candle data
5. **Signal function factory**: `mkSignalFn()` creates stateful signal evaluator
6. **Barrier backtest loop**:
   ```typescript
   while (i < iEnd) {
     const signal = signalFn(i);
     if (!signal) { i++; continue; }
     // Entry at next bar open
     // Compute TP/SL from indicator deviation
     // Scan bars for TP/SL/timeout hit
     // Record trade
     i += Math.max(1, cfg.cooldownBars); // OVERLAPPING trades
   }
   ```
7. **Output**: Hit rate, expectancy, signals/day, config summary

### Critical: Overlapping Trades
Use `i += Math.max(1, cfg.cooldownBars)` NOT `i = exitIndex`.
This measures SIGNAL QUALITY (can fire new signals while previous trade is open).

### Critical: TP/SL Calculation
```typescript
const deviation = Math.abs(signalClose - referenceValue);
const tpDist = deviation * cfg.tpFraction;
const slDist = deviation * cfg.slMultiplier; // 100 = effectively infinite

targetPrice = side === "BUY" ? entryPrice + tpDist : entryPrice - tpDist;
stopPrice = side === "BUY" ? entryPrice - slDist : entryPrice + slDist;
```

### Critical: Hit Rate Calculation
Win = `netReturn > 0` where `netReturn = rawReturn - (2 * costPerSideBps / 10_000)`
This means TP must produce gross return > 20 bps to count as a win.

## NPM Scripts Pattern
```json
{
  "research:backtest-v{X}": "tsx scripts/research/backtest_v{X}.ts",
  "research:backtest-v{X}-all": "tsx scripts/research/backtest_v{X}.ts --all-tfs"
}
```

## Negative Values in CLI Args
Use `=` syntax for negative numbers: `--param=-0.1` (NOT `--param -0.1`)

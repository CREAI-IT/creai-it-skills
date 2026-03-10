# Market Sizing Module

Use when the case requires TAM/SAM/SOM estimation or opportunity sizing.

## Sizing Methods

1. Top-down: macro market size multiplied by relevance/adoption filters.
2. Bottom-up: account count multiplied by expected annual spend.
3. Value-based: economic value created multiplied by capture rate.

Use at least two methods and reconcile differences.

## Core Formulas

```text
TAM = Total relevant accounts × annual spend potential
SAM = TAM × near-term reachable share
SOM = SAM × realistic capture share in target horizon
```

## Required Inputs

1. Geography and time horizon.
2. Account universe definition.
3. Price or spend assumptions.
4. Adoption and penetration assumptions.

## Required Tables

### Input Assumptions
| Input | Value | Unit | Source | Confidence (1-5) |
|---|---:|---|---|---:|

### Sizing Outputs
| Method | TAM | SAM | SOM | Notes |
|---|---:|---:|---:|---|

### Scenario Range
| Case | Key assumptions | TAM | SAM | SOM |
|---|---|---:|---:|---:|

## Output Requirement

Return:
1. Base TAM/SAM/SOM with formulas.
2. Low/base/high range and driver explanation.
3. Most sensitive assumptions.

## Common Mistakes

1. Mixing incompatible geographies or timeframes.
2. Treating one-source estimates as definitive.
3. Missing explicit assumption confidence.

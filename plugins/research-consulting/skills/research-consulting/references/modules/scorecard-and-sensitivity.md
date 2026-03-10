# Scorecard and Sensitivity Module

Use when the case requires explicit option prioritization and defensible recommendation logic.

## Criteria Design Rules

1. Define criteria so they are MECE.
2. Use 5-9 criteria maximum.
3. Assign weights that sum to 100.
4. Specify scoring anchors (what 1, 3, and 5 mean).

## Scoring Process

1. Score each option per criterion.
2. Compute weighted total.
3. Document rationale for each score.
4. Check if one criterion dominates unfairly.

Formula:

```text
Weighted total = Σ(score_i × weight_i)
```

## Sensitivity Process

1. One-way sensitivity: vary one key input at a time.
2. Scenario sensitivity: downside/base/upside bundles.
3. Identify recommendation-flip threshold.

## Required Tables

### Criteria and Weights
| Criterion | Weight | Score anchor (1/3/5) |
|---|---:|---|

### Weighted Scorecard
| Criterion | Weight | Option A | Option B | Option C |
|---|---:|---:|---:|---:|
| ... | ...% | ... | ... | ... |
| **Weighted total** | **100%** | **...** | **...** | **...** |

### Sensitivity
| Variable | Base | Downside | Upside | Recommendation impact |
|---|---:|---:|---:|---|

## Output Requirement

Return:
1. Ranking with weighted totals.
2. Flip conditions (what changes the winner).
3. Confidence level for recommendation.

## Common Mistakes

1. Hidden weights or undefined scoring anchors.
2. Presenting scores without rationale.
3. No flip-condition analysis.

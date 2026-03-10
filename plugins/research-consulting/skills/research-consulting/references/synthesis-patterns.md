# Synthesis Patterns (Decision Memo Standard)

Use this template to convert multi-stream research into a decision memo that an executive can act on immediately.

## Core Standard

1. Recommendation first.
2. Evidence-backed option comparison.
3. Explicit uncertainty, sensitivity, and tradeoffs.
4. Concrete execution plan.
5. Exactly 3 key messages.

## Decision Memo Template

```markdown
# [Decision Title]

> One-line recommendation.

**Status:** [Draft / Recommended / Approved]
**Date:** [YYYY-MM-DD]
**Decision owner:** [Role]
**Decision question:** [Single sentence]

---

## 0. Scope and Modules Used

- Scope: [Geography, segment, timeframe]
- Modules used: [module paths]
- Streams completed: [count]

---

## 1. Executive Recommendation

- Recommended option: **[Option]**
- Why now: [1-2 sentences]
- Expected upside: [quantified]
- Main downside: [bounded]

---

## 2. Options Considered

| Option | Description | Upside | Downside | When it wins |
|---|---|---|---|---|
| A | ... | ... | ... | ... |
| B | ... | ... | ... | ... |
| C | ... | ... | ... | ... |

---

## 3. Evaluation Criteria and Weights

| Criterion | Weight | Why it matters |
|---|---:|---|
| ... | ...% | ... |

Total weight must equal 100%.

---

## 4. Weighted Scorecard

| Criterion | Weight | Option A | Option B | Option C |
|---|---:|---:|---:|---:|
| ... | ...% | ... | ... | ... |
| **Weighted total** | **100%** | **...** | **...** | **...** |

Scoring formula:
```text
Weighted total = Σ(score_i × weight_i)
```

---

## 5. Evidence Synthesis

### 5.1 Verified facts
| Claim | Number | Unit | Date | Geography | Source |
|---|---:|---|---|---|---|

### 5.2 Inferences
| Inference | Logic | Confidence (1-5) |
|---|---|---:|

### 5.3 Assumptions
| Assumption | Why needed | Risk if wrong |
|---|---|---|

### 5.4 Conflict reconciliation
| Topic | Source A | Source B | Preferred estimate | Reason |
|---|---|---|---|---|

---

## 6. Sensitivity and Scenario Test

| Variable | Base | Downside | Upside | Recommendation impact |
|---|---:|---:|---:|---|

State clearly: what change would flip the recommendation?

---

## 7. Risk Register and Mitigation

| Risk | Probability | Impact | Mitigation | Owner | Trigger metric |
|---|---|---|---|---|---|

---

## 8. 30/60/90-Day Action Plan

| Window | Priority action | Expected output | KPI |
|---|---|---|---|
| 0-30 | ... | ... | ... |
| 31-60 | ... | ... | ... |
| 61-90 | ... | ... | ... |

---

## 9. Key Messages (exactly 3)

1. **[Message 1]** — [supporting evidence]
2. **[Message 2]** — [supporting evidence]
3. **[Message 3]** — [supporting evidence]

---

## 10. Key References

| Source | Key citation | Date |
|---|---|---|
```

## Synthesis Method

1. Pull only decision-relevant findings from each stream.
2. Merge by criterion, not by stream, to avoid duplication.
3. Resolve conflicts before writing recommendation.
4. Validate that recommendation aligns with first-principles drivers identified in stream outputs.
5. Ensure one logic chain: evidence -> score -> recommendation.
6. Quantify wherever possible; bound uncertainty where not.

## Quality Gates Before Delivery

1. No critical claim without source and date.
2. No hidden assumptions in recommendation logic.
3. Scorecard aligns with stated criteria.
4. Sensitivity identifies recommendation-flip conditions.
5. Risks include owner and trigger metric.
6. Output is concise and implementation-oriented.

## Common Synthesis Failures

| Failure | Fix |
|---|---|
| Evidence dump without a decision | Force section 1 recommendation before detailed sections |
| Conflicting numbers left unresolved | Add explicit reconciliation table in section 5.4 |
| Narrative quality but weak rigor | Add scorecard + sensitivity + risk register |
| Overconfidence | Expand assumptions and downside scenario |
| Too long | Move non-critical detail to appendix |

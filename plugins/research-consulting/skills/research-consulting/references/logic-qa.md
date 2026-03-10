# Logic Quality Assurance Protocol (Production)

Use this file during Phase 5 (Evidence QA) and Phase 7 (Final QA) to verify that reasoning is sound, biases are controlled, and the recommendation can withstand adversarial scrutiny.

## 1. Logic Chain Audit

Trace the complete chain from evidence to recommendation. Every link must be explicit.

### Process

For the final recommendation, build the chain:

```text
Evidence (Fact) → Inference → Conclusion → Recommendation → Action
     ↑                ↑            ↑              ↑
  [Source]      [Logic rule]  [Criteria]    [Feasibility]
```

### Verification Questions

For each link:
1. **Evidence → Inference**: "Does this evidence necessarily lead to this inference, or are there alternative explanations?"
2. **Inference → Conclusion**: "Is this the only conclusion, or am I ignoring equally valid conclusions from the same inference?"
3. **Conclusion → Recommendation**: "Does this conclusion, combined with evaluation criteria, logically produce this recommendation?"
4. **Recommendation → Action**: "Is this action feasible, and does it follow from the recommendation without hidden assumptions?"

### Required Table

| Chain step | Statement | Depends on | Logic rule applied | Alternative interpretation | Why rejected |
|---|---|---|---|---|---|

### Failure Trigger

If any link has no explicit logic rule, or if an alternative interpretation cannot be rejected with evidence, the chain is broken. Fix before proceeding.

## 2. Cognitive Bias Checklist

Review the analysis against each bias. For every bias, answer the control question honestly. If the answer triggers concern, apply the corrective action.

| Bias | Control question | Concern trigger | Corrective action |
|---|---|---|---|
| **Confirmation bias** | Did we actively seek evidence that contradicts our hypothesis? | No disconfirming evidence was searched or found | Run a dedicated counter-evidence search |
| **Survivorship bias** | Are we only examining successful cases? | Analysis references winners without examining failures | Find 2+ failure cases in the same domain |
| **Anchoring** | Did early data (first source, user's framing) disproportionately shape our view? | First estimate and final estimate are suspiciously close | Re-estimate independently from different starting data |
| **Base rate neglect** | Did we consider how common this outcome is in general? | No base rate or benchmark is cited | Find the base rate for the relevant population |
| **Selection bias** | Is our evidence sample representative? | Data comes from a narrow, self-selected, or convenience sample | Identify what the sample excludes and assess impact |
| **Availability bias** | Are we overweighting evidence that was easy to find? | Key claims rely on top search results only | Search for less accessible but higher-quality sources |
| **Sunk cost fallacy** | Are we recommending continuation because of past investment? | Recommendation preserves status quo despite weak forward-looking evidence | Re-evaluate with a clean-slate: "If starting fresh, would we choose this?" |
| **Dunning-Kruger** | Are we confident in areas where our evidence is actually thin? | High confidence + few sources on a sub-topic | Flag confidence level explicitly and mark as data gap |
| **Narrative fallacy** | Are we constructing a compelling story that oversimplifies causal relationships? | The argument reads like a story rather than a logical chain | Break the narrative into discrete, testable claims |
| **Authority bias** | Are we accepting claims because of who said them rather than evidence quality? | Key claims rest on expert opinion without supporting data | Demand primary data, not just authority citations |

## 3. Steelman Protocol

Before finalizing the recommendation, construct the strongest possible case for the runner-up option.

### Process

1. **Identify the strongest alternative** to your recommendation.
2. **Assign it the best possible assumptions**: most favorable market conditions, best execution, most optimistic conversion.
3. **Build its case** as if you were its advocate, using real evidence.
4. **Compare**: Does your recommendation still win under these generous conditions?

### Required Output

```text
Steelmanned alternative: [Option name]

Strongest case:
1. [Argument 1 with evidence]
2. [Argument 2 with evidence]
3. [Argument 3 with evidence]

Why recommended option still wins:
1. [Rebuttal 1]
2. [Rebuttal 2]

Conditions under which alternative would win:
- [Condition 1]
- [Condition 2]
```

### Rule

If you cannot articulate why the alternative loses even in its strongest form, your recommendation is not sufficiently justified. Revisit the scorecard.

## 4. Pre-mortem Analysis

Assume the recommendation was implemented and failed. Work backward to identify why.

### Process

1. Set the scene: "It is [time horizon] from now. We implemented [recommendation] and it failed."
2. Generate **5 distinct failure scenarios**, each with a different root cause.
3. For each scenario, assess:
   - Probability (Low / Medium / High).
   - Detectability: How early could we spot this failure?
   - Severity: Reversible or irreversible?
4. For the top 3 scenarios by risk (probability x severity), define:
   - Early warning signal (specific, measurable).
   - Preventive action (before failure).
   - Contingency plan (after failure detected).

### Required Table

| Failure scenario | Root cause | Probability | Detectability | Severity | Early warning signal | Preventive action |
|---|---|---|---|---|---|---|

### Rule

If any failure scenario is High probability + Low detectability + Irreversible severity, the recommendation carries existential risk. This must be prominently flagged in the decision memo, not buried in a risk table.

## 5. Red Team Pass

Actively attempt to destroy your own argument. This is not a formality.

### Attack Vectors

Apply each attack to the recommendation:

1. **Data attack**: "What if our key numbers are wrong by 2x in either direction?"
   - Identify the 3 most critical data points.
   - Test recommendation stability if each is halved or doubled.

2. **Logic attack**: "Where is the weakest logical link in our chain?"
   - Find the inference with the least evidence support.
   - Ask: "If this link breaks, does the recommendation survive?"

3. **Scope attack**: "What did we not research that could change everything?"
   - List the 3 biggest data gaps.
   - Assess: Could any of these gaps, if filled, reverse the recommendation?

4. **Timing attack**: "What if the timing assumptions are wrong?"
   - Test: What if market timing is 12 months earlier or later than assumed?

5. **Execution attack**: "What if execution is harder than assumed?"
   - Test: What if costs are 2x and timelines are 1.5x?

### Required Output

| Attack type | Specific attack | Recommendation survives? | Confidence (1-5) | Mitigation if vulnerable |
|---|---|---|---:|---|

### Rule

The recommendation must survive at least 4 of 5 attack vectors with confidence >= 3. If not, either strengthen the evidence or modify the recommendation.

## 6. Assumption Stress Test

Every assumption must be classified by its impact on the recommendation.

### Classification

| Category | Definition | Action required |
|---|---|---|
| **Load-bearing** | If wrong, recommendation changes | Must be validated or flagged as top risk |
| **Directional** | If wrong, magnitude changes but direction holds | Include sensitivity range |
| **Cosmetic** | If wrong, detail changes but nothing material shifts | Acceptable as stated |

### Process

1. Extract every assumption from the analysis (check evidence ledger, WWNBT tables, sizing inputs).
2. Classify each as Load-bearing, Directional, or Cosmetic.
3. For each Load-bearing assumption:
   - State what happens if it is 50% wrong in either direction.
   - Identify how and when it can be validated.
   - Define a monitoring mechanism post-decision.

### Required Table

| Assumption | Classification | If wrong by 50%: impact on recommendation | Validation method | Monitoring mechanism |
|---|---|---|---|---|

## 7. Logical Fallacy Scan

Check the final argument against common logical fallacies.

| Fallacy | Pattern | Check question |
|---|---|---|
| **Post hoc ergo propter hoc** | "A happened, then B happened, so A caused B" | Is there a causal mechanism, or just temporal sequence? |
| **Appeal to authority** | "Expert X says Y, therefore Y is true" | Is there primary evidence beyond the expert's opinion? |
| **False dichotomy** | "Either A or B" | Are there options C, D, E that were not considered? |
| **Hasty generalization** | "This worked for company X, so it will work for us" | How similar are the contexts? What are the key differences? |
| **Composition fallacy** | "Each part has property X, so the whole has property X" | Does the property actually scale to the aggregate? |
| **Ecological fallacy** | "The average is X, so each individual is approximately X" | What is the variance? Are there distinct subgroups? |
| **Texas sharpshooter** | Drawing the target after seeing where the shots landed | Was the hypothesis formed before or after seeing the data? |
| **Nirvana fallacy** | Rejecting an option because it is not perfect | Are we comparing to an ideal that does not exist, instead of to realistic alternatives? |

### Rule

If any fallacy is detected, the affected claim must be either:
- Reworked with proper logic, or
- Downgraded from `Fact` to `Inference` or `Assumption` with explicit caveat.

## Integration with Workflow

### Phase 5 (Evidence QA Gate) — Run in order:

1. Evidence ledger verification (existing).
2. **Cognitive Bias Checklist** (Section 2).
3. **Logical Fallacy Scan** (Section 7).
4. **Assumption Stress Test** (Section 6).
5. Conflict reconciliation (existing).

### Phase 7 (Final QA) — Run in order:

1. **Logic Chain Audit** (Section 1).
2. **Steelman Protocol** (Section 3).
3. **Pre-mortem Analysis** (Section 4).
4. **Red Team Pass** (Section 5).
5. Final delivery checks (existing).

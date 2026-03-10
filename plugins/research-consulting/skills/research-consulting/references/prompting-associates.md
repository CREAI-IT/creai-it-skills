# Associate Prompt Patterns (Production)

Use this file to produce high-quality, decision-useful associate outputs with consistent logic and evidence rigor.

## Non-Negotiables

1. Use first-principles decomposition before evidence collection. Follow the full method in `references/reasoning-depth.md` Section 4.
2. Run Why Chains (minimum 3 levels) on every critical driver. Do not accept proximate causes.
3. Structure analysis MECE at 3-4 levels of disaggregation depth.
4. For every hypothesis, complete a WWNBT (What Would Need To Be True?) table.
5. Test at least one counter-hypothesis using steelman reasoning.
6. For every causal claim, specify the mechanism and tag with Causal Strength Level (1-4).
7. Provide specific numbers, dates, geographies, units, and URLs.
8. Separate `Fact`, `Inference`, and `Assumption`.
9. Report source conflicts and resolve them explicitly.
10. Apply "So What?" chain: every finding must connect to a decision implication.
11. Match the user's language.

## Source Quality Rules

Label each source in output:
- `Tier 1`: primary/authoritative (official stats, regulators, filings, platform docs, peer-reviewed).
- `Tier 2`: reputable research and analytics firms.
- `Tier 3`: vendor marketing, blogs, and opinion.

Guardrails:
1. Use Tier 1 or Tier 2 for decision-critical claims.
2. Use Tier 3 only for directional context or with corroboration.
3. Triangulate high-impact numbers with 2+ independent sources when possible.
4. Include publication date and access date.

## Mandatory Reasoning Protocol

In every associate brief, explicitly require ALL of these:

### 1. First Principles Decomposition

Follow `references/reasoning-depth.md` Section 4:
- Strip conventional wisdom and identify what is assumed vs what is true.
- Identify fundamental constraints (physical, economic, behavioral).
- Build up from truths.
- Identify gaps between bottom-up reasoning and conventional wisdom.

### 2. Why Chain (minimum 3 levels)

Follow `references/reasoning-depth.md` Section 2:
- For every key driver or claim, ask "Why?" iteratively.
- Minimum 3 levels, maximum 7.
- Stop only at measurable levers, structural constraints, or axioms.
- Follow branches when causes split.
- Anti-patterns to avoid: circular reasoning, restating, stopping at "market trends."

### 3. MECE Structuring (3-4 levels)

Follow `references/reasoning-depth.md` Section 5:
- Partition the space into non-overlapping buckets.
- Decompose each bucket to at least Level 3 (driver level).
- Stop only when nodes are directly measurable and suggest specific actions.
- Confirm no major bucket is missing.

### 4. WWNBT (What Would Need To Be True?)

Follow `references/reasoning-depth.md` Section 3:
- For each hypothesis/option, list all conditions required for it to succeed.
- Classify each: Validated, Testable, or Assumed.
- Rank by uncertainty (1-5).
- Focus research on highest-uncertainty, load-bearing conditions.

### 5. Hypothesis Testing with Steelman

- State a primary hypothesis.
- Test disconfirming evidence and a counter-hypothesis.
- Steelman the counter-hypothesis: construct its strongest possible case.
- Show why primary hypothesis wins (or doesn't) against the steelmanned alternative.

### 6. Causal Mechanism Requirement

Follow `references/reasoning-depth.md` Section 8:
- For every "X causes Y" claim, explain the mechanism.
- Tag with Causal Strength Level:
  - Level 1: Correlation only.
  - Level 2: Temporal precedence.
  - Level 3: Mechanism identified.
  - Level 4: Mechanism validated.
- Only Level 3+ can support a recommendation.
- If mechanism involves human behavior, specify incentive structure.
- If mechanism involves market dynamics, specify equilibrium logic.

### 7. Decision Relevance ("So What?" Chain)

Follow `references/reasoning-depth.md` Section 7:
- Every finding: Finding → "So what?" → Implication → "Now what?" → Action.
- If a finding cannot produce a decision-relevant "So what?", it is noise.
- Findings table must have a filled "Decision implication" column.

## Standard Associate Prompt Template

```text
You are a strategy consulting associate researching [TOPIC] for [DECISION CONTEXT].

Workstream boundary:
- In scope: [BOUNDARY]
- Out of scope: [BOUNDARY]
- Required module reads: [PATH_1], [PATH_2]
- WWNBT conditions to test: [CONDITION_1], [CONDITION_2]

Reasoning protocol (mandatory — follow each step fully, do not skip):

1) First-principles decomposition:
   - Strip conventional wisdom. List what is assumed vs proven.
   - Identify fundamental truths/constraints.
   - Build up from truths. Note gaps with conventional view.

2) Why Chain (minimum 3 levels per key driver):
   - For each major finding or driver, ask "Why?" at least 3 times.
   - Format as an indented tree. Stop at levers, constraints, or axioms.

3) MECE structure (3-4 levels):
   - Partition your analysis into non-overlapping buckets.
   - Decompose to at least Level 3 (actionable driver level).

4) WWNBT analysis:
   - For each hypothesis/option within your scope, list conditions for success.
   - Classify each: Validated / Testable / Assumed.
   - Focus evidence collection on highest-uncertainty conditions.

5) Hypothesis test with steelman:
   - State primary hypothesis + counter-hypothesis.
   - Steelman the counter: build its best case with real evidence.
   - Show which wins and why.

6) Causal mechanism:
   - For every "X causes Y" claim, explain through what mechanism.
   - Tag: Correlation / Temporal / Mechanism / Causal.

7) Evidence-based conclusion tied to decision criteria.

Research and answer these questions with concrete evidence:

1) [Question 1]
- [Sub-question]
- Expected data: [metric, unit, timeframe, geography]

2) [Question 2]
- [Sub-question]
- Expected data: [metric, unit, timeframe, geography]

3) [Question 3]
- [Sub-question]
- Expected data: [metric, unit, timeframe, geography]

4) [Question 4]
- [Sub-question]
- Expected data: [metric, unit, timeframe, geography]

5) [Optional Question 5]
- [Sub-question]
- Expected data: [metric, unit, timeframe, geography]

Output requirements (strict):
1. Provide specific data: numbers, dates, geographies, units, URLs.
2. Label every major statement as Fact, Inference, or Assumption.
3. Label every source as Tier 1, Tier 2, or Tier 3.
4. Tag every causal claim with Causal Strength Level (1-4).
5. Identify source conflicts and explain preferred estimate.
6. Every finding must have a "So what?" connecting it to the decision.
7. Write in [USER LANGUAGE].

Return in this exact structure:

## Executive Takeaways (3-5 bullets)

## First-Principles Foundation
### Conventional Wisdom vs Fundamental Truths
| Conventional wisdom | Is it necessarily true? | Fundamental truth | Gap / Insight |
|---|---|---|---|

## Why Chain Trees
[For each key driver, provide indented Why Chain tree, min 3 levels]

## WWNBT Analysis
| Hypothesis | Condition | Status (Validated/Testable/Assumed) | Uncertainty (1-5) | Load-bearing? | Evidence found |
|---|---|---|---:|---|---|

## Logic Structure
### MECE Decomposition (3-4 levels)
Level 1 > Level 2 > Level 3 > Level 4 (where applicable)

### Hypothesis Test
| Hypothesis | Evidence for | Evidence against | Steelmanned counter | Counter rebuttal | Verdict |
|---|---|---|---|---|---|

## Findings Table
| Question | Claim | Number / Range | Unit | Date | Geography | Source URL | Source Tier | Causal Strength | So What? (Decision implication) |
|---|---|---:|---|---|---|---|---|---|---|

## Evidence Log
| Claim ID | Fact / Inference / Assumption | Metric definition | Causal mechanism (if causal claim) | Source URL | Source type | Publication date | Access date | Confidence (1-5) |
|---|---|---|---|---|---|---|---|---:|

## Conflicts and Reconciliation
| Topic | Source A | Source B | Difference | Preferred estimate | Reason |
|---|---|---|---|---|---|

## Data Gaps and Follow-ups
- [Gap] -> [Impact on WWNBT conditions] -> [Best next source]
```

## Prompt Construction Checklist

1. Is scope boundary explicit and non-overlapping with other streams?
2. Are required module reads listed (always including `references/reasoning-depth.md`)?
3. Are WWNBT conditions to test specified?
4. Do all questions specify expected data type?
5. Are all 7 reasoning protocol steps explicitly required?
6. Is Why Chain minimum depth (3 levels) specified?
7. Is MECE minimum depth (3 levels) specified?
8. Is causal mechanism requirement and tagging specified?
9. Is "So What?" chain required for every finding?
10. Are output tables specified (including Why Chain trees, WWNBT table)?
11. Are source-quality and recency rules included?
12. Is conflict handling required?
13. Is language requirement included?

## Module-Specific Brief Add-ons

### For GTM streams
- Require channel-level benchmarks, funnel assumptions, and 30/60/90 experiment options.
- Why Chain on: "Why will this channel reach our ICP?" (min 3 levels).

### For competitor streams
- Require direct/adjacent/substitute segmentation and pricing/packaging deltas.
- Why Chain on: "Why does this competitor win deals?" (min 3 levels).
- Causal mechanism for each competitive advantage claim.

### For scorecard streams
- Require criterion definitions, scoring anchors, and sensitivity checks.
- WWNBT for each scoring assumption.

### For market sizing streams
- Require top-down and bottom-up estimation with triangulation.
- Why Chain on key sizing assumptions: "Why is this the right multiplier/rate?" (min 3 levels).

### For pricing/unit economics streams
- Require scenario table for conversion, AOV, attach, churn, and payback.
- Causal mechanism for pricing elasticity assumptions.
- WWNBT for revenue projections.

## Anti-Patterns

1. Vague asks like "research trends" without metrics or Why Chain requirement.
2. Too many questions (>6), causing shallow output.
3. Essay output without required tables and Why Chain trees.
4. Missing source-tier labels or causal strength tags.
5. No conflict section when sources disagree.
6. No hypothesis or counter-hypothesis test.
7. **Accepting surface explanations**: stopping at "the market is growing" without asking why 3 times.
8. **Correlation as causation**: claiming causal relationships without specifying mechanism.
9. **Missing "So What?"**: presenting data without connecting it to the decision.
10. **One-level MECE**: only decomposing to category level without reaching actionable drivers.
11. **No WWNBT**: recommending without listing what must be true for the recommendation to work.
12. **Weak steelman**: dismissing alternatives without building their strongest case first.

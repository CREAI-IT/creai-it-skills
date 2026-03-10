# Associate Prompt Patterns (Production)

Use this file to produce high-quality, decision-useful associate outputs with consistent logic and evidence rigor.

## Non-Negotiables

1. Use first-principles decomposition before evidence collection.
2. Structure analysis MECE (mutually exclusive, collectively exhaustive).
3. Test at least one counter-hypothesis.
4. Provide specific numbers, dates, geographies, units, and URLs.
5. Separate `Fact`, `Inference`, and `Assumption`.
6. Report source conflicts and resolve them explicitly.
7. Match the user's language.

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

## Mandatory Reasoning Frames

In every associate brief, explicitly require these frames:

1. **First Principles**
- Decompose the problem into root drivers.
- Define measurable proxies for each driver.

2. **MECE Structuring**
- Partition the space into non-overlapping buckets.
- Confirm no major bucket is missing.

3. **Hypothesis Testing**
- State a primary hypothesis.
- Test disconfirming evidence and a counter-hypothesis.

4. **Decision Relevance**
- Tie each finding to the decision criteria.
- Distinguish signal from noise.

## Standard Associate Prompt Template

```text
You are a strategy consulting associate researching [TOPIC] for [DECISION CONTEXT].

Workstream boundary:
- In scope: [BOUNDARY]
- Out of scope: [BOUNDARY]
- Required module reads: [PATH_1], [PATH_2]

Reasoning protocol (mandatory):
1) First-principles decomposition of this workstream.
2) MECE structure for sub-questions.
3) Primary hypothesis + counter-hypothesis.
4) Evidence-based conclusion tied to decision criteria.

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
4. Identify source conflicts and explain preferred estimate.
5. Map findings to decision criteria and implications.
6. Write in [USER LANGUAGE].

Return in this exact structure:

## Executive Takeaways (3-5 bullets)

## Logic Structure
### First-Principles Decomposition
| Driver | Why it matters | Observable metric |
|---|---|---|

### MECE Buckets
| Bucket | Included scope | Excluded scope |
|---|---|---|

### Hypothesis Test
| Hypothesis | Evidence for | Evidence against | Verdict |
|---|---|---|---|

## Findings Table
| Question | Claim | Number / Range | Unit | Date | Geography | Source URL | Source Tier | Decision implication |
|---|---|---:|---|---|---|---|---|---|

## Evidence Log
| Claim ID | Fact / Inference / Assumption | Metric definition | Source URL | Source type | Publication date | Access date | Confidence (1-5) |
|---|---|---|---|---|---|---|---:|

## Conflicts and Reconciliation
| Topic | Source A | Source B | Difference | Preferred estimate | Reason |
|---|---|---|---|---|---|

## Data Gaps and Follow-ups
- [Gap] -> [Best next source]
```

## Prompt Construction Checklist

1. Is scope boundary explicit and non-overlapping with other streams?
2. Are required module reads listed?
3. Do all questions specify expected data type?
4. Are reasoning frames explicitly required?
5. Are output tables specified?
6. Are source-quality and recency rules included?
7. Is conflict handling required?
8. Is language requirement included?

## Module-Specific Brief Add-ons

### For GTM streams
- Require channel-level benchmarks, funnel assumptions, and 30/60/90 experiment options.

### For competitor streams
- Require direct/adjacent/substitute segmentation and pricing/packaging deltas.

### For scorecard streams
- Require criterion definitions, scoring anchors, and sensitivity checks.

### For market sizing streams
- Require top-down and bottom-up estimation with triangulation.

### For pricing/unit economics streams
- Require scenario table for conversion, AOV, attach, churn, and payback.

## Anti-Patterns

1. Vague asks like "research trends" without metrics.
2. Too many questions (>6), causing shallow output.
3. Essay output without required tables.
4. Missing source-tier labels.
5. No conflict section when sources disagree.
6. No hypothesis or counter-hypothesis test.

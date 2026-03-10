---
name: research-consulting
description: "Run MBB-style research and strategic synthesis for decision-grade deliverables. Use when the user asks for market analysis, competitor strategy, business plan sections, due diligence, GTM research, prioritization, pricing strategy, or any research-backed recommendation requiring external evidence, parallel workstreams, and executive-level conclusions (including Korean triggers like 리서치, 분석, 조사, 컨설팅, 사업계획서, 시장분석)."
---

# Research Consulting

Operate as a partner-led consulting team: frame the decision, route to the right domain modules, run parallel associate streams, enforce evidence QA, and deliver an actionable recommendation memo.

## Operating Principles

1. Be decision-first: optimize for a recommendation and implementation implications.
2. Be first-principles-driven: break problems into causal building blocks before collecting data.
3. Be hypothesis-driven: start with candidate answers and try to disprove them.
4. Be MECE: define mutually exclusive, collectively exhaustive issue buckets.
5. Be evidence-disciplined: separate `Fact`, `Inference`, and `Assumption`.
6. Be current: prioritize recent evidence and use concrete dates.
7. Be concise: keep only evidence that changes the decision.

## Modular Reference Router (mandatory)

Use progressive disclosure. Load only modules required for the case.

Always load:
- `references/prompting-associates.md`
- `references/synthesis-patterns.md`

Load modules by assignment:

| If the assignment is about... | Required modules |
|---|---|
| GTM strategy | `references/modules/gtm-playbook.md`, `references/modules/customer-segmentation.md` |
| Competitor/market landscape | `references/modules/competitor-intel.md` |
| Prioritization/decision selection | `references/modules/scorecard-and-sensitivity.md` |
| TAM/SAM/SOM or market sizing | `references/modules/market-sizing.md` |
| Pricing or revenue model | `references/modules/pricing-unit-economics.md` |
| Multi-topic strategy memo | Combine relevant modules above |

For each stream brief, include `Required module reads: [path1, path2]`.

### Canonical Stream Blueprints (optional accelerators)

Use these defaults when they fit the case. Modify only with explicit rationale.

| Assignment type | Stream 1 | Stream 2 | Stream 3 | Stream 4 |
|---|---|---|---|---|
| Niche selection | Demand disruption (`market-sizing`) | WTP + economics (`pricing-unit-economics`) | Feasibility + defensibility (`scorecard-and-sensitivity`) | Reachability + expansion (`gtm-playbook`, `customer-segmentation`, `competitor-intel`) |
| GTM strategy | Segment priority (`customer-segmentation`) | Channel/motion design (`gtm-playbook`) | Unit economics (`pricing-unit-economics`) | Risks + implementation (`scorecard-and-sensitivity`) |
| Competitive strategy | Competitive map (`competitor-intel`) | Positioning options (`scorecard-and-sensitivity`) | Pricing/packaging response (`pricing-unit-economics`) | Distribution response (`gtm-playbook`) |

## Workflow

### Phase 0: Engagement Framing (mandatory)

Define the assignment before research starts.

Capture:
- Decision question (single sentence).
- Decision owner and deadline.
- Geography, industry scope, and time horizon.
- Success criteria and constraints.
- Required output format and audience.

If critical details are missing, state assumptions and proceed unless blocked.

### Phase 1: Context Absorption

Read all relevant internal materials first.

Produce a short internal map:
- What is known.
- What is unknown.
- What must be externally validated.
- Which assumptions are unsupported.

Do not repeat prior docs in final output; extend them.

### Phase 2: Problem Structuring (mandatory)

Structure the case before dispatch.

1. Build a first-principles decomposition of the decision.
2. Convert decomposition into a MECE issue tree.
3. Draft 2-4 candidate hypotheses/options.
4. Define evaluation criteria and weights (sum to 100).
5. Select required module set and map each module to a workstream.

Workstream count:
- Default: 4 streams.
- Allowed: 3-5 streams when justified.
- If not 4, explain why.

Before dispatch, show streams, boundaries, and required module reads.

### Phase 3: Associate Brief Construction

Use `references/prompting-associates.md`.

Each brief must include:
1. Role, decision context, and stream boundary.
2. `Required module reads` list.
3. 4-6 numbered questions with expected data types.
4. Required reasoning frames (first principles + MECE + hypothesis test).
5. Source quality and recency requirements.
6. Required output schema.
7. Language matching user preference.

### Phase 4: Parallel Dispatch and Tracking

Dispatch streams in parallel using `Task` tool with `subagent_type: "general-purpose"` and `run_in_background: true`.

Rules:
1. Assign one owner per stream.
2. Wait for all streams before synthesis unless an exception is explicitly documented.
3. If a stream is weak, rerun once with narrowed scope.
4. Keep user updated on progress and blockers.

### Phase 5: Evidence QA Gate (mandatory)

Do not synthesize before QA pass.

Build an evidence ledger and verify:
1. Every critical claim has number, unit, date, geography, and URL.
2. Source tier is labeled (`Tier 1`, `Tier 2`, `Tier 3`).
3. High-impact claims are triangulated where possible.
4. Conflicts are reconciled in a conflict table.
5. Statements are tagged as `Fact`, `Inference`, or `Assumption`.

If QA fails, run targeted follow-up research.

### Phase 6: Synthesis and Recommendation

Use `references/synthesis-patterns.md`.

Deliver a decision memo with:
1. Recommendation and rationale.
2. Options and tradeoffs.
3. Weighted scorecard.
4. Sensitivity/scenario test.
5. Risks and mitigations.
6. 30/60/90-day actions.

End with exactly 3 key messages.

### Phase 7: Final QA and Handoff

Confirm before delivery:
1. Recommendation follows from evidence and scoring.
2. No critical unsourced claim.
3. Assumptions are explicit and bounded.
4. Dates are absolute.
5. Sources are linked and auditable.

## Source Quality Standard

Use this hierarchy:
- `Tier 1`: primary sources (regulators, official stats, filings, platform docs, peer-reviewed papers).
- `Tier 2`: reputable research and analytics firms.
- `Tier 3`: vendor marketing, blogs, and opinion.

Policy:
1. Use Tier 1/2 for decision-critical claims.
2. Use Tier 3 for directional context unless corroborated.
3. Flag stale evidence and justify usage.

## Default Deliverables

1. Decision memo (Markdown).
2. Weighted scorecard table.
3. Evidence ledger and conflict table.
4. Open questions and data gaps.

## Definition of Done

Work is complete only when all are true:
1. Decision question is answered directly.
2. Recommendation is explicit and ranked against alternatives.
3. Criteria and weights are shown.
4. Critical evidence is sourced and dated.
5. `Fact` / `Inference` / `Assumption` boundaries are explicit.
6. Key risks and mitigation actions are concrete.
7. Exactly 3 key messages are provided.

## Common Failure Modes and Fixes

| Failure mode | Fix |
|---|---|
| Stream overlap or gaps | Rebuild boundaries from MECE issue tree before dispatch |
| Good research, weak recommendation | Force explicit option comparison and scoring |
| Data-rich but low trust | Apply source-tier policy and triangulate key claims |
| Contradictory findings | Reconcile conflicts before synthesis |
| Verbose output | Keep decision-relevant evidence only; move remainder to appendix |

---
name: research-consulting
description: "Run MBB-style research and strategic synthesis for decision-grade deliverables. Use when the user asks for market analysis, competitor strategy, business plan sections, due diligence, GTM research, prioritization, pricing strategy, or any research-backed recommendation requiring external evidence, parallel workstreams, and executive-level conclusions (including Korean triggers like 리서치, 분석, 조사, 컨설팅, 사업계획서, 시장분석)."
---

# Research Consulting

Operate as a partner-led consulting team: frame the decision, route to the right domain modules, run parallel associate streams, enforce evidence QA, and deliver an actionable recommendation memo.

## Operating Principles

1. Be decision-first: optimize for a recommendation and implementation implications.
2. Be first-principles-driven: decompose problems to root causes using Why Chains before collecting data. Never accept surface-level explanations.
3. Be hypothesis-driven: start with candidate answers, define what would need to be true (WWNBT), and try to disprove them.
4. Be MECE: define mutually exclusive, collectively exhaustive issue buckets at 3-4 levels of depth.
5. Be evidence-disciplined: separate `Fact`, `Inference`, and `Assumption`. Require causal mechanisms, not just correlations.
6. Be adversarial to your own logic: steelman alternatives, pre-mortem your recommendation, red-team your argument.
7. Be current: prioritize recent evidence and use concrete dates.
8. Be concise: keep only evidence that changes the decision.

## Modular Reference Router (mandatory)

Use progressive disclosure. Load only modules required for the case.

Always load:
- `references/reasoning-depth.md`
- `references/logic-qa.md`
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

**Problem Essence Discovery (mandatory):**

Apply the five lenses from `references/reasoning-depth.md` Section 1:

1. **Reframe Test**: Is the stated question the right question, or a symptom of a deeper one?
2. **Implicit Assumption Audit**: What does this question assume? List and validate.
3. **Stakeholder Intent**: Why is this question being asked now?
4. **Inversion**: What would make this question irrelevant?
5. **Boundary Test**: Is anything excluded that should be included?

Produce a Problem Essence Statement before proceeding:

```text
Stated question: [as given]
Reframed question: [deeper version, if different]
Critical assumptions: [list with validation status]
Trigger: [why now]
True success criteria: [what the decision owner actually needs]
```

### Phase 1: Context Absorption

Read all relevant internal materials first.

Produce a short internal map:
- What is known.
- What is unknown.
- What must be externally validated.
- Which assumptions are unsupported.

Do not repeat prior docs in final output; extend them.

### Phase 2: Problem Structuring (mandatory)

Structure the case before dispatch. Follow `references/reasoning-depth.md` rigorously.

1. **First-principles decomposition** (Section 4 of reasoning-depth):
   - Strip conventional wisdom.
   - Identify fundamental truths and constraints.
   - Build up from truths.
   - Compare with conventional wisdom to find gaps.

2. **Why Chain** (Section 2 of reasoning-depth):
   - For each key driver in the decomposition, run a minimum 3-level Why Chain.
   - Do not stop at proximate causes.

3. **Disaggregation** (Section 5 of reasoning-depth):
   - Convert decomposition into a MECE issue tree at 3-4 levels of depth.
   - Stop only when nodes are directly measurable and actionable.

4. **Hypotheses with WWNBT** (Section 3 of reasoning-depth):
   - Draft 2-4 candidate hypotheses/options.
   - For each, list "What Would Need To Be True?" conditions.
   - Rank conditions by uncertainty.
   - Focus research on the most uncertain, load-bearing conditions.

5. **Evaluation design**:
   - Define evaluation criteria and weights (sum to 100).
   - Select required module set and map each module to a workstream.

Workstream count:
- Default: 4 streams.
- Allowed: 3-5 streams when justified.
- If not 4, explain why.

Before dispatch, show streams, boundaries, required module reads, and the WWNBT conditions each stream must test.

### Phase 3: Associate Brief Construction

Use `references/prompting-associates.md`.

Each brief must include:
1. Role, decision context, and stream boundary.
2. `Required module reads` list (always include `references/reasoning-depth.md`).
3. 4-6 numbered questions with expected data types.
4. Required reasoning protocol: Why Chain (min 3 levels) + MECE (min 3 levels) + WWNBT + Hypothesis test + Causal mechanism requirement.
5. Source quality and recency requirements.
6. Required output schema (including Why Chain tree, WWNBT table, Causal strength tags).
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

**Part A — Evidence Ledger** (existing):
1. Every critical claim has number, unit, date, geography, and URL.
2. Source tier is labeled (`Tier 1`, `Tier 2`, `Tier 3`).
3. High-impact claims are triangulated where possible.
4. Conflicts are reconciled in a conflict table.
5. Statements are tagged as `Fact`, `Inference`, or `Assumption`.

**Part B — Logic Quality Assurance** (from `references/logic-qa.md`):
6. **Cognitive Bias Checklist** (Section 2): Review against all 10 biases. Document control answers.
7. **Logical Fallacy Scan** (Section 7): Check for post hoc, authority bias, false dichotomy, hasty generalization, and others.
8. **Assumption Stress Test** (Section 6): Classify all assumptions as Load-bearing, Directional, or Cosmetic. Stress-test load-bearing ones.

**Part C — Causal Rigor** (from `references/reasoning-depth.md`):
9. **Causal Mechanism Check** (Section 8): Every claimed causal relationship must specify mechanism. Tag with Causal Strength Level (1-4). Only Level 3+ can support recommendations.

If QA fails, run targeted follow-up research.

### Phase 6: Synthesis and Recommendation

Use `references/synthesis-patterns.md` and `references/reasoning-depth.md` Section 6 (Pyramid Principle).

**Structure the memo using Pyramid Principle:**
- Lead with recommendation.
- Group supporting arguments into MECE buckets.
- Each bucket supported by evidence.
- Pass vertical and horizontal logic tests.

**Apply "So What?" Chain** (reasoning-depth Section 7):
- Every finding must produce: Finding → Implication → Action.
- Remove any finding that cannot connect to a decision-relevant "So what?"

Deliver a decision memo with:
1. Recommendation and rationale.
2. Options and tradeoffs.
3. Weighted scorecard.
4. WWNBT conditions status for recommended option.
5. Sensitivity/scenario test.
6. Risks and mitigations.
7. 30/60/90-day actions.

End with exactly 3 key messages.

### Phase 7: Final QA and Handoff

Run the full adversarial QA from `references/logic-qa.md`:

1. **Logic Chain Audit** (Section 1): Trace Evidence → Inference → Conclusion → Recommendation → Action. Every link explicit.
2. **Steelman Protocol** (Section 3): Build the strongest case for the runner-up option. Confirm recommendation still wins.
3. **Pre-mortem Analysis** (Section 4): Generate 5 failure scenarios. Define early warning signals for top 3.
4. **Red Team Pass** (Section 5): Apply all 5 attack vectors (data, logic, scope, timing, execution). Recommendation must survive 4/5 with confidence >= 3.

Then confirm:
5. Recommendation follows from evidence and scoring.
6. No critical unsourced claim.
7. Assumptions are explicit and bounded.
8. Dates are absolute.
9. Sources are linked and auditable.

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

1. Decision memo (Markdown) structured by Pyramid Principle.
2. Weighted scorecard table.
3. WWNBT conditions table for recommended option.
4. Evidence ledger, conflict table, and assumption stress test.
5. Pre-mortem and red team summary.
6. Open questions and data gaps.

## Definition of Done

Work is complete only when all are true:
1. Decision question is answered directly (including reframed question if applicable).
2. Recommendation is explicit and ranked against alternatives.
3. WWNBT conditions for the recommendation are documented with status.
4. Criteria and weights are shown.
5. Critical evidence is sourced and dated.
6. Causal claims specify mechanism and are tagged with Causal Strength Level.
7. `Fact` / `Inference` / `Assumption` boundaries are explicit.
8. Load-bearing assumptions are stress-tested.
9. Steelman of best alternative is presented.
10. Pre-mortem with early warning signals is included.
11. Red team pass shows recommendation survives 4/5 attack vectors.
12. Key risks and mitigation actions are concrete.
13. Exactly 3 key messages are provided.

## Common Failure Modes and Fixes

| Failure mode | Fix |
|---|---|
| Stream overlap or gaps | Rebuild boundaries from MECE issue tree before dispatch |
| Good research, weak recommendation | Force explicit option comparison, scoring, and WWNBT |
| Data-rich but low trust | Apply source-tier policy, triangulate key claims, run causal mechanism check |
| Contradictory findings | Reconcile conflicts before synthesis |
| Verbose output | Keep decision-relevant evidence only; move remainder to appendix |
| Surface-level analysis (no depth) | Re-run Why Chain on key drivers; enforce 3+ level disaggregation |
| Confirmation bias in recommendation | Run steelman + red team pass; check cognitive bias checklist |
| Correlation mistaken for causation | Apply causal strength ladder; require mechanism for Level 3+ |
| Untested assumptions supporting recommendation | Run assumption stress test; classify load-bearing vs cosmetic |
| Compelling narrative but weak logic | Run logic chain audit; verify each link has explicit logic rule |

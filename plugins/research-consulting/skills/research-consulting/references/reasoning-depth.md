# Reasoning Depth Protocol (Production)

Use this file to enforce genuine first-principles thinking, causal rigor, and multi-level decomposition. This is not a checklist to fill — it is a cognitive discipline that must shape every phase of analysis.

## 1. Problem Essence Discovery (Phase 0)

Before structuring or researching, interrogate the problem itself.

### The Five Lenses

Apply all five before accepting the problem as stated:

1. **Reframe Test**: "Is this the right question, or a symptom of a deeper question?"
   - The stated question is often one level too shallow.
   - Example: "Which market should we enter?" may really be "What capability gap prevents us from winning in any market?"

2. **Implicit Assumption Audit**: "What does this question assume to be true?"
   - List every assumption embedded in the question.
   - Mark each as validated, plausible, or unvalidated.
   - If an unvalidated assumption is load-bearing, research it before proceeding.

3. **Stakeholder Intent**: "Why is this question being asked now? What triggered it?"
   - The trigger reveals urgency, constraints, and hidden success criteria.

4. **Inversion**: "What would make this question irrelevant?"
   - If conditions exist where the question does not matter, those conditions bound the analysis.

5. **Boundary Test**: "What is explicitly out of scope, and should it be?"
   - Sometimes the answer lies in what was excluded.

### Output

Produce a Problem Essence Statement:

```text
Stated question: [as given]
Reframed question: [deeper version, if different]
Critical assumptions: [list with validation status]
Trigger: [why now]
True success criteria: [what the decision owner actually needs]
```

## 2. Why Chain Protocol

For every key driver, claim, or assumption, ask "Why?" iteratively until you reach a root cause.

### Rules

1. **Minimum 3 levels** of "Why?" for every critical driver.
2. **Maximum 7 levels** — if you haven't reached root cause by 7, reframe the question.
3. Each level must identify a **more fundamental** cause, not a restatement.
4. **Stop when** you reach one of:
   - A measurable, controllable input (lever).
   - A structural constraint or physical law.
   - An axiom that requires no further justification in context.
5. If a "Why?" branches into multiple causes, follow each branch.

### Format

```text
Claim: [statement]
├─ Why? [Level 1 reason]
│  ├─ Why? [Level 2 reason]
│  │  └─ Why? [Level 3 — root driver / lever identified]
│  └─ Why? [Level 2 alternative branch]
│     └─ Why? [Level 3 — structural constraint identified]
└─ Why? [Level 1 alternative cause]
   └─ Why? [Level 2 — axiom reached]
```

### Anti-patterns

- Circular reasoning: "A because B because A."
- Restating: "Revenue is low" → "Why?" → "Because we don't make enough money."
- Stopping too early: accepting a proximate cause as root cause.
- Stopping at "the market" or "macro trends" without specifying mechanism.

## 3. "What Would Need To Be True?" (WWNBT)

For every hypothesis, option, or recommendation, explicitly list the conditions required for it to succeed.

### Process

1. State the hypothesis/option clearly.
2. List **all conditions** that must hold for it to be correct/viable.
3. Classify each condition:
   - **Validated**: evidence confirms this.
   - **Testable**: can be researched within this engagement.
   - **Assumed**: cannot be verified now, must be monitored.
4. **Rank conditions by uncertainty** — highest uncertainty first.
5. **Focus research on the most uncertain, most load-bearing conditions.**

### Format

| Hypothesis | Condition | Status | Uncertainty (1-5) | Load-bearing? | Research action |
|---|---|---|---:|---|---|

### Decision Rule

If a load-bearing condition is high-uncertainty (4-5) and untestable, the hypothesis carries structural risk. Flag explicitly and design a monitoring mechanism.

## 4. First-Principles Decomposition Method

This is the step-by-step HOW for building a first-principles analysis. Do not skip steps.

### Step 1: Strip assumptions

- Write down the conventional wisdom about the topic.
- For each piece of conventional wisdom, ask: "Is this necessarily true, or is it just how things have been done?"
- Remove everything that is convention rather than truth.

### Step 2: Identify fundamental truths

- What are the physical, economic, or behavioral constraints that cannot be changed?
- What are the mathematical relationships that must hold?
- What are the known, proven causal mechanisms?

### Step 3: Build up from truths

- Starting only from fundamentals, reconstruct what the answer should be.
- Compare this bottom-up answer with the conventional wisdom.
- The gaps between bottom-up and conventional wisdom are where insight lives.

### Step 4: Validate with evidence

- For each fundamental truth you used, find evidence it holds in this specific context.
- For each gap you identified, find evidence whether the gap is real or your decomposition is flawed.

## 5. Disaggregation Depth Rule

Decompose until you reach actionable levers. One-level MECE is insufficient for strategic decisions.

### Depth Standard

- **Level 1**: Category (e.g., "Revenue")
- **Level 2**: Sub-category (e.g., "New customer revenue", "Expansion revenue", "Renewal revenue")
- **Level 3**: Driver (e.g., "New customer revenue = leads × conversion rate × ACV")
- **Level 4**: Sub-driver (e.g., "Conversion rate = f(product-market fit, sales cycle, competitive win rate)")

### Stop Criteria

Stop decomposing a branch when ALL of these are true:
1. The node is directly measurable.
2. The node suggests a specific action if changed.
3. Further decomposition would not change the recommendation.

### Minimum Depth by Question Type

| Question type | Minimum depth |
|---|---:|
| Strategic choice (which market/segment/product) | 4 |
| Operational improvement (how to improve X) | 3 |
| Sizing/estimation (how big is X) | 3 |
| Risk assessment | 3 |

## 6. Pyramid Principle (Minto)

Structure all arguments and outputs top-down: conclusion first, then supporting logic.

### Rules

1. **Start with the answer.** The reader should know the recommendation in the first sentence.
2. **Group supporting arguments** into 2-4 logically distinct buckets (MECE).
3. **Each bucket** must answer "Why should I believe the conclusion?" with evidence.
4. **Within each bucket**, order by strength of evidence (strongest first).
5. **Every level** must pass the "So What?" test — if removed, the argument weakens.

### Vertical Logic Test

Read only the first sentence of each section top-to-bottom. The argument should make complete sense as a summary. If it doesn't, the structure is wrong.

### Horizontal Logic Test

Within each group of supporting arguments, they must be:
- MECE (no overlaps, no gaps).
- All the same type (all reasons, all examples, all actions — do not mix).

## 7. "So What?" Chain

Every data point, finding, and inference must survive a three-step test:

```text
[Finding] → "So what?" → [Implication for the decision]
           → "Why does that matter?" → [Impact on recommendation]
           → "Now what?" → [Specific action or design choice]
```

### Rules

1. If a finding cannot produce a "So what?" that connects to the decision criteria, it is noise. Move it to appendix or remove.
2. If the "Now what?" is vague ("we should think about this"), it is not actionable. Push further.
3. Every row in a findings table must have a "Decision implication" column filled — not with "interesting" or "notable" but with a concrete directional statement.

## 8. Causal Mechanism Requirement

For every claimed causal relationship, the mechanism must be explained.

### Causal Strength Ladder

| Level | Name | Requirement | Tag |
|---|---|---|---|
| 1 | Correlation | Two variables move together | `Correlation` |
| 2 | Temporal precedence | A consistently precedes B | `Temporal` |
| 3 | Mechanism identified | A plausible causal pathway is described | `Mechanism` |
| 4 | Mechanism validated | The pathway has been tested or observed | `Causal` |

### Rules

1. Only Level 3+ can support a recommendation.
2. Level 1-2 findings must be tagged as `Inference` in the evidence ledger.
3. When claiming "X causes Y", always answer: **"Through what mechanism?"**
4. If the mechanism involves human behavior, specify the incentive structure.
5. If the mechanism involves market dynamics, specify the equilibrium logic.

### Anti-patterns

- "Market X is growing, therefore opportunity exists." (No mechanism: WHY is it growing? Will that driver persist?)
- "Competitor Y succeeded, therefore this approach works." (Survivorship bias: what about those who used the same approach and failed?)
- "Users want X." (How do you know? Stated preference ≠ revealed preference. What is the evidence of willingness to pay or switch?)

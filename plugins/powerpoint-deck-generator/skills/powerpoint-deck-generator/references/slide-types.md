# Slide Type Patterns

> **When to read**: During Phase 2 when building individual slides. Reference the specific slide type you're constructing.

---

## Title Slide

- Hero text: 60–100px, heavy weight. States the deck's thesis or title.
- Subtitle in contrasting weight (300 vs 700)
- Off-center placement preferred — title anchored to left
- One decorative element: geometric shape, accent line, or background treatment
- Brand mark small and understated
- **Canvas fill**: Background texture + decorative elements fill the visual space. The text itself can be sparse — this is the one slide type where breathing room is the point.

---

## Data / Statistic Slide

- Action title at top (36–44px) stating the insight
- Hero number: 64–120px in accent color
- Supporting context in smaller type (22–28px, muted opacity)
- Source/attribution (12–14px, 0.3 opacity, bottom)
- Use `border-left` accent lines on cards rather than fully colored backgrounds
- **Canvas fill**: Hero number + 3–4 supporting stat cards + callout bar at bottom

### Hero Number Best Practices

- One hero number per slide (two max if they contrast)
- Always pair with a label explaining what it measures
- Add a comparison element: "vs. X" or "up from Y" or "industry avg: Z"
- Center the hero number in its container using both flex AND `text-align: center` (for print compatibility — see `print-export.md`)

---

## Comparison Slide

- Action title stating the conclusion of the comparison
- Use color coding: red/coral for problem, green/mint for solution
- Asymmetric split often works better than 50/50
- Clear visual separation: thick divider, different backgrounds, or distinct card styles
- **Canvas fill**: Two rich columns with 3+ items each + transformation row at bottom

---

## Process / Timeline Slide

- Action title stating the outcome (not "Our Process")
- Horizontal flow with connecting elements
- Number each step in accent color
- 3–5 steps maximum
- Don't force uniform card sizes — highlighted steps can be wider
- **Canvas fill**: Step nodes + detail cards below each + callout bar at bottom

---

## Bridge / Insight Slide

- Central insight displayed prominently (large text, accent color)
- Two rich columns or 3×2 stat grid supporting the insight
- Quote or attribution for credibility
- **Canvas fill**: Central insight + two comparison columns + quote + transition row

---

## Overview / Solution Slide

- 3 rich cards (number + heading + body text + supporting stat per card)
- Cards with varied visual treatment (accent border, background tint)
- Summary callout bar at bottom
- **Canvas fill**: 3 solution cards with sub-sections + callout bar

---

## Closing / CTA Slide

- Mirror title slide's layout with modified content
- Contact info / next steps in clean format
- End on a strong visual note
- Key metrics or outcomes as a final proof point
- **Canvas fill**: CTA + supporting outcomes/metrics + contact details


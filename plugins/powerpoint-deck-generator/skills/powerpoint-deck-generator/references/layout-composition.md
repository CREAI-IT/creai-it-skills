# Layout & Composition

> **When to read**: During Phase 2 when building slides. Covers spatial composition, body layout patterns, content density rules, and critical CSS sizing patterns.

---

## Spatial Composition

### Break the Center

The #1 tell of an AI-generated slide is everything centered on a flat background. Real designers use the full canvas.

**Layout patterns:**

1. **Asymmetric split** — Content weighted 60/40 or 70/30 left/right, not 50/50
2. **Anchor + float** — One large element anchored to an edge, smaller elements floating in remaining space
3. **L-shape** — Text along top + left, visual fills bottom-right
4. **Full-bleed element** — One element (number, word, shape) extends to the edge of the slide
5. **Overlap** — Elements overlapping each other with z-index layering for depth
6. **Extreme whitespace** — 70%+ of the slide is empty, with content concentrated in one area

### Grid Systems

- Use CSS Grid or Flexbox, but don't make everything a uniform grid
- Vary column widths: `1.2fr 0.8fr` is more interesting than `1fr 1fr`
- Allow elements to break out of the grid occasionally

---

## Body Layout Patterns

### Pattern 1: Full-Slide Chart
- Action title (1–2 lines)
- Chart/visualization occupies 70–80% of slide area
- Optional callout arrow/box highlighting the key data point
- Source citation at bottom
- **Best for**: data-driven insights where the chart IS the evidence

### Pattern 2: Split (Text + Visual)
- Action title at top
- Text in one column (40% width), visualization in other column (60% width)
- Thin divider line between columns
- **Best for**: when narrative context is needed alongside data

### Pattern 3: Structured Text
- Action title at top
- Bold lead sentences state key claims
- Indented or adjacent supporting evidence beneath each claim
- Skimming the bold text alone gives the complete argument
- **Best for**: qualitative analysis, recommendations, interview findings

### Pattern 4: Metric Cards
- Action title at top
- 2–4 key metrics in large type (hero numbers)
- Supporting context in smaller text below each metric
- Varied card sizes (one large + two small > three same-size)
- **Best for**: impact slides, proof points, KPIs

### Pattern 5: Process Flow
- Action title communicates the outcome, not the process
- 3–5 steps maximum with simple connectors
- Clear directional flow (horizontal or vertical)
- Concise labels only
- **Best for**: implementation roadmaps, timelines

---

## Content Density

### The Density Principle

A slide must be **visually full but cognitively simple**. These are not contradictory:
- **Visually full** = the 1920×1080 canvas has content across 80%+ of its vertical space. No large empty zones.
- **Cognitively simple** = one message, scannable in 5–10 seconds, explainable in 60 seconds.

The way to achieve both: use **structured visual elements** (stat cards, metric grids, callout bars, comparison rows) instead of dense paragraphs.

### Three Zones

Every non-title slide needs three zones filled:
1. **Top zone** — Overline + action title + body text (~200px)
2. **Middle zone** — Primary content: cards, columns, grids, hero numbers (~550–600px)
3. **Bottom zone** — Supporting element: callout bar, impact row, comparison strip (~150–200px)

If any zone is empty, the slide will look sparse.

### Speed Tests

- **5–10 second test**: Can a viewer understand the slide's message in one glance?
- **60-second test**: Can the slide be presented verbally in under a minute?
- If a test fails, the slide is too dense with *text* — restructure into visual elements, or split the slide.

### Anti-Sparse Test

After writing a slide, mentally remove the title and source. Does the remaining area look like a designed information layout — or scattered elements on empty space? If the latter, add: body text, more data points, a bottom section, or context within cards.

### Whitespace & Padding

- **Content slides**: 80–120px padding minimum
- **Title slides**: 140–200px padding for drama
- **Canvas fill rule**: Content must occupy 80%+ of vertical space. Whitespace exists *between* elements for breathing room — not as large empty zones.

---

## Card & Container Sizing (Critical CSS)

<CRITICAL>
**NEVER use `flex: 1` on card containers inside a column (`flex-direction: column`) parent.** This is the #1 CSS layout bug — it stretches cards vertically to fill remaining space, creating huge empty boxes.

Similarly, **NEVER use `grid-template-rows: 1fr`** for card grids. Use `auto` instead so cards are content-sized.
</CRITICAL>

### The Rule

Cards and content containers must be **content-sized** — they grow to fit their text/data, not stretch to fill available space. The canvas fill rule (80%+) means adding more *content*, not inflating box heights.

### CSS Patterns

```css
/* WRONG — cards stretch to fill remaining vertical space */
.card-container {
    flex: 1;                          /* BAD */
    display: grid;
    grid-template-rows: 1fr 1fr;     /* BAD */
}

/* RIGHT — cards are content-sized */
.card-container {
    display: grid;
    grid-template-rows: auto auto;   /* content-sized rows */
    align-content: center;           /* vertically center if extra space */
}

/* Use flex: 1 ONLY for equal-width columns (flex-direction: row) */
.column { flex: 1; }  /* OK: equal width in a row layout */
```

### When `flex: 1` is OK

- Equal-width columns in a **row** layout → OK
- Card containers in a **column** layout → NEVER
- Tables, registries, or elements that genuinely should fill available height → OK with caution

### Self-Check

Open the slide in the browser and check if any card has large empty space below its text content. If so, the container is incorrectly using `flex: 1` or `grid-template-rows: 1fr`.

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

| Pattern | Structure | Best for |
|---------|-----------|----------|
| **Full-slide chart** | Chart occupies 70–80% of area, optional callout on key data point | Data-driven insights where the chart IS the evidence |
| **Split (text + visual)** | Text column (40%) + visualization column (60%), thin divider | Narrative context alongside data |
| **Structured text** | Bold lead sentences + indented evidence; skimming bold = full argument | Qualitative analysis, recommendations |
| **Metric cards** | 2–4 hero numbers with supporting context; vary card sizes | Impact slides, proof points, KPIs |
| **Process flow** | 3–5 steps max, horizontal/vertical, action title states outcome not process | Roadmaps, timelines |

---

## Content Density

**Visually full + cognitively simple.** Canvas 80%+ filled with structured visual elements (not paragraphs), but scannable in 5–10 seconds.

### Three Zones (every non-title slide)

1. **Top** — Overline + action title + body text (~200px)
2. **Middle** — Primary content: cards, columns, grids, hero numbers (~550–600px)
3. **Bottom** — Supporting element: callout bar, impact row, comparison strip (~150–200px)

If any zone is empty, the slide looks sparse. After writing a slide, mentally remove title and source — does the remaining area look like a designed layout or scattered elements on whitespace?

### Padding

- Content slides: 80–120px | Title slides: 140–200px
- Whitespace goes *between* elements, not as large empty zones

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

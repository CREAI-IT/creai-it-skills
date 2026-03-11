# Quality Checklist & Anti-Patterns

> **When to read**: During Phase 3 (review) before delivering the deck. Run every check.

---

## Source Citations

Every quantitative claim requires a source citation.

- Font size: 12–14px
- Position: Bottom of slide, in the `bottom-bar` element
- Format: `Source: [Name], [Year]` or `Source: [Name] ([Year]); [Firm] analysis`

---

## Pre-Delivery Checklist

| # | Check | Test |
|---|-------|------|
| 1 | Action title is a complete sentence with verb, max 15 words | Executive understands the insight from the title alone? |
| 2 | One message per slide; body proves title, title summarizes body | Every element directly supports the title? Nothing irrelevant? |
| 3 | Titles alone tell the full story | Reading all titles in sequence = coherent SCR argument? |
| 4 | Font sizes within ranges; title size identical across all slides | T1 38–44px, T2/T3 22–28px (default 24px), T4 14–18px, T5 12–14px? |
| 5 | Canvas filled 80%+ with structured content | No large empty zones? Overline + title + body + 4+ elements + supporting section? |
| 6 | Max 2 font families, 3 sizes per slide, 3–4 colors | Typography and color are consistent and restrained? |
| 7 | Cards are content-sized, not stretched | No `flex: 1` on column containers or `grid-template-rows: 1fr`? |
| 8 | Every data point has a source citation | Can every number be traced to its origin? |
| 9 | No banned CSS (text-shadow blur, box-shadow on small elements) | No export artifacts? (See `print-export.md`) |
| 10 | Tested in browser via `localhost` (not `file://`) | Slides load correctly via HTTP? |

---

## Anti-Patterns

### The Critical Three

| Anti-pattern | Why it's bad | Fix |
|---|---|---|
| **Sparse/empty slides** | Looks like a draft. Wastes canvas. Audiences disengage. | Fill 80%+ of canvas: body text + 4+ data elements + supporting section |
| **Font sizes too small (16-20px body)** | Fails the viewer test — illegible at projection distance | Body/card text starts at 24px, never below 22px. Cut words, not size. |
| **Card boxes too tall / empty space** | `flex: 1` in column layouts stretches cards into empty boxes | Never `flex: 1` on card containers in column layouts. Use `auto` rows. |

### Content Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Topic labels as titles ("Market Analysis") | Write action titles: complete sentences with conclusions |
| No narrative arc across the deck | Use SCR. Write all titles first. Apply storyline test. |
| Missing source citations | Every data point needs `Source:` at bottom |

### Visual Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Every slide is centered text on solid bg | Vary layouts: asymmetric, split, anchored, overlapping |
| Flat solid color backgrounds | Add texture: noise, patterns, gradients, shadows, decorative elements |
| Same design across every deck | Vary fonts, colors, layout patterns between projects |

### Font Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Inter/Roboto/DM Sans/Poppins on everything | Pick distinctive fonts from Google Fonts. No cliched purple-to-blue gradients either. |
| Inventing extra-small tiers (16-20px body text) | Only 5 tiers exist. If it's meant to be read, it's T3 (24px). |

### Technical Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Opening `index.html` via `file://` | Dynamic slide loading requires HTTP — use `python3 -m http.server` |
| Slides not standalone-viewable | Each `slide-N.html` must link to `styles.css` and include scaling JS |
| `plan.md` doesn't match final slides | Final slides must follow `plan.md` exactly — it's the source of truth |

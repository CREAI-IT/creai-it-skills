# Quality Checklist & Anti-Patterns

> **When to read**: During Phase 3 (review) before delivering the deck. Run every check. Also covers source citations and the full anti-pattern reference.

---

## Source Citations

Every quantitative claim requires a source citation.

- Font size: 12–14px
- Position: Bottom of slide, in the `bottom-bar` element
- Format: `Source: [Name], [Year]` or `Source: [Name] ([Year]); [Firm] analysis`
- Every slide with data should include a source line
- Sources build credibility — never omit them

---

## Pre-Delivery Checklist

Run every item before finalizing:

| # | Check | Test |
|---|-------|------|
| 1 | Action title is a complete sentence with verb, max 15 words | Can an executive understand the insight from the title alone? |
| 2 | One message per slide | Does the slide make exactly one point? |
| 3 | Titles alone tell the full story | Reading all titles in sequence = coherent argument? |
| 4 | "So what" test passes | Every element directly supports the title? |
| 5 | Body proves title, title summarizes body | Nothing in title missing from body; nothing in body irrelevant to title? |
| 6 | Font sizes within mandatory ranges | Action title 38–44px, body 22–28px (default 24px), labels 14–18px, source 12–14px? |
| 7 | Action title size identical across all slides | No variation in title size? |
| 8 | Canvas filled 80%+ with structured content | No large empty zones? Visually full yet cognitively scannable? |
| 9 | Max 3–4 colors with functional meaning | Color = meaning, not decoration? |
| 10 | Every data point has a source citation | Can every number be traced to its origin? |
| 11 | Slide comprehensible in 5–10 seconds | First-glance clarity test? |
| 12 | Max 2 font families, 3 sizes per slide | Typography is consistent and restrained? |
| 13 | No card boxes with empty space | Cards are content-sized, not stretched by `flex: 1`? |
| 14 | Hero numbers have `text-align: center` | Not relying on flex centering alone? (See `print-export.md`) |
| 15 | `backdrop-filter` elements have sufficient border contrast | Visible even without blur effect? |
| 16 | Tested in browser via `localhost` (not `file://`) | Slides load correctly via HTTP? |

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
| Body content doesn't match title | Apply "so what" test to every element |
| No narrative arc across the deck | Use SCR. Write all titles first. Apply storyline test. |
| Missing source citations | Every data point needs `Source:` at bottom |
| Varying title sizes across slides | All action titles must be identical size |
| Reducing font size to cram content | Split into multiple slides instead |

### Visual Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Every slide is centered text on solid bg | Vary layouts: asymmetric, split, anchored, overlapping |
| Same card style repeated everywhere | Vary card sizes, use different containers |
| Uniform rounded corners everywhere | Vary: sharp for brutalist, subtle for refined, mix sizes |
| Every element has same opacity | Use dramatic opacity differences: 1.0, 0.7, 0.45, 0.25 |
| Exactly 3 cards in a row on every slide | Use 2, 4, or asymmetric grids |
| Flat solid color backgrounds | Add texture: noise, patterns, gradients, shadows |
| Same design across every deck | Vary fonts, colors, layout patterns between projects |

### Font Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Inter/Roboto/DM Sans/Poppins on everything | Pick distinctive fonts from Google Fonts |
| Purple-to-blue gradient backgrounds | Use solid colors with subtle texture, or unexpected palettes |
| Inventing extra-small tiers (16-20px body text) | Only 5 tiers exist. If it's meant to be read, it's T3 (24px). |

### Technical Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Opening `index.html` via `file://` | Dynamic slide loading requires HTTP — use `python3 -m http.server` |
| Not customizing `base-styles.css` | Always set theme colors and fonts per the design direction |
| Slides not standalone-viewable | Each `slide-N.html` must link to `styles.css` and include scaling JS |
| `plan.md` doesn't match final slides | Final slides must follow `plan.md` exactly — it's the source of truth |
| `backdrop-filter` elements vanish in print PDF | Viewer template handles this automatically. No action needed. |
| Text shifts inside flex containers in print | Add `display: block; width: 100%; text-align: center;` on text elements |

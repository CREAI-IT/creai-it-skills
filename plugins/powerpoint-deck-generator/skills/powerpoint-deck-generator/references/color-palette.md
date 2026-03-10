# Color & Palette

> **When to read**: During design direction (Phase 1) and when building `styles.css` (Phase 2). Color must carry **functional meaning** — not decoration.

---

## Palette Construction

Build palettes with **conviction** and **functional meaning**. Every color must mean something. 3–4 colors max.

### Standard Color Assignments

| Purpose | Assignment |
|---------|-----------|
| Primary text | Main text color |
| Supporting / secondary | Muted opacity (0.4–0.6) of text color |
| Accent / emphasis | Single bright color for key elements |
| Positive / growth | Green shade |
| Negative / problem | Red/coral shade |
| Warning / attention | Amber/gold shade |

**Color consistency rule:** If green means "positive" on slide 3, it must mean "positive" on slide 30. Never reuse a color with a different meaning.

---

## Palette Examples

### Dark Themes (not just "#0a0a0a with blue")

| Name | Background | Accent | Text | Hex |
|------|-----------|--------|------|-----|
| Navy + Cyan | Deep navy | Electric cyan | Warm white | `#0a0e17`, `#38bdf8`, `#f0f0e8` |
| Black + Coral | Near-black | Hot coral | Cool gray | `#0c0c0c`, `#ff6b4a`, `#94a3b8` |
| Olive + Gold | Dark olive | Gold | Cream | `#1a1c16`, `#d4a843`, `#faf5eb` |
| Charcoal + Mint | Charcoal | Mint | White | `#18181b`, `#6ee7b7`, `#fafafa` |
| Purple + Amber | Deep purple | Amber | Light | `#1e1033`, `#f59e0b`, `#e8e0f0` |
| Ink + Indigo | Near-black | Indigo | Off-white | `#08080C`, `#818CF8`, `#ECECF0` |

### Light Themes (not just "white with blue")

| Name | Background | Accent | Text | Hex |
|------|-----------|--------|------|-----|
| Cream + Terracotta | Warm cream | Terracotta | Rich black | `#faf7f2`, `#c4553a`, `#1a1a1a` |
| Ice + Gold | Ice white | Gold | Deep navy | `#f8fafc`, `#ca8a04`, `#0f172a` |
| Sage + Coral | Soft sage | Coral | Charcoal | `#ecf0e8`, `#e8634a`, `#2d2d2d` |
| Paper + Blue | Paper white | Electric blue | Ink black | `#fffef5`, `#2563eb`, `#111111` |

---

## Accent Color Usage

**Less accent = more impact.** Restraint is the key to effective accent usage.

**Accent appears in:**
- Overlines and section labels
- Key numbers and hero metrics
- Accent lines/borders (left-border on cards)
- One CTA element per slide

**Accent does NOT appear in:**
- Body text
- Backgrounds of every card
- Borders of every element
- Multiple competing highlight colors on one slide

---

## Color Techniques

- **Opacity layers**: Use 0.04–0.15 opacity of accent color for subtle card backgrounds (`rgba(accent, 0.06)`)
- **Border accent**: 2–3px left border in accent color on cards (more refined than full colored backgrounds)
- **Gradient restraint**: If using gradients, make them nearly invisible (10–20deg shift). No rainbow gradients.
- **Semantic color**: Red/coral for problems/warnings, green/mint for solutions/success, accent for brand elements
- **Dominant color**: One color dominates 70%+ of the palette surface area. Sharp accent on 5-10%.

---

## Dark vs. Light Theme Decision

| Choose Dark When... | Choose Light When... |
|---|---|
| Technical / engineering audience | Corporate / traditional audience |
| Cinematic / dramatic tone | Editorial / clean tone |
| Data-heavy with glowing metrics | Text-heavy with reading flow |
| Startup / modern brand | Established / institutional brand |
| Presentation in dim rooms | Presentation in bright rooms or printed |

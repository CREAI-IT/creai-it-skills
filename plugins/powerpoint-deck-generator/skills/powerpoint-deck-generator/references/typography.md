# Typography

> **When to read**: During design direction (Phase 1) and when building `styles.css` + slides (Phase 2). Typography is the #1 design lever in presentations — the difference between "template" and "designed."

---

## Font Selection

### Rules
- Pick fonts that match the *feeling* of the content, not generic "clean" fonts
- Pair a characterful display font with a complementary body/mono font
- Maximum **2 font families** across the entire deck (display + body/mono)
- Never use the same fonts across multiple decks — every deck should feel unique

### BANNED Fonts (overused in AI-generated content)

**Never use these**: Inter, Roboto, DM Sans, Space Grotesk, Poppins, Montserrat, Open Sans, Lato, Nunito, Raleway, Source Sans Pro

### Font Discovery by Tone

| Tone | Display font direction | Body font direction |
|------|----------------------|-------------------|
| **Luxury / refined** | High-contrast serifs, didones (Playfair Display, Cormorant Garamond, Bodoni Moda) | Light-weight geometric sans (Jost, Satoshi, General Sans) |
| **Technical / engineering** | Monospace or grotesque (IBM Plex Mono, Space Mono, Azeret Mono, Geist Mono) | Clean humanist sans (Figtree, Instrument Sans, Plus Jakarta Sans) |
| **Editorial / magazine** | Bold condensed sans or elegant serif (Bebas Neue, Oswald, Libre Baskerville) | Readable serif or sans (Libre Franklin, Source Serif 4, Newsreader) |
| **Playful / startup** | Rounded or quirky sans (Outfit, Urbanist, Sora, Lexend) | Matching weight sans (Manrope, Wix Madefor Display) |
| **Brutalist / raw** | Industrial grotesque or slab (Anton, Archivo Black, Roboto Slab, Darker Grotesque) | Monospace contrast (JetBrains Mono, Fira Code) |
| **Cinematic / dramatic** | Ultra-bold condensed (Bebas Neue, Oswald, Barlow Condensed) | Thin elegant sans (Jost, Urbanist thin) |
| **Academic / serious** | Classic serifs (Merriweather, Lora, Crimson Pro) | Neutral sans (Figtree, Work Sans) |
| **Korean-first / corporate** | Pretendard, SUIT, Noto Sans KR (display weight 700–900) | Same family lighter weight, or pair with Geist Mono |

**These are starting points, not prescriptions.** Browse Google Fonts for unexpected choices.

---

## Font Size Hierarchy (1920×1080 canvas)

> **Mandatory size ranges are also defined in `SKILL.md` → Font Size Hierarchy table.** This module provides rationale and self-check techniques.

**The viewer test**: Imagine the slide projected in a meeting room, or viewed on a laptop at arm's length. Every text element must be instantly readable without effort. If you have to wonder "is this readable?" — it isn't. Go larger.

**Hard floor: nothing below 14px.** The only exception is source citations at the very bottom. Everything the viewer is meant to actually read must be 22px or above.

### Size Table

| Tier | Element | Size | Weight | Notes |
|------|---------|------|--------|-------|
| **T1** | Action title | 38–44px | 600–700 | Same size on every slide. Left-aligned. |
| **T2** | Subheading / body description | 24–28px | 400–500 | Context paragraph. Start at 24px. |
| **T3** | Card content, descriptions, list items | 22–28px | 400 | **Start at 24px** — default for anything readable. Line-height 1.4–1.6. |
| **T3** | Item titles within cards/lists | 24–28px | 600–700 | Bold sub-items. Never smaller than body text. |
| **Hero** | Key metric / hero number | 64–120px | 700–900 | Accent color. Max 1–2 per slide. |
| **T4** | Category labels, overlines, badges | 14–18px | 600–700 | Uppercase + letter-spacing 0.12–0.2em. |
| **T5** | Source citations, footnotes | 12–14px | 400 | Bottom of slide only. The ONLY text below 14px. |

### Critical Rules

- If content is meant to be read (descriptions, card text, list items): **T3 = 24px default, 22px absolute minimum**. Never 16-20px for body content.
- Maximum **3 font sizes** per slide (excluding sources/footnotes)
- **Never reduce font size to fit more content** — reduce content or split the slide
- When in doubt, go larger. Oversized text with breathing room always beats cramped small text.
- All action titles must be **identical font size** across the entire deck — never vary.

### Self-Check

After building a slide, mentally read every text element top to bottom. If anything feels like "fine print" — it's too small. Body text (T3, 24px default) should feel comfortable and natural.

---

## Typography Techniques

- **Extreme weight contrast**: 700-weight title next to 400-weight subtitle
- **Scale contrast**: 80px number next to 16px label
- **Mixed typefaces in one line**: serif word inside sans-serif sentence for emphasis
- **Negative letter-spacing on large text**: -0.03em to -0.05em makes big type feel tighter
- **Wide letter-spacing on small text**: 0.1–0.2em makes labels feel deliberate
- **Line-height compression**: 0.9–1.0 on hero numbers for dramatic stacking

### Alignment

- Left-align body text. Center-align only for standalone short headlines.
- Never center long paragraphs or multi-line descriptions.

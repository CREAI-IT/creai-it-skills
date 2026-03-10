# Print & Export Compatibility

> **When to read**: Before any PDF export — browser print or Playwright. Contains critical CSS/JS fixes for Chrome print rendering bugs.

---

## The `backdrop-filter` Problem

Chrome's print rendering engine (`window.print()`) **completely hides any element with `backdrop-filter`** — not just the blur effect, but the entire element AND all its children. This means "glass card" patterns (semi-transparent background + blur) will be invisible in browser-printed PDFs.

### How the Viewer Handles This

The viewer template (`viewer-template.html`) includes two automatic fixes:

1. **`@media print` CSS**: Globally disables `backdrop-filter` on all elements via `*, *::before, *::after { backdrop-filter: none !important; }`
2. **`exportPDF()` JS**: Before calling `window.print()`, scans all elements for computed `backdropFilter` values and temporarily replaces semi-transparent `rgba()` backgrounds with solid `#141420` (a dark surface color that blends naturally with dark slide themes).

### Design Implications

- You **can** freely use `backdrop-filter: blur()` for glass effects — the print fix handles it automatically
- Glass cards on dark slides need **sufficient border contrast** (not just the blur) so they're visible even without the blur effect
- The JS fix replaces semi-transparent backgrounds with `#141420`. If your deck uses a **light theme**, customize this fallback color in the viewer's `exportPDF()` function
- The Playwright-based `export_pdf.py` uses real Chromium rendering and does NOT have this bug — it always produces pixel-perfect output

---

## Flex Centering Breaks in Print

Chrome's print engine can misalign text that relies solely on flex `justify-content: center` for centering inside containers. This is especially visible on large hero numbers inside colored bars or boxes.

**Rule**: Never rely on flex centering alone for text inside visual containers. Always add explicit `text-align: center` as a failsafe:

```css
/* WRONG — flex-only centering, unreliable in print */
.bar-visual {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bar-percent { /* inherits inline display, no text-align */ }

/* RIGHT — flex + explicit text centering fallback */
.bar-visual {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bar-percent {
    display: block;
    width: 100%;
    text-align: center;
}
```

---

## Export Methods

### 1. Playwright Script (pixel-perfect, recommended)

`export_pdf.py` opens the **viewer (index.html)** in headless Chromium — the exact same page the user sees. It navigates through each slide using the viewer's own `showSlide()` function, screenshots at 2x resolution (3840×2160), and combines into a PDF.

```bash
# Requires: pip install playwright Pillow && playwright install chromium
python3 export_pdf.py                    # Export all slides (auto-starts server)
python3 export_pdf.py --output deck.pdf  # Custom output filename
python3 export_pdf.py --port 8731        # Custom port
python3 export_pdf.py --no-server        # Expects a running server
```

**No CSS restrictions.** Playwright uses real Chromium rendering. Use any CSS freely: `backdrop-filter`, `radial-gradient()`, CSS variables, `mix-blend-mode`, complex `clip-path`, etc.

### 2. Browser Print (quick export)

The viewer's `P` key triggers `window.print()` with `@media print` CSS. The viewer template includes the automatic `backdrop-filter` and flex centering fixes described above.

---

## Print-Safe CSS Checklist

| Pattern | Print-Safe? | Fix if not |
|---------|------------|------------|
| `backdrop-filter: blur()` | Auto-fixed by viewer | No action needed |
| Semi-transparent `rgba()` backgrounds | Auto-fixed by `exportPDF()` JS | No action needed |
| Flex `justify-content: center` for text | Unreliable | Add `text-align: center; display: block; width: 100%` on text element |
| CSS Grid layouts | Safe | — |
| `position: absolute` elements | Safe | — |
| CSS `transform` | Disabled in `@media print` for `.slide-container` | — |
| Decorative grid lines (via `background-image`) | May render as artifacts | Add `.grid-lines { display: none !important; }` in `@media print` |
| `text-shadow` with large blur (4px+) | Creates visible rectangular highlight/selection box behind text in Playwright screenshots and print, especially on large bold text over gradient backgrounds | Remove `text-shadow` on hero numbers inside colored bars. Use only on text over flat dark backgrounds if needed, with blur ≤ 2px. |

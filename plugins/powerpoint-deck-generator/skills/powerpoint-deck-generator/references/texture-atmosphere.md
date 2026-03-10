# Texture & Atmosphere

> **When to read**: During Phase 2 when setting up slide backgrounds and visual depth. Flat solid-color backgrounds feel digital and lifeless. Even subtle texture adds perceived depth and craft.

---

## Why Texture Matters

The difference between a flat digital slide and one that feels "designed" is atmosphere. Texture creates the perception of craft, depth, and intentionality — even when the viewer can't consciously identify what's different.

---

## CSS-Only Texture Techniques

### Subtle Grid Pattern
```css
background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
```

### Noise/Grain Overlay (via SVG filter)
```css
.grain::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
}
```

### Radial Glow / Spotlight
```css
background: radial-gradient(ellipse at 30% 50%, rgba(56,189,248,0.08) 0%, transparent 60%), var(--bg);
```

### Diagonal Gradient Wash
```css
background: linear-gradient(135deg, rgba(129,140,248,0.04) 0%, transparent 40%), var(--bg);
```

### Vignette (Darkened Edges)
```css
.slide::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%);
    pointer-events: none;
}
```

---

## Layered Approach

Combine 2–3 subtle techniques. A grid + radial glow + noise grain creates rich atmosphere without any single effect being obvious.

**Example — dark technical slide:**
```css
.slide {
    background:
        radial-gradient(ellipse at 20% 40%, rgba(129,140,248,0.06) 0%, transparent 50%),
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
        #08080C;
    background-size: 100%, 80px 80px, 80px 80px, 100%;
}
```

---

## Decorative Elements

- **Accent lines**: Thin (1–3px) lines in accent color, positioned at edges or as dividers
- **Corner marks**: Small L-shaped marks in corners for a technical/blueprint feel
- **Dot patterns**: Repeating small dots for texture
- **Border treatments**: Partial borders (only left + bottom, or only top) feel more designed than full borders
- **Geometric shapes**: Abstract shapes at 0.03–0.08 opacity as background elements
- **Gradient mesh blobs**: Organic shapes with radial gradients for depth

---

## Glass/Frosted Card Effect

```css
.glass-card {
    background: rgba(14, 14, 20, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
}
```

**Print warning**: `backdrop-filter` elements are invisible in Chrome print. See `print-export.md` for the automatic fix built into the viewer template.

---

## Texture by Tone

| Tone | Texture Approach |
|------|-----------------|
| Technical / engineering | Grid lines, corner marks, monospace labels |
| Luxury / refined | Subtle noise grain, gentle radial glow, thin accent lines |
| Brutalist / raw | Heavy grain, sharp geometric shapes, high-contrast borders |
| Cinematic / dramatic | Vignette, spotlight glow, film grain |
| Editorial / clean | Minimal — fine hairline rules, ample whitespace, subtle shadow |
| Playful / startup | Soft gradient blobs, rounded shapes, pastel overlays |

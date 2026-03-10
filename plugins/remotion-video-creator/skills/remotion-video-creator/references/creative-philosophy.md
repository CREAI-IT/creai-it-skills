# Creative Philosophy — Anti-Convergence for Motion Graphics

LLMs converge on the statistical median in both MOTION and DESIGN. This file teaches you to recognize and override those defaults. Read SKILL.md's Two Rules first — this file provides the *why* and contrastive examples.

## Your Two Default Failure Modes

1. **Motion:** All elements on screen by 50%, then camera drifts 1-2%. Fix: camera DIRECTS attention to ONE element at a time.
2. **Design:** Flat solid backgrounds, centered text, uniform sizes. Fix: layered depth, typography contrast, surface texture.

## Focal Direction — FAIL vs PASS

**FAIL — "Animated poster":**
```
F0:   Title fades in center
F15:  Subtitle fades in below
F30:  Three stats fade in left
F45:  CTA fades in bottom
F50+: Everything sits there. Camera drifts 1%. Done.
```

**PASS — "Directed sequence":**
```
F0:   Camera TIGHT on title (scale 1.5). Only title visible.
F25:  Camera PULLS BACK to 1.0, subtitle slides up during pull.
F45:  Camera PANS LEFT, revealing stats. Title dims to 0.3.
F75:  Camera PUSHES INTO key stat. It scales 2x. Accent fires.
F95:  Camera EASES BACK. CTA materializes. Stats recede.
```

## Visual Design — FAIL vs PASS

**FAIL — "PowerPoint slide":**
```tsx
<AbsoluteFill style={{ background: '#0A0E1A' }}>
  <div style={{ fontSize: '3vmin', color: 'white', textAlign: 'center' }}>Title</div>
  <div style={{ fontSize: '3vmin', color: 'white', textAlign: 'center' }}>Subtitle</div>
  <div style={{ fontSize: '3vmin', color: '#00FF88' }}>Data Point</div>
</AbsoluteFill>
```

**PASS — "Designed frame":**
```tsx
<AbsoluteFill style={{ background: 'radial-gradient(ellipse at 30% 40%, #0F1B2E 0%, #060A14 70%)', overflow: 'hidden' }}>
  {/* Grain overlay */}
  <div style={{ position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'overlay',
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
    backgroundSize: '3px 3px' }} />
  {/* Atmospheric glow */}
  <div style={{ position: 'absolute', width: '60vmin', height: '60vmin',
    background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
    left: '20%', top: '30%', filter: 'blur(40px)' }} />
  {/* Content with typography hierarchy */}
  <div style={{ fontSize: '8vmin', fontWeight: 800, textShadow: '0 2px 40px rgba(0,255,136,0.3)' }}>TITLE</div>
  <div style={{ fontSize: '3vmin', fontWeight: 300, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em' }}>SUBTITLE</div>
</AbsoluteFill>
```

## 7 Default Failure Modes

1. **"Corporate deck"** — Text slamming onto gradient backgrounds
2. **"Explainer template"** — Numbered steps alternating left/right
3. **"Startup landing page"** — Hero text + CTA on ethereal glow
4. **"Dump and stare"** — Everything enters first 30-50%, then static
5. **"AI aesthetic"** — Circles/orbs as the only background
6. **"Graphic design template"** — Flat, evenly-spaced, no tension
7. **"Equal attention"** — Multiple elements at same prominence

If you're building any of these → ask: "What is the viewer looking at RIGHT NOW?" If "everything" → failed.

## Craft Vectors

### Depth (Parallax)
Each layer needs BOTH scale AND translateX at different speeds:
- L0 background: `camScale * 0.95`, `camX * 0.3` (slow)
- L1 content: 1:1
- L3 foreground: `camX * 1.8` (fast)

### Spatial Staging
Oversized wrapper (200-300%) holds pre-placed content. Camera pans via translateX/Y. Content placed BEFORE camera arrives — camera reveals, not spawns.

### Restraint
One signature mechanism, at most two supporting. No technique collage.

## Motion Craft

### Spring Vocabulary
| Name | Config | Feel |
|------|--------|------|
| refined | mass: 1.2, damping: 28, stiffness: 80 | luxury, graceful |
| snappy | damping: 20, stiffness: 200 | instant UI |
| impact | mass: 3, damping: 18, stiffness: 250 | slam |
| playful | damping: 8 | bouncy |
| gentle | damping: 200 | drift |
| precise | damping: 20, stiffness: 200, overshootClamping: true | data |
| whip | mass: 0.5, damping: 15, stiffness: 300 | explosive |

### Timing Grammar (30fps)
Micro: 3-5f · Quick: 5-8f · Standard: 8-12f · Moderate: 12-18f · Dramatic: 18-27f · Cinematic: 27-45f. Mix tiers deliberately — uniform duration = monotonous.

### Typography Entrance
L1 (hero) enters FIRST, ALONE with solo hold (10-14f). L2 AFTER hold. L3 AFTER L2. Hero: clip-reveal, not fade.

### Color Choreography
Accent withheld until signature beat (50-70%). Before: dominant + secondary only. Background: `interpolateColors()` shifting — static = dead.

## Amplitude Floors

- Scale entrance >= 0.5 range (FAIL: 0.92→1.0, PASS: 0.3→1.08→1.0)
- Position >= 8vmin (FAIL: 2vmin nudge)
- Camera scale range >= 0.3 (FAIL: 1.0→1.02, PASS: 1.0→1.5→0.95→1.3)
- Every entrance: opacity + scale + position (never opacity-only)
- Velocity contrast: slowest >= 3x fastest. Hero = FASTEST beat.

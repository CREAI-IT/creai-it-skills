# Scene Planning Guide

How to decompose a video request into multi-scene plans in `plan.md`.

## When to Split Into Multiple Scenes

- Video > 10 seconds (300 frames at 30fps) -> always multi-scene
- Video has distinct narrative phases (intro, content, outro)
- Different visual treatments needed for different sections
- Content would exceed ~200 lines of TSX in a single file

Short videos (< 10s) can be a single scene.

## Plan.md Structure

Write this markdown file inside the video's dedicated folder before generating any code.

```markdown
# Video Plan: [Video Title]

## Overview
- **Prompt:** [Original user request]
- **Duration:** [Total seconds] ([total frames] frames at 30fps)
- **Aspect Ratio:** [16:9 | 9:16 | 1:1 | 4:5] ([width]x[height])
- **Tone:** [Overall emotional direction]

## Design System
- **Primary:** [hex] — [usage: backgrounds, large surfaces]
- **Secondary:** [hex] — [usage: emphasis, supporting elements]
- **Accent:** [hex] — [usage: signature moments only, withheld until beat]
- **Heading Font:** [Google Font name] (weights: 700, 800)
- **Body Font:** [Google Font name] (weights: 400, 500)

## Scene Breakdown

### Scene 1: [Title] (0s - Xs)
- **Duration:** [X] frames
- **Role:** HERO | ACCENT | ANCHOR
- **Focal Timeline:** [WRITE THIS FIRST — everything else flows from this]
  - F0-F30: Camera TIGHT on [element] (scale ~1.5). ONLY this visible. Everything else opacity 0.
  - F30-F60: Camera PULLS BACK (1.5→0.95), revealing [element]. Previous dims to 0.3.
  - F60-F90: Camera PANS to [element]. It sharpens into focus. Others at 0.2.
  - F90-end: Camera PUSHES into [element] (0.95→1.3). Signature beat fires.
  **Camera scale range in this scene: 0.95-1.5 (0.55 range ✓ >= 0.3 required)**
- **Content:** [What text/visuals appear — be EXACT with copy]
- **Visual Concept:** [The ONE signature mechanism — not a list of techniques]
- **Atmosphere:** [Background treatment, depth layers, grain, lighting]
- **Transition Out:** [How this scene hands off to the next]

### Scene 2: [Title] (Xs - Ys)
...

## Scene Connections
- Scene 1 → 2: [Visual thread — shape/color/direction that bridges them]
- Scene 2 → 3: [Visual thread]
```

## Scene Roles

| Role | Duration | Purpose |
|------|----------|---------|
| HERO | 3-6s | Primary narrative beat. The scene people remember. |
| ACCENT | 1.5-3s | Quick punctuation — stat reveal, visual transition, emphasis. |
| ANCHOR | 5-10s | Extended showcase — data viz, process walkthrough, demonstration. |

## What Makes a Good Scene Description

### BAD (too vague):
```
### Scene 2: Features
- Show the product features with animations
- Make it look professional
```

### GOOD (specific, actionable, with focal direction):
```
### Scene 2: Speed Metric (3s - 6.5s)
- **Duration:** 105 frames
- **Role:** ACCENT
- **Content:** "10x Faster" as hero metric. Below: "Than traditional pipelines".
  Bar chart showing speed comparison.
- **Focal Timeline:**
  - F0-F25: Camera TIGHT (scale 1.5) on counter "10x". Counter rapidly
    counts 0→10 with snappy spring. ONLY counter visible — everything else
    either off-viewport or opacity 0.
  - F25-F50: Camera PULLS BACK (1.5→0.95), revealing subtitle and bar chart
    below. Counter dims to 0.4 opacity. Bar chart is now focal — it races
    left-to-right via clipPath reveal.
  - F50-F75: Camera PUSHES INTO bar chart's peak bar (0.95→1.3). Accent
    color fires on the tallest bar. Counter and subtitle at 0.2 opacity.
  - F75-F105: Camera EASES BACK (1.3→1.0). All elements visible at moderate
    opacity. "Than traditional pipelines" sharpens as the final focal element.
- **Visual Concept:** Counter + racing bar as a unified speed construct.
  Camera does the storytelling — tight on number, reveal context, zoom into proof.
- **Camera:** Scale range 0.95-1.5 (55% range). Targets: counter → full view → bar peak → settle.
- **Atmosphere:** Dark (#0A0F1E) with radial gradient pulsing behind focal element.
  Grain 5%. Foreground bokeh particles at 10% opacity.
- **Transition Out:** Bar element persists as incoming motif for Scene 3.
```

## Timing Rules

- At 30fps: 1 second = 30 frames
- Minimum scene duration: 45 frames (1.5s)
- Transition overlap between scenes: 10-15 frames
- Total frames = sum of scene frames - sum of transition overlaps

## Pacing Contract Per Scene

Each scene has 3 phases:
- **Setup (0-35%):** Entrances, establishing elements
- **Development (30-70%):** Evolution, signature beat, state changes
- **Resolution (65-100%):** Settle, prepare handoff, exit choreography

## Design System Selection

Choose colors and fonts that match the video's tone:

| Tone | Color Direction | Font Direction |
|------|----------------|----------------|
| Corporate / Tech | Dark navy + electric blue accent | Inter, Space Grotesk |
| Creative / Playful | Warm palette, saturated accent | Sora, Plus Jakarta Sans |
| Luxury / Premium | Near-black + gold/champagne accent | Playfair Display, Cormorant |
| Data / Analytics | Cool grays + green/cyan accent | JetBrains Mono, IBM Plex Sans |
| Editorial / Bold | High contrast + red/orange accent | Bebas Neue, Oswald |

Never pure #000 or #FFF — use undertones. Primary should be 60% of visual area, secondary 30%, accent 10% (and withheld until signature beat).

---
name: remotion-video-creator
description: Use when creating Remotion videos, motion graphics, or animated video content with React. Triggers on requests to "create a video", "make a motion graphic", "animate with Remotion", "build a video component", "generate a promo video", or any video/animation creation task using Remotion. Also triggers on requests to add new video compositions to an existing Remotion project.
---

# Remotion Video Creator

Create dynamic, studio-quality motion graphics using Remotion (React-based video).

## THE TWO NON-NEGOTIABLE RULES (Read This First)

Professional motion graphics stand on two pillars: **visual design** (what any single frame looks like) and **focal direction** (how motion guides the viewer's eye). A scene missing either one is AI slop. Both must pass or the scene is REJECTED.

### RULE 1: VISUAL DESIGN — Every Frame Must Be Worth Freezing

A single freeze-frame of your scene should look like a designed poster, not a PowerPoint slide. Every scene MUST have:

1. **Layered background** — NEVER a flat solid color. Minimum: base gradient + texture (noise/grain at 3-8% opacity) + atmospheric element (glow, vignette, or geometric shape). A flat `background: '#0A0E1A'` with nothing else = **FAIL**.
2. **Depth through visual layers** — 4+ layers at different opacities and scales creating foreground/midground/background separation. Not everything at opacity 1.0 on the same plane.
3. **Typography as architecture** — Hero text 3-5x larger than support text. Weight contrast (700+ vs 300-400). Asymmetric placement creating visual tension. Never: all text centered, same size, same weight.
4. **Color restraint with accent punch** — Primary color dominates (60%+ area). Accent color WITHHELD until signature beat (50-70% of scene). Gradients evolve over time via `interpolateColors()` — static gradients = dead wallpaper.
5. **Surface quality** — At least ONE of: grain/noise overlay, directional shadow, glass blur, subtle glow, vignette. The scene must feel like it has MATERIAL, not flat vector shapes.

**If your scene is text on a flat gradient — DELETE IT.**

### RULE 2: FOCAL CAMERA — Direct the Viewer's Eye

**At every moment, ONE element dominates attention.** The camera, scale, contrast, and blur conspire to POINT the viewer's eye at that one thing. Every scene MUST have:

1. **A camera wrapper div** that wraps ALL content, with `transform: translate3d(X%, Y%, 0) scale(S)` driven by `interpolate()`. All content is pre-placed inside; the camera ARRIVES at elements. **The outer AbsoluteFill MUST have `overflow: 'hidden'`** to clip content that the camera pushes outside the viewport.
2. **Camera scale range >= 30%** (e.g., 0.95-1.5). A 2% camera move is invisible and useless. If your camera scale range is less than 30%, your scene FAILS. **Camera min scale must be >= 0.95** to avoid empty edges showing.
3. **3-4 focal phases** where the camera targets a SPECIFIC element each time: tight on A → pull back revealing B → pan to C → push into D. Each phase answers: "what does the viewer look at NOW?"
4. **Selective visibility** — when Element A is focal, everything else is at opacity 0.2-0.4 and/or blurred. Elements are NOT all visible at full opacity simultaneously. Ever.
5. **A focal timeline comment block** at the top of derived values, BEFORE any camera code:
   ```
   // === FOCAL TIMELINE ===
   // F0-F30: TIGHT on [element] (scale 1.5). Only this visible.
   // F30-F60: PULL BACK revealing [element]. Previous dims to 0.3.
   // F60-F90: PAN to [element]. It sharpens. Others at 0.2.
   // F90-end: PUSH into [element]. Signature beat.
   ```

**If a scene does not have BOTH rules satisfied, DELETE IT and start over.** No exceptions.

## Workflow

### Step 1: Project Check

Search for an existing Remotion project in the current directory AND subdirectories:

```bash
# Check current directory first
grep -q "remotion" package.json 2>/dev/null && echo "FOUND: $(pwd)"

# If not found, search subdirectories (max 3 levels deep)
find . -maxdepth 3 -name "package.json" -exec grep -l '"remotion"' {} \; 2>/dev/null
find . -maxdepth 3 -name "remotion.config.*" 2>/dev/null
```

**If a Remotion project EXISTS** (in current dir or a subdirectory), `cd` into that project root and use it. Do NOT scaffold a new one.

**If NO Remotion project exists anywhere**, scaffold one:

```bash
npx create-video@latest <project-name> --template blank
cd <project-name>
npm install
# Install extras needed for transitions and fonts:
npx remotion add @remotion/transitions
npx remotion add @remotion/google-fonts
```

### Step 2: Create Video Folder

Create a dedicated folder for this video inside `src/videos/`:

```
src/videos/<video-name>/
├── plan.md              # Scene decomposition (Step 4)
├── index.ts             # Exports composition config
├── Composition.tsx      # Parent composition stitching scenes
├── Scene001.tsx         # Individual scene components
├── Scene002.tsx
└── ...

public/assets/<video-name>/   # Assets folder (Step 3)
├── logo.png
├── background.jpg
└── ...
```

Use kebab-case for folder names matching the video concept.

### Step 3: Gather Assets — MANDATORY CHECKPOINT

**⚠️ STOP. You MUST ask the user about assets and WAIT for their response before proceeding to Step 4.**

Do NOT skip this step. Do NOT assume "no assets needed." Do NOT proceed to plan.md until the user has explicitly answered.

Use the `AskUserQuestion` tool to ask:

```
"Do you have any visual assets you'd like to use in this video?"

Options:
1. "Yes, I have files" — I'll provide file paths or URLs
2. "I need specific images" — Describe what you need and I'll find them
3. "No assets needed" — Proceed with pure motion graphics
```

**WAIT for the user's response.** Then:

- **Option 1:** Copy files to `public/assets/<video-name>/` (use `cp` or `curl -L -o` for URLs)
- **Option 2:** Use `WebSearch` to find free images, show user for approval, download to assets folder
- **Option 3:** Proceed to Step 4

**In scene code:** `<Img src={staticFile('assets/<video-name>/logo.png')} style={{ width: '20vmin', objectFit: 'contain' }} />`

### Step 4: Write plan.md

**Before writing ANY code**, create `plan.md` that decomposes the video into scenes.

Read [references/scene-planning-guide.md](references/scene-planning-guide.md) for the full planning format.

Key rules:
- Videos > 10s MUST be multi-scene (one scene per narrative beat)
- Each scene description must be specific: exact text content, motion concept, timing, camera behavior
- Include a design system (colors, fonts) that all scenes share
- Define scene connections (visual threads between scenes)
- Assign scene roles: HERO (3-6s), ACCENT (1.5-3s), ANCHOR (5-10s)
- **If assets were gathered in Step 3**, include an `## Assets` section at the top of plan.md listing each file and which scenes use it. Each scene description MUST specify which assets it uses:
  ```markdown
  ## Assets
  - `logo.png` — Company logo, used in Scene001 (hero) and Scene006 (closing)
  - `background.jpg` — Dark textured background for Scene002-005

  ## Scene 001 — Opening (HERO, 5s)
  Assets: logo.png (center, 20vmin, focal element in phase 1)
  ...
  ```

### Step 5: Generate Scene Code

Generate each scene's TSX one by one, giving full attention to each.

**Before writing scene code**, read these references:
- [references/remotion-gotchas.md](references/remotion-gotchas.md) — crash prevention rules (MUST read)
- [references/creative-philosophy.md](references/creative-philosophy.md) — anti-generic motion design
- [references/motion-patterns.md](references/motion-patterns.md) — proven code snippets to reference

**Per-scene rules:**

1. Self-contained component: `export default SceneNNN`. Imports: `'react'`, `'remotion'`, `@remotion/google-fonts` only
2. Hooks before conditionals · `random('seed')` not `Math.random()` · Always clamp interpolation · No CSS transitions
3. Viewport units (`vmin`, `%`) not pixels · Google Fonts via `@remotion/google-fonts`

**Per-scene writing order (MANDATORY):**

1. **Design the visual foundation** — background layers (gradient + texture + atmosphere), color system, typography scale. Write the AbsoluteFill with layered background FIRST.
2. **Write the focal timeline comment block** — what does the viewer look at at F0, F30, F60, F90? This goes BEFORE any camera code.
3. **Write the camera scale/position math** — driven by the focal timeline. Scale range MUST be >= 0.3 (e.g., 0.95-1.5).
4. **Write selective visibility** — each element gets a focal opacity variable that dims it when it's not the current focus.
5. **Write the content with design applied** — pre-placed inside the camera wrapper. Apply typography hierarchy (L1/L2/L3 sizing + weight contrast), color restraint, surface quality.

**After completing a scene, self-check:**

**DESIGN (Rule 1):** Background = gradient + grain + atmosphere (not flat solid)? 4+ depth layers? Hero text 3-5x larger, weight contrast 700+ vs 300? All fontSize >= 2vmin? Accent withheld until 50-70%? At least one surface effect (grain/shadow/glow/blur)?

**CAMERA (Rule 2):** Scale range >= 30%? Min scale >= 0.95? ONE element dominates at any frame? New focal target after 50%? Non-focal dimmed to 0.2-0.4?

**SAFETY:** Content in 15-85% safe zone? `overflow: 'hidden'` on AbsoluteFill? cameraX/Y <= ±8%?

### Step 6: Create Parent Composition

Create `Composition.tsx` that stitches scenes together using `TransitionSeries`:

```tsx
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import Scene001 from './Scene001';
import Scene002 from './Scene002';

const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene001 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene002 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default MyVideo;
```

Remember: transition frames are SUBTRACTED from total duration.

### Step 7: Register in Root.tsx

Add the composition to `src/Root.tsx`:

```tsx
import { Composition } from 'remotion';
import MyVideo from './videos/my-video/Composition';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="my-video"
        component={MyVideo}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ... other compositions */}
    </>
  );
};
```

### Step 8: Preview & Render

```bash
# Preview in browser
npx remotion studio

# Render to MP4
npx remotion render src/index.ts <composition-id> out/video.mp4
```

## Aspect Ratios

| Ratio | Dimensions | Use Case |
|-------|------------|----------|
| 16:9  | 1920x1080  | YouTube, presentations |
| 9:16  | 1080x1920  | TikTok, Reels, Stories |
| 1:1   | 1080x1080  | Instagram, social |
| 4:5   | 1080x1350  | Instagram feed |

Default to 16:9 / 1920x1080 / 30fps unless user specifies otherwise.

## Single Scene Videos

For videos under 10 seconds, skip multi-scene decomposition:
- Still write `plan.md` (but with a single scene entry)
- Create the scene directly as `Composition.tsx`
- Register in Root.tsx


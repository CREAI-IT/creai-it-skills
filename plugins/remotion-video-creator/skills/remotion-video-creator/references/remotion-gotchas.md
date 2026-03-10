# Remotion Technical Rules — Crash Prevention

Read this before writing ANY Remotion code. Violations cause runtime crashes or render failures.

## Fatal: Hooks Order

ALL hooks must be called before ANY conditional logic. Never put hooks after `if (...) return`, inside `if` blocks, inside `.map()`, or inside nested functions.

```tsx
// CORRECT
const frame = useCurrentFrame();
const { fps, durationInFrames: duration } = useVideoConfig();
const items = useMemo(() => [...], []);
// ... derived values ...
return <AbsoluteFill>...</AbsoluteFill>;

// FATAL CRASH
if (someCondition) return null;
const frame = useCurrentFrame(); // Hook after conditional = crash
```

## Fatal: Determinism

Remotion renders your component ONCE PER FRAME. Non-deterministic code produces different results per render = visual glitches or crashes.

```tsx
// CRASH: Math.random()
const x = Math.random() * 100;

// CORRECT: import { random } from 'remotion'
const x = random('my-seed') * 100;

// CRASH: Same seed for all items = identical values
Array.from({length: 40}, () => ({ x: random('px') * 100 }));

// CORRECT: Unique seed per item
Array.from({length: 40}, (_, i) => ({ x: random('px-' + i) * 100 }));
```

Also forbidden: `Date.now()`, `new Date()`, `setTimeout`, `setInterval`, `requestAnimationFrame`.

## Interpolation Rules

Always clamp to prevent values shooting beyond intended range:

```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
});
```

- `inputRange` must be ascending: `[0, 30, 60]` not `[60, 30, 0]`
- Hardcoded frame values must NOT exceed `durationInFrames`
- For colors: use `interpolateColors()` ONLY — `interpolate()` cannot handle color strings

## Spring Configuration

`fps` is REQUIRED — get it from `useVideoConfig()`:

```tsx
const { fps } = useVideoConfig();
const s = spring({ frame, fps, config: { damping: 200 } });
```

Common spring configs:
```tsx
const smooth = { damping: 200 };           // No bounce (subtle reveals)
const snappy = { damping: 20, stiffness: 200 }; // Minimal bounce (UI)
const bouncy = { damping: 8 };             // Bouncy (playful)
const heavy  = { damping: 15, stiffness: 80, mass: 2 }; // Heavy, slow
```

## Easing API Pitfalls

```tsx
// CORRECT: Pass function reference
easing: Easing.ease

// CRASH: Calling the function
easing: Easing.ease(0.5)

// CORRECT: Modifiers wrap functions
easing: Easing.out(Easing.quad)

// CORRECT names (common mistakes)
Easing.sin     // NOT Easing.sine
Easing.circle  // NOT Easing.circ
Easing.exp     // NOT Easing.expo
```

Curves (most linear to most curved): `quad`, `sin`, `exp`, `circle`
Convexities: `in` (slow start), `out` (slow end), `inOut`

Cubic bezier:
```tsx
easing: Easing.bezier(0.8, 0.22, 0.96, 0.65)
```

## CSS Forbidden

- NO CSS transitions or animations — they don't render during SSR
- NO Tailwind animation classes
- NO `transition:` property
- ALL animation must be driven by `useCurrentFrame()` + `interpolate()`/`spring()`

## Font Sizing

Use viewport units (`vmin`) not pixels. 1vmin = 10.8px on 1080p.

| Hierarchy | Size | Use |
|-----------|------|-----|
| L1 HERO | 6–10vmin | Headlines |
| L2 SUPPORT | 3–5vmin | Subheadings |
| L3 DETAIL | 2–3vmin | Captions |
| **ABSOLUTE MIN** | **2vmin** | Nothing smaller. Ever. |

Common mistake: `1vmin`–`1.5vmin` = 11–16px = unreadable on video. Always `>= 2vmin`.

Never malformed fontFamily: `', sans-serif'` — always include font name + `, sans-serif` fallback.

## Loading Google Fonts

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
```

Install if needed: `npx remotion add @remotion/google-fonts`

## Sequencing

Use `<Sequence>` to delay elements. Inside a Sequence, `useCurrentFrame()` returns local frame (starting from 0):

```tsx
<Sequence from={30} durationInFrames={60} premountFor={30}>
  <MyComponent /> {/* frame 0-59 locally, 30-89 globally */}
</Sequence>
```

Always premount: `premountFor={fps}` prevents pop-in.

Use `layout="none"` when the component shouldn't be wrapped in AbsoluteFill:
```tsx
<Sequence layout="none" from={30}>
  <Title />
</Sequence>
```

## Transitions (Between Scenes)

Install: `npx remotion add @remotion/transitions`

Imports: `TransitionSeries`, `linearTiming` from `@remotion/transitions`; presentations from `@remotion/transitions/fade`, `/slide`, `/wipe`.

**Gotcha:** Transition duration is SUBTRACTED from total: two 90f scenes with 15f transition = 165f total (not 180f). See SKILL.md Step 6 for full code example.

## Output Format

- First lines: imports from 'react' and 'remotion' only
- One component per file with `export default ComponentName`
- Structure: hooks -> derived values -> JSX (no hooks after conditionals)

## Array Safety

```tsx
// Always floor for array lengths
const count = Math.floor(random('count') * 10) + 5;

// Always modulo for array index access
const index = Math.floor(value) % items.length;
```

## Using Image Assets

Place assets in `public/assets/<video-name>/`. Use Remotion's `Img` component (NOT HTML `<img>`) — it ensures the image is loaded before rendering:

```tsx
import { Img, staticFile } from 'remotion';

// CORRECT: Img component waits for load
<Img src={staticFile('assets/my-video/logo.png')}
     style={{ width: '20vmin', objectFit: 'contain' }} />

// WRONG: HTML img may render before loaded = blank frame
<img src={staticFile('assets/my-video/logo.png')} />
```

Remote URLs work directly without `staticFile()`:
```tsx
<Img src="https://example.com/image.png" />
```

No `data:` URIs, no `blob:` URLs. Only `http://`, `https://`, or `staticFile()` paths.

## Camera Overflow Prevention

Camera transforms (scale 1.5 + translate) push content outside viewport. Four rules:

1. **`overflow: 'hidden'`** on outer AbsoluteFill (clips pushed content)
2. **Safe zone 15-85%** — at scale 1.5 + translate 8%, content at 88% sits at `88% * 1.5 - 12% = 120%` (off-screen)
3. **Translate limits ±8%** — `cameraX`/`cameraY` beyond ±8% pushes safe-zone content off-screen
4. **Min scale >= 0.95** — below this, empty edges show


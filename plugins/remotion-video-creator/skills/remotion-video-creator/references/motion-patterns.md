# Motion Patterns — Code Reference

Copy-paste-ready snippets. Each solves a specific LLM failure mode.

## Common Setup

```tsx
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const ss = (t: number) => { const x = Math.max(0, Math.min(1, t)); return x*x*x*(x*(6*x-15)+10); };
```

---

## Focal Camera

```tsx
// === FOCAL TIMELINE ===
// F0-35:   TIGHT on hero (scale 1.5)
// F35-65:  PULL BACK (1.5 → 0.95)
// F65-100: PAN RIGHT to data
// F100-end: PUSH IN on metric (0.95 → 1.3)

const phase1 = ss(interpolate(frame, [0, 35], [0, 1], clamp));
const phase2 = ss(interpolate(frame, [35, 65], [0, 1], clamp));
const phase3 = ss(interpolate(frame, [65, 100], [0, 1], clamp));
const phase4 = ss(interpolate(frame, [100, duration], [0, 1], clamp));

const cameraScale = 1.5 - phase2 * 0.55 + phase4 * 0.35;
// Range: 0.95–1.5 (55% ✓)

const cameraX = -5 + phase2 * 5 + phase3 * 12 - phase4 * 8;
const cameraY = -3 + phase2 * 3 + phase4 * -2;

<div style={{
  position: 'absolute', inset: 0,
  transform: `translate3d(${cameraX}%, ${cameraY}%, 0) scale(${cameraScale})`,
  transformOrigin: '50% 50%',
}}>
  {/* ALL content inside. Content in 15-85% safe zone. */}
</div>
```

## Selective Visibility

```tsx
const titleFocal = interpolate(frame, [0, 35, 50, 65], [1, 1, 0.3, 0.2], clamp);
const dataFocal = interpolate(frame, [50, 70, 90, duration], [0.15, 1, 1, 0.8], clamp);

<div style={{
  opacity: titleFocal,
  filter: `blur(${interpolate(titleFocal, [0.3, 1], [2, 0], clamp)}px)`,
  transform: `scale(${interpolate(titleFocal, [0.2, 1], [0.95, 1], clamp)})`,
}}>
  {/* Sharp when focal, blurred+dim when not */}
</div>
```

## Parallax Depth

```tsx
// L0 far (slow): camScale * 0.95, camX * 0.3
// L1 hero (1:1): camScale, camX
// L3 near (fast): camX * 1.8, 1 + ((camScale-1) * 1.3)

<div style={{ transform: `scale(${cameraScale * 0.95}) translateX(${cameraX * 0.3}%)` }}>
  {/* Background */}
</div>
<div style={{ transform: `scale(${cameraScale}) translateX(${cameraX}%)` }}>
  {/* Hero content */}
</div>
<div style={{ transform: `translateX(${cameraX * 1.8}%)`, pointerEvents: 'none' }}>
  {/* Foreground accents */}
</div>
```

## Typography Cascade

L1: 6-10vmin · L2: 3-5vmin · L3: 2-3vmin · Min: 2vmin

```tsx
// L1 enters FIRST, alone. Impact spring. Solo hold F22-F36.
const heroSpring = spring({ frame, fps, config: { mass: 3, damping: 18, stiffness: 250 } });
const heroY = interpolate(heroSpring, [0, 1], [120, 0]);

// L2 enters AFTER solo hold.
const supportProgress = interpolate(frame, [36, 50], [0, 1], clamp);

// L3 enters last. Quick.
const detailProgress = interpolate(frame, [58, 68], [0, 1], clamp);
```

## Split-Reveal Text

```tsx
const heroText = 'KINETIC';
const charStagger = 3;
const characters = useMemo(() => heroText.split('').map((c, i) => ({ char: c, index: i })), []);

<div style={{ display: 'flex', overflow: 'hidden', fontSize: '8vmin', fontWeight: 800 }}>
  {characters.map(({ char, index }) => {
    const charStart = 4 + index * charStagger;
    const charSpring = spring({
      frame: Math.max(0, frame - charStart), fps,
      config: { mass: 1.2, damping: 28, stiffness: 80 },
    });
    return (
      <span key={index} style={{
        display: 'inline-block',
        transform: `translateY(${interpolate(charSpring, [0, 1], [120, 0])}%)`,
        opacity: interpolate(charSpring, [0, 1], [0, 1]),
      }}>{char === ' ' ? '\u00A0' : char}</span>
    );
  })}
</div>
```

## Signature Beat

Anticipation → impact → settle, at 38-50% duration.

```tsx
const anticipation = interpolate(frame, [sigStart, sigStart + 8], [0, 1], clamp);
const antiScale = interpolate(anticipation, [0, 1], [1, 0.96]);

const impactSpring = spring({
  frame: Math.max(0, frame - (sigStart + 8)), fps,
  config: { mass: 3, damping: 18, stiffness: 250 },
});

const accentFlash = interpolate(frame, [sigStart + 8, sigStart + 14, sigStart + 28], [0, 1, 0.1], clamp);
```

## Color Withholding

```tsx
const accentColor = interpolateColors(
  frame,
  [0, sigStart, sigStart + 10, sigEnd + 20, duration],
  [SECONDARY, SECONDARY, ACCENT, SECONDARY, SECONDARY]
);
```

## Background Evolution

```tsx
const bgAngle = interpolate(frame, [0, duration], [135, 143], clamp);
const bgTop = interpolateColors(frame, [0, duration], ['#0A0A14', '#0E0A18']);
const bgBottom = interpolateColors(frame, [0, duration], ['#16213E', '#1A1840']);
const bgBreathing = 1 + Math.sin((frame / 120) * Math.PI * 2) * 0.004;

<AbsoluteFill style={{
  background: `linear-gradient(${bgAngle}deg, ${bgTop} 0%, #0F1020 38%, ${bgBottom} 100%)`,
  transform: `scale(${bgBreathing})`,
}}>
  {/* Grain overlay */}
  <div style={{
    position: 'absolute', inset: 0, opacity: 0.05,
    mixBlendMode: 'overlay' as const,
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
    backgroundSize: '3px 3px',
  }} />
</AbsoluteFill>
```

## Eased Stagger

Delays DECREASE for momentum: +8f, +5.7f, +4.4f, +3.6f.

```tsx
const baseDelay = 8;
const getStaggerDelay = (i: number) => Math.round(baseDelay / (1 + i * 0.4));
const getCumulativeStart = (index: number) => {
  let start = heroLandFrame;
  for (let i = 0; i < index; i++) start += Math.round(getStaggerDelay(i) * 0.65);
  return start;
};

{items.map((item, i) => {
  const itemStart = getCumulativeStart(i);
  const progress = interpolate(frame, [itemStart, itemStart + 14], [0, 1], clamp);
  return <div key={i} style={{ opacity: progress, transform: `scale(${interpolate(progress, [0, 0.7, 1], [0.95, 1.03, 1], clamp)})` }}>{item}</div>;
})}
```

## Lissajous Drift

3+ incommensurate frequencies = never-repeating motion.

```tsx
const driftX = Math.sin(frame * 0.017) * 0.4 + Math.sin(frame * 0.031) * 0.25 + Math.sin(frame * 0.053) * 0.15;
const driftY = Math.cos(frame * 0.013) * 0.3 + Math.cos(frame * 0.029) * 0.2 + Math.cos(frame * 0.047) * 0.1;
```

## Spring Kick

Impulse that peaks then returns to zero (unlike spring() which stays at 1).

```tsx
const kickElapsed = Math.max(0, frame - kickStart);
const kickAttack = interpolate(kickElapsed, [0, 4], [0, 1], clamp);
const kickDecay = kickElapsed > 4
  ? Math.exp(-(kickElapsed - 4) * 0.08) * Math.cos((kickElapsed - 4) * 0.25)
  : 0;
const kick = kickElapsed <= 4 ? kickAttack : kickDecay;
```

## ClipPath Reveal

```tsx
const vertReveal = interpolate(frame, [8, 30], [0, 1], {
  ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1),
});
<div style={{ clipPath: `polygon(0% ${100 - vertReveal * 100}%, 100% ${100 - vertReveal * 100}%, 100% 100%, 0% 100%)` }}>
  HEADLINE
</div>
```

## Exit Choreography

Reverse hierarchy: L3 exits first, L1 last. Fade to 0.3, not hard 0.

```tsx
const exitStart = duration - 40;
const detailExit = interpolate(frame, [exitStart, exitStart + 12], [1, 0], clamp);
const supportExit = interpolate(frame, [exitStart + 8, exitStart + 22], [1, 0.15], clamp);
const heroExit = interpolate(frame, [exitStart + 16, exitStart + 36], [1, 0.3], clamp);
```

## Scene Skeleton (MANDATORY)

Every scene must follow this structure.

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring, random,
  AbsoluteFill, interpolateColors, Easing } from 'remotion';
import React, { useMemo } from 'react';

const Scene001: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames: duration } = useVideoConfig();

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      x: random('x-' + i) * 100, y: random('y-' + i) * 100,
    })), []);

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
  const ss = (t: number) => { const x = Math.max(0, Math.min(1, t)); return x*x*x*(x*(6*x-15)+10); };

  // === FOCAL TIMELINE ===
  // F0-F35:   TIGHT on [hero] (scale 1.5). Only this visible.
  // F35-F65:  PULL BACK revealing [support]. Hero dims to 0.3.
  // F65-F100: PAN to [data]. It sharpens. Others at 0.2.
  // F100-end: PUSH IN on [signature]. Accent fires.

  const phase1 = ss(interpolate(frame, [0, 35], [0, 1], clamp));
  const phase2 = ss(interpolate(frame, [35, 65], [0, 1], clamp));
  const phase3 = ss(interpolate(frame, [65, 100], [0, 1], clamp));
  const phase4 = ss(interpolate(frame, [100, duration], [0, 1], clamp));

  const cameraScale = 1.5 - phase2 * 0.55 + phase4 * 0.35;
  const cameraX = -5 + phase2 * 5 + phase3 * 12 - phase4 * 8;
  const cameraY = -3 + phase2 * 3 + phase4 * -2;

  const heroFocal = interpolate(frame, [0, 35, 50, 65], [1, 1, 0.3, 0.2], clamp);
  const supportFocal = interpolate(frame, [30, 55, 75, 100], [0, 1, 0.4, 0.2], clamp);
  const dataFocal = interpolate(frame, [60, 80, 100, duration], [0, 1, 1, 0.8], clamp);

  const driftX = Math.sin(frame * 0.017) * 0.4 + Math.sin(frame * 0.031) * 0.25;
  const driftY = Math.cos(frame * 0.013) * 0.3 + Math.cos(frame * 0.029) * 0.2;

  const bgAngle = interpolate(frame, [0, duration], [135, 143], clamp);
  const bgTop = interpolateColors(frame, [0, duration], ['#0A0A14', '#0E0A18']);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${bgAngle}deg, ${bgTop}, #0F1020)`,
      overflow: 'hidden',
    }}>
      {/* Grain overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05,
        mixBlendMode: 'overlay' as const,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '3px 3px' }} />

      {/* Camera wrapper */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate3d(${cameraX + driftX}%, ${cameraY + driftY}%, 0) scale(${cameraScale})`,
        transformOrigin: '50% 50%',
      }}>
        <div style={{ opacity: heroFocal,
          filter: `blur(${interpolate(heroFocal, [0.3, 1], [2, 0], clamp)}px)` }}>
          {/* Hero content */}
        </div>
        <div style={{ opacity: supportFocal,
          filter: `blur(${interpolate(supportFocal, [0.3, 1], [3, 0], clamp)}px)` }}>
          {/* Supporting content */}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene001;
```

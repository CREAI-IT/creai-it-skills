# Voiceover Guide — ElevenLabs + Remotion

Add AI voiceover to Remotion videos using ElevenLabs Text-to-Speech. This is an **optional add-on** — consult this guide when the user requests voiceover at any point in the workflow.

## Requirements

- `ELEVENLABS_API_KEY` environment variable must be set
- The generation script lives at: `scripts/voiceover_gen.mjs` (inside this skill directory)

Check the key exists before proceeding:
```bash
echo $ELEVENLABS_API_KEY | head -c 8
# Should print "sk_xxxxx..." — if empty, ask user to set it
```

## Voiceover Workflow

When the user requests voiceover (at any point — during planning, after scenes, or before render):

```
1. Generate voiceover script from plan.md (or user provides script)
2. Ask user to approve/edit script
3. Select voice + model
4. Run voiceover_gen.mjs per scene → MP3 files to public/assets/<video>/voiceover/
5. Get audio duration → adjust scene durationInFrames
6. Wire <Audio> components into scene files
7. Update Composition.tsx with new durations
```

### Step 1: Generate Script from plan.md

Read `plan.md` and extract one voiceover line per scene. The script should:
- Match the scene's narrative purpose (what information does the viewer need?)
- Be concise — voiceover SUPPORTS visuals, not competes
- Use natural speech rhythm (short sentences, breathing pauses with `...`)
- Match the video's tone (professional, casual, dramatic)

**Present the script to the user for approval before generating audio.**

Example format:
```markdown
## Voiceover Script

Scene 001 (5s): "The future of design is here."
Scene 002 (4s): "Built with precision... powered by AI."
Scene 003 (6s): "Introducing NeuralForge — enterprise ML infrastructure that scales."
Scene 004 (3s): "Get started today."
```

### Step 2: Voice Selection

Run `--list-voices` to see available voices:
```bash
node <skill-dir>/scripts/voiceover_gen.mjs --list-voices
```

#### Recommended Voices by Video Type

**English voices:**

| Video Type | Voice | ID | Why |
|---|---|---|---|
| **Tech/Product** | Sarah | `EXAVITQu4vr4xnSDxMaL` | Mature, reassuring, professional American female |
| **Corporate** | Adam | `pNInz6obpgDQGcFmaJgB` | Dominant, firm, authoritative American male |
| **Startup/Energetic** | Liam | `TX3LPaxmHKxFdv7VOQHJ` | Energetic social media creator, confident American male |
| **Narrative/Story** | George | `JBFqnCBsd6RMkjVDRZzb` | Warm, captivating storyteller, British male |
| **Casual/Friendly** | Roger | `CwhRBWXzGAHq8TQ4Fs17` | Laid-back, casual, classy American male |
| **Educational** | Alice | `Xb7hH8MSUJpSbSDYk0k2` | Clear, engaging educator, British female |
| **Luxury/Premium** | Lily | `pFZP5JQG7iQjIQuC4Bku` | Velvety actress, confident British female |
| **Neutral/Informative** | River | `SAz9YHcvj6GT2YYXdXww` | Relaxed, neutral, calm gender-neutral American |
| **Fun/Playful** | Jessica | `cgSgspJ2msm6clMCkdW9` | Playful, bright, warm American female |
| **Wise/Authoritative** | Bill | `pqHfZKP75CvOlQylNhV4` | Wise, mature, balanced, crisp American male |

**Korean voices:**

| Video Type | Voice | ID | Why |
|---|---|---|---|
| **Narrative/Calm** | Selly Han | `ETPP7D0aZVdEj12Aa7ho` | Calm, storytelling, professional Korean female |
| **Conversational** | Rumi Oh | `sf8Bpb1IU97NI9BHSMRf` | Soft, conversational, Seoul accent Korean female |
| **Social/Young** | JISOO | `iWLjl1zCuqXRkW6494ve` | Social media, young, standard Korean female |
| **Meditation/Calm** | Chungman | `8MwPLtBplylvbrksiBOC` | Meditative, calm, Seoul accent Korean female |

For more voices, browse: `--list-voices` or ask user for preference.

### Step 3: Model Selection

| Model | Quality | Speed | Cost | Best For |
|---|---|---|---|---|
| `eleven_v3` | Highest | Slow | 1x | Final renders, premium quality, 70+ languages |
| `eleven_multilingual_v2` | High | Medium | 1x | **Default choice.** Balanced, 29 languages |
| `eleven_flash_v2_5` | Good | Fastest | 0.5x | Drafts, iteration, budget-conscious |
| `eleven_turbo_v2_5` | Good | Fast | 0.5x | Non-English content, good balance |

**Recommendation:** Use `eleven_flash_v2_5` during iteration, switch to `eleven_multilingual_v2` or `eleven_v3` for final render.

### Step 4: Voice Settings

| Setting | Range | Default | Effect |
|---|---|---|---|
| `stability` | 0-1 | 0.50 | Higher = more consistent, lower = more emotional range |
| `similarity-boost` | 0-1 | 0.75 | Higher = closer to original voice, may distort at extremes |
| `style` | 0-1 | 0 | Higher = more expressive, costs more computation |
| `speed` | 0.5-2.0 | 1.0 | Speech rate. 0.9 for dramatic, 1.1 for energetic |

**Presets by video tone:**

| Tone | stability | similarity-boost | style | speed |
|---|---|---|---|---|
| **Professional** | 0.65 | 0.75 | 0 | 1.0 |
| **Dramatic/Cinematic** | 0.35 | 0.80 | 0.3 | 0.9 |
| **Energetic/Startup** | 0.45 | 0.70 | 0.2 | 1.1 |
| **Calm/Narrative** | 0.60 | 0.75 | 0.1 | 0.95 |
| **Casual/Friendly** | 0.40 | 0.70 | 0.15 | 1.0 |

### Step 5: Generate Audio

Run the script per scene. The script path is relative to the skill directory:

```bash
SKILL_DIR="/Users/gangjimin/.claude/skills/remotion-video-creator"

# Scene 001
node "$SKILL_DIR/scripts/voiceover_gen.mjs" \
  --text "The future of design is here." \
  --voice "21m00Tcm4TlvDq8ikWAM" \
  --model "eleven_multilingual_v2" \
  --stability 0.50 \
  --similarity-boost 0.75 \
  --output "./public/assets/<video-name>/voiceover/vo-scene001.mp3"

# Scene 002
node "$SKILL_DIR/scripts/voiceover_gen.mjs" \
  --text "Built with precision... powered by AI." \
  --voice "21m00Tcm4TlvDq8ikWAM" \
  --model "eleven_multilingual_v2" \
  --output "./public/assets/<video-name>/voiceover/vo-scene002.mp3"
```

The script outputs estimated duration and frame count. **Use these to adjust scene timing.**

### Step 6: Wire Audio into Scenes

**Option A: Audio in each scene file** (recommended for per-scene voiceover)

```tsx
import { AbsoluteFill } from 'remotion';
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';

const Scene001: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Audio layer */}
      <Audio
        src={staticFile('assets/my-video/voiceover/vo-scene001.mp3')}
        volume={1}
      />

      {/* Visual layers (existing scene code) */}
      {/* ... */}
    </AbsoluteFill>
  );
};
```

**Option B: Audio in parent Composition** (for a single full-video voiceover)

```tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';

const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Full video voiceover */}
      <Audio src={staticFile('assets/my-video/voiceover/full-vo.mp3')} />

      {/* Scenes */}
      <TransitionSeries>
        {/* ... scenes ... */}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

**Volume control per frame:**

```tsx
<Audio
  src={staticFile('assets/my-video/voiceover/vo-scene001.mp3')}
  volume={(f) =>
    // Fade in over first 10 frames, fade out over last 10
    interpolate(f, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
/>
```

### Step 7: Adjust Scene Timing

The voiceover duration should drive scene length. After generating audio:

1. Read the estimated duration from the script output (e.g., `Est. duration: 3.45s`)
2. Convert to frames: `Math.ceil(durationSeconds * fps)` + padding (add 15-30 frames for breathing room)
3. Update `durationInFrames` in the scene's `<TransitionSeries.Sequence>`
4. Update total `durationInFrames` in `Root.tsx` composition registration

```
Audio duration: 3.45s at 30fps = 104 frames
Add padding: 104 + 20 = 124 frames
Scene durationInFrames = 124
```

## Audio File Organization

```
public/assets/<video-name>/
├── voiceover/
│   ├── vo-scene001.mp3
│   ├── vo-scene002.mp3
│   ├── vo-scene003.mp3
│   └── vo-scene004.mp3
├── logo.png
└── ...
```

## Important Notes

- **Install @remotion/media** if not already present: `npx remotion add @remotion/media`
- Audio format: Use `mp3_44100_128` (default) for compatibility. Remotion handles MP3 natively.
- **Sync check:** After adding audio, do a quick preview (`npx remotion studio`) and verify voice aligns with visual beats.
- **Re-generation:** If timing feels off, adjust `speed` parameter (0.9 slower, 1.1 faster) rather than changing scene timing.
- **Multi-language:** Set `--language` flag for non-English content (e.g., `--language ko` for Korean).
- **Cost awareness:** Each generation costs characters. Use `eleven_flash_v2_5` for drafts, premium models for finals.

## Korean Voiceover

ElevenLabs supports Korean. For Korean narration:
```bash
node "$SKILL_DIR/scripts/voiceover_gen.mjs" \
  --text "디자인의 미래가 여기 있습니다." \
  --voice "21m00Tcm4TlvDq8ikWAM" \
  --model "eleven_multilingual_v2" \
  --language "ko" \
  --output "./public/assets/my-video/voiceover/vo-scene001.mp3"
```

Best models for Korean: `eleven_multilingual_v2` or `eleven_v3` (both have strong Korean support).

## Troubleshooting

| Problem | Fix |
|---|---|
| `ELEVENLABS_API_KEY not set` | `export ELEVENLABS_API_KEY="sk_..."` in terminal or `~/.zshrc` |
| Audio too fast/slow | Adjust `--speed` (0.8-1.2 range) |
| Voice sounds robotic | Lower `--stability` to 0.35-0.45, increase `--style` to 0.1-0.2 |
| Audio cuts off | ElevenLabs text limit per call: 5000 chars (v3), 10000 (multilingual v2) |
| No sound in preview | Ensure `@remotion/media` is installed, check `staticFile()` path is correct |
| Audio out of sync | Use 48kHz CBR audio for videos >5min. Check `durationInFrames` matches audio |

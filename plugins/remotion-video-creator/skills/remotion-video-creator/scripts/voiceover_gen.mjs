#!/usr/bin/env node

/**
 * ElevenLabs Voiceover Generator for Remotion Videos
 *
 * Usage:
 *   node voiceover_gen.mjs --text "Hello world" --output ./public/assets/video/vo-scene001.mp3
 *   node voiceover_gen.mjs --text "Hello world" --voice "21m00Tcm4TlvDq8ikWAM" --model "eleven_multilingual_v2"
 *   node voiceover_gen.mjs --list-voices
 *   node voiceover_gen.mjs --voice-info "21m00Tcm4TlvDq8ikWAM"
 *
 * Environment:
 *   ELEVENLABS_API_KEY - Required. Set in shell or .env
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const API_BASE = 'https://api.elevenlabs.io/v1';

// --- Argument parsing ---
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return args[idx + 1];
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error('ERROR: ELEVENLABS_API_KEY environment variable is not set.');
  console.error('');
  console.error('Set it in your shell:');
  console.error('  export ELEVENLABS_API_KEY="your-key-here"');
  console.error('');
  console.error('Or add to ~/.zshrc for persistence.');
  process.exit(1);
}

const headers = {
  'xi-api-key': API_KEY,
  'Content-Type': 'application/json',
};

// --- List voices ---
if (hasFlag('list-voices')) {
  const res = await fetch(`${API_BASE}/voices`, { headers });
  if (!res.ok) {
    console.error(`Failed to list voices: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log('\n=== Available Voices ===\n');
  console.log(
    'ID'.padEnd(26) +
      'Name'.padEnd(20) +
      'Category'.padEnd(14) +
      'Labels'
  );
  console.log('-'.repeat(80));
  for (const v of data.voices) {
    const labels = v.labels
      ? Object.entries(v.labels)
          .map(([k, val]) => `${k}:${val}`)
          .join(', ')
      : '';
    console.log(
      v.voice_id.padEnd(26) +
        (v.name || '').padEnd(20) +
        (v.category || '').padEnd(14) +
        labels
    );
  }
  console.log(`\nTotal: ${data.voices.length} voices`);
  process.exit(0);
}

// --- Voice info ---
if (hasFlag('voice-info')) {
  const voiceId = getArg('voice-info');
  if (!voiceId) {
    console.error('Usage: --voice-info <voice_id>');
    process.exit(1);
  }
  const res = await fetch(`${API_BASE}/voices/${voiceId}`, { headers });
  if (!res.ok) {
    console.error(`Failed to get voice: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const voice = await res.json();
  console.log('\n=== Voice Details ===\n');
  console.log(`Name:     ${voice.name}`);
  console.log(`ID:       ${voice.voice_id}`);
  console.log(`Category: ${voice.category}`);
  if (voice.labels) {
    console.log(
      `Labels:   ${Object.entries(voice.labels)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')}`
    );
  }
  if (voice.description) {
    console.log(`Desc:     ${voice.description}`);
  }
  if (voice.settings) {
    console.log(`\nDefault Settings:`);
    console.log(`  stability:        ${voice.settings.stability}`);
    console.log(`  similarity_boost: ${voice.settings.similarity_boost}`);
    console.log(`  style:            ${voice.settings.style ?? 0}`);
  }
  process.exit(0);
}

// --- Generate speech ---
const text = getArg('text');
const outputPath = getArg('output') || './voiceover.mp3';
const voiceId = getArg('voice') || '21m00Tcm4TlvDq8ikWAM'; // Rachel (default)
const modelId = getArg('model') || 'eleven_multilingual_v2';
const stability = parseFloat(getArg('stability') || '0.50');
const similarityBoost = parseFloat(getArg('similarity-boost') || '0.75');
const style = parseFloat(getArg('style') || '0');
const speed = parseFloat(getArg('speed') || '1.0');
const outputFormat = getArg('format') || 'mp3_44100_128';
const language = getArg('language') || undefined;

if (!text) {
  console.error('Usage: node voiceover_gen.mjs --text "Your script" [options]');
  console.error('');
  console.error('Required:');
  console.error('  --text "..."            Text to convert to speech');
  console.error('');
  console.error('Options:');
  console.error(
    '  --output <path>         Output file path (default: ./voiceover.mp3)'
  );
  console.error(
    '  --voice <id>            Voice ID (default: Rachel 21m00Tcm4TlvDq8ikWAM)'
  );
  console.error(
    '  --model <id>            Model ID (default: eleven_multilingual_v2)'
  );
  console.error(
    '  --stability <0-1>       Voice stability (default: 0.50)'
  );
  console.error(
    '  --similarity-boost <0-1> Similarity boost (default: 0.75)'
  );
  console.error(
    '  --style <0-1>           Style exaggeration (default: 0)'
  );
  console.error('  --speed <float>         Speech speed (default: 1.0)');
  console.error(
    '  --format <fmt>          Output format (default: mp3_44100_128)'
  );
  console.error(
    '  --language <code>       ISO 639-1 language code (e.g., en, ko, es)'
  );
  console.error('');
  console.error('Other commands:');
  console.error('  --list-voices           List all available voices');
  console.error('  --voice-info <id>       Get details for a specific voice');
  console.error('');
  console.error('Models:');
  console.error(
    '  eleven_v3               Highest quality, 70+ languages, most expressive'
  );
  console.error(
    '  eleven_multilingual_v2  Balanced quality, 29 languages (default)'
  );
  console.error(
    '  eleven_flash_v2_5       Fastest, 32 languages, cheapest'
  );
  console.error(
    '  eleven_turbo_v2_5       Mid-speed, 32 languages, good value'
  );
  process.exit(1);
}

// Ensure output directory exists
mkdirSync(dirname(resolve(outputPath)), { recursive: true });

console.log(`\nGenerating voiceover...`);
console.log(`  Voice:  ${voiceId}`);
console.log(`  Model:  ${modelId}`);
console.log(`  Format: ${outputFormat}`);
console.log(`  Text:   "${text.length > 80 ? text.slice(0, 80) + '...' : text}"`);
console.log(`  Output: ${outputPath}`);

const body = {
  text,
  model_id: modelId,
  voice_settings: {
    stability,
    similarity_boost: similarityBoost,
    style,
    speed,
  },
};

if (language) {
  body.language_code = language;
}

const url = `${API_BASE}/text-to-speech/${voiceId}?output_format=${outputFormat}`;

const res = await fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(body),
});

if (!res.ok) {
  const errText = await res.text();
  console.error(`\nERROR: ElevenLabs API returned ${res.status}`);
  try {
    const errJson = JSON.parse(errText);
    console.error(JSON.stringify(errJson, null, 2));
  } catch {
    console.error(errText);
  }
  process.exit(1);
}

const charCount = res.headers.get('x-character-count');
const audioBuffer = Buffer.from(await res.arrayBuffer());
writeFileSync(resolve(outputPath), audioBuffer);

// Estimate duration from MP3 file size (128kbps = 16000 bytes/sec)
const fileSizeBytes = audioBuffer.length;
let estimatedDurationSec;
if (outputFormat.startsWith('mp3')) {
  const bitrateKbps = parseInt(outputFormat.split('_')[2]) || 128;
  const bytesPerSec = (bitrateKbps * 1000) / 8;
  estimatedDurationSec = fileSizeBytes / bytesPerSec;
} else {
  // WAV 44100 16-bit mono: 88200 bytes/sec
  estimatedDurationSec = fileSizeBytes / 88200;
}

const durationFrames30 = Math.ceil(estimatedDurationSec * 30);
const durationFrames60 = Math.ceil(estimatedDurationSec * 60);

console.log(`\nSuccess!`);
console.log(`  File size:     ${(fileSizeBytes / 1024).toFixed(1)} KB`);
console.log(`  Characters:    ${charCount || 'N/A'}`);
console.log(
  `  Est. duration: ${estimatedDurationSec.toFixed(2)}s`
);
console.log(`  Frames @30fps: ${durationFrames30}`);
console.log(`  Frames @60fps: ${durationFrames60}`);
console.log(
  `\nUse in Remotion:\n  <Audio src={staticFile('${outputPath.replace(/.*public\//, '')}')} />`
);

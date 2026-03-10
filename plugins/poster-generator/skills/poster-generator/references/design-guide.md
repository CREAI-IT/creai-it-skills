# Poster Design Guide

## Aspect Ratio Reference

| Ratio | Canvas (px) | Orientation | Use Cases |
|-------|------------|-------------|-----------|
| 9:16 | 1080 x 1920 | Vertical | Stories, phone wallpapers, vertical banners, event posters |
| 4:5 | 1080 x 1350 | Portrait | Instagram posts, portrait flyers, book covers |
| 1:1 | 1080 x 1080 | Square | Social media posts, album covers, profile banners |
| 16:9 | 1920 x 1080 | Landscape | Desktop wallpapers, YouTube thumbnails, banners |

## Poster Type Examples

### 1. Event Poster (9:16)

```html
<div class="poster poster-padded-lg poster-spread" style="background: #0a0a1a; color: #fff;">
    <div>
        <div class="overline" style="color: var(--accent);">MARCH 2025</div>
    </div>
    <div style="flex: 1; display: flex; align-items: center;">
        <h1 class="headline" style="max-width: 900px;">Design<br>Conference<br>2025</h1>
    </div>
    <div class="flex-col gap-md">
        <div class="accent-line"></div>
        <p style="font-size: 24px; opacity: 0.7;">March 15–17 &middot; San Francisco, CA</p>
        <p class="label" style="color: var(--accent);">Register Now &rarr;</p>
    </div>
</div>
```

### 2. Quote / Typography Poster (4:5)

```html
<div class="poster poster-padded poster-centered" style="background: #faf9f6; color: #1a1a1a;">
    <div class="flex-col gap-lg items-center">
        <div class="overline" style="color: var(--accent); font-size: 14px;">WORDS TO LIVE BY</div>
        <blockquote style="border: none; padding: 0; text-align: center; max-width: 800px; font-size: 52px;">
            "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <p class="caption" style="margin-top: 16px;">— Steve Jobs</p>
    </div>
</div>
```

### 3. Product Showcase (1:1)

```html
<div class="poster poster-padded poster-centered" style="background: #f5f5f5; color: #1a1a1a;">
    <div class="flex-col gap-lg items-center" style="width: 100%;">
        <div class="overline" style="color: var(--accent);">NEW RELEASE</div>
        <!-- Product visual area -->
        <div style="width: 600px; height: 600px; background: #fff; border-radius: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 60px rgba(0,0,0,0.08);">
            <span style="font-size: 200px;">🎧</span>
        </div>
        <h2 style="font-size: 48px; margin-top: 16px;">Product Name</h2>
        <p class="subhead" style="max-width: 700px;">A brief tagline that captures the essence of the product in one line.</p>
    </div>
</div>
```

### 4. Data / Stats Poster (16:9)

```html
<div class="poster poster-padded" style="background: #0f0f1a; color: #fff;">
    <div class="overline" style="color: var(--accent);">ANNUAL REPORT 2024</div>
    <h2 style="margin-top: 24px;">Key Metrics</h2>
    <div class="flex-row gap-xl items-end" style="flex: 1; margin-top: 48px;">
        <div class="flex-1 text-center">
            <div class="big-number" style="color: var(--accent); font-size: 120px;">2.4M</div>
            <p style="font-size: 22px; opacity: 0.5; margin-top: 12px;">Active Users</p>
        </div>
        <div class="flex-1 text-center">
            <div class="big-number" style="color: var(--accent); font-size: 120px;">98%</div>
            <p style="font-size: 22px; opacity: 0.5; margin-top: 12px;">Satisfaction</p>
        </div>
        <div class="flex-1 text-center">
            <div class="big-number" style="color: var(--accent); font-size: 120px;">4.9</div>
            <p style="font-size: 22px; opacity: 0.5; margin-top: 12px;">App Rating</p>
        </div>
    </div>
</div>
```

### 5. Announcement / CTA Poster (9:16)

```html
<div class="poster poster-padded-lg" style="background: var(--accent); color: #fff;">
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="overline" style="opacity: 0.7;">LAUNCHING SOON</div>
        <h1 style="font-size: 88px; margin-top: 24px; max-width: 900px;">
            Something extraordinary is coming
        </h1>
        <p style="font-size: 28px; opacity: 0.85; margin-top: 32px; max-width: 750px;">
            Sign up to be the first to know when we launch.
        </p>
    </div>
    <div style="padding: 40px 0;">
        <div style="display: inline-block; padding: 20px 48px; background: #fff; color: #1a1a1a; border-radius: 12px; font-size: 22px; font-weight: 700;">
            Join the Waitlist
        </div>
    </div>
</div>
```

### 6. Photo Overlay Poster (any ratio)

```html
<div class="poster" style="background: #000;">
    <!-- Background image -->
    <div class="overlay" style="background: url('image.jpg') center/cover;"></div>
    <div class="overlay" style="background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8));"></div>
    <!-- Content over image -->
    <div class="poster-padded-lg flex-col justify-end h-full" style="position: relative; z-index: 2; color: #fff;">
        <div class="overline" style="color: var(--accent);">CATEGORY</div>
        <h1 style="font-size: 72px; margin-top: 16px; max-width: 800px;">
            Headline Over Photography
        </h1>
        <p style="font-size: 24px; opacity: 0.8; margin-top: 16px;">
            Supporting text with more context about the image.
        </p>
    </div>
</div>
```

---

## Design Principles for Posters

### 1. Single Focus
Every poster has ONE main message. If you need two messages, make two posters.

### 2. Visual Hierarchy
Reading order must be instant and obvious:
- **Primary**: The one thing you see first (headline, image, or big number)
- **Secondary**: Supporting context (subhead, date, location)
- **Tertiary**: Fine print (credits, URL, legal)

### 3. Typography Scale
Posters need more dramatic scale contrast than slides:
- Headlines: 80-200px depending on word count
- Body: 24-32px
- Captions/labels: 14-20px
- The ratio between largest and smallest text should be at least 5:1

### 4. Whitespace
More whitespace than you think you need:
- 60-120px padding from edges (scale with canvas size)
- Don't fill every corner — emptiness creates focus
- Group related elements, separate unrelated ones

### 5. Color
- **3-color maximum**: background, text, accent
- High contrast is essential — posters are viewed at a glance
- Dark posters: dark bg, white text, vibrant accent
- Light posters: white/cream bg, near-black text, bold accent
- Define accent as CSS variable: `--accent: #color;`

### 6. Aspect Ratio Considerations

**9:16 (Vertical)**: Stack content vertically. Use the full height — spread content from top to bottom. Headlines can be very large since there's vertical room.

**4:5 (Portrait)**: Similar to vertical but less extreme. Good for centered compositions. Less vertical drama, more balanced.

**1:1 (Square)**: Center everything. Symmetry works well. Be very economical with text — less space than you think.

**16:9 (Landscape)**: Horizontal layouts work. Split into columns. Big numbers side by side. Think "widescreen billboard."

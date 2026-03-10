# Dynamic OG Image Generation

Load when project lacks dynamic OG images or has social sharing features.

## Why Dynamic OG Images Matter

- OG images directly affect click-through rates on social media and messaging apps
- Static default images for dynamic content (results, products, blog posts) look generic
- KakaoTalk (49M+ users in Korea) displays OG previews prominently

## Next.js File Convention: `opengraph-image.tsx`

Next.js auto-discovers `opengraph-image.tsx` files and generates OG images at build/request time.

### Basic Pattern

```tsx
// app/result/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const alt = 'Result Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>  // Promise in Next.js 16
}) {
  const { id } = await params;
  const data = await getResult(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7, marginBottom: 16 }}>
          Brand Name
        </div>
        <div style={{
          fontSize: 48,
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: 900,
          padding: '0 40px',
        }}>
          {data.title}
        </div>
        <div style={{
          fontSize: 64,
          fontWeight: 'bold',
          marginTop: 32,
          color: '#10B981',
        }}>
          {data.score}/100
        </div>
      </div>
    ),
    { ...size }
  );
}
```

### Twitter Image (Optional)

```tsx
// app/result/[id]/twitter-image.tsx
// Same pattern as opengraph-image.tsx
// Twitter uses different image ratios (2:1 for summary_large_image)
export const size = { width: 1200, height: 600 };
```

### Static Fallback for Root Layout

```tsx
// app/opengraph-image.tsx (static for homepage)
import { ImageResponse } from 'next/og';

export const alt = 'Brand Name';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: 'white',
        fontSize: 72,
        fontWeight: 'bold',
      }}>
        Brand Name
      </div>
    ),
    { ...size }
  );
}
```

## Korean Font Handling

`ImageResponse` supports loading custom fonts. For Korean content:

```tsx
export default async function Image({ params }) {
  // Load Korean font
  const notoSansKR = await fetch(
    new URL('../../assets/NotoSansKR-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{ fontFamily: 'Noto Sans KR' }}>
        <div style={{ fontSize: 48 }}>한국어 타이틀</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: notoSansKR,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
```

**Note**: Font files must be available at build time. Place in `app/assets/` or `public/fonts/`.

## ImageResponse Limitations

- Only supports a subset of CSS (flexbox, no grid)
- No `position: absolute` with percentage values
- No CSS animations
- Images must be absolute URLs or imported as data URLs
- Max 500KB output recommended

## Debugging & Validation

| Tool | URL | Purpose |
|------|-----|---------|
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | Test OG tags + image rendering |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | Test Twitter card rendering |
| LinkedIn Post Inspector | https://www.linkedin.com/post-inspector/ | Test LinkedIn previews |
| OpenGraph.xyz | https://www.opengraph.xyz/ | Quick preview across platforms |

### Local Testing

Visit `http://localhost:3000/result/[id]/opengraph-image` directly in browser to see the generated image.

## Checklist

- [ ] Root layout has static `opengraph-image.tsx`
- [ ] Dynamic routes have dynamic `opengraph-image.tsx`
- [ ] Image dimensions are 1200x630 (OG) or 1200x600 (Twitter)
- [ ] Korean pages load Korean font (Noto Sans KR or similar)
- [ ] Alt text is set via `export const alt`
- [ ] Content type is `image/png`
- [ ] Images tested in Facebook Sharing Debugger
- [ ] KakaoTalk preview verified (if Korean market)

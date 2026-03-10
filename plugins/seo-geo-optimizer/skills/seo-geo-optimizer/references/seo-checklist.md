# SEO Audit Checklist

## Table of Contents

- Meta & Head Tags
- Structured Data (JSON-LD)
- Crawlability & Indexing
- Performance & Core Web Vitals
- i18n (Korean + English)

## Meta & Head Tags

### Critical

| Check | What to look for | Fix |
|-------|-----------------|-----|
| Title tag | Every page has unique `<title>` 50-60 chars | Add via Next.js `metadata.title` or `<Helmet>` |
| Meta description | Every page, 150-160 chars, includes target keyword | Add via `metadata.description` |
| Canonical URL | Every page has `<link rel="canonical">` | Set `metadata.metadataBase` + `alternates.canonical` |
| Viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` | Usually default in Next.js |
| Favicon | Multiple sizes: 16x16, 32x32, apple-touch-icon 180x180 | Add to `app/favicon.ico` + `metadata.icons` |
| Language | `<html lang="en">` or `<html lang="ko">` set correctly | Set in root layout |

### Warning

| Check | What to look for | Fix |
|-------|-----------------|-----|
| OG tags | `og:title`, `og:description`, `og:image` (1200x630), `og:url`, `og:type` | Add via `metadata.openGraph` |
| Twitter cards | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | Add via `metadata.twitter` |
| Title template | Consistent format like `%s | Brand Name` | Use `metadata.title.template` in root layout |
| Duplicate titles | No two pages share the same title | Audit all page metadata exports |

### Next.js Metadata Pattern

```tsx
// app/layout.tsx - Root layout
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Brand Name',
    template: '%s | Brand Name',
  },
  description: 'Default site description under 160 chars',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
    siteName: 'Brand Name',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ko': '/ko',
    },
  },
};
```

```tsx
// app/[slug]/page.tsx - Dynamic page
export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug);
  return {
    title: page.title,
    description: page.excerpt,
    openGraph: {
      title: page.title,
      description: page.excerpt,
      images: [{ url: page.ogImage }],
    },
    alternates: {
      canonical: `/${params.slug}`,
    },
  };
}
```

### React (non-Next.js) Pattern

```tsx
// Using react-helmet-async
import { Helmet } from 'react-helmet-async';

function SEOHead({ title, description, canonical, ogImage }) {
  return (
    <Helmet>
      <title>{title} | Brand Name</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
```

## Structured Data (JSON-LD)

### Priority Schema Types

| Type | Use when | Key properties |
|------|----------|---------------|
| `Organization` | Homepage / about page | name, url, logo, sameAs, contactPoint |
| `WebSite` | Homepage | name, url, potentialAction (SearchAction) |
| `Article` | Blog posts, news | headline, author, datePublished, dateModified, image |
| `FAQPage` | FAQ sections | mainEntity[].name, mainEntity[].acceptedAnswer |
| `HowTo` | Tutorials, guides | name, step[].name, step[].text |
| `Product` | Product pages | name, description, offers, aggregateRating |
| `BreadcrumbList` | All pages with breadcrumbs | itemListElement[].name, .item |
| `LocalBusiness` | Local business pages | name, address, telephone, openingHours, geo |

### JSON-LD Component Pattern (Next.js)

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in page
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  author: { '@type': 'Person', name: post.author },
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  image: post.coverImage,
  publisher: {
    '@type': 'Organization',
    name: 'Brand Name',
    logo: { '@type': 'ImageObject', url: 'https://example.com/logo.png' },
  },
}} />
```

### FAQPage Schema (Critical for GEO)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [topic]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A clear, self-contained answer with data..."
      }
    }
  ]
}
```

### Validation

- Test with Google Rich Results Test: https://search.google.com/test/rich-results
- Validate JSON-LD syntax: https://validator.schema.org/
- Check for required properties per type at schema.org

## Crawlability & Indexing

### robots.txt (Next.js)

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      // AI search crawlers - ALLOW explicitly
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

### sitemap.xml (Next.js)

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: { ko: 'https://example.com/ko', en: 'https://example.com/en' },
      },
    },
    ...pages.map((page) => ({
      url: `https://example.com/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
```

### Meta Robots

| Directive | When to use |
|-----------|-------------|
| `index, follow` | Default for public pages (don't need to set explicitly) |
| `noindex, follow` | Internal pages (login, dashboard) - still follow links |
| `noindex, nofollow` | Completely private pages |

```tsx
// Next.js per-page
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};
```

## Performance & Core Web Vitals

### Image Optimization

| Check | Fix |
|-------|-----|
| Using `<img>` instead of `next/image` | Replace with `<Image>` component |
| Missing width/height (CLS) | Add explicit dimensions or use `fill` prop |
| No lazy loading for below-fold images | Default in `next/image`; add `loading="lazy"` for plain `<img>` |
| Missing alt text | Add descriptive alt text for every image |
| No WebP/AVIF | `next/image` auto-converts; for plain sites use `<picture>` |
| Hero image not prioritized | Add `priority` prop to above-fold `<Image>` |

### Font Optimization

```tsx
// Next.js - use next/font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// For Korean
import { Noto_Sans_KR } from 'next/font/google';
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'] });
```

### Bundle Size

| Check | Fix |
|-------|-----|
| Large client bundles | Move components to Server Components (default in App Router) |
| Unused dependencies | Run `npx depcheck` |
| No dynamic imports for heavy components | Use `next/dynamic` or `React.lazy` |

## i18n (Korean + English)

### hreflang Tags

```tsx
// In metadata
alternates: {
  canonical: 'https://example.com/page',
  languages: {
    'en': 'https://example.com/en/page',
    'ko': 'https://example.com/ko/page',
    'x-default': 'https://example.com/page',
  },
}
```

### Naver SEO

| Check | Fix |
|-------|-----|
| Naver site verification | Add `<meta name="naver-site-verification" content="...">` |
| Naver Search Advisor registered | Register at https://searchadvisor.naver.com/ |
| Korean meta description | Separate Korean meta description, 80-120 chars |
| Korean OG tags | Separate `og:locale` for `ko_KR` |

### Korean-Specific Patterns

```tsx
// Root layout metadata for Korean
export const metadata: Metadata = {
  verification: {
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
  },
};
```

- Use Korean-language structured data (`"inLanguage": "ko"`) for Korean pages
- Include both Korean and English site names in Organization schema
- Korean title tags: keep under 30 characters (shorter than English)
- Korean meta descriptions: 80-120 characters optimal

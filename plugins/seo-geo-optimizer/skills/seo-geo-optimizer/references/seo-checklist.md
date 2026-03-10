# SEO Audit Checklist

## Table of Contents

- Meta & Head Tags
- Structured Data (JSON-LD)
- E-E-A-T Signals
- Crawlability & Indexing
- Performance & Core Web Vitals
- Internal Linking
- i18n (Korean + English)

## Meta & Head Tags

### Critical

| Check | What to look for | Fix |
|-------|-----------------|-----|
| Title tag | Every page has unique `<title>` 50-60 chars (KO: 40 chars) | `metadata.title` or `<Helmet>` |
| Meta description | Every page, 150-160 chars (KO: 70-80 chars), includes target keyword | `metadata.description` |
| Canonical URL | Every page has `<link rel="canonical">` — self-referencing | `metadata.metadataBase` + `alternates.canonical` |
| Viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` | Usually default in Next.js |
| Favicon | 16x16, 32x32, apple-touch-icon 180x180 | `app/favicon.ico` + `metadata.icons` |
| Language | `<html lang="en">` or `<html lang="ko">` set correctly | Set in root layout |

### Warning

| Check | What to look for | Fix |
|-------|-----------------|-----|
| OG tags | `og:title`, `og:description`, `og:image` (1200x630), `og:url`, `og:type` | `metadata.openGraph` |
| Twitter cards | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | `metadata.twitter` |
| Title template | Consistent format like `%s \| Brand Name` | `metadata.title.template` in root layout |
| Duplicate titles | No two pages share the same title | Audit all page metadata exports |
| Dynamic OG images | Result/product pages should have dynamic OG images | See `references/dynamic-og-images.md` |

### Next.js App Router Pattern (v14-16)

```tsx
// app/layout.tsx — Root layout
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

**Dynamic metadata (Next.js 16 — params is Promise):**

```tsx
// app/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;  // Must await in Next.js 16
  const page = await getPage(slug);

  return {
    title: page.title,
    description: page.excerpt,
    openGraph: {
      title: page.title,
      description: page.excerpt,
      images: [{ url: page.ogImage }],
    },
    alternates: {
      canonical: `/${slug}`,
    },
    // Conditionally noindex incomplete content
    ...(page.status !== 'PUBLISHED' && {
      robots: { index: false, follow: false },
    }),
  };
}
```

### React (non-Next.js) Pattern

```tsx
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

| Type | Use when | Key properties | GEO Impact |
|------|----------|---------------|------------|
| `Organization` | Homepage / about page | name, url, logo, sameAs, contactPoint | High (brand validation) |
| `WebSite` | Homepage | name, url, potentialAction (SearchAction) | Medium |
| `Article` | Blog posts, content pages | headline, author, datePublished, dateModified, image | +22-25% citation |
| `FAQPage` | FAQ sections | mainEntity[].name, mainEntity[].acceptedAnswer | **+28% citation, 3.2x AI Overview** |
| `HowTo` | Tutorials, guides | name, step[].name, step[].text | +20-24% citation |
| `Product` | Product pages | name, description, offers, aggregateRating | +18% citation |
| `BreadcrumbList` | All pages with breadcrumbs | itemListElement[].name, .item | Medium |
| `Person` | Author pages | name, jobTitle, sameAs, knowsAbout | High (E-E-A-T) |
| `LocalBusiness` | Local business pages | name, address, telephone, openingHours, geo | High (local) |
| `SoftwareApplication` | SaaS/app pages | name, operatingSystem, offers, aggregateRating | Medium |

**Deprecated (Jan 2026):** CourseInfo, ClaimReview, EstimatedSalary, LearningVideo, SpecialAnnouncement, VehicleListing, PracticeProblem — keeping markup doesn't hurt, but no rich results.

### XSS-Safe JSON-LD Component (Next.js)

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

### Type-Safe with schema-dts

```tsx
import type { Article, WithContext } from 'schema-dts'; // npm install schema-dts

const articleLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  author: {
    '@type': 'Person',
    name: post.author.name,
    url: `https://example.com/authors/${post.author.slug}`,
    sameAs: [post.author.linkedIn, post.author.twitter].filter(Boolean),
  },
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,  // CRITICAL for freshness signals
  image: post.coverImage,
  publisher: {
    '@type': 'Organization',
    name: 'Brand Name',
    logo: { '@type': 'ImageObject', url: 'https://example.com/logo.png' },
  },
};
```

### Multi-Schema on Homepage

```tsx
// app/layout.tsx — Organization + WebSite on root
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brand Name',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  sameAs: ['https://twitter.com/brand', 'https://linkedin.com/company/brand'],
}} />
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brand Name',
  url: 'https://example.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://example.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}} />
```

### Validation

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

Not a direct ranking factor but heavily weighted by Google's quality raters and AI engines. December 2025 Core Update significantly increased its weight.

### Technical Implementation Checklist

| Signal | Implementation | Priority |
|--------|---------------|----------|
| Author bylines | Link to author profile page on every content page | Critical |
| Person schema | `@type: Person` with `name`, `jobTitle`, `sameAs`, `knowsAbout` | Critical |
| Publication dates | `datePublished` + `dateModified` in Article schema + visible on page | Critical |
| About page | Organization details, team, credentials | High |
| External profiles | `sameAs` links to LinkedIn, GitHub, Twitter in Person schema | High |
| Contact info | Visible contact/support information | Medium |
| Privacy policy | Link in footer to privacy policy page | Medium |
| HTTPS | All pages served over HTTPS | Critical |
| External citations | Reference authoritative sources in content | High (for GEO) |

### Author Component Pattern

```tsx
export function AuthorBox({ author }: { author: Author }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        url: author.profileUrl,
        jobTitle: author.title,
        worksFor: { '@type': 'Organization', name: 'Brand Name' },
        sameAs: [author.linkedIn, author.twitter, author.github].filter(Boolean),
        knowsAbout: author.expertise,
      }} />
      <div className="author-box">
        <img src={author.avatar} alt={author.name} />
        <div>
          <strong>{author.name}</strong>
          <p>{author.bio}</p>
          <a href={author.linkedIn} rel="noopener">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
```

## Crawlability & Indexing

### sitemap.ts (Next.js)

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPublishedPages();

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

**Large sitemaps (50K+ URLs):** Use `generateSitemaps()` to split automatically.

### Meta Robots

| Directive | When to use |
|-----------|-------------|
| `index, follow` | Default for public pages (don't set explicitly) |
| `noindex, follow` | Internal pages (login, dashboard) — still follow links |
| `noindex, nofollow` | Completely private pages |

## Performance & Core Web Vitals

### Current Thresholds (2025-2026)

| Metric | Good | Competitive | Poor |
|--------|------|-------------|------|
| **LCP** | < 2.5s | < 2.0s | > 4.0s |
| **INP** (replaced FID) | < 200ms | < 150ms | > 500ms |
| **CLS** | < 0.1 | < 0.05 | > 0.25 |

Sites with LCP > 3.0s: 23% more traffic loss. Poor INP: 31% more traffic loss.

### Image Optimization

| Check | Fix |
|-------|-----|
| Using `<img>` instead of `next/image` | Replace with `<Image>` component |
| Missing width/height (CLS) | Add explicit dimensions or use `fill` prop |
| Hero image not prioritized | Add `priority` prop + `placeholder="blur"` |
| No WebP/AVIF | `next/image` auto-converts |
| Missing alt text | Add descriptive alt text (Korean alt text for Korean pages) |

### INP Optimization

```tsx
// 1. Server Components by default (zero client JS)
// app/products/page.tsx — Server Component, no 'use client'
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}

// 2. startTransition for non-urgent state updates
'use client';
import { useTransition } from 'react';

function SearchFilter({ onFilter }: { onFilter: (q: string) => void }) {
  const [, startTransition] = useTransition();
  return (
    <input onChange={(e) => {
      startTransition(() => onFilter(e.target.value));
    }} />
  );
}

// 3. Lazy load heavy client components
import dynamic from 'next/dynamic';
const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div style={{ minHeight: 400 }}>Loading...</div>,
  ssr: false,
});

// 4. Third-party scripts after interaction
import Script from 'next/script';
<Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />
```

### Font Optimization

```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// Korean
import { Noto_Sans_KR } from 'next/font/google';
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'] });
```

## Internal Linking

### Guidelines

- **2-5 contextual links per 1,000 words**
- **3-click rule**: Every critical page reachable within 3 clicks from homepage
- Total page links under 150 to maintain link equity
- Contextual links in body > navigation/footer links
- Use descriptive, varied anchor text (not "click here" or exact-match keywords)

### Pillar-Cluster Model

```
Homepage
  |
  +-- /tools  (pillar)
  |     +-- /tools/vc-scorer  (cluster → links to /blog/how-to-pitch)
  |     +-- /tools/idea-scorer  (cluster → links to /blog/startup-ideas)
  |
  +-- /blog  (pillar)
  |     +-- /blog/how-to-pitch  (cluster → links to /tools/vc-scorer)
  |     +-- /blog/startup-ideas  (cluster → links to /tools/idea-scorer)
```

### Breadcrumb Component with Schema

```tsx
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `https://example.com${item.href}`,
        })),
      }} />
      <nav aria-label="Breadcrumb">
        <ol>
          {items.map((item, i) => (
            <li key={item.href}>
              {i < items.length - 1 ? (
                <a href={item.href}>{item.name}</a>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

## i18n (Korean + English)

### hreflang Tags

```tsx
alternates: {
  canonical: 'https://example.com/page',
  languages: {
    'en': 'https://example.com/en/page',
    'ko': 'https://example.com/ko/page',
    'x-default': 'https://example.com/page',
  },
}
```

### Naver SEO (see `references/naver-optimization.md` for full guide)

| Check | Fix |
|-------|-----|
| Naver site verification | `<meta name="naver-site-verification" content="...">` |
| Naver Search Advisor | Register at https://searchadvisor.naver.com/ |
| Korean meta description | 70-80 chars (mobile-safe: 40 chars) |
| Keywords meta tag | Naver still reads it: `metadata.keywords` |
| Korean OG locale | `og:locale` set to `ko_KR` |
| SSR for Yeti | Naver's Yeti bot has limited JS rendering |

### Korean-Specific Patterns

- Korean title tags: under 40 characters
- Korean structured data: `"inLanguage": "ko"` for Korean pages
- Include both Korean and English site names in Organization schema
- Korean `<html lang="ko">` attribute

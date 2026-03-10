# Technical SEO Reference

Load when issues found in redirects, 404s, pagination, or canonical conflicts.

## Redirects

### 301 vs 308 in Next.js

Next.js uses **308** (permanent) and **307** (temporary) by default — not 301/302. The reason: 301/302 historically changed POST to GET on redirect. 308/307 preserve the HTTP method.

**SEO impact**: Google treats 308 identically to 301. Link equity passes through both.

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,    // 308 by default
      },
      {
        source: '/legacy/:slug',
        destination: '/new/:slug',
        permanent: true,
        statusCode: 301,    // Force 301 if needed
      },
    ];
  },
};
```

### Middleware Redirects (Dynamic Logic)

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // www canonicalization
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = host.replace('www.', '');
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### Trailing Slash

```ts
// next.config.ts
const nextConfig: NextConfig = {
  trailingSlash: false, // /about/ → 308 → /about (default)
  // OR
  trailingSlash: true,  // /about → 308 → /about/
};
```

**Pick one and be consistent.** Having both accessible = duplicate content.

## 404 / Soft 404 Handling

### The Soft 404 Problem

A soft 404 occurs when a missing page returns HTTP 200 instead of 404. This wastes crawl budget and confuses Google.

### Critical: The Streaming Gotcha

Once Next.js starts streaming HTML, the HTTP status code is locked at 200. You **MUST** validate data and call `notFound()` BEFORE any JSX rendering.

```tsx
// app/result/[id]/page.tsx
import { notFound } from 'next/navigation';

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const session = await prisma.pitchSession.findUnique({ where: { id } });

  // CRITICAL: Call notFound() BEFORE any JSX
  // Do NOT put data fetching inside <Suspense> if absence = 404
  if (!session || session.status !== 'COMPLETED') {
    notFound();
  }

  return <div><h1>{session.ideaTitle}</h1></div>;
}
```

**FAIL pattern** (causes soft 404):
```tsx
// BAD: Data fetch inside Suspense — streaming starts before validation
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataFetcher /> {/* notFound() here = too late, already 200 */}
    </Suspense>
  );
}
```

### Per-Route Not-Found Pages

```tsx
// app/result/[id]/not-found.tsx
import Link from 'next/link';

export default function ResultNotFound() {
  return (
    <div>
      <h1>Evaluation Not Found</h1>
      <p>This evaluation does not exist or has not been completed yet.</p>
      <Link href="/">Start a New Evaluation</Link>
    </div>
  );
}
```

### Global Not-Found

```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <nav>
        <Link href="/">Homepage</Link>
        <Link href="/tools">Browse Tools</Link>
      </nav>
    </div>
  );
}
```

Next.js auto-adds `<meta name="robots" content="noindex" />` for 404 responses.

### Rules

1. Return true HTTP 404 (not 200)
2. Include helpful navigation (homepage, popular pages)
3. Keep branding consistent
4. Do NOT redirect all 404s to homepage (creates soft 404s at scale)
5. Validate data before Suspense boundaries

## Pagination SEO

### rel="next/prev" Is Deprecated

Google stopped using `rel="next"` and `rel="prev"` in 2019. However, Bing still uses them and they help accessibility. If already implemented, keep them.

### Self-Referencing Canonical (Critical)

Each paginated page gets its own canonical — NOT canonical to page 1.

```tsx
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNum = parseInt(page || '1', 10);

  return {
    title: pageNum > 1 ? `Blog - Page ${pageNum} | Brand` : 'Blog | Brand',
    alternates: {
      canonical: pageNum > 1
        ? `https://example.com/blog?page=${pageNum}`
        : 'https://example.com/blog',
    },
    // noindex deep pages (5+) to focus crawl budget
    ...(pageNum > 5 && {
      robots: { index: false, follow: true },
    }),
  };
}
```

### Crawlable Pagination Links

Use `<a href>` links — not JavaScript-only pagination:

```tsx
export function Pagination({ currentPage, totalPages, basePath }: Props) {
  return (
    <nav aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          rel="prev"
        >
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} rel="next">
          Next
        </Link>
      )}
    </nav>
  );
}
```

### Rules

1. Self-referencing canonical on EVERY paginated page
2. Do NOT canonical all pages to page 1 (hides content)
3. Include paginated URLs in sitemap
4. Use crawlable `<a>` links for navigation
5. For infinite scroll: provide fallback paginated structure (Googlebot may not trigger scroll)
6. Consider noindex for deep pages (5+) to focus crawl budget

## Canonical URL Conflicts

### Common Issues

| Issue | Fix |
|-------|-----|
| Both `/about` and `/about/` accessible | Set `trailingSlash` in next.config |
| `www.example.com` and `example.com` both live | Middleware redirect to canonical |
| Query params creating duplicates (`?sort=asc`) | Self-referencing canonical without query params |
| HTTP and HTTPS both accessible | Force HTTPS at infrastructure level |

### Next.js metadataBase

Set once in root layout — all relative canonical URLs resolve against it:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  alternates: { canonical: '/' }, // Resolves to https://example.com/
};
```

## SSG vs SSR vs ISR: SEO Impact

| Rendering | SEO Pros | SEO Cons | Best For |
|-----------|----------|----------|----------|
| **SSG** | Fastest TTFB, best CWV, fully crawlable | Stale content until rebuild | Marketing pages, docs, blogs |
| **SSR** | Always fresh, fully crawlable | Slower TTFB, server load | Dynamic content, user-specific pages |
| **ISR** | Balance of fresh + fast, fully crawlable | Stale during revalidation window | Product pages, frequently updated content |
| **CSR** | None | Googlebot may not render JS; Naver Yeti cannot | Never for SEO-critical pages |

**Rule**: Never use client-side rendering for pages that need to be indexed. Naver's Yeti bot has **limited JavaScript rendering** — SSR/SSG is mandatory for Korean market.

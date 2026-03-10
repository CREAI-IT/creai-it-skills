# Naver & Korean Market Optimization

Load this reference when Korean market is detected (Korean content, `/ko/` routes, `.co.kr` domain).

## Korean Search Market (2025)

Google surpassed Naver for the first time in September 2025 (~50% vs ~41%). **You must optimize for BOTH.**

| Demographic | Primary Platform |
|-------------|-----------------|
| 10s-20s | Google, YouTube |
| 30s | Naver (strongest loyalty) |
| 40s+ | Naver (established habits) |

**Priority order**: Naver (ecosystem) + Google Korea > Daum (register only) > Zum (ignore)

## Naver Search Algorithm

### C-Rank (Creator Rank)

Evaluates content creators (especially Naver Blog) across 4 dimensions:

| Signal | What It Measures |
|--------|-----------------|
| **Context** | Topic focus. Naver measures authority across 31 categories. Consistent niche writing > generalist |
| **Content** | Depth, accuracy, usefulness of individual posts |
| **Chain** | Engagement: visits, shares, interactions |
| **Creator** | Overall reputation and trustworthiness |

### D.I.A. (Deep Intent Analysis)

Goes beyond keyword matching to understand search intent. Signals: dwell time, shares, comments, relevance to underlying user need.

### P-Rank

Evaluates web pages (not blog posts): crawlability, metadata, structure, internal links, mobile usability, backlinks.

### Next N Search (2025-2026)

- **AuthGR**: LLM-based author credibility evaluation
- **QUMA-VL**: Vision-language model assessing text-image consistency
- **Neural Matching**: Semantic understanding beyond keywords
- Prioritizes **credibility over engagement**

## Naver Search Advisor Setup

### Step-by-Step

1. Create Naver account at [naver.com](https://naver.com)
2. Go to [searchadvisor.naver.com](https://searchadvisor.naver.com)
3. Register your site URL
4. Verify ownership (choose one):
   - HTML meta tag: `<meta name="naver-site-verification" content="YOUR_CODE" />`
   - HTML file upload to web root
   - DNS TXT record
5. Submit sitemap: Request > Submit Sitemap (UTF-8, <50K URLs, <10MB, **one sitemap per site**)
6. Configure robots.txt to allow Yeti bot
7. Request URL collection: Request > Web Page Collection (processes in ~1 day)

### Next.js Implementation

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  verification: {
    other: {
      'naver-site-verification': 'YOUR_VERIFICATION_CODE',
    },
  },
};
```

### Critical Differences from Google

- Naver does NOT auto-discover sites — you MUST register via Search Advisor
- Naver still reads `<meta name="keywords">` (unlike Google)
- **Only one sitemap per site** (not multiple)
- Yeti bot has **limited JavaScript rendering** — SSR/SSG is strongly recommended

## Naver AI Briefing (Cue: Successor)

Naver Cue: was discontinued March 2025. Replaced by **AI Briefing**, now in 20%+ of queries.

### Five AI Briefing Types

| Type | Source | Optimization |
|------|--------|-------------|
| Official/Multi-Source | Gov, institutions, Naver blogs | Authoritative content, clear structure |
| Short-Form (Shortents) | Naver Clip videos | Video content on Naver Clip |
| Places | Naver Places, Maps | Naver Place registration |
| Shopping | Naver Plus Store | SmartStore listing optimization |
| AI Shopping Guide | Plus Store items | Product detail completeness |

### AI Briefing Content Selection (3 Stages)

1. **Relevancy**: AiRSearch categorizes query (informational triggers Briefing)
2. **Discovery**: Prioritizes Naver internal services (blogs, cafes, Knowledge iN) over external sites
3. **Extraction**: HyperClovaX synthesizes answer from multiple sources

### Optimization for AI Briefing

- Direct answer in opening paragraph
- H2/H3 with FAQ-style questions matching search queries
- Lists, tables, numbered sequences
- JSON-LD FAQPage schema
- Multi-sentence meta descriptions
- Explicit publication/modification dates
- Include "2025 업데이트" or "2026 가이드" for freshness

## Korean Content Specifications

### Meta Tag Lengths

| Element | Naver Optimal | Google Korea | Mobile Safe |
|---------|--------------|-------------|------------|
| Title | **40 chars** | 50-60 chars | 30 chars |
| Description | **70-80 chars** | 80-120 chars | 40 chars |

Korean characters (hangul) take ~2x the width of Latin characters.

### Content Guidelines

- **Formal tone** (합니다/입니다) for professional/service pages
- **Conversational** (해요체) for Naver Blog (D.I.A. rewards engagement)
- Include bilingual terms: "검색 엔진 최적화(SEO)"
- Korean answer capsules: under 3 sentences
- Include Korean-market data when available

### Keywords Meta Tag

Unlike Google, **Naver still reads the keywords meta tag**:

```tsx
// Next.js metadata
export const metadata: Metadata = {
  keywords: ['키워드1', '키워드2', '키워드3'],
};
```

## Naver Ecosystem Strategy

Naver's SERP shows sections for Blog, Cafe, Knowledge iN, News, Shopping — **heavily favoring its own platforms over external websites.**

### Naver Blog (Most Critical)

- Register official blog at [blog.naver.com](https://blog.naver.com)
- Post 2-3x weekly consistently on your niche topic (builds C-Rank)
- 1,500+ characters per post
- Use original images (QUMA-VL assesses text-image consistency)
- AI Briefing preferentially sources from high-C-Rank blogs

### Naver Cafe

- Niche-focused communities (like Reddit subreddits)
- Join 3-5 relevant cafes, contribute genuinely
- Content appears in Naver search results

### Knowledge iN

- Q&A platform (like Quora)
- Answer questions in your domain with genuine expertise
- Expert verification status improves visibility

### Cross-Linking

Link between blog posts, cafe content, and your main website to build backlink network within Naver's ecosystem.

## SmartStore / Naver Shopping SEO

### Three Ranking Pillars

| Pillar | Signals |
|--------|---------|
| **Relevance (적합도)** | Product name-category match, attribute completeness, tag accuracy |
| **Popularity (인기도)** | Sales volume, CTR, review count, wishlist adds |
| **Trust (신뢰도)** | Store rating, return rate, satisfaction scores |

### Product Title Optimization

Structure: `[Brand] [Core keyword] [Attribute] [Sub-keyword]`

Example: `나이키 에어맥스 97 남성 런닝화 화이트`

- Match product name to correct category precisely
- Use ItemScout or Naver Keyword Tool for keyword research
- Avoid keyword stuffing (Naver penalizes)

### Key Rules

- Fill ALL product attributes in the category
- High-resolution images, white/clean background for thumbnails
- Keep discount rates below 50% (unrealistic discounts penalized)
- Encourage genuine reviews with photo attachments
- Respond to all reviews

## Yeti Bot Technical Requirements

User-Agent: `Mozilla/5.0 (compatible; Yeti/1.1; +http://naver.me/spd)`

**Critical**: Yeti has limited JavaScript rendering. For Next.js:

1. Use SSR (`export const dynamic = 'force-dynamic'`) or SSG for all public pages
2. Ensure all meta tags, OG tags, and JSON-LD are in the initial HTML response
3. Do NOT rely on client-side hydration for SEO-critical content
4. Test by viewing page source (not DevTools) — what you see is what Yeti sees

```
# robots.txt
User-agent: Yeti
Allow: /
Crawl-delay: 1

Sitemap: https://yourdomain.com/sitemap.xml
```

## Daum (Kakao) — Minimal Effort

Daum market share is ~1-3% but content appears in KakaoTalk search.

- Register at [webmaster.daum.net](https://webmaster.daum.net)
- Submit sitemap
- No additional optimization needed beyond standard SEO

## Korean Mobile Optimization

97% smartphone penetration. Mobile search exceeds desktop on both Naver and Google Korea.

- Target sub-2-second page load
- 48px minimum touch targets
- Korean CDN edge servers preferred (Korea-based hosting)
- Optimize KakaoTalk OG previews (49M+ users)
- Test in Naver's in-app browser (many users search via Naver app)

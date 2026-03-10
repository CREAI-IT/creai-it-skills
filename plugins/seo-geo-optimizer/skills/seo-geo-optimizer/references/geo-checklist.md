# GEO (Generative Engine Optimization) Checklist

## Table of Contents

- Quantitative Evidence Base
- Content Structure for AI Citation
- Answer Capsules
- FAQ Optimization
- AI Crawler Access
- Platform-Specific Optimization
- Content Freshness Signals
- Content Rewriting Guidelines

## Quantitative Evidence Base

Data from the Princeton/Georgia Tech GEO study (KDD 2024, Aggarwal et al.) and 680M citation analysis:

### Optimization Strategy Impact

| Strategy | Visibility Improvement | Source |
|----------|----------------------|--------|
| **Cite sources** | +30-40% | Princeton GEO study |
| **Statistics addition** | +28-41% | Princeton GEO study |
| **Quotation addition** | +28-41% | Princeton GEO study |
| **Fluency + Statistics combo** | +5.5% over best single | Princeton GEO study |
| **Answer capsules** | 72% of cited pages use them | Branding Corner analysis |
| **FAQPage schema** | +28% citation lift | Frase.io study |
| **Question-format H2/H3** | 3.4x extraction rate | Conbersa study |
| **Tables vs paragraphs** | 81% vs 23% extraction | Conbersa study |
| **H1>H2>H3 hierarchy** | 2.8x citation likelihood | Conbersa study |
| **Schema markup overall** | +317% AI Overview selection | Wellows study |
| **Opening paragraph answers** | 67% more citations | Multiple studies |

### Content Format Performance

| Format | Extraction Rate | Best For |
|--------|----------------|----------|
| **Tables** | 81% | Comparisons, specifications, pricing |
| **Numbered lists** | High | Step-by-step processes, rankings |
| **Bullet lists (5-7 items)** | High | Features, benefits, requirements |
| **FAQ sections** | 78% more likely cited | Q&A queries, definitional content |
| **Code blocks** | Reliable | Technical documentation |
| **Paragraphs** | 23% | Narrative context (avoid for data) |

## Content Structure for AI Citation

### Critical Rules

1. **Self-contained sections**: Each H2/H3 section must be understandable without reading other sections. AI may extract a single section.
2. **No forward/backward references**: Never use "as mentioned above", "see below", "the aforementioned".
3. **Paragraph length**: Max 40-60 words per paragraph (one clear idea each). AI prefers concise, extractable chunks.
4. **Direct answers first**: Lead with the answer, then explain. 44% of ChatGPT citations come from the first third of content.
5. **Include data**: Statistics, percentages, dates, specific numbers. Content with data gets 30-40% more AI citations.
6. **Tables for comparisons**: Use HTML/Markdown tables instead of paragraphs when comparing 2+ items (81% vs 23% extraction).

### Header Hierarchy

```
H1: Page title (one per page)
  H2: Major topic sections
    H3: Subtopics with specific answers
      H4: Details (use sparingly)
```

**Good H2/H3 patterns for GEO (3.4x extraction rate):**

```markdown
## What Is [Topic]?              <- Definitional (highest citation rate)
## How [Topic] Works             <- Process explanation
## [Topic] vs [Alternative]      <- Comparison (very high citation rate)
## Benefits of [Topic]           <- List-based, extractable
## How to [Do Something]         <- Instructional
## [Number] Best [Things]        <- Listicle format
## How Much Does [Topic] Cost?   <- Pricing (AI loves concrete numbers)
```

**FAIL — headers that AI ignores:**

```markdown
## Introduction       <- Generic, tells AI nothing
## Overview           <- Non-specific
## More Information   <- Vague
## Continued          <- Depends on prior context
## Our Approach       <- Self-referential without substance
```

### Quotable Statements

Include 1-2 "quotable" statements per major section. These have: specific data, clear attribution context, and standalone meaning.

**PASS (quotable):**
> "Next.js App Router reduces initial JavaScript payload by 30-40% compared to Pages Router through automatic Server Components, introduced in React 18."

**FAIL (not quotable):**
> "It's pretty good and makes things faster in various ways."

## Answer Capsules

An answer capsule is a 40-80 word paragraph at the start of a section that directly answers the question implied by the heading. **72% of pages cited by ChatGPT feature an answer capsule.** This is the #1 GEO technique.

### Rules

1. Place immediately after the heading — no images or asides in between
2. 40-80 words maximum (2-4 sentences)
3. Include the key term from the heading
4. State the answer definitively (not "it depends" or "there are many views")
5. Include at least one specific detail (number, date, name)
6. For Korean: keep under 3 sentences (Korean is more compact)

### Before/After

**FAIL (no answer capsule):**
```markdown
## React Server Components

When building modern web applications, there are many considerations
to think about. The evolution of rendering strategies has been
significant over the years. Server Components represent the latest
approach that developers are adopting...
```

**PASS (with answer capsule):**
```markdown
## React Server Components

React Server Components (RSC) render on the server and send zero
JavaScript to the client, reducing bundle size by up to 30%.
Introduced in React 18 and fully supported in Next.js 13+, they
are the default component type in the App Router.

### How Server Components Work
[detailed explanation...]
```

### Dual-Layer Pattern

Place the answer capsule with the key takeaway at the top, then provide the full narrative/evidence below. AI extracts the capsule; humans continue reading for depth.

## FAQ Optimization

FAQ sections are extremely GEO-effective: **78% more likely to be cited by AI search engines** and **3.2x more likely to appear in Google AI Overviews** when paired with FAQPage schema.

### Structure

```markdown
## Frequently Asked Questions

### What is [topic]?
[Direct answer in 2-3 sentences. Include a specific fact or statistic.]

### How does [topic] compare to [alternative]?
[Comparison with concrete differences. Use a table if 3+ comparison points.]

### How much does [topic] cost?
[Specific pricing or ranges. AI loves concrete numbers.]

### Who should use [topic]?
[Clear audience definition with use cases.]
```

### Rules

1. Use real questions people ask (check Google "People also ask", AnswerThePublic)
2. Answer in the first sentence — don't build up to it
3. Keep answers 40-60 words (extractable but substantive)
4. **Always** pair visible FAQ with JSON-LD `FAQPage` schema (28% citation lift)
5. 4-10 questions per page (sweet spot: 5-7)
6. Korean pages: natural question form ("~은/는 무엇인가요?", "~하는 방법은?")

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
        "text": "A clear, self-contained answer with specific data..."
      }
    }
  ]
}
```

## AI Crawler Access

See `references/ai-crawlers.md` for the complete 20+ crawler list with user-agent strings and robots.txt configuration patterns.

## Platform-Specific Optimization

### ChatGPT / OpenAI

**Citation behavior:**
- 44% of citations come from the **first third** of content — front-load your best information
- Turn 1 of conversations is 2.5x more likely to trigger citations than turn 10
- Wikipedia dominates: 47.9% of top-10 citations
- Relies heavily on Bing index — Bing SEO matters
- Prefers structured, encyclopedic, factual content with clear definitions
- `OAI-SearchBot` must be allowed for real-time citations

**Optimization priorities:**
1. Strong opening paragraphs with definitive answers
2. FAQPage schema
3. Clean semantic HTML structure
4. Bing webmaster tools registration

### Perplexity

**Citation behavior:**
- **Freshness is ~40% of ranking weight** — the single most influential signal
- Content "updated 2 hours ago" gets 38% more citations than month-old content
- 50% of citations are content published in the current year
- Reddit dominates: 46.7% of top-10 citations
- Values technical depth over brevity
- Strongly favors content with inline citations and sources

**Optimization priorities:**
1. Update cornerstone content every 30-90 days with substantive changes
2. Visible "Last updated: [date]" on all content
3. Include inline citations to authoritative sources
4. Active Reddit engagement on relevant subreddits
5. Fast page load (slow pages may be skipped entirely)

### Google AI Overviews

**Citation behavior:**
- Appears in 60% of US search results (as of Nov 2025)
- 99.2% of informational queries trigger AI Overviews
- Favors 134-167 word self-contained passage units
- Schema markup delivers 317% higher selection rates
- E-E-A-T is the primary filter for selection
- Multi-modal content (text + images + video) gets 156% higher selection

**Optimization priorities:**
1. Traditional Google SEO (foundation)
2. All structured data types applicable to your content
3. E-E-A-T signals (author bios, credentials, external profiles)
4. Self-contained 134-167 word sections under descriptive headers
5. FAQ schema

### Claude (Anthropic)

**Three independent crawlers:**

| Crawler | Purpose | Control |
|---------|---------|---------|
| `ClaudeBot` | Training data | Block independently via robots.txt |
| `Claude-User` | Real-time user fetch | Best signal your content is being recommended |
| `Claude-SearchBot` | Search indexing | Blocking reduces visibility in Claude answers |

**Optimization priorities:**
1. Allow all three bots (or at least Claude-SearchBot + Claude-User)
2. Well-structured, factual content
3. Self-contained explanations with concrete examples

### Cross-Platform Strategy

Only **11% of domains are cited by both ChatGPT and Perplexity** — they are fundamentally different ecosystems. Optimize for each platform's specific signals rather than assuming one approach fits all.

## Content Freshness Signals

AI-cited content is **25.7% fresher** than organic Google results. Freshness is critical across all platforms.

### Implementation

1. **Visible "Last updated" dates** on all content pages
2. **`dateModified` in Article schema** — makes freshness machine-readable
3. **Substantive updates every 30-90 days** for cornerstone content
4. Add new data points, examples, and statistics with each update
5. Use "2025 update" or "2026 guide" in titles for time-sensitive content
6. **Superficial updates don't help** — AI systems evaluate whether updates change the substance

### Platform Freshness Weight

| Platform | Freshness Weight | Key Pattern |
|----------|-----------------|-------------|
| Perplexity | ~40% | Strongest recency bias; 2-hour-old content preferred |
| ChatGPT | Moderate-High | Titles with current year selected for current queries |
| Google AI Overviews | Moderate | Content decay is real — older pages disappearing |
| Claude | Moderate | Claude-SearchBot indexes for freshness |

## Content Rewriting Guidelines

When rewriting content for GEO, apply these transformations:

### Transformation 1: Add Specificity

```
FAIL: "Our platform is fast and reliable."
PASS: "Our platform processes 10,000 requests/second with 99.97% uptime,
       serving 2M+ monthly active users since 2023."
```

### Transformation 2: Make Self-Contained

```
FAIL: "As we discussed in the previous section, this approach..."
PASS: "Content delivery networks (CDNs) distribute static assets across
       edge servers worldwide, reducing latency by 40-60% for users
       outside the origin server's region."
```

### Transformation 3: Add Answer Capsules

```
FAIL: ## Our Pricing
      "We offer several competitive pricing tiers..."

PASS: ## Our Pricing
      "Plans start at $29/month for individuals and $99/month for teams
       of up to 10, with a 14-day free trial on all tiers. Enterprise
       pricing is custom based on usage volume."
```

### Transformation 4: Convert Paragraphs to Tables

```
FAIL: "We're better than the competition in several ways."

PASS: | Feature        | Us         | Competitor A | Competitor B |
      |----------------|------------|-------------|-------------|
      | Response time  | 50ms       | 200ms       | 150ms       |
      | Free tier      | 10K req/mo | 1K req/mo   | 5K req/mo   |
```

### Transformation 5: Add FAQ Section

If no FAQ exists, generate one from the page content. Extract the 4-6 most likely questions a user would ask and answer them directly. Always pair with `FAQPage` JSON-LD.

### Korean Content Transformations

- Use formal written Korean (합니다/입니다 style) for professional content
- Include both Korean and English terms for technical jargon: "검색 엔진 최적화(SEO)"
- Korean answer capsules: under 3 sentences (Korean is more compact)
- Include Korean-market specific data (Naver search share, Korean user statistics)
- Structure FAQ questions in natural Korean: "~은/는 무엇인가요?", "~하려면 어떻게 해야 하나요?"

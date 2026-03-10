# GEO (Generative Engine Optimization) Checklist

## Table of Contents

- Content Structure for AI Citation
- Answer Capsules
- FAQ Optimization
- AI Crawler Access
- Platform-Specific Patterns
- Content Rewriting Guidelines

## Content Structure for AI Citation

### Critical Rules

1. **Self-contained sections**: Each H2/H3 section must be understandable without reading previous sections. AI may extract a single section.
2. **No forward/backward references**: Avoid "as mentioned above", "see below", "the aforementioned". Each section stands alone.
3. **Paragraph length**: Max 120 words per paragraph. AI prefers concise, extractable chunks.
4. **Direct answers first**: Lead with the answer, then explain. Don't bury the key insight.
5. **Include data**: Statistics, percentages, dates, specific numbers. Content with data gets 30-40% more AI citations.

### Header Hierarchy

```
H1: Page title (one per page)
  H2: Major topic sections
    H3: Subtopics with specific answers
      H4: Details (use sparingly)
```

**Good H2/H3 patterns for GEO:**
```markdown
## What Is [Topic]?              ← Definitional (high citation rate)
## How [Topic] Works             ← Process explanation
## [Topic] vs [Alternative]      ← Comparison (very high citation rate)
## Benefits of [Topic]           ← List-based, extractable
## How to [Do Something]         ← Instructional
## [Number] Best [Things]        ← Listicle format
```

**Bad headers:**
```markdown
## Introduction       ← Generic, tells AI nothing
## Overview           ← Non-specific
## More Information   ← Vague
## Continued          ← Depends on prior context
```

### Quotable Statements

Include 1-2 "quotable" statements per major section that AI can directly cite:

**Good (quotable):**
> "Next.js App Router reduces initial JavaScript payload by 30-40% compared to Pages Router through automatic Server Components."

**Bad (not quotable):**
> "It's pretty good and makes things faster in various ways."

Quotable statements have: specific data, clear attribution context, and standalone meaning.

## Answer Capsules

An answer capsule is a 2-4 sentence paragraph at the start of a section that directly answers the question implied by the heading. This is the #1 GEO technique — pages with answer capsules get 40% higher citation rates.

### Pattern

```markdown
## What Is Generative Engine Optimization?

Generative Engine Optimization (GEO) is the practice of optimizing web content
to be cited and referenced by AI-powered search engines like ChatGPT, Perplexity,
and Google AI Overviews. Unlike traditional SEO which targets search result rankings,
GEO focuses on making content extractable, authoritative, and citation-worthy for
large language models.

[More detailed explanation follows...]
```

### Rules for Answer Capsules

1. Place immediately after the heading — no images or asides in between
2. 2-4 sentences maximum
3. Include the key term from the heading
4. State the answer definitively (not "it depends" or "there are many views")
5. Include at least one specific detail (number, date, name)

### Before/After Example

**Before (no answer capsule):**
```markdown
## React Server Components

When building modern web applications, there are many considerations...
The evolution of rendering strategies has been significant...
Server Components represent the latest approach...
```

**After (with answer capsule):**
```markdown
## React Server Components

React Server Components (RSC) render on the server and send zero JavaScript to
the client, reducing bundle size by up to 30%. Introduced in React 18 and fully
supported in Next.js 13+, they are the default component type in the App Router.

### How Server Components Work
[detailed explanation...]
```

## FAQ Optimization

FAQ sections are extremely GEO-effective because they match the natural Q&A format of AI search queries.

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
3. Keep answers 50-150 words (extractable but substantive)
4. Include structured data (`FAQPage` schema) alongside the visible FAQ
5. Minimum 4 questions, maximum 10 per page
6. For Korean pages: write questions in natural Korean question form (e.g., "~은/는 무엇인가요?", "~하는 방법은?")

## AI Crawler Access

### Required User Agents to Allow

| User Agent | Platform | Purpose |
|-----------|----------|---------|
| `GPTBot` | OpenAI | Training data crawl |
| `OAI-SearchBot` | OpenAI | Real-time search for ChatGPT |
| `ChatGPT-User` | OpenAI | Live answer lookups |
| `PerplexityBot` | Perplexity | Search and citation |
| `ClaudeBot` | Anthropic | Training data crawl |
| `Google-Extended` | Google | AI Overviews training |
| `Googlebot` | Google | Search indexing |
| `Bingbot` | Microsoft | Search + Copilot |

### Verification

After configuring robots.txt, verify access:
1. Check robots.txt is accessible at `https://yourdomain.com/robots.txt`
2. Confirm no blanket `Disallow: /` for AI user agents
3. Ensure sitemap URL is listed in robots.txt
4. Check no middleware or WAF blocks these user agents

## Platform-Specific Patterns

### ChatGPT / OpenAI

- Relies heavily on Bing index — Bing SEO matters
- Wikipedia is 47.9% of top-10 citations — earn Wikipedia mentions if possible
- Prefers content with clear definitions and structured data
- `OAI-SearchBot` must be allowed for real-time citations

### Perplexity

- Reddit content appears in 46.7% of citations — community presence matters
- Prefers recent content with "Last updated" timestamps
- Strongly favors content with inline citations and sources
- Values technical depth over brevity

### Google AI Overviews

- Spreads citations across YouTube (18.8%), LinkedIn, Quora
- Pulls from existing Google Search ranking — traditional SEO is foundation
- Prefers content from E-E-A-T signals (author bios, credentials)
- FAQ schema heavily influences AI Overview snippet selection

### Claude

- Values well-structured, factual content
- Prefers self-contained explanations with concrete examples

## Content Rewriting Guidelines

When rewriting content for GEO, follow these transformations:

### Transformation 1: Add Specificity

```
Before: "Our platform is fast and reliable."
After:  "Our platform processes 10,000 requests/second with 99.97% uptime,
         serving 2M+ monthly active users since 2023."
```

### Transformation 2: Make Self-Contained

```
Before: "As we discussed in the previous section, this approach..."
After:  "Content delivery networks (CDNs) distribute static assets across
         edge servers worldwide, reducing latency by 40-60% for users
         outside the origin server's region."
```

### Transformation 3: Add Answer Capsules

```
Before: ## Our Pricing
        "We offer several competitive pricing tiers..."

After:  ## Our Pricing
        "Plans start at $29/month for individuals and $99/month for teams
         of up to 10, with a 14-day free trial on all tiers. Enterprise
         pricing is custom based on usage volume."
```

### Transformation 4: Create Comparison Points

```
Before: "We're better than the competition."
After:  | Feature        | Us         | Competitor A | Competitor B |
        |----------------|------------|-------------|-------------|
        | Response time  | 50ms       | 200ms       | 150ms       |
        | Free tier      | 10K req/mo | 1K req/mo   | 5K req/mo   |
```

### Transformation 5: Add FAQ Section

If no FAQ exists, generate one from the page content. Extract the 4-6 most likely questions a user would ask about the topic and answer them directly from existing content + data.

### Korean Content Transformations

- Use formal written Korean (합니다/입니다 style) for professional content
- Include both Korean and English terms for technical jargon: "검색 엔진 최적화(SEO)"
- Korean answer capsules: keep under 3 sentences (Korean is more compact)
- Include Korean-market specific data when available (Naver search share, Korean user statistics)

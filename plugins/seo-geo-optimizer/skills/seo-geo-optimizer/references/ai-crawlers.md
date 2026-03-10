# AI Crawler Complete Reference

## Three-Tier Classification

AI crawlers operate in three distinct tiers. Each tier serves a different purpose and can be controlled independently via robots.txt.

### Tier 1: Training Data Crawlers

Collect data for model training. Blocking these does NOT affect your visibility in AI search results.

| Crawler | Company | User-Agent String |
|---------|---------|-------------------|
| **GPTBot** | OpenAI | `Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.3; +https://openai.com/gptbot)` |
| **ClaudeBot** | Anthropic | `Mozilla/5.0 AppleWebKit/537.36 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)` |
| **Meta-ExternalAgent** | Meta | `meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)` |
| **Bytespider** | ByteDance | `Mozilla/5.0 (compatible; Bytespider; https://zhanzhang.toutiao.com/)` |
| **Amazonbot** | Amazon | `Mozilla/5.0 AppleWebKit/537.36 (compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)` |
| **Applebot-Extended** | Apple | `Mozilla/5.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)` |
| **CCBot** | Common Crawl | `CCBot/2.0 (https://commoncrawl.org/faq/)` |
| **Google-Extended** | Google | Token: `Google-Extended` (controls AI training, not search) |

### Tier 2: Search & Discovery Crawlers

Build search indexes for AI answer engines. **Blocking these REDUCES your visibility in AI search results.**

| Crawler | Company | User-Agent String |
|---------|---------|-------------------|
| **OAI-SearchBot** | OpenAI | `Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.3; +https://openai.com/searchbot` |
| **PerplexityBot** | Perplexity | `Mozilla/5.0 AppleWebKit/537.36 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)` |
| **Claude-SearchBot** | Anthropic | Token: `Claude-SearchBot` |
| **Meta-WebIndexer** | Meta | `meta-webindexer/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)` |
| **DuckAssistBot** | DuckDuckGo | `DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)` |
| **Gemini-Deep-Research** | Google | `Mozilla/5.0 Chrome/135.0.0.0 Safari/537.36; compatible; Gemini-Deep-Research; +https://gemini.google` |
| **Google-CloudVertexBot** | Google | `(compatible; Google-CloudVertexBot; +https://cloud.google.com)` |

### Tier 3: User-Triggered (Real-Time Fetch) Crawlers

Fetch content in real-time when a user asks the AI about a specific topic. **Most direct signal that your content is being recommended.**

| Crawler | Company | User-Agent String |
|---------|---------|-------------------|
| **ChatGPT-User** | OpenAI | `Mozilla/5.0 AppleWebKit/537.36; compatible; ChatGPT-User/1.0; +https://openai.com/bot` |
| **Claude-User** | Anthropic | `Mozilla/5.0 AppleWebKit/537.36 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)` |
| **Perplexity-User** | Perplexity | `Mozilla/5.0 AppleWebKit/537.36 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)` |
| **MistralAI-User** | Mistral | `Mozilla/5.0 AppleWebKit/537.36 (compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)` |

### Unidentifiable Crawlers

These do NOT use identifiable user-agent strings. Detection requires IP-based analysis:
- **You.com**
- **ChatGPT Operator**
- **Bing Copilot** (uses standard Bingbot)
- **Grok** (X/Twitter)

## robots.txt Configuration

### Strategy A: Allow Everything (Recommended for Maximum Visibility)

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
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

This allows all crawlers by default. Use this unless you have a specific reason to block.

### Strategy B: Selective (Allow Search, Block Some Training)

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      // Tier 2 + 3: Always allow (search + user-triggered)
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      // Tier 1: Block specific training crawlers if desired
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

### Strategy C: Block Training Only (Protect Content, Keep Visibility)

Anthropic's 3-bot model is the gold standard for granular control:

```
# Training: blocked
User-agent: ClaudeBot
Disallow: /

# Search indexing: allowed
User-agent: Claude-SearchBot
Allow: /

# User-triggered fetch: allowed
User-agent: Claude-User
Allow: /
```

Apply the same principle to OpenAI:
```
User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /
```

### Korean Market: Add Naver's Yeti Bot

```
User-agent: Yeti
Allow: /
```

Yeti User-Agent: `Mozilla/5.0 (compatible; Yeti/1.1; +http://naver.me/spd)`

## Verification Checklist

After configuring robots.txt:

1. Verify accessible at `https://yourdomain.com/robots.txt`
2. Confirm no blanket `Disallow: /` for search crawlers (Tier 2+3)
3. Ensure sitemap URL is listed
4. Check no middleware or WAF blocks AI user agents
5. Verify `next build` generates correct robots.txt output

## Market Share (2025)

| Crawler | Market Share | Trend |
|---------|-------------|-------|
| GPTBot | 30% | Dominant |
| Meta-ExternalAgent | ~12% | Fastest growing (+36% Jan 2026) |
| ClaudeBot | ~8% | Steady |
| PerplexityBot | ~5% | Growing |
| Bytespider | ~3% | Collapsed (-85%) |

AI agent traffic grew **6,900% year-over-year** in 2025.

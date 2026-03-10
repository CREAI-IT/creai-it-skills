# GEO Measurement & Analytics

Load when user asks about tracking GEO performance or AI traffic analytics.

## The GA4 Blind Spot

Traditional analytics (Google Analytics) are **fundamentally blind** to AI traffic:

- AI crawlers do not execute JavaScript — invisible to client-side analytics
- 63% of websites receive AI chatbot traffic but cannot measure it
- An estimated **34% of "Direct" traffic** is actually AI-referred
- Your actual AI-influenced traffic is likely **3-5x** what analytics show

## Measurement Approaches

### 1. Server Log Analysis (Most Reliable)

Parse server access logs for AI crawler user-agent strings. Distinguish:
- **Training crawlers** (archival, not user-facing)
- **Search crawlers** (indexing for AI answers)
- **User-triggered** (real-time recommendation — strongest signal)

See `references/ai-crawlers.md` for complete user-agent strings.

**What to track:**
- Crawl frequency per bot
- Pages most frequently crawled
- Crawl patterns over time (increasing = more visibility)
- Response codes returned to crawlers

**Vercel/Next.js**: Check function logs or edge logs for user-agent analysis. For custom hosting, parse nginx/Apache access logs.

### 2. Dedicated GEO Monitoring Tools

| Tool | Starting Price | Key Feature |
|------|---------------|-------------|
| [Otterly.ai](https://otterly.ai) | $25/mo | Tracks citations across 6 AI engines, weekly reports |
| [Profound](https://www.tryprofound.com) | Enterprise | 3D data: AI results + 400M+ real prompts + crawler analytics |
| [Peec](https://www.withgauge.com) | Varies | AI rankings, mentions, competitor benchmarks |
| [Am I Cited](https://www.amicited.com) | Varies | AI crawler activity + citation monitoring |
| [Loamly](https://www.loamly.ai) | Varies | AI website traffic analytics for ChatGPT, Claude, Perplexity |

### 3. Manual Spot-Checking

Query your target keywords in ChatGPT, Perplexity, and Google (AI Overview) to see if your content is cited. Document results monthly.

## Key Metrics to Track

| Metric | What It Measures | How to Get It |
|--------|-----------------|--------------|
| **Citation Rate** | How often your domain appears in AI responses | GEO monitoring tools |
| **Share of Voice** | Your visibility vs competitors in AI answers | GEO monitoring tools |
| **Query Coverage** | Breadth of topics where your brand is cited | Manual spot-checks |
| **Sentiment Accuracy** | Whether AI describes your brand correctly | Manual verification |
| **Factual Alignment** | Accuracy of details AI shares about you | Manual verification |
| **Crawler Frequency** | How often AI bots crawl your site | Server logs |
| **Referral Conversion** | Conversion rate of AI-referred visitors | UTM params + analytics |

## Conversion Data

AI-referred visitors convert at **14.2%** vs Google organic's **2.8%** — 5x higher conversion rate. This makes GEO optimization high-ROI even with lower traffic volume.

## Setting Up Tracking

### Step 1: Server Log Monitoring

At minimum, set up a weekly report of AI crawler visits by bot type. If on Vercel, use Vercel Analytics or export edge logs.

### Step 2: Search Console Baselines

Register with both:
- [Google Search Console](https://search.google.com/search-console/)
- [Naver Search Advisor](https://searchadvisor.naver.com/) (if Korean market)

Track impressions, clicks, CTR as baseline before GEO optimization.

### Step 3: GEO Tool (Optional)

If budget allows, start with Otterly.ai ($25/mo) for automated citation tracking across multiple AI engines.

### Step 4: Monthly Spot-Checks

Query 10-20 target keywords in:
- ChatGPT (with search enabled)
- Perplexity
- Google (check for AI Overview)
- Claude (ask about your topic)

Document which queries cite your content, competitors cited, and content gaps.

## Gartner Prediction

Traditional search volume expected to drop **25% by 2026** as AI answer engines capture more queries. GEO measurement is not optional — it's becoming the primary visibility metric.

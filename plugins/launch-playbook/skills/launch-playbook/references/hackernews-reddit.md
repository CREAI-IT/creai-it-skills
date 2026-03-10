# Hacker News & Reddit Launch Strategy

## Hacker News

### Show HN: Structure & Rules

"Show HN" is a dedicated format for sharing your own creation. It's one of the highest-quality tech audiences on the internet.

**Title format:**
```
Show HN: [Product Name] – [What It Does in Plain English]
```

**Good examples:**
- "Show HN: Acme – Open-source alternative to Vercel for self-hosters"
- "Show HN: PageSpeed – Instantly optimize any website's Core Web Vitals"
- "Show HN: SQLChat – Chat with your database using natural language"

**Bad examples:**
- "Show HN: My new AI startup" (vague, no information)
- "Show HN: The BEST project management tool EVER" (hyperbolic)
- "Show HN: Check out our Series A-funded platform" (corporate, not maker)

**Title rules:**
- Be specific and technical. HN audience respects precision.
- Include what it does, not what it is. "Converts PDFs to markdown" > "AI document tool"
- Mention if it's open-source (HN loves open-source).
- Don't use marketing language. No "revolutionary", "disruptive", "game-changing".
- Don't use emojis. Ever.

### Show HN Post Body

Keep it under 200 words. HN users will click away from long posts.

**Structure:**
```
[One paragraph: what it does + who it's for. Be specific.]

[One paragraph: why you built it. Technical motivation or personal
scratch-your-own-itch story.]

[One paragraph: how it works at a technical level. Mention the stack,
architecture decisions, or interesting technical challenges.]

[Optional: link to demo, GitHub repo, or technical blog post]

[Optional: what you'd like feedback on — be specific]
```

**Example:**
```
I built Acme because I was frustrated with deploying Next.js apps
on my own infrastructure. Vercel is great but expensive at scale,
and self-hosting means dealing with edge functions, ISR, and image
optimization yourself.

Acme handles all of this with a single Docker container. It supports
Next.js 14+ with App Router, handles ISR with Redis, and serves
images through a built-in CDN. Written in Go for performance.

Stack: Go backend, Redis for cache, S3-compatible storage for assets.
The whole thing runs on a single 2GB VPS for most projects.

Source code: [GitHub link]
Live demo: [URL]

I'd love feedback on the ISR implementation specifically — I'm not
sure my approach to stale-while-revalidate is optimal for high-traffic
sites.
```

### HN Algorithm & Timing

**Ranking formula** (approximate):
```
Score = (upvotes - 1)^0.8 / (age_in_hours + 2)^1.8 * penalty_factors
```

- Posts decay quickly — you have ~2-4 hours to gain momentum.
- Flagged or controversial posts get penalty multipliers.
- Posts from new accounts may face additional scrutiny.

**Best posting times:**
- **9-10 AM EST** (6-7 AM PT) — catches both US coasts as they start work.
- **Tuesday-Thursday** — highest traffic days.
- **Avoid**: Friday afternoon, weekends (lower traffic, lower quality engagement).

**How to get to the front page:**
1. First 60 minutes are critical. Get 5-10 upvotes quickly.
2. Quality of comments matters. Engaged discussions boost ranking.
3. The maker must respond to comments quickly and substantively.
4. Don't ask people to upvote. HN detects and penalizes ring voting.

### HN Comment Strategy

**Rules for responding:**
- **Be technical and honest.** HN values substance over marketing.
- **Acknowledge limitations.** "You're right, we don't support X yet" builds trust.
- **Share implementation details.** HN loves technical depth.
- **Don't be defensive.** Criticism is normal. Thank people for feedback.
- **Don't shill.** Never respond with marketing language.
- **Link to source code** when answering technical questions.

**Response templates:**

For feature requests:
```
Great suggestion. We've considered this — the tradeoff is [technical reason].
Our current approach is [alternative]. Would love to hear if that works for
your use case.
```

For criticism:
```
Fair point. [Specific thing they mentioned] is something we're actively
working on. Currently the workaround is [solution]. Thanks for the feedback.
```

For "how does it work" questions:
```
[Technical explanation with specifics — architecture, algorithms, trade-offs]
Source code for this is here: [link to specific file/function]
```

### What Gets Downvoted on HN
- Marketing language or corporate speak
- Vague descriptions without technical depth
- Self-promotion without genuine contribution
- Defensive or dismissive responses to criticism
- Asking for upvotes (will get flagged)
- Products that feel like "yet another X" without clear differentiation

---

## Reddit

### Subreddit Strategy

Reddit is not one platform — it's thousands of communities, each with its own rules, culture, and moderation. You must treat each subreddit individually.

**Pre-launch checklist for each target subreddit:**
1. Read the subreddit rules (sidebar/wiki). Seriously read them.
2. Check for "Self-Promotion Saturday" or similar designated threads.
3. Search for how similar products were received.
4. Check if the mods allow product posts (many don't).
5. Engage genuinely for 2-4 weeks before posting about your product.

### High-Value Subreddits for Product Launches

| Subreddit | Audience | Rules | Best Content Type |
|---|---|---|---|
| r/SideProject | Indie makers | Self-promo OK | Launch story + demo |
| r/InternetIsBeautiful | General tech users | Must be web-based, free | Cool/unique products only |
| r/SaaS | SaaS founders | Community-focused | Lessons learned, transparent metrics |
| r/startups | Startup community | No pure self-promo | Stories, advice, Q&A |
| r/Entrepreneur | Business builders | Self-promo in threads | Value-first content |
| r/webdev | Web developers | Self-promo limited | Technical discussions, open-source |
| r/reactjs, r/nextjs | React/Next devs | Tool sharing OK | Dev tools, libraries, templates |
| r/artificial | AI enthusiasts | Varies | AI products with technical depth |
| r/ProductManagement | PMs | Self-promo limited | PM-related tools with context |

### Reddit Post Structure

**Title**: Clear, specific, no clickbait. Include what it does.
```
Good: "I built an open-source tool that converts Figma designs to React components — 6 months of work"
Bad: "Check out my amazing new AI-powered design tool!! 🚀🔥"
```

**Body (for self-promo subreddits):**
```
[Hook — the problem you experienced personally]

[What you built — 2-3 sentences, specific]

[How it works — brief technical overview if relevant]

[What makes it different — honest differentiation]

[Demo / link]

[Specific ask — "what would you add?" or "what's your workflow for X?"]
```

**Body (for non-promo subreddits):**
```
[Valuable insight or lesson — lead with value, not product]

[Context — how you learned this]

[The story — challenges, mistakes, learnings]

[Mention product naturally within the story, not as the point of the post]

[Ask a genuine question to start discussion]
```

### Reddit Engagement Rules

1. **Never launch on Reddit without prior community engagement.** Post history matters. Mods and users check.
2. **Don't cross-post** the same content to multiple subreddits simultaneously. It looks spammy.
3. **Respond to every comment** within the first few hours.
4. **Be transparent** about being the maker. Don't use alt accounts to promote.
5. **Accept criticism gracefully.** Reddit users are brutally honest. Thank them.
6. **Don't downvote critical comments.** The community notices.
7. **Share genuine metrics** if asked. Reddit respects transparency (revenue, users, growth rate).

### Reddit AMA Strategy

An AMA (Ask Me Anything) can generate significant engagement if you have a compelling story.

**When to do an AMA:**
- After achieving a notable milestone (e.g., "I built X in Y months and hit Z users")
- If you have an interesting backstory (career change, solved a personal problem)
- If your product is in a space the subreddit cares about deeply

**AMA post structure:**
```
Title: "I built [Product] that [outcome]. [Credential/milestone]. AMA"

Body:
- Quick intro (2-3 sentences about you)
- What you built and why
- Key metrics (be transparent)
- Proof (screenshot, link)
- "Ask me anything about [specific topics]"
```

**AMA rules:**
- Schedule 2+ hours for active responses
- Answer honestly — vague answers get downvoted
- Share failures and learnings, not just successes
- Don't dodge tough questions
- Follow up on unanswered questions within 24 hours

### Reddit Ads (Paid Option)

Reddit ads can be effective for targeting specific communities.

**Best practices:**
- **Target by subreddit**, not by interest (much more precise)
- **Use native-looking ads** — ads that feel like organic posts perform 3x better
- **Lead with value** — educational content or free tools, not hard sells
- **Budget**: Start with $50-100/day for testing
- **Creative**: Use text-heavy ads (not polished graphics) for authenticity

**Ad copy formula:**
```
"I built [product] because [relatable problem].

[What it does in one sentence].

[Social proof: X users / Y reviews / featured on Z].

Try it free: [link]"
```

## Cross-Platform Timing

When launching across both HN and Reddit:

| Time | Action |
|---|---|
| 9:00 AM EST | Post Show HN |
| 10:00 AM EST | Engage with HN comments (critical first hour) |
| 11:00 AM EST | Post on r/SideProject or primary subreddit |
| 12:00-2:00 PM EST | Cross-engage both platforms |
| 2:00 PM EST | Post on secondary subreddit (if applicable) |
| Evening | Continue responding on both platforms |

**Never post HN and Reddit at the same time.** You need to be present for the critical first hour on each platform.

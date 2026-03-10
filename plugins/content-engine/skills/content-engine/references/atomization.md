# Content Atomization Framework

## What Is Atomization?

Atomization is the process of breaking source content into its smallest useful insight units ("atoms"), then selectively reassembling those atoms into platform-native content. It is NOT summarizing or shortening — it's decomposing ideas into reusable building blocks.

## Atom Types

Every piece of content can be decomposed into these atom types:

| Atom Type | Description | Example | Best Platforms |
|-----------|-------------|---------|----------------|
| **Stat** | A specific data point, metric, or number | "73% of startups fail because of premature scaling" | Twitter, LinkedIn, Carousel |
| **Story** | A narrative with character, conflict, resolution | "When I launched my first product, nobody showed up..." | LinkedIn, Blog, Newsletter, Podcast |
| **Quote** | A memorable statement (yours or attributed) | "'Ship twice, measure once' — something I learned the hard way" | Twitter, Instagram, Quote card |
| **Framework** | A structured model, process, or mental model | "The 3-step validation loop: Build → Measure → Kill" | Twitter thread, LinkedIn, Blog, Carousel |
| **Contrarian Take** | An opinion that challenges conventional wisdom | "Stop building MVPs. Build MSPs — Minimum Sellable Products" | Twitter, LinkedIn, HN, Reddit |
| **How-To** | Step-by-step instructions | "How to get your first 100 users: Step 1..." | Blog, Thread, YouTube, Newsletter |
| **Question** | A provocative or thought-provoking question | "What if your biggest feature is actually your biggest liability?" | Twitter, LinkedIn (engagement bait, but genuine) |
| **Before/After** | A transformation comparison | "Before: 2hr manual reports. After: 5min automated dashboards" | Twitter, LinkedIn, Instagram, Case study |
| **Analogy** | A comparison that makes complex ideas accessible | "Using a database without indexes is like searching a library by walking through every aisle" | Twitter, LinkedIn, Blog |
| **List** | A curated set of items, tools, or lessons | "5 tools every solo founder needs in 2026" | Twitter, LinkedIn, Blog, Newsletter |
| **Case Study** | A detailed real-world example with results | "How Company X increased retention by 40% using..." | Blog, LinkedIn, Newsletter, Webinar |

## Atomization Process

### Step 1: Read & Mark

Read through the source content and highlight every distinct idea, data point, story, or insight. Each highlight is a candidate atom.

**Marking rules:**
- One idea = one atom (if an idea has sub-ideas, those are separate atoms)
- Context that supports an atom is part of that atom (don't strip supporting detail)
- If you can't classify it as an atom type, it's probably filler — skip it

### Step 2: Classify & Score

For each atom, assign:

**Type**: One of the 11 atom types above.

**Strength Score** (High / Medium / Low):
- **High**: Specific (has numbers, names, or concrete details), novel (not common knowledge), emotionally resonant (makes reader feel something)
- **Medium**: Has 2 of the 3 qualities above
- **Low**: Generic, expected, or lacks specificity

**Platform Fit**: Which platforms each atom naturally suits (based on type and format constraints).

### Step 3: Map Combinations

Some atoms are powerful alone. Others work best in combination:

| Combo Pattern | Structure | Use Case |
|---|---|---|
| **Stat + Story** | Lead with stat, then illustrate with story | LinkedIn posts, Newsletter sections |
| **Contrarian + Framework** | Challenge the norm, then offer your model | Twitter threads, Blog posts |
| **Question + Before/After** | Pose the question, show the transformation | Twitter engagement posts |
| **How-To + Case Study** | Teach the method, prove it with results | Blog, Newsletter, YouTube |
| **List + Quote** | Curate items, punctuate with memorable quote | Twitter threads, Carousels |
| **Analogy + Stat** | Make it intuitive, then make it credible | Opening for any long-form |

### Step 4: Assign to Platforms

Map atoms and combos to target platforms using the platform fit table:

| Platform | Preferred Atom Types | Avoid |
|---|---|---|
| **Twitter/X** | Stat, Contrarian, Question, Framework, List | Long stories (save for threads) |
| **LinkedIn** | Story, Before/After, Framework, Case Study | Pure controversy without substance |
| **Instagram** | Quote, Before/After, List, Framework (as carousel) | Text-heavy atoms without visual potential |
| **Blog/SEO** | How-To, Case Study, Framework, Story, List | Atoms that lack depth for 800+ words |
| **Newsletter** | Story, How-To, Case Study, Contrarian, Curated List | Shallow atoms that don't reward subscriber attention |
| **YouTube Shorts** | Before/After, How-To, Contrarian, Stat | Complex frameworks (too long) |
| **Reddit/HN** | How-To, Case Study, Contrarian, Stat (with proof) | Self-promotional atoms, listicles |
| **Naver Blog** | How-To, Case Study, List, Story (Korean-adapted) | Direct translations |

## Bidirectional Flow

Content atomization works in both directions:

### Long → Short (Decomposition)
1. Start with pillar content (blog, talk, whitepaper)
2. Extract atoms
3. Assemble into shorter platform pieces

### Short → Long (Expansion)
1. Identify high-performing atomic content (viral tweet, popular LinkedIn post)
2. Ask: "What's the pillar content this atom came from — or should come from?"
3. Expand into long-form by:
   - Adding supporting data, stories, and case studies
   - Fleshing out the framework behind the insight
   - Including counterarguments and nuance
   - Adding a deeper how-to section

### Winner Identification Signals
Content worth expanding short → long:
- Save rate > 3x your average (people want to come back to it)
- Reply quality is high (people add their own insights)
- DMs triggered ("Can you write more about this?")
- Bookmark/share ratio is high relative to likes

## Content Pyramid Model

Organize atoms into a three-tier pyramid:

```
         ┌─────────────┐
         │   Tier 1    │  Pillar Content (1-2/month)
         │ Blog, Video │  The source — deep, comprehensive
         │  Whitepaper │
         ├─────────────┤
         │   Tier 2    │  Derivative Content (3-5 per pillar)
         │  LinkedIn   │  Explore specific angles
         │  Threads    │
         │ Newsletter  │
         ├─────────────┤
         │   Tier 3    │  Atomic Content (5-10 per derivative)
         │ Tweets      │  Single-idea, single-platform
         │ Reels       │
         │ Carousels   │
         └─────────────┘
```

**Flow**: Tier 1 feeds Tier 2, Tier 2 feeds Tier 3. But winners from Tier 3 can flow back UP to Tier 1 (bidirectional).

## Atom Extraction Template

When presenting atoms to the user, use this format:

```
| # | Type | Content Summary | Strength | Best Platforms | Combo Potential |
|---|------|-----------------|----------|----------------|-----------------|
| 1 | Stat | "73% of startups fail from premature scaling" | High | TW, LI, IG | + Story #4 |
| 2 | Story | "My first launch: 0 signups on day 1" | High | LI, Blog, NL | + Before/After #7 |
| 3 | Framework | "3-step validation loop" | High | TW thread, LI, Blog | + How-To #5 |
| 4 | Contrarian | "Stop building MVPs" | High | TW, LI, HN, Reddit | + Framework #3 |
| 5 | How-To | "Getting first 100 users" | Medium | Blog, Thread, YT | + Case Study #8 |
| 6 | Question | "Is your biggest feature your biggest liability?" | Medium | TW, LI | Standalone |
| 7 | Before/After | "2hr manual → 5min automated" | High | TW, LI, IG | + Stat #1 |
| 8 | Case Study | "Company X: 40% retention increase" | Medium | Blog, LI, NL | + How-To #5 |
```

Abbreviations: TW = Twitter/X, LI = LinkedIn, IG = Instagram, NL = Newsletter, YT = YouTube, HN = Hacker News

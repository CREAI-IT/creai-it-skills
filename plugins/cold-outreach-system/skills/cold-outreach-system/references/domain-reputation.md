# Domain Reputation & Email Deliverability

## The #1 Rule: Never Cold Email from Your Main Domain

Your primary domain (the one your website and team emails use) is sacred. One spam complaint can land your entire company's email in spam folders — including transactional emails, support emails, and employee emails.

**Always use a secondary domain for cold outreach.**

## Secondary Domain Strategy

### Setup

| Element | Recommendation |
|---------|---------------|
| Number of domains | 3-5 rotating domains |
| Domain naming | Variations of your brand: `tryacme.com`, `getacme.com`, `useacme.com`, `acmehq.com` |
| Registrar | Google Domains, Namecheap, Cloudflare |
| Email provider | Google Workspace ($6/user/mo) or Outlook |
| Inboxes per domain | 4-6 inboxes (max 40-50 emails/day per inbox) |
| Total daily capacity | 150-300 emails/day across all domains (after warmup) |

### Why Multiple Domains?

- If one domain gets flagged, others continue working
- Distribute sending volume (lower per-domain risk)
- Test different sender names and personas
- Each domain builds its own reputation independently

## DNS Authentication Setup

### SPF (Sender Policy Framework)

SPF tells receiving servers which servers are authorized to send email for your domain.

**DNS Record:**
```
Type: TXT
Host: @
Value: v=spf1 include:_spf.google.com ~all
```

For Google Workspace. For Outlook:
```
v=spf1 include:spf.protection.outlook.com ~all
```

**Rules:**
- Only one SPF record per domain
- Maximum 10 DNS lookups (keep includes minimal)
- Use `~all` (softfail) not `-all` (hardfail) for cold email domains

### DKIM (DomainKeys Identified Mail)

DKIM adds a digital signature to your emails proving they haven't been tampered with.

**Setup (Google Workspace):**
1. Go to Google Admin Console → Apps → Google Workspace → Gmail
2. Click "Authenticate email" → "Generate new record"
3. Copy the DKIM key
4. Add DNS TXT record:
```
Type: TXT
Host: google._domainkey
Value: [generated DKIM key]
```
5. Return to Admin Console → "Start authentication"

**For Outlook:** DNS record is auto-configured when you set up the domain.

### DMARC (Domain-based Message Authentication)

DMARC tells receiving servers what to do with emails that fail SPF/DKIM checks.

**Progressive DMARC Policy:**

| Week | Policy | Purpose |
|------|--------|---------|
| Week 1-3 | `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com` | Monitor only — collect reports |
| Week 4-6 | `v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@yourdomain.com` | Quarantine 25% of failures |
| Week 7-9 | `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@yourdomain.com` | Quarantine all failures |
| Week 10+ | `v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com` | Reject all failures |

**DNS Record:**
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

Start with `p=none` and progress based on DMARC reports.

## Domain Warmup

A new domain has zero reputation. Sending 100 cold emails from a new domain = instant spam folder.

### Warmup Schedule

| Week | Daily Sends | Who To | Notes |
|------|------------|--------|-------|
| Week 1 | 5-10 | Friends, colleagues, existing contacts | Real conversations only |
| Week 2 | 10-20 | Warm contacts + light cold outreach | Mix warm and cold |
| Week 3 | 20-35 | Gradual increase in cold outreach | Monitor bounce/spam rates |
| Week 4 | 35-50 | Full cold outreach volume | Maintain engagement metrics |
| Week 5+ | 50-75 | Cruising altitude | Don't exceed 75/inbox/day |

### Warmup Rules

1. **Send real emails first** — not automated warmup tool junk
2. **Get replies** — reply rate is the strongest positive signal
3. **Don't spike volume** — gradual increase only (20-30% per day max)
4. **Monitor bounce rate** — stay under 3% or slow down
5. **Monitor spam complaints** — any spam complaints = stop and investigate
6. **Use warmup tools as supplement** — Instantly, Lemwarm, Mailreach — but don't rely on them alone

### Warmup Tools

| Tool | Price | What It Does |
|------|-------|-------------|
| Instantly | $30/mo | Auto-warmup + sending platform |
| Lemwarm | $29/mo | Warmup network (part of Lemlist) |
| Mailreach | $25/mo | Warmup + deliverability testing |
| Warmbox | $15/mo | Warmup only |

## Sending Limits

### Per-Domain Daily Limits

| Domain Age | Max Emails/Day/Inbox | Max Emails/Day/Domain |
|------------|---------------------|----------------------|
| Week 1 (new) | 5-10 | 10-20 |
| Week 2 | 10-20 | 20-40 |
| Week 3 | 20-35 | 40-70 |
| Week 4 | 35-50 | 70-100 |
| Established (6+ weeks) | 50-75 | 100-300 |

### Hard Limits (Never Exceed)

| Provider | Hard Limit |
|----------|-----------|
| Google Workspace | 2,000/day per user (but don't approach this for cold email) |
| Outlook/O365 | 10,000/day per user (same caveat) |
| Practical cold email limit | 50-75/day per inbox |

## Deliverability Checklist

Before sending any cold outreach:

### Domain Setup
- [ ] Using a secondary domain (NOT main brand domain)
- [ ] SPF record configured and verified
- [ ] DKIM configured and verified
- [ ] DMARC record set (start with p=none)
- [ ] Domain has been warming up for 2+ weeks
- [ ] Google Workspace or Outlook configured (not free Gmail/Outlook)

### Email Content
- [ ] Plain text only (no HTML templates, no images)
- [ ] No tracking pixels (reduces deliverability)
- [ ] No spam trigger words (FREE, URGENT, Act Now, $$, etc.)
- [ ] No links in Email 1 (or maximum 1 link)
- [ ] Short emails (under 75 words)
- [ ] Unsubscribe option included
- [ ] From name is a real person (not "Sales Team")

### Sending Behavior
- [ ] Sending volume within warmup stage limits
- [ ] Not sending to purchased/scraped lists (low quality = high bounces)
- [ ] Email addresses verified before sending (use Hunter, NeverBounce, ZeroBounce)
- [ ] Bounce rate under 3%
- [ ] Spam complaint rate under 0.1%
- [ ] Not sending on weekends
- [ ] Staggering sends (not all at once)

### Monitoring
- [ ] Checking spam placement weekly (use Mailreach or GlockApps)
- [ ] Monitoring DMARC reports
- [ ] Tracking reply rate per domain (dropping reply rate = reputation issue)
- [ ] Rotating domains if one shows deliverability decline

## ISP Requirements (2025-2026)

Gmail and Yahoo enforced new sender requirements in February 2024. Outlook followed in May 2025.

| Requirement | Gmail | Yahoo | Outlook |
|-------------|-------|-------|---------|
| SPF or DKIM authentication | Required | Required | Required |
| DMARC record | Required | Required | Required |
| One-click unsubscribe | Required for bulk (5000+/day) | Required for bulk | Required for bulk |
| Spam complaint rate | < 0.3% (target < 0.1%) | < 0.3% | < 0.3% |
| Valid forward/reverse DNS | Required | Required | Required |

## Recovery: What to Do If You Get Flagged

| Situation | Action |
|-----------|--------|
| Emails going to spam | Stop sending immediately. Check SPF/DKIM/DMARC. Wait 2 weeks. Resume at very low volume. |
| High bounce rate (> 5%) | Stop. Clean your list. Verify all emails. Resume with verified-only list. |
| Spam complaints | Stop. Review your content and targeting. Your ICP or copy is wrong. |
| Domain blacklisted | Check MXToolBox. Submit removal requests. May need to retire the domain. |
| IP blacklisted | Contact your email provider. May need a new sending IP. |

## Legal Requirements

### CAN-SPAM (United States)
- Don't use deceptive subject lines
- Identify the message as an ad (or commercial email)
- Include your physical address
- Include an unsubscribe mechanism
- Honor opt-outs within 10 business days
- **Penalty**: Up to $51,744 per email violation

### GDPR (European Union)
- Need a lawful basis for processing (legitimate interest for B2B cold email)
- Must have a clear privacy policy
- Must honor data deletion requests
- **Penalty**: Up to 20M euros or 4% of global revenue

### CASL (Canada)
- Requires explicit or implied consent
- Must include sender identification
- Must include unsubscribe mechanism
- **Penalty**: Up to $10M CAD per violation

### Practical Compliance for Cold Email
```
Every cold email must include:
1. Your real name and title
2. Your company name
3. Your physical address (can be a PO Box or registered agent)
4. An unsubscribe mechanism (even "Reply 'stop' to opt out" works)
5. Honest subject line (not misleading)
```

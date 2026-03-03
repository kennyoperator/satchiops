# CLAUDE BOT SEO — Setup Guide

## What This Does

Daily autopublishing agent for **satchiops.com**. Every day at 9 AM UTC it:

1. **Discovers** real questions asked by restoration business operators (via Tavily Search on Reddit & IICRC forums)
2. **Filters** out DIY/homeowner/residential content using negative keywords
3. **Extracts** keyword clusters, primary keyword, and secondary keywords using Claude Haiku
4. **Writes** a 1,800–2,500 word MDX blog post using Claude Opus (technical, operator-focused tone)
5. **Quality Gate 1** — programmatic checks: word count ≥1,600, headings ≥10, CTA block present
6. **Quality Gate 2** — Claude editorial audit: no banned content (Jason mentions, fake stats, cert claims)
7. **Commits** the MDX post + updated state to `content/posts/<slug>.mdx`
8. **Polls** `https://satchiops.com/blog/<slug>` every 30s until HTTP 200
9. **Pings** Google sitemap only after the URL goes live

---

## GitHub Secrets Required

Go to `https://github.com/kennyoperator/satchiops/settings/secrets/actions` and add:

| Secret Name        | Value                          |
|--------------------|--------------------------------|
| `TAVILY_API_KEY`   | Your Tavily API key            |
| `ANTHROPIC_API_KEY`| Your Anthropic API key         |
| `GH_PAT`           | Your GitHub Personal Access Token |

---

## File Structure

```
scripts/
  seo-bot.js              ← Main pipeline (Node.js)
.github/
  workflows/
    seo-bot.yml           ← Daily cron job (GitHub Actions)
content/
  bot_state.json          ← Tracks used_dates, internal_link_usage, run_log
  posts/
    <slug>.mdx            ← Generated blog posts land here
package.json              ← Node.js dependencies
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Run the full pipeline
node scripts/seo-bot.js

# Dry run (no GitHub commits, no sitemap ping)
DRY_RUN=true node scripts/seo-bot.js
```

Make sure `/app/.env` has the required env vars (see `.env.example`).

---

## Hub & Spoke Internal Linking

**Pillar Posts** (max 10 inbound links each across all briefings):
- `revenue-leak-diagnostic`
- `scale-restoration-fleet-no-chaos`
- `xactimate-estimator-throughput-restoration`
- `carrier-ready-restoration-documentation`
- `restoration-lsa-responsiveness-logic`
- `after-hours-restoration-dispatch-leak`

**Briefings** (bot-generated): max 3 internal links per post, linked only to pillar posts under their cap.

Link usage is tracked in `content/bot_state.json` under `internal_link_usage`.

---

## Quality Gates

**Gate 1 (Programmatic — runs before LLM audit):**
- Word count ≥ 1,600
- Heading count ≥ 10 (H1/H2/H3)
- CTA block string `"Ready to plug the leak?"` present

**Gate 2 (Claude Audit — runs after Gate 1):**
- No mention of the name "Jason"
- No fake statistics (fabricated percentages presented as verified facts)
- No certification claims ("we are IICRC certified")

If either gate fails → pipeline aborts, no commit is made.

---

## CTA Block (appended to every post)

```
---
### Ready to plug the leak?
If you want this installed into your shop (intake → dispatch → job file → cash collection) without hiring more staff, I can help.
**Book the 15-min audit here:** https://satchiops.com/
---
```

---

## Manual Trigger

Go to `Actions → SEO Bot → Run workflow` in GitHub UI to trigger manually. Enable **Dry Run** to test without committing.

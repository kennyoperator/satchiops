'use strict';

/**
 * CLAUDE BOT SEO — Autopublishing Agent for satchiops.com
 * Pipeline: Discover → Extract Keywords → Write MDX → Quality Gates → Commit → Poll → Ping
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const { z } = require('zod');
const fs = require('fs');

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const ROOT_DIR = path.join(__dirname, '..');

const CONFIG = {
  TAVILY_API_KEY: process.env.TAVILY_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_REPO: process.env.GITHUB_REPO || 'kennyoperator/satchiops',
  CONTENT_DIR: process.env.CONTENT_DIR || 'content/posts',
  STATE_PATH: process.env.STATE_PATH || 'content/bot_state.json',
  DRY_RUN: process.env.DRY_RUN === 'true',
};

const PILLAR_SLUGS = [
  'revenue-leak-diagnostic',
  'scale-restoration-fleet-no-chaos',
  'xactimate-estimator-throughput-restoration',
  'carrier-ready-restoration-documentation',
  'restoration-lsa-responsiveness-logic',
  'after-hours-restoration-dispatch-leak',
];

const PILLAR_MAX_LINKS = 10;
const BRIEFING_MAX_LINKS = 3;

const NEGATIVE_KEYWORDS = [
  'diy',
  'homeowner tips',
  'residential cleaning',
  'how to clean my carpet',
  'renting a dehumidifier',
];

const CTA_MARKER = 'Ready to plug the leak?';

// ─── ZOD SCHEMAS ─────────────────────────────────────────────────────────────

const KeywordsSchema = z.object({
  keyword_cluster: z.string(),
  primary_keyword: z.string(),
  secondary_keywords: z.array(z.string()),
});

const AuditSchema = z.object({
  pass: z.boolean(),
  violations: z.array(z.string()),
});

// ─── VALIDATION ───────────────────────────────────────────────────────────────

function validateConfig() {
  const missing = ['TAVILY_API_KEY', 'ANTHROPIC_API_KEY', 'GITHUB_TOKEN']
    .filter((k) => !CONFIG[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// ─── STATE MANAGEMENT ─────────────────────────────────────────────────────────

function loadState() {
  const stateFile = path.join(ROOT_DIR, CONFIG.STATE_PATH);
  if (!fs.existsSync(stateFile)) {
    return {
      used_dates: [],
      internal_link_usage: {},
      run_log: [],
    };
  }
  return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
}

function saveStateLocally(state) {
  const stateFile = path.join(ROOT_DIR, CONFIG.STATE_PATH);
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

// ─── DATE UTILITIES ───────────────────────────────────────────────────────────

function pickUniqueBackdate(usedDates) {
  const start = new Date('2025-01-01');
  const end = new Date();
  const totalDays = Math.floor((end - start) / 86400000);

  const available = [];
  for (let i = 0; i <= totalDays; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const iso = d.toISOString().split('T')[0];
    if (!usedDates.includes(iso)) available.push(iso);
  }

  if (available.length === 0) {
    throw new Error('All dates between 2025-01-01 and today are exhausted');
  }
  return available[Math.floor(Math.random() * available.length)];
}

// ─── SLUG UTILITIES ───────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70);
}

// ─── STEP 1: DISCOVERY ────────────────────────────────────────────────────────

async function discoverQuestions() {
  console.log('\n[STEP 1] Discovering operator questions via Tavily...');

  const searchQueries = [
    'restoration contractor business operations management problems Reddit',
    'water damage restoration company owner workflow dispatch site:reddit.com',
    'fire restoration contractor estimating cycle time operations',
    'IICRC restoration business owner operations best practices forum',
    'restoration company owner hiring dispatch staffing problems',
    'mitigation restoration contractor invoice carrier approval issues',
  ];

  const allResults = [];

  for (const query of searchQueries) {
    try {
      const response = await axios.post(
        'https://api.tavily.com/search',
        {
          api_key: CONFIG.TAVILY_API_KEY,
          query,
          search_depth: 'advanced',
          max_results: 6,
          include_answer: false,
          include_raw_content: false,
        },
        { timeout: 30000 }
      );
      const results = response.data.results || [];
      allResults.push(...results);
      console.log(`  "${query.slice(0, 55)}..." => ${results.length} results`);
    } catch (err) {
      console.warn(`  Tavily query failed: ${err.message}`);
    }
  }

  // Deduplicate by URL
  const seen = new Set();
  const unique = allResults.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  // Filter out negative keywords
  const filtered = unique.filter((r) => {
    const text = `${r.title} ${r.content || ''}`.toLowerCase();
    return !NEGATIVE_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
  });

  console.log(
    `  Total: ${allResults.length} | Unique: ${unique.length} | After filter: ${filtered.length}`
  );

  if (filtered.length === 0) {
    throw new Error(
      'No operator-focused questions found after negative keyword filtering'
    );
  }

  return filtered.slice(0, 25).map((r) => ({
    question_text: r.title,
    source_url: r.url,
    snippet: (r.content || '').slice(0, 500),
  }));
}

// ─── STEP 2: KEYWORD EXTRACTION ───────────────────────────────────────────────

async function extractKeywords(question) {
  console.log('\n[STEP 2] Extracting keywords with Claude Haiku...');

  const client = new Anthropic({ apiKey: CONFIG.ANTHROPIC_API_KEY });

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [
      {
        role: 'user',
        content: `Given this restoration industry question from a business operator/contractor:

Title: "${question.question_text}"
Source: ${question.source_url}
Context: ${question.snippet}

Extract and return ONLY a JSON object with:
- keyword_cluster: string (2-4 word topical cluster, e.g. "restoration dispatch operations")
- primary_keyword: string (best single long-tail SEO keyword for operators)
- secondary_keywords: string[] (array of 4-5 supporting keywords for operators)

Return valid JSON only. No explanation. No markdown fences.`,
      },
    ],
  });

  const text = msg.content[0].text.trim();
  const match = text.match(/\{[\s\S]*?\}/);
  if (!match) throw new Error('Claude keyword extraction returned no JSON');

  const raw = JSON.parse(match[0]);
  const parsed = KeywordsSchema.parse(raw);
  console.log(`  primary_keyword : "${parsed.primary_keyword}"`);
  console.log(`  keyword_cluster : "${parsed.keyword_cluster}"`);

  return { ...question, ...parsed };
}

// ─── STEP 3: INTERNAL LINK SELECTION ─────────────────────────────────────────

function selectInternalLinks(primaryKeyword, keywordCluster, state) {
  const { internal_link_usage } = state;

  // Only pick from pillar slugs still under their cap
  const eligible = PILLAR_SLUGS.filter(
    (slug) => (internal_link_usage[slug] || 0) < PILLAR_MAX_LINKS
  );

  if (eligible.length === 0) return [];

  // Score by keyword relevance
  const query = `${primaryKeyword} ${keywordCluster}`.toLowerCase();
  const scored = eligible
    .map((slug) => {
      const words = slug.replace(/-/g, ' ');
      const score = words.split(' ').filter((w) => w.length > 3 && query.includes(w)).length;
      return { slug, score };
    })
    .sort((a, b) => b.score - a.score);

  const withScore = scored.filter((s) => s.score > 0);

  // Determine target count (2–4 if possible, else 1)
  let count;
  if (withScore.length >= 4) count = 2 + Math.floor(Math.random() * 3); // 2, 3, or 4
  else if (withScore.length >= 2) count = 2;
  else if (withScore.length === 1) count = 1;
  else count = 1; // fallback: first eligible regardless of score

  const candidates = withScore.length > 0 ? withScore : scored;
  return candidates
    .slice(0, count)
    .map((s) => s.slug)
    .slice(0, BRIEFING_MAX_LINKS);
}

// ─── STEP 4: WRITE MDX POST ───────────────────────────────────────────────────

async function writeMDXPost(question, backdate, internalLinks) {
  console.log('\n[STEP 3] Writing MDX post with Claude Opus...');

  const slug = slugify(question.question_text.slice(0, 65));
  const client = new Anthropic({ apiKey: CONFIG.ANTHROPIC_API_KEY });

  const linkSection =
    internalLinks.length > 0
      ? `Weave these internal links naturally into the article body (markdown format):
${internalLinks.map((s) => `- [relevant anchor text](/blog/${s})`).join('\n')}`
      : 'No internal links required for this post.';

  const tagsStr = (question.secondary_keywords || [])
    .slice(0, 3)
    .map((k) => `"${k}"`)
    .join(', ');

  const prompt = `You are a technical content writer for SatchiOps — a systems consultancy for restoration contractors and company owners.

Write a single MDX blog post (1,900–2,400 words) answering this operator question:
"${question.question_text}"

Context: ${question.snippet}
PRIMARY KEYWORD: ${question.primary_keyword}
SECONDARY KEYWORDS: ${(question.secondary_keywords || []).join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT OUTPUT STRUCTURE — follow every rule:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[BLOCK 1] YAML FRONTMATTER — copy this format exactly:
---
title: "<operator-focused title, 50-70 chars>"
description: "<2-sentence meta description using primary keyword>"
date: "${backdate}"
updated: "${backdate}"
slug: "${slug}"
tags: [${tagsStr}]
category: "Operations"
authorName: "Kenny"
authorTitle: "Systems Architect"
reviewedBy: "Technical Team"
---

[BLOCK 2] H1 HEADING — same text as frontmatter title:
# <title>

[BLOCK 3] AUTHORITY DISCLAIMER — copy VERBATIM immediately after H1, on its own line:
> This briefing was architected by SatchiOps systems engineers and cross-referenced with IICRC S500 standards for operational accuracy.

[BLOCK 4] ARTICLE BODY — rules:
- Minimum 10 headings total (## and ### mixed, spread throughout the full article)
- Write in direct, technical, operator-focused prose — no marketing fluff
- Use concrete numbers, timeframes, and operational specifics
- Do NOT mention anyone named Jason
- Do NOT write fake statistics or fabricated percentages
- Do NOT make certification claims (never say "we are IICRC certified")
- Minimum 1,800 words of body content

[BLOCK 5] CHECKLIST — exactly one checklist with at least 5 items:
- [ ] Step or check item one
- [ ] Step or check item two
(continue for 5+ items)

[BLOCK 6] OPERATIONAL SOP BLOCK — exactly one code fence labeled "sop" with at least 10 lines:
\`\`\`sop
# SOP: [Name of the SOP]
Version: 1.0 | Owner: Operations Lead
---
Step 1: ...
Step 2: ...
Step 3: ...
Step 4: ...
Step 5: ...
Step 6: ...
Step 7: ...
Step 8: ...
Step 9: ...
Step 10: ...
\`\`\`

[BLOCK 7] INTERNAL LINKS:
${linkSection}

[BLOCK 8] END CTA — copy this VERBATIM as the very last content in the file:
---
### Ready to plug the leak?
If you want this installed into your shop (intake → dispatch → job file → cash collection) without hiring more staff, I can help.
**Book the 15-min audit here:** https://satchiops.com/
---

Return ONLY the complete MDX content. No preamble. No "Here is your post:" commentary.`;

  const msg = await client.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 5500,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = msg.content[0].text;
  const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
  console.log(`  Generated ${wordCount} words | slug: "${slug}"`);

  return { content, slug };
}

// ─── QUALITY GATE 1: PROGRAMMATIC ────────────────────────────────────────────

function qualityGate1(mdxContent) {
  console.log('\n[QUALITY GATE 1] Programmatic checks...');
  const errors = [];

  // Word count >= 1,600
  const wordCount = mdxContent.split(/\s+/).filter((w) => w.length > 0).length;
  if (wordCount < 1600) {
    errors.push(`Word count ${wordCount} < 1,600 minimum`);
  } else {
    console.log(`  [PASS] Word count: ${wordCount}`);
  }

  // Heading count >= 10
  const headings = (mdxContent.match(/^#{1,3}\s+.+/gm) || []).length;
  if (headings < 10) {
    errors.push(`Heading count ${headings} < 10 minimum`);
  } else {
    console.log(`  [PASS] Headings: ${headings}`);
  }

  // CTA block present
  if (!mdxContent.includes(CTA_MARKER)) {
    errors.push(`CTA block missing — "${CTA_MARKER}" string not found`);
  } else {
    console.log(`  [PASS] CTA block present`);
  }

  if (errors.length > 0) {
    errors.forEach((e) => console.error(`  [FAIL] ${e}`));
    return false;
  }

  console.log('  Quality Gate 1: ALL CHECKS PASSED');
  return true;
}

// ─── QUALITY GATE 2: CLAUDE EDITORIAL AUDIT ──────────────────────────────────

async function qualityGate2(mdxContent) {
  console.log('\n[QUALITY GATE 2] Claude editorial audit...');

  const client = new Anthropic({ apiKey: CONFIG.ANTHROPIC_API_KEY });

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [
      {
        role: 'user',
        content: `You are a strict editorial quality auditor. Audit the MDX content below for exactly THREE banned content rules. Be precise — only flag CLEAR violations, not ambiguous cases.

BANNED CONTENT RULES (flag only clear, unambiguous violations):

RULE 1 — JASON NAME BAN:
Flag ONLY if the first name "Jason" appears as someone's actual name (e.g. "Jason Smith", "Call Jason", "Ask Jason").
Do NOT flag: words containing "jason" as part of another word, technical terms, or any other usage.

RULE 2 — FAKE STATISTICS BAN:
Flag ONLY if a specific percentage or numerical statistic is presented as a verified industry fact with a made-up source (e.g. "Studies show 73% of contractors fail within 2 years").
Do NOT flag: general business advice, rough estimates without citation claims, ranges, or the IICRC S500 authority disclaimer.

RULE 3 — CERTIFICATION CLAIM BAN:
Flag ONLY if the content claims the author/company IS certified (e.g. "we are IICRC certified", "our team holds IICRC certification", "SatchiOps is an IICRC member").
Do NOT flag: references to IICRC standards as a methodology benchmark (e.g. "cross-referenced with IICRC S500 standards"). Referencing a standard is NOT claiming certification.

CONTENT TO AUDIT:
---
${mdxContent.slice(0, 7500)}
---

Respond ONLY with valid JSON:
{"pass": true, "violations": []}
or if violations exist:
{"pass": false, "violations": ["exact quote + rule violated"]}`,
      },
    ],
  });

  const text = msg.content[0].text.trim();
  const match = text.match(/\{[\s\S]*?\}/);
  if (!match) {
    console.error('  [FAIL] Audit response unparseable — failing safe');
    return false;
  }

  const result = AuditSchema.parse(JSON.parse(match[0]));
  if (!result.pass) {
    console.error('  [FAIL] Quality Gate 2 violations found:');
    result.violations.forEach((v) => console.error(`    - ${v}`));
    return false;
  }

  console.log('  [PASS] Quality Gate 2: No violations found');
  return true;
}

// ─── GITHUB API COMMIT ────────────────────────────────────────────────────────

async function commitFileToGitHub(repoPath, content, commitMessage) {
  const [owner, repo] = CONFIG.GITHUB_REPO.split('/');
  const headers = {
    Authorization: `token ${CONFIG.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'satchiops-seo-bot/1.0',
  };

  let sha;
  try {
    const existing = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`,
      { headers }
    );
    sha = existing.data.sha;
  } catch {
    // File doesn't exist yet — create it fresh
  }

  const body = {
    message: commitMessage,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    ...(sha ? { sha } : {}),
  };

  await axios.put(
    `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`,
    body,
    { headers }
  );
}

async function deployToGitHub(slug, mdxContent, state) {
  console.log(`\n[STEP 5] Committing to GitHub (${CONFIG.GITHUB_REPO})...`);

  if (CONFIG.DRY_RUN) {
    console.log('  [DRY RUN] Skipping GitHub commit');
    return;
  }

  // Commit the MDX post
  const postPath = `${CONFIG.CONTENT_DIR}/${slug}.mdx`;
  await commitFileToGitHub(
    postPath,
    mdxContent,
    `feat(seo-bot): publish briefing "${slug}"`
  );
  console.log(`  Committed: ${postPath}`);

  // Commit updated state file
  await commitFileToGitHub(
    CONFIG.STATE_PATH,
    JSON.stringify(state, null, 2),
    `chore(seo-bot): update bot_state after "${slug}"`
  );
  console.log(`  Committed: ${CONFIG.STATE_PATH}`);
}

// ─── POLLING LOOP ─────────────────────────────────────────────────────────────

async function pollUntilLive(slug, maxMinutes = 30) {
  const url = `https://satchiops.com/blog/${slug}`;
  const maxAttempts = Math.floor((maxMinutes * 60) / 30);

  console.log(`\n[STEP 6] Polling ${url}`);
  console.log(`  Interval: 30s | Max wait: ${maxMinutes} min (${maxAttempts} attempts)`);

  if (CONFIG.DRY_RUN) {
    console.log('  [DRY RUN] Skipping poll loop');
    return false;
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        maxRedirects: 5,
        validateStatus: null,
      });
      if (response.status === 200) {
        console.log(`  [LIVE] URL returned HTTP 200 after ~${attempt * 30}s`);
        return true;
      }
      console.log(`  Attempt ${attempt}/${maxAttempts} — HTTP ${response.status}, waiting 30s...`);
    } catch (err) {
      console.log(`  Attempt ${attempt}/${maxAttempts} — ${err.code || err.message}, waiting 30s...`);
    }

    if (attempt < maxAttempts) {
      await new Promise((r) => setTimeout(r, 30000));
    }
  }

  console.warn(`  [TIMEOUT] URL did not go live within ${maxMinutes} minutes`);
  return false;
}

// ─── SITEMAP PING ─────────────────────────────────────────────────────────────

async function pingSitemap() {
  const sitemapUrl = 'https://satchiops.com/sitemap.xml';
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  if (CONFIG.DRY_RUN) {
    console.log('\n[STEP 7] [DRY RUN] Skipping sitemap ping');
    return;
  }

  try {
    await axios.get(pingUrl, { timeout: 10000 });
    console.log('\n[STEP 7] Google sitemap ping sent successfully');
  } catch (err) {
    // Non-blocking — Google ping is best-effort
    console.warn(`\n[STEP 7] Sitemap ping failed (non-blocking): ${err.message}`);
  }
}

// ─── MAIN PIPELINE ────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  CLAUDE BOT SEO — satchiops.com Autopublishing Agent');
  console.log(`  Started : ${new Date().toISOString()}`);
  if (CONFIG.DRY_RUN) console.log('  MODE    : DRY RUN (no commits or pings)');
  console.log('═══════════════════════════════════════════════════════');

  validateConfig();

  const state = loadState();
  console.log(`\nState: ${state.run_log.length} previous runs | ${state.used_dates.length} used dates`);

  const runRecord = {
    timestamp: new Date().toISOString(),
    status: 'failed',
    slug: null,
    error: null,
  };

  try {
    // ── STEP 1: Discover operator questions
    const questions = await discoverQuestions();

    // ── STEP 2: Extract keywords from best candidate
    const question = await extractKeywords(questions[0]);

    // ── STEP 2b: Pick unique backdate
    const backdate = pickUniqueBackdate(state.used_dates);
    console.log(`\n  Backdate selected: ${backdate}`);

    // ── STEP 2c: Select internal links (Hub & Spoke)
    const internalLinks = selectInternalLinks(
      question.primary_keyword,
      question.keyword_cluster,
      state
    );
    console.log(
      `  Internal links  : ${internalLinks.length > 0 ? internalLinks.join(', ') : 'none'}`
    );

    // ── STEP 3: Write MDX post with Claude Opus
    const { content: mdxContent, slug } = await writeMDXPost(
      question,
      backdate,
      internalLinks
    );

    // ── STEP 4a: Quality Gate 1 (programmatic)
    const gate1Pass = qualityGate1(mdxContent);
    if (!gate1Pass) {
      throw new Error('Quality Gate 1 FAILED — aborting commit');
    }

    // ── STEP 4b: Quality Gate 2 (Claude audit)
    const gate2Pass = await qualityGate2(mdxContent);
    if (!gate2Pass) {
      throw new Error('Quality Gate 2 FAILED — aborting commit');
    }

    // ── Update state before commit (so state is consistent)
    state.used_dates.push(backdate);
    internalLinks.forEach((s) => {
      state.internal_link_usage[s] = (state.internal_link_usage[s] || 0) + 1;
    });
    runRecord.slug = slug;
    runRecord.status = 'quality_passed';

    // ── STEP 5: Commit MDX + state to GitHub
    await deployToGitHub(slug, mdxContent, state);
    runRecord.status = 'committed';

    // ── Save state locally as well (backup for workflow git push)
    state.run_log.push(runRecord);
    saveStateLocally(state);

    // ── STEP 6: Poll URL every 30s until HTTP 200
    const isLive = await pollUntilLive(slug);
    if (isLive) {
      // ── STEP 7: Ping Google sitemap only after URL is confirmed live
      await pingSitemap();
      runRecord.status = 'indexed';
    } else {
      runRecord.status = 'committed_not_live';
    }

    console.log('\n╔══════════════════════════════════════╗');
    console.log('║  PIPELINE COMPLETE                   ║');
    console.log(`║  slug   : ${slug.slice(0, 26).padEnd(26)} ║`);
    console.log(`║  status : ${runRecord.status.padEnd(26)} ║`);
    console.log('╚══════════════════════════════════════╝');
  } catch (err) {
    runRecord.error = err.message;
    console.error(`\n✗ PIPELINE FAILED: ${err.message}`);

    // Always persist the run record even on failure
    state.run_log.push(runRecord);
    saveStateLocally(state);

    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});

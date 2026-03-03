// scripts/seo-bot.js
// Run with: node scripts/seo-bot.js
// Requires env: ANTHROPIC_API_KEY, TAVILY_API_KEY

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const BOT_STATE_PATH = path.join(ROOT, "content", "bot_state.json");

const SITE_BASE = "https://satchiops.com";
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(stage, msg) {
  console.log(`[seo-bot][${stage}] ${msg}`);
}

function readBotState() {
  const raw = fs.readFileSync(BOT_STATE_PATH, "utf8");
  return JSON.parse(raw);
}

function writeBotState(state) {
  fs.writeFileSync(BOT_STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

function slugFromFilename(filename) {
  return filename.replace(/\.mdx?$/, "");
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};
  for (const line of yaml.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

function extractInternalLinks(content) {
  const slugs = [];
  const re = /\(\/blog\/([a-z0-9-]+)\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

// ---------------------------------------------------------------------------
// Stage 1: Scan all existing posts
// ---------------------------------------------------------------------------

function scanPosts() {
  log("scan", "Scanning /content/posts for all MDX files...");
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  const posts = [];
  const internalLinkUsage = {};

  for (const file of files) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const fm = parseFrontmatter(content);
    const slug = fm.slug || slugFromFilename(file);
    const linkedSlugs = extractInternalLinks(content);

    for (const ls of linkedSlugs) {
      internalLinkUsage[ls] = (internalLinkUsage[ls] || 0) + 1;
    }

    posts.push({
      slug,
      title: fm.title || "",
      tags: fm.tags || "",
      category: fm.category || "",
      date: fm.date || "",
    });
  }

  log("scan", `Found ${posts.length} posts.`);
  log("scan", `Internal link usage: ${JSON.stringify(internalLinkUsage)}`);

  return { posts, internalLinkUsage };
}

// ---------------------------------------------------------------------------
// Stage 2: Pick a unique backdate
// ---------------------------------------------------------------------------

function pickDate(usedDates) {
  const start = new Date("2025-01-01");
  const end = new Date();
  end.setDate(end.getDate() - 1); // yesterday at latest

  for (let attempt = 0; attempt < 20; attempt++) {
    const range = end - start;
    const randomMs = Math.floor(Math.random() * range);
    const candidate = new Date(start.getTime() + randomMs);
    const dateStr = candidate.toISOString().slice(0, 10);
    if (!usedDates[dateStr]) {
      log("date", `Selected unused date: ${dateStr} (attempt ${attempt + 1})`);
      return dateStr;
    }
  }
  throw new Error("Could not find an unused date after 20 attempts.");
}

// ---------------------------------------------------------------------------
// Stage 3: Discover topic via Tavily
// ---------------------------------------------------------------------------

async function discoverTopic(usedQuestions) {
  log("discover", "Querying Tavily for restoration owner questions...");

  const queries = [
    "restoration business owner how do I scale operations",
    "water mitigation company scaling hiring technicians",
    "restoration short pay carrier dispute documentation",
    "restoration hiring technicians onboarding SOP system",
    "restoration accounts receivable collections cash flow",
    "restoration referral partners plumber property manager pipeline",
    "restoration LSA Google local services ads ranking",
    "restoration job costing estimating profitability",
    "restoration owner after hours dispatch missed calls",
    "restoration business marketing without agency",
  ];

  const allResults = [];

  for (const query of queries.slice(0, 4)) {
    try {
      const res = await axios.post(
        "https://api.tavily.com/search",
        {
          api_key: process.env.TAVILY_API_KEY,
          query,
          search_depth: "basic",
          max_results: 8,
          include_answer: false,
          include_domains: ["reddit.com", "contractortalk.com", "proboards.com", "quora.com"],
        },
        { timeout: 15000 }
      );
      if (res.data && res.data.results) {
        allResults.push(...res.data.results.map((r) => ({ ...r, query })));
      }
    } catch (err) {
      log("discover", `Tavily query failed: ${err.message}`);
    }
  }

  log("discover", `Collected ${allResults.length} raw results from Tavily.`);

  if (allResults.length === 0) {
    throw new Error("No results from Tavily — cannot continue.");
  }

  // Use Claude to score and pick the best candidate
  const prompt = `You are an SEO strategist for a restoration business operations consultancy (SatchiOps).
Target audience: US restoration business OWNERS and OPERATORS (NOT homeowners).

Here are ${allResults.length} search results from restoration industry forums and Reddit:

${allResults
  .slice(0, 25)
  .map(
    (r, i) =>
      `[${i + 1}] URL: ${r.url}\nTitle: ${r.title}\nSnippet: ${r.content?.slice(0, 200)}\n`
  )
  .join("\n")}

Previously used questions (do NOT repeat these):
${usedQuestions.slice(-20).join("\n") || "(none)"}

Instructions:
1. Pick the single BEST candidate for a new blog post targeting restoration operators.
2. Exclude anything aimed at homeowners or general consumers.
3. Exclude topics too similar to previously used questions.
4. Return ONLY valid JSON (no markdown, no explanation):
{
  "question_text": "the core question or pain point",
  "source_url": "url of best result",
  "keyword_cluster": "A|B|C|D|E",
  "primary_keyword": "main SEO keyword phrase",
  "secondary_keywords": ["kw1","kw2","kw3","kw4","kw5"],
  "article_angle": "1-2 sentence description of the recommended article angle"
}

Cluster definitions:
A = Intake/Dispatch
B = LSA/Marketing
C = Documentation/Compliance
D = Estimating/Cash Flow
E = Scaling/Operations/HR`;

  log("discover", "Sending results to Claude for scoring...");
  const msg = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = msg.content[0].text.trim();
  log("discover", `Claude raw response: ${raw}`);

  let topic;
  try {
    topic = JSON.parse(raw);
  } catch {
    // Try to extract JSON from markdown code block
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      topic = JSON.parse(jsonMatch[1].trim());
    } else {
      throw new Error(`Could not parse topic JSON from Claude: ${raw}`);
    }
  }

  log("discover", `Selected topic: "${topic.question_text}" | Cluster: ${topic.keyword_cluster}`);
  return topic;
}

// ---------------------------------------------------------------------------
// Stage 4: Select internal links
// ---------------------------------------------------------------------------

const CLUSTER_MAP = {
  A: ["after-hours-restoration-dispatch-leak", "restoration-lsa-responsiveness-logic"],
  B: ["restoration-lsa-responsiveness-logic", "restoration-referral-partner-pipeline", "restoration-review-flywheel-automation"],
  C: ["carrier-ready-restoration-documentation", "xactimate-estimator-throughput-restoration", "restoration-accounts-receivable-collections-workflow"],
  D: ["revenue-leak-diagnostic", "xactimate-estimator-throughput-restoration", "restoration-accounts-receivable-collections-workflow"],
  E: ["scale-restoration-fleet-no-chaos", "restoration-tech-onboarding-training-sop", "commercial-residential-restoration-intake-qualification"],
};

function selectInternalLinks(cluster, internalLinkUsage, allPosts, newSlug) {
  const CAP = 3;
  const allSlugs = allPosts.map((p) => p.slug);
  const preferred = (CLUSTER_MAP[cluster] || []).filter(
    (s) => s !== newSlug && allSlugs.includes(s) && (internalLinkUsage[s] || 0) < CAP
  );

  // Fill remaining from other clusters if needed
  const others = allSlugs.filter(
    (s) =>
      s !== newSlug &&
      !preferred.includes(s) &&
      (internalLinkUsage[s] || 0) < CAP
  );

  const combined = [...preferred, ...others];
  const chosen = combined.slice(0, 4);

  log("links", `Selected ${chosen.length} internal links: ${chosen.join(", ")}`);
  return chosen;
}

// ---------------------------------------------------------------------------
// Stage 5: Generate MDX post with Claude
// ---------------------------------------------------------------------------

async function generatePost(topic, targetDate, chosenLinks, allPosts) {
  const linkLines = chosenLinks
    .map((slug) => {
      const post = allPosts.find((p) => p.slug === slug);
      const title = post ? post.title : slug.replace(/-/g, " ");
      return `[Related: ${title}](/blog/${slug})`;
    })
    .join("\n");

  const prompt = `You are a senior technical writer for SatchiOps, a systems consultancy for US restoration business owners.
Write a complete MDX blog post based on the topic below. Target audience: restoration business OWNERS and OPERATORS only.

TOPIC:
- Question/Pain: ${topic.question_text}
- Primary keyword: ${topic.primary_keyword}
- Secondary keywords: ${topic.secondary_keywords.join(", ")}
- Article angle: ${topic.article_angle}
- Cluster: ${topic.keyword_cluster}

REQUIREMENTS (ALL MANDATORY — post will be rejected if any are missing):
1. Word count: 1,800–2,500 words
2. >= 10 headings (H2 and H3 combined)
3. At least one checklist with >= 5 bullets (use - [ ] format)
4. At least one SOP/template inside a fenced code block with >= 10 lines
5. Include these internal links naturally in the body (do NOT add extra ones):
${linkLines}
6. End with this EXACT CTA block (copy verbatim, no changes):

---
### Ready to plug the leak?
If you want this installed into your shop (intake → dispatch → job file → cash collection) without hiring more staff, I can help.
**Book the 15-min audit here:** https://satchiops.com/
---

FORBIDDEN: Do NOT mention Jason, certifications (WRT/ASD/IICRC), partnerships, or invent statistics.
Author is always: Kenny | Systems Architect

FRONTMATTER (output valid YAML between --- delimiters):
- title: compelling, keyword-rich
- description: 150-160 chars, includes primary keyword
- date: "${targetDate}"
- updated: "${targetDate}"
- slug: kebab-case, descriptive, includes primary keyword
- tags: comma-separated quoted strings
- category: one of: Operations | Marketing | Finance | Compliance | HR
- authorName: "Kenny"
- authorTitle: "Systems Architect"
- complianceLevel: "Operator-Ready" or "Carrier-Ready"
- canonical: "https://satchiops.com/blog/<slug>"
- noindex: false
- draft: false

Also include a commented SEO Plan block after frontmatter:
{/* SEO Plan
primary_keyword: ${topic.primary_keyword}
secondary_keywords: ${topic.secondary_keywords.join(", ")}
intent: informational
*/}

Output the full MDX file content only. No explanation outside the file.`;

  log("generate", "Sending generation prompt to Claude...");
  const msg = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const content = msg.content[0].text.trim();
  log("generate", `Generated ${content.split(" ").length} words (approx).`);
  return content;
}

// ---------------------------------------------------------------------------
// Stage 6: Editor audit
// ---------------------------------------------------------------------------

async function auditPost(content, allPosts) {
  log("audit", "Running editor audit via Claude...");

  const prompt = `You are a strict technical editor for a restoration industry blog.
Audit the following MDX post and return ONLY valid JSON with this shape:
{
  "pass": true|false,
  "word_count": number,
  "heading_count": number,
  "checklist_bullets": number,
  "sop_lines": number,
  "has_cta": true|false,
  "has_internal_links": true|false,
  "banned_content_found": false|"description of banned content",
  "failure_reasons": ["reason1", "reason2"]
}

Audit rules (FAIL if ANY violated):
- word_count < 1600 → FAIL
- heading_count < 10 → FAIL
- checklist_bullets < 5 → FAIL
- sop_lines < 10 → FAIL
- has_cta is false → FAIL
- has_internal_links is false → FAIL
- banned_content_found is not false → FAIL

MDX content to audit:
\`\`\`
${content.slice(0, 6000)}
\`\`\``;

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = msg.content[0].text.trim();
  let audit;
  try {
    audit = JSON.parse(raw);
  } catch {
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      audit = JSON.parse(jsonMatch[1].trim());
    } else {
      throw new Error(`Could not parse audit JSON: ${raw}`);
    }
  }

  log("audit", `Audit result: ${JSON.stringify(audit)}`);
  return audit;
}

// ---------------------------------------------------------------------------
// Stage 7: Write files
// ---------------------------------------------------------------------------

function writePost(content, state, targetDate, slug, topic, chosenLinks) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  fs.writeFileSync(filePath, content + "\n");
  log("write", `Post written to ${filePath}`);

  state.used_dates[targetDate] = slug;
  state.internal_link_usage = state.internal_link_usage || {};
  for (const ls of chosenLinks) {
    state.internal_link_usage[ls] = (state.internal_link_usage[ls] || 0) + 1;
  }
  if (!state.used_questions) state.used_questions = [];
  state.used_questions.push(topic.question_text.toLowerCase().trim());

  if (!state.run_log) state.run_log = [];
  state.run_log.push({
    date: targetDate,
    slug,
    question_text: topic.question_text,
    source_url: topic.source_url,
    chosen_links: chosenLinks,
    ran_at: new Date().toISOString(),
  });

  // Update post_index_cache
  if (!state.post_index_cache) {
    state.post_index_cache = { last_indexed_at: null, known_slugs: [], known_urls: [] };
  }
  if (!state.post_index_cache.known_slugs.includes(slug)) {
    state.post_index_cache.known_slugs.push(slug);
    state.post_index_cache.known_urls.push(`${SITE_BASE}/blog/${slug}`);
  }
  state.post_index_cache.last_indexed_at = new Date().toISOString();

  writeBotState(state);
  log("write", "bot_state.json updated.");
}

// ---------------------------------------------------------------------------
// Stage 8: Deploy-ready check + sitemap ping
// ---------------------------------------------------------------------------

async function waitForDeploy(slug) {
  const url = `${SITE_BASE}/blog/${slug}`;
  const maxMs = 10 * 60 * 1000;
  const start = Date.now();
  let delay = 15000;

  log("deploy", `Polling ${url} for HTTP 200 (max 10 min)...`);

  while (Date.now() - start < maxMs) {
    try {
      const res = await axios.get(url, { timeout: 10000 });
      if (res.status === 200) {
        log("deploy", `Post is live at ${url}`);
        return true;
      }
    } catch {
      // Not live yet
    }
    log("deploy", `Not live yet. Waiting ${delay / 1000}s...`);
    await new Promise((r) => setTimeout(r, delay));
    delay = Math.min(delay * 1.5, 60000);
  }

  log("deploy", "Timed out waiting for deploy. Skipping sitemap ping.");
  return false;
}

async function pingSitemap() {
  const pingUrl = `https://www.google.com/ping?sitemap=${SITE_BASE}/sitemap.xml`;
  try {
    await axios.get(pingUrl, { timeout: 10000 });
    log("sitemap", `Pinged Google sitemap: ${pingUrl}`);
  } catch (err) {
    log("sitemap", `Sitemap ping failed (non-fatal): ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log("main", "SEO bot starting...");

  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Missing ANTHROPIC_API_KEY");
  if (!process.env.TAVILY_API_KEY) throw new Error("Missing TAVILY_API_KEY");

  // 1. Scan posts
  const { posts, internalLinkUsage } = scanPosts();

  // 2. Load bot state
  const state = readBotState();
  // Merge scanned usage with any previously recorded counts (take max)
  for (const [slug, count] of Object.entries(internalLinkUsage)) {
    state.internal_link_usage[slug] = Math.max(
      state.internal_link_usage[slug] || 0,
      count
    );
  }

  // 3. Pick date
  const targetDate = pickDate(state.used_dates);

  // 4. Discover topic
  const topic = await discoverTopic(state.used_questions || []);

  // 5. Select internal links
  const chosenLinks = selectInternalLinks(
    topic.keyword_cluster,
    state.internal_link_usage,
    posts,
    null // slug not known yet
  );

  // 6. Generate post
  const content = await generatePost(topic, targetDate, chosenLinks, posts);

  // 7. Parse slug from generated frontmatter
  const fm = parseFrontmatter(content);
  const slug = fm.slug || `restoration-${targetDate}`;
  log("main", `Post slug: ${slug}`);

  // 8. Audit
  const audit = await auditPost(content, posts);
  if (!audit.pass) {
    log("audit", `FAIL — aborting publish. Reasons: ${audit.failure_reasons.join("; ")}`);
    process.exit(1);
  }
  log("audit", "PASS — proceeding to publish.");

  // 9. Write files
  writePost(content, state, targetDate, slug, topic, chosenLinks);

  // 10. Wait for deploy + ping sitemap
  const isLive = await waitForDeploy(slug);
  if (isLive) {
    await pingSitemap();
  }

  log("main", "SEO bot completed successfully.");
}

main().catch((err) => {
  console.error("[seo-bot][ERROR]", err.message);
  process.exit(1);
});

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

export interface PostMeta {
  title: string
  description: string
  date: string
  updated?: string
  slug: string
  tags: string[]
  category: string
  author: string
  heroImage?: string
  draft: boolean
  readingTime: string
}

export interface Post {
  meta: PostMeta
  content: string
}

function parseFrontmatter(filePath: string, slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    meta: {
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      updated: data.updated ?? undefined,
      slug,
      tags: data.tags ?? [],
      category: data.category ?? "",
      author: data.author ? data.author.split(" ")[0] : (slug.charCodeAt(0) % 2 === 0 ? "Kenny" : "Jason"),
      heroImage: data.heroImage ?? undefined,
      draft: data.draft === true,
      readingTime: stats.text,
    },
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllSlugs()

  return slugs
    .map((slug) => {
      const ext = fs.existsSync(path.join(POSTS_DIR, `${slug}.mdx`)) ? ".mdx" : ".md"
      const filePath = path.join(POSTS_DIR, `${slug}${ext}`)
      const { meta } = parseFrontmatter(filePath, slug)
      return meta
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)

  let filePath: string | null = null
  if (fs.existsSync(mdxPath)) filePath = mdxPath
  else if (fs.existsSync(mdPath)) filePath = mdPath

  if (!filePath) return null

  return parseFrontmatter(filePath, slug)
}

import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

const BASE_URL = "https://satchiops.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogPostEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPostEntries,
  ]
}

import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { getAllSlugs, getPostBySlug } from "@/lib/posts"
import { MDXRemote } from "@/components/mdx-remote"

const toAbsoluteUrl = (p?: string) => {
  if (!p) return undefined
  if (p.startsWith("http://") || p.startsWith("https://")) return p
  return `https://satchiops.com${p.startsWith("/") ? p : `/${p}`}`
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.meta.title} | SatchiOps Blog`,
    description: post.meta.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || post.meta.draft) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta.title,
    "description": post.meta.description,
    "datePublished": post.meta.date,
    "dateModified": post.meta.updated || post.meta.date,
    "author": {
      "@type": "Person",
      "name": post.meta.authorName || post.meta.author || "Kenny",
      "jobTitle": post.meta.authorTitle || "Systems Architect"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://satchiops.com/#organization",
      "name": "SatchiOps"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.meta.canonical || `https://satchiops.com/blog/${slug}`
    },
    ...(post.meta.heroImage ? { "image": [toAbsoluteUrl(post.meta.heroImage)] } : {})
  }

  return (
    <main className="min-h-screen bg-background">
      <Script
        id={`jsonld-blog-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Post header */}
      <div className="mx-auto max-w-3xl px-6 pt-12 md:px-10 md:pt-16">
        <Link
          href="https://www.satchiops.com/"
          className="mb-8 inline-block font-sans text-[10px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-70"
        >
          &larr; SatchiOps
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {post.meta.category}
          </span>
          <span className="font-sans text-[10px] text-muted-foreground">
            {post.meta.readingTime}
          </span>
        </div>

        <h1 className="font-sans text-2xl font-black tracking-tight text-foreground md:text-3xl">
          {post.meta.title}
        </h1>

        <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
          {post.meta.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-foreground pb-8">
          <span className="font-sans text-[10px] text-muted-foreground">
            {new Date(post.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="font-sans text-[10px] text-foreground">
            by {post.meta.author}
          </span>
          {post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-foreground px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MDX content */}
      <MDXRemote source={post.content} />

      {/* Footer nav */}
      <div className="mx-auto max-w-3xl px-6 py-12 text-center md:px-10">
        <Link
          href="https://www.satchiops.com/"
          className="font-sans text-xs uppercase tracking-widest text-foreground transition-opacity hover:opacity-70"
        >
          &larr; Back to SatchiOps
        </Link>
      </div>
    </main>
  )
}

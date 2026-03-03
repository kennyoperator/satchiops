import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Blog | SatchiOps",
  description: "Field-tested systems thinking for restoration operators. Intake automation, dispatch logic, and carrier-ready documentation.",
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 border-b border-foreground pb-8">
          <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Field Notes
          </p>
          <h1 className="font-sans text-2xl font-black tracking-tight text-foreground md:text-3xl">
            The SatchiOps Blog
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
            Systems thinking for restoration operators. No fluff. Just the playbook.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border border-foreground p-8 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-foreground border-y border-foreground">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block px-0 py-6 transition-colors hover:bg-muted md:px-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center gap-3">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {post.category}
                      </span>
                      <span className="font-sans text-[10px] text-muted-foreground">
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="font-sans text-base font-bold text-foreground transition-opacity group-hover:opacity-70 md:text-lg">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="font-sans text-[10px] text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="font-sans text-[10px] text-foreground">
                        by {post.author}
                      </span>
                    </div>
                  </div>
                  <span className="mt-1 shrink-0 font-sans text-xs text-muted-foreground transition-opacity group-hover:opacity-70">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="https://www.satchiops.com/"
            className="font-sans text-xs uppercase tracking-widest text-foreground transition-opacity hover:opacity-70"
          >
            &larr; Back to SatchiOps
          </Link>
        </div>

      </div>
    </main>
  )
}

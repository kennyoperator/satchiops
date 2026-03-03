import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="mx-auto max-w-3xl bg-background px-6 py-12 text-foreground md:px-10 md:py-16">
        {children}
      </article>
    ),

    h1: ({ children }) => (
      <h1 className="mb-6 mt-12 font-sans text-3xl font-black tracking-tight text-foreground md:text-4xl first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-sans text-xl font-bold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-sans text-lg font-bold tracking-tight text-foreground">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="mb-5 font-sans text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        className="font-sans text-foreground underline decoration-foreground/40 underline-offset-2 transition-opacity hover:opacity-70"
      >
        {children}
      </a>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),

    ul: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-0 font-sans text-base leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-foreground" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),

    ol: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 font-sans text-base leading-relaxed text-muted-foreground marker:font-sans marker:text-foreground">
        {children}
      </ol>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-foreground bg-muted py-4 pl-6 pr-4 font-sans italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    code: ({ children }) => (
      <code className="rounded-none border border-foreground bg-muted px-1.5 py-0.5 font-sans text-sm text-foreground">
        {children}
      </code>
    ),

    pre: ({ children }) => (
      <pre className="mb-5 overflow-x-auto border border-foreground bg-muted p-5 font-sans text-sm leading-relaxed text-foreground">
        {children}
      </pre>
    ),

    hr: () => (
      <hr className="my-8 border-t border-foreground" />
    ),

    table: ({ children }) => (
      <div className="mb-5 overflow-x-auto">
        <table className="w-full border-collapse border border-foreground font-sans text-sm text-muted-foreground">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-foreground bg-muted px-4 py-2 text-left font-sans text-xs font-bold uppercase tracking-widest text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-foreground px-4 py-2">
        {children}
      </td>
    ),

    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt || ""}
        className="my-6 w-full border border-foreground"
      />
    ),

    ...components,
  }
}

import { compile, run } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import { useMDXComponents } from "@/mdx-components"

export async function MDXRemote({ source }: { source: string }) {
  const components = useMDXComponents({})

  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
  })

  const { default: MDXContent } = await run(String(compiled), {
    ...(runtime as any),
    baseUrl: "https://satchiops.com",
  })

  return <MDXContent components={components} />
}

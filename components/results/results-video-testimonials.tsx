const videos = [
  { name: "[PLACEHOLDER]", company: "[PLACEHOLDER] Restoration" },
  { name: "[PLACEHOLDER]", company: "[PLACEHOLDER] Restoration" },
  { name: "[PLACEHOLDER]", company: "[PLACEHOLDER] Restoration" },
]

export default function ResultsVideoTestimonials() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          Hear It Directly
        </p>
        <h2 className="mb-7 text-balance text-2xl font-black tracking-tight text-foreground md:text-3xl">
          In Their Own Words
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {videos.map((v, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Video placeholder */}
              <div className="relative aspect-video w-full border border-black bg-foreground/5 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  {/* Play button */}
                  <div className="flex h-10 w-10 items-center justify-center border border-[#00b4d8]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <polygon points="4,2 14,8 4,14" fill="#00b4d8" />
                    </svg>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Video Coming Soon
                  </span>
                </div>
              </div>
              {/* Attribution */}
              <div>
                <p className="font-sans text-xs font-bold text-foreground">{v.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {v.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

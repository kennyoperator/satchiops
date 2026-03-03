import Image from "next/image"

export default function CredibilitySection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="border border-black">
          <div className="flex flex-col md:flex-row">
            {/* Photos column */}
            <div className="w-full shrink-0 border-b border-black md:w-72 md:border-b-0 md:border-r">
              <div className="flex flex-col gap-4 p-4">
                <div className="border border-black overflow-hidden">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-02%20at%209.57.46%E2%80%AFAM-rpTOA5JljvWaVK4BMLbAVq91G50Ki5.png"
                      alt="Ken, Growth and AI Systems"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="border border-black overflow-hidden">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jason-bnn6ZDxn9fbf1XuzDx9aLvMR7bntOm.png"
                      alt="Jason, Field Operations and Restoration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy column */}
            <div className="flex-1 p-6">
              <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Who We Are
              </p>
              <h2 className="mb-4 text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
                The Systems Architects for Restoration Operators.
              </h2>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <p>
                  We are a specialized partnership built on 25 plus years of combined experience in growth, marketing, and systems. We have seen the same pattern over and over: solid 10 to 20 truck shops losing money not from bad leads but from missed calls, broken intake, messy job files, and payment delays while agencies ask for more meetings.
                </p>
                <p>
                  Jason is the field side of the equation. He owned and ran a construction and restoration business and knows what actually decides whether you get paid: clean intake, tight dispatch, complete documentation, and carrier proof job files.
                </p>

                {/* IICRC Certifications */}
                <div className="pt-1">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    He is IICRC Certified:
                  </p>
                  <div className="flex items-center gap-3">
                    {/* WRT Badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center border border-black">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 1C7 1 4 5 4 8C4 9.66 5.34 11 7 11C8.66 11 10 9.66 10 8C10 5 7 1 7 1Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                        </svg>
                      </div>
                      <span className="font-sans text-[10px] font-bold tracking-widest text-foreground">WRT</span>
                    </div>
                    {/* ASD Badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center border border-black">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 7C4 5 6 6 7 7C8 8 10 9 12 7" stroke="currentColor" strokeWidth="1" fill="none"/>
                          <path d="M2 4C4 2 6 3 7 4C8 5 10 6 12 4" stroke="currentColor" strokeWidth="1" fill="none"/>
                          <path d="M2 10C4 8 6 9 7 10C8 11 10 12 12 10" stroke="currentColor" strokeWidth="1" fill="none"/>
                        </svg>
                      </div>
                      <span className="font-sans text-[10px] font-bold tracking-widest text-foreground">ASD</span>
                    </div>
                  </div>
                </div>

                <p className="font-semibold text-foreground">
                  We do not sell impressions. We install the infrastructure that plugs the leaks and gets you to cash faster. No middle managers. No fluff reports.
                </p>

                {/* Commitment block */}
                <div className="border border-black p-4 mt-2 space-y-2">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-foreground">
                    My Commitment
                  </p>
                  <p>
                    Most agencies take 6 weeks to onboard. We can rewire your intake and dispatch in under 7 days. Our goal is simple: give local operators national level systems without the slow decision making or corporate nonsense.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

export default function AnnouncementBar() {
  const ticker =
    "CARRIER-READY DATA PROTOCOLS ENABLED  //  IICRC S500 LOGIC ALIGNMENT  //  AUTO-DOCUMENTATION GUARDRAILS: ACTIVE  //  5-DAY DEPLOYMENT STATUS: 2 SLOTS REMAINING"

  return (
    <>
      {/* Territory exclusivity banner */}
      <div className="z-50 border-b border-black bg-background px-4 py-2.5 text-center">
        <p className="font-sans text-[11px] font-black uppercase tracking-widest text-foreground">
          Only 1 Company Per Territory&nbsp;&nbsp;//&nbsp;&nbsp;
          <span className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">
            Check Your Area
          </span>
        </p>
      </div>

      {/* Scrolling ticker */}
      <div className="sticky top-0 z-50 h-10 overflow-hidden border-b border-black bg-foreground">
        <div className="flex h-full items-center whitespace-nowrap">
          <div className="animate-ticker inline-flex">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="mx-12 font-sans text-[10px] font-bold uppercase tracking-widest text-background"
              >
                {ticker}
              </span>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .animate-ticker {
            animation: ticker 30s linear infinite;
          }
        `}</style>
      </div>
    </>
  )
}

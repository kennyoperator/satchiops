import { Check, ArrowRight, FileText, Phone, Clock } from "lucide-react"

const prepItems = [
  {
    icon: FileText,
    label: "Pull your Missed Call Report",
    body: "Log into your LSA or CRM dashboard and grab last month's missed call data. Even an estimate is fine.",
  },
  {
    icon: Phone,
    label: "Know your current call answer rate",
    body: "What percentage of inbound emergency calls does your office actually pick up after hours?",
  },
  {
    icon: Clock,
    label: "Note your average response time",
    body: "How long from first contact to a tech on-site? This number tells us exactly where money is leaking.",
  },
]

export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">

      {/* Top bar */}
      <div className="bg-foreground text-background w-full py-3 px-4 text-center text-[10px] font-bold uppercase tracking-widest">
        Digital Operator
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">

        {/* Confirmed badge */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center bg-foreground shadow-[0_0_24px_rgba(0,0,0,0.2)]">
            <Check className="h-5 w-5 text-background" strokeWidth={3} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Call Confirmed
          </p>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-center text-2xl font-black tracking-tight text-foreground md:text-3xl text-balance">
          You&apos;re Booked. Here&apos;s how to prepare.
        </h1>

        {/* Body copy */}
        <div className="mb-8 border border-border p-5">
          <p className="text-sm leading-relaxed text-foreground">
            I&apos;m looking forward to helping you break that operational ceiling. To make our 15 minutes as productive as possible, please have your Missed Call Report from last month ready.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            Most owners I talk to realize they are &ldquo;donating&rdquo; at least 3–5 high-ticket mitigation jobs a month to their competitors simply because of intake lag. We&apos;re going to stop that on our call.
          </p>
        </div>

        {/* Prep checklist */}
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Before the Call
        </p>
        <div className="mb-8 flex flex-col gap-px bg-border">
          {prepItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-background p-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-foreground">
                <item.icon className="h-3.5 w-3.5 text-background" strokeWidth={2} />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold text-foreground">{item.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What to expect */}
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          What We&apos;ll Cover
        </p>
        <ul className="mb-10 flex flex-col gap-2">
          {[
            "Run a live Missed Call Audit on your LSA spend.",
            "Identify documentation gaps slowing carrier payments.",
            "Map your new 24/7 automated intake workflow.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="text-xs leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>

        {/* Back link */}
        <div className="border-t border-border pt-6 text-center">
          <a
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground underline-offset-4 hover:underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}

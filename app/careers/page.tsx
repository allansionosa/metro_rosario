import {
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { careerOpenings, type CareerOpening } from "@/lib/careers"
import { hospital } from "@/lib/site-data"

const applicationSteps = [
  "Choose the role that matches your background.",
  "Prepare your resume, license or credentials, and certificates.",
  "Submit the application form for secure backend review.",
]

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-extrabold text-slate-700">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-500">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function OpeningCard({ opening }: { opening: CareerOpening }) {
  return (
    <Card
      id={opening.slug}
      className="rounded-sm border-0 bg-white p-0 shadow-[0_14px_28px_rgba(15,23,42,0.08)] ring-0"
    >
      <div className="p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-sm bg-blue-100 text-blue-600">
              <BriefcaseBusiness className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                  {opening.department}
                </span>
                <span className="rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {opening.status}
                </span>
              </div>
              <CardTitle className="mt-3 text-2xl font-extrabold text-neutral-700">
                {opening.title}
              </CardTitle>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                {opening.summary}
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="h-10 rounded bg-blue-600 px-5 text-xs font-bold text-white hover:bg-blue-700"
          >
            <Link href={`/careers/${opening.slug}`}>View & Apply</Link>
          </Button>
        </div>

        <CardContent className="mt-7 grid gap-6 px-0 lg:grid-cols-3">
          <DetailList
            title="What this role supports"
            items={opening.responsibilities}
          />
          <DetailList title="What we look for" items={opening.requirements} />
          <DetailList title="Documents to prepare" items={opening.documents} />
        </CardContent>
      </div>
    </Card>
  )
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Careers"
        eyebrow="Join the Team"
        description={`Build a career in healthcare operations, clinical service, and patient support with ${hospital.shortName}.`}
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Open Applications
              </p>
              <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
                Roles that keep patient care moving.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                These are open application categories for clinical, laboratory,
                finance, and front desk work. Final hiring status, requirements,
                and interview schedules should be confirmed by the receiving
                office.
              </p>
            </div>

            <div className="grid gap-6">
              {careerOpenings.map((opening) => (
                <OpeningCard key={opening.slug} opening={opening} />
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6">
            <Card className="rounded-sm border-0 bg-blue-600 p-7 text-white ring-0">
              <ShieldCheck className="size-10" />
              <CardTitle className="mt-5 text-2xl font-extrabold">
                Application packet
              </CardTitle>
              <CardContent className="mt-5 px-0">
                <ol className="space-y-4 text-sm leading-6 text-blue-50">
                  {applicationSteps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-extrabold text-blue-600">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-0 bg-white p-7 ring-0">
              <MapPin className="size-9 text-blue-600" />
              <CardTitle className="mt-5 text-xl font-extrabold text-neutral-700">
                Work location
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                {hospital.address}
                <br />
                {hospital.email}
              </CardContent>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-600">
                <CheckCircle2 className="size-4 text-blue-600" />
                Applications are reviewed based on current staffing needs.
              </div>
            </Card>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

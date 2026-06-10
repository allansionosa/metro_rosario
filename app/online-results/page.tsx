import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react"
import Link from "next/link"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { onlineResultPortalList } from "@/lib/online-results"
import { hospital } from "@/lib/site-data"

const steps = [
  {
    title: "Choose your portal",
    description:
      "Patients and doctors now have dedicated entry points under Online Results.",
    icon: FileText,
  },
  {
    title: "Sign in securely",
    description:
      "Credentials and result references stay separated by role for clearer access control.",
    icon: ShieldCheck,
  },
  {
    title: "Review released results",
    description:
      "The portal flow keeps patients focused on their own records and doctors focused on assigned reviews.",
    icon: FileText,
  },
]

const portalIcons = {
  patient: UserRound,
  doctor: Stethoscope,
}

export default function OnlineResultsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Online Results"
        eyebrow="Portal Access"
        description={`Access laboratory, ECG, and imaging results from ${hospital.shortName} through dedicated patient and doctor portals.`}
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Secure Access
            </p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
              Select the right results portal.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-500">
              The online-results area now follows the same patient and doctor
              role separation as the reference HMICare portal links, while
              keeping the experience aligned with Metro Rosario&apos;s site.
            </p>
            <div className="mt-8 grid gap-5">
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <Card
                    key={step.title}
                    className="rounded-sm border-0 bg-white p-5 ring-0"
                  >
                    <div className="flex gap-4">
                      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-extrabold text-neutral-700">
                          {step.title}
                        </CardTitle>
                        <CardContent className="mt-2 px-0 text-sm leading-6 text-slate-500">
                          {step.description}
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="grid gap-6">
            {onlineResultPortalList.map((portal) => {
              const Icon = portalIcons[portal.key]

              return (
                <Card
                  key={portal.key}
                  className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="grid size-14 shrink-0 place-items-center rounded-sm bg-blue-100 text-blue-600">
                        <Icon className="size-7" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold tracking-wide text-blue-600 uppercase">
                          {portal.eyebrow}
                        </p>
                        <CardTitle className="mt-2 text-2xl font-extrabold text-neutral-700">
                          {portal.title}
                        </CardTitle>
                        <CardContent className="mt-3 px-0 text-sm leading-7 text-slate-500">
                          {portal.description}
                        </CardContent>
                      </div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="h-11 rounded bg-blue-600 px-6 text-xs font-bold text-white hover:bg-blue-700 sm:shrink-0"
                    >
                      <Link href={portal.route}>
                        Open
                        <ArrowRight
                          className="size-3.5"
                          data-icon="inline-end"
                        />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                    {portal.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-sm bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

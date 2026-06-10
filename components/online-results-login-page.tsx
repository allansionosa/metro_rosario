import {
  ArrowLeft,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react"
import Link from "next/link"

import { OnlineResultsLoginForm } from "@/components/online-results-login-form"
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import type { OnlineResultPortal } from "@/lib/online-results"
import { hospital } from "@/lib/site-data"

function OnlineResultsLoginPage({ portal }: { portal: OnlineResultPortal }) {
  const isDoctor = portal.key === "doctor"
  const PortalIcon = isDoctor ? Stethoscope : UserRound
  const portalLabel = isDoctor ? "doctor" : "patient"
  const redirectPath = isDoctor ? "/doctor-portal" : "/patient-portal"
  const accentClasses = isDoctor
    ? "bg-cyan-50 text-cyan-700 ring-cyan-100"
    : "bg-blue-50 text-blue-700 ring-blue-100"

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title={portal.title}
        eyebrow={portal.eyebrow}
        description={`${portal.description} Portal structure follows the dedicated patient and doctor access pattern used by HMICare.`}
      />

      <section className="bg-slate-100 px-5 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <Link
              href="/online-results"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
            >
              <ArrowLeft className="size-4" />
              Online Results
            </Link>

            <Card className="rounded-sm border-0 bg-white p-7 ring-0">
              <div
                className={`grid size-14 place-items-center rounded-sm ring-1 ${accentClasses}`}
              >
                <PortalIcon className="size-7" />
              </div>
              <CardTitle className="mt-5 text-3xl font-extrabold text-neutral-700">
                {portal.label} Access
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                {portal.supportDescription}
              </CardContent>
              <div className="mt-7 grid gap-3">
                {portal.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-sm bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600"
                  >
                    <ShieldCheck className="size-4 text-blue-600" />
                    {highlight}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-sm border-0 bg-blue-600 p-7 text-white ring-0">
              <FileText className="size-10" />
              <CardTitle className="mt-5 text-xl font-extrabold">
                {portal.supportTitle}
              </CardTitle>
              <CardContent className="mt-3 px-0 text-sm leading-7 text-blue-50">
                Call {hospital.tel} or {hospital.mobile} for verification
                concerns. Bring your request slip, valid ID, or assigned clinic
                credentials when coordinating in person.
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-extrabold text-neutral-700">
                  Sign in to Continue
                </CardTitle>
                <CardContent className="mt-2 px-0 text-sm leading-6 text-slate-500">
                  For this preview, any email address and password opens the
                  {` ${portalLabel} results portal.`}
                </CardContent>
              </div>
              <div className="grid size-11 shrink-0 place-items-center rounded-sm bg-blue-100 text-blue-600">
                <LockKeyhole className="size-5" />
              </div>
            </div>

            <CardContent className="mt-8 px-0">
              <OnlineResultsLoginForm
                portal={portal}
                redirectPath={redirectPath}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

export { OnlineResultsLoginPage }

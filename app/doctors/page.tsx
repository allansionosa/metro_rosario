import { Search, ShieldCheck, UserRoundCheck } from "lucide-react"
import Link from "next/link"

import { DoctorsDirectory } from "@/components/doctors-directory"
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { clinicTeams, doctorProfiles } from "@/lib/doctors"
import { hospital } from "@/lib/site-data"

const visitChecklist = [
  "Call OPD to confirm the doctor is available on your preferred visit date.",
  "Bring previous prescriptions, laboratory results, ECG, X-ray, or referral documents.",
  "Prepare valid ID, HMO or PhilHealth details, and active contact information.",
]

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Doctors"
        eyebrow="Find a Doctor"
        description="Browse doctor profiles, specialties, clinic schedules, and appointment options for Metro Rosario."
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Doctor Directory
              </p>
              <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
                A finished doctor directory preview.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                This preview uses mock doctor profiles where verified roster
                data is not yet available. Replace the mock entries in the
                shared doctors data when the official roster is ready.
              </p>
            </div>

            <Card className="rounded-sm border-0 bg-blue-600 p-7 text-white ring-0">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 size-9 shrink-0" />
                <div>
                  <CardTitle className="text-2xl font-extrabold">
                    Before booking a doctor
                  </CardTitle>
                  <CardContent className="mt-4 px-0">
                    <ul className="space-y-3 text-sm leading-6 text-blue-50">
                      {visitChecklist.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-10 rounded-sm border-0 bg-white p-5 ring-0">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-center gap-3">
                <Search className="size-5 text-blue-600" />
                <div>
                  <p className="text-sm font-extrabold text-neutral-700">
                    Directory status
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Showing {doctorProfiles.length} publicly listed doctor
                    profiles and {clinicTeams.length} clinic team entries.
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-10 rounded border-blue-600 px-5 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <a href={hospital.telHref}>Call to verify schedule</a>
              </Button>
            </div>
          </Card>

          <DoctorsDirectory doctors={doctorProfiles} />

          <Card className="mt-12 rounded-sm border-0 bg-white p-7 ring-0">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-sm bg-blue-100 text-blue-600">
                  <UserRoundCheck className="size-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-extrabold text-neutral-700">
                    Have an updated doctor roster?
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    The page is structured so verified doctor names, photos,
                    schedules, and specialties can be added without changing the
                    layout.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="h-10 rounded bg-blue-600 px-5 text-xs font-bold text-white hover:bg-blue-700"
              >
                <Link href="/contact">Send roster update</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

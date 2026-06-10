import {
  Award,
  Building2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react"
import Image from "next/image"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { hospital, verifiedServices } from "@/lib/site-data"

const profileStats = [
  { value: hospital.beds, label: "listed beds" },
  { value: "Level 1", label: "general hospital" },
  { value: `${verifiedServices.length}`, label: "verified service areas" },
]

const values = [
  {
    title: "Compassionate Care",
    description:
      "Every visit is guided by clear communication, dignity, and steady support for patients and families.",
    icon: HeartPulse,
  },
  {
    title: "Clinical Excellence",
    description:
      "Our teams pair current medical practice with practical systems that help decisions happen quickly.",
    icon: Award,
  },
  {
    title: "Trusted Access",
    description:
      "From HMO processing to appointments and results, patients get simpler paths into the right care.",
    icon: ShieldCheck,
  },
]

const leaders = [
  "Medical Director",
  "Chief Nursing Officer",
  "Hospital Administrator",
  "Board Representative",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title={`About ${hospital.shortName}`}
        eyebrow="About Us"
        description={`${hospital.legalName} is a private Level 1 general hospital serving Rosario, Batangas.`}
      />

      <section id="profile" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Company Profile
            </p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700 md:text-5xl">
              A community hospital profile grounded in public healthcare
              listings.
            </h2>
            <p className="mt-7 text-sm leading-7 text-slate-500">
              {hospital.legalName}, {hospital.formerName.toLowerCase()}, is
              listed as a {hospital.category.toLowerCase()} at{" "}
              {hospital.address}. Public facility directories identify the
              center as a private provider with {hospital.beds} beds.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Its verified service profile includes{" "}
              {verifiedServices.join(", ")}. Patients should call ahead for
              current clinic schedules and OPD instructions.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {profileStats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-sm border-blue-100 bg-blue-50 p-5 text-center ring-0"
                >
                  <CardTitle className="text-3xl font-extrabold text-blue-600">
                    {stat.value}
                  </CardTitle>
                  <CardContent className="mt-2 px-0 text-xs leading-5 font-semibold tracking-wide text-slate-500 uppercase">
                    {stat.label}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-5 -left-5 hidden h-36 w-36 rounded-sm bg-blue-100 lg:block" />
            <Image
              src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1100&q=80"
              alt="Medical team in a hospital corridor"
              width={1100}
              height={820}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="relative h-107.5 w-full rounded-sm object-cover shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
            />
          </div>
        </div>
      </section>

      <section id="mission" className="bg-slate-100 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <Card className="rounded-sm border-0 bg-white p-8 ring-0">
            <Building2 className="size-10 text-blue-600" />
            <CardTitle className="mt-6 text-2xl font-extrabold text-neutral-700">
              History
            </CardTitle>
            <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
              Metro Rosario is publicly listed as formerly Palma-Malaluan
              Hospital, a longtime Rosario, Batangas facility now identified
              under {hospital.legalName}.
            </CardContent>
          </Card>
          <Card className="rounded-sm border-0 bg-blue-600 p-8 text-white ring-0">
            <Stethoscope className="size-10" />
            <CardTitle className="mt-6 text-2xl font-extrabold">
              Vision
            </CardTitle>
            <CardContent className="mt-4 px-0 text-sm leading-7 text-blue-50">
              To remain a trusted local access point for essential hospital,
              diagnostic, maternal, child, and surgical care in Rosario.
            </CardContent>
          </Card>
          <Card className="rounded-sm border-0 bg-white p-8 ring-0">
            <Users className="size-10 text-blue-600" />
            <CardTitle className="mt-6 text-2xl font-extrabold text-neutral-700">
              Mission
            </CardTitle>
            <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
              To provide responsive Level 1 hospital services through clear OPD
              coordination, diagnostic support, and appropriate clinical
              referrals.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              What Guides Us
            </p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
              Values patients can feel in the details.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <Card
                  key={value.title}
                  className="rounded-sm border-slate-200 p-7 ring-0"
                >
                  <Icon className="size-10 text-blue-600" />
                  <CardTitle className="mt-6 text-xl font-extrabold text-neutral-700">
                    {value.title}
                  </CardTitle>
                  <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                    {value.description}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Officers and Board Directors
            </p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
              Leadership and care coordination.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {leaders.map((leader) => (
              <Card
                key={leader}
                className="rounded-sm border-0 bg-white p-6 text-center ring-0"
              >
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="size-8" />
                </div>
                <CardTitle className="mt-5 text-base font-extrabold text-neutral-700">
                  {leader}
                </CardTitle>
                <CardContent className="mt-2 px-0 text-sm text-slate-500">
                  {hospital.shortName}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

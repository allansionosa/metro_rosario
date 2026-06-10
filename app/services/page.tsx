import {
  Activity,
  Baby,
  Beaker,
  Bone,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  PhoneCall,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { hospital } from "@/lib/site-data"

type ServiceGroup = "Laboratory" | "Diagnostics" | "Consultation"

type ServiceArea = {
  title: string
  group: ServiceGroup
  description: string
  includes: string[]
  note: string
  icon: LucideIcon
  accent: string
}

const clinicalChemistryExamples = [
  "Blood sugar and diabetes screening requests",
  "Kidney function and electrolyte-related requests",
  "Liver enzyme and bilirubin-related requests",
  "Lipid profile and cholesterol-related requests",
  "Uric acid and routine chemistry monitoring",
]

const serviceAreas: ServiceArea[] = [
  {
    title: "Clinical Chemistry",
    group: "Laboratory",
    description:
      "Chemistry-based blood testing support for physician-requested screening, monitoring, and follow-up care.",
    includes: clinicalChemistryExamples,
    note: "Ask the laboratory desk about fasting, sample timing, and the exact test menu available on your visit date.",
    icon: Beaker,
    accent: "bg-rose-100 text-rose-600",
  },
  {
    title: "Clinical Microscopy",
    group: "Laboratory",
    description:
      "Microscopy-based laboratory work for samples that need direct examination and clinical correlation.",
    includes: [
      "Urinalysis-related requests",
      "Stool exam-related requests",
      "Sample receiving and release instructions",
    ],
    note: "Bring the physician request and confirm container or collection instructions before submitting a sample.",
    icon: Microscope,
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Hematology Tests",
    group: "Laboratory",
    description:
      "Blood testing support for common physician-requested evaluation and monitoring.",
    includes: [
      "Complete blood count-related requests",
      "Platelet and blood component checks",
      "Repeat testing or follow-up monitoring",
    ],
    note: "Some tests may need a current request slip or physician interpretation after release.",
    icon: Syringe,
    accent: "bg-violet-100 text-violet-600",
  },
  {
    title: "ECG",
    group: "Diagnostics",
    description:
      "Electrocardiogram testing for heart rhythm screening and physician review.",
    includes: [
      "Resting ECG request coordination",
      "Result routing to the requesting physician",
      "Clear next-step instructions after the test",
    ],
    note: "Call ahead to confirm technician availability and preparation instructions.",
    icon: HeartPulse,
    accent: "bg-sky-100 text-sky-600",
  },
  {
    title: "X-ray",
    group: "Diagnostics",
    description:
      "Diagnostic imaging support for physician-requested X-ray examinations.",
    includes: [
      "Imaging request verification",
      "Patient positioning and image capture",
      "Release instructions for films or reports",
    ],
    note: "Bring the request form and ask whether prior images or pregnancy screening details are needed.",
    icon: Activity,
    accent: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "General Medicine",
    group: "Consultation",
    description:
      "Frontline consultation for common symptoms, follow-up concerns, and care routing.",
    includes: [
      "Initial medical assessment",
      "Follow-up consultation",
      "Referral to diagnostics or specialty clinic",
    ],
    note: "Use this option if you are unsure which clinic or test you need.",
    icon: Stethoscope,
    accent: "bg-blue-100 text-blue-600",
  },
  {
    title: "Internal Medicine",
    group: "Consultation",
    description:
      "Adult medical care for ongoing conditions, diagnostic review, and referrals.",
    includes: [
      "Adult illness evaluation",
      "Chronic condition follow-up",
      "Laboratory and imaging result review",
    ],
    note: "Clinic schedules may vary, so confirm the available physician before visiting.",
    icon: ClipboardCheck,
    accent: "bg-amber-100 text-amber-600",
  },
  {
    title: "Obstetrics and Gynecology",
    group: "Consultation",
    description:
      "Maternal and women's health consultations coordinated through clinic schedules.",
    includes: [
      "Women's health consultation",
      "Pregnancy-related clinic coordination",
      "Follow-up and referral instructions",
    ],
    note: "Call ahead for the current OB-Gyne clinic schedule and required records.",
    icon: Baby,
    accent: "bg-pink-100 text-pink-600",
  },
  {
    title: "Pediatrics",
    group: "Consultation",
    description:
      "Child health consultations and follow-up care through the pediatric clinic.",
    includes: [
      "Child illness consultation",
      "Follow-up visit coordination",
      "Parent or guardian instructions",
    ],
    note: "Bring previous records, prescriptions, or lab results when available.",
    icon: Baby,
    accent: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Surgery",
    group: "Consultation",
    description:
      "Surgical assessment and hospital coordination for appropriate cases.",
    includes: [
      "Surgical consultation",
      "Pre-procedure assessment routing",
      "Post-consult instructions",
    ],
    note: "For urgent symptoms, call the hospital desk before using an online request.",
    icon: Bone,
    accent: "bg-orange-100 text-orange-600",
  },
]

const serviceGroups: ServiceGroup[] = [
  "Laboratory",
  "Diagnostics",
  "Consultation",
]

function ServiceCard({ service }: { service: ServiceArea }) {
  const Icon = service.icon

  return (
    <Card className="rounded-sm border-0 bg-white p-0 shadow-[0_14px_28px_rgba(15,23,42,0.08)] ring-0">
      <div className="flex h-full flex-col p-7">
        <div className="flex items-start gap-4">
          <div
            className={`grid size-14 shrink-0 place-items-center rounded-sm ${service.accent}`}
          >
            <Icon className="size-7" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-blue-600 uppercase">
              {service.group}
            </p>
            <CardTitle className="mt-1 text-xl font-extrabold text-neutral-700">
              {service.title}
            </CardTitle>
          </div>
        </div>

        <CardContent className="mt-5 flex flex-1 flex-col px-0">
          <p className="text-sm leading-7 text-slate-500">
            {service.description}
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-sm bg-slate-100 p-4 text-xs leading-5 font-semibold text-slate-500">
            {service.note}
          </p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-6 h-9 w-fit rounded border-blue-600 px-4 text-xs font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Link href="/appointment">Request this service</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

export default function ServicesPage() {
  const featuredService = serviceAreas[0]

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Services"
        eyebrow="Care Areas"
        description={`Verified online listings identify these service areas for ${hospital.name}.`}
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Our Departments
              </p>
              <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
                Find the right desk before you visit.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                The page is organized by how patients usually move through a
                visit: laboratory work, diagnostic procedures, then clinic
                consultation. Call ahead to confirm current availability,
                schedules, and preparation requirements.
              </p>
            </div>

            <Card className="rounded-sm border-0 bg-blue-600 p-7 text-white ring-0">
              <div className="flex items-start gap-4">
                <PhoneCall className="mt-1 size-9 shrink-0" />
                <div>
                  <CardTitle className="text-2xl font-extrabold">
                    Confirm before coming in
                  </CardTitle>
                  <CardContent className="mt-3 px-0 text-sm leading-7 text-blue-50">
                    Call {hospital.tel} or {hospital.mobile} for clinic
                    schedules, lab preparation, HMO coordination, and result
                    release instructions.
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-10 grid overflow-hidden rounded-sm border-0 bg-white p-0 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-blue-600 p-8 text-white">
              <div className="grid size-16 place-items-center rounded-sm bg-white/15">
                <Beaker className="size-9" strokeWidth={1.8} />
              </div>
              <p className="mt-6 text-xs font-bold tracking-wide text-blue-100 uppercase">
                Featured Laboratory Service
              </p>
              <CardTitle className="mt-2 text-3xl font-extrabold">
                {featuredService.title}
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-blue-50">
                {featuredService.description}
              </CardContent>
            </div>
            <div className="p-8">
              <h3 className="text-lg font-extrabold text-neutral-700">
                Common chemistry requests to ask the lab about
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {clinicalChemistryExamples.map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm leading-6 font-semibold text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 font-semibold text-slate-500">
                This is a patient-friendly guide, not a final laboratory menu.
                Bring the physician request and confirm exact availability with
                the laboratory desk.
              </p>
            </div>
          </Card>

          {serviceGroups.map((group) => (
            <section key={group} className="mt-12 first:mt-0">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-extrabold text-neutral-700">
                  {group}
                </h3>
                <span className="rounded-sm bg-white px-3 py-1.5 text-xs font-bold text-slate-500">
                  {
                    serviceAreas.filter((service) => service.group === group)
                      .length
                  }{" "}
                  services
                </span>
              </div>
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {serviceAreas
                  .filter((service) => service.group === group)
                  .map((service) => (
                    <ServiceCard key={service.title} service={service} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

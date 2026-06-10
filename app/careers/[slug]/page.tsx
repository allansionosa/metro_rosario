import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MapPin,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CareersApplicationForm } from "@/components/careers-application-form"
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  careerOpenings,
  getCareerOpening,
  type CareerOpening,
} from "@/lib/careers"
import { hospital } from "@/lib/site-data"

type CareerDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

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

function RoleOverview({ opening }: { opening: CareerOpening }) {
  return (
    <Card className="rounded-sm border-0 bg-white p-0 shadow-[0_14px_28px_rgba(15,23,42,0.08)] ring-0">
      <div className="p-7">
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
              <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {opening.employmentType}
              </span>
            </div>
            <CardTitle className="mt-3 text-3xl font-extrabold text-neutral-700">
              {opening.title}
            </CardTitle>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              {opening.summary}
            </p>
          </div>
        </div>

        <CardContent className="mt-8 grid gap-7 px-0 lg:grid-cols-3">
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

export function generateStaticParams() {
  return careerOpenings.map((opening) => ({
    slug: opening.slug,
  }))
}

export async function generateMetadata({
  params,
}: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const opening = getCareerOpening(slug)

  if (!opening) {
    return {
      title: `Careers | ${hospital.shortName}`,
    }
  }

  return {
    title: `${opening.title} | Careers | ${hospital.shortName}`,
    description: opening.summary,
  }
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params
  const opening = getCareerOpening(slug)

  if (!opening) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title={opening.title}
        eyebrow="Career Application"
        description={opening.summary}
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          <div>
            <Button
              asChild
              variant="link"
              className="mb-7 h-auto p-0 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <Link href="/careers">
                <ArrowLeft className="size-4" data-icon="inline-start" />
                Back to Careers
              </Link>
            </Button>

            <RoleOverview opening={opening} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6">
            <Card
              id="apply"
              className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0"
            >
              <FileText className="size-10 text-blue-600" />
              <CardTitle className="mt-5 text-2xl font-extrabold text-neutral-700">
                Submit application
              </CardTitle>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                This form is for {opening.title}. The role is locked so your
                application is routed correctly.
              </p>
              <CareersApplicationForm
                openings={careerOpenings}
                selectedOpening={opening}
                turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              />
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

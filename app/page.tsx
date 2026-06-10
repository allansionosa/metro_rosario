import {
  Activity,
  Ambulance,
  Bone,
  CalendarDays,
  ChevronRight,
  Clock,
  Navigation,
  Send,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { HomeHeroCarousel } from "@/components/home-hero-carousel"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { hospital, verifiedServices } from "@/lib/site-data"

type Service = {
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

type NewsItem = {
  type: "NEWS" | "EVENTS"
  title: string
  date: string
  summary: string
  image: string
}

const services: Service[] = [
  {
    title: "General Medicine",
    description:
      "Primary outpatient consultation and care routing for common symptoms, follow-up needs, and specialist referrals.",
    icon: Stethoscope,
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Diagnostic Services",
    description:
      "Published services include clinical chemistry, clinical microscopy, hematology tests, ECG, and X-ray.",
    icon: Activity,
    accent: "bg-sky-100 text-sky-600",
  },
  {
    title: "Maternal, Child & Surgical Care",
    description:
      "OB-Gynecology, pediatrics, internal medicine, and surgery are listed among the center's core service areas.",
    icon: Bone,
    accent: "bg-blue-100 text-blue-600",
  },
]

const newsItems: NewsItem[] = [
  {
    type: "NEWS",
    title: "PhilHealth listing identifies Metro Rosario as Level 1",
    date: "March 31, 2026",
    summary:
      "The latest PhilHealth hospital listing includes Metro Rosario Medical Specialists Center, Inc. as a 25-bed Level 1 private facility in Rosario, Batangas.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "EVENTS",
    title: "HMO patients are directed to OPD coordination",
    date: "February 06, 2026",
    summary:
      "Published HMO provider information lists Metro Rosario and directs patients to proceed to OPD for coordination.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "NEWS",
    title: "HealthSpace profile lists verified service areas",
    date: "July 16, 2025",
    summary:
      "The verified HealthSpace profile lists laboratory testing, ECG, X-ray, general medicine, internal medicine, OB-Gynecology, pediatrics, and surgery.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  },
]

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium text-blue-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-4xl font-extrabold text-neutral-700 md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <Card className="min-h-87.5 items-center justify-between rounded-sm border-0 bg-white px-8 py-10 text-center shadow-[0_18px_35px_rgba(15,23,42,0.12)] ring-0">
      <CardContent className="flex h-full flex-col items-center justify-between gap-6 px-0">
        <div className="relative grid size-32 place-items-center">
          <span className="absolute bottom-3 h-16 w-28 rounded-[50%] bg-sky-100" />
          <span
            className={`relative grid size-24 place-items-center rounded-full ${service.accent}`}
          >
            <Icon className="size-12" strokeWidth={1.75} />
          </span>
        </div>
        <div>
          <CardTitle className="text-base font-bold text-blue-600">
            {service.title}
          </CardTitle>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            {service.description}
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 rounded border-blue-600 px-4 text-xs font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <a href="#">
            Learn more
            <ChevronRight className="size-3" data-icon="inline-end" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card className="gap-0 rounded-sm border-0 bg-white p-0 shadow-none ring-0">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute top-2 left-0 px-4 py-2 text-xs font-bold tracking-wide text-white ${
            item.type === "EVENTS" ? "bg-amber-500" : "bg-blue-500"
          }`}
        >
          {item.type}
        </span>
      </div>
      <CardContent className="px-0 py-4">
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <CalendarDays className="size-3" />
          {item.date}
        </p>
        <CardTitle className="mt-2 text-lg font-semibold text-slate-700">
          {item.title}
        </CardTitle>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {item.summary}
        </p>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="mt-4 h-9 rounded border-slate-300 px-4 text-xs font-semibold text-slate-500 hover:border-blue-600 hover:text-blue-600"
        >
          <a
            href={`/news-events/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            Read more
            <ChevronRight className="size-3" data-icon="inline-end" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <HomeHeroCarousel />

      <section id="about" className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_280px_1fr]">
          <div>
            <p className="text-sm font-medium text-blue-600">Welcome to</p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700 md:text-5xl">
              {hospital.name}
            </h2>
            <p className="mt-9 text-sm leading-6 text-slate-500">
              {hospital.legalName} is a private{" "}
              {hospital.category.toLowerCase()} located at {hospital.address}.
              The center is listed with {hospital.beds} beds and provides
              practical hospital access for general medicine, diagnostics,
              maternal and child care, and surgical concerns.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 h-9 rounded bg-blue-600 px-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <a href="#">
                Read More
                <ChevronRight className="size-3" data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div className="mx-auto w-full max-w-72.5 self-end">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=650&q=80"
              alt="Smiling medical professional"
              width={650}
              height={780}
              sizes="(min-width: 1024px) 280px, 80vw"
              className="h-87.5 w-full rounded-sm object-cover object-top"
            />
          </div>

          <aside className="rounded-sm border-2 border-blue-500 p-7">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-blue-600">
              <Clock className="size-4" />
              Opening Hours
            </h3>
            <p className="mt-5 text-sm text-slate-500">
              Hospital desk: {hospital.tel}
              <br />
              Alternate line: {hospital.secondaryTel}
              <br />
              Mobile: {hospital.mobile}
            </p>
            <h3 className="mt-6 flex items-center gap-2 text-sm font-extrabold text-blue-600">
              <Ambulance className="size-4" />
              Specialist Directory
            </h3>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              Service availability can vary by clinic schedule. Call ahead for
              the current doctor schedule, OPD instructions, and document
              requirements.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 h-9 rounded bg-blue-600 px-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <a href="/doctors">
                View all Doctors
                <ChevronRight className="size-3" data-icon="inline-end" />
              </a>
            </Button>
          </aside>
        </div>
      </section>

      <section className="bg-blue-500 text-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          <div className="flex min-h-36 flex-col items-center justify-center px-5 py-8 text-center">
            <h3 className="text-base font-extrabold">Emergency Service</h3>
            <p className="mt-5 text-sm leading-6 font-semibold">
              {hospital.tel}
              <br />
              {hospital.mobile}
              <br />
              {hospital.mobileAlt}
            </p>
          </div>
          <div className="flex min-h-36 flex-col items-center justify-center bg-blue-600 px-5 py-8 text-center">
            <h3 className="text-base font-extrabold">Schedule Appointment</h3>
            <p className="mt-5 text-sm leading-6 font-semibold">
              {hospital.email}
              <br />
              {hospital.hmoInstruction}
            </p>
          </div>
          <div className="flex min-h-36 flex-col items-center justify-center px-5 py-8 text-center">
            <h3 className="flex items-center gap-2 text-base font-extrabold">
              <Navigation className="size-4" />
              Our Location
            </h3>
            <p className="mt-5 text-sm leading-6 font-semibold">
              J. Magtibay St., Barangay D
              <br />
              Rosario, Batangas 4225
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Services"
            description={`Verified online listings include ${verifiedServices.join(", ")}.`}
          />
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="News & Events"
            description="Facility information and patient access notes gathered from current public healthcare listings."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item) => (
              <NewsCard key={`${item.type}-${item.image}`} item={item} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="h-10 rounded bg-blue-600 px-6 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <Link href="/news-events">
                See All News
                <ChevronRight className="size-3" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-cover bg-center px-5 py-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-white/65 backdrop-blur-sm" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden justify-center lg:flex">
            <Image
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=720&q=80"
              alt="Doctor standing with crossed arms"
              width={720}
              height={960}
              sizes="330px"
              className="h-107.5 w-82.5 rounded-sm object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-neutral-700 md:text-5xl">
              Get in touch with Us
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
              Send a general inquiry to the care desk. For faster scheduling,
              include the service you need, your preferred visit date, and any
              HMO or PhilHealth details.
            </p>
            <form className="mt-8 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="h-11 rounded-sm border border-white bg-white px-4 text-sm text-slate-700 ring-blue-500/30 outline-none placeholder:text-slate-400 focus:ring-4"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="h-11 rounded-sm border border-white bg-white px-4 text-sm text-slate-700 ring-blue-500/30 outline-none placeholder:text-slate-400 focus:ring-4"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="h-11 rounded-sm border border-white bg-white px-4 text-sm text-slate-700 ring-blue-500/30 outline-none placeholder:text-slate-400 focus:ring-4"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="rounded-sm border border-white bg-white px-4 py-3 text-sm text-slate-700 ring-blue-500/30 outline-none placeholder:text-slate-400 focus:ring-4"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="inline-flex h-10 items-center gap-2 rounded bg-blue-600 px-6 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Send Message
                  <Send className="size-3.5" data-icon="inline-end" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="h-72 overflow-hidden">
        <iframe
          title="Metro Rosario Medical Specialists Center map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            hospital.mapQuery
          )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <SiteFooter />
    </main>
  )
}

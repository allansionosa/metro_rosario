import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { DesktopNavigation } from "@/components/desktop-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { contactLines, hospital } from "@/lib/site-data"
import { onlineResultPortals } from "@/lib/online-results"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type NavItem = {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "HMO Approval", href: "/hmo-approval" },
  { label: "Appointment", href: "/appointment" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  {
    label: "Online Results",
    href: "/online-results",
    children: [
      {
        label: "Patient",
        href: onlineResultPortals.patient.route,
        description: "Patient result access",
      },
      {
        label: "Doctor",
        href: onlineResultPortals.doctor.route,
        description: "Clinician result review",
      },
    ],
  },
  { label: "News & Events", href: "/news-events" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const footerColumns = [
  {
    title: "About Us",
    links: [
      { label: "History", href: "/about" },
      { label: "Vision & Mission", href: "/about#mission" },
      { label: "Company Profile", href: "/about#profile" },
      { label: "Officers and Board Directors", href: "/about#leadership" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "HMO Approval", href: "/hmo-approval" },
      { label: "Appointment", href: "/appointment" },
      { label: "Online Results", href: "/online-results" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Doctors", href: "/doctors" },
      { label: "News & Events", href: "/news-events" },
      { label: "Careers", href: "/careers" },
    ],
  },
]

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Metro Rosario Medical"
    >
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-full ${
          inverted
            ? "bg-white p-1 shadow-sm ring-1 ring-white/40"
            : "bg-white p-1 ring-1 ring-slate-200"
        }`}
      >
        <Image
          src="/mrmsc_logo.webp"
          alt="Metro Rosario Medical Specialists Center logo"
          width={44}
          height={44}
          className="size-full rounded-full object-contain"
          priority
        />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-lg font-extrabold tracking-wide ${
            inverted ? "text-white" : "text-slate-800"
          }`}
        >
          METRO ROSARIO
        </span>
        <span
          className={`block text-[10px] font-semibold ${
            inverted ? "text-blue-100" : "text-slate-500"
          }`}
        >
          Medical Specialists
        </span>
      </span>
    </Link>
  )
}

function SiteHeader() {
  return (
    <header>
      <div className="bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-5 py-3 text-xs font-semibold">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:items-center lg:gap-8">
            <a
              href={hospital.telHref}
              className="flex min-w-0 items-center gap-2"
            >
              <Phone className="size-4 shrink-0" />
              <span className="min-w-0">
                <span className="block">{hospital.tel}</span>
                <span className="block">{hospital.mobile}</span>
              </span>
            </a>
            <div className="flex min-w-0 items-center gap-2">
              <Clock className="size-4 shrink-0" />
              <span className="min-w-0">
                <span className="block">{hospital.category}</span>
                <span className="block">{hospital.beds} beds</span>
              </span>
            </div>
            <a
              href={hospital.emailHref}
              className="flex min-w-0 items-center gap-2 sm:col-span-2 lg:col-span-1"
            >
              <Mail className="size-4 shrink-0" />
              <span className="min-w-0">
                <span className="block wrap-break-word">{hospital.email}</span>
                <span className="block wrap-break-word">
                  {hospital.hmoInstruction}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-[0_1px_0_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:py-5">
          <Logo />
          <DesktopNavigation items={navItems} />
          <MobileNavigation items={navItems} />
        </div>
      </nav>
    </header>
  )
}

function PageHero({
  title,
  description,
  eyebrow,
}: {
  title: string
  description?: string
  eyebrow?: string
}) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center px-5 py-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=80)",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-950/85 via-blue-800/70 to-sky-500/35" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Breadcrumb className="mb-7 text-white/80">
          <BreadcrumbList className="text-white/80">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-white">
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold tracking-wide text-sky-100 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-5xl leading-none font-extrabold text-white md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-sm leading-7 font-semibold text-blue-50">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-blue-600 px-5 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.35fr_0.65fr_0.65fr_0.65fr]">
        <div>
          <Logo inverted />
          <p className="mt-10 max-w-xl text-sm leading-6 font-medium text-blue-50">
            {hospital.legalName} is a private {hospital.category.toLowerCase()}
            serving patients in Rosario, Batangas, with general medicine,
            diagnostics, maternal and child care, and surgical support.
          </p>
          <address className="mt-8 text-sm leading-7 font-semibold text-blue-50 not-italic">
            <p className="flex items-start gap-2">
              <MapPin className="mt-1 size-4 shrink-0" />
              <span>
                {hospital.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="mt-5 flex items-start gap-2">
              <Phone className="mt-1 size-4" />
              <span>
                {contactLines.slice(0, 2).join(" / ")}
                <br />
                {contactLines.slice(2).join(" / ")}
              </span>
            </p>
            <p className="mt-3 flex items-start gap-2">
              <Mail className="mt-1 size-4" />
              <span>
                {hospital.email}
                <br />
                {hospital.formerName}
              </span>
            </p>
          </address>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-extrabold tracking-wide uppercase">
              {column.title}
            </h3>
            <ul className="mt-10 space-y-6 text-sm font-semibold text-blue-50">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export { Logo, PageHero, SiteFooter, SiteHeader, navItems, type NavItem }

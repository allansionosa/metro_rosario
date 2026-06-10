"use client"

import * as React from "react"
import { CalendarDays, CheckCircle2, Phone, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type DoctorProfile } from "@/lib/doctors"
import { hospital } from "@/lib/site-data"

const DOCTORS_PER_PAGE = 4
const ALL_SPECIALTIES = "all"

function getUniqueSpecialties(doctors: DoctorProfile[]) {
  return Array.from(new Set(doctors.map((doctor) => doctor.specialty))).sort()
}

function DoctorCard({ doctor }: { doctor: DoctorProfile }) {
  return (
    <Card className="grid overflow-hidden rounded-sm border-0 bg-white p-0 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0 md:grid-cols-[260px_1fr]">
      <div className="relative min-h-80 bg-slate-100 md:min-h-full">
        <Image
          src={doctor.image}
          alt={doctor.imageAlt}
          fill
          sizes="(min-width: 768px) 260px, 100vw"
          className="object-cover object-top"
        />
        <span className="absolute top-4 left-4 rounded-sm bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-600">
          Photo placeholder
        </span>
      </div>
      <CardContent className="flex flex-col justify-between p-7">
        <div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-sm px-2.5 py-1 text-xs font-bold ${
                doctor.status === "Mock profile"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {doctor.status}
            </span>
            <span className="rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
              {doctor.specialty}
            </span>
          </div>
          <CardTitle className="mt-4 text-3xl font-extrabold text-neutral-700">
            {doctor.name}
          </CardTitle>
          <p className="mt-2 text-sm font-bold text-blue-600">{doctor.title}</p>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            {doctor.profileNote}
          </p>

          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-sm bg-slate-100 p-4">
              <p className="flex items-center gap-2 font-bold text-slate-700">
                <CalendarDays className="size-4 text-blue-600" />
                Schedule
              </p>
              <p className="mt-1 leading-6 text-slate-500">{doctor.schedule}</p>
            </div>
            <div className="rounded-sm bg-slate-100 p-4">
              <p className="flex items-center gap-2 font-bold text-slate-700">
                <Phone className="size-4 text-blue-600" />
                Contact
              </p>
              <p className="mt-1 leading-6 text-slate-500">{doctor.contact}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-extrabold text-slate-700">
              Common visit reasons
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-500 sm:grid-cols-2">
              {doctor.services.map((service) => (
                <li key={service} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Button
            asChild
            size="lg"
            className="h-10 rounded bg-blue-600 text-xs font-bold text-white hover:bg-blue-700"
          >
            <Link href="/appointment">Request Appointment</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-10 rounded border-blue-600 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <a href={hospital.telHref}>
              <Phone className="size-3.5" data-icon="inline-start" />
              Call OPD
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DoctorsDirectory({ doctors }: { doctors: DoctorProfile[] }) {
  const [nameQuery, setNameQuery] = React.useState("")
  const [specialty, setSpecialty] = React.useState(ALL_SPECIALTIES)
  const [currentPage, setCurrentPage] = React.useState(1)
  const specialties = React.useMemo(
    () => getUniqueSpecialties(doctors),
    [doctors]
  )

  const filteredDoctors = React.useMemo(() => {
    const normalizedQuery = nameQuery.trim().toLowerCase()

    return doctors.filter((doctor) => {
      const matchesName =
        !normalizedQuery ||
        doctor.name.toLowerCase().includes(normalizedQuery) ||
        doctor.title.toLowerCase().includes(normalizedQuery)
      const matchesSpecialty =
        specialty === ALL_SPECIALTIES || doctor.specialty === specialty

      return matchesName && matchesSpecialty
    })
  }, [doctors, nameQuery, specialty])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE)
  )
  const pageStartIndex = (currentPage - 1) * DOCTORS_PER_PAGE
  const visibleDoctors = filteredDoctors.slice(
    pageStartIndex,
    pageStartIndex + DOCTORS_PER_PAGE
  )
  const hasActiveFilters = nameQuery.trim() || specialty !== ALL_SPECIALTIES

  function clearFilters() {
    setNameQuery("")
    setSpecialty(ALL_SPECIALTIES)
    setCurrentPage(1)
  }

  function handleNameQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNameQuery(event.target.value)
    setCurrentPage(1)
  }

  function handleSpecialtyChange(value: string) {
    setSpecialty(value)
    setCurrentPage(1)
  }

  return (
    <section>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="text-2xl font-extrabold text-neutral-700">
            Publicly Listed Doctors
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Showing {filteredDoctors.length} of {doctors.length} profiles.
          </p>
        </div>
        <span className="w-fit rounded-sm bg-white px-3 py-1.5 text-xs font-bold text-slate-500">
          Preview roster
        </span>
      </div>

      <Card className="mb-7 rounded-sm border-0 bg-white p-5 ring-0">
        <div className="grid gap-4 lg:grid-cols-[1fr_260px_auto] lg:items-end">
          <div className="grid gap-2">
            <Label htmlFor="doctor-name-search" className="font-bold">
              Search by name
            </Label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="doctor-name-search"
                value={nameQuery}
                onChange={handleNameQueryChange}
                placeholder="Search doctor name or title"
                className="h-11 rounded-sm bg-white pl-9"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="specialty-filter" className="font-bold">
              Specialty
            </Label>
            <Select value={specialty} onValueChange={handleSpecialtyChange}>
              <SelectTrigger
                id="specialty-filter"
                className="h-11 w-full rounded-sm bg-white"
              >
                <SelectValue placeholder="All specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_SPECIALTIES}>All specialties</SelectItem>
                {specialties.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={!hasActiveFilters}
            onClick={clearFilters}
            className="h-11 rounded border-slate-300 px-5 text-xs font-bold text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-40"
          >
            Clear filters
            <X className="size-3.5" data-icon="inline-end" />
          </Button>
        </div>
      </Card>

      {visibleDoctors.length ? (
        <div className="grid gap-7 lg:grid-cols-2">
          {visibleDoctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <Card className="rounded-sm border-0 bg-white p-10 text-center ring-0">
          <CardTitle className="text-2xl font-extrabold text-neutral-700">
            No doctors found
          </CardTitle>
          <CardContent className="mt-3 px-0 text-sm leading-7 text-slate-500">
            Try a different name or specialty filter.
          </CardContent>
          <Button
            type="button"
            onClick={clearFilters}
            className="mt-5 h-10 rounded bg-blue-600 px-5 text-xs font-bold text-white hover:bg-blue-700"
          >
            Reset Directory
          </Button>
        </Card>
      )}

      <nav
        className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-7 sm:flex-row"
        aria-label="Doctor directory pagination"
      >
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          className="h-10 rounded border-slate-300 px-5 text-xs font-bold text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-40"
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1
            const isCurrentPage = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                type="button"
                variant={isCurrentPage ? "default" : "outline"}
                size="icon-lg"
                onClick={() => setCurrentPage(pageNumber)}
                aria-current={isCurrentPage ? "page" : undefined}
                aria-label={`Go to doctors page ${pageNumber}`}
                className={`rounded text-xs font-bold ${
                  isCurrentPage
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-slate-300 text-slate-500 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          className="h-10 rounded border-slate-300 px-5 text-xs font-bold text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-40"
        >
          Next
        </Button>
      </nav>
    </section>
  )
}

export { DoctorsDirectory }

"use client"

import * as React from "react"
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  FolderOpen,
  LogOut,
  Search,
  Stethoscope,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { hospital } from "@/lib/site-data"

type PatientResult = {
  id: string
  examination: string
  dateReleased: string
  fileHref: string
}

type DoctorPatient = {
  patientNumber: string
  patientName: string
  results: PatientResult[]
}

const doctorPatients: DoctorPatient[] = [
  {
    patientNumber: "TEST20001479",
    patientName: "John Brown",
    results: [
      {
        id: "TEST20001479",
        examination: "Radiology/Imaging",
        dateReleased: "Feb 12, 2023",
        fileHref: "/TEST20001479.pdf",
      },
      {
        id: "TEST20001479",
        examination: "Radiology/Imaging",
        dateReleased: "Feb 12, 2023",
        fileHref: "/TEST20001479.pdf",
      },
      {
        id: "TEST20001479",
        examination: "Radiology/Imaging",
        dateReleased: "Feb 12, 2023",
        fileHref: "/TEST20001479.pdf",
      },
    ],
  },
  {
    patientNumber: "TEST20001479",
    patientName: "Jim Green",
    results: [
      {
        id: "TEST20001479",
        examination: "Radiology/Imaging",
        dateReleased: "Feb 12, 2023",
        fileHref: "/TEST20001479.pdf",
      },
      {
        id: "TEST20001479",
        examination: "Radiology/Imaging",
        dateReleased: "Feb 12, 2023",
        fileHref: "/TEST20001479.pdf",
      },
    ],
  },
]

function ResultsDrawer({ patient }: { patient: DoctorPatient }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800"
          title={`Open ${patient.patientName} results`}
        >
          <FolderOpen className="size-4" />
          <span className="sr-only">Open {patient.patientName} results</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[74vh] min-h-[430px] gap-0 overflow-hidden border-slate-200 bg-white p-0"
      >
        <SheetHeader className="flex-row items-center gap-4 border-b border-slate-100 px-5 py-4 text-left">
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close patient results"
            >
              <X className="size-5" />
            </Button>
          </SheetClose>
          <div className="min-w-0">
            <SheetTitle className="truncate text-base font-extrabold text-slate-900">
              {patient.patientName}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Released diagnostic results for {patient.patientName}.
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-5 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-xs font-extrabold tracking-wide text-slate-700 uppercase">
                    <th scope="col" className="px-5 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Examination
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Date Released
                    </th>
                    <th scope="col" className="w-28 px-5 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patient.results.map((result, index) => (
                    <tr
                      key={`${result.id}-${index}`}
                      className="border-b border-slate-100 transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        <span className="inline-flex items-center gap-2">
                          <FileText className="size-4 text-blue-600" />
                          {result.id}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {result.examination}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="size-4 text-slate-400" />
                          {result.dateReleased}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="rounded-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                          title={`View ${result.id} PDF`}
                        >
                          <a
                            href={result.fileHref}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${result.id} PDF`}
                          >
                            <Eye className="size-4" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4">
              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled
                      aria-label="Previous page"
                      className="rounded-sm"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      onClick={(event) => event.preventDefault()}
                      className="rounded-sm border-blue-500 text-blue-700"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled
                      aria-label="Next page"
                      className="rounded-sm"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DoctorResultsPortal({
  initialEmail = "doctor@example.com",
}: {
  initialEmail?: string
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const email = initialEmail || "doctor@example.com"

  const filteredPatients = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return doctorPatients
    }

    return doctorPatients.filter((patient) =>
      [patient.patientNumber, patient.patientName].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    )
  }, [query])

  function handleSignOut() {
    window.sessionStorage.removeItem("onlineResultsEmail")
    window.sessionStorage.removeItem("onlineResultsPortal")
    router.push("/online-results/doctor")
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-[0_1px_12px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label={hospital.name}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white p-1 ring-1 ring-slate-200">
              <Image
                src="/mrmsc_logo.webp"
                alt="Metro Rosario Medical Specialists Center logo"
                width={44}
                height={44}
                className="size-full rounded-full object-contain"
                priority
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-base font-extrabold tracking-wide text-slate-800 sm:text-lg">
                METRO ROSARIO
              </span>
              <span className="block truncate text-[10px] font-semibold text-blue-600">
                Medical Specialists
              </span>
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 min-w-0 rounded-sm px-3 text-slate-700 hover:bg-slate-100"
              >
                <span className="max-w-[9rem] truncate text-sm font-semibold sm:max-w-xs">
                  {email}
                </span>
                <ChevronDown className="size-4" data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem className="min-w-0 text-slate-600">
                <Stethoscope className="size-4" />
                <span className="truncate">{email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                onSelect={handleSignOut}
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="px-5 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold tracking-wide text-blue-600 uppercase">
                Doctor Portal
              </p>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Assigned Patients
              </h1>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search patients"
                className="h-10 rounded-sm bg-white pl-9"
                aria-label="Search assigned patients"
              />
            </div>
          </div>

          <Card className="rounded-sm border-0 bg-white py-0 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80">
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-xs font-extrabold tracking-wide text-slate-700 uppercase">
                      <th scope="col" className="px-5 py-4">
                        Patient Number
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Patient Name
                      </th>
                      <th scope="col" className="w-28 px-5 py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient, index) => (
                        <tr
                          key={`${patient.patientNumber}-${patient.patientName}-${index}`}
                          className="border-b border-slate-100 transition hover:bg-slate-50/80"
                        >
                          <td className="px-5 py-4 font-semibold text-slate-700">
                            {patient.patientNumber}
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            {patient.patientName}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <ResultsDrawer patient={patient} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-5 py-14 text-center text-sm font-semibold text-slate-500"
                        >
                          No assigned patients match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  Showing {filteredPatients.length} of {doctorPatients.length}{" "}
                  assigned patients
                </p>

                <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled
                        aria-label="Previous page"
                        className="rounded-sm"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive
                        onClick={(event) => event.preventDefault()}
                        className="rounded-sm border-blue-500 text-blue-700"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled
                        aria-label="Next page"
                        className="rounded-sm"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export { DoctorResultsPortal }

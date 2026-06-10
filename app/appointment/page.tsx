import { CalendarCheck2, Clock3, Stethoscope } from "lucide-react"
import Link from "next/link"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { hospital, verifiedServices } from "@/lib/site-data"

const services = [
  "General Consultation",
  "Laboratory Request",
  "ECG",
  "X-ray",
  "OB-Gynecology",
  "Pediatrics",
  "Surgery",
  ...verifiedServices.filter(
    (service) =>
      ![
        "ECG",
        "General Medicine",
        "Obstetrics and Gynecology",
        "Pediatrics",
        "Surgery",
        "X-ray",
      ].includes(service)
  ),
]

const physicians = [
  "Any available physician",
  "General Medicine clinic",
  "Internal Medicine clinic",
  "OB-Gynecology clinic",
  "Pediatrics clinic",
  "Surgery clinic",
]

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-sm bg-white"
      />
    </div>
  )
}

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Online Appointment"
        eyebrow="Book a Visit"
        description={`Request a schedule for ${hospital.shortName}. The clinic team can confirm current doctor availability and OPD instructions.`}
      />

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0">
            <CardTitle className="text-2xl font-extrabold text-neutral-700">
              Appointment Details
            </CardTitle>
            <CardContent className="mt-8 px-0">
              <form className="grid gap-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    id="preferred-date"
                    label="Preferred Date & Time"
                    type="datetime-local"
                  />
                  <div className="grid gap-2">
                    <Label
                      htmlFor="service"
                      className="text-sm font-bold text-slate-700"
                    >
                      Services
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="service"
                        className="h-11 w-full rounded-sm bg-white"
                      >
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="physician"
                    className="text-sm font-bold text-slate-700"
                  >
                    Preferred Physician
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="physician"
                      className="h-11 w-full rounded-sm bg-white"
                    >
                      <SelectValue placeholder="Select physician" />
                    </SelectTrigger>
                    <SelectContent>
                      {physicians.map((physician) => (
                        <SelectItem key={physician} value={physician}>
                          {physician}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-lg font-extrabold text-neutral-700">
                    Personal Details
                  </h2>
                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <Field id="first-name" label="First Name" />
                    <Field id="middle-name" label="Middle Name" />
                    <Field id="last-name" label="Last Name" />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field id="date-of-birth" label="Date of Birth" type="date" />
                  <Field
                    id="contact-number"
                    label="Contact No."
                    type="tel"
                    placeholder="+63"
                  />
                </div>
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                />
                <div className="grid gap-2">
                  <Label htmlFor="notes" className="text-sm font-bold">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Share symptoms, referral details, or scheduling notes."
                    className="min-h-28 rounded-sm bg-white"
                  />
                </div>
                <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                  <Checkbox className="mt-1" />
                  <span>
                    I agree to the{" "}
                    <Link href="#" className="font-semibold text-blue-600">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-semibold text-blue-600">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 rounded bg-blue-600 px-8 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    Submit Appointment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-sm border-0 bg-blue-600 p-8 text-white ring-0">
              <CalendarCheck2 className="size-12" />
              <CardTitle className="mt-6 text-3xl font-extrabold">
                Confirmation within the day
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-blue-50">
                Requests are reviewed by our appointment desk. A coordinator
                will contact you to confirm the final schedule or offer the
                nearest available option.
              </CardContent>
            </Card>
            <Card className="rounded-sm border-0 bg-slate-100 p-8 ring-0">
              <Clock3 className="size-10 text-blue-600" />
              <CardTitle className="mt-5 text-xl font-extrabold text-neutral-700">
                Clinic Hours
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                Public listings do not publish a complete clinic schedule. Call{" "}
                {hospital.tel} or {hospital.mobile} before visiting to confirm
                current service availability.
              </CardContent>
            </Card>
            <Card className="rounded-sm border-0 bg-slate-100 p-8 ring-0">
              <Stethoscope className="size-10 text-blue-600" />
              <CardTitle className="mt-5 text-xl font-extrabold text-neutral-700">
                Specialist Support
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                If you are unsure which service to choose, select general
                consultation and the OPD team can route your request.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

import { FileCheck2, ShieldCheck, UploadCloud } from "lucide-react"
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
import { hospital } from "@/lib/site-data"

const hmoProviders = [
  "PhilHealth",
  "Kaiser International Healthgroup",
  "EastWest Healthcare",
  "AXA Global Health Access",
  "Other / for verification",
]

function TextField({
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

function UploadField({ id, label }: { id: string; label: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}
      </Label>
      <div className="rounded-sm border border-dashed border-blue-300 bg-blue-50/70 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
          <UploadCloud className="size-4" />
          Upload document
        </div>
        <Input
          id={id}
          type="file"
          className="h-10 rounded-sm border-blue-100 bg-white"
        />
      </div>
    </div>
  )
}

export default function HmoApprovalPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="HMO Online Approval"
        eyebrow="Patient Access"
        description={`Send your HMO or PhilHealth details ahead of your visit. Published provider information for ${hospital.shortName} directs patients to proceed to OPD.`}
      />

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Card className="rounded-sm border-0 bg-blue-600 p-8 text-white ring-0">
              <ShieldCheck className="size-12" />
              <CardTitle className="mt-6 text-3xl font-extrabold">
                Prepare before your visit
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-blue-50">
                Submit your coverage information before visiting, then confirm
                final instructions with the OPD desk. HMO provider directories
                list Metro Rosario with OPD coordination.
              </CardContent>
            </Card>
            <Card className="rounded-sm border-0 bg-white p-8 ring-0">
              <FileCheck2 className="size-10 text-blue-600" />
              <CardTitle className="mt-5 text-xl font-extrabold text-neutral-700">
                What to prepare
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                Keep a copy of your valid ID, your physical or virtual health
                card, company information, and active contact details nearby.
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0">
            <CardTitle className="text-2xl font-extrabold text-neutral-700">
              Request Form
            </CardTitle>
            <CardContent className="mt-8 px-0">
              <form className="grid gap-6">
                <div className="grid gap-5 md:grid-cols-3">
                  <TextField id="first-name" label="First Name" />
                  <TextField id="middle-name" label="Middle Name" />
                  <TextField id="last-name" label="Last Name" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    id="date-of-birth"
                    label="Date of Birth"
                    type="date"
                  />
                  <TextField
                    id="contact-number"
                    label="Contact No."
                    type="tel"
                    placeholder="+63"
                  />
                </div>
                <TextField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="hmo-provider"
                      className="text-sm font-bold text-slate-700"
                    >
                      HMO Provider
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="hmo-provider"
                        className="h-11 w-full rounded-sm bg-white"
                      >
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {hmoProviders.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <TextField id="company" label="Company" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <UploadField id="health-card" label="Health Card" />
                  <UploadField id="valid-id" label="Valid ID" />
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
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

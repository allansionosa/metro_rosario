import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { hospital } from "@/lib/site-data"

const contactCards = [
  {
    title: "Emergency Service",
    detail: hospital.tel,
    support: `${hospital.mobile} / ${hospital.mobileAlt}`,
    icon: Phone,
  },
  {
    title: "Email",
    detail: hospital.email,
    support: hospital.formerName,
    icon: Mail,
  },
  {
    title: "Facility Type",
    detail: hospital.category,
    support: `${hospital.beds} listed beds`,
    icon: Clock,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="Contact"
        eyebrow="Get in Touch"
        description="Reach the care desk for appointments, HMO questions, directions, and general patient concerns."
      />

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
              Contact Details
            </p>
            <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
              We will route your message to the right desk.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Use the form for general inquiries. For urgent concerns, call the
              hospital desk so the team can respond faster.
            </p>
            <div className="mt-8 grid gap-5">
              {contactCards.map((item) => {
                const Icon = item.icon

                return (
                  <Card
                    key={item.title}
                    className="rounded-sm border-0 bg-slate-100 p-6 ring-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-extrabold text-neutral-700">
                          {item.title}
                        </CardTitle>
                        <CardContent className="mt-2 px-0 text-sm leading-6 text-slate-500">
                          {item.detail}
                          <br />
                          {item.support}
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Card className="rounded-sm border-0 bg-white p-7 shadow-[0_18px_35px_rgba(15,23,42,0.10)] ring-0">
            <CardTitle className="text-2xl font-extrabold text-neutral-700">
              Send a Message
            </CardTitle>
            <CardContent className="mt-8 px-0">
              <form className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name" className="font-bold">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      className="h-11 rounded-sm bg-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name" className="font-bold">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      className="h-11 rounded-sm bg-white"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-bold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-11 rounded-sm bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject" className="font-bold">
                    Subject
                  </Label>
                  <Input id="subject" className="h-11 rounded-sm bg-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="font-bold">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    className="min-h-36 rounded-sm bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 rounded bg-blue-600 px-8 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Send Message
                  <Send className="size-3.5" data-icon="inline-end" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <MapPin className="size-6 text-blue-600" />
            <h2 className="text-3xl font-extrabold text-neutral-700">
              Visit {hospital.shortName}
            </h2>
          </div>
          <div className="h-96 overflow-hidden rounded-sm shadow-[0_18px_35px_rgba(15,23,42,0.12)]">
            <iframe
              title="Metro Rosario Medical Specialists Center map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                hospital.mapQuery
              )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

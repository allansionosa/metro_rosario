"use client"

import * as React from "react"
import Script from "next/script"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type CareerOpening } from "@/lib/careers"

type CareersApplicationFormProps = {
  openings: CareerOpening[]
  selectedOpening?: CareerOpening
  turnstileSiteKey?: string
}

type SubmissionState = {
  type: "idle" | "success" | "error"
  message?: string
}

function CareersApplicationForm({
  openings,
  selectedOpening,
  turnstileSiteKey,
}: CareersApplicationFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submissionState, setSubmissionState] = React.useState<SubmissionState>(
    { type: "idle" }
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmissionState({ type: "idle" })

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      })
      const result = (await response.json()) as {
        ok?: boolean
        message?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Application could not be submitted.")
      }

      form.reset()
      window.turnstile?.reset()
      setSubmissionState({
        type: "success",
        message:
          result.message ??
          "Application submitted. The team will review the details.",
      })
    } catch (error) {
      window.turnstile?.reset()
      setSubmissionState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Application could not be submitted.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CardContent className="mt-6 px-0">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5">
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="company-website">Company Website</Label>
          <Input
            id="company-website"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="full-name" className="font-bold">
            Full Name
          </Label>
          <Input
            id="full-name"
            name="fullName"
            required
            autoComplete="name"
            className="h-11 rounded-sm bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-bold">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-sm bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mobile" className="font-bold">
            Mobile Number
          </Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+63"
            className="h-11 rounded-sm bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role" className="font-bold">
            Role Interested In
          </Label>
          {selectedOpening ? (
            <>
              <Input
                id="role"
                value={selectedOpening.title}
                readOnly
                className="h-11 rounded-sm bg-slate-100 font-semibold text-slate-700"
              />
              <input type="hidden" name="role" value={selectedOpening.title} />
            </>
          ) : (
            <select
              id="role"
              name="role"
              required
              className="h-11 rounded-sm border border-input bg-white px-3 text-sm text-slate-700 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              {openings.map((opening) => (
                <option key={opening.slug} value={opening.title}>
                  {opening.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="experience" className="font-bold">
            Years of Relevant Experience
          </Label>
          <Input
            id="experience"
            name="experience"
            className="h-11 rounded-sm bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="license" className="font-bold">
            License or Credential Details
          </Label>
          <Input
            id="license"
            name="license"
            placeholder="PRC number, certification, or N/A"
            className="h-11 rounded-sm bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="resume" className="font-bold">
            Resume or CV
          </Label>
          <Input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="h-11 rounded-sm bg-white"
          />
          <p className="text-xs leading-5 text-slate-500">
            Accepted formats: PDF, DOC, DOCX. Maximum file size: 5 MB.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message" className="font-bold">
            Short Message
          </Label>
          <Textarea
            id="message"
            name="message"
            className="min-h-28 rounded-sm bg-white"
          />
        </div>

        {turnstileSiteKey ? (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-action="career_application"
          />
        ) : (
          <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-xs leading-5 font-semibold text-amber-800">
            Captcha is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and
            TURNSTILE_SECRET_KEY before accepting production applications.
          </div>
        )}

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
          <Checkbox name="consent" required className="mt-1" />
          <span>
            I consent to being contacted about my application and confirm that
            the information submitted is accurate.
          </span>
        </label>

        {submissionState.message ? (
          <div
            className={`rounded-sm p-4 text-sm leading-6 font-semibold ${
              submissionState.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
            role="status"
          >
            {submissionState.message}
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-11 rounded bg-blue-600 px-8 text-xs font-bold text-white hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
          <Send className="size-3.5" data-icon="inline-end" />
        </Button>
      </form>
    </CardContent>
  )
}

declare global {
  interface Window {
    turnstile?: {
      reset: () => void
    }
  }
}

export { CareersApplicationForm }

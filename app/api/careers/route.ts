import { NextResponse, type NextRequest } from "next/server"

import { careerOpenings } from "@/lib/careers"

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_ATTEMPTS = 5
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

type RateLimitEntry = {
  count: number
  resetAt: number
}

type TurnstileResponse = {
  success: boolean
  "error-codes"?: string[]
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status })
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  )
}

function checkRateLimit(ip: string) {
  const now = Date.now()
  const currentEntry = rateLimitStore.get(ip)

  if (!currentEntry || currentEntry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false
  }

  currentEntry.count += 1
  return true
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function validateTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return {
      success: false,
      "error-codes": ["missing-server-secret"],
    } satisfies TurnstileResponse
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: remoteIp,
          idempotency_key: crypto.randomUUID(),
        }),
      }
    )

    return (await response.json()) as TurnstileResponse
  } catch {
    return {
      success: false,
      "error-codes": ["internal-error"],
    } satisfies TurnstileResponse
  }
}

async function forwardCareerApplication({
  fullName,
  email,
  mobile,
  role,
  experience,
  license,
  message,
  resume,
}: {
  fullName: string
  email: string
  mobile: string
  role: string
  experience: string
  license: string
  message: string
  resume: File
}) {
  // Wire your mail provider here. Keep this function server-side only so API
  // keys and recipient routing rules never reach the browser.
  void {
    fullName,
    email,
    mobile,
    role,
    experience,
    license,
    message,
    resumeName: resume.name,
    resumeType: resume.type,
    resumeSize: resume.size,
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (!checkRateLimit(ip)) {
    return jsonError("Too many submissions. Please try again later.", 429)
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return jsonError("Invalid application form data.", 400)
  }
  const honeypot = getString(formData, "companyWebsite")

  if (honeypot) {
    return jsonError("Application could not be submitted.", 400)
  }

  const fullName = getString(formData, "fullName")
  const email = getString(formData, "email")
  const mobile = getString(formData, "mobile")
  const role = getString(formData, "role")
  const experience = getString(formData, "experience")
  const license = getString(formData, "license")
  const message = getString(formData, "message")
  const consent = formData.get("consent")
  const turnstileToken = getString(formData, "cf-turnstile-response")
  const resume = formData.get("resume")

  if (!fullName || fullName.length > 120) {
    return jsonError("Please enter a valid full name.", 400)
  }

  if (!isValidEmail(email) || email.length > 160) {
    return jsonError("Please enter a valid email address.", 400)
  }

  if (!mobile || mobile.length > 40) {
    return jsonError("Please enter a valid mobile number.", 400)
  }

  if (!careerOpenings.some((opening) => opening.title === role)) {
    return jsonError("Please select a valid role.", 400)
  }

  if (experience.length > 80 || license.length > 120 || message.length > 1200) {
    return jsonError(
      "Some fields are too long. Please shorten your entry.",
      400
    )
  }

  if (consent !== "on") {
    return jsonError("Consent is required before submitting.", 400)
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return jsonError("Please attach your resume or CV.", 400)
  }

  if (resume.size > MAX_RESUME_SIZE_BYTES) {
    return jsonError("Resume must be 5 MB or smaller.", 400)
  }

  if (!allowedResumeTypes.has(resume.type)) {
    return jsonError("Resume must be a PDF, DOC, or DOCX file.", 400)
  }

  if (!turnstileToken) {
    return jsonError("Captcha verification is required.", 400)
  }

  const turnstileResult = await validateTurnstile(turnstileToken, ip)

  if (!turnstileResult.success) {
    return jsonError("Captcha verification failed. Please try again.", 400)
  }

  await forwardCareerApplication({
    fullName,
    email,
    mobile,
    role,
    experience,
    license,
    message,
    resume,
  })

  return NextResponse.json({
    ok: true,
    message: "Application submitted. The team will review the details.",
  })
}

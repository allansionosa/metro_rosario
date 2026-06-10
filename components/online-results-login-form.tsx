"use client"

import * as React from "react"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { OnlineResultPortal } from "@/lib/online-results"

type OnlineResultsLoginFormProps = {
  portal: OnlineResultPortal
  redirectPath: string
}

function OnlineResultsLoginForm({
  portal,
  redirectPath,
}: OnlineResultsLoginFormProps) {
  const router = useRouter()
  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const identifier = String(formData.get("identifier") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!identifier || !password) {
      setError("Enter an email and password to continue.")
      return
    }

    setError("")
    setIsSubmitting(true)

    window.sessionStorage.setItem("onlineResultsEmail", identifier)
    window.sessionStorage.setItem("onlineResultsPortal", portal.key)
    router.push(`${redirectPath}?email=${encodeURIComponent(identifier)}`)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label
          htmlFor={`${portal.key}-identifier`}
          className="text-sm font-bold text-slate-700"
        >
          {portal.identifierLabel}
        </Label>
        <Input
          id={`${portal.key}-identifier`}
          name="identifier"
          type="email"
          required
          autoComplete="username"
          placeholder={portal.identifierPlaceholder}
          className="h-11 rounded-sm bg-white"
        />
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor={`${portal.key}-password`}
          className="text-sm font-bold text-slate-700"
        >
          {portal.passwordLabel}
        </Label>
        <PasswordInput
          id={`${portal.key}-password`}
          name="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-sm bg-white"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label
          htmlFor={`${portal.key}-remember`}
          className="flex items-center gap-3 text-sm font-semibold text-slate-600"
        >
          <Checkbox id={`${portal.key}-remember`} />
          Remember this device
        </label>
        <a
          href="#"
          className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          {portal.forgotLabel}
        </a>
      </div>

      {error ? (
        <p className="rounded-sm bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-2 h-11 rounded bg-blue-600 px-8 text-xs font-bold text-white hover:bg-blue-700"
      >
        {isSubmitting ? "Opening Portal" : "Sign In"}
        <LogIn className="size-3.5" data-icon="inline-end" />
      </Button>
    </form>
  )
}

export { OnlineResultsLoginForm }

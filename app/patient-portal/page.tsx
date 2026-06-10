import { PatientResultsPortal } from "@/components/patient-results-portal"
import { hospital } from "@/lib/site-data"

export const metadata = {
  title: `Patient Results Portal | ${hospital.shortName}`,
  description: `Released patient results for ${hospital.legalName}.`,
}

type PatientPortalPageProps = {
  searchParams: Promise<{
    email?: string | string[]
  }>
}

export default async function PatientPortalPage({
  searchParams,
}: PatientPortalPageProps) {
  const params = await searchParams
  const initialEmail = Array.isArray(params.email)
    ? params.email[0]
    : params.email

  return <PatientResultsPortal initialEmail={initialEmail} />
}

import { DoctorResultsPortal } from "@/components/doctor-results-portal"
import { hospital } from "@/lib/site-data"

export const metadata = {
  title: `Doctor Results Portal | ${hospital.shortName}`,
  description: `Assigned patient results for ${hospital.legalName}.`,
}

type DoctorPortalPageProps = {
  searchParams: Promise<{
    email?: string | string[]
  }>
}

export default async function DoctorPortalPage({
  searchParams,
}: DoctorPortalPageProps) {
  const params = await searchParams
  const initialEmail = Array.isArray(params.email)
    ? params.email[0]
    : params.email

  return <DoctorResultsPortal initialEmail={initialEmail} />
}

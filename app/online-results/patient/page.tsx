import { OnlineResultsLoginPage } from "@/components/online-results-login-page"
import { onlineResultPortals } from "@/lib/online-results"
import { hospital } from "@/lib/site-data"

export const metadata = {
  title: `Patient Results Login | ${hospital.shortName}`,
  description: `Patient online results login for ${hospital.legalName}.`,
}

export default function PatientResultsLoginPage() {
  return <OnlineResultsLoginPage portal={onlineResultPortals.patient} />
}

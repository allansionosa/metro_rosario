import { OnlineResultsLoginPage } from "@/components/online-results-login-page"
import { onlineResultPortals } from "@/lib/online-results"
import { hospital } from "@/lib/site-data"

export const metadata = {
  title: `Doctor Results Login | ${hospital.shortName}`,
  description: `Doctor online results login for ${hospital.legalName}.`,
}

export default function DoctorResultsLoginPage() {
  return <OnlineResultsLoginPage portal={onlineResultPortals.doctor} />
}

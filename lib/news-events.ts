import { hospital } from "@/lib/site-data"

type NewsEventPost = {
  slug: string
  type: "News" | "Patient Advisory" | "Services"
  date: string
  title: string
  summary: string
  image: string
  imageAlt: string
  body: string[]
  callout: string
}

const newsEventPosts: NewsEventPost[] = [
  {
    slug: "philhealth-listing-level-1-hospital-status",
    type: "News",
    date: "March 31, 2026",
    title: "PhilHealth listing confirms Level 1 hospital status",
    summary:
      "Metro Rosario Medical Specialists Center, Inc. appears in the latest PhilHealth hospital list as a private Level 1 general hospital with 25 beds.",
    image:
      "https://images.unsplash.com/photo-1583912267550-d44c9c34c40d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hospital corridor with clinical staff station",
    body: [
      `${hospital.legalName} is listed as a private Level 1 general hospital serving Rosario, Batangas.`,
      "For patients, this means the center is positioned for essential hospital access, outpatient coordination, diagnostics, and core clinical services appropriate to a Level 1 facility.",
      "Patients should still call the hospital desk before visiting because clinic schedules, physician availability, and preparation instructions can change.",
    ],
    callout:
      "Call ahead for the current OPD schedule, HMO instructions, and required documents before visiting.",
  },
  {
    slug: "hmo-patients-are-directed-to-opd-coordination",
    type: "Patient Advisory",
    date: "February 06, 2026",
    title: "HMO patients are directed to OPD coordination",
    summary:
      "Public provider directories list Metro Rosario and instruct covered patients to proceed to OPD for coordination before care.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare team assisting a patient with paperwork",
    body: [
      "Patients using HMO coverage should coordinate with the OPD desk before proceeding with consultation, diagnostic testing, or other service requests.",
      "Prepare your valid ID, HMO card or digital membership details, company information when applicable, and any referral or request form from your physician.",
      "Submitting complete details helps the care desk confirm eligibility, route the request, and explain the next step before your visit.",
    ],
    callout:
      "For HMO concerns, proceed to OPD or contact the care desk before your preferred schedule.",
  },
  {
    slug: "verified-services-lab-ecg-xray-core-clinics",
    type: "Services",
    date: "July 16, 2025",
    title: "Verified services include lab, ECG, X-ray and core clinics",
    summary:
      "The center's public service profile lists clinical chemistry, clinical microscopy, hematology tests, ECG, X-ray, general medicine, internal medicine, OB-Gynecology, pediatrics, and surgery.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Medical staff reviewing diagnostic information",
    body: [
      "The published service profile identifies laboratory, diagnostic, and clinic areas available through Metro Rosario.",
      "Laboratory-related services include clinical chemistry, clinical microscopy, and hematology tests. Diagnostic services include ECG and X-ray.",
      "Clinic service areas include general medicine, internal medicine, obstetrics and gynecology, pediatrics, and surgery.",
    ],
    callout:
      "Bring the request form from your physician and confirm test preparation requirements before visiting.",
  },
  {
    slug: "formerly-palma-malaluan-hospital",
    type: "News",
    date: "July 16, 2025",
    title: "Metro Rosario listed as formerly Palma-Malaluan Hospital",
    summary:
      "Facility directories identify Metro Rosario Medical Specialists Center by its former name, Palma-Malaluan Hospital, helping patients recognize the same Rosario, Batangas location.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hospital patient room and care equipment",
    body: [
      "Some public facility profiles identify Metro Rosario Medical Specialists Center with the former name Palma-Malaluan Hospital.",
      "This helps patients connect older references, provider directories, and local familiarity with the current facility name.",
      `The listed location remains ${hospital.address}.`,
    ],
    callout:
      "When asking for directions or confirming records, mention both Metro Rosario and Palma-Malaluan Hospital if needed.",
  },
]

function getNewsEventPost(slug: string) {
  return newsEventPosts.find((post) => post.slug === slug)
}

export { getNewsEventPost, newsEventPosts, type NewsEventPost }

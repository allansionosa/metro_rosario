type CareerOpening = {
  slug: string
  title: string
  department: string
  employmentType: "Full-time" | "Open application"
  status: "Open application"
  summary: string
  responsibilities: string[]
  requirements: string[]
  documents: string[]
}

const careerOpenings: CareerOpening[] = [
  {
    slug: "registered-medical-technologist",
    title: "Registered Medical Technologist",
    department: "Laboratory",
    employmentType: "Full-time",
    status: "Open application",
    summary:
      "Support laboratory operations for patient testing, sample handling, and result coordination.",
    responsibilities: [
      "Assist with laboratory testing workflows and quality checks",
      "Coordinate specimen receiving, processing, and release instructions",
      "Maintain accurate documentation for laboratory requests",
    ],
    requirements: [
      "Registered Medical Technologist",
      "Detail-oriented handling of samples and records",
      "Able to coordinate clearly with patients and clinical teams",
    ],
    documents: [
      "Resume or CV",
      "PRC license or board rating",
      "Training certificates if available",
    ],
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    department: "Clinical Services",
    employmentType: "Full-time",
    status: "Open application",
    summary:
      "Provide direct patient support, nursing coordination, and clinical documentation across care areas.",
    responsibilities: [
      "Assist patients through consultation, diagnostics, and care instructions",
      "Support clinical documentation and patient monitoring",
      "Coordinate with physicians, OPD, and hospital teams",
    ],
    requirements: [
      "Registered Nurse",
      "Strong bedside communication and patient-service mindset",
      "Able to work in a hospital care environment",
    ],
    documents: [
      "Resume or CV",
      "PRC license",
      "BLS or related training certificates if available",
    ],
  },
  {
    slug: "accounting-staff",
    title: "Accounting Staff",
    department: "Finance",
    employmentType: "Full-time",
    status: "Open application",
    summary:
      "Support billing, payment coordination, records, and finance operations for hospital services.",
    responsibilities: [
      "Assist with billing, payment documentation, and account records",
      "Coordinate finance requests with front desk and patient-service teams",
      "Keep records organized for review and reporting",
    ],
    requirements: [
      "Accounting, finance, or related administrative experience",
      "Careful handling of documents and transaction details",
      "Comfortable coordinating with patients and internal teams",
    ],
    documents: [
      "Resume or CV",
      "Transcript or relevant credentials",
      "Employment certificates if available",
    ],
  },
  {
    slug: "receptionist",
    title: "Receptionist",
    department: "Front Desk",
    employmentType: "Open application",
    status: "Open application",
    summary:
      "Help patients navigate appointments, inquiries, document routing, and front desk coordination.",
    responsibilities: [
      "Receive patient inquiries and route them to the right desk",
      "Assist with appointment, OPD, and document coordination",
      "Maintain clear, respectful communication at the front desk",
    ],
    requirements: [
      "Front desk, clinic, or customer service experience preferred",
      "Clear communication and organized record handling",
      "Able to stay calm and helpful during busy patient hours",
    ],
    documents: [
      "Resume or CV",
      "Relevant training certificates if available",
      "Employment certificates if available",
    ],
  },
]

function getCareerOpening(slug: string) {
  return careerOpenings.find((opening) => opening.slug === slug)
}

export { careerOpenings, getCareerOpening, type CareerOpening }

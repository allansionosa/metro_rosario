const onlineResultPortals = {
  patient: {
    key: "patient",
    label: "Patient",
    navLabel: "Patient Login",
    route: "/online-results/patient",
    externalUrl: "https://www.hmicare.com.ph/portal/patient/login",
    title: "Patient Results Login",
    eyebrow: "Patient Portal",
    description:
      "Access released laboratory, ECG, and imaging results through a patient-first sign-in flow.",
    identifierLabel: "Email Address",
    identifierPlaceholder: "name@example.com",
    passwordLabel: "Password or Access PIN",
    forgotLabel: "Forgot result code?",
    supportTitle: "Patient desk support",
    supportDescription:
      "For account recovery or result-release concerns, contact the OPD or laboratory desk with your visit details ready.",
    highlights: [
      "Result release verification",
      "PDF-ready diagnostic records",
      "Secure patient-only access",
    ],
  },
  doctor: {
    key: "doctor",
    label: "Doctor",
    navLabel: "Doctor Login",
    route: "/online-results/doctor",
    externalUrl: "https://www.hmicare.com.ph/portal/doctor/login",
    title: "Doctor Results Login",
    eyebrow: "Doctor Portal",
    description:
      "Review patient diagnostics with a clinician-focused sign-in experience built for quick scanning.",
    identifierLabel: "Email Address",
    identifierPlaceholder: "doctor@example.com",
    passwordLabel: "Password",
    forgotLabel: "Reset password",
    supportTitle: "Medical staff access",
    supportDescription:
      "For portal access or assignment issues, coordinate with the records or IT support desk before clinic hours.",
    highlights: [
      "Assigned patient result queue",
      "Clinical review workflow",
      "Staff-only account access",
    ],
  },
} as const

type OnlineResultPortal =
  (typeof onlineResultPortals)[keyof typeof onlineResultPortals]

const onlineResultPortalList = [
  onlineResultPortals.patient,
  onlineResultPortals.doctor,
]

export { onlineResultPortalList, onlineResultPortals, type OnlineResultPortal }

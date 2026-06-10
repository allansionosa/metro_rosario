import {
  Baby,
  ClipboardList,
  HeartPulse,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"

import { hospital } from "@/lib/site-data"

type DoctorProfile = {
  slug: string
  name: string
  title: string
  specialty: string
  clinic: string
  schedule: string
  contact: string
  image: string
  imageAlt: string
  status: "Publicly listed" | "Mock profile"
  profileNote: string
  services: string[]
}

type ClinicTeam = {
  name: string
  specialty: string
  summary: string
  schedule: string
  contact: string
  icon: LucideIcon
  accent: string
}

const doctorProfiles: DoctorProfile[] = [
  {
    slug: "dra-susan-malaluan",
    name: "Dra. Susan Malaluan",
    title: "Medical & General Practitioner",
    specialty: "General Medicine",
    clinic: "Palma-Malaluan Hospital / Metro Rosario",
    schedule: "Mon-Fri, 8:00 AM-5:00 PM based on public listing",
    contact: hospital.secondaryTel,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Doctor profile photo placeholder",
    status: "Publicly listed",
    profileNote:
      "Public directories list Dra. Susan Malaluan at the Palma-Malaluan Hospital address. Confirm current clinic availability with OPD before visiting.",
    services: [
      "General consultation",
      "Initial assessment",
      "Follow-up care coordination",
      "Referral guidance",
    ],
  },
  {
    slug: "dr-miguel-reyes",
    name: "Dr. Miguel Reyes",
    title: "Internal Medicine Consultant",
    specialty: "Internal Medicine",
    clinic: "Internal Medicine Clinic",
    schedule: "Mon, Wed, Fri, 10:00 AM-2:00 PM",
    contact: hospital.mobile,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "Adult illness consultation",
      "Chronic condition follow-up",
      "Laboratory result review",
      "Preventive health guidance",
    ],
  },
  {
    slug: "dra-elena-santos",
    name: "Dra. Elena Santos",
    title: "Obstetrics and Gynecology",
    specialty: "OB-Gynecology",
    clinic: "Women and Maternal Care Clinic",
    schedule: "Tue, Thu, Sat, 9:00 AM-1:00 PM",
    contact: hospital.mobileAlt,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "Women's health consultation",
      "Pregnancy-related visits",
      "Prenatal follow-up",
      "Gynecologic concerns",
    ],
  },
  {
    slug: "dr-paolo-villanueva",
    name: "Dr. Paolo Villanueva",
    title: "Pediatrician",
    specialty: "Pediatrics",
    clinic: "Pediatrics Clinic",
    schedule: "Mon-Sat, 8:00 AM-12:00 PM",
    contact: hospital.tel,
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "Child illness consultation",
      "Well-child check",
      "Follow-up care",
      "Parent care instructions",
    ],
  },
  {
    slug: "dr-andres-lim",
    name: "Dr. Andres Lim",
    title: "General Surgeon",
    specialty: "Surgery",
    clinic: "Surgery Clinic",
    schedule: "Tue and Fri, 1:00 PM-5:00 PM",
    contact: hospital.secondaryTel,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "Surgical consultation",
      "Pre-procedure assessment",
      "Post-consult instructions",
      "Follow-up planning",
    ],
  },
  {
    slug: "dra-camille-torres",
    name: "Dra. Camille Torres",
    title: "Radiology and Imaging",
    specialty: "Diagnostic Imaging",
    clinic: "X-ray and Imaging",
    schedule: "Mon-Fri, 9:00 AM-4:00 PM",
    contact: hospital.tel,
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "X-ray request review",
      "Imaging coordination",
      "Diagnostic report routing",
      "Physician-directed imaging support",
    ],
  },
  {
    slug: "dr-josef-cruz",
    name: "Dr. Josef Cruz",
    title: "Anesthesiology",
    specialty: "Anesthesia",
    clinic: "Surgical Support",
    schedule: "By surgical coordination",
    contact: hospital.secondaryTel,
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mock doctor profile photo",
    status: "Mock profile",
    profileNote:
      "Mock profile for layout preview. Replace this entry with verified physician information before production.",
    services: [
      "Pre-anesthesia assessment",
      "Procedure support",
      "Surgical team coordination",
      "Post-procedure monitoring guidance",
    ],
  },
]

const clinicTeams: ClinicTeam[] = [
  {
    name: "Internal Medicine Clinic Team",
    specialty: "Adult Medicine",
    summary:
      "Adult medical consultation for ongoing conditions, diagnostic review, and physician-directed follow-up.",
    schedule: "Call OPD to confirm current physician availability",
    contact: hospital.mobile,
    icon: HeartPulse,
    accent: "bg-amber-100 text-amber-600",
  },
  {
    name: "OB-Gynecology Clinic Team",
    specialty: "Women and Maternal Care",
    summary:
      "Clinic coordination for women's health concerns and pregnancy-related consultation requests.",
    schedule: "Call before visiting for the current OB-Gyne schedule",
    contact: hospital.mobileAlt,
    icon: Baby,
    accent: "bg-pink-100 text-pink-600",
  },
  {
    name: "Pediatrics Clinic Team",
    specialty: "Child Health",
    summary:
      "Child health consultation and follow-up care coordinated through the pediatric clinic schedule.",
    schedule: "Call OPD to confirm pediatric clinic availability",
    contact: hospital.tel,
    icon: Baby,
    accent: "bg-cyan-100 text-cyan-600",
  },
  {
    name: "Surgery Clinic Team",
    specialty: "Surgical Assessment",
    summary:
      "Consultation and coordination for cases that may need surgical review or hospital-based planning.",
    schedule: "Call OPD to confirm the available surgery clinic schedule",
    contact: hospital.secondaryTel,
    icon: ClipboardList,
    accent: "bg-orange-100 text-orange-600",
  },
  {
    name: "General Medicine OPD",
    specialty: "First-contact Care",
    summary:
      "First-contact clinic for common symptoms, initial assessment, and routing to diagnostics or specialty care.",
    schedule: "Call OPD to confirm current physician availability",
    contact: hospital.tel,
    icon: Stethoscope,
    accent: "bg-blue-100 text-blue-600",
  },
]

export { clinicTeams, doctorProfiles, type ClinicTeam, type DoctorProfile }

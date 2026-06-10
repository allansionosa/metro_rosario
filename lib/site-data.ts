const hospital = {
  name: "Metro Rosario Medical Specialists Center",
  legalName: "Metro Rosario Medical Specialists Center, Inc.",
  formerName: "Formerly Palma-Malaluan Hospital",
  shortName: "Metro Rosario",
  tagline: "Level 1 general hospital in Rosario, Batangas",
  address: "J. Magtibay St., Barangay D, Rosario, Batangas 4225",
  addressLines: [
    "J. Magtibay St., Barangay D",
    "Rosario, Batangas 4225",
    "Philippines",
  ],
  mapQuery:
    "Metro Rosario Medical Specialists Center J. Magtibay St. Rosario Batangas",
  tel: "(043) 403-7338",
  telHref: "tel:+63434037338",
  secondaryTel: "(043) 321-1410",
  mobile: "0915-957-7488",
  mobileAlt: "0919-765-9421",
  email: "mrmc.philhealth@myyahoo.com",
  emailHref: "mailto:mrmc.philhealth@myyahoo.com",
  beds: "25",
  category: "Level 1 General Hospital",
  sector: "Private",
  hmoInstruction: "Proceed to OPD for HMO coordination",
}

const verifiedServices = [
  "Clinical Chemistry",
  "Clinical Microscopy",
  "ECG",
  "General Medicine",
  "Hematology Tests",
  "Internal Medicine",
  "Obstetrics and Gynecology",
  "Pediatrics",
  "Surgery",
  "X-ray",
]

const contactLines = [
  hospital.tel,
  hospital.secondaryTel,
  hospital.mobile,
  hospital.mobileAlt,
]

export { contactLines, hospital, verifiedServices }

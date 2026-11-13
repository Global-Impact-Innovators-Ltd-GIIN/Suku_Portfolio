// CV variants for the portfolio CV picker.
//
// The full per-variant content (headline, summary, skills, experience,
// projects, certs, references) lives in this file, built ONLY from Suku's
// real CV files in ~/workspace/user/files/ (tailored .docx resumes + PDFs).
// Never invent experience, metrics, or languages; never use
// the flagged GitHub account.
//
// Fidelity notes (all verified against the source files, 2026-11-13):
// - All 6 CVs share: Mensah Q. Suku Jr, Kigali, Rwanda, +250 798 655 345,
//   mensahqsukujr@gmail.com; BSc IT (Networking), UNILAK 2023-2026 (the
//   Executive CV prints no dates for the degree); the same 8 certs;
//   languages "English: Fluent | French: Basic" exactly as printed.
// - MELLOON has NO start date on any file: its dates are "Present" only.
// - TechWise is 2025-2026 on every file.
// - No link to the flagged GitHub account appears anywhere in this file. The Smart
//   Rehabilitation System's only link on file is to the flagged GitHub account,
//   so that project is listed with NO link. No GitHub URLs are printed in
//   the CV contact lines either (the source headers bundle the flagged
//   the flagged GitHub handle with the others).
// - Executive CV wording is reproduced as printed, including its quirks:
//   the summary's present-tense "serving as a lead security engineer at
//   TechWise" (despite 2025-2026 dates), the "BugerHub" spelling, the
//   "CISCO NETCAD" issuer spelling, and the NON-chronological experience
//   order (MELLOON, UBWENGE, TechWise, GIIN, Township, J.C.A, Tonboi).
//   Its Juma + Irenee referee blocks live in textboxes in word/document.xml
//   (12 txbx elements) and were read from the raw XML, not the paragraphs.
// - Executive project descriptions reuse the wording of the Frontend CV
//   for the same projects (same person, same projects); the Executive file
//   itself prints only titles, tech in parentheses, and demo URLs.

export type CVVariantId =
  | 'frontend'
  | 'cybersecurity'
  | 'infrastructure'
  | 'network'
  | 'systems'
  | 'executive'

export interface CVVariantMeta {
  id: CVVariantId
  label: string
  tagline: string
}

export const CV_VARIANTS: CVVariantMeta[] = [
  { id: 'frontend', label: 'Frontend', tagline: 'Frontend Software Engineer' },
  { id: 'cybersecurity', label: 'Cybersecurity', tagline: 'Cybersecurity Analyst' },
  {
    id: 'infrastructure',
    label: 'IT Infrastructure & Security',
    tagline: 'IT Infrastructure & Security Professional',
  },
  { id: 'network', label: 'Network Engineer', tagline: 'Network Engineer' },
  { id: 'systems', label: 'Systems Administrator', tagline: 'Systems Administrator' },
  { id: 'executive', label: 'Executive', tagline: 'Technology & Innovation Executive' },
]

/** File name shown in the downloaded CV, e.g. Mensah_Q_Suku_Jr_Frontend_CV.pdf */
export const CV_VARIANT_FILENAMES: Record<CVVariantId, string> = {
  frontend: 'Frontend',
  cybersecurity: 'Cybersecurity',
  infrastructure: 'IT_Infrastructure_and_Security',
  network: 'Network_Engineer',
  systems: 'Systems_Administrator',
  executive: 'Executive',
}

export interface CVExperience {
  role: string
  company: string
  /** Dates exactly as printed on the CV. MELLOON is "Present" (no start date on file). */
  dates: string
  /** Optional location line, only where the CV prints one (Frontend UBWENGE: "Remote"). */
  location?: string
  /**
   * Sub-section heading when the role sits under a heading other than the
   * main PROFESSIONAL EXPERIENCE block, e.g. "Additional Experience" or
   * "Leadership & Additional Experience". Omitted for the main block.
   */
  section?: string
  bullets: string[]
}

export interface CVProject {
  title: string
  description: string
  /** Live demo URL only. Never a URL to the flagged GitHub account (omitted instead). */
  link?: string
}

export interface CVCert {
  title: string
  issuer: string
}

export interface CVReference {
  name: string
  title: string
  org: string
  phone: string
  email?: string
}

export interface CVEducation {
  degree: string
  institution: string
  /** Empty string where the CV prints no dates (Executive CV). */
  dates: string
}

export interface CVVariantContent {
  id: CVVariantId
  headline: string
  /** Second headline line, only where the CV prints one (Executive CV). */
  subHeadline?: string
  name: string
  location: string
  phone: string
  email: string
  portfolio: string
  linkedin: string
  summary: string
  skills: string[]
  experience: CVExperience[]
  projects: CVProject[]
  education: CVEducation
  certs: CVCert[]
  /** Language line exactly as printed, e.g. "English: Fluent". */
  languages: string[]
  references: CVReference[]
}

const COMMON_CONTACT = {
  name: 'Mensah Q. Suku Jr',
  location: 'Kigali, Rwanda',
  phone: '+250 798 655 345',
  email: 'mensahqsukujr@gmail.com',
  portfolio: 'sukuportfolio.nimdaukus.com',
  linkedin: 'linkedin.com/in/mensah-q-suku-jr-4ba086292',
}

const COMMON_LANGUAGES = ['English: Fluent', 'French: Basic']

const COMMON_EDUCATION: CVEducation = {
  degree: 'BSc in Information Technology (Option in Networking)',
  institution: 'University of Lay Adventists of Kigali (UNILAK), Kigali, Rwanda',
  dates: '2023 – 2026',
}

const REF_IRENEE: CVReference = {
  name: 'Dr. Irenee Mungwarakamarama',
  title: 'Senior Lecturer',
  org: 'UNILAK University',
  phone: '+250 793 211 640',
}

const REF_JUMA: CVReference = {
  name: 'Dr. Juma Sumbiri',
  title: 'Senior Lecturer',
  org: 'UNILAK University',
  phone: '+250 789 809 219',
}

const REF_SHEKINA: CVReference = {
  name: 'Shekina Noella',
  title: 'Managing Director (MD)',
  org: 'Global Impact Innovators Ltd (GIIN)',
  phone: '+250 787 048 238',
  email: 'shekinahnoella@gmail.com',
}

/** The 8 certifications, in each CV's own printed order. */
const CERTS_FRONTEND: CVCert[] = [
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'Networking Essentials', issuer: 'Cisco NetAcad' },
  { title: 'CS406: Information Security', issuer: 'Saylor Academy' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'Saylor Academy' },
  { title: 'A Complete Course on Windows Server Administration', issuer: 'Coursera' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'Carnegie Mellon University Africa' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

const CERTS_CYBERSECURITY: CVCert[] = [
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'CS406: Information Security', issuer: 'Saylor Academy' },
  { title: 'Networking Essentials', issuer: 'Cisco NetAcad' },
  { title: 'A Complete Course on Windows Server Administration', issuer: 'Coursera' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'Carnegie Mellon University Africa' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'Saylor Academy' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

const CERTS_INFRASTRUCTURE: CVCert[] = [
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'Networking Essentials', issuer: 'Cisco NetAcad' },
  { title: 'CS406: Information Security', issuer: 'Saylor Academy' },
  { title: 'A Complete Course on Windows Server Administration', issuer: 'Coursera' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'Carnegie Mellon University Africa' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'Saylor Academy' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

const CERTS_NETWORK: CVCert[] = [
  { title: 'Networking Essentials', issuer: 'Cisco NetAcad' },
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'CS406: Information Security', issuer: 'Saylor Academy' },
  { title: 'A Complete Course on Windows Server Administration', issuer: 'Coursera' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'Carnegie Mellon University Africa' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'Saylor Academy' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

const CERTS_SYSTEMS: CVCert[] = [
  { title: 'A Complete Course on Windows Server Administration', issuer: 'Coursera' },
  { title: 'Networking Essentials', issuer: 'Cisco NetAcad' },
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'CS406: Information Security', issuer: 'Saylor Academy' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'Carnegie Mellon University Africa' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'Saylor Academy' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

/** Executive CV certs, issuer wording reproduced exactly as printed ("CISCO NETCAD", "CMU"). */
const CERTS_EXECUTIVE: CVCert[] = [
  { title: 'Cybersecurity Certificate', issuer: 'AFRETEC' },
  { title: 'Networking Essentials', issuer: 'CISCO NETCAD' },
  { title: 'CS406: Information Security', issuer: 'SAYLOR ACADEMY' },
  { title: 'PRDV224: Leadership and Teams', issuer: 'SAYLOR ACADEMY' },
  { title: 'A Complete Course on Windows Server Administration', issuer: 'COURSERA' },
  { title: 'CMU-Africa Bridge Program Certificate', issuer: 'CMU' },
  { title: 'International Leadership Program', issuer: 'Beyond Success (2023)' },
  { title: 'Executive Diploma in Diplomacy & Protocol', issuer: 'La Plage MetaVerse (2023)' },
]

const TECHWISE_BULLETS_MAIN = [
  'Held full security ownership of system components, safeguarding applications and infrastructure.',
  'Collaborated with engineering teams to maintain full system uptime and service reliability.',
  'Designed and delivered diverse technical and security-awareness training for company employees.',
]

const TECHWISE_BULLETS_SHORT = [
  'Held full security ownership of system components, safeguarding systems and data.',
  'Collaborated with engineering and operations teams to maintain full system uptime and service reliability.',
  'Designed and delivered diverse security-awareness and technical training for company employees.',
]

const GIIN_BULLETS_FRONTEND = [
  'Lead a technology company delivering software, cybersecurity and IT solutions; define product direction and business strategy.',
  'Architect and lead development of regional digital platforms, including the GIIN Digital Ecosystem and GiinMeet.',
  'Established CI/CD workflows and implemented secure mobile payment systems and multi-user applications.',
  'Oversee technical teams and innovation projects from concept through deployment.',
]

const GIIN_BULLETS_SHORT = [
  'Lead a technology company delivering cybersecurity, software and IT solutions.',
  'Oversee technical teams and innovation projects; manage digital product development and business strategy.',
]

const GIIN_BULLETS_SOFTWARE = [
  'Lead a technology company delivering software, cybersecurity and IT solutions.',
  'Oversee technical teams and innovation projects; manage digital product development and business strategy.',
]

const MELLOON_BULLETS_FRONTEND = [
  'Define the company’s long- and short-term vision with clear, measurable objectives.',
  'Identify market opportunities, shifts, threats and emerging trends to steer the company toward sustainable growth.',
]

const MELLOON_BULLETS_SHORT = [
  'Define long- and short-term company vision with measurable objectives and steer the company toward sustainable growth.',
]

const UBWENGE_BULLETS_SHORT = [
  'Develop responsive web applications and UI components; optimize performance and usability of web systems.',
]

const TONBOI_BULLETS_SHORT = [
  'Supported network deployment projects.',
  'Configured and maintained routers and switches.',
]

const JCA_BULLETS_SHORT = [
  'Installed and maintained IT systems and hardware.',
  'Provided technical support and resolved user hardware and software issues.',
]

const TOWNSHIP_BULLETS_CYBER = [
  'Administered user accounts and enforced access control to protect organizational systems and data.',
  'Managed the township’s IT infrastructure and network systems.',
  'Performed system troubleshooting and routine maintenance to keep services available to staff.',
]

const TOWNSHIP_BULLETS_INFRA = [
  'Managed the township’s IT infrastructure and network systems.',
  'Administered user accounts and enforced access control to protect organizational systems and data.',
  'Performed system troubleshooting and routine maintenance to keep services available to staff.',
]

const TOWNSHIP_BULLETS_NETWORK = [
  'Managed the township’s network systems and IT infrastructure.',
  'Administered user accounts and enforced access control to protect organizational systems and data.',
  'Performed system troubleshooting and routine maintenance to keep services available to staff.',
]

export const CV_VARIANT_DATA: Record<CVVariantId, CVVariantContent> = {
  frontend: {
    id: 'frontend',
    headline: 'Frontend Software Engineer • React • React Native • Next.js • TypeScript',
    ...COMMON_CONTACT,
    summary:
      'Frontend Software Engineer with hands-on experience building responsive web applications and cross-platform mobile apps using React, React Native, Next.js and Flutter. Skilled at translating Figma designs into performant, user-friendly interfaces with robust REST API integration, offline caching and error handling. Brings a security-first engineering mindset shaped by cybersecurity and network engineering roles, and proven leadership as Founder & CEO of Global Impact Innovators Ltd (GIIN), where I lead product development, CI/CD workflows and secure payment integrations. Committed to clean, maintainable code and to delivering reliable products that create real value for users.',
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Python',
      'Java',
      'SQL',
      'React',
      'Next.js',
      'React Native',
      'Flutter',
      'Responsive Design',
      'UI Implementation from Figma',
      'Component-Based Architecture',
      'REST API Integration',
      'Error Handling',
      'Offline Caching',
      'Performance & Usability Optimization',
      'Cross-Platform Mobile Development',
      'Mobile Payment System Integration',
      'Multi-User Applications',
      'Git',
      'GitHub',
      'CI/CD Pipelines',
      'Vercel',
      'Figma',
      'Secure Application Practices',
      'SOC Fundamentals',
      'Threat Intelligence',
      'Endpoint Security (SentinelOne)',
      'SIEM Concepts',
      'TCP/IP',
      'DNS',
      'DHCP',
      'Linux',
      'Windows Server',
      'Active Directory',
    ],
    experience: [
      {
        role: 'Frontend & Mobile Developer',
        company: 'UBWENGE LAB',
        dates: 'Aug 2025 – Present',
        location: 'Remote',
        bullets: [
          'Develop responsive web applications and cross-platform mobile apps with React and React Native, translating Figma designs into accurate, performant UI layouts.',
          'Build reusable UI components and integrate REST APIs with structured error handling for stable, predictable user experiences.',
          'Optimize the performance and usability of production web systems across devices and screen sizes.',
          'Collaborate with cross-functional development teams throughout the product delivery cycle, from design hand-off to release.',
        ],
      },
      {
        role: 'Founder & CEO / Technical Lead',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Aug 2023 – Present',
        bullets: GIIN_BULLETS_FRONTEND,
      },
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 – 2026',
        bullets: TECHWISE_BULLETS_MAIN,
      },
      {
        role: 'Co-Founder & CEO',
        company: 'MELLOON',
        dates: 'Present',
        bullets: MELLOON_BULLETS_FRONTEND,
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: ['Supported network deployments; configured and maintained routers and switches.'],
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: ['Installed and maintained IT systems and hardware; provided end-user technical support.'],
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: [
          'Managed IT infrastructure, user accounts and network systems.',
          'Performed system troubleshooting, maintenance and access control.',
        ],
      },
    ],
    projects: [
      {
        title: 'Smart Campus Communication & Collaboration System',
        description:
          'Multi-tenant platform where institutions rent workspaces to manage students, staff and lecturers.',
        link: 'https://scccs-next-gen-nine.vercel.app/',
      },
      {
        title: 'GIIN Digital Ecosystem',
        description:
          'Suite of business systems and platforms powering Global Impact Innovators Ltd.',
        link: 'https://giin-website-frontend.vercel.app/',
      },
      {
        title: 'GiinMeet',
        description: 'Web application within the GIIN product ecosystem.',
        link: 'https://giinmeet.nimdaukus.com/',
      },
      {
        title: 'AI-Based Eye Tracking Examination System',
        description:
          'Examination system using real-time eye tracking (Flask, OpenCV, MediaPipe).',
      },
      {
        title: 'Smart Rehabilitation System (Digital Physiotherapist)',
        description:
          'Digital physiotherapy system supporting guided patient rehabilitation.',
      },
      {
        title: 'BurgerHub',
        description: 'Responsive restaurant web application.',
        link: 'https://burgerhub.vercel.app',
      },
      {
        title: 'Professional Portfolio',
        description: 'Personal portfolio showcasing projects and experience.',
        link: 'https://sukuportfolio.nimdaukus.com/',
      },
    ],
    education: COMMON_EDUCATION,
    certs: CERTS_FRONTEND,
    languages: COMMON_LANGUAGES,
    references: [REF_IRENEE, REF_JUMA],
  },

  cybersecurity: {
    id: 'cybersecurity',
    headline: 'Cybersecurity Analyst • Security Engineer • SOC • Endpoint Security • Threat Intelligence',
    ...COMMON_CONTACT,
    summary:
      'Cybersecurity Analyst and Security Engineer with experience securing system components, maintaining full system uptime and training staff in security practices. Grounded in SOC fundamentals, threat intelligence, endpoint security (SentinelOne) and SIEM concepts, and backed by years of systems administration and network engineering that give me a deep understanding of the infrastructure I defend. Certified in cybersecurity (AFRETEC) and information security (Saylor Academy), and lead cybersecurity and IT solution delivery as Founder & CEO of Global Impact Innovators Ltd (GIIN).',
    skills: [
      'SOC Fundamentals',
      'Threat Intelligence',
      'Endpoint Security',
      'SIEM Concepts',
      'Information Security',
      'Security Awareness Training',
      'Endpoint Protection (SentinelOne)',
      'Access Control',
      'System Uptime & Availability',
      'Staff Security Training',
      'TCP/IP',
      'Routing & Switching',
      'Router & Switch Configuration',
      'DNS',
      'DHCP',
      'Network Deployment',
      'Network Troubleshooting',
      'Windows Server',
      'Linux',
      'Active Directory',
      'User & Account Management',
      'SentinelOne',
      'Cisco Packet Tracer',
      'Git',
      'GitHub',
      'Python',
      'Java',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    experience: [
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 – 2026',
        bullets: TECHWISE_BULLETS_SHORT,
      },
      {
        role: 'Founder & CEO',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Aug 2023 – Present',
        bullets: GIIN_BULLETS_SHORT,
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: TONBOI_BULLETS_SHORT,
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: JCA_BULLETS_SHORT,
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: TOWNSHIP_BULLETS_CYBER,
      },
      {
        role: 'Frontend Developer',
        company: 'UBWENGE LAB',
        dates: 'Aug 2025 – Present',
        section: 'Additional Experience',
        bullets: UBWENGE_BULLETS_SHORT,
      },
      {
        role: 'Co-Founder & CEO',
        company: 'MELLOON',
        dates: 'Present',
        section: 'Additional Experience',
        bullets: MELLOON_BULLETS_SHORT,
      },
    ],
    projects: [],
    education: COMMON_EDUCATION,
    certs: CERTS_CYBERSECURITY,
    languages: COMMON_LANGUAGES,
    references: [REF_IRENEE, REF_JUMA],
  },

  infrastructure: {
    id: 'infrastructure',
    headline:
      'IT Infrastructure & Security Professional • Systems Administration • Networking • Cybersecurity',
    ...COMMON_CONTACT,
    summary:
      'IT infrastructure and security professional with hands-on experience since 2018 across systems administration, networking and cybersecurity. Experienced in managing IT infrastructure, user accounts and access control; deploying and configuring routers and switches; and serving as Security Engineer with full ownership of system security and uptime. Skilled with Windows Server, Linux, Active Directory, SOC fundamentals and endpoint security (SentinelOne). Holds a BSc in Information Technology (Networking) with cybersecurity, information security, networking and Windows Server certifications, and leads IT and cybersecurity solution delivery as Founder & CEO of Global Impact Innovators Ltd (GIIN).',
    skills: [
      'Windows Server',
      'Linux',
      'Active Directory',
      'User & Account Management',
      'Access Control',
      'System Maintenance & Troubleshooting',
      'TCP/IP',
      'Routing & Switching',
      'Router & Switch Configuration',
      'DNS',
      'DHCP',
      'Network Deployment',
      'Network Troubleshooting',
      'SOC Fundamentals',
      'Threat Intelligence',
      'Endpoint Security',
      'SIEM Concepts',
      'Information Security',
      'Security Awareness Training',
      'Hardware Installation & Maintenance',
      'End-User Technical Support',
      'SentinelOne',
      'Cisco Packet Tracer',
      'Git',
      'GitHub',
      'Python',
      'Java',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    experience: [
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 – 2026',
        bullets: TECHWISE_BULLETS_SHORT,
      },
      {
        role: 'Founder & CEO',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Aug 2023 – Present',
        bullets: GIIN_BULLETS_SOFTWARE,
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: TONBOI_BULLETS_SHORT,
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: JCA_BULLETS_SHORT,
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: TOWNSHIP_BULLETS_INFRA,
      },
      {
        role: 'Frontend Developer',
        company: 'UBWENGE LAB',
        dates: 'Aug 2025 – Present',
        section: 'Additional Experience',
        bullets: UBWENGE_BULLETS_SHORT,
      },
      {
        role: 'Co-Founder & CEO',
        company: 'MELLOON',
        dates: 'Present',
        section: 'Additional Experience',
        bullets: MELLOON_BULLETS_SHORT,
      },
    ],
    projects: [],
    education: COMMON_EDUCATION,
    certs: CERTS_INFRASTRUCTURE,
    languages: COMMON_LANGUAGES,
    references: [REF_IRENEE, REF_JUMA],
  },

  network: {
    id: 'network',
    headline: 'Network Engineer • Routing & Switching • TCP/IP • DNS / DHCP • Network Security',
    ...COMMON_CONTACT,
    summary:
      'Network Engineer with hands-on experience deploying, configuring and maintaining network infrastructure, including routers, switches and core network services such as TCP/IP, DNS and DHCP. Holds a BSc in Information Technology with an option in Networking and Cisco Networking Essentials certification. Combines network troubleshooting and systems administration experience with security engineering work focused on system protection and uptime, and leads IT solution delivery as Founder & CEO of Global Impact Innovators Ltd (GIIN).',
    skills: [
      'TCP/IP',
      'Routing & Switching',
      'Router & Switch Configuration',
      'DNS',
      'DHCP',
      'Network Deployment',
      'Network Troubleshooting',
      'Windows Server',
      'Linux',
      'Active Directory',
      'User & Access Management',
      'Access Control',
      'Endpoint Security',
      'SOC Fundamentals',
      'Threat Intelligence',
      'SIEM Concepts',
      'Hardware Installation & Maintenance',
      'End-User Technical Support',
      'Cisco Packet Tracer',
      'SentinelOne',
      'Git',
      'GitHub',
      'Python',
      'Java',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    experience: [
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 – 2026',
        bullets: TECHWISE_BULLETS_SHORT,
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: TONBOI_BULLETS_SHORT,
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: JCA_BULLETS_SHORT,
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: TOWNSHIP_BULLETS_NETWORK,
      },
      {
        role: 'Founder & CEO',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Aug 2023 – Present',
        section: 'Leadership & Additional Experience',
        bullets: GIIN_BULLETS_SOFTWARE,
      },
      {
        role: 'Frontend Developer',
        company: 'UBWENGE LAB',
        dates: 'Aug 2025 – Present',
        section: 'Leadership & Additional Experience',
        bullets: UBWENGE_BULLETS_SHORT,
      },
      {
        role: 'Co-Founder & CEO',
        company: 'MELLOON',
        dates: 'Present',
        section: 'Leadership & Additional Experience',
        bullets: MELLOON_BULLETS_SHORT,
      },
    ],
    projects: [],
    education: COMMON_EDUCATION,
    certs: CERTS_NETWORK,
    languages: COMMON_LANGUAGES,
    references: [REF_IRENEE, REF_JUMA],
  },

  systems: {
    id: 'systems',
    headline: 'Systems Administrator • Windows Server • Linux • Active Directory • IT Infrastructure',
    ...COMMON_CONTACT,
    summary:
      'Systems Administrator with hands-on experience since 2018 managing IT infrastructure, user accounts, access control and network systems. Skilled in Windows Server, Linux and Active Directory administration, and in installing, maintaining and troubleshooting systems and hardware to keep operations running. A security engineering background brings a security-first approach to every system I manage, supported by a BSc in Information Technology (Networking), Windows Server administration training and leadership experience as Founder & CEO of Global Impact Innovators Ltd (GIIN).',
    skills: [
      'Windows Server',
      'Linux',
      'Active Directory',
      'User & Account Management',
      'Access Control',
      'System Maintenance & Troubleshooting',
      'TCP/IP',
      'Routing & Switching',
      'Router & Switch Configuration',
      'DNS',
      'DHCP',
      'Network Deployment',
      'Network Troubleshooting',
      'Endpoint Security',
      'SOC Fundamentals',
      'SIEM Concepts',
      'Hardware Installation & Maintenance',
      'End-User Technical Support',
      'SentinelOne',
      'Cisco Packet Tracer',
      'Git',
      'GitHub',
      'Python',
      'Java',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    experience: [
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 – 2026',
        bullets: TECHWISE_BULLETS_SHORT,
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: TONBOI_BULLETS_SHORT,
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: JCA_BULLETS_SHORT,
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: TOWNSHIP_BULLETS_INFRA,
      },
      {
        role: 'Founder & CEO',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Aug 2023 – Present',
        section: 'Leadership & Additional Experience',
        bullets: GIIN_BULLETS_SOFTWARE,
      },
      {
        role: 'Frontend Developer',
        company: 'UBWENGE LAB',
        dates: 'Aug 2025 – Present',
        section: 'Leadership & Additional Experience',
        bullets: UBWENGE_BULLETS_SHORT,
      },
      {
        role: 'Co-Founder & CEO',
        company: 'MELLOON',
        dates: 'Present',
        section: 'Leadership & Additional Experience',
        bullets: MELLOON_BULLETS_SHORT,
      },
    ],
    projects: [],
    education: COMMON_EDUCATION,
    certs: CERTS_SYSTEMS,
    languages: COMMON_LANGUAGES,
    references: [REF_IRENEE, REF_JUMA],
  },

  executive: {
    id: 'executive',
    headline: 'Technology & Innovation Enthusiast',
    subHeadline: 'Frontend Developer • Cybersecurity Analyst • Network Engineer • Founder & CEO',
    ...COMMON_CONTACT,
    // Reproduced verbatim from the Executive CV, including the present-tense
    // "serving as a lead security engineer at TechWise" even though the
    // TechWise dates below are 2025-2026. Flagged, not rewritten.
    summary:
      'Multidisciplinary IT professional with expertise in frontend development, cybersecurity, networking, and systems administration. Currently working as, a Frontend Developer at UBWENGE LAB, serving as a lead security engineer at TechWise and Founder & CEO of Global Impact Innovators Ltd (GIIN), leading software development and digital transformation initiatives. Strong ability to combine technical execution with leadership and innovation.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Flutter',
      'Responsive Design',
      'UI Implementation',
      'SOC Fundamentals',
      'Threat Intelligence',
      'Endpoint Security',
      'SIEM Concepts',
      'TCP/IP',
      'Routing & Switching',
      'DNS',
      'DHCP',
      'Network Troubleshooting',
      'Windows Server',
      'Linux',
      'Active Directory',
      'System Administration',
      'Python',
      'Java',
      'SQL',
      'Git',
      'GitHub',
      'Packet Tracer',
      'SentinelOne',
    ],
    // NON-chronological order, exactly as printed on the Executive CV:
    // MELLOON, UBWENGE, TechWise, GIIN, Township, J.C.A, Tonboi.
    experience: [
      {
        role: 'Co-Founder and CEO',
        company: 'MELLOON',
        dates: 'Present',
        bullets: [
          'Steers the affairs of the company by defining Long term and short term visions with measurable objectives',
          'Identify market opportunities, spot market shifts, threats, and emerging trends to steer the company toward sustainable growth.',
        ],
      },
      {
        role: 'Frontend Developer',
        company: 'UBWENGE LAB',
        dates: 'Present',
        bullets: [
          'Develop responsive web applications and UI components.',
          'Collaborate with development teams on product delivery.',
          'Optimize performance and usability of web systems.',
        ],
      },
      {
        role: 'Security Engineer',
        company: 'TechWise',
        dates: '2025 - 2026',
        bullets: [
          'Provide Full Security Sovereignty over System components.',
          'Collaborate with teams to provide full system uptime.',
          'Conduct diversify Trainings to Company employees.',
        ],
      },
      {
        role: 'Founder & CEO',
        company: 'Global Impact Innovators Ltd (GIIN)',
        dates: 'Present',
        bullets: [
          'Lead technology company focused on software, cybersecurity, and IT solutions.',
          'Manage digital product development and business strategy.',
          'Oversee technical teams and innovation projects.',
        ],
      },
      {
        role: 'Systems Administrator',
        company: 'Township of Congo Town',
        dates: '2018 – 2022',
        bullets: [
          'Managed IT infrastructure, users, and network systems.',
          'Performed system troubleshooting, maintenance, and access control.',
        ],
      },
      {
        role: 'IT Technician',
        company: 'J.C.A',
        dates: '2021 – 2023',
        bullets: ['Installed and maintained IT systems and hardware; provided technical support.'],
      },
      {
        role: 'Network Technician',
        company: 'Tonboi Innovative Group',
        dates: '2022 – 2023',
        bullets: ['Supported network deployment, configured routers and switches.'],
      },
    ],
    projects: [
      {
        title: 'AI-Based Eye Tracking Examination System',
        description:
          'Examination system using real-time eye tracking (Flask, OpenCV, MediaPipe).',
      },
      {
        title: 'Smart Campus Communication and Collaboration System',
        description:
          'Multi-tenant platform where institutions rent workspaces to manage students, staff and lecturers.',
        link: 'https://scccs-next-gen-nine.vercel.app/',
      },
      {
        title: 'Smart Rehabilitation System (Digital Physiotherapist)',
        description:
          'Digital physiotherapy system supporting guided patient rehabilitation.',
      },
      {
        title: 'GiinMeet',
        description: 'Web application within the GIIN product ecosystem.',
        link: 'https://giinmeet.nimdaukus.com/',
      },
      {
        title: 'SUKU’s Professional Portfolio',
        description: 'Personal portfolio showcasing projects and experience.',
        link: 'https://sukuportfolio.nimdaukus.com/',
      },
      {
        // Spelled "BugerHub" on the Executive CV; reproduced as printed.
        title: 'BugerHub',
        description: 'Responsive restaurant web application.',
        link: 'https://burgerhub.vercel.app',
      },
      {
        title: 'GIIN Digital Ecosystem',
        description:
          'Suite of business systems and platforms powering Global Impact Innovators Ltd.',
        link: 'https://giin-website-frontend.vercel.app/',
      },
    ],
    education: {
      degree: 'BSc Information Technology (Option in Networking)',
      institution: 'University of Lay Adventists of Kigali (UNILAK)',
      // The Executive CV prints no dates for the degree (docx + PDF agree).
      dates: '',
    },
    certs: CERTS_EXECUTIVE,
    languages: COMMON_LANGUAGES,
    references: [
      {
        ...REF_SHEKINA,
        title: 'Managing Director (MD)',
        org: 'Global Impact Innovators Ltd (GIIN)',
      },
      {
        name: 'Dr. Juma Sumbiri',
        title: 'Senior Lecturer',
        org: 'UNILAK',
        phone: '+250 789 809 219',
        email: 'sumbiridj@gmail.com',
      },
      {
        name: 'Dr. Irenee Mungwarakamarama',
        title: 'Senior Lecturer',
        org: 'UNILAK',
        phone: '+250 793 211 640',
        email: 'ireneemungwarakamarama@gmail.com',
      },
    ],
  },
}

/** Resolve a variant id to its content, defaulting to Frontend for unknown ids. */
export const getCVVariant = (variantId?: CVVariantId): CVVariantContent =>
  CV_VARIANT_DATA[variantId ?? 'frontend'] ?? CV_VARIANT_DATA.frontend

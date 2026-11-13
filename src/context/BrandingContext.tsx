/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { isSha256Hex } from '../lib/sha256'
import { supabase } from '../supabaseClient'
import { CV_VARIANT_FILENAMES, getCVVariant } from '../data/cvVariants'
import type { CVVariantContent, CVVariantId } from '../data/cvVariants'

// Default admin password, stored ONLY as its SHA-256 hash. The plaintext is
// never written to code, storage, or git history. To rotate the password,
// replace this hash with the SHA-256 hash of the new password.
export const DEFAULT_ADMIN_PASSWORD_HASH =
  '63cd97af0603fc96d5e24c6c67877878dd2c359326aaaebfdc0ad075ab4a14fc'


export type VisualMode = 'flat' | 'neumorphic' | 'glassmorphic' | 'claymorphic'
export type PersonaTone = 'executive' | 'technologist' | 'academic'
export type ThemeMode = 'dark' | 'light'

export interface ServiceItem {
  id: string
  title: string
  description: string
  iconName: string // e.g. 'Code', 'ShieldCheck', 'Network', 'Zap'
  badge: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: 'dev' | 'cyber-net' | 'venture' | 'content'
  tech: string[]
  iconName: string // e.g. 'Video', 'ShoppingBag', 'Clapperboard', 'BookOpen'
  // 'showcase' renders the clean typographic/icon card. The older vector
  // mockup values are kept for backwards compatibility with stored rows
  // and also render as the showcase card.
  mockup: 'showcase' | 'eye-tracking' | 'certificate-auth' | 'network-routing' | 'giin-portal'
  link: string
  // Live homepage / live site for the project. Shown on the card as a
  // "Visit live site" button and makes the demo box clickable. Only set
  // when the URL has been verified to return HTTP 200 — never guessed.
  // Older stored rows may only have `link`; rendering falls back to it.
  liveUrl?: string
  status?: string // e.g. 'Live', 'In build', 'In formation', 'Complete', 'In progress'
  // Source-code gating: when repoGated is true the repo is shown by name +
  // description only, with an "Unlock source access" flow. The actual repo
  // URL is NEVER stored in code or in a Supabase row — it is handed over
  // only after payment, via the payment link configured in the gating UI.
  repoName?: string
  repoDescription?: string
  repoGated?: boolean
  // Flutterwave (confirmed payment provider): the payment link Suku creates
  // in his Flutterwave for Business dashboard for this repo, and the price
  // he sets. Both are empty until he supplies them — never invent a price.
  // Until repoPaymentLink is set the gate shows "payment setup in progress".
  repoPaymentLink?: string
  repoPrice?: string
}

export interface CertItem {
  id: string
  title: string
  issuer: string
  details: string
  date: string
  authority: string
  imageUrl?: string
  link?: string // optional link to the certificate file (only where a real PDF exists)
}

export interface MetricItem {
  id: string
  value: string
  label: string
  iconName: string
}

export interface ColorPreset {
  name: string
  primaryH: number
  primaryS: string
  primaryL: string
  secondaryH: number
  secondaryS: string
  secondaryL: string
  bgH: number
  bgS: string
  bgL: string
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: '8Bees Premium',
    primaryH: 69,
    primaryS: '82%',
    primaryL: '41%',
    secondaryH: 192,
    secondaryS: '24%',
    secondaryL: '50%',
    bgH: 0,
    bgS: '0%',
    bgL: '16%'
  },
  {
    name: 'Midnight Gold',
    primaryH: 38,
    primaryS: '96%',
    primaryL: '53%',
    secondaryH: 220,
    secondaryS: '54%',
    secondaryL: '16%',
    bgH: 240,
    bgS: '67%',
    bgL: '2%'
  },
  {
    name: 'Deep Emerald',
    primaryH: 150,
    primaryS: '84%',
    primaryL: '37%',
    secondaryH: 160,
    secondaryS: '40%',
    secondaryL: '12%',
    bgH: 170,
    bgS: '50%',
    bgL: '2%'
  },
  {
    name: 'Royal Velvet',
    primaryH: 270,
    primaryS: '85%',
    primaryL: '60%',
    secondaryH: 280,
    secondaryS: '50%',
    secondaryL: '15%',
    bgH: 290,
    bgS: '60%',
    bgL: '2%'
  },
  {
    name: 'Cyberpunk Neon',
    primaryH: 320,
    primaryS: '100%',
    primaryL: '55%',
    secondaryH: 190,
    secondaryS: '100%',
    secondaryL: '40%',
    bgH: 250,
    bgS: '70%',
    bgL: '2%'
  },
  {
    name: 'Sunset Pastel',
    primaryH: 18,
    primaryS: '95%',
    primaryL: '60%',
    secondaryH: 340,
    secondaryS: '80%',
    secondaryL: '20%',
    bgH: 230,
    bgS: '40%',
    bgL: '4%'
  },
  {
    name: 'Nordic Frost',
    primaryH: 193,
    primaryS: '43%',
    primaryL: '67%',
    secondaryH: 220,
    secondaryS: '17%',
    secondaryL: '35%',
    bgH: 220,
    bgS: '16%',
    bgL: '22%'
  },
  {
    name: 'Vaporwave Retro',
    primaryH: 321,
    primaryS: '100%',
    primaryL: '72%',
    secondaryH: 191,
    secondaryS: '99%',
    secondaryL: '50%',
    bgH: 266,
    bgS: '70%',
    bgL: '12%'
  },
  {
    name: 'Matrix Terminal',
    primaryH: 135,
    primaryS: '100%',
    primaryL: '50%',
    secondaryH: 127,
    secondaryS: '100%',
    secondaryL: '28%',
    bgH: 120,
    bgS: '13%',
    bgL: '5%'
  },
  {
    name: 'Tokyo Skyline',
    primaryH: 4,
    primaryS: '98%',
    primaryL: '66%',
    secondaryH: 240,
    secondaryS: '20%',
    secondaryL: '31%',
    bgH: 240,
    bgS: '36%',
    bgL: '6%'
  }
]

export interface HeroCopyItem {
  eyebrow: string
  title: string
  description: string
  badges: string
  card1Title: string
  card1Subtitle: string
  card2Title: string
  card2Subtitle: string
}

export interface PersonaCopyMap {
  technologist: HeroCopyItem
  executive: HeroCopyItem
  academic: HeroCopyItem
}

export const DEFAULT_HERO_COPY: PersonaCopyMap = {
  technologist: {
    eyebrow: "HELLO, I'M SUKU",
    title: "Building Secure, Scalable, and Intelligent Digital Systems.",
    description: "I am a Frontend Developer at UBWENGE LAB and the Founder & CEO of GIIN Ltd in Kigali, Rwanda. I build secure, scalable systems — from live video platforms to marketplaces — and teach the next generation of network engineers.",
    badges: "UBWENGE LAB, GiinMeet, React & Next.js, UNILAK IT, GIIN Ltd",
    card1Title: "Developer",
    card1Subtitle: "UBWENGE LAB",
    card2Title: "AFRETEC",
    card2Subtitle: "Cybersecurity Certified"
  },
  executive: {
    eyebrow: "FOUNDER & ENTERPRISE BLUEPRINT",
    title: "Driving Digital Innovation & Strategic Tech Ventures.",
    description: "Founder and CEO of GIIN Ltd. Fusing corporate IT strategy with scalable digital architectures to catalyze business growth and innovation ecosystems across East Africa.",
    badges: "GIIN Ltd, Tech Venture Operations, IT Consultancy, Strategic Scaling, Africa Tech",
    card1Title: "Founder & CEO",
    card1Subtitle: "GIIN Ltd",
    card2Title: "IT Strategy",
    card2Subtitle: "Venture Consulting"
  },
  academic: {
    eyebrow: "SYSTEMS RESEARCH & SCHOLARSHIP",
    title: "Advancing Security Analytics & Systems Engineering.",
    description: "Alumnus of the CMU-Africa Bridge Program and AFRETEC Cybersecurity scholar. Fusing computer systems research with advanced threat diagnostics and Cisco switching topologies.",
    badges: "CMU-Africa Alumnus, AFRETEC Cyber, UNILAK IT Specialisation, Steganography Research, SIEM Fundamentals",
    card1Title: "Researcher",
    card1Subtitle: "CMU-Africa Track",
    card2Title: "AFRETEC",
    card2Subtitle: "Cybersecurity Certified"
  }
}

export interface ProfileDetails {
  name: string
  initials: string
  role: string
  company: string
  email: string
  email2?: string
  whatsappUrl?: string
  phone?: string
  facebookUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
  location: string
  cvPath: string
  linkedinUrl: string
  githubUrl: string
  githubUrl2?: string
  githubUrl3?: string
  githubUrl4?: string
  profileImage: string
  logoImage: string
}

interface BrandingContextType {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  visualMode: VisualMode
  setVisualMode: (mode: VisualMode) => void
  borderRadius: number
  setBorderRadius: (radius: number) => void
  primaryH: number
  setPrimaryH: (h: number) => void
  primaryS: string
  setPrimaryS: (s: string) => void
  primaryL: string
  setPrimaryL: (l: string) => void
  secondaryH: number
  setSecondaryH: (h: number) => void
  secondaryS: string
  setSecondaryS: (s: string) => void
  secondaryL: string
  setSecondaryL: (l: string) => void
  bgH: number
  setBgH: (h: number) => void
  bgS: string
  setBgS: (s: string) => void
  bgL: string
  setBgL: (l: string) => void
  
  personaTone: PersonaTone
  setPersonaTone: (tone: PersonaTone) => void
  profile: ProfileDetails
  setProfile: (profile: ProfileDetails) => void
  
  services: ServiceItem[]
  setServices: (services: ServiceItem[]) => void
  projects: ProjectItem[]
  setProjects: (projects: ProjectItem[]) => void
  certifications: CertItem[]
  setCertifications: (certs: CertItem[]) => void
  metrics: MetricItem[]
  setMetrics: (metrics: MetricItem[]) => void
  
  applyPreset: (preset: ColorPreset) => void
  resetToDefaults: () => void
  toggleTheme: () => void
  
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  adminUsername: string
  setAdminUsername: (username: string) => void
  // Stored admin credential, as a SHA-256 hex hash — never plaintext.
  adminPassword: string
  setAdminPassword: (passwordHash: string) => void
  heroCopy: PersonaCopyMap
  setHeroCopy: (copy: PersonaCopyMap) => void
  downloadCV: (format: 'pdf' | 'word' | 'png', variantId?: CVVariantId) => Promise<void>
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined)

const DEFAULT_PROFILE: ProfileDetails = {
  name: 'Mensah Q. Suku Jr',
  initials: 'M',
  role: 'Founder & CEO',
  company: 'Global Impact Innovators Ltd (GIIN)',
  email: 'mensahqsukujr@gmail.com',
  email2: 'globalimpactinnovatorsltd@gmail.com',
  whatsappUrl: 'https://wa.me/250798655345',
  phone: '+250 798 655 345',
  facebookUrl: '',
  instagramUrl: '',
  tiktokUrl: 'https://www.tiktok.com/@kitothesage',
  location: 'Kigali, Rwanda',
  cvPath: '/Mensah_Suku_CV.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/mensah-q-suku-jr-4ba086292',
  githubUrl: 'https://github.com/nimdaukus',
  githubUrl2: 'https://github.com/Global-Impact-Innovators-Ltd-GIIN',
  githubUrl3: '',
  githubUrl4: '',
  profileImage: '/profile.jpg',
  logoImage: '/logo.png'
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Frontend Development',
    description: 'Building fast, responsive, and stunning interfaces using React.js ecosystem, TypeScript, Tailwind CSS, and Framer Motion. Ensuring premium UI/UX implementations.',
    iconName: 'Code',
    badge: 'React & TS'
  },
  {
    id: 's2',
    title: 'Cybersecurity Operations',
    description: 'Deploying endpoint security, threat intelligence modeling, SIEM fundamentals, and security protocols to safeguard digital infrastructures.',
    iconName: 'ShieldCheck',
    badge: 'AFRETEC Cert'
  },
  {
    id: 's3',
    title: 'Network Engineering',
    description: 'Designing enterprise network architecture, routing & switching configurations, and monitoring capabilities leveraging Cisco technologies.',
    iconName: 'Network',
    badge: 'UNILAK IT'
  },
  {
    id: 's4',
    title: 'Digital Transformation',
    description: 'Providing IT consultancy, corporate portal implementations, business automation, and digital scaling blueprints via Global Impact Innovators Ltd (GIIN).',
    iconName: 'Zap',
    badge: 'GIIN Innovation'
  },
  {
    id: 's5',
    title: 'Technical Teaching & Mentorship',
    description: 'Teaching networking and Windows Server administration to senior-high (S4–S6) students in Kigali — 46 video lessons across 23 modules, built on a hands-on VMware lab.',
    iconName: 'GraduationCap',
    badge: '46 Lessons'
  }
]

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'GiinMeet',
    subtitle: 'Live video meeting platform for teams — waiting room and passcodes, host controls, end-for-all, screen share, hand raise, polls, whiteboard and attendance.',
    category: 'dev',
    tech: ['Next.js 16', 'LiveKit', 'Supabase', 'TypeScript'],
    iconName: 'Video',
    mockup: 'showcase',
    link: 'https://giinmeet.nimdaukus.com',
    liveUrl: 'https://giinmeet.nimdaukus.com',
    status: 'Live',
    repoName: 'GiinMeet',
    repoDescription: 'Next.js video-meeting platform — LiveKit rooms, Supabase backend, waiting room and passcodes, host controls, attendance and meeting templates.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p2',
    title: 'eWaterside',
    subtitle: 'Multi-vendor marketplace for Liberia and the first pilot venture of Melloon. Suku is building the backend; launch targeted for early February 2027.',
    category: 'venture',
    tech: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis'],
    iconName: 'ShoppingBag',
    mockup: 'showcase',
    link: '',
    status: 'In build',
    repoName: 'eWaterside',
    repoDescription: 'NestJS and Prisma backend for the multi-vendor Liberia marketplace.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p3',
    title: 'Melloon',
    subtitle: 'Kigali holding company Suku co-founded as CEO — fintech and payments, housing, biometrics and ID, ed-tech and government digital solutions. In formation.',
    category: 'venture',
    tech: ['Fintech', 'Biometrics & ID', 'Ed-tech', 'GovTech'],
    iconName: 'Building2',
    mockup: 'showcase',
    link: '',
    status: 'In formation',
    repoName: 'Melloon',
    repoDescription: 'Codebase for Melloon ventures and shared platform systems.',
    repoGated: true,
    repoPrice: '$49'
  },
  {
    id: 'p4',
    title: 'Windows Server Administration Course',
    subtitle: '46 video lessons teaching Windows Server administration to S4–S6 networking students in Kigali — 23 modules each in 2025 and 2008 modes.',
    category: 'cyber-net',
    tech: ['Windows Server 2025', 'Windows Server 2008', 'VMware', 'Active Directory'],
    iconName: 'GraduationCap',
    mockup: 'showcase',
    link: '',
    status: 'Complete',
    repoName: 'Windows Server Administration Course',
    repoDescription: 'Course materials, lab scripts and configurations for the 46-lesson Windows Server course.',
    repoGated: true,
    repoPrice: '$49'
  },
  {
    id: 'p5',
    title: 'Kito — The Sage',
    subtitle: 'Daily stickman science explainers on TikTok — six short videos a day, each answering one curious question about life, science and how things work.',
    category: 'content',
    tech: ['TikTok', 'Short-form video', 'Storytelling'],
    iconName: 'Lightbulb',
    mockup: 'showcase',
    link: 'https://www.tiktok.com/@kitothesage',
    liveUrl: 'https://www.tiktok.com/@kitothesage',
    status: 'Live',
    repoName: 'Kito',
    repoDescription: 'Production scripts, prompts and pipeline for the Kito daily explainers.',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p6',
    title: 'UKUS Studio',
    subtitle: 'African short dramas on TikTok. Episode 1, “The Hidden Banker”, is live now — a night guard mocked by his own bank’s staff turns out to own the bank.',
    category: 'content',
    tech: ['TikTok', 'Short drama', 'Storytelling'],
    iconName: 'Clapperboard',
    mockup: 'showcase',
    link: 'https://www.tiktok.com/@ukusstudio',
    liveUrl: 'https://www.tiktok.com/@ukusstudio',
    status: 'Live',
    repoName: 'UKUS Studio',
    repoDescription: 'Scripts, continuity bibles and production files for the UKUS short dramas.',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p7',
    title: 'The Sovereign Mind',
    subtitle: 'Suku’s book in progress on metacognition — escaping inherited beliefs through the power of thinking about thinking. Chapters 11–13 and the Epilogue are written.',
    category: 'content',
    tech: ['Non-fiction', 'Metacognition', 'Writing'],
    iconName: 'BookOpen',
    mockup: 'showcase',
    link: '',
    status: 'In progress',
    repoName: 'The Sovereign Mind',
    repoDescription: 'Manuscript and publishing files for the book in progress.',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p8',
    title: 'VMware Enterprise Lab — lab.local',
    subtitle: 'Private VMware teaching lab on 192.168.10.0/24 — SRV1 and SRV2 domain controllers with Active Directory, DNS and DHCP, VLANs and subnetting, built for S4–S6 networking lessons and the Windows Server course.',
    category: 'cyber-net',
    tech: ['VMware', 'Windows Server', 'Active Directory', 'DNS', 'DHCP'],
    iconName: 'Server',
    mockup: 'showcase',
    link: '',
    status: 'Ongoing',
    repoName: 'VMware Enterprise Lab',
    repoDescription: 'Lab configurations, VM definitions and network setup for the lab.local teaching lab.',
    repoGated: true,
    repoPrice: '$49'
  },
  {
    id: 'p9',
    title: 'Networking Lessons v2 — S4–S6',
    subtitle: 'Cisco-driven networking lessons for senior-high students in Kigali — 377 slides, 70% practical: subnetting and the Magic Number method, VLANs, routing, DNS/DHCP and Packet Tracer labs.',
    category: 'cyber-net',
    tech: ['Cisco', 'Packet Tracer', 'Subnetting', 'VLANs'],
    iconName: 'Network',
    mockup: 'showcase',
    link: '',
    status: 'Complete',
    repoName: 'Networking Lessons v2',
    repoDescription: 'Lesson decks, lab packs and Packet Tracer files for the S4-S6 networking course.',
    repoGated: true,
    repoPrice: '$49'
  },
  {
    id: 'p10',
    title: 'CareerDNA',
    subtitle: 'Multi-agent career intelligence platform — 14 specialist AI agents model a candidate against a target role, with ATS parser simulations, a recruiter eye-scan simulation and evidence-backed analytics.',
    category: 'dev',
    tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Supabase'],
    iconName: 'Brain',
    mockup: 'showcase',
    link: 'https://career-dna-lilac.vercel.app',
    liveUrl: 'https://career-dna-lilac.vercel.app',
    status: 'Live',
    repoName: 'CareerDNA',
    repoDescription: 'Multi-agent career intelligence platform — 14 specialist AI agents, ATS parser simulations, recruiter eye-scan and evidence verification.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p11',
    title: 'bugerhub',
    subtitle: 'Online food-ordering platform — browse the menu, order and track delivery, with separate dashboards for customers, chefs, riders and admins.',
    category: 'dev',
    tech: ['React 19', 'Vite', 'Supabase', 'TypeScript'],
    iconName: 'UtensilsCrossed',
    mockup: 'showcase',
    link: 'https://bugerhub.vercel.app',
    liveUrl: 'https://bugerhub.vercel.app',
    status: 'Live',
    repoName: 'bugerhub',
    repoDescription: 'Online food-ordering platform — menu, checkout and order tracking, with dashboards for customers, chefs, riders and admins.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p12',
    title: 'Blessed Travel — Tour Agency',
    subtitle: 'Travel and tour agency website — brochure and destination imagery, built with Next.js. Early build.',
    category: 'dev',
    tech: ['Next.js', 'TypeScript'],
    iconName: 'Plane',
    mockup: 'showcase',
    link: '',
    status: 'In build',
    repoName: 'Blessed-Travel-Tour-Agency',
    repoDescription: 'Travel and tour agency website (Next.js) — brochure and destination imagery.',
    repoGated: true,
    repoPrice: '$49'
  },
  {
    id: 'p13',
    title: 'GIIN Website',
    subtitle: 'The Global Impact Innovators Ltd company website — Next.js frontend with a TypeScript backend, Prisma and Docker.',
    category: 'dev',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Docker'],
    iconName: 'Globe',
    mockup: 'showcase',
    link: 'https://giin-website-frontend.vercel.app',
    liveUrl: 'https://giin-website-frontend.vercel.app',
    status: 'Live',
    repoName: 'GIIN_website_Frontend',
    repoDescription: 'The Global Impact Innovators Ltd company website — Next.js frontend, TypeScript backend, Prisma and Docker.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p14',
    title: 'eLiberia',
    subtitle: 'eLiberia platform — Next.js and TypeScript frontend and backend repos. Scaffold stage: READMEs and env examples only, no application code yet.',
    category: 'venture',
    tech: ['Next.js', 'TypeScript'],
    iconName: 'Flag',
    mockup: 'showcase',
    link: '',
    status: 'In formation',
    repoName: 'eLiberia',
    repoDescription: 'eLiberia platform — Next.js and TypeScript frontend and backend repos, scaffold stage (READMEs and env examples only).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p15',
    title: 'Giin Loan Service',
    subtitle: 'Loan service platform — clients apply online, approvals pass a multi-signature approval centre, then disbursements, invoices, receipts and portfolio tracking.',
    category: 'dev',
    tech: ['Next.js 14', 'Supabase', 'PostgreSQL', 'React 18'],
    iconName: 'Landmark',
    mockup: 'showcase',
    link: '',
    status: 'In build',
    repoName: 'Giin_Loan_Service',
    repoDescription: 'Loan service platform — online applications, multi-signature approval centre, disbursements, invoices, receipts and portfolio tracking.',
    repoGated: true,
    repoPrice: '$99'
  },
  {
    id: 'p16',
    title: 'GIINLIVE',
    subtitle: 'Live Score and team creation. Details unverified — private repo, description as shown on the GitHub profile.',
    category: 'dev',
    tech: ['TypeScript'],
    iconName: 'Trophy',
    mockup: 'showcase',
    link: '',
    repoName: 'GIINLIVE',
    repoDescription: 'Live Score and team creation. (Unverified — private repo; description as shown on the GitHub profile.)',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p17',
    title: 'Justcodewebsite',
    subtitle: 'Details unverified — private repo, not readable from here; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Globe',
    mockup: 'showcase',
    link: '',
    repoName: 'Justcodewebsite',
    repoDescription: 'Details unverified — private repo, not readable from here.',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p18',
    title: 'nimdA',
    subtitle: 'Details unverified — private repo, not readable from here; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'FolderGit',
    mockup: 'showcase',
    link: '',
    repoName: 'nimdA',
    repoDescription: 'Details unverified — private repo, not readable from here.',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p19',
    title: 'SCCCS-NextGen',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Cpu',
    mockup: 'showcase',
    link: '',
    repoName: 'SCCCS-NextGen',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p20',
    title: 'Smart Rehabilitation System',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'HeartPulse',
    mockup: 'showcase',
    link: '',
    repoName: 'Smart_Rehabilitation_system',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p21',
    title: 'Nimda-Ukus Smartschool',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'GraduationCap',
    mockup: 'showcase',
    link: '',
    repoName: 'Nimda-Ukus_smartschool',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p22',
    title: 'AI Agents for Beginners',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Bot',
    mockup: 'showcase',
    link: '',
    repoName: 'ai-agents-for-beginners',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p23',
    title: 'Obi-Kaya',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'FolderGit',
    mockup: 'showcase',
    link: '',
    repoName: 'Obi-Kaya',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p24',
    title: 'Sheane-Hub-Websie',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Globe',
    mockup: 'showcase',
    link: '',
    repoName: 'Sheane-Hub-Websie',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p25',
    title: 'Connectech Website',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Globe',
    mockup: 'showcase',
    link: '',
    repoName: 'Connectech-website',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  },
  {
    id: 'p26',
    title: 'Connectech',
    subtitle: 'Details unverified — the 11suku GitHub account is flagged and its repos cannot be read; Suku to confirm what this project is.',
    category: 'dev',
    tech: [],
    iconName: 'Network',
    mockup: 'showcase',
    link: '',
    repoName: 'Connectech',
    repoDescription: 'Details unverified — 11suku repo not readable (account flagged).',
    repoGated: true,
    repoPrice: '$29'
  }
]

const DEFAULT_CERTS: CertItem[] = [
  {
    id: 'c1',
    title: 'BSc in Information Technology – Networking',
    issuer: 'UNILAK (University of Lay Adventists of Kigali)',
    details: '75.60/100, Second Class Upper. Degree conferred 31 October 2026. Specialisation in enterprise routing and switching, systems architecture and security.',
    date: 'Oct 2026',
    authority: 'UNILAK',
  },
  {
    id: 'c2',
    title: 'Professional Certificate in Cybersecurity',
    issuer: 'AFRETEC (African Network for Education in Science and Technology)',
    details: 'Certificate of Participation. Security analytics, cryptography, endpoint protection, infrastructure audits and risk vectors.',
    date: 'Jan 2026',
    authority: 'AFRETEC Network',
    imageUrl: '/cyber_cert_doc.png',
    link: '/certs/Afretec_Cybersecurity.pdf'
  },
  {
    id: 'c3',
    title: 'CMU-Africa Bridge Program Graduate',
    issuer: 'Carnegie Mellon University Africa',
    details: 'Advanced engineering paradigms, computing models, systems and professional technology translation.',
    date: '2026',
    authority: 'CMU-Africa',
    link: '/certs/CMU-AFRICA_BRIDGE.pdf'
  },
  {
    id: 'c4',
    title: 'Cisco Networking Essentials',
    issuer: 'Cisco Networking Academy',
    details: 'Routing and switching fundamentals, network configuration and troubleshooting.',
    date: '',
    authority: 'Cisco'
  },
  {
    id: 'c5',
    title: 'Duolingo English Test — Overall 125',
    issuer: 'Duolingo',
    details: 'English proficiency certified: Speaking 135, Writing 115, Reading 125, Listening 115.',
    date: 'Feb 2026',
    authority: 'Duolingo'
  },
  {
    id: 'c6',
    title: 'CS406: Information Security',
    issuer: 'Saylor Academy',
    details: 'Information security fundamentals — threats, cryptography, access control and secure systems.',
    date: '',
    authority: 'Saylor Academy'
  },
  {
    id: 'c7',
    title: 'A Complete Course on Windows Server Administration',
    issuer: 'Coursera',
    details: 'Windows Server administration — installation, Active Directory, DNS, DHCP and server roles.',
    date: '',
    authority: 'Coursera'
  }
]

const DEFAULT_METRICS: MetricItem[] = [
  { id: 'm1', value: '46', label: 'Video lessons produced', iconName: 'Play' },
  { id: 'm2', value: '2', label: 'Companies founded', iconName: 'Building2' },
  { id: 'm3', value: '6', label: 'Explainers a day', iconName: 'Clapperboard' },
  { id: 'm4', value: '23', label: 'Course modules built', iconName: 'BookOpen' }
]

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true'
  })
  const [adminUsername, setAdminUsernameState] = useState<string>(() => {
    return localStorage.getItem('adminUsername') || 'mensahqsukujr@gmail.com'
  })
  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    const stored = localStorage.getItem('adminPassword')
    // Only a 64-char hex hash is ever kept. Any stored plaintext value
    // (e.g. the old default) is migrated to the hashed default.
    if (stored && isSha256Hex(stored)) return stored
    localStorage.setItem('adminPassword', DEFAULT_ADMIN_PASSWORD_HASH)
    return DEFAULT_ADMIN_PASSWORD_HASH
  })

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme') as ThemeMode) || 'light'
  })
  const [visualMode, setVisualMode] = useState<VisualMode>(() => {
    return (localStorage.getItem('visualMode') as VisualMode) || 'flat'
  })
  const [borderRadius, setBorderRadius] = useState<number>(() => {
    return Number(localStorage.getItem('borderRadius')) || 12
  })
  
  // Custom HSL state values
  const [primaryH, setPrimaryH] = useState<number>(() => Number(localStorage.getItem('primaryH')) || 69)
  const [primaryS, setPrimaryS] = useState<string>(() => localStorage.getItem('primaryS') || '82%')
  const [primaryL, setPrimaryL] = useState<string>(() => localStorage.getItem('primaryL') || '41%')

  const [secondaryH, setSecondaryH] = useState<number>(() => Number(localStorage.getItem('secondaryH')) || 192)
  const [secondaryS, setSecondaryS] = useState<string>(() => localStorage.getItem('secondaryS') || '24%')
  const [secondaryL, setSecondaryL] = useState<string>(() => localStorage.getItem('secondaryL') || '50%')

  const [bgH, setBgH] = useState<number>(() => Number(localStorage.getItem('bgH')) || 0)
  const [bgS, setBgS] = useState<string>(() => localStorage.getItem('bgS') || '0%')
  const [bgL, setBgL] = useState<string>(() => localStorage.getItem('bgL') || '16%')

  const [personaTone, setPersonaTone] = useState<PersonaTone>(() => {
    return (localStorage.getItem('personaTone') as PersonaTone) || 'technologist'
  })

  const [profile, setProfile] = useState<ProfileDetails>(() => {
    const saved = localStorage.getItem('profile')
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE
  })

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('services')
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES
  })

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('projects')
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS
  })

  const [certifications, setCertifications] = useState<CertItem[]>(() => {
    const saved = localStorage.getItem('certifications')
    return saved ? JSON.parse(saved) : DEFAULT_CERTS
  })

  const [metrics, setMetrics] = useState<MetricItem[]>(() => {
    const saved = localStorage.getItem('metrics')
    return saved ? JSON.parse(saved) : DEFAULT_METRICS
  })

  const [heroCopy, setHeroCopy] = useState<PersonaCopyMap>(() => {
    const saved = localStorage.getItem('heroCopy')
    return saved ? JSON.parse(saved) : DEFAULT_HERO_COPY
  })

  const setIsAuthenticated = (auth: boolean) => {
    setIsAuthenticatedState(auth)
    sessionStorage.setItem('isAdminAuthenticated', auth.toString())
  }
  const setAdminUsername = (username: string) => {
    setAdminUsernameState(username)
    localStorage.setItem('adminUsername', username)
  }
  // Stores a SHA-256 hex hash only — callers must hash the password first.
  // Non-hash values are ignored so plaintext can never be persisted.
  const setAdminPassword = (passwordHash: string) => {
    if (!isSha256Hex(passwordHash)) return
    setAdminPasswordState(passwordHash)
    localStorage.setItem('adminPassword', passwordHash)
  }

  // Sync theme class
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  // Load data from Supabase on mount
  useEffect(() => {
    const loadSupabaseData = async () => {
      try {
        // 1. Fetch Profile
        const { data: profileData, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', 'suku-operator')
          .maybeSingle()
        if (profileData && !profileErr) {
          setProfile(profileData)
        }

        // 2. Fetch Services
        const { data: servicesData, error: servicesErr } = await supabase
          .from('services')
          .select('*')
        if (servicesData && !servicesErr && servicesData.length > 0) {
          setServices(servicesData)
        }

        // 3. Fetch Projects
        const { data: projectsData, error: projectsErr } = await supabase
          .from('projects')
          .select('*')
        if (projectsData && !projectsErr && projectsData.length > 0) {
          setProjects(projectsData)
        }

        // 4. Fetch Certifications
        const { data: certsData, error: certsErr } = await supabase
          .from('certifications')
          .select('*')
        if (certsData && !certsErr && certsData.length > 0) {
          setCertifications(certsData)
        }

        // 5. Fetch Metrics
        const { data: metricsData, error: metricsErr } = await supabase
          .from('metrics')
          .select('*')
        if (metricsData && !metricsErr && metricsData.length > 0) {
          setMetrics(metricsData)
        }

        // 6. Fetch Hero Copy
        const { data: copyData, error: copyErr } = await supabase
          .from('hero_copy')
          .select('*')
        if (copyData && !copyErr && copyData.length > 0) {
          const map: PersonaCopyMap = { ...DEFAULT_HERO_COPY }
          copyData.forEach((row: any) => {
            const tone = row.persona as PersonaTone
            if (map[tone]) {
              map[tone] = {
                eyebrow: row.eyebrow,
                title: row.title,
                description: row.description,
                badges: row.badges,
                card1Title: row.card1Title,
                card1Subtitle: row.card1Subtitle,
                card2Title: row.card2Title,
                card2Subtitle: row.card2Subtitle
              }
            }
          })
          setHeroCopy(map)
        }

        // 7. Fetch Branding Settings
        const { data: settingsData, error: settingsErr } = await supabase
          .from('branding_settings')
          .select('*')
          .eq('id', 'suku-settings')
          .maybeSingle()
        if (settingsData && !settingsErr) {
          if (settingsData.theme) setThemeState(settingsData.theme)
          if (settingsData.visualMode) setVisualMode(settingsData.visualMode)
          if (settingsData.borderRadius) setBorderRadius(settingsData.borderRadius)
          if (settingsData.primaryH) setPrimaryH(settingsData.primaryH)
          if (settingsData.primaryS) setPrimaryS(settingsData.primaryS)
          if (settingsData.primaryL) setPrimaryL(settingsData.primaryL)
          if (settingsData.secondaryH) setSecondaryH(settingsData.secondaryH)
          if (settingsData.secondaryS) setSecondaryS(settingsData.secondaryS)
          if (settingsData.secondaryL) setSecondaryL(settingsData.secondaryL)
          if (settingsData.bgH) setBgH(settingsData.bgH)
          if (settingsData.bgS) setBgS(settingsData.bgS)
          if (settingsData.bgL) setBgL(settingsData.bgL)
          if (settingsData.personaTone) setPersonaTone(settingsData.personaTone)
        }
      } catch (e) {
        console.warn('Supabase initial fetch failed, falling back to local storage cache:', e)
      }
    }
    loadSupabaseData()
  }, [])

  // Listen to Supabase realtime database changes
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
        if (payload.new && Object.keys(payload.new).length > 0) {
          setProfile(payload.new as ProfileDetails)
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
        try {
          const { data } = await supabase.from('services').select('*')
          if (data && data.length > 0) setServices(data)
        } catch { /* fallback */ }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, async () => {
        try {
          const { data } = await supabase.from('projects').select('*')
          if (data && data.length > 0) setProjects(data)
        } catch { /* fallback */ }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certifications' }, async () => {
        try {
          const { data } = await supabase.from('certifications').select('*')
          if (data && data.length > 0) setCertifications(data)
        } catch { /* fallback */ }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'metrics' }, async () => {
        try {
          const { data } = await supabase.from('metrics').select('*')
          if (data && data.length > 0) setMetrics(data)
        } catch { /* fallback */ }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_copy' }, async () => {
        try {
          const { data } = await supabase.from('hero_copy').select('*')
          if (data && data.length > 0) {
            const map: PersonaCopyMap = { ...DEFAULT_HERO_COPY }
            data.forEach((row: any) => {
              const tone = row.persona as PersonaTone
              if (map[tone]) {
                map[tone] = {
                  eyebrow: row.eyebrow,
                  title: row.title,
                  description: row.description,
                  badges: row.badges,
                  card1Title: row.card1Title,
                  card1Subtitle: row.card1Subtitle,
                  card2Title: row.card2Title,
                  card2Subtitle: row.card2Subtitle
                }
              }
            })
            setHeroCopy(map)
          }
        } catch { /* fallback */ }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'branding_settings' }, (payload) => {
        if (payload.new && Object.keys(payload.new).length > 0) {
          const settings = payload.new as any
          if (settings.theme) setThemeState(settings.theme)
          if (settings.visualMode) setVisualMode(settings.visualMode)
          if (settings.borderRadius) setBorderRadius(settings.borderRadius)
          if (settings.primaryH) setPrimaryH(settings.primaryH)
          if (settings.primaryS) setPrimaryS(settings.primaryS)
          if (settings.primaryL) setPrimaryL(settings.primaryL)
          if (settings.secondaryH) setSecondaryH(settings.secondaryH)
          if (settings.secondaryS) setSecondaryS(settings.secondaryS)
          if (settings.secondaryL) setSecondaryL(settings.secondaryL)
          if (settings.bgH) setBgH(settings.bgH)
          if (settings.bgS) setBgS(settings.bgS)
          if (settings.bgL) setBgL(settings.bgL)
          if (settings.personaTone) setPersonaTone(settings.personaTone)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Save states to local storage and sync to Supabase in the background
  useEffect(() => {
    localStorage.setItem('visualMode', visualMode)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', visualMode })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [visualMode])

  useEffect(() => {
    localStorage.setItem('borderRadius', borderRadius.toString())
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', borderRadius })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [borderRadius])

  useEffect(() => {
    localStorage.setItem('primaryH', primaryH.toString())
    localStorage.setItem('primaryS', primaryS)
    localStorage.setItem('primaryL', primaryL)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', primaryH, primaryS, primaryL })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [primaryH, primaryS, primaryL])

  useEffect(() => {
    localStorage.setItem('secondaryH', secondaryH.toString())
    localStorage.setItem('secondaryS', secondaryS)
    localStorage.setItem('secondaryL', secondaryL)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', secondaryH, secondaryS, secondaryL })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [secondaryH, secondaryS, secondaryL])

  useEffect(() => {
    localStorage.setItem('bgH', bgH.toString())
    localStorage.setItem('bgS', bgS)
    localStorage.setItem('bgL', bgL)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', bgH, bgS, bgL })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [bgH, bgS, bgL])

  useEffect(() => {
    localStorage.setItem('personaTone', personaTone)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', personaTone })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [personaTone])

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
    const sync = async () => {
      try {
        await supabase.from('profiles').upsert({ id: 'suku-operator', ...profile })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [profile])

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services))
    const sync = async () => {
      try {
        const ids = services.map(s => s.id)
        if (ids.length > 0) {
          await supabase.from('services').delete().filter('id', 'not.in', `(${ids.join(',')})`)
        } else {
          await supabase.from('services').delete().neq('id', '')
        }
        for (const s of services) {
          await supabase.from('services').upsert(s)
        }
      } catch { /* silent fallback */ }
    }
    sync()
  }, [services])

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
    const sync = async () => {
      try {
        const ids = projects.map(p => p.id)
        if (ids.length > 0) {
          await supabase.from('projects').delete().filter('id', 'not.in', `(${ids.join(',')})`)
        } else {
          await supabase.from('projects').delete().neq('id', '')
        }
        for (const p of projects) {
          await supabase.from('projects').upsert(p)
        }
      } catch { /* silent fallback */ }
    }
    sync()
  }, [projects])

  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications))
    const sync = async () => {
      try {
        const ids = certifications.map(c => c.id)
        if (ids.length > 0) {
          await supabase.from('certifications').delete().filter('id', 'not.in', `(${ids.join(',')})`)
        } else {
          await supabase.from('certifications').delete().neq('id', '')
        }
        for (const c of certifications) {
          await supabase.from('certifications').upsert(c)
        }
      } catch { /* silent fallback */ }
    }
    sync()
  }, [certifications])

  useEffect(() => {
    localStorage.setItem('metrics', JSON.stringify(metrics))
    const sync = async () => {
      try {
        const ids = metrics.map(m => m.id)
        if (ids.length > 0) {
          await supabase.from('metrics').delete().filter('id', 'not.in', `(${ids.join(',')})`)
        } else {
          await supabase.from('metrics').delete().neq('id', '')
        }
        for (const m of metrics) {
          await supabase.from('metrics').upsert(m)
        }
      } catch { /* silent fallback */ }
    }
    sync()
  }, [metrics])

  useEffect(() => {
    localStorage.setItem('heroCopy', JSON.stringify(heroCopy))
    const sync = async () => {
      try {
        for (const tone of ['technologist', 'executive', 'academic'] as PersonaTone[]) {
          const item = heroCopy[tone]
          if (item) {
            await supabase.from('hero_copy').upsert({
              persona: tone,
              eyebrow: item.eyebrow,
              title: item.title,
              description: item.description,
              badges: item.badges,
              card1Title: item.card1Title,
              card1Subtitle: item.card1Subtitle,
              card2Title: item.card2Title,
              card2Subtitle: item.card2Subtitle
            })
          }
        }
      } catch { /* silent fallback */ }
    }
    sync()
  }, [heroCopy])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const sync = async () => {
      try {
        await supabase.from('branding_settings').upsert({ id: 'suku-settings', theme })
      } catch { /* silent fallback */ }
    }
    sync()
  }, [theme])

  // Sync CSS properties on root element
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary-h', primaryH.toString())
    root.style.setProperty('--primary-s', primaryS)
    root.style.setProperty('--primary-l', primaryL)

    root.style.setProperty('--secondary-h', secondaryH.toString())
    root.style.setProperty('--secondary-s', secondaryS)
    root.style.setProperty('--secondary-l', secondaryL)

    root.style.setProperty('--bg-h', bgH.toString())
    root.style.setProperty('--bg-s', bgS)
    root.style.setProperty('--bg-l', bgL)

    root.style.setProperty('--border-radius', `${borderRadius}px`)
  }, [primaryH, primaryS, primaryL, secondaryH, secondaryS, secondaryL, bgH, bgS, bgL, borderRadius])

  const applyPreset = (preset: ColorPreset) => {
    setPrimaryH(preset.primaryH)
    setPrimaryS(preset.primaryS)
    setPrimaryL(preset.primaryL)
    setSecondaryH(preset.secondaryH)
    setSecondaryS(preset.secondaryS)
    setSecondaryL(preset.secondaryL)
    setBgH(preset.bgH)
    setBgS(preset.bgS)
    setBgL(preset.bgL)
  }

  const resetToDefaults = () => {
    setThemeState('light')
    setVisualMode('flat')
    setBorderRadius(12)
    setPersonaTone('technologist')
    setProfile(DEFAULT_PROFILE)
    setServices(DEFAULT_SERVICES)
    setProjects(DEFAULT_PROJECTS)
    setCertifications(DEFAULT_CERTS)
    setMetrics(DEFAULT_METRICS)
    setHeroCopy(DEFAULT_HERO_COPY)
    setAdminUsernameState('mensahqsukujr@gmail.com')
    localStorage.setItem('adminUsername', 'mensahqsukujr@gmail.com')
    setAdminPasswordState(DEFAULT_ADMIN_PASSWORD_HASH)
    localStorage.setItem('adminPassword', DEFAULT_ADMIN_PASSWORD_HASH)
    setIsAuthenticated(false)
    applyPreset(COLOR_PRESETS[0]) // 8Bees Premium
  }

  const downloadCV = async (format: 'pdf' | 'word' | 'png', variantId?: CVVariantId): Promise<void> => {
    // Full per-variant CV content, built only from Suku's real CV files
    // (see src/data/cvVariants.ts). Defaults to Frontend when no variant
    // (or an unknown one) is requested.
    const cv: CVVariantContent = getCVVariant(variantId)
    const fileBase = `Mensah_Q_Suku_Jr_${CV_VARIANT_FILENAMES[cv.id]}_CV`

    const downloadBlob = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    if (format === 'word') {
      const esc = (s: string) =>
        s
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')

      let lastSection = ''
      const experienceHtml = cv.experience
        .map((job) => {
          const subhead =
            job.section && job.section !== lastSection
              ? `<h3>${esc(job.section)}</h3>`
              : ''
          lastSection = job.section ?? ''
          const location = job.location ? ` &mdash; ${esc(job.location)}` : ''
          return `${subhead}
            <div>
              <span class="item-title">${esc(job.role)} | ${esc(job.company)}${location}</span>
              <span class="item-subtitle">${esc(job.dates)}</span>
              <ul>${job.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
            </div>`
        })
        .join('')

      const docContent = `
        <html xmlns:o="urn:schemas-microsoft-excel-description-data:office:office" xmlns:w="urn:schemas-microsoft-excel-description-data:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8" />
          <title>Curriculum Vitae - ${esc(cv.name)} (${esc(CV_VARIANT_FILENAMES[cv.id])})</title>
          <style>
            body { font-family: 'Arial', sans-serif; color: #333333; line-height: 1.5; padding: 20px; }
            h1 { color: #A5BF13; font-size: 26pt; margin-bottom: 2px; text-transform: uppercase; }
            h2 { color: #292929; border-bottom: 2px solid #A5BF13; font-size: 16pt; margin-top: 20px; padding-bottom: 3px; }
            h3 { color: #555555; font-size: 12pt; margin-top: 14px; margin-bottom: 4px; text-transform: uppercase; }
            .subtitle { font-size: 14pt; font-weight: bold; color: #555555; }
            .contact-info { font-size: 10pt; margin-bottom: 20px; color: #666666; }
            .item-title { font-weight: bold; font-size: 11pt; color: #292929; }
            .item-subtitle { font-style: italic; font-size: 10pt; color: #555555; }
            .item-desc { font-size: 10pt; margin-bottom: 10px; color: #666666; }
            ul { font-size: 10pt; color: #666666; margin-top: 2px; }
          </style>
        </head>
        <body>
          <h1>${esc(cv.name.toUpperCase())}</h1>
          <div class="subtitle">${esc(cv.headline)}</div>
          ${cv.subHeadline ? `<div class="subtitle" style="font-size: 11pt;">${esc(cv.subHeadline)}</div>` : ''}
          <div class="contact-info">
            ${esc(cv.location)} | ${esc(cv.phone)} | ${esc(cv.email)}<br/>
            Portfolio: ${esc(cv.portfolio)} | LinkedIn: ${esc(cv.linkedin)}
          </div>

          <h2>PROFESSIONAL SUMMARY</h2>
          <p>${esc(cv.summary)}</p>

          <h2>CORE SKILLS</h2>
          <p>${cv.skills.map((s) => esc(s)).join(' &bull; ')}</p>

          <h2>PROFESSIONAL EXPERIENCE</h2>
          ${experienceHtml}

          ${
            cv.projects.length > 0
              ? `<h2>KEY PROJECTS</h2>
          ${cv.projects
            .map(
              (p) => `
            <div>
              <span class="item-title">${esc(p.title)}</span>
              <p class="item-desc">${esc(p.description)}${
                p.link
                  ? `<br/><a href="${esc(p.link)}">${esc(p.link)}</a>`
                  : ''
              }</p>
            </div>`
            )
            .join('')}`
              : ''
          }

          <h2>EDUCATION</h2>
          <div>
            <span class="item-title">${esc(cv.education.degree)}</span>
            ${cv.education.dates ? `<span class="item-subtitle">${esc(cv.education.dates)}</span>` : ''}
            <p class="item-desc">${esc(cv.education.institution)}</p>
          </div>

          <h2>CERTIFICATIONS</h2>
          <ul>
            ${cv.certs.map((c) => `<li><b>${esc(c.title)}</b> &mdash; ${esc(c.issuer)}</li>`).join('')}
          </ul>

          <h2>LANGUAGES</h2>
          <p>${cv.languages.map((l) => esc(l)).join(' &nbsp;|&nbsp; ')}</p>

          <h2>REFERENCES</h2>
          ${cv.references
            .map(
              (r) => `
            <div>
              <span class="item-title">${esc(r.name)}</span>
              <p class="item-desc">${esc(r.title)}, ${esc(r.org)}<br/>Tel: ${esc(r.phone)}${
                r.email ? `<br/>Email: ${esc(r.email)}` : ''
              }</p>
            </div>`
            )
            .join('')}
        </body>
        </html>
      `
      downloadBlob(
        new Blob(['\ufeff' + docContent], { type: 'application/msword' }),
        `${fileBase}.doc`
      )
      return
    }

    // ---- PDF / PNG: one tall canvas, single-column flow layout ----
    // The old 1200x1650 single page could only fit a summary plus the
    // first 4 certs/projects, so full experience never rendered. The canvas
    // is now tall enough for the whole variant and is cropped to the real
    // content height; PDF slices it into 1200x1650 pages, PNG downloads
    // the whole (tall) image.
    const PAGE_W = 1200
    const PAGE_H = 1650
    const MARGIN = 64
    const CONTENT_W = PAGE_W - MARGIN * 2
    const MAX_H = 6000

    const canvas = document.createElement('canvas')
    canvas.width = PAGE_W
    canvas.height = MAX_H
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, PAGE_W, MAX_H)

    const wrap = (text: string, font: string, maxWidth: number): string[] => {
      ctx.font = font
      const words = text.split(' ')
      const lines: string[] = []
      let line = ''
      for (const word of words) {
        const test = line ? `${line} ${word}` : word
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line)
          line = word
        } else {
          line = test
        }
      }
      if (line) lines.push(line)
      return lines
    }

    let y = 0

    // Header band
    ctx.fillStyle = '#A5BF13'
    ctx.fillRect(0, 0, PAGE_W, 10)
    y = 78
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 40px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(cv.name.toUpperCase(), MARGIN, y)
    y += 34
    ctx.fillStyle = '#A5BF13'
    for (const line of wrap(cv.headline, 'bold 17px sans-serif', CONTENT_W)) {
      ctx.font = 'bold 17px sans-serif'
      ctx.fillText(line, MARGIN, y)
      y += 24
    }
    if (cv.subHeadline) {
      ctx.fillStyle = '#555555'
      for (const line of wrap(cv.subHeadline, '15px sans-serif', CONTENT_W)) {
        ctx.font = '15px sans-serif'
        ctx.fillText(line, MARGIN, y)
        y += 22
      }
    }
    y += 8
    ctx.fillStyle = '#555555'
    ctx.font = '13.5px sans-serif'
    ctx.fillText(`${cv.location}  |  ${cv.phone}  |  ${cv.email}`, MARGIN, y)
    y += 22
    ctx.fillText(`Portfolio: ${cv.portfolio}  |  LinkedIn: ${cv.linkedin}`, MARGIN, y)
    y += 30
    ctx.fillStyle = '#A5BF13'
    ctx.fillRect(MARGIN, y, CONTENT_W, 3)
    y += 34

    const sectionHeading = (title: string) => {
      ctx.fillStyle = '#292929'
      ctx.font = 'bold 18px sans-serif'
      ctx.fillText(title, MARGIN, y)
      y += 10
      ctx.fillStyle = '#A5BF13'
      ctx.fillRect(MARGIN, y, CONTENT_W, 3)
      y += 28
    }

    const paragraph = (text: string, font = '14px sans-serif', lineHeight = 22) => {
      ctx.fillStyle = '#555555'
      for (const line of wrap(text, font, CONTENT_W)) {
        ctx.font = font
        ctx.fillText(line, MARGIN, y)
        y += lineHeight
      }
    }

    const bullet = (text: string, font = '13.5px sans-serif', lineHeight = 21) => {
      const indent = MARGIN + 18
      ctx.fillStyle = '#555555'
      ctx.font = font
      ctx.fillText('•', MARGIN, y)
      for (const line of wrap(text, font, CONTENT_W - 18)) {
        ctx.fillText(line, indent, y)
        y += lineHeight
      }
    }

    // Professional summary
    sectionHeading('PROFESSIONAL SUMMARY')
    paragraph(cv.summary)
    y += 16

    // Skills (the variant's own full list — never a hardcoded subset)
    sectionHeading('CORE SKILLS')
    paragraph(cv.skills.join('  •  '))
    y += 16

    // Experience — the section the old generator omitted entirely.
    sectionHeading('PROFESSIONAL EXPERIENCE')
    let lastSection = ''
    for (const job of cv.experience) {
      if (job.section && job.section !== lastSection) {
        ctx.fillStyle = '#555555'
        ctx.font = 'bold 14px sans-serif'
        ctx.fillText(job.section.toUpperCase(), MARGIN, y)
        y += 26
      }
      lastSection = job.section ?? ''
      const roleLine = `${job.role}  |  ${job.company}${job.location ? ` — ${job.location}` : ''}`
      ctx.fillStyle = '#292929'
      ctx.font = 'bold 15px sans-serif'
      ctx.fillText(roleLine, MARGIN, y)
      ctx.fillStyle = '#555555'
      ctx.font = '13px sans-serif'
      const datesWidth = ctx.measureText(job.dates).width
      ctx.fillText(job.dates, PAGE_W - MARGIN - datesWidth, y)
      y += 24
      for (const b of job.bullets) bullet(b)
      y += 10
    }
    y += 8

    // Projects (only the variants that have them: Frontend, Executive)
    if (cv.projects.length > 0) {
      sectionHeading('KEY PROJECTS')
      for (const p of cv.projects) {
        ctx.fillStyle = '#292929'
        ctx.font = 'bold 14.5px sans-serif'
        ctx.fillText(p.title, MARGIN, y)
        y += 22
        paragraph(p.description, '13px sans-serif', 20)
        if (p.link) {
          ctx.fillStyle = '#2F6F7E'
          ctx.font = '12.5px sans-serif'
          ctx.fillText(p.link, MARGIN, y)
          y += 20
        }
        y += 8
      }
      y += 8
    }

    // Education
    sectionHeading('EDUCATION')
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 15px sans-serif'
    ctx.fillText(cv.education.degree, MARGIN, y)
    if (cv.education.dates) {
      ctx.fillStyle = '#555555'
      ctx.font = '13px sans-serif'
      const dw = ctx.measureText(cv.education.dates).width
      ctx.fillText(cv.education.dates, PAGE_W - MARGIN - dw, y)
    }
    y += 24
    paragraph(cv.education.institution, '13.5px sans-serif', 21)
    y += 16

    // Certifications (the variant's own full list — never sliced to 4)
    sectionHeading('CERTIFICATIONS')
    for (const c of cv.certs) bullet(`${c.title} — ${c.issuer}`)
    y += 16

    // Languages (exactly as printed on the CV)
    sectionHeading('LANGUAGES')
    paragraph(cv.languages.join('   |   '))
    y += 16

    // References
    sectionHeading('REFERENCES')
    for (const r of cv.references) {
      ctx.fillStyle = '#292929'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText(r.name, MARGIN, y)
      y += 22
      paragraph(`${r.title}, ${r.org}`, '13px sans-serif', 20)
      paragraph(`Tel: ${r.phone}${r.email ? `  |  Email: ${r.email}` : ''}`, '13px sans-serif', 20)
      y += 8
    }

    const contentH = Math.min(y + 40, MAX_H)

    // Watermark (anti-piracy), drawn across the whole tall canvas.
    ctx.save()
    ctx.translate(PAGE_W / 2, contentH / 2)
    ctx.rotate(-Math.PI / 6)
    ctx.fillStyle = 'rgba(41, 41, 41, 0.05)'
    ctx.font = 'bold 30px sans-serif'
    ctx.textAlign = 'center'
    for (let i = -40; i <= 40; i++) {
      ctx.fillText('VERIFIED GENUINE CV // MENSAH SUKU JR PORTFOLIO SYSTEM', 0, i * 110)
    }
    ctx.restore()

    // Crop the working canvas to the real content height.
    const cropped = document.createElement('canvas')
    cropped.width = PAGE_W
    cropped.height = contentH
    const croppedCtx = cropped.getContext('2d')
    if (!croppedCtx) return
    croppedCtx.drawImage(canvas, 0, 0, PAGE_W, contentH, 0, 0, PAGE_W, contentH)

    if (format === 'pdf') {
      // jsPDF is loaded on demand so the main bundle stays lean.
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [PAGE_W, PAGE_H] })
      const pages = Math.max(1, Math.ceil(contentH / PAGE_H))
      for (let p = 0; p < pages; p++) {
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = PAGE_W
        pageCanvas.height = PAGE_H
        const pageCtx = pageCanvas.getContext('2d')
        if (!pageCtx) continue
        pageCtx.fillStyle = '#FFFFFF'
        pageCtx.fillRect(0, 0, PAGE_W, PAGE_H)
        pageCtx.drawImage(
          cropped,
          0, p * PAGE_H, PAGE_W, PAGE_H,
          0, 0, PAGE_W, PAGE_H
        )
        if (p > 0) pdf.addPage([PAGE_W, PAGE_H], 'portrait')
        pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, PAGE_W, PAGE_H)
      }
      pdf.save(`${fileBase}.pdf`)
    } else {
      downloadBlob(
        await new Promise<Blob>((resolve, reject) =>
          cropped.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png')
        ),
        `${fileBase}.png`
      )
    }
  }
  return (
    <BrandingContext.Provider
      value={{
        theme,
        setTheme,
        visualMode,
        setVisualMode,
        borderRadius,
        setBorderRadius,
        primaryH,
        setPrimaryH,
        primaryS,
        setPrimaryS,
        primaryL,
        setPrimaryL,
        secondaryH,
        setSecondaryH,
        secondaryS,
        setSecondaryS,
        secondaryL,
        setSecondaryL,
        bgH,
        setBgH,
        bgS,
        setBgS,
        bgL,
        setBgL,
        personaTone,
        setPersonaTone,
        profile,
        setProfile,
        services,
        setServices,
        projects,
        setProjects,
        certifications,
        setCertifications,
        metrics,
        setMetrics,
        applyPreset,
        resetToDefaults,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        adminUsername,
        setAdminUsername,
        adminPassword,
        setAdminPassword,
        heroCopy,
        setHeroCopy,
        downloadCV
      }}
    >
      {children}
    </BrandingContext.Provider>
  )
}

export const useBranding = () => {
  const context = useContext(BrandingContext)
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider')
  }
  return context
}

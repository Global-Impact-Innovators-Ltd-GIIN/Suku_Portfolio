/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

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
  category: 'dev' | 'cyber-net' | 'giin'
  tech: string[]
  iconName: string // e.g. 'Eye', 'Shield', 'Cpu', 'Layout'
  mockup: 'eye-tracking' | 'certificate-auth' | 'network-routing' | 'giin-portal'
  link: string
}

export interface CertItem {
  id: string
  title: string
  issuer: string
  details: string
  date: string
  authority: string
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
    description: "I am a Frontend Developer at UBWENGE LAB and the Founder & CEO of GIIN Ltd. Fusing robust UI engineering with enterprise security and networking infrastructure.",
    badges: "UBWENGE LAB, React & TS, UNILAK IT, Cisco Routing, GIIN Ltd",
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
  location: string
  cvPath: string
  linkedinUrl: string
  githubUrl: string
  profileImage: string // Base64 or path
  logoImage: string // Base64 or path
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
  adminPassword: string
  setAdminPassword: (password: string) => void
  heroCopy: PersonaCopyMap
  setHeroCopy: (copy: PersonaCopyMap) => void
  downloadCV: () => void
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined)

const DEFAULT_PROFILE: ProfileDetails = {
  name: 'Mensah Q. Suku Jr',
  initials: 'M',
  role: 'Founder & CEO',
  company: 'Global Impact Innovators Ltd (GIIN)',
  email: 'mensahqsukujr@gmail.com',
  location: 'Kigali, Rwanda',
  cvPath: '/Mensah_Suku_CV.pdf',
  linkedinUrl: 'https://linkedin.com',
  githubUrl: 'https://github.com',
  profileImage: '/profile.png',
  logoImage: ''
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
  }
]

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'AI Eye Tracking Examination Monitoring',
    subtitle: 'Computer Vision invigilation system detecting pupil movements and facial landmarks.',
    category: 'dev',
    tech: ['Flask', 'OpenCV', 'MediaPipe', 'SQLite'],
    iconName: 'Eye',
    mockup: 'eye-tracking',
    link: 'https://github.com'
  },
  {
    id: 'p2',
    title: 'Academic Certificate Authentication',
    subtitle: 'Cryptographic registration and digital steganography for certificate anti-forgery.',
    category: 'cyber-net',
    tech: ['Python', 'Steganography', 'AES-256', 'Crypto'],
    iconName: 'Shield',
    mockup: 'certificate-auth',
    link: 'https://github.com'
  },
  {
    id: 'p3',
    title: 'Smart City Network Architecture',
    subtitle: 'Centralized network layout with intelligent routing nodes, SIEM filters, and failovers.',
    category: 'cyber-net',
    tech: ['Cisco Packet Tracer', 'SIEM', 'IPSec VPN', 'Subnetting'],
    iconName: 'Cpu',
    mockup: 'network-routing',
    link: 'https://github.com'
  },
  {
    id: 'p4',
    title: 'GIIN Digital Corporate Ecosystem',
    subtitle: 'Enterprise corporate portal, microfinance loan engine, and CRM tools for GIIN clients.',
    category: 'giin',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    iconName: 'Layout',
    mockup: 'giin-portal',
    link: 'https://github.com'
  }
]

const DEFAULT_CERTS: CertItem[] = [
  {
    id: 'c1',
    title: 'Professional Certificate in Cybersecurity',
    issuer: 'AFRETEC (African Network for Education in Science and Technology)',
    details: 'Comprehensive security analytics, cryptography, endpoint protection, infrastructure audits, and risk vectors.',
    date: '2025',
    authority: 'AFRETEC Network'
  },
  {
    id: 'c2',
    title: 'CMU-Africa Bridge Program Graduate',
    issuer: 'Carnegie Mellon University Africa',
    details: 'Advanced engineering paradigms, computing models, systems, and professional technology translation.',
    date: '2024',
    authority: 'CMU-Africa'
  },
  {
    id: 'c3',
    title: 'BSc in Information Technology – Networking',
    issuer: 'UNILAK (University of Lay Adventists of Kigali)',
    details: 'Final-year specialization in enterprise routing/switching, system architecture, database administration, and security.',
    date: 'Expected 2026',
    authority: 'UNILAK IT Dept'
  },
  {
    id: 'c4',
    title: 'Leadership & Entrepreneurship Track',
    issuer: 'Global Impact Innovators Ltd. (GIIN)',
    details: 'Strategic leadership, venture creation, African digital ecosystem deployment, and technology project consulting.',
    date: 'Current',
    authority: 'GIIN Leadership'
  }
]

const DEFAULT_METRICS: MetricItem[] = [
  { id: 'm1', value: '80+', label: 'GIIN Clients Served', iconName: 'Users' },
  { id: 'm2', value: '4+', label: 'Core Tech Domains', iconName: 'Compass' },
  { id: 'm3', value: '100%', label: 'Cybersecurity Compliant', iconName: 'Shield' },
  { id: 'm4', value: 'CMU', label: 'Africa Alumnus Track', iconName: 'BookOpen' }
]

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true'
  })
  const [adminUsername, setAdminUsernameState] = useState<string>(() => {
    return localStorage.getItem('adminUsername') || 'mensahqsukujr@gmail.com'
  })
  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    return localStorage.getItem('adminPassword') || 'mqsukuadmin'
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
  const setAdminPassword = (password: string) => {
    setAdminPasswordState(password)
    localStorage.setItem('adminPassword', password)
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
    setAdminPasswordState('mqsukuadmin')
    localStorage.setItem('adminPassword', 'mqsukuadmin')
    setIsAuthenticated(false)
    applyPreset(COLOR_PRESETS[0]) // 8Bees Premium
  }

  const downloadCV = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1650
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw left panel container (Aesthetic slate/gray highlight panel)
    ctx.fillStyle = '#F0F0F0'
    ctx.fillRect(0, 0, 420, canvas.height)

    // Left Panel content: Initials Arc
    ctx.fillStyle = '#A5BF13'
    ctx.beginPath()
    ctx.arc(210, 120, 50, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(profile.initials || 'MS', 210, 132)

    // Contact Title
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('CONTACT DETAILS', 40, 240)
    
    // Draw contact divider
    ctx.fillStyle = '#62929E'
    ctx.fillRect(40, 250, 340, 3)

    // Details text
    ctx.fillStyle = '#555555'
    ctx.font = '14px sans-serif'
    ctx.fillText(`📧 ${profile.email}`, 40, 290)
    ctx.fillText(`📞 +250 780 000 000`, 40, 325)
    ctx.fillText(`📍 ${profile.location}`, 40, 360)
    ctx.fillText(`🔗 linkedin.com/in/mensah-suku`, 40, 395)

    // Skills Section
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('CORE COMPETENCIES', 40, 480)
    ctx.fillStyle = '#62929E'
    ctx.fillRect(40, 490, 340, 3)

    const skillList = [
      'React / TypeScript',
      'Cybersecurity Auditing',
      'Cisco Network Routing',
      'Steganographic Coding',
      'IT Venture Strategy',
      'Vite & Responsive UX/UI'
    ]
    ctx.fillStyle = '#555555'
    ctx.font = '13px sans-serif'
    skillList.forEach((sk, i) => {
      ctx.fillText(`⚡ ${sk}`, 40, 525 + i * 32)
    })

    // Languages Section
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('LANGUAGES', 40, 750)
    ctx.fillStyle = '#62929E'
    ctx.fillRect(40, 760, 340, 3)
    ctx.fillStyle = '#555555'
    ctx.font = '14px sans-serif'
    ctx.fillText('• English (Professional)', 40, 800)
    ctx.fillText('• French (Conversational)', 40, 835)

    // Right Column content
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 42px sans-serif'
    ctx.fillText(profile.name.toUpperCase(), 460, 110)

    ctx.fillStyle = '#A5BF13'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText(`${profile.role} • ${profile.company}`, 460, 145)

    // Biography Section
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('PROFESSIONAL SUMMARY', 460, 240)
    ctx.fillStyle = '#A5BF13'
    ctx.fillRect(460, 250, 700, 3)

    ctx.fillStyle = '#555555'
    ctx.font = '14px sans-serif'
    const activeCopy = heroCopy[personaTone] || heroCopy.technologist
    const bioText = activeCopy.description
    const words = bioText.split(' ')
    let line = ''
    let y = 285
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      if (ctx.measureText(testLine).width > 700 && n > 0) {
        ctx.fillText(line, 460, y)
        line = words[n] + ' '
        y += 22
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 460, y)

    // Credentials / Education Section
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('CREDENTIALS & SECURITY CERTIFICATIONS', 460, 380)
    ctx.fillStyle = '#A5BF13'
    ctx.fillRect(460, 390, 700, 3)

    certifications.slice(0, 4).forEach((cert, i) => {
      ctx.fillStyle = '#292929'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText(cert.title, 460, 430 + i * 65)
      ctx.fillStyle = '#555555'
      ctx.font = '12px sans-serif'
      ctx.fillText(`${cert.issuer} (${cert.date}) • Authority ID: ${cert.authority || 'N/A'}`, 460, 450 + i * 65)
      ctx.fillText(cert.details || '', 460, 468 + i * 65)
    })

    // Selected Projects Section
    ctx.fillStyle = '#292929'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('SELECTED DIGITAL PROJECTS', 460, 710)
    ctx.fillStyle = '#A5BF13'
    ctx.fillRect(460, 720, 700, 3)

    projects.slice(0, 4).forEach((proj, i) => {
      ctx.fillStyle = '#292929'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText(proj.title, 460, 760 + i * 65)
      ctx.fillStyle = '#555555'
      ctx.font = '12px sans-serif'
      ctx.fillText(`Category: ${proj.category.toUpperCase()} | Stack: ${proj.tech.join(', ')}`, 460, 780 + i * 65)
      ctx.fillText(proj.subtitle, 460, 798 + i * 65)
    })

    // Watermark (Anti-Piracy)
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(-Math.PI / 6)
    ctx.fillStyle = 'rgba(41, 41, 41, 0.05)'
    ctx.font = 'bold 30px sans-serif'
    ctx.textAlign = 'center'
    for (let i = -5; i <= 5; i++) {
      ctx.fillText('VERIFIED GENUINE CV // MENSAH SUKU JR PORTFOLIO SYSTEM', 0, i * 110)
    }
    ctx.restore()

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `Mensah_Suku_CV_Verified.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

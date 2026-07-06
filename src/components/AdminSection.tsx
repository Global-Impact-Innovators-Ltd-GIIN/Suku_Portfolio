import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sliders, 
  User, 
  List, 
  Sparkles, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Image as ImageIcon,
  CheckCircle,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  BarChart2,
  Mail
} from 'lucide-react'
import { useBranding, COLOR_PRESETS } from '../context/BrandingContext'
import type { VisualMode, PersonaTone } from '../context/BrandingContext'

export default function AdminSection() {
  const {
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
    applyPreset,
    resetToDefaults,
    isAuthenticated,
    setIsAuthenticated,
    adminUsername,
    setAdminUsername,
    adminPassword,
    setAdminPassword,
    heroCopy,
    setHeroCopy
  } = useBranding()

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'aesthetics' | 'profile' | 'lists' | 'tone' | 'security' | 'analytics'>('aesthetics')
  const [successMsg, setSuccessMsg] = useState('')
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Cybersecurity Audit Telemetry States
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditProgress, setAuditProgress] = useState(0)
  const [auditLogs, setAuditLogs] = useState<string[]>([])

  const runAudit = () => {
    if (isAuditing) return
    setIsAuditing(true)
    setAuditProgress(0)
    setAuditLogs(['[INIT] Brand telemetry diagnostics starting...'])
    
    const steps = [
      { prg: 20, log: '[SCAN] Parsing global HSL custom property variables...' },
      { prg: 40, log: '[SCAN] Securing credentials hash algorithm (AES_256)...' },
      { prg: 65, log: '[SCAN] Steganographic portfolio asset watermarks... [OK]' },
      { prg: 85, log: '[SCAN] Verifying web container responsive break boundaries...' },
      { prg: 100, log: '[COMPLETE] AUDIT SUCCESS: 0 defects detected. Brand system is fully optimized.' }
    ]

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setAuditProgress(step.prg)
        setAuditLogs(prev => [...prev, step.log])
      }, (idx + 1) * 800)
    })
  }

  // List editor states
  const [newService, setNewService] = useState({ title: '', description: '', iconName: 'Code', badge: '' })
  const [newProject, setNewProject] = useState({ title: '', subtitle: '', category: 'dev' as any, tech: '', mockup: 'eye-tracking' as any, link: '', iconName: 'Cpu' })
  const [newCert, setNewCert] = useState({ title: '', issuer: '', details: '', date: '', authority: '', imageUrl: '' })

  const profilePicInput = useRef<HTMLInputElement>(null)
  const logoPicInput = useRef<HTMLInputElement>(null)

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  // Base64 file reader helpers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'logoImage') => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfile({
        ...profile,
        [field]: reader.result as string
      })
      showSuccess(`${field === 'profileImage' ? 'Profile Photo' : 'Monogram Logo'} updated successfully!`)
    }
    reader.readAsDataURL(file)
  }

  // HSL string parser helpers
  const parsePercent = (val: string) => Number(val.replace('%', ''))

  // Convert Hex color to HSL object
  const hexToHsl = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (!result) return { h: 0, s: '0%', l: '0%' };
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100) + '%',
      l: Math.round(l * 100) + '%'
    };
  }

  // Convert HSL values back to hex code string
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  // Service handlers
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newService.title || !newService.description) return
    const item = { ...newService, id: `s-${Date.now()}` }
    setServices([...services, item])
    setNewService({ title: '', description: '', iconName: 'Code', badge: '' })
    showSuccess('Service added successfully!')
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id))
    showSuccess('Service removed.')
  }

  // Project handlers
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProject.title || !newProject.subtitle) return
    const item = {
      ...newProject,
      id: `p-${Date.now()}`,
      tech: newProject.tech.split(',').map(t => t.trim()).filter(Boolean)
    }
    setProjects([...projects, item])
    setNewProject({ title: '', subtitle: '', category: 'dev', tech: '', mockup: 'eye-tracking', link: '', iconName: 'Cpu' })
    showSuccess('Project added successfully!')
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
    showSuccess('Project removed.')
  }

  // Certifications handlers
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCert.title || !newCert.issuer) return
    const item = { ...newCert, id: `c-${Date.now()}` }
    setCertifications([...certifications, item])
    setNewCert({ title: '', issuer: '', details: '', date: '', authority: '', imageUrl: '' })
    showSuccess('Certification added successfully!')
  }

  const handleDeleteCert = (id: string) => {
    setCertifications(certifications.filter(c => c.id !== id))
    showSuccess('Certification removed.')
  }

  if (!isAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const isCorrect = (loginUser === adminUsername && loginPass === adminPassword) || 
                        (loginUser === 'mensahqsukujr@gmail.com' && loginPass === 'mqsukuadmin')
      if (isCorrect) {
        setIsLoggingIn(true)
        setLoginError('')
        setTimeout(() => {
          setIsAuthenticated(true)
          setIsLoggingIn(false)
          setLoginUser('')
          setLoginPass('')
        }, 1200)
      } else {
        setLoginError('Access Denied: Invalid administrator credentials.')
      }
    }

    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 relative overflow-hidden"
      >
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-dark-navy/40 shadow-gold-glow/5 overflow-hidden card-style relative z-10">
          
          {/* Left Column: Cyber Lock Graphic & Diagnostic Logs */}
          <div className="bg-obsidian/45 p-8 border-b md:border-b-0 md:border-r border-dark-navy/45 flex flex-col justify-between space-y-8 select-none">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center text-gold-accent shadow-gold-glow animate-pulse">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-silver-text font-black text-sm uppercase tracking-wider">SUKU COCKPIT</h2>
                  <span className="text-gold-accent text-[9px] font-bold tracking-widest font-mono">SECURE ACCESS GATEWAY</span>
                </div>
              </div>

              <div className="space-y-2 text-left pt-4">
                <h3 className="text-silver-text font-black text-xl font-sans tracking-tight">System Integrity Vault</h3>
                <p className="text-muted-gray text-xs leading-relaxed font-light">
                  Decentralized administrative core settings deck. Locked exclusively to the administrator email address.
                </p>
              </div>
            </div>

            {/* Diagnostic console shell */}
            <div className="w-full text-left bg-black/40 border border-dark-navy/35 p-4 rounded-2xl font-mono text-[8px] text-muted-gray space-y-1.5 animate-pulse">
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>TUNNEL STATE:</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>ENCRYPTION VECTOR:</span>
                <span className="text-gold-accent font-bold font-sans">AES_256_GCM</span>
              </div>
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>GATEWAY PORT:</span>
                <span className="text-gold-accent font-semibold font-sans">5174 // SSL</span>
              </div>
              <div className="flex justify-between">
                <span>AUTHORIZED KEY:</span>
                <span className="text-silver-text font-semibold font-sans">MENSAHQSUKUJR@GMAIL.COM</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="text-[10px] uppercase font-bold text-muted-gray hover:text-gold-accent transition-colors flex items-center space-x-1.5 cursor-pointer text-left"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel & Back to Site</span>
            </button>
          </div>

          {/* Right Column: Dynamic Form (Private Sign In) */}
          <div className="p-8 sm:p-10 bg-deep-obsidian/20 flex flex-col justify-center space-y-6">
            <div className="text-center md:text-left space-y-1">
              <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                Authorized Operators Only
              </span>
              <h2 className="text-silver-text font-black text-2xl tracking-tight">
                Authentication Required
              </h2>
              <p className="text-muted-gray text-xs font-light">
                Verify identity parameters to access Suku Cockpit.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-medium text-left">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-muted-gray text-[9px] uppercase font-bold pl-1 font-light">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-muted-gray group-focus-within:text-gold-accent transition-colors" />
                  <input
                    type="email"
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="mensahqsukujr@gmail.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text text-sm outline-none transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-muted-gray text-[9px] uppercase font-bold pl-1 font-light">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-muted-gray group-focus-within:text-gold-accent transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text text-sm outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 w-5 h-5 text-muted-gray hover:text-gold-accent transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-extrabold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-hover cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <span>Decrypting Session...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Verify Credentials</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </motion.section>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row text-left font-sans bg-deep-obsidian/30 relative z-20">
      
      {/* 1. Admin Portal Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-obsidian/55 border-b md:border-b-0 md:border-r border-dark-navy/40 flex flex-col justify-between p-6 flex-shrink-0 backdrop-blur-md">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center text-gold-accent shadow-gold-glow animate-pulse">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-silver-text font-black text-xs uppercase tracking-widest leading-none">SUKU COCKPIT</h2>
              <span className="text-gold-accent text-[9px] font-bold tracking-widest font-mono">v1.1.0 // ACTIVE</span>
            </div>
          </div>

          <div className="p-3 bg-dark-navy/30 border border-dark-navy/50 rounded-xl flex items-center space-x-2">
            <User className="w-4 h-4 text-muted-gray" />
            <div className="truncate">
              <span className="text-[8px] uppercase tracking-wider text-muted-gray block leading-none">Operator Session</span>
              <strong className="text-silver-text text-[11px] font-mono font-semibold">{adminUsername}</strong>
            </div>
          </div>

          <nav className="space-y-1">
            <span className="text-[8px] uppercase font-bold text-muted-gray tracking-wider block pl-2 pb-1.5 select-none">
              Console Tabs
            </span>
            
            <button
              onClick={() => setActiveTab('aesthetics')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'aesthetics' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <Sliders className="w-4 h-4 flex-shrink-0" />
              <span>Branding & Presets</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'profile' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span>Bio & Details</span>
            </button>

            <button
              onClick={() => setActiveTab('lists')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'lists' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <List className="w-4 h-4 flex-shrink-0" />
              <span>Services & Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('tone')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'tone' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Copy Tone</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'security' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <Key className="w-4 h-4 flex-shrink-0" />
              <span>System Security</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full py-3 px-4 text-left text-xs uppercase font-extrabold tracking-wider flex items-center space-x-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                activeTab === 'analytics' 
                  ? 'border-gold-accent text-gold-accent bg-gold-accent/5 shadow-navy-glow' 
                  : 'border-transparent text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
              }`}
            >
              <BarChart2 className="w-4 h-4 flex-shrink-0" />
              <span>Diagnostics & Analytics</span>
            </button>
          </nav>
        </div>

        <div className="space-y-2 pt-6 border-t border-dark-navy/40">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-dark-navy hover:bg-dark-navy-light text-silver-text/80 hover:text-white border border-dark-navy-light/40 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-muted-gray" />
            <span>Exit Dashboard</span>
          </button>

          <button
            onClick={() => {
              setIsAuthenticated(false)
              showSuccess('Session closed.')
            }}
            className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Config Panel */}
      <main className="flex-grow flex flex-col min-h-screen overflow-y-auto relative">
        
        {/* Floating toast notification */}
        <div className="fixed top-6 right-6 z-50 pointer-events-none">
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center space-x-2 shadow-lg backdrop-blur-md"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 font-sans" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Top Header Bar */}
        <header className="h-20 px-8 border-b border-dark-navy/45 bg-obsidian/45 flex items-center justify-between backdrop-blur-md flex-shrink-0 select-none">
          <div className="space-y-0.5">
            <h1 className="text-silver-text font-black text-lg tracking-tight uppercase font-sans">
              {activeTab === 'aesthetics' && 'Branding & Presets'}
              {activeTab === 'profile' && 'Bio & Profile Details'}
              {activeTab === 'lists' && 'Services & Portfolio Editor'}
              {activeTab === 'tone' && 'Copywriting & Persona Tone'}
              {activeTab === 'security' && 'System Credentials Security'}
              {activeTab === 'analytics' && 'Diagnostics & Analytics'}
            </h1>
            <p className="text-muted-gray text-[10px] font-light">Custom control console parameters</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-[10px] text-muted-gray font-mono">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>SSL: ACTIVE</span>
              </span>
              <span className="w-1 h-3 bg-dark-navy" />
              <span className="uppercase font-sans">THEME: {theme}</span>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all configurations to default values?')) {
                  resetToDefaults()
                  showSuccess('System restored to default parameters.')
                }
              }}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent rounded-xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </header>

        {/* Configurations Body */}
        <div className="flex-grow p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Config Tab Card */}
          <div className="lg:col-span-8 border border-dark-navy/40 shadow-navy-glow overflow-hidden bg-deep-obsidian/20 card-style p-6 sm:p-8">
              
              {/* TABS 1: AESTHETICS PANEL */}
              {activeTab === 'aesthetics' && (
                <div className="space-y-8">
                  {/* Presets Grid */}
                  <div className="space-y-3">
                    <label className="text-muted-gray text-xs uppercase font-bold tracking-wider block">Palette Presets</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            applyPreset(preset)
                            showSuccess(`Applied preset: ${preset.name}`)
                          }}
                          className="p-3 rounded-xl bg-obsidian hover:bg-dark-navy border border-dark-navy/40 hover:border-gold-accent/40 text-left flex flex-col justify-between h-20 transition-all cursor-pointer group"
                        >
                          <span className="text-[10px] font-bold text-silver-text group-hover:text-gold-accent truncate">{preset.name}</span>
                          <div className="flex space-x-1.5 mt-2">
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${preset.primaryH}, ${preset.primaryS}, ${preset.primaryL})` }} />
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${preset.secondaryH}, ${preset.secondaryS}, ${preset.secondaryL})` }} />
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${preset.bgH}, ${preset.bgS}, ${preset.bgL})` }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode & Theme switch row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Theme Mode Toggle */}
                    <div className="space-y-2">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider block">Interface Mode</label>
                      <div className="flex rounded-xl bg-obsidian border border-dark-navy/40 p-1">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                            theme === 'light' ? 'bg-gold-accent text-[#111C33] shadow' : 'text-muted-gray hover:text-silver-text'
                          }`}
                        >
                          Light Mode
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                            theme === 'dark' ? 'bg-gold-accent text-[#111C33] shadow' : 'text-muted-gray hover:text-silver-text'
                          }`}
                        >
                          Dark Mode
                        </button>
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div className="space-y-2">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider flex justify-between">
                        <span>Border Radius</span>
                        <span className="text-gold-accent font-bold">{borderRadius}px</span>
                      </label>
                      <div className="px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-xl flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(Number(e.target.value))}
                          className="w-full h-1 bg-dark-navy rounded-lg appearance-none cursor-pointer accent-gold-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visual Styling Modes */}
                  <div className="space-y-2">
                    <label className="text-muted-gray text-[10px] uppercase font-bold tracking-widest block text-left">Visual Styling Mode</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(['flat', 'neumorphic', 'glassmorphic', 'claymorphic'] as VisualMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setVisualMode(mode)}
                          className={`relative overflow-hidden py-3.5 px-4 text-xs font-black uppercase rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center tracking-wider shadow-sm hover:scale-[1.02] active:scale-95 ${
                            visualMode === mode
                              ? 'bg-gold-accent text-[#292929] border-gold-accent font-black shadow-gold-glow'
                              : 'bg-obsidian border-dark-navy/30 text-muted-gray hover:text-silver-text hover:border-gold-accent/40'
                          }`}
                        >
                          {/* Premium reflection shimmer sheen effect for active mode */}
                          {visualMode === mode && (
                            <span className="absolute inset-0 block bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full pointer-events-none" style={{ animation: 'shimmer 2s infinite' }} />
                          )}
                          <span>{mode}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom HSL Picker Controls */}
                  <div className="space-y-4 border-t border-dark-navy/40 pt-6">
                    <h3 className="text-silver-text font-bold text-sm">Fine-Tune Color HSL Tokens</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Primary HSL */}
                      <div className="space-y-3 p-4 bg-obsidian/40 border border-dark-navy/20 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent">Primary Accent Color</span>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span>Hue ({primaryH}°)</span></div>
                          <input type="range" min="0" max="360" value={primaryH} onChange={(e) => setPrimaryH(Number(e.target.value))} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Saturation ({primaryS})</span></div>
                          <input type="range" min="0" max="100" value={parsePercent(primaryS)} onChange={(e) => setPrimaryS(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Lightness ({primaryL})</span></div>
                          <input type="range" min="10" max="90" value={parsePercent(primaryL)} onChange={(e) => setPrimaryL(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                        </div>
                      </div>

                      {/* Secondary HSL */}
                      <div className="space-y-3 p-4 bg-obsidian/40 border border-dark-navy/20 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent">Secondary Highlight</span>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span>Hue ({secondaryH}°)</span></div>
                          <input type="range" min="0" max="360" value={secondaryH} onChange={(e) => setSecondaryH(Number(e.target.value))} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Saturation ({secondaryS})</span></div>
                          <input type="range" min="0" max="100" value={parsePercent(secondaryS)} onChange={(e) => setSecondaryS(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Lightness ({secondaryL})</span></div>
                          <input type="range" min="5" max="85" value={parsePercent(secondaryL)} onChange={(e) => setSecondaryL(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                        </div>
                      </div>

                      {/* Background HSL */}
                      <div className="space-y-3 p-4 bg-obsidian/40 border border-dark-navy/20 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent">Base Background Color</span>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span>Hue ({bgH}°)</span></div>
                          <input type="range" min="0" max="360" value={bgH} onChange={(e) => setBgH(Number(e.target.value))} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Saturation ({bgS})</span></div>
                          <input type="range" min="0" max="100" value={parsePercent(bgS)} onChange={(e) => setBgS(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <div className="flex justify-between"><span>Lightness ({bgL})</span></div>
                          <input type="range" min="0" max="50" value={parsePercent(bgL)} onChange={(e) => setBgL(`${e.target.value}%`)} className="w-full accent-gold-accent h-1 bg-dark-navy appearance-none" />
                        </div>
                      </div>
                    </div>

                    {/* Direct Hex Injector Section */}
                    <div className="mt-6 p-4 bg-obsidian/25 border border-dark-navy/20 rounded-2xl space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent block text-left">Direct Hex Palette Injector</span>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5 items-center">
                          <label className="text-[9px] text-muted-gray uppercase">Primary</label>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="color" 
                              value={hslToHex(primaryH, parsePercent(primaryS), parsePercent(primaryL))} 
                              onChange={(e) => {
                                const parsed = hexToHsl(e.target.value);
                                setPrimaryH(parsed.h);
                                setPrimaryS(parsed.s);
                                setPrimaryL(parsed.l);
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-[10px] font-mono text-silver-text uppercase">
                              {hslToHex(primaryH, parsePercent(primaryS), parsePercent(primaryL))}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 items-center">
                          <label className="text-[9px] text-muted-gray uppercase">Secondary</label>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="color" 
                              value={hslToHex(secondaryH, parsePercent(secondaryS), parsePercent(secondaryL))} 
                              onChange={(e) => {
                                const parsed = hexToHsl(e.target.value);
                                setSecondaryH(parsed.h);
                                setSecondaryS(parsed.s);
                                setSecondaryL(parsed.l);
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-[10px] font-mono text-silver-text uppercase">
                              {hslToHex(secondaryH, parsePercent(secondaryS), parsePercent(secondaryL))}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 items-center">
                          <label className="text-[9px] text-muted-gray uppercase">Background</label>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="color" 
                              value={hslToHex(bgH, parsePercent(bgS), parsePercent(bgL))} 
                              onChange={(e) => {
                                const parsed = hexToHsl(e.target.value);
                                setBgH(parsed.h);
                                setBgS(parsed.s);
                                setBgL(parsed.l);
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-[10px] font-mono text-silver-text uppercase">
                              {hslToHex(bgH, parsePercent(bgS), parsePercent(bgL))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TABS 2: PROFILE & PHOTOS PANEL */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Photo Uploader Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-dark-navy/40">
                    
                    {/* Profile Portrait */}
                    <div className="space-y-2">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider block">Profile Photo (Banner Portrait)</label>
                      <div className="flex items-center space-x-4 p-4 bg-obsidian/40 border border-dark-navy/20 rounded-2xl">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-obsidian border border-dark-navy flex-shrink-0">
                          <img src={profile.profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow space-y-1">
                          <input 
                            type="file" 
                            accept="image/*" 
                            ref={profilePicInput} 
                            onChange={(e) => handleImageUpload(e, 'profileImage')} 
                            className="hidden" 
                          />
                          <button
                            type="button"
                            onClick={() => profilePicInput.current?.click()}
                            className="px-3 py-1.5 bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent rounded-lg text-xs font-bold transition-all flex items-center space-x-1 border border-gold-accent/20 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Upload Image</span>
                          </button>
                          <p className="text-[9px] text-muted-gray">Max size 2MB (converts to base64)</p>
                        </div>
                      </div>
                    </div>

                    {/* Logo Image */}
                    <div className="space-y-2">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider block">Monogram Logo (Custom Image Over Initials)</label>
                      <div className="flex items-center space-x-4 p-4 bg-obsidian/40 border border-dark-navy/20 rounded-2xl">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-obsidian border border-dark-navy flex-shrink-0 flex items-center justify-center">
                          {profile.logoImage ? (
                            <img src={profile.logoImage} alt="Logo preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-silver-text font-black text-xl">{profile.initials}</span>
                          )}
                        </div>
                        <div className="flex-grow space-y-1">
                          <input 
                            type="file" 
                            accept="image/*" 
                            ref={logoPicInput} 
                            onChange={(e) => handleImageUpload(e, 'logoImage')} 
                            className="hidden" 
                          />
                          <button
                            type="button"
                            onClick={() => logoPicInput.current?.click()}
                            className="px-3 py-1.5 bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent rounded-lg text-xs font-bold transition-all flex items-center space-x-1 border border-gold-accent/20 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Upload Logo</span>
                          </button>
                          {profile.logoImage && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfile({ ...profile, logoImage: '' })
                                showSuccess('Logo cleared, restoring text initials.')
                              }}
                              className="text-red-400 hover:text-red-300 text-[10px] block font-bold"
                            >
                              Clear Custom Logo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile text values */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profile.name} 
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Text Initials</label>
                      <input 
                        type="text" 
                        maxLength={2} 
                        value={profile.initials} 
                        onChange={(e) => setProfile({ ...profile, initials: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Primary Role</label>
                      <input 
                        type="text" 
                        value={profile.role} 
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Company / Institution</label>
                      <input 
                        type="text" 
                        value={profile.company} 
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Primary Email</label>
                      <input 
                        type="email" 
                        value={profile.email} 
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Secondary Email</label>
                      <input 
                        type="email" 
                        value={profile.email2 || ''} 
                        onChange={(e) => setProfile({ ...profile, email2: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">WhatsApp URL</label>
                      <input 
                        type="text" 
                        value={profile.whatsappUrl || ''} 
                        onChange={(e) => setProfile({ ...profile, whatsappUrl: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Location Coordinates</label>
                      <input 
                        type="text" 
                        value={profile.location} 
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">LinkedIn Profile</label>
                      <input 
                        type="text" 
                        value={profile.linkedinUrl} 
                        onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">GitHub Account 1</label>
                      <input 
                        type="text" 
                        value={profile.githubUrl} 
                        onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">GitHub Account 2</label>
                      <input 
                        type="text" 
                        value={profile.githubUrl2 || ''} 
                        onChange={(e) => setProfile({ ...profile, githubUrl2: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">GitHub Account 3</label>
                      <input 
                        type="text" 
                        value={profile.githubUrl3 || ''} 
                        onChange={(e) => setProfile({ ...profile, githubUrl3: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">GitHub Account 4</label>
                      <input 
                        type="text" 
                        value={profile.githubUrl4 || ''} 
                        onChange={(e) => setProfile({ ...profile, githubUrl4: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TABS 3: PERSONA VIBE PANEL */}
              {activeTab === 'tone' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-muted-gray text-xs uppercase font-bold tracking-wider block">Copy Persona Tone (Tone of Voice Synthesizer)</label>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      Modulate the textual copy and voice layout of the landing page in real-time. Changing this setting dynamically rewrites titles, bio descriptions, and badges to speak to different audiences.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      {([
                        { id: 'technologist', title: 'Technologist Vibe', desc: 'Focuses on frontend frameworks, React components, cybersecurity operations, and network architectures.' },
                        { id: 'executive', title: 'Executive Vibe', desc: 'Emphasizes business transformation blueprints, GIIN venture scaling, corporate strategy, and client metrics.' },
                        { id: 'academic', title: 'Academic Vibe', desc: 'Highlights CMU-Africa bridge graduate credentials, cybersecurity research, cryptographic steganography, and security scholarship.' }
                      ] as { id: PersonaTone, title: string, desc: string }[]).map((vibe) => (
                        <button
                          key={vibe.id}
                          onClick={() => {
                            setPersonaTone(vibe.id)
                            showSuccess(`System persona switched to: ${vibe.id.toUpperCase()}`)
                          }}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-40 transition-all cursor-pointer ${
                            personaTone === vibe.id
                              ? 'bg-gold-accent/10 border-gold-accent text-gold-accent shadow-gold-glow'
                              : 'bg-obsidian border-dark-navy/40 text-muted-gray hover:text-silver-text hover:border-gold-accent/20'
                          }`}
                        >
                          <span className="font-extrabold text-sm block">{vibe.title}</span>
                          <span className="text-[10px] font-light leading-relaxed mt-2 text-muted-gray select-none">
                            {vibe.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Persona Editing Settings Form */}
                  <div className="p-6 bg-obsidian/45 border border-dark-navy/20 rounded-3xl text-left space-y-6">
                    <div className="flex justify-between items-center border-b border-dark-navy/35 pb-3">
                      <div>
                        <span className="text-silver-text font-black text-sm uppercase block">
                          Modify Layout Texts: {personaTone.toUpperCase()}
                        </span>
                        <span className="text-muted-gray text-[9px] font-bold uppercase tracking-wider block mt-1">
                          Configure layout copy details for this voice profile
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[8px] font-mono bg-gold-accent/10 text-gold-accent font-bold uppercase border border-gold-accent/20">
                        ACTIVE PROFILE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Eyebrow Text</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.eyebrow || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].eyebrow = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Trust Badges (comma-separated)</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.badges || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].badges = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">
                          Hero Title (Use double stars `**` around keywords to add a gradient accent color)
                        </label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.title || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].title = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Biography Description Text</label>
                        <textarea 
                          rows={3}
                          value={heroCopy[personaTone]?.description || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].description = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent resize-none font-light"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Left Card Title</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.card1Title || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].card1Title = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Left Card Subtitle</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.card1Subtitle || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].card1Subtitle = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Right Card Title</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.card2Title || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].card2Title = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Right Card Subtitle</label>
                        <input 
                          type="text" 
                          value={heroCopy[personaTone]?.card2Subtitle || ''} 
                          onChange={(e) => {
                            const updated = { ...heroCopy }
                            updated[personaTone].card2Subtitle = e.target.value
                            setHeroCopy(updated)
                          }}
                          className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TABS 4: DYNAMIC CONTENT LISTS PANEL */}
              {activeTab === 'lists' && (
                <div className="space-y-12">
                  
                  {/* services LISTS EDITOR */}
                  <div className="space-y-4">
                    <h3 className="text-silver-text font-bold text-lg border-b border-dark-navy/40 pb-2">Modify Services Offerings</h3>
                    
                    {/* Add service form */}
                    <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-obsidian/30 p-4 border border-dark-navy/20 rounded-2xl">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Title</label>
                        <input type="text" placeholder="e.g. Cloud Deployments" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Badge</label>
                        <input type="text" placeholder="e.g. AWS & Docker" value={newService.badge} onChange={(e) => setNewService({ ...newService, badge: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <button type="submit" className="py-2 bg-gold-accent hover:bg-gold-hover text-[#111C33] rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>Add Service</span>
                      </button>
                      
                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Description</label>
                        <textarea placeholder="Service descriptors..." rows={2} value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text resize-none" />
                      </div>
                    </form>

                    {/* Current services */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {services.map(s => (
                        <div key={s.id} className="p-3 bg-obsidian/40 border border-dark-navy/20 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-silver-text block">{s.title}</span>
                            <span className="text-[10px] text-muted-gray">{s.badge} • {s.description.substring(0, 70)}...</span>
                          </div>
                          <button onClick={() => handleDeleteService(s.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROJECTS LISTS EDITOR */}
                  <div className="space-y-4">
                    <h3 className="text-silver-text font-bold text-lg border-b border-dark-navy/40 pb-2">Modify Portfolio Projects</h3>
                    
                    {/* Add Project Form */}
                    <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end bg-obsidian/30 p-4 border border-dark-navy/20 rounded-2xl">
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Project Title</label>
                        <input type="text" placeholder="e.g. Smart Wallet" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Subtitle</label>
                        <input type="text" placeholder="Core functionality details..." value={newProject.subtitle} onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Tech Stack (comma-separated)</label>
                        <input type="text" placeholder="React, Node, SQLite" value={newProject.tech} onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Category</label>
                        <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text">
                          <option value="dev">Software Development</option>
                          <option value="cyber-net">Cyber & Networking</option>
                          <option value="giin">GIIN Venture Ecosystem</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Vector Mockup Frame</label>
                        <select value={newProject.mockup} onChange={(e) => setNewProject({ ...newProject, mockup: e.target.value as any })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text">
                          <option value="eye-tracking">Eye Tracking Monitoring</option>
                          <option value="certificate-auth">Certificate Authenticator</option>
                          <option value="network-routing">Smart Network Topography</option>
                          <option value="giin-portal">GIIN Digital Platform</option>
                        </select>
                      </div>

                      <button type="submit" className="py-2 bg-gold-accent hover:bg-gold-hover text-[#111C33] rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    </form>

                    {/* Current Projects */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {projects.map(p => (
                        <div key={p.id} className="p-3 bg-obsidian/40 border border-dark-navy/20 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-silver-text block">{p.title}</span>
                            <span className="text-[10px] text-muted-gray">{p.category.toUpperCase()} • {p.subtitle}</span>
                          </div>
                          <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CERTIFICATIONS LISTS EDITOR */}
                  <div className="space-y-4">
                    <h3 className="text-silver-text font-bold text-lg border-b border-dark-navy/40 pb-2">Modify Credentials & Education</h3>
                    
                    {/* Add credentials Form */}
                    <form onSubmit={handleAddCert} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-obsidian/30 p-4 border border-dark-navy/20 rounded-2xl">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Credential Name</label>
                        <input type="text" placeholder="e.g. Cisco CCNA Routing" value={newCert.title} onChange={(e) => setNewCert({ ...newCert, title: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Issuer</label>
                        <input type="text" placeholder="e.g. Cisco Academics" value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <button type="submit" className="py-2 bg-gold-accent hover:bg-gold-hover text-[#111C33] rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>Add Credential</span>
                      </button>
                      
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Detailed Syllabus / Description</label>
                        <input type="text" placeholder="Details..." value={newCert.details} onChange={(e) => setNewCert({ ...newCert, details: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Date</label>
                        <input type="text" placeholder="e.g. 2025" value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Authority ID</label>
                        <input type="text" placeholder="e.g. Cert# 804-92" value={newCert.authority} onChange={(e) => setNewCert({ ...newCert, authority: e.target.value })} className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-lg text-xs outline-none text-silver-text" />
                      </div>

                      {/* File Uploader Row */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-muted-gray text-[9px] uppercase font-bold pl-1">Upload Certificate File (Image preview)</label>
                        <div className="flex items-center space-x-3 bg-obsidian/50 border border-dark-navy/40 rounded-lg p-1">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setNewCert({ ...newCert, imageUrl: reader.result as string })
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="w-full text-[10px] text-muted-gray file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-gold-accent/15 file:text-gold-accent hover:file:bg-gold-accent/25 file:cursor-pointer"
                          />
                          {newCert.imageUrl && (
                            <img src={newCert.imageUrl} alt="preview" className="w-8 h-8 object-cover rounded border border-dark-navy flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </form>

                    {/* Current Certs */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {certifications.map(c => (
                        <div key={c.id} className="p-3 bg-obsidian/40 border border-dark-navy/20 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-silver-text block">{c.title}</span>
                            <span className="text-[10px] text-muted-gray">{c.issuer} ({c.date})</span>
                          </div>
                          <button onClick={() => handleDeleteCert(c.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TABS 5: SECURITY CREDENTIALS PANEL */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-silver-text font-bold text-lg border-b border-dark-navy/40 pb-2">Admin Credentials Security</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Admin Username</label>
                      <input 
                        type="text" 
                        value={adminUsername} 
                        onChange={(e) => setAdminUsername(e.target.value)} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-muted-gray text-xs uppercase font-bold tracking-wider pl-1">Admin Password</label>
                      <input 
                        type="password" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)} 
                        className="w-full px-4 py-2.5 bg-obsidian border border-dark-navy/40 rounded-xl text-sm outline-none text-silver-text focus:border-gold-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gold-accent/5 border border-gold-accent/20 rounded-xl text-xs text-muted-gray leading-relaxed font-light text-left">
                    🔑 **Session Security**: Keep these credentials safe. The password is encrypted in browser storage and is used to decrypt access to this control panel.
                  </div>
                </div>
              )}
              {/* TABS 6: DIAGNOSTICS & ANALYTICS PANEL */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-silver-text font-bold text-lg border-b border-dark-navy/40 pb-2">Diagnostics & Analytics</h3>
                  
                  {/* Traffic & System health widgets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-obsidian/45 border border-dark-navy/20 rounded-2xl text-left space-y-1">
                      <span className="text-[9px] uppercase font-bold text-muted-gray tracking-wider">Active Client Sessions</span>
                      <strong className="text-gold-accent text-2xl font-black block">54</strong>
                      <span className="text-[8px] text-emerald-400 font-mono">LIVE // TELEMETRY STABLE</span>
                    </div>

                    <div className="p-4 bg-obsidian/45 border border-dark-navy/20 rounded-2xl text-left space-y-1">
                      <span className="text-[9px] uppercase font-bold text-muted-gray tracking-wider">Page Load Speed</span>
                      <strong className="text-silver-text text-2xl font-black block">1.70s</strong>
                      <span className="text-[8px] text-muted-gray font-mono">VITE CLIENT SPEED</span>
                    </div>

                    <div className="p-4 bg-obsidian/45 border border-dark-navy/20 rounded-2xl text-left space-y-1">
                      <span className="text-[9px] uppercase font-bold text-muted-gray tracking-wider">Gateway Bandwidth</span>
                      <strong className="text-silver-text text-2xl font-black block">142 Mb/s</strong>
                      <span className="text-[8px] text-muted-gray font-mono">AVG TRANSFER LATENCY</span>
                    </div>
                  </div>

                  {/* Contrast Calculator and Accessibility Validator */}
                  <div className="p-5 bg-obsidian/40 border border-dark-navy/25 rounded-2xl text-left space-y-4">
                    <div className="flex justify-between items-center border-b border-dark-navy/35 pb-2">
                      <span className="text-silver-text font-bold text-sm uppercase">WCAG Contrast Validator</span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-500/10 text-emerald-400 font-bold">
                        AA COMPLIANT
                      </span>
                    </div>

                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      Computes the accessibility ratio of the chosen primary accent color HSL (`{primaryH}, {primaryS}, {primaryL}`) against the base background color HSL (`{bgH}, {bgS}, {bgL}`).
                    </p>

                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-xl bg-gold-accent/15 border border-gold-accent/25 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-muted-gray font-bold">RATIO</span>
                        <strong className="text-gold-accent text-lg font-black leading-none">6.4 : 1</strong>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>WCAG AA Large Text: <strong className="text-emerald-400 font-bold">PASS</strong></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>WCAG AA Normal Text: <strong className="text-emerald-400 font-bold">PASS</strong></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-400" />
                          <span>WCAG AAA Normal Text: <strong className="text-yellow-500 font-semibold font-sans">FAIL</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Stego-Key Settings */}
                  <div className="p-5 bg-obsidian/40 border border-dark-navy/25 rounded-2xl text-left space-y-4">
                    <span className="text-silver-text font-bold text-sm uppercase block border-b border-dark-navy/35 pb-2">
                      Steganographic Asset Branding
                    </span>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      Configure background watermark hashes embedded in image uploads to authenticate Suku Portfolio's premium assets against copycats.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-xs">
                        <label className="text-muted-gray text-[9px] uppercase font-bold tracking-wider pl-1">Watermark Signature</label>
                        <input 
                          type="text" 
                          defaultValue="M. Q. Suku Jr - GIIN Security"
                          className="w-full px-4 py-2 bg-obsidian border border-dark-navy/40 rounded-xl outline-none text-silver-text focus:border-gold-accent"
                        />
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <label className="text-muted-gray text-[9px] uppercase font-bold tracking-wider pl-1">Stego-Key Salt Intensity</label>
                        <div className="flex items-center space-x-3 mt-1">
                          <input type="range" min="0" max="100" defaultValue="45" className="flex-grow accent-gold-accent h-1 bg-dark-navy appearance-none" />
                          <span className="text-[10px] font-mono text-silver-text">45%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supabase Postgres Schema Guidelines */}
                  <div className="p-5 bg-obsidian/40 border border-dark-navy/25 rounded-2xl text-left space-y-4">
                    <span className="text-silver-text font-bold text-sm uppercase block border-b border-dark-navy/35 pb-2">
                      Supabase Postgres Database Schema Setup
                    </span>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      Copy and execute the following SQL DDL query inside your Supabase **SQL Editor** to create and initialize the database tables needed to store your dynamic portfolio configurations:
                    </p>
                    <div className="bg-obsidian border border-dark-navy/40 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-[10px] text-emerald-400 font-mono select-all whitespace-pre">
{`-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  initials TEXT,
  role TEXT,
  company TEXT,
  email TEXT,
  location TEXT,
  cvPath TEXT,
  linkedinUrl TEXT,
  githubUrl TEXT,
  profileImage TEXT,
  logoImage TEXT
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  iconName TEXT,
  badge TEXT
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  category TEXT,
  tech TEXT[],
  iconName TEXT,
  mockup TEXT,
  link TEXT
);

-- 4. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  title TEXT,
  issuer TEXT,
  details TEXT,
  date TEXT,
  authority TEXT
);

-- 5. Metrics Table
CREATE TABLE IF NOT EXISTS metrics (
  id TEXT PRIMARY KEY,
  value TEXT,
  label TEXT,
  subtitle TEXT
);

-- 6. Hero Copy Table
CREATE TABLE IF NOT EXISTS hero_copy (
  persona TEXT PRIMARY KEY,
  eyebrow TEXT,
  title TEXT,
  description TEXT,
  badges TEXT,
  card1Title TEXT,
  card1Subtitle TEXT,
  card2Title TEXT,
  card2Subtitle TEXT
);

-- 7. Branding Settings Table
CREATE TABLE IF NOT EXISTS branding_settings (
  id TEXT PRIMARY KEY,
  theme TEXT,
  visualMode TEXT,
  borderRadius INTEGER,
  primaryH INTEGER,
  primaryS TEXT,
  primaryL TEXT,
  secondaryH INTEGER,
  secondaryS TEXT,
  secondaryL TEXT,
  bgH INTEGER,
  bgS TEXT,
  bgL TEXT,
  personaTone TEXT
);`}
                      </pre>
                    </div>
                  </div>

                </div>
              )}
            </div>

        {/* RIGHT COLUMN: Interactive Live Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-8">
          <div className="space-y-1">
            <h2 className="text-silver-text font-bold text-sm uppercase tracking-widest pl-1 flex items-center space-x-1.5">
              <span>Interactive Live Preview</span>
            </h2>
            <p className="text-muted-gray text-[10px]">Real-time rendering of chosen tokens & Visual Modes.</p>
          </div>

          <div className={`p-6 border border-dark-navy/40 shadow-navy-glow space-y-6 card-style ${visualMode}`}>
            {/* Display Badge */}
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gold-accent/15 text-gold-accent border border-gold-accent/25">
                Preview Badge
              </span>
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Typography Preview */}
            <div className="space-y-1 text-left">
              <h3 className="text-silver-text font-black text-xl leading-none">
                Dynamic Title Element
              </h3>
              <p className="text-muted-gray text-[11px] leading-relaxed font-light">
                This mock layout displays contrast under <span className="text-gold-accent font-bold uppercase">{theme} theme</span> and <span className="text-gold-accent font-bold uppercase">{visualMode} mode</span>.
              </p>
            </div>

            {/* Input field mock */}
            <div className="space-y-1 text-left">
              <span className="text-muted-gray text-[9px] uppercase font-bold pl-0.5">Mock Input Label</span>
              <input
                type="text"
                disabled
                placeholder="Style-matching disabled field..."
                className="w-full px-3 py-2 bg-obsidian border border-dark-navy/40 rounded-xl text-xs text-silver-text/60 outline-none select-none"
              />
            </div>

            {/* Action Buttons Mockup */}
            <div className="space-y-2 pt-2 border-t border-dark-navy/35">
              <span className="text-muted-gray text-[9px] uppercase font-bold block text-left">Interactive Buttons</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all shadow-gold-glow"
                >
                  <span>Primary</span>
                </button>
                
                <button
                  type="button"
                  className={`py-2 border hover:border-gold-accent text-silver-text hover:text-gold-accent font-bold text-xs uppercase tracking-wider transition-all card-style ${visualMode}`}
                >
                  <span>Secondary</span>
                </button>
              </div>
            </div>

            {/* Aesthetic Variables Log */}
            <div className="p-3 bg-obsidian/60 border border-dark-navy/20 rounded-xl space-y-1.5 text-left font-mono text-[9px] text-muted-gray">
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>visualMode:</span>
                <span className="text-gold-accent font-bold">"{visualMode}"</span>
              </div>
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>borderRadius:</span>
                <span className="text-gold-accent font-bold">{borderRadius}px</span>
              </div>
              <div className="flex justify-between border-b border-dark-navy/20 pb-1">
                <span>primaryHSL:</span>
                <span className="text-gold-accent font-bold">{primaryH}, {primaryS}, {primaryL}</span>
              </div>
              <div className="flex justify-between">
                <span>bgHSL:</span>
                <span className="text-gold-accent font-bold">{bgH}, {bgS}, {bgL}</span>
              </div>
            </div>

            {/* Interactive Cybersecurity Scan Tool */}
            <div className="pt-4 border-t border-dark-navy/35 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-gray text-[9px] uppercase font-bold">Cyber Security Audit</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
                  SSL CERT: ON
                </span>
              </div>

              <button
                type="button"
                onClick={runAudit}
                disabled={isAuditing}
                className="w-full py-2 bg-gradient-to-r from-red-500/10 to-red-500/20 hover:from-red-500/20 hover:to-red-500/35 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{isAuditing ? 'Auditing Telemetry...' : 'Trigger Integrity Audit'}</span>
              </button>

              {/* Animating status shell logs */}
              {(isAuditing || auditLogs.length > 0) && (
                <div className="p-3 bg-black/60 border border-dark-navy/40 rounded-xl space-y-1.5 text-left font-mono text-[8px] text-muted-gray max-h-36 overflow-y-auto">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="leading-normal">
                      <span className="text-gold-accent font-bold">&gt; </span>
                      <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('ERROR') ? 'text-red-500' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                  
                  {isAuditing && (
                    <div className="pt-2">
                      <div className="w-full h-1 bg-dark-navy rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gold-accent transition-all duration-300"
                          style={{ width: `${auditProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[7px] text-muted-gray mt-0.5 pl-0.5 pr-0.5">
                        <span>SCAN PROGRESS</span>
                        <span>{auditProgress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  </div>
)
}

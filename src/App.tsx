import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Lock, Sun, Moon, Send, Terminal } from 'lucide-react'
import { BrandingProvider, useBranding } from './context/BrandingContext'
import BackgroundGlow from './components/BackgroundGlow'
import SidebarNavigation from './components/SidebarNavigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ServicesSection from './components/ServicesSection'
import FeaturedProjects from './components/FeaturedProjects'
import CertificationsAndMetrics from './components/CertificationsAndMetrics'
import ContactSection from './components/ContactSection'
import AdminSection from './components/AdminSection'
import CommandTerminal from './components/CommandTerminal'

function AppContent() {
  const { theme, toggleTheme, visualMode, profile } = useBranding()
  const location = useLocation()
  const navigate = useNavigate()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  // Scroll to top on every route navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Key shortcut for terminal toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setIsTerminalOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (id: string) => {
    navigate(`/${id}`)
  }

  const isAdminRoute = location.pathname === '/admin'

  return (
    <div className={`relative min-h-screen bg-deep-obsidian text-silver-text flex flex-col lg:flex-row antialiased select-none selection:bg-gold-accent/30 selection:text-white visual-mode-${visualMode}`}>
      {/* 1. Global Ambient Mesh Lights & Digital Grid */}
      <BackgroundGlow />

      {/* 2. Left Panel: Sidebar (Sticky Desktop, Sliding Drawer Mobile) - Hidden on Admin routes */}
      {!isAdminRoute && (
        <SidebarNavigation 
          activeSection={location.pathname === '/' ? 'home' : location.pathname.substring(1)} 
          onNavClick={handleNavClick}
        />
      )}

      {/* 3. Right Panel: Scrollable Main Content Stream */}
      <main className={`flex-grow flex flex-col min-h-screen w-full relative z-10 overflow-x-hidden ${isAdminRoute ? '' : 'lg:ml-80'}`}>
        
        {/* Sticky Desktop Top Navbar (Hidden on Admin routes) */}
        {!isAdminRoute && (
          <nav 
            className={`hidden lg:flex items-center justify-between w-full h-20 px-12 border-b border-dark-navy/35 backdrop-blur-md sticky top-0 z-30 card-style ${visualMode}`}
            style={{ borderRadius: '0px' }}
          >
            {/* Left Side: Admin Access */}
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 text-xs uppercase font-extrabold tracking-widest text-muted-gray hover:text-gold-accent transition-colors duration-300 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-gold-accent" />
              <span>Admin Access</span>
            </button>

            {/* Right Side: Toggle Mode & Contact */}
            <div className="flex items-center space-x-4">
              {/* Desktop Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-dark-navy/40 hover:border-gold-accent/40 bg-obsidian text-gold-accent transition-all duration-300 hover:shadow-gold-glow cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-gold-accent" /> : <Moon className="w-4 h-4 text-gold-accent" />}
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-accent to-gold-hover text-[#111C33] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 shadow-gold-glow hover:shadow-gold-glow-hover cursor-pointer"
              >
                <span>Let's Talk</span>
                <Send className="w-3.5 h-3.5 fill-[#111C33] stroke-[#111C33]" />
              </button>
            </div>
          </nav>
        )}

        {/* Dynamic Route Viewport with elegant Framer Motion Transitions */}
        <div className="flex-grow flex flex-col justify-center relative w-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HeroSection onWorkClick={() => navigate('/portfolio')} />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/skills" element={<SkillsSection />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/portfolio" element={<FeaturedProjects />} />
              <Route path="/certifications" element={<CertificationsAndMetrics />} />
              <Route path="/contact" element={<ContactSection />} />
              <Route path="/admin" element={<AdminSection />} />
            </Routes>
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <footer 
          className={`w-full py-8 px-12 border-t border-dark-navy/35 text-center text-[10px] text-muted-gray uppercase font-bold tracking-widest space-y-2 card-style ${visualMode}`}
          style={{ borderRadius: '0px' }}
        >
          <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
          <p className="text-gold-accent/60">
            {profile.role}, {profile.company}.
          </p>
        </footer>

      </main>

      {/* Floating Cyber Terminal Trigger Button */}
      {!isAdminRoute && (
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gold-accent hover:bg-gold-hover text-[#292929] shadow-gold-glow hover:shadow-gold-glow-hover flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group border border-gold-accent/50"
          title="Open Cyber Console (Shortcut: ` )"
        >
          <Terminal className="w-5 h-5 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-mono text-[9px] uppercase tracking-widest font-extrabold whitespace-nowrap">
            Suku Console
          </span>
        </button>
      )}

      {/* Retro Interactive Command Terminal Console */}
      <CommandTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BrandingProvider>
        <AppContent />
      </BrandingProvider>
    </BrowserRouter>
  )
}

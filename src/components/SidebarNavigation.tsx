import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  User, 
  Briefcase, 
  FolderGit, 
  Code, 
  Award, 
  Mail, 
  Download, 
  Menu, 
  X,
  Sun,
  Moon,
  Settings
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useBranding } from '../context/BrandingContext'

interface SidebarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function SidebarNavigation({ activeSection, onNavClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme, visualMode, profile, downloadCV } = useBranding()

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderGit },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  const handleLinkClick = (id: string) => {
    onNavClick(id === 'home' ? '' : id)
    setIsOpen(false)
  }

  // Sidebar content (shared between desktop panel and mobile drawer)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between overflow-y-auto">
      {/* Top Branding Section */}
      <div>
        <div className="flex items-center space-x-3 mb-8">
          {/* Custom Logo Monogram / Image */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold-accent to-dark-navy border border-gold-accent/40 shadow-gold-glow flex-shrink-0">
            {profile.logoImage ? (
              <img 
                src={profile.logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="font-sans font-black text-xl text-white tracking-wider">
                {profile.initials || 'M'}
              </span>
            )}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-gold-accent" />
          </div>
          <div>
            <h2 className="text-silver-text font-bold text-base leading-tight tracking-wide truncate max-w-[170px]">
              {profile.name}
            </h2>
            <p className="text-gold-accent font-medium text-[10px] tracking-wider uppercase truncate max-w-[170px]">
              {profile.role}
            </p>
          </div>
        </div>

        {/* Navigation Middle Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id || (item.id === 'home' && activeSection === '')
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group text-left cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-dark-navy to-dark-navy-light text-gold-accent border-l-2 border-gold-accent shadow-navy-glow' 
                    : 'text-muted-gray hover:text-silver-text hover:bg-dark-navy-light/10'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-gold-accent' : 'text-muted-gray group-hover:text-gold-accent'
                }`} />
                <span className="font-medium text-sm tracking-wide">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Center Call-to-Action Card */}
      <div className="my-6">
        <div className={`relative p-5 card-style ${visualMode} overflow-hidden group`}>
          {/* Accent light decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gold-accent/10 blur-xl group-hover:bg-gold-accent/20 transition-all duration-500" />
          
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-accent/15 text-gold-accent mb-3 border border-gold-accent/20">
            {profile.company ? 'GIIN Innovation' : 'Innovation Hub'}
          </span>
          <h3 className="text-silver-text font-bold text-sm leading-snug mb-1">Let's scale together!</h3>
          <p className="text-muted-gray text-xs mb-4 leading-relaxed font-light">
            Partner with {profile.company || 'us'} to build future-proof ventures.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick('contact')
            }}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-hover"
          >
            Hire Me / Partner
          </a>
        </div>
      </div>

      {/* Bottom CV and Social Links */}
      <div className="pt-4 border-t border-dark-navy/40">
        <div className="mb-4">
          <p className="text-muted-gray text-[10px] uppercase font-bold tracking-widest mb-2 px-1">Download CV</p>
          <button
            onClick={downloadCV}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-dark-navy hover:border-gold-accent/40 bg-obsidian text-xs hover:text-silver-text transition-all duration-300 group cursor-pointer text-left"
          >
            <span className="font-semibold text-muted-gray group-hover:text-silver-text truncate pr-2">
              Mensah_Suku_CV_Verified.png
            </span>
            <Download className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
          </button>
        </div>

        <div>
          <p className="text-muted-gray text-[10px] uppercase font-bold tracking-widest mb-2 px-1">Connect With Me</p>
          <div className="flex items-center space-x-2 px-1">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {/* Admin Control Dashboard gear icon */}
            <button
              onClick={() => handleLinkClick('admin')}
              className={`p-2.5 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] transition-all duration-300 border border-gold-accent/15 cursor-pointer ml-auto mr-1 ${
                activeSection === 'admin' ? 'text-gold-accent shadow-gold-glow bg-dark-navy-light' : 'text-gold-accent'
              }`}
              aria-label="Admin Control Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Theme Toggle next to socials */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (lg viewport) */}
      <aside 
        className={`hidden lg:flex flex-col w-80 h-screen fixed left-0 top-0 border-r border-dark-navy p-6 z-30 backdrop-blur-md card-style ${visualMode}`}
        style={{ borderRadius: '0px' }}
      >
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sticky Navbar Header */}
      <header 
        className={`lg:hidden w-full h-16 fixed top-0 left-0 border-b border-dark-navy flex items-center justify-between px-4 z-40 backdrop-blur-md card-style ${visualMode}`}
        style={{ borderRadius: '0px' }}
      >
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gold-accent to-dark-navy border border-gold-accent/40 shadow-gold-glow flex-shrink-0">
            {profile.logoImage ? (
              <img 
                src={profile.logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="font-sans font-black text-xs text-white">
                {profile.initials || 'M'}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-silver-text font-bold text-sm tracking-wide truncate max-w-[150px]">
              {profile.name}
            </h2>
          </div>
        </div>
        
        {/* Mobile Header Buttons (Theme Toggle + Hamburger Menu) */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleLinkClick('admin')}
            className={`p-2 rounded-lg bg-dark-navy border border-gold-accent/20 cursor-pointer ${
              activeSection === 'admin' ? 'text-gold-accent bg-dark-navy-light' : 'text-gold-accent'
            }`}
            aria-label="Admin Control Panel"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-dark-navy text-gold-accent border border-gold-accent/20 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-dark-navy text-gold-accent border border-gold-accent/20 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (with Backdrop overlay) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 w-80 h-screen bg-obsidian border-r border-dark-navy p-6 z-50 shadow-gold-glow overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 border-b border-dark-navy/40 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gold-accent/20 flex items-center justify-center border border-gold-accent/30">
                    <span className="text-gold-accent font-black text-sm">
                      {profile.initials || 'M'}
                    </span>
                  </div>
                  <span className="font-bold text-silver-text text-sm">Navigation</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg bg-white/5 text-muted-gray hover:text-silver-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

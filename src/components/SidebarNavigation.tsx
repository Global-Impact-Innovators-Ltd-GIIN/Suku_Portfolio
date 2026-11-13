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
  Settings,
  Lock
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsappIcon, FacebookIcon, InstagramIcon, TiktokIcon } from './Icons'
import { useBranding } from '../context/BrandingContext'
import { CV_VARIANTS } from '../data/cvVariants'
import type { CVVariantId } from '../data/cvVariants'

interface SidebarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function SidebarNavigation({ activeSection, onNavClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showFormatPicker, setShowFormatPicker] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<CVVariantId>('executive')
  const { theme, toggleTheme, visualMode, profile, downloadCV } = useBranding()

  const selectedVariantMeta = CV_VARIANTS.find(v => v.id === selectedVariant) ?? CV_VARIANTS[0]

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
        {/* Brand block: standalone shield logo + name as separate text.
            The whole block links home ("/") — a plain anchor so it loads /
            refreshes the main page. The logo image holds the shield only;
            the name is HTML text, never baked into the image. */}
        <a href="/" aria-label="Mensah Q. Suku Jr — go to home page" className="flex items-center space-x-3 mb-8 cursor-pointer">
          {profile.logoImage ? (
            <img
              src={profile.logoImage}
              alt="Suku logo"
              className="h-12 w-12 shrink-0 object-contain rounded-xl"
            />
          ) : (
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold-accent to-dark-navy border border-gold-accent/40 shadow-gold-glow flex-shrink-0">
              <span className="font-sans font-black text-xl text-white tracking-wider">
                {profile.initials || 'M'}
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-gold-accent" />
            </div>
          )}
          <div>
            <h2 className="text-silver-text font-bold text-base leading-tight tracking-wide truncate max-w-[170px]">
              {profile.name}
            </h2>
            <p className="text-gold-accent font-medium text-[10px] tracking-wider uppercase truncate max-w-[170px]">
              {profile.role}
            </p>
          </div>
        </a>

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
        <div className="mb-4 relative">
          <p className="text-muted-gray text-[10px] uppercase font-bold tracking-widest mb-2 px-1">Download CV</p>
          <button
            onClick={() => setShowFormatPicker(!showFormatPicker)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-dark-navy hover:border-gold-accent/40 bg-obsidian text-xs hover:text-silver-text transition-all duration-300 group cursor-pointer text-left"
          >
            <span className="font-semibold text-muted-gray group-hover:text-silver-text truncate pr-2">
              {selectedVariantMeta.label} CV — Select format…
            </span>
            <Download className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
          </button>

          {showFormatPicker && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-deep-obsidian border border-dark-navy/60 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-[320px] overflow-y-auto">
              {/* Step 1: pick a CV variant (driven by CV_VARIANTS, never hardcoded) */}
              <p className="px-4 pt-3 pb-1 text-[9px] uppercase font-bold tracking-widest text-muted-gray">CV variant</p>
              {CV_VARIANTS.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`w-full text-left px-4 py-2 text-xs transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                    variant.id === selectedVariant
                      ? 'bg-gold-accent text-[#111C33] font-bold'
                      : 'text-silver-text hover:bg-gold-accent/10 hover:text-gold-accent font-medium'
                  }`}
                >
                  <span>{variant.label}</span>
                  <span className={`text-[9px] truncate ${variant.id === selectedVariant ? 'opacity-70' : 'opacity-50'}`}>
                    {variant.tagline}
                  </span>
                </button>
              ))}

              {/* Step 2: pick a format for the selected variant */}
              <p className="px-4 pt-3 pb-1 text-[9px] uppercase font-bold tracking-widest text-muted-gray border-t border-dark-navy/30 mt-1">Format — {selectedVariantMeta.label}</p>
              <div className="flex flex-col divide-y divide-dark-navy/30 pb-1">
                <button
                  onClick={() => {
                    void downloadCV('pdf', selectedVariant)
                    setShowFormatPicker(false)
                  }}
                  className="w-full text-left px-4 py-2.5 text-silver-text hover:bg-gold-accent hover:text-[#111C33] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Export as PDF Document</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-60">.pdf</span>
                </button>
                <button
                  onClick={() => {
                    void downloadCV('word', selectedVariant)
                    setShowFormatPicker(false)
                  }}
                  className="w-full text-left px-4 py-2.5 text-silver-text hover:bg-gold-accent hover:text-[#111C33] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Export as Word Document</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-60">.doc</span>
                </button>
                <button
                  onClick={() => {
                    void downloadCV('png', selectedVariant)
                    setShowFormatPicker(false)
                  }}
                  className="w-full text-left px-4 py-2.5 text-silver-text hover:bg-gold-accent hover:text-[#111C33] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Export as High-Res Image</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-60">.png</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-muted-gray text-[10px] uppercase font-bold tracking-widest mb-2 px-1">Connect With Me</p>
          <div className="flex flex-wrap gap-2 px-1 items-center justify-between w-full">
            <div className="flex flex-wrap gap-1.5 items-center max-w-[75%]">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.whatsappUrl && (
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="WhatsApp Contact"
                >
                  <WhatsappIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.facebookUrl && (
                <a
                  href={profile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="Facebook Profile"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="Instagram Profile"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.tiktokUrl && (
                <a
                  href={profile.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="TikTok Profile"
                >
                  <TiktokIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="GitHub Account 1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.githubUrl2 && (
                <a
                  href={profile.githubUrl2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="GitHub Account 2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.githubUrl3 && (
                <a
                  href={profile.githubUrl3}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="GitHub Account 3"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.githubUrl4 && (
                <a
                  href={profile.githubUrl4}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15"
                  title="GitHub Account 4"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="flex items-center space-x-1.5 ml-auto">
              {/* Admin Control Dashboard gear icon */}
              <button
                onClick={() => handleLinkClick('admin')}
                className={`p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] transition-all duration-300 border border-gold-accent/15 cursor-pointer ${
                  activeSection === 'admin' ? 'text-gold-accent shadow-gold-glow bg-dark-navy-light' : 'text-gold-accent'
                }`}
                aria-label="Admin Control Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              {/* Theme Toggle next to socials */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-dark-navy hover:bg-gold-accent hover:text-[#111C33] text-gold-accent transition-all duration-300 border border-gold-accent/15 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Discreet admin entry — bottom of the sidebar (desktop + mobile drawer) */}
        <button
          onClick={() => handleLinkClick('admin')}
          className="mt-4 flex items-center justify-center space-x-1.5 w-full text-[10px] uppercase font-bold tracking-widest text-muted-gray/50 hover:text-gold-accent transition-colors duration-300 cursor-pointer"
        >
          <Lock className="w-3 h-3" />
          <span>Admin Access</span>
        </button>
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
        {/* Brand block: standalone shield logo + name as separate text, links home */}
        <a href="/" aria-label="Mensah Q. Suku Jr — go to home page" className="flex items-center space-x-2 cursor-pointer">
          {profile.logoImage ? (
            <img
              src={profile.logoImage}
              alt="Suku logo"
              className="h-8 w-8 shrink-0 object-contain rounded-md"
            />
          ) : (
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gold-accent to-dark-navy border border-gold-accent/40 shadow-gold-glow flex-shrink-0">
              <span className="font-sans font-black text-xs text-white">
                {profile.initials || 'M'}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-silver-text font-bold text-sm tracking-wide truncate max-w-[150px]">
              {profile.name}
            </h2>
          </div>
        </a>
        
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

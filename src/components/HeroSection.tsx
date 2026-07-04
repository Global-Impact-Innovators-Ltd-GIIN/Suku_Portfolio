import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, X, Shield, Code, Award } from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

interface HeroProps {
  onWorkClick: () => void;
}

export default function HeroSection({ onWorkClick }: HeroProps) {
  const [showPitchDeck, setShowPitchDeck] = useState(false)
  const { profile, personaTone, visualMode, heroCopy } = useBranding()

  // Parse active copy
  const activeCopy = heroCopy[personaTone] || heroCopy.technologist

  const renderStyledTitle = (text: string) => {
    const parts = text.split('**')
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <span key={i} className="text-gradient-gold-full">{part}</span>
      }
      return <span key={i}>{part}</span>
    })
  }

  const currentCopy = {
    eyebrow: activeCopy.eyebrow,
    title: renderStyledTitle(activeCopy.title),
    description: activeCopy.description,
    badges: activeCopy.badges.split(',').map(b => b.trim()).filter(Boolean),
    card1Title: activeCopy.card1Title,
    card1Subtitle: activeCopy.card1Subtitle,
    card2Title: activeCopy.card2Title,
    card2Subtitle: activeCopy.card2Subtitle
  }

  return (
    <section id="home" className="relative pt-24 lg:pt-12 pb-16 px-6 lg:px-12 flex flex-col items-center flex-grow justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Content Column (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <span className="w-8 h-[2px] bg-gold-accent" />
            <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
              {currentCopy.eyebrow}
            </span>
          </motion.div>
          
          <motion.h1
            key={`title-${personaTone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-silver-text font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
          >
            {currentCopy.title}
          </motion.h1>

          <motion.p
            key={`desc-${personaTone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-gray text-base sm:text-lg leading-relaxed max-w-xl font-light"
          >
            {currentCopy.description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={onWorkClick}
              className="px-6 py-3.5 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-bold text-sm tracking-wider uppercase flex items-center space-x-2 transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-hover cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setShowPitchDeck(true)}
              className={`px-6 py-3.5 border hover:border-gold-accent text-silver-text hover:text-gold-accent font-bold text-sm tracking-wider uppercase flex items-center space-x-2 transition-all duration-300 cursor-pointer card-style ${visualMode}`}
            >
              <Play className="w-4 h-4 text-gold-accent fill-gold-accent" />
              <span>Watch Pitch Deck</span>
            </button>
          </motion.div>

          {/* Strategic Partners & Professional Network (Trust Badges) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-10 border-t border-dark-navy/35"
          >
            <p className="text-muted-gray text-[11px] font-bold uppercase tracking-widest mb-4">
              Academic & Professional Ecosystem
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center opacity-85 hover:opacity-100 transition-opacity duration-300">
              {currentCopy.badges.map((badge, idx) => (
                <span 
                  key={idx} 
                  className={`text-silver-text font-bold text-xs px-3 py-1.5 border border-gold-accent/20 card-style ${visualMode}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side Image Column (5 cols on desktop) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-80 sm:w-96 aspect-square max-w-full"
          >
            {/* Ambient Background Glowing Sphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-gradient-to-tr from-gold-accent/20 to-dark-navy/60 blur-2xl -z-10" />

            {/* Custom Designed Container linked to visualMode */}
            <div className={`w-full h-full p-2 shadow-navy-glow group hover:border-gold-accent/50 transition-all duration-500 card-style ${visualMode}`}>
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-obsidian">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Subtle Overlay to blend with UI colors */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`absolute -right-4 bottom-12 p-4 shadow-gold-glow backdrop-blur-md flex items-center space-x-3 max-w-[200px] border border-gold-accent/30 card-style ${visualMode}`}
            >
              <div className="p-2 rounded-xl bg-gold-accent/15 text-gold-accent flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-silver-text font-extrabold text-sm leading-none truncate">{currentCopy.card2Title}</p>
                <p className="text-muted-gray font-medium text-[9px] uppercase tracking-wider mt-1 leading-tight">{currentCopy.card2Subtitle}</p>
              </div>
            </motion.div>

            {/* Second Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`absolute -left-4 top-12 p-4 shadow-navy-glow backdrop-blur-md flex items-center space-x-3 border border-dark-navy/40 card-style ${visualMode}`}
            >
              <div className="p-2 rounded-xl bg-gold-accent/10 text-gold-accent flex-shrink-0">
                <Code className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-silver-text font-black text-sm leading-none truncate">{currentCopy.card1Title}</p>
                <p className="text-muted-gray text-[9px] uppercase tracking-widest mt-1 truncate">{currentCopy.card1Subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Pitch Deck / Intro Modal Popup */}
      <AnimatePresence>
        {showPitchDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-4xl p-6 sm:p-10 border border-gold-accent/30 shadow-gold-glow card-style ${visualMode}`}
            >
              <button
                onClick={() => setShowPitchDeck(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-muted-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-left space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-accent/15 text-gold-accent mb-3 border border-gold-accent/20">
                    Pitch Deck & Ecosystem Overview
                  </span>
                  <h2 className="text-silver-text font-extrabold text-2xl sm:text-3xl leading-tight">
                    {profile.company}
                  </h2>
                  <p className="text-muted-gray text-sm mt-1">
                    Building secure digital infrastructure and transformative systems in Rwanda.
                  </p>
                </div>

                {/* Slides / Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className={`p-6 border border-dark-navy/40 space-y-3 card-style ${visualMode}`}>
                    <div className="flex items-center space-x-3 text-gold-accent">
                      <Shield className="w-6 h-6" />
                      <h4 className="font-bold text-silver-text text-base">Cyber & Network Pillars</h4>
                    </div>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      Securing African startups and enterprises. We deploy threat monitoring models (SIEM fundamentals), design customized secure endpoints, and build enterprise switching/routing environments certified to global IT standards.
                    </p>
                  </div>
                  
                  <div className={`p-6 border border-dark-navy/40 space-y-3 card-style ${visualMode}`}>
                    <div className="flex items-center space-x-3 text-gold-accent">
                      <Code className="w-6 h-6" />
                      <h4 className="font-bold text-silver-text text-base">Premium Web Engineering</h4>
                    </div>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      We engineer high-performance frontend applications for scaling fintechs, e-learning environments, and certificate registries. Leveraging clean React ecosystems and optimized workflows that users love.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-dark-navy/40 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent border border-gold-accent/20">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-silver-text font-bold text-sm">Rwanda tech-transformation</p>
                      <p className="text-muted-gray text-xs">{profile.company}</p>
                    </div>
                  </div>
                  
                  <a
                    href="#contact"
                    onClick={() => setShowPitchDeck(false)}
                    className="px-6 py-3 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-extrabold text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    Discuss Partnership
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

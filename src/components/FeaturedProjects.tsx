import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Cpu, ArrowRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import { useBranding } from '../context/BrandingContext'


export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'dev', label: 'Development' },
    { id: 'cyber-net', label: 'Cyber & Networking' },
    { id: 'giin', label: 'GIIN Ecosystem' }
  ]

  const { projects, visualMode } = useBranding()

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab)

  // Render CSS-based interactive vector frames instead of broken/static images
  const renderMockup = (type: string) => {
    switch (type) {
      case 'eye-tracking':
        return (
          <div className="w-full h-full bg-[var(--eye-bg)] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[9px] text-green-400">
            {/* Camera Feed Mock */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,163,17,0.05)_0%,transparent_70%)]" />
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>CAMERA_FEED_01 [ACTIVE]</span>
              </span>
              <span>FPS: 30.2</span>
            </div>
            
            {/* Eye wireframe animation in CSS */}
            <div className="my-auto relative flex justify-center items-center">
              <div className="w-24 h-16 rounded-full border border-green-500/30 flex items-center justify-center relative">
                {/* Pupil */}
                <div className="w-8 h-8 rounded-full border border-gold-accent flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gold-accent animate-ping" />
                </div>
                {/* Scanning lines */}
                <div className="absolute inset-x-0 h-[1px] bg-green-400/40 animate-bounce" />
              </div>
              <div className="absolute top-0 right-8 border border-red-500/40 px-2 py-0.5 text-red-500 rounded bg-red-950/20">
                Gaze Offset detected
              </div>
            </div>
 
            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[8px] text-muted-gray">
              <span>FACIAL_POINTS: 468</span>
              <span>GAZE_VECTOR: [0.12, -0.45]</span>
            </div>
          </div>
        )
      case 'certificate-auth':
        return (
          <div className="w-full h-full bg-[var(--stego-bg)] relative overflow-hidden flex flex-col justify-between p-4 text-[9px]">
            {/* Certificate Frame */}
            <div className="absolute inset-2 border border-dashed border-gold-accent/20 rounded-xl flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-white font-extrabold tracking-wider">CERTIFICATE AUTHENTICATOR</p>
                  <p className="text-muted-gray text-[7px]">AES-256 ENCRYPTED METADATA</p>
                </div>
                <Shield className="w-6 h-6 text-gold-accent" />
              </div>
 
              {/* Steganography Visual */}
              <div className="my-2 p-2 rounded bg-black/40 border border-white/5 flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-gold-accent to-dark-navy flex items-center justify-center text-white font-black text-xs">
                  QR
                </div>
                <div className="space-y-1 flex-1 font-mono text-[7px] text-muted-gray">
                  <p className="text-white">SHA256: 8a4c1f...de89</p>
                  <p>DECODED: Valid ID: MQS-90</p>
                </div>
              </div>
 
              <div className="flex justify-between items-center text-[7px] text-gold-accent font-bold tracking-widest">
                <span>STATUS: AUTHENTIC</span>
                <span>STEGO_KEY: ENABLED</span>
              </div>
            </div>
          </div>
        )
      case 'network-routing':
        return (
          <div className="w-full h-full bg-[var(--net-bg)] relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[9px] text-blue-400">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>ROUTER_NODE_SWITCH</span>
              <span className="text-gold-accent">SYS_OK</span>
            </div>
 
            {/* Network nodes */}
            <div className="my-auto flex justify-around items-center relative">
              <div className="w-10 h-10 rounded-xl bg-dark-navy border border-blue-500/40 flex flex-col items-center justify-center text-[8px] text-white">
                <Cpu className="w-4 h-4 text-blue-400 mb-0.5" />
                <span>WAN_GW</span>
              </div>
              
              {/* Connecting glowing line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-gold-accent relative">
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gold-accent -translate-y-1/2 animate-ping" />
              </div>
 
              <div className="w-10 h-10 rounded-xl bg-dark-navy border border-gold-accent/40 flex flex-col items-center justify-center text-[8px] text-white shadow-gold-glow">
                <Shield className="w-4 h-4 text-gold-accent mb-0.5" />
                <span>SIEM</span>
              </div>
            </div>
 
            <div className="flex justify-between items-center text-[7px] text-muted-gray">
              <span>IP: 192.168.10.1</span>
              <span>PACKETS: 4500/s</span>
            </div>
          </div>
        )
      case 'giin-portal':
        return (
          <div className="w-full h-full bg-[var(--giin-bg)] relative overflow-hidden flex flex-col justify-between p-4 text-[9px]">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white uppercase tracking-wider">GIIN Finance Portal</span>
              <span className="text-gold-accent font-bold">$125.4K</span>
            </div>

            {/* Micro Dashboard UI */}
            <div className="my-auto space-y-2">
              <div className="grid grid-cols-2 gap-2 text-center text-[8px]">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <p className="text-muted-gray">Clients Active</p>
                  <p className="text-white font-extrabold text-xs">80+</p>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <p className="text-muted-gray">Repayment Rate</p>
                  <p className="text-gold-accent font-extrabold text-xs">98.6%</p>
                </div>
              </div>
              
              {/* Visual chart mock */}
              <div className="h-10 w-full flex items-end justify-between px-2 bg-black/40 border border-white/5 rounded pt-2">
                <div className="w-2.5 h-4 bg-dark-navy rounded-t" />
                <div className="w-2.5 h-6 bg-dark-navy rounded-t" />
                <div className="w-2.5 h-5 bg-dark-navy rounded-t" />
                <div className="w-2.5 h-8 bg-gold-accent rounded-t" />
              </div>
            </div>

            <div className="flex justify-between text-[7px] text-muted-gray">
              <span>ECOSYSTEM: GIIN HUB</span>
              <span>v1.2.0-stable</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 bg-black/5 flex-grow flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[2px] bg-gold-accent" />
              <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
                MY WORK
              </span>
            </div>
            <h2 className="text-silver-text font-extrabold text-3xl sm:text-4xl tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
              Demonstrated engineering skills across artificial intelligence, cybersecurity, networking, and corporate client platforms.
            </p>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-gold-accent border-gold-accent text-[#020205] shadow-gold-glow'
                    : 'bg-obsidian border-dark-navy text-muted-gray hover:text-silver-text hover:border-gold-accent/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`group flex flex-col justify-between border border-dark-navy/40 shadow-navy-glow overflow-hidden hover:border-gold-accent/30 hover:shadow-gold-glow transition-all duration-500 card-style ${visualMode}`}
              >
                
                {/* Visual Mockup Container */}
                <div className="w-full aspect-[16/10] bg-deep-obsidian border-b border-dark-navy/40 overflow-hidden relative">
                  {renderMockup(project.mockup)}
                  
                  {/* Hover scan overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent pointer-events-none" />
                </div>

                {/* Info Text Area */}
                <div className="p-6 text-left space-y-4">
                  {/* Badges / Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dark-navy-light text-muted-gray border border-dark-navy/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-silver-text font-extrabold text-lg group-hover:text-gold-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-gray text-xs leading-relaxed font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Actions Links */}
                  <div className="pt-4 border-t border-dark-navy/30 flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-muted-gray hover:text-silver-text transition-colors duration-300"
                    >
                      <GithubIcon className="w-4 h-4 text-gold-accent" />
                      <span>Source Code</span>
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-accent group-hover:text-gold-light transition-colors duration-300"
                    >
                      <span>Inquire Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  )
}

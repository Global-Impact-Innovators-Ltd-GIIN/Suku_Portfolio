import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

export default function AboutSection() {
  const { profile, personaTone, visualMode } = useBranding()

  const copyMap = {
    technologist: {
      title: 'A Unique Intersection of Code and Infrastructure.',
      paragraph: `My career operates at the crossroads of frontend engineering and infrastructure operations. As a developer at UBWENGE LAB, I model seamless web applications; as Founder and CEO of ${profile.company} in Rwanda, I direct IT transformation blueprints.`,
      highlightTitle: 'Rwanda Digital Innovation Hub',
      highlightDesc: 'Leveraging local expertise and international standards (CMU-Africa, AFRETEC) to build high-capacity enterprise networks and security products.'
    },
    executive: {
      title: 'Venture Builder at the Forefront of IT Operations.',
      paragraph: `I lead ${profile.company} in Rwanda, designing digital business blueprints and enterprise solutions that scale. Fostering next-generation startup ecosystems and corporate automation grids in emerging markets.`,
      highlightTitle: 'Corporate IT Strategy',
      highlightDesc: 'Advising executive teams on cloud migration, enterprise software scalability, business process automation, and regional technology ventures.'
    },
    academic: {
      title: 'Rigorous Foundations in Computing & Infrastructure.',
      paragraph: `My academic core is built on UNILAK Networking, CMU-Africa engineering paradigms, and AFRETEC cybersecurity diagnostics. Researching cryptographic certificate registration systems, SIEM models, and digital steganography.`,
      highlightTitle: 'Systems Research',
      highlightDesc: 'Investigating endpoint protection matrices, packet analysis models (Wireshark), IPSec VPN tunnels, and steganographical data concealment.'
    }
  }

  const currentCopy = copyMap[personaTone] || copyMap.technologist

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 space-y-16 flex-grow flex items-center justify-center bg-gradient-to-b from-transparent to-black/5"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
        
        {/* Left Side: Short bio summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[2px] bg-gold-accent" />
              <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
                ABOUT ME
              </span>
            </div>
            <h2 className="text-silver-text font-extrabold text-3xl tracking-tight">
              {currentCopy.title}
            </h2>
          </div>
          <p className="text-muted-gray text-sm leading-relaxed font-light">
            {currentCopy.paragraph}
          </p>
          <div className={`p-5 flex items-start space-x-3.5 border border-dark-navy/40 shadow-navy-glow card-style ${visualMode}`}>
            <Terminal className="w-5 h-5 text-gold-accent mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-silver-text font-bold text-sm">{currentCopy.highlightTitle}</h4>
              <p className="text-muted-gray text-xs leading-relaxed font-light">
                {currentCopy.highlightDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick facts / timelines (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`p-8 border border-dark-navy/40 shadow-navy-glow space-y-6 card-style ${visualMode}`}>
            <h3 className="text-silver-text font-bold text-lg font-sans">My Professional Core</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-gold-accent font-extrabold text-xs uppercase tracking-wider block">01 / UI ENGINEERING</span>
                <p className="text-muted-gray text-xs leading-relaxed font-light">
                  Passionate about component reusability, strict TypeScript workflows, custom layout design systems, and rich UX animations.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-gold-accent font-extrabold text-xs uppercase tracking-wider block">02 / NETWORKS & SECURITY</span>
                <p className="text-muted-gray text-xs leading-relaxed font-light">
                  Active in design, configuration, and monitoring of enterprise networks and secure endpoint applications, utilizing SIEM models and steganography.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-gold-accent font-extrabold text-xs uppercase tracking-wider block">03 / ENTREPRENEURSHIP</span>
                <p className="text-muted-gray text-xs leading-relaxed font-light">
                  Founder and CEO of {profile.company} in Rwanda. Architecting digital business models and IT consulting blueprints.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-gold-accent font-extrabold text-xs uppercase tracking-wider block">04 / ECOSYSTEM BACKGROUND</span>
                <p className="text-muted-gray text-xs leading-relaxed font-light">
                  Academic backing from UNILAK (BSc IT Networking), CMU-Africa Bridge Program, and AFRETEC Cybersecurity Certificate.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  )
}

import { motion } from 'framer-motion'
import { useBranding } from '../context/BrandingContext'

export default function SkillsSection() {
  const { visualMode } = useBranding()
  
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js & Next.js', level: 90 },
        { name: 'TypeScript / JavaScript', level: 88 },
        { name: 'Tailwind CSS & CSS3', level: 95 },
        { name: 'Framer Motion & UX', level: 85 }
      ]
    },
    {
      title: 'Cybersecurity Operations',
      skills: [
        { name: 'Endpoint Protection & SIEM', level: 80 },
        { name: 'Threat Hunting & Risk Audits', level: 82 },
        { name: 'Cryptography & Stego', level: 85 },
        { name: 'Vulnerability Analysis', level: 78 }
      ]
    },
    {
      title: 'Network Engineering',
      skills: [
        { name: 'Cisco Routing & Switching', level: 88 },
        { name: 'Network Topologies & VPN', level: 85 },
        { name: 'LAN/WAN & Subnetting', level: 90 },
        { name: 'Traffic Monitoring (Wireshark)', level: 82 }
      ]
    },
    {
      title: 'Leadership & Consulting',
      skills: [
        { name: 'Tech Venture Operations', level: 85 },
        { name: 'IT Strategy & Consultancy', level: 90 },
        { name: 'Agile Project Workflows', level: 88 },
        { name: 'Product Engineering', level: 82 }
      ]
    }
  ]

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 flex-grow flex items-center justify-center bg-gradient-to-b from-transparent to-black/5"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12 text-left">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[2px] bg-gold-accent" />
            <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
              TECHNICAL SKILLS
            </span>
          </div>
          <h2 className="text-silver-text font-extrabold text-3xl tracking-tight font-sans">
            Skillsets & Core Matrices
          </h2>
          <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
            Measured proficiency ratings based on projects shipped, certifications earned, and years of hands-on deployment.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 border border-dark-navy/40 shadow-navy-glow space-y-6 card-style ${visualMode}`}
            >
              <h3 className="text-silver-text font-bold text-base border-b border-dark-navy/40 pb-3 font-sans">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-silver-text font-medium">{skill.name}</span>
                      <span className="text-gold-accent font-bold">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="w-full h-2 bg-dark-navy rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-gold-accent to-gold-light rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

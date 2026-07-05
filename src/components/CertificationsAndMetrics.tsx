import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

export default function CertificationsAndMetrics() {
  const { certifications, metrics, visualMode } = useBranding()

  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 space-y-16 flex-grow flex flex-col justify-center"
    >
      
      {/* 1. Metrics Ribbon (Dual gradient block) */}
      <div className="max-w-6xl w-full mx-auto p-[1px] rounded-3xl bg-gradient-to-r from-gold-accent via-gold-hover to-dark-navy shadow-gold-glow">
        <div className="w-full h-full rounded-[23px] bg-deep-obsidian/95 px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 divide-y-0 md:divide-x divide-dark-navy">
          {metrics.map((metric, index) => {
            const Icon = (LucideIcons as any)[metric.iconName] || LucideIcons.Award
            return (
              <div key={index} className="flex flex-col items-center justify-center text-center space-y-2 px-2">
                <div className="p-2 rounded-xl bg-gold-accent/10 text-gold-accent">
                  <Icon className="w-5 h-5 text-glow" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-silver-text font-black text-2xl sm:text-3xl leading-none">
                    {metric.value}
                  </h3>
                  <p className="text-muted-gray text-[10px] uppercase font-bold tracking-widest font-light">
                    {metric.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Certifications Section */}
      <div className="max-w-6xl w-full mx-auto text-left space-y-12">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[2px] bg-gold-accent" />
            <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
              CREDENTIALS & TRACKS
            </span>
          </div>
          <h2 className="text-silver-text font-extrabold text-3xl sm:text-4xl tracking-tight font-sans">
            Certifications & Education
          </h2>
          <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
            Verified academic milestones and industry-backed professional certifications in digital engineering, systems, and network security.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group border border-dark-navy/40 hover:border-gold-accent/30 transition-all duration-500 overflow-hidden flex flex-col justify-between card-style bg-deep-obsidian/20 shadow-navy-glow ${visualMode}`}
            >
              {/* Certificate Image Top Wrapper */}
              {cert.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden border-b border-dark-navy/35 bg-black/40">
                  <img 
                    src={cert.imageUrl} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="p-8 space-y-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <LucideIcons.Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-dark-navy-light text-muted-gray px-3 py-1 rounded-full border border-dark-navy/15">
                    {cert.date}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-silver-text font-bold text-lg group-hover:text-gold-accent transition-colors duration-300 font-sans leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-gold-accent font-medium text-[11px] tracking-wider uppercase font-sans">
                    {cert.issuer}
                  </p>
                  <p className="text-muted-gray text-xs leading-relaxed font-light">
                    {cert.details}
                  </p>
                </div>
              </div>

              {/* Bottom Authority verification tag */}
              <div className="px-8 pb-8 pt-4 border-t border-dark-navy/40 flex justify-between items-center text-[10px] text-muted-gray">
                <span>Authority: {cert.authority}</span>
                <span className="text-gold-accent font-semibold flex items-center space-x-1">
                  <LucideIcons.Shield className="w-3.5 h-3.5 text-glow" />
                  <span>Verified Security Badge</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

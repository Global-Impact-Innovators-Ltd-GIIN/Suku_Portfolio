import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

export default function ServicesSection() {
  const { services, visualMode } = useBranding()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  }

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 bg-gradient-to-b from-transparent to-black/5 flex-grow flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto text-left space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[2px] bg-gold-accent" />
            <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
              WHAT I DO
            </span>
          </div>
          <h2 className="text-silver-text font-extrabold text-3xl sm:text-4xl tracking-tight font-sans">
            Services I Offer
          </h2>
          <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
            Integrating advanced digital blueprints with enterprise-level security and networking models.
          </p>
        </div>

        {/* Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            // Dynamically resolve icon component based on name
            const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`group relative p-8 border border-dark-navy/40 shadow-navy-glow overflow-hidden hover:border-gold-accent/40 hover:shadow-gold-glow transition-all duration-500 flex flex-col justify-between card-style ${visualMode}`}
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold-accent/5 blur-2xl group-hover:bg-gold-accent/10 transition-all duration-500" />
                
                <div className="space-y-6">
                  {/* Icon & Badge row */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gold-accent/10 flex items-center justify-center text-gold-accent border border-gold-accent/20 group-hover:bg-gold-accent group-hover:text-[#020205] transition-all duration-500">
                      <Icon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-dark-navy-light text-muted-gray px-3 py-1 rounded-full border border-dark-navy/15 font-sans">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-3">
                    <h3 className="text-silver-text font-bold text-xl group-hover:text-gold-accent transition-colors duration-300 font-sans">
                      {service.title}
                    </h3>
                    <p className="text-muted-gray text-sm leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-6 mt-6 border-t border-dark-navy/40 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs uppercase font-extrabold tracking-wider text-muted-gray group-hover:text-silver-text transition-colors duration-300 flex items-center space-x-1.5 font-sans"
                  >
                    <span>Partner on Project</span>
                    <LucideIcons.ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </motion.section>
  )
}

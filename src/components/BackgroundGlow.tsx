import { motion } from 'framer-motion'


export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-deep-obsidian">
      {/* Dynamic ambient mesh gradients */}
      <div className="absolute inset-0 bg-mesh-glow opacity-80" />
      
      {/* Floating Gold Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-accent/[var(--orb-gold-opacity)] blur-[120px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Navy Orb */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-dark-navy/[var(--orb-navy-opacity)] blur-[150px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid overlay for digital texture */}
      <div className="absolute inset-0 bg-grid-texture bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
    </div>
  )
}

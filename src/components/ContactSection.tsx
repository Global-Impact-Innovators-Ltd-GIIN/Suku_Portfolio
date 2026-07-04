import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

export default function ContactSection() {
  const { profile, visualMode } = useBranding()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct mailto link
    const emailTo = profile.email
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject || 'Collaboration Proposal'}`)
    const body = encodeURIComponent(
      `Hello ${profile.name},\n\nMy name is ${formData.name}. You can reach me at ${formData.email}.\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    )
    
    // Open email client
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`
    
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6 lg:px-12 bg-gradient-to-t from-black/5 to-transparent flex-grow flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[2px] bg-gold-accent" />
            <span className="text-gold-accent font-bold text-xs uppercase tracking-widest text-glow">
              CONTACT ME
            </span>
          </div>
          <h2 className="text-silver-text font-extrabold text-3xl sm:text-4xl tracking-tight font-sans">
            Let's Build Something Together
          </h2>
          <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
            Have a project in mind, seeking digital consulting, or want to discuss enterprise security integrations? Reach out below.
          </p>
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className={`p-8 border border-dark-navy/40 shadow-navy-glow space-y-6 text-left flex-1 card-style ${visualMode}`}>
              <h3 className="text-silver-text font-bold text-lg font-sans">Contact Information</h3>
              <p className="text-muted-gray text-xs leading-relaxed font-light">
                Feel free to email me directly or reach out through social platforms. I am available for leadership consultations, network security audits, and frontend development projects.
              </p>

              <div className="space-y-5 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-muted-gray text-[9px] uppercase font-bold tracking-widest">Email Point</p>
                    <a href={`mailto:${profile.email}`} className="text-silver-text font-bold text-sm hover:text-gold-accent transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-muted-gray text-[9px] uppercase font-bold tracking-widest">Location</p>
                    <p className="text-silver-text font-bold text-sm">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className={`p-6 bg-gold-accent/5 border border-gold-accent/20 flex items-center space-x-4 text-left card-style ${visualMode}`}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-accent"></span>
              </span>
              <div>
                <p className="text-silver-text font-bold text-xs uppercase tracking-wider">Available for new opportunities</p>
                <p className="text-muted-gray text-[10px] tracking-wide mt-0.5 font-light">Let's talk about scaling tech models in Africa.</p>
              </div>
            </div>

          </div>

          {/* Contact Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 border border-dark-navy/40 shadow-gold-glow/5 relative overflow-hidden card-style ${visualMode}`}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-accent/15 text-gold-accent flex items-center justify-center shadow-gold-glow">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-silver-text font-black text-xl">Email Client Triggered</h3>
                      <p className="text-muted-gray text-xs max-w-sm leading-relaxed font-light">
                        Your system's default mail client has been opened with pre-filled content. If it did not open, please send an email directly to <strong className="text-silver-text font-semibold">{profile.email}</strong>.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-muted-gray text-[10px] uppercase font-bold tracking-widest pl-1 font-light">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text placeholder-muted-gray/50 text-sm outline-none transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-gray text-[10px] uppercase font-bold tracking-widest pl-1 font-light">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. john@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text placeholder-muted-gray/50 text-sm outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-muted-gray text-[10px] uppercase font-bold tracking-widest pl-1 font-light">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Cybersecurity Audit Inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text placeholder-muted-gray/50 text-sm outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-muted-gray text-[10px] uppercase font-bold tracking-widest pl-1 font-light">Project Details / Message</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your scope, timelines, or partnership goals..."
                        className="w-full px-4 py-3 rounded-xl bg-obsidian border border-dark-navy/40 focus:border-gold-accent focus:ring-1 focus:ring-gold-accent/30 text-silver-text placeholder-muted-gray/50 text-sm outline-none transition-all duration-300 resize-none font-light"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gold-accent hover:bg-gold-hover text-[#111C33] font-extrabold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-hover cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Project Request</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  )
}

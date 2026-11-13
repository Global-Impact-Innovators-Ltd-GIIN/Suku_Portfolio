import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GithubIcon } from './Icons'
import { useBranding } from '../context/BrandingContext'
import type { ProjectItem } from '../context/BrandingContext'

const CATEGORY_LABELS: Record<string, string> = {
  dev: 'Development',
  'cyber-net': 'Cyber & Networking',
  venture: 'Venture',
  content: 'Content & Media',
}

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState('all')
  const navigate = useNavigate()

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'dev', label: 'Development' },
    { id: 'cyber-net', label: 'Cyber & Networking' },
    { id: 'venture', label: 'Ventures' },
    { id: 'content', label: 'Content & Media' }
  ]

  const { projects, visualMode } = useBranding()

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab)

  // Clean typographic/icon showcase card. No screenshots, no invented
  // metrics — the visual is the project's icon, status and real stack.
  const renderShowcase = (project: ProjectItem) => {
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[project.iconName] || LucideIcons.FolderGit
    const domain = project.link
      ? project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : ''
    const status = project.status || 'Featured'
    const isLive = status === 'Live' || status === 'Complete'
    return (
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-5 bg-deep-obsidian">
        {/* Backdrop: faint grid, soft glows, watermark icon */}
        <div className="absolute inset-0 bg-grid-texture bg-[size:28px_28px] opacity-70" />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gold-accent/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full bg-dark-navy/50 blur-3xl" />
        <Icon className="absolute -right-4 -bottom-8 w-44 h-44 text-silver-text/[0.05]" strokeWidth={1} />

        {/* Top row: icon + category, status pill */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 shrink-0 rounded-2xl bg-gold-accent/10 border border-gold-accent/25 flex items-center justify-center text-gold-accent">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-gray">
                {CATEGORY_LABELS[project.category] || project.category}
              </p>
              <p className="text-silver-text font-bold text-sm leading-tight truncate">
                {project.title}
              </p>
            </div>
          </div>
          <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
              isLive
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-gold-accent/15 text-gold-accent border-gold-accent/30'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Bottom row: stack chips + real domain */}
        <div className="relative flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-silver-text/90 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
          {domain && (
            <span className="font-mono text-[10px] text-muted-gray truncate max-w-[45%]">
              {domain}
            </span>
          )}
        </div>
      </div>
    )
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
            <h2 className="text-silver-text font-extrabold text-3xl sm:text-4xl tracking-tight text-balance">
              Featured Projects
            </h2>
            <p className="text-muted-gray max-w-xl text-sm leading-relaxed font-light">
              Real work, shipped and in progress — platforms, ventures, teaching and stories from Kigali.
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
            {filteredProjects.map((project) => {
              const isGithub = project.link.includes('github.com')
              return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`group flex flex-col justify-between border border-dark-navy/40 shadow-navy-glow overflow-hidden hover:border-gold-accent/30 hover:shadow-gold-glow hover:-translate-y-1 transition-all duration-500 card-style ${visualMode}`}
              >

                {/* Visual Showcase Container */}
                <div className="w-full aspect-[16/10] bg-deep-obsidian border-b border-dark-navy/40 overflow-hidden relative">
                  {renderShowcase(project)}

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
                  <div className="pt-4 border-t border-dark-navy/30 flex items-center justify-between gap-3">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-muted-gray hover:text-silver-text transition-colors duration-300"
                      >
                        {isGithub ? (
                          <GithubIcon className="w-4 h-4 text-gold-accent" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-gold-accent" />
                        )}
                        <span>{isGithub ? 'Source Code' : 'Visit Live Site'}</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-muted-gray">
                        {project.status || 'Featured'}
                      </span>
                    )}

                    <button
                      onClick={() => navigate('/contact')}
                      className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-accent group-hover:text-gold-light transition-colors duration-300 cursor-pointer"
                    >
                      <span>Discuss Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  )
}

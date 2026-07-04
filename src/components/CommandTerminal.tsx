import React, { useState, useEffect, useRef } from 'react'
import { Terminal, X, ChevronRight } from 'lucide-react'
import { useBranding } from '../context/BrandingContext'

interface CommandTerminalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandTerminal({ isOpen, onClose }: CommandTerminalProps) {
  const { profile, projects } = useBranding()
  const [history, setHistory] = useState<string[]>([
    'SUKU SECURE SHELL [v2.4.1]',
    '==========================',
    'Enter "help" to list available operational commands.',
    ''
  ])
  const [inputVal, setInputVal] = useState('')
  const [matrixActive, setMatrixActive] = useState(false)
  const consoleEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const cleanCmd = trimmed.split(' ')[0]
    
    let response: string[] = []

    switch (cleanCmd) {
      case '':
        response = ['']
        break
      case 'help':
        response = [
          'Operational Parameters:',
          '  about       - Summarize administrative operator credentials',
          '  skills      - Query operator tech stack & security profile',
          '  projects    - Enumerate active portfolio repositories',
          '  audit       - Initialize system-wide cybersecurity diagnostics scan',
          '  stego       - Verify asset authentication signatures',
          '  matrix      - Trigger retro green digital rain stream',
          '  clear       - Wipe terminal console history logs',
          '  close       - Shutdown secure shell session'
        ]
        break
      case 'about':
        response = [
          `Operator Identity: ${profile.name}`,
          `Role: ${profile.role} // CEO of ${profile.company}`,
          `Scope: Frontend Dev, Cisco Networking, Cybersecurity Analytics`,
          `Status: ACTIVE // AFRETEC Certified`
        ]
        break
      case 'skills':
        response = [
          'Operator Competency Matrix:',
          '  [x] React / TypeScript      - Enterprise Frontend Engineering',
          '  [x] Cybersecurity Auditing  - Network vulnerability scanning',
          '  [x] Routing & Switching     - Cisco CCNA certified engineering',
          '  [x] Steganographic Hashing   - Image payload diagnostics',
          '  [x] Tailwind CSS & UX/UI   - High-fidelity visual styling'
        ]
        break
      case 'projects':
        response = [
          'Enumerating active repository items...',
          ...projects.map(p => `  * [${p.category.toUpperCase()}] ${p.title} - ${p.subtitle.substring(0, 50)}...`),
          `Total records found: ${projects.length}`
        ]
        break
      case 'clear':
        setHistory([])
        setInputVal('')
        return
      case 'close':
        onClose()
        setInputVal('')
        return
      case 'matrix':
        setMatrixActive(true)
        response = ['Starting falling code stream... Press any key inside command line to exit matrix mode.']
        break
      case 'audit':
        response = [
          '⏳ Initializing local port vulnerability check...',
          '⚡ Scanning target host: localhost:5174',
          '🔥 Checking firewall configurations... SECURE',
          '🔒 Session integrity verified: SSL Active',
          '✅ Diagnostic audit completed. 0 critical vulnerabilities found.'
        ]
        break
      case 'stego':
        response = [
          '🔍 Inspecting portfolio image layers...',
          '🔑 Decoding embedded steganography payload metadata...',
          '🏷️ Stego signature verified: "M. Q. Suku Jr - GIIN Security"',
          '🔒 Authentication: VALID // COPYRIGHT SECURE'
        ]
        break
      default:
        response = [`Command not found: "${cleanCmd}". Type "help" for a list of valid commands.`]
    }

    setHistory(prev => [...prev, `suku-shell@guest:~$ ${cmd}`, ...response, ''])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (matrixActive) {
      setMatrixActive(false)
      setHistory(prev => [...prev, 'Code stream terminated.', ''])
      return
    }

    if (e.key === 'Enter') {
      executeCommand(inputVal)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-2xl h-[450px] bg-black/90 border border-gold-accent/40 rounded-2xl overflow-hidden flex flex-col font-mono text-xs shadow-gold-glow">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-gold-accent/20 px-4 py-3 flex items-center justify-between text-silver-text">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-gold-accent animate-pulse" />
            <span className="font-extrabold text-[10px] uppercase tracking-wider">SECURE PORTFOLIO SHELL - operator@suku-os</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-muted-gray hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console log workspace */}
        <div className="flex-grow p-4 overflow-y-auto space-y-1.5 text-left text-emerald-400 relative">
          
          {/* Matrix waterfall rain layer */}
          {matrixActive ? (
            <MatrixRain />
          ) : (
            <>
              {history.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed font-mono">
                  {line.startsWith('suku-shell@guest') ? (
                    <span className="text-gold-accent font-bold">{line}</span>
                  ) : line.includes('VALID') || line.includes('SECURE') ? (
                    <span className="text-emerald-300 font-extrabold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </>
          )}

        </div>

        {/* Input prompt line */}
        <div className="p-3 bg-[#111] border-t border-gold-accent/20 flex items-center space-x-2 text-gold-accent">
          <ChevronRight className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={matrixActive ? "Press any key to exit matrix..." : "Type command here..."}
            className="flex-grow bg-transparent border-0 outline-none text-emerald-300 font-mono text-xs"
            disabled={false}
          />
        </div>

      </div>
    </div>
  )
}

// Falling Code Matrix Rain Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 600
    canvas.height = 360

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%+-/*='
    const fontSize = 10
    const columns = canvas.width / fontSize

    const rainDrops: number[] = []
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
  )
}

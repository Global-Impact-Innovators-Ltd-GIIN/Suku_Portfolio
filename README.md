# Suku Portfolio — Mensah Q. Suku Jr

Personal portfolio of **Mensah Q. Suku Jr** — Frontend Developer at UBWENGE LAB and
Founder & CEO of Global Impact Innovators Ltd (GIIN), Kigali, Rwanda.

Live: **https://sukuportfolio.nimdaukus.com**

## What it is

A single-page React portfolio with seven routes (Home, About, Services, Portfolio,
Skills, Certifications, Contact) plus a password-protected **Admin console**
(`/admin`) that edits the site's content, branding and theme live — no redeploy
needed for copy changes.

Highlights:

- **Dynamic theming** — HSL-based primary/secondary/background tokens, 10 colour
  presets, light/dark mode, and four visual modes (flat, neumorphic, glassmorphic,
  claymorphic), all editable from the admin console.
- **CV downloads** — one-click export of the CV as PDF, Word (.doc) or PNG,
  generated in the browser from the live profile data.
- **Content from Supabase** — profile, services, projects, certifications, metrics
  and hero copy are stored in Supabase and synced in realtime; `localStorage`
  holds a fallback copy so the site works even if the backend is unreachable.
- **Command terminal** — press `` ` `` anywhere to open the retro "Suku Console"
  (`help`, `about`, `skills`, `projects`, `audit`, `matrix`).
- **SEO-ready** — meta description, Open Graph + Twitter cards, canonical URL,
  JSON-LD `Person` schema, `robots.txt` and `sitemap.xml`.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | React 19 + TypeScript + Vite 8 |
| Styling | Tailwind CSS 4 (+ custom HSL design tokens in `src/index.css`) |
| Animation | Framer Motion |
| Routing | React Router 7 (SPA; `vercel.json` rewrites all routes to `index.html`) |
| Backend | Supabase (`src/supabaseClient.ts`) |
| CV export | jsPDF (loaded on demand) + canvas |
| Lint | Oxlint |

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # type-check (tsc) + production build into dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

Requires Node 20+.

## Deploy

The site deploys on **Vercel** from the `main` branch of
[`Global-Impact-Innovators-Ltd-GIIN/Suku_portfolio`](https://github.com/Global-Impact-Innovators-Ltd-GIIN/Suku_portfolio).
Push to `main` and Vercel builds and deploys automatically; the custom domain
`sukuportfolio.nimdaukus.com` is attached to that project.

## Project structure

```
├── public/
│   ├── profile.png          # portrait (hero + Open Graph image)
│   ├── cyber_cert_doc.png   # AFRETEC certificate image
│   ├── Mensah_Suku_CV.pdf   # static CV file
│   ├── favicon.svg          # "M" monogram favicon
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.tsx              # router, sidebar layout, top nav, footer
│   ├── main.tsx             # entry point
│   ├── index.css            # Tailwind + HSL design tokens + card styles
│   ├── supabaseClient.ts    # Supabase client (publishable key only)
│   ├── context/
│   │   └── BrandingContext.tsx   # all site content (profile, projects,
│   │                             # services, certs, metrics, hero copy),
│   │                             # theme state, Supabase sync, CV export
│   └── components/
│       ├── HeroSection.tsx  # home + pitch-deck modal
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── ServicesSection.tsx
│       ├── FeaturedProjects.tsx  # filterable project grid, showcase cards
│       ├── CertificationsAndMetrics.tsx
│       ├── ContactSection.tsx    # mailto contact form + contact details
│       ├── AdminSection.tsx      # /admin console (login + editors)
│       ├── SidebarNavigation.tsx # desktop sidebar + mobile drawer, CV export
│       ├── CommandTerminal.tsx   # retro terminal (press `)
│       ├── BackgroundGlow.tsx    # ambient mesh + floating orbs
│       └── Icons.tsx             # brand SVG icons (GitHub, LinkedIn, …)
└── vercel.json              # SPA rewrite for client-side routes
```

## Content model

All editable content lives in `src/context/BrandingContext.tsx` as `DEFAULT_*`
constants. That is the source of truth for a fresh visitor; the admin console
and Supabase can override it at runtime.

- **Projects** (`ProjectItem`): `title`, `subtitle`, `category`
  (`dev` | `cyber-net` | `venture` | `content`), `tech[]`, `iconName` (a
  lucide icon name), `mockup` (`showcase` — the typographic/icon card),
  `link` (live site or repo URL; empty hides the link action), `status`
  (`Live` | `In build` | `In formation` | `Complete` | `In progress`).
- **Certifications** (`CertItem`): `title`, `issuer`, `details`, `date`
  (empty hides the date pill), `authority`, optional `imageUrl`.
- **Metrics** (`MetricItem`): `value`, `label`, `iconName` — only use numbers
  that are real and verifiable.
- **Profile** (`ProfileDetails`): name, role, company, emails, phone, WhatsApp
  URL, social links (empty string hides the icon), location, CV path.

### Content rules

- Never invent dates, metrics, testimonials, client names, or project numbers.
  If a number is not verified, leave it out.
- Melloon is **in formation** (MELLOON LTD is not yet registered) — never call it
  registered.
- _The Sovereign Mind_ is a book **in progress** — never present it as published
  or complete.

## Admin console

Visit `/admin` and sign in with the admin email + password configured in the
console (defaults live in `BrandingContext.tsx` under `resetToDefaults` and the
login check in `AdminSection.tsx`). The console edits branding, profile,
services, projects, certifications, hero copy and security credentials, and
syncs changes to Supabase. **Change the default admin password before sharing
the site widely.**

> Note: the admin password is stored in `localStorage`/Supabase as plain text
> by the current design. It gates a content editor, not sensitive data — but
> treat it as a shared secret and rotate it if it ever leaks.
```


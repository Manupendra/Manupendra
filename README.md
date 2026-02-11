# Manupendra Tiwari — Portfolio Website

A terminal-inspired, dark-themed personal portfolio website showcasing my experience as a **DevOps & Software Engineer** with 6.5+ years in cloud infrastructure, CI/CD automation, and backend development.

**Live:** [https://manupendra.github.io/Manupendra/](https://manupendra.github.io/Manupendra/)

---

## Tech Stack

This is a **pure static website** — no frameworks, no build tools, no dependencies to install. Just three files:

| File | Purpose |
|------|---------|
| `index.html` | Semantic HTML5 — all page structure and content |
| `style.css` | Custom CSS3 — styling, animations, responsive design |
| `script.js` | Vanilla JavaScript — interactivity and effects |

### Why No Framework?

- **Zero build step** — open `index.html` in any browser and it works instantly
- **No node_modules**, no `npm install`, no webpack/vite/next.js config
- **Ultra-fast** — no JavaScript bundle to parse; the page loads in milliseconds
- **Easy to deploy** — just push to GitHub Pages, Netlify, or any static host
- **Easy to maintain** — anyone who knows basic HTML/CSS/JS can modify it

### External Resources (loaded via CDN)

| Resource | What it provides |
|----------|-----------------|
| [Google Fonts](https://fonts.google.com/) | `Inter` (body text) and `JetBrains Mono` (terminal/code font) |
| [Devicon](https://devicon.dev/) | Colored SVG icons for 30+ technologies (Kubernetes, Docker, AWS, etc.) |
| [Credly](https://www.credly.com/) | Official certification badge images (CKA, AZ-204, AZ-400) |

No JavaScript libraries (no React, no jQuery, no GSAP). All animations and interactions are hand-written.

---

## Features

### Terminal-Inspired Design
- macOS-style terminal window with red/yellow/green dots
- Command-line prompts as section headers (`$ grep -r "expertise" /var/log/career.log`)
- Monospace font for all terminal elements
- Dark-first color scheme with cyan (`#22d3ee`) accent

### Animations & Effects
- **Particle network background** — canvas-based floating dots with connecting lines in the hero section
- **Typing effect** — cycles through role titles (DevOps Engineer, Cloud Architect, etc.)
- **Scroll reveal** — elements fade up as they enter the viewport using Intersection Observer API
- **Animated counters** — stat numbers count up with cubic easing when scrolled into view
- **Expandable cards** — project cards toggle between summary and detailed bullet points
- **Shimmer badge** — golden award badge with pulsing glow and light-sweep animation
- **Hover effects** — cards lift with shadows, gradient top-borders slide in, skill tags highlight

### Sections
1. **Hero** — terminal prompt with typing animation, capability cards, particle background
2. **Impact by the Numbers** — 6 animated stat counters (years, microservices, cost reduction, etc.)
3. **Technical Skills** — 35+ technology tiles with devicon icons, expandable grid
4. **Work Experience** — timeline layout with company logos (Tata Digital, MSCI), split into DevOps & Developer roles
5. **Certifications** — CKA, CKAD, AZ-204, AZ-400 with official badge images
6. **Featured Projects** — 6 expandable cards with summary + detailed bullet points
7. **Education** — B.E. Computer Engineering details
8. **Contact** — Email, LinkedIn, GitHub cards

### Responsive Design
- **Desktop** — full 6-column skill grid, 3-column project grid, side-by-side layouts
- **Tablet** — adapts to 4/2-column grids, stacked layouts
- **Mobile** — single column, hamburger menu, optimized spacing

### Dark/Light Mode
- Defaults to dark theme (matches terminal aesthetic)
- Toggle button in navbar saves preference to `localStorage`
- Respects system preference on first visit

---

## Project Structure

```
my-portfolio-website-26/
├── index.html          # All HTML content (single page)
├── style.css           # All styles (~530 lines)
├── script.js           # All interactivity (~250 lines)
├── assets/
│   ├── tata-digital.png   # Tata Digital company logo
│   ├── msci.png           # MSCI company logo
│   └── ckad-badge.png     # CKAD certification badge
└── README.md
```

---

## How to Run Locally

No installation needed. Just:

```bash
# Option 1 — Open directly in browser
open index.html

# Option 2 — Use any local server
npx serve .
# or
python3 -m http.server 8000
```

---

## How to Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Deploy portfolio"
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

Then go to **Settings → Pages → Source: main / root** and your site will be live.

---

## How to Customize

- **Content** — Edit `index.html` directly. All text, links, and sections are in plain HTML.
- **Colors** — Modify CSS variables at the top of `style.css` (`:root` and `[data-theme="dark"]`).
- **Fonts** — Change the Google Fonts import in `index.html` `<head>`.
- **Skills** — Add/remove `<div class="skill-tile">` blocks. Use [devicon.dev](https://devicon.dev/) to find icon class names.
- **Projects** — Add/remove `.project-card` blocks. Each has a summary and expandable detail section.

---

## License

This project is open source and available for personal use and inspiration.

---

Built with HTML, CSS, and JavaScript.

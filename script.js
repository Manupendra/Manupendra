/* ============================================
   PORTFOLIO — Manupendra Tiwari
   Terminal-Inspired Interactions
   ============================================ */

// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}
// Default is dark (set in HTML), only override if user previously chose light

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// --- Navbar shadow on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow)' : 'none';
});

// --- Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
revealElements.forEach((el) => revealObserver.observe(el));

// --- Animated Counter ---
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        animateCount(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach((el) => counterObserver.observe(el));

function animateCount(el, target, suffix) {
  const duration = 1800;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(update);
}

// --- Terminal Typed Effect ---
const typedElement = document.getElementById('typed');
const roles = [
  'DevOps & Software Engineer',
  'Cloud Platform Architect',
  'Kubernetes Expert (CKA/CKAD)',
  'CI/CD Pipeline Specialist',
  'Infrastructure as Code Engineer',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 60;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typingSpeed = 30;
  } else {
    charIndex++;
    typingSpeed = 60;
  }
  typedElement.textContent = currentRole.substring(0, charIndex);
  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 300;
  }
  setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 600);

// --- Project Card Expand/Collapse ---
document.querySelectorAll('.project-expand-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const isExpanded = card.classList.toggle('expanded');
    btn.querySelector('span').textContent = isExpanded ? 'Show Less' : 'Read More';
  });
});

// --- Skills Expand/Collapse ---
const skillsToggle = document.getElementById('skillsToggle');
const skillsGrid = document.getElementById('skillsGrid');
skillsToggle.addEventListener('click', () => {
  const isExpanded = skillsGrid.classList.toggle('expanded');
  skillsToggle.classList.toggle('active');
  skillsToggle.querySelector('span').textContent = isExpanded ? 'Show Less' : 'Show More';
});

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Active nav link ---
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.25, rootMargin: '-64px 0px 0px 0px' }
);
sections.forEach((section) => activeObserver.observe(section));

// --- Animated Code Typer (IDE) ---
(function initCodeTyper() {
  const codeEl = document.getElementById('ideCode');
  const gutterEl = document.getElementById('ideGutter');
  const sbLang = document.getElementById('sbLang');
  const sbPos = document.getElementById('sbPos');
  const tabs = document.querySelectorAll('.ide-tab');
  const showcase = document.querySelector('.code-showcase');
  if (!codeEl || !showcase) return;

  const snippets = [
    {
      lang: 'HCL',
      code:
`resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-prod-cluster"
  location            = var.location
  resource_group_name = var.rg_name
  dns_prefix          = "aks-prod"

  default_node_pool {
    name       = "system"
    node_count = 3
    vm_size    = "Standard_D4s_v3"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "production"
    managed_by  = "terraform"
  }
}`
    },
    {
      lang: 'YAML',
      code:
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
  labels:
    app: payment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment
    spec:
      containers:
        - name: payment
          image: acr.io/payment:v1.4.2
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: 8080`
    },
    {
      lang: 'Dockerfile',
      code:
`# Multi-stage build for Java microservice
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /build
COPY . .
RUN ./gradlew clean bootJar

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /build/app/build/libs/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]`
    },
    {
      lang: 'YAML',
      code:
`trigger:
  branches:
    include: [ main, release/* ]

pool:
  vmImage: ubuntu-latest

stages:
  - stage: Build
    jobs:
      - job: BuildAndPush
        steps:
          - task: Docker@2
            inputs:
              command: buildAndPush
              repository: $(ACR)/payment
              tags: $(Build.BuildId)

  - stage: Deploy
    jobs:
      - deployment: DeployToAKS
        environment: production
        strategy:
          runOnce:
            deploy:
              steps:
                - task: HelmDeploy@0
                  inputs:
                    command: upgrade
                    chartPath: charts/payment`
    }
  ];

  const KW = {
    HCL: /\b(resource|variable|provider|module|output|data|locals|terraform|for_each|count|depends_on)\b/g,
    YAML: /\b(true|false|null|yes|no|on|off)\b/g,
    Dockerfile: /^(FROM|RUN|COPY|ADD|WORKDIR|EXPOSE|ENV|CMD|ENTRYPOINT|HEALTHCHECK|VOLUME|LABEL|ARG|USER|AS)\b/gm
  };

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlight(text, lang) {
    let s = escapeHtml(text);
    const S = '\u0000', E = '\u0001';
    // Comments first (# to end of line) — won't conflict with quote content
    s = s.replace(/(#[^\n]*)/g, S + 'C$1' + E);
    // Strings (double + single)
    s = s.replace(/("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/g, S + 'S$1' + E);
    // Language-specific keywords
    if (KW[lang]) s = s.replace(KW[lang], S + 'K$1' + E);
    // YAML attributes (key before colon)
    if (lang === 'YAML') {
      s = s.replace(/^(\s*-?\s*)([A-Za-z_][\w-]*)(\s*:)/gm, '$1' + S + 'A$2' + E + '$3');
    }
    // Numbers
    s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, S + 'N$1' + E);
    // Variables ($() and var.x)
    s = s.replace(/(\$\([^)]+\)|\bvar\.[a-zA-Z_][\w.]*)/g, S + 'V$1' + E);

    // Tokens -> spans
    s = s
      .replace(/\u0000K([^\u0001]*)\u0001/g, '<span class="hl-kw">$1</span>')
      .replace(/\u0000S([^\u0001]*)\u0001/g, '<span class="hl-str">$1</span>')
      .replace(/\u0000N([^\u0001]*)\u0001/g, '<span class="hl-num">$1</span>')
      .replace(/\u0000C([^\u0001]*)\u0001/g, '<span class="hl-com">$1</span>')
      .replace(/\u0000A([^\u0001]*)\u0001/g, '<span class="hl-attr">$1</span>')
      .replace(/\u0000V([^\u0001]*)\u0001/g, '<span class="hl-attr">$1</span>');
    return s;
  }

  let snippetIdx = 0;
  let charIdx = 0;
  let timer = null;
  let started = false;

  function setActiveTab(idx) {
    tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
  }

  function render() {
    const s = snippets[snippetIdx];
    const visible = s.code.slice(0, charIdx);
    codeEl.innerHTML = highlight(visible, s.lang) + '<span class="ide-caret"></span>';
    const lineCount = Math.max(visible.split('\n').length, 1);
    let gutter = '';
    for (let i = 1; i <= lineCount; i++) gutter += (i === 1 ? '' : '\n') + i;
    gutterEl.textContent = gutter;
    const lines = visible.split('\n');
    if (sbLang) sbLang.textContent = s.lang;
    if (sbPos) sbPos.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
  }

  function type() {
    const s = snippets[snippetIdx];
    if (charIdx < s.code.length) {
      charIdx++;
      render();
      const last = s.code[charIdx - 1];
      let delay = 14 + Math.random() * 28;
      if (last === '\n') delay = 55 + Math.random() * 40;
      else if (last === ' ' && Math.random() > 0.8) delay = 45;
      timer = setTimeout(type, delay);
    } else {
      timer = setTimeout(nextSnippet, 2600);
    }
  }

  function nextSnippet() {
    snippetIdx = (snippetIdx + 1) % snippets.length;
    charIdx = 0;
    setActiveTab(snippetIdx);
    render();
    timer = setTimeout(type, 280);
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      if (timer) clearTimeout(timer);
      snippetIdx = i;
      charIdx = 0;
      setActiveTab(i);
      render();
      timer = setTimeout(type, 260);
    });
  });

  // Start when section scrolls into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !started) {
        started = true;
        render();
        type();
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });
  io.observe(showcase);

  // Reduced motion: show the first snippet statically
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    started = true;
    charIdx = snippets[0].code.length;
    render();
    io.disconnect();
  }
})();

// --- Scroll Progress Bar ---
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// --- Headline Glitch on First Reveal ---
(function initHeadlineGlitch() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;
  const trigger = () => {
    headline.classList.add('glitched');
    setTimeout(() => headline.classList.remove('glitched'), 1400);
  };
  setTimeout(trigger, 700);
})();

// --- 3D Magnetic Tilt on Cards ---
(function initCardTilt() {
  const cards = document.querySelectorAll('.cap-card, .project-card, .cert-card, .contact-card');
  const isTouch = window.matchMedia('(hover: none)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return;

  cards.forEach((card) => {
    let rafId = null;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 7;
      const rotX = ((y - cy) / cy) * -7;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale(1.01)`;
      });
    };
    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = '';
      card.classList.remove('tilting');
    };
    const onEnter = () => card.classList.add('tilting');
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
})();

// --- Matrix Digital Rain Background ---
(function initMatrixRain() {
  const container = document.getElementById('particles');
  if (!container) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-rain-canvas';
  const ctx = canvas.getContext('2d');
  container.insertBefore(canvas, container.firstChild);

  const glyphs = '01$<>{}[]|/\\#*+=~_-:;?!&%@^abcdef0123456789';
  const fontSize = 14;
  let width, height, columns, drops, speeds;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = container.offsetWidth;
    height = container.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(0).map(() => Math.random() * -40);
    speeds = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.5);
  }

  let lastFrame = 0;
  function draw(now) {
    if (now - lastFrame < 55) { // throttle to ~18fps — feels right for rain
      requestAnimationFrame(draw);
      return;
    }
    lastFrame = now;

    const isDark = root.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(10, 10, 20, 0.12)' : 'rgba(250, 250, 250, 0.14)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    const headColor = isDark ? 'rgba(190, 255, 250, 0.95)' : 'rgba(60, 50, 180, 0.55)';
    const trailColor = isDark ? 'rgba(34, 211, 238, 0.55)' : 'rgba(79, 70, 229, 0.3)';

    for (let i = 0; i < drops.length; i++) {
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = headColor;
      ctx.fillText(char, x, y);

      ctx.fillStyle = trailColor;
      const prev = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillText(prev, x, y - fontSize);

      if (y > height && Math.random() > 0.965) {
        drops[i] = -2;
        speeds[i] = 0.3 + Math.random() * 0.5;
      }
      drops[i] += speeds[i];
    }
    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
})();

// --- Floating Particles Background ---
(function initParticles() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('particles');
  if (!container) return;
  container.appendChild(canvas);

  let width, height, particles;
  const PARTICLE_COUNT = 50;
  const MAX_DIST = 120;

  function resize() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const isDark = root.getAttribute('data-theme') === 'dark';
    const dotColor = isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(79, 70, 229, 0.25)';
    const lineColor = isDark ? 'rgba(34, 211, 238, 0.07)' : 'rgba(79, 70, 229, 0.05)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

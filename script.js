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

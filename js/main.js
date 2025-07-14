// main.js — Enhanced Portfolio Interaction Script

// Highlight active nav link on click
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Scroll-based nav highlighting
const sections = document.querySelectorAll('section');
const navMap = {};
sections.forEach(sec => {
  navMap[sec.id] = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = navMap[sec.id];
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// Scroll reveal using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => observer.observe(section));
});

// Typing animation in hero section
const typedText = document.querySelector('.tagline');
const words = [
  "Full-Stack Java Developer",
  "Spring Boot & MySQL Enthusiast",
  "Creative Problem Solver",
  "Frontend & Backend Developer"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typedText) return;
  const current = words[wordIndex];
  const displayed = current.substring(0, charIndex);
  typedText.textContent = displayed;

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1500));

// Contact form (disabled for now)
const contactButton = document.querySelector('.contact-form button');
if (contactButton) {
  contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Form submission coming soon!');
  });
}

// Resume download confirmation
const resumeBtn = document.querySelector('a.download');
if (resumeBtn) {
  resumeBtn.addEventListener('click', () => {
    alert('Your resume will start downloading shortly.');
  });
}

// ==================== NAVIGATION ==================== 

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links and sections
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Get section id and show it
      const sectionId = link.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      
      if (section) {
        section.classList.add('active');
        
        // Scroll to top of main content
        document.querySelector('.main-content').scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });

  // Set initial active section
  document.getElementById('home').classList.add('active');
});

// ==================== SCROLL ANIMATIONS ==================== 

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe skill bars and project cards
document.querySelectorAll('.skill-bar, .project-card, .cert-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ==================== PROGRESS BARS ANIMATION ==================== 

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.progress');
      if (progressBar && !progressBar.classList.contains('animated')) {
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        progressBar.classList.add('animated');
        
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar').forEach(bar => {
  progressObserver.observe(bar);
});

// ==================== FORM SUBMISSION ==================== 

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    
    // Show success message (in real app, send to server)
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = '✓ Mensaje enviado';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
      contactForm.reset();
      button.textContent = originalText;
      button.style.background = '';
    }, 3000);
  });
}

// ==================== KPI COUNTER ANIMATION ==================== 

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  
  const counter = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      element.textContent = prefix + target.toLocaleString();
      clearInterval(counter);
    } else {
      element.textContent = prefix + Math.floor(current).toLocaleString();
    }
  }, 50);
}

// Observe KPI cards
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const valueElement = entry.target.querySelector('.kpi-value');
      const text = valueElement.textContent;
      const number = parseInt(text.replace(/[^0-9]/g, ''));
      const prefix = text.trim().startsWith('+') ? '+' : '';
      
      entry.target.classList.add('counted');
      animateCounter(valueElement, number);
      
      kpiObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.kpi-card').forEach(card => {
  kpiObserver.observe(card);
});

// ==================== SMOOTH SCROLL TO SECTIONS ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only handle section links
    if (document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      const nav = document.querySelector('.nav-link[data-section="' + href.substring(1) + '"]');
      
      if (nav) {
        nav.click();
      }
    }
  });
});

// ==================== RESPONSIVE SIDEBAR ==================== 

let sidebarOpen = false;

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebarOpen = !sidebarOpen;
  
  if (sidebarOpen) {
    sidebar.style.transform = 'translateX(0)';
  } else {
    sidebar.style.transform = 'translateX(-100%)';
  }
}

// NOTE: mantén el menú visible en móvil/tablet al cambiar de sección.

// ==================== HOVER EFFECTS ==================== 

document.querySelectorAll('.project-card, .skill-group, .cert-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});
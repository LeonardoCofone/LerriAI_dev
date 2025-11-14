// Animazione fade-in per le feature cards allo scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 800,
                delay: index * 100,
                easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva tutte le feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Osserva tutti i benefit items
document.querySelectorAll('.benefit-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Animazione per i workflow steps
document.querySelectorAll('.workflow-step').forEach((step, index) => {
    step.style.opacity = '0';
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateX: [index % 2 === 0 ? -50 : 50, 0],
                    duration: 1000,
                    delay: index * 200,
                    easing: 'easeOutExpo'
                });
                stepObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stepObserver.observe(step);
});

// Animazione per lo step number (pulsazione)
anime({
    targets: '.step-number',
    scale: [
        { value: 1, duration: 1000 },
        { value: 1.1, duration: 1000 },
        { value: 1, duration: 1000 }
    ],
    loop: true,
    easing: 'easeInOutQuad'
});

// Smooth scroll per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Altezza della navbar
            const targetPosition = target.offsetTop - offset;
            
            anime({
                targets: 'html, body',
                scrollTop: targetPosition,
                duration: 800,
                easing: 'easeInOutQuad'
            });
        }
    });
});

// Effetto parallax leggero per l'hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    floatingCards.forEach((card, index) => {
        const speed = 0.3 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animazione per il pricing card quando entra in viewport
const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    pricingCard.style.opacity = '0';
    pricingCard.style.transform = 'scale(0.9)';
    
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
                pricingObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    pricingObserver.observe(pricingCard);
}

// Animazione hover per i feature icons
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        anime({
            targets: icon,
            scale: [1, 1.2],
            rotate: [0, 10],
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        anime({
            targets: icon,
            scale: [1.2, 1],
            rotate: [10, 0],
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

// Gestione form CTA
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = ctaForm.querySelector('button');
        const originalText = button.textContent;
        
        // Animazione del bottone
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
        
        button.textContent = '✓ Richiesta inviata!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animazione contatori (se vuoi aggiungere statistiche animate)
function animateCounter(element, target, duration = 2000) {
    anime({
        targets: element,
        innerHTML: [0, target],
        round: 1,
        duration: duration,
        easing: 'easeOutExpo'
    });
}

// Particle effect leggero per l'hero (opzionale)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        hero.appendChild(particle);
        
        anime({
            targets: particle,
            translateY: [0, -100 - Math.random() * 100],
            translateX: [0, (Math.random() - 0.5) * 100],
            opacity: [0.3, 0],
            duration: 3000 + Math.random() * 2000,
            loop: true,
            delay: Math.random() * 2000,
            easing: 'linear'
        });
    }
}


async function registerUser(email, preferred_name) {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, preferred_name })
    });
    const data = await response.json();
    console.log('Utente registrato:', data);
  } catch (err) {
    console.error('Errore registrazione:', err);
  }
}


const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        const preferred_name = document.getElementById('nameInput').value;

        try {
            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, preferred_name })
            });
            const data = await res.json();
            console.log('Utente registrato:', data);
            alert(`Benvenuto, ${data.preferred_name}!`);
        } catch(err) {
            console.error('Errore registrazione:', err);
            alert('Errore nella registrazione');
        }
    });
}
if (window.innerWidth > 768) {
    createParticles();
}
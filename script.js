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
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.8)';
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    }
});


async function registerUser(email, preferred_name) {
  try {
    const response = await fetch('https://api.lerriai.com/api/register', {
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
            const res = await fetch('https://api.lerriai.com/api/register', {
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

        // Smooth scroll per link con hash (es. Get Started -> #pricing)
        document.querySelectorAll('a[href*="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                try {
                    const url = new URL(this.href, location.href);
                    if ((url.pathname === location.pathname || url.pathname === '' || url.pathname === '/') && url.hash) {
                        const target = document.querySelector(url.hash);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            if (history.pushState) history.pushState(null, '', url.hash);
                        }
                    }
                } catch (err) {
                    // fallback: nulla
                }
            });
        });
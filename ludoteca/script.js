document.addEventListener('DOMContentLoaded', () => {
  // Page load initialisation
  document.documentElement.classList.add('js');

  const desiredDateInput = document.getElementById('event-date');
  const checkoutForm = document.getElementById('cro-checkout-form');
  const bookingFormBox = document.getElementById('booking-form-box');
  const successBox = document.getElementById('checkout-success-box');
  const btnSubmit = document.getElementById('btn-checkout-submit');
  const persistentBar = document.getElementById('persistent-sticky-bar');
  const slidesContainer = document.querySelector('.homepage-slides-container');
  const slides = document.querySelectorAll('.section-slide');

  let isPopped = false;

  // Set minimum date for booking input to today
  if (desiredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    desiredDateInput.setAttribute('min', today);
  }

  // ==========================================================================
  // SCROLL DETECTION FOR STICKY BOTTOM BAR (ALWAYS AVAILABLE)
  // ==========================================================================
  if (persistentBar) {
    if (slidesContainer) {
      slidesContainer.addEventListener('scroll', () => {
        if (slidesContainer.scrollTop > 80) {
          persistentBar.classList.add('visible');
        } else {
          persistentBar.classList.remove('visible');
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          persistentBar.classList.add('visible');
        } else {
          persistentBar.classList.remove('visible');
        }
      });
      if (window.scrollY > 80) {
        persistentBar.classList.add('visible');
      }
    }
  }

  // ==========================================================================
  // SYNTH SOUND EFFECTS (WEB AUDIO API GENERATORS)
  // ==========================================================================
  function playSuccessSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15); // C6
      
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Success audio chime not playable:", e);
    }
  }

  function playSoftHoverSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // high clean chime
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }


  // ==========================================================================
  // STARDUST PHYSICS CURSOR STAR TRAILS ENGINE
  // ==========================================================================
  const gravity = 0.15;
  const friction = 0.98;

  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.45) return; // Limit frequency for performance
    createPhysicsSparkle(e.clientX, e.clientY);
  });

  function createPhysicsSparkle(x, y) {
    if (isPopped) return;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('cursor-sparkle');
    
    const colors = ['#F06292', '#FFCA28', '#00BFA5', '#FFF9C4'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = chosenColor;
    sparkle.style.color = chosenColor;
    
    // Position incorporating scroll
    let pX = x + window.scrollX;
    let pY = y + window.scrollY;
    sparkle.style.left = `${pX}px`;
    sparkle.style.top = `${pY}px`;
    
    const size = Math.random() * 8 + 6;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    document.body.appendChild(sparkle);
    
    // Initial physical velocities
    let vx = (Math.random() * 2 - 1) * 3;
    let vy = (Math.random() * 2 - 1) * 3 - 2; // initial boost upward
    let life = 1.0;
    const decay = Math.random() * 0.03 + 0.02;

    function animateParticle() {
      life -= decay;
      if (life <= 0) {
        sparkle.remove();
        return;
      }
      
      // Apply physical forces
      vy += gravity;
      vx *= friction;
      vy *= friction;
      
      pX += vx;
      pY += vy;
      
      sparkle.style.left = `${pX}px`;
      sparkle.style.top = `${pY}px`;
      sparkle.style.transform = `translate(-50%, -50%) scale(${life})`;
      sparkle.style.opacity = life;
      
      requestAnimationFrame(animateParticle);
    }
    
    requestAnimationFrame(animateParticle);
  }

  // ==========================================================================
  // TONY STARK 3D CARD TILT & REFLECTION GLARE ENGINE (WITH 3D CANS)
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.adventure-card, .steam-card, .caffetteria-card, .character-showcase');
  
  tiltCards.forEach((card) => {
    // Add specular glare overlay
    let glare = card.querySelector('.storybook-glare, .can-glare, .character-glow');
    if (!glare) {
      glare = document.createElement('div');
      glare.classList.add('storybook-glare');
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // X coordinate inside card
      const y = e.clientY - rect.top;  // Y coordinate inside card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate 3D angles (increased tilt effect for cans)
      const maxTilt = card.classList.contains('can-3d') ? 16 : 12;
      const rotateX = ((centerY - y) / centerY) * maxTilt; 
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      // Apply 3D matrix-like rotation
      const translateY = card.classList.contains('can-3d') ? '-10px' : '-5px';
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY})`;
      
      // Relocate olographic glare refraction spot
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      // Restore natural posture
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
      glare.style.opacity = '0';
    });
    
    card.addEventListener('mouseenter', () => {
      playSoftHoverSound();
    });
  });

  // ==========================================================================
  // PARALLAX WATERMARK TYPOGRAPHY ENGINE (RED BULL STYLE DEPT)
  // ==========================================================================
  const parallaxSlides = document.querySelectorAll('.section-slide');
  parallaxSlides.forEach(slide => {
    const bgWord = slide.querySelector('.slide-bg-word');
    if (bgWord) {
      slide.addEventListener('mousemove', (e) => {
        const rect = slide.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Shift text in opposite direction of mouse
        const moveX = (x - rect.width / 2) / rect.width * -28;
        const moveY = (y - rect.height / 2) / rect.height * -20;
        bgWord.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1.04)`;
      });
      slide.addEventListener('mouseleave', () => {
        bgWord.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    }
  });

  // ==========================================================================
  // INTERSECTION OBSERVER FOR 3D ZOOM DECK & ACTIVE SLIDES
  // ==========================================================================
  if (slides.length > 0) {
    const observerOptions = {
      root: slidesContainer || null,
      threshold: 0.35
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active state from others
          slides.forEach(s => {
            if (s !== entry.target) s.classList.remove('active');
          });
          
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    slides.forEach((slide) => {
      observer.observe(slide);
    });

    // Load first slide active state
    if (slides[0]) {
      setTimeout(() => {
        slides[0].classList.add('active');
      }, 300);
    }
  }

  // ==========================================================================
  // CONFETTI CIRCULAR BURST GENERATOR (CRO SUCCESS CELEBRATION)
  // ==========================================================================
  function createConfettiBurst(x, y, count) {
    const colors = ['#F06292', '#FFCA28', '#00BFA5', '#FFF9C4', '#FFFDF9'];
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-particle');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 160 + 60;
      confetti.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
      confetti.style.setProperty('--ty', `${Math.sin(angle) * velocity + 40}px`);
      confetti.style.setProperty('--rot', `${Math.random() * 360 + 180}deg`);

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 800);
    }
  }

  // ==========================================================================
  // CRM PAYLOAD SIMULATOR & CRO FORM SUBMIT
  // ==========================================================================
  if (checkoutForm && bookingFormBox && successBox) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const parentName = document.getElementById('parent-name').value;
      const parentPhone = document.getElementById('parent-phone').value;
      const eventDate = document.getElementById('event-date').value;

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Registrazione in corso...";
      }

      const crmPayload = {
        lead_source: "Ludoteca Landing Multi-Page CRO",
        parent_name: parentName,
        parent_phone: parentPhone,
        desired_date: eventDate,
        form_submitted_at: new Date().toISOString()
      };

      console.log("[CRM Integration Simulator] Lead Payload dispatched successfully to ChildcareCRM:", crmPayload);

      setTimeout(() => {
        isPopped = true;
        playSuccessSound();
        
        bookingFormBox.style.display = 'none';
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        createConfettiBurst(window.innerWidth / 2 + window.scrollX, window.innerHeight / 2 + window.scrollY, 140);
      }, 1100);
    });
  }
});

 // Create animated background
 function createAnimatedBackground() {
  const bg = document.getElementById('animatedBg');
  
  // Create floating particles
  for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      bg.appendChild(particle);
  }
  
  // Create moving lines
  for (let i = 0; i < 10; i++) {
      const line = document.createElement('div');
      line.className = 'bg-line';
      line.style.top = Math.random() * 100 + '%';
      line.style.width = Math.random() * 200 + 100 + 'px';
      line.style.animationDelay = Math.random() * 15 + 's';
      bg.appendChild(line);
  }
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
          if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
          } else {
              counter.textContent = target;
          }
      };
      
      updateCounter();
  });
}

// Typing animation for code window
function enhanceCodeAnimation() {
  const codeLines = document.querySelectorAll('.code-line');
  codeLines.forEach((line, index) => {
      const text = line.textContent;
      line.textContent = '';
      
      setTimeout(() => {
          let charIndex = 0;
          const typeInterval = setInterval(() => {
              if (charIndex < text.length) {
                  line.textContent += text[charIndex];
                  charIndex++;
              } else {
                  clearInterval(typeInterval);
              }
          }, 50);
      }, 1000 + (index * 500));
  });
}

// Text reveal animation on scroll
function createTextReveal() {
  const textElements = document.querySelectorAll('.hero-description, .contact-description');
  
  textElements.forEach(element => {
      const words = element.textContent.split(' ');
      element.innerHTML = words.map(word => `<span style="opacity: 0; display: inline-block; transform: translateY(20px);">${word}</span>`).join(' ');
      
      const wordSpans = element.querySelectorAll('span');
      
      const revealObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  wordSpans.forEach((word, index) => {
                      setTimeout(() => {
                          word.style.opacity = '1';
                          word.style.transform = 'translateY(0)';
                          word.style.transition = 'all 0.3s ease';
                      }, index * 50);
                  });
              }
          });
      });
      
      revealObserver.observe(element);
  });
}

// Wrap all DOM manipulations in DOMContentLoaded

document.addEventListener('DOMContentLoaded', function() {
    // Create animated background
    createAnimatedBackground();
    enhanceCodeAnimation();
    createTextReveal();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle if href is not just '#'
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for enhanced animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
                // Add staggered animation for skill tags
                if (entry.target.classList.contains('skill-category')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .stats, .contact-title, .contact-description').forEach(el => {
        observer.observe(el);
    });

    // Skill tag hover effects
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.3)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // CTA button ripple effect
    document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation style only once
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes ripple {
              to {
                  transform: scale(2);
                  opacity: 0;
              }
          }
        `;
        document.head.appendChild(style);
    }

    // Mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        // Subtle parallax for hero content
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            const x = (mouseX - 0.5) * 10;
            const y = (mouseY - 0.5) * 10;
            heroText.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Scroll-triggered animations
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        // Parallax backgrounds
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const speed = 0.5 + (index * 0.1);
            section.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });

    // Enhanced header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.scrollY;
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
                header.style.boxShadow = 'none';
            }
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        if (hero && heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Emoji functionality: show tooltip and animate on click
    const emojiConfigs = [
        { selector: '.emoji-top-left', message: 'Stay positive!' },
        { selector: '.emoji-top-right', message: 'Wink! You got this!' },
        { selector: '.emoji-bottom-left', message: 'Cool vibes only 😎' },
        { selector: '.emoji-bottom-right', message: 'Surprised? Expect the unexpected!' }
    ];
    emojiConfigs.forEach(cfg => {
        const emoji = document.querySelector(cfg.selector);
        if (emoji) {
            emoji.addEventListener('click', function(e) {
                // Animate
                emoji.style.transition = 'transform 0.3s';
                emoji.style.transform = 'scale(1.25) rotate(-12deg)';
                setTimeout(() => {
                    emoji.style.transform = '';
                }, 400);
                // Tooltip
                let tooltip = document.createElement('div');
                tooltip.textContent = cfg.message;
                tooltip.className = 'emoji-tooltip';
                document.body.appendChild(tooltip);
                const rect = emoji.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
                tooltip.style.top = (rect.top - 36) + 'px';
                setTimeout(() => {
                    tooltip.remove();
                }, 1500);
            });
        }
    });
});

// Counter animation and other functions remain outside DOMContentLoaded as they are called inside it
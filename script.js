// Initialize EmailJS when available
if (typeof emailjs !== 'undefined') {
    (function() {
        emailjs.init("yQ-tQM07Gi7DWxUZr"); // Replace with your EmailJS user ID if needed
    })();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add noise texture overlay for visual effect
    const noiseOverlay = document.createElement('div');
    noiseOverlay.className = 'noise-overlay';
    document.body.appendChild(noiseOverlay);
    
    // Configure particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00eeff', '#be2edd', '#00ff9d']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00eeff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Add fade-in animation to sections when loaded
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, 300 + (index * 100));
    });
    
    // Mobile Menu Toggle with improved handling
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent background scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});

// Navbar Scroll Effect
const header = document.querySelector('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (backToTop) backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        if (backToTop) backToTop.classList.remove('active');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = ['Web Developer', 'Discord Bot Specialist', 'API Integration Expert', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start the typewriter effect
setTimeout(typeWriter, 1000);

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(-10px)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Testimonial Slider
const testimonialContainer = document.querySelector('.testimonial-container');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonialContainer) return;
    
    testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Initialize testimonial controls
if (prevBtn && nextBtn) {
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % dots.length;
        showTestimonial(currentTestimonial);
    });
    
    // Prev button click
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + dots.length) % dots.length;
        showTestimonial(currentTestimonial);
    });
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials every 6 seconds
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % dots.length;
        showTestimonial(currentTestimonial);
    }, 6000);
    
    // Pause auto-slide on hover
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        // Resume auto-slide after hover
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % dots.length;
                showTestimonial(currentTestimonial);
            }, 6000);
        });
    }
}

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send('service_ewk7b4d', 'template_b9uknl1', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.style.display = 'none');
                submitBtn.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon!</p>
                    <button class="btn primary-btn mt-3" id="sendAnother">Send Another Message</button>
                `;
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Add event listener to "Send Another Message" button
                document.getElementById('sendAnother').addEventListener('click', () => {
                    successMessage.remove();
                    formGroups.forEach(group => group.style.display = 'block');
                    submitBtn.style.display = 'inline-block';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                alert('Sorry, there was an error sending your message. Please try again later.');
            });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
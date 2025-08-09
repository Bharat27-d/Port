document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Reset any existing handlers
    const newMobileMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);
    
    // Set up the menu toggle
    newMobileMenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent background scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            newMobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !newMobileMenu.contains(e.target)) {
            newMobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Update login badge with current date and time
    const loginBadge = document.createElement('div');
    loginBadge.className = 'login-badge';
    loginBadge.innerHTML = `Welcome back, <span>Bharat27-d</span> <span class="login-time">2025-08-09 06:28:45</span>`;
    document.body.appendChild(loginBadge);
    
    // Adjust for screen orientation changes
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            newMobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});
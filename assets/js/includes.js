function loadHTML(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Error loading file:', error));
}

// Detect current page and set active nav link
function setActiveNavLink() {
    const currentPage = window.location.pathname.toLowerCase();
    let activeClass = null;
    
    // Determine which page we're on
    if (currentPage.includes('about') || currentPage.includes('about%20us')) {
        activeClass = 'nav-about';
    } else if (currentPage.includes('company') || currentPage.includes('overview')) {
        activeClass = 'nav-company';
    } else if (currentPage.includes('business')) {
        activeClass = 'nav-business';
    } else if (currentPage.includes('brands')) {
        activeClass = 'nav-brands';
    } else if (currentPage.includes('vision') || currentPage.includes('mission')) {
        activeClass = 'nav-vision';
    } else if (currentPage.includes('contact')) {
        activeClass = 'nav-contact';
    } else {
        activeClass = 'nav-home';
    }
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const inMobileMenu = !!link.closest('#mobile-menu');

        // Remove all active-related classes
        link.classList.remove('active', 'text-brand-primary', 'font-bold', 'border-b-2', 'border-brand-primary');
        // Reset cross-state text classes so mobile menu stays dark text
        link.classList.remove('text-white', 'hover:text-blue-200', 'text-slate-600', 'hover:text-brand-primary');
        if (inMobileMenu) {
            link.classList.remove('text-slate-600', 'hover:text-brand-primary');
            link.classList.add('text-slate-700', 'hover:text-brand-primary');
        }
        
        // Check if this link matches the current page
        if (link.classList.contains(activeClass)) {
            // Add active styling
            link.classList.add('active', 'text-brand-primary', 'font-bold');
            
            // Handle transparent navbar hover states
            if (!document.body.classList.contains('solid-navbar')) {
                // Will be reapplied on scroll if needed
            }
        } else {
            // Non-active link styling depends on navbar type
            if (inMobileMenu) {
                link.classList.add('text-slate-700', 'hover:text-brand-primary');
            } else if (document.body.classList.contains('solid-navbar')) {
                link.classList.add('text-slate-600', 'hover:text-brand-primary');
            } else {
                link.classList.add('text-white', 'hover:text-blue-200');
            }
        }
    });
}

// Initialize navbar scroll and mobile menu functionality
function initializeNavbar() {
    // Set active nav link
    setActiveNavLink();
    
    // Mobile menu toggle
    window.toggleMenu = function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    };
    
    // Mobile dropdown toggle
    window.toggleMobileDropdown = function() {
        const dropdown = document.getElementById('mobile-dropdown');
        const icon = document.getElementById('mobile-dropdown-icon');
        if (dropdown && icon) {
            dropdown.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    };

    // Navbar scroll effect (only for transparent navbar on home page)
    if (!document.body.classList.contains('solid-navbar')) {
        window.addEventListener('scroll', function() {
            const nav = document.getElementById('main-nav');
            const logoText = document.getElementById('logo-text');
            const navLinks = document.querySelectorAll('.nav-link');
            const menuBtn = document.getElementById('mobile-toggle-btn');

            if (window.scrollY > 50) {
                nav.classList.remove('bg-transparent', 'py-4');
                nav.classList.add('bg-white', 'shadow-md', 'border-b', 'border-slate-200', 'py-2');
                
                if (logoText) {
                    logoText.classList.remove('text-white');
                    logoText.classList.add('text-brand-dark');
                }
                
                navLinks.forEach(link => {
                    const inMobileMenu = !!link.closest('#mobile-menu');
                    // Only change non-active links on scroll
                    if (!link.classList.contains('active')) {
                        if (inMobileMenu) {
                            link.classList.remove('text-white', 'hover:text-blue-200');
                            link.classList.add('text-slate-700', 'hover:text-brand-primary');
                        } else {
                            link.classList.remove('text-white', 'hover:text-blue-200');
                            link.classList.add('text-slate-600', 'hover:text-brand-primary');
                        }
                    }
                });
                
                if (menuBtn) {
                    menuBtn.classList.remove('text-white');
                    menuBtn.classList.add('text-slate-600');
                }
            } else {
                nav.classList.remove('bg-white', 'shadow-md', 'border-b', 'border-slate-200', 'py-2');
                nav.classList.add('bg-transparent', 'py-4');
                
                if (logoText) {
                    logoText.classList.remove('text-brand-dark');
                    logoText.classList.add('text-white');
                }
                
                navLinks.forEach(link => {
                    const inMobileMenu = !!link.closest('#mobile-menu');
                    // Only change non-active links on scroll
                    if (!link.classList.contains('active')) {
                        if (inMobileMenu) {
                            link.classList.remove('text-white', 'hover:text-blue-200');
                            link.classList.add('text-slate-700', 'hover:text-brand-primary');
                        } else {
                            link.classList.remove('text-slate-600', 'hover:text-brand-primary');
                            link.classList.add('text-white', 'hover:text-blue-200');
                        }
                    }
                });
                
                if (menuBtn) {
                    menuBtn.classList.remove('text-slate-600');
                    menuBtn.classList.add('text-white');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let loadCount = 0;
    const totalLoads = 2; // navbar + footer
    
    function checkComplete() {
        loadCount++;
        if (loadCount === totalLoads) {
            initializeNavbar();
        }
    }
    
    if (document.getElementById('navbar-placeholder')) {
        const navbarFile = document.body.classList.contains('solid-navbar') 
            ? 'includes/navbar-solid.html' 
            : 'includes/navbar.html';
        loadHTML('navbar-placeholder', navbarFile, checkComplete);
    } else {
        checkComplete();
    }
    
    if (document.getElementById('footer-placeholder')) {
        loadHTML('footer-placeholder', 'includes/footer.html', checkComplete);
    } else {
        checkComplete();
    }
    
    // Handle smooth page transitions on link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        // Check if link is internal navigation (not login or external links)
        if (link && link.href && !link.href.includes('#') && !link.href.endsWith('login') && link.href.includes('.html')) {
            // Check if it's a different page
            const currentPage = window.location.pathname;
            const targetPage = new URL(link.href, window.location.origin).pathname;
            
            if (currentPage !== targetPage) {
                e.preventDefault();
                
                // Fade out current page
                document.documentElement.classList.add('fade-out');
                
                // Navigate after fade completes
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        }
    });
});

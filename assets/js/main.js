// Make functions globally accessible
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

window.toggleMobileDropdown = function() {
    const dropdown = document.getElementById('mobile-dropdown');
    const icon = document.getElementById('mobile-dropdown-icon');
    if (dropdown && icon) {
        dropdown.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }
}

// Set active navbar link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active-nav-link');
        } else {
            link.classList.remove('active-nav-link');
        }
    });
}

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const logoText = document.getElementById('logo-text');
const menuBtn = document.getElementById('mobile-toggle-btn');
const logoTagline = document.querySelector('.text-blue-200.font-light');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        
        nav.classList.add('bg-white', 'shadow-md', 'border-b', 'border-slate-200');
        nav.classList.remove('bg-transparent', 'py-4');
        nav.classList.add('py-2');
        
        logoText.classList.remove('text-white');
        logoText.classList.add('text-brand-dark');

        if (logoTagline) {
            logoTagline.classList.remove('text-blue-200');
            logoTagline.classList.add('text-slate-500');
        }

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'hover:text-blue-200');
            link.classList.add('text-slate-600', 'hover:text-brand-primary');
            // Keep active link styling on scroll
            if (link.classList.contains('active-nav-link')) {
                link.classList.remove('text-slate-600');
                link.classList.add('text-brand-primary', 'font-bold');
            }
        });
        
        menuBtn.classList.remove('text-white');
        menuBtn.classList.add('text-slate-600');

    } else {
        
        nav.classList.remove('bg-white', 'shadow-md', 'border-b', 'border-slate-200', 'py-2');
        nav.classList.add('bg-transparent', 'py-4');
        
        logoText.classList.add('text-white');
        logoText.classList.remove('text-brand-dark');

        if (logoTagline) {
            logoTagline.classList.add('text-blue-200');
            logoTagline.classList.remove('text-slate-500');
        }

        navLinks.forEach(link => {
            link.classList.add('text-white', 'hover:text-blue-200');
            link.classList.remove('text-slate-600', 'hover:text-brand-primary');
            // Active link color on transparent navbar
            if (link.classList.contains('active-nav-link')) {
                link.classList.remove('text-white', 'hover:text-blue-200');
                link.classList.add('text-blue-300', 'font-bold');
            }
        });

         menuBtn.classList.add('text-white');
         menuBtn.classList.remove('text-slate-600');
    }
});

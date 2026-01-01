// ===== Rework Documentation - JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
    initCopyButtons();
});

// ===== Navigation Active State =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            link.classList.add('active');
        });
    });
}

// ===== Scroll Spy - Update nav on scroll =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Update nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ===== Copy Code Button =====
function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.title = 'Copy code';

        // Style the button
        Object.assign(copyBtn.style, {
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px 10px',
            background: '#21262d',
            border: '1px solid #30363d',
            borderRadius: '6px',
            color: '#8b949e',
            fontSize: '12px',
            cursor: 'pointer',
            opacity: '0',
            transition: 'opacity 0.2s ease'
        });

        // Make pre relative for positioning
        block.style.position = 'relative';
        block.appendChild(copyBtn);

        // Show on hover
        block.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });

        block.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });

        // Copy functionality
        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;

            try {
                await navigator.clipboard.writeText(text);
                copyBtn.innerHTML = '✅ Copied!';
                copyBtn.style.color = '#3fb950';

                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copy';
                    copyBtn.style.color = '#8b949e';
                }, 2000);
            } catch (err) {
                copyBtn.innerHTML = '❌ Error';
                copyBtn.style.color = '#f85149';

                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copy';
                    copyBtn.style.color = '#8b949e';
                }, 2000);
            }
        });
    });
}

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// ===== Smooth Scroll Polyfill (for older browsers) =====
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
    }
});

// ===== Search Functionality (Future Enhancement) =====
function initSearch() {
    // Placeholder for search functionality
    // Could be implemented with a search index
    console.log('Search functionality ready for implementation');
}

// ===== Console Welcome Message =====
console.log(`
%c★ Rework Language Documentation ★
%cVersion 1.0 | Beyond Static Editor

Type 'help()' for available commands.
`,
    'color: #a855f7; font-size: 18px; font-weight: bold;',
    'color: #8b949e; font-size: 12px;'
);

// ===== Debug Commands =====
window.help = () => {
    console.log(`
Available commands:
- help()     : Show this message
- version()  : Show Rework version
- sections() : List all documentation sections
    `);
};

window.version = () => {
    console.log('Rework Language v1.0');
};

window.sections = () => {
    const sections = document.querySelectorAll('section[id]');
    console.log('Documentation sections:');
    sections.forEach(s => console.log(`  - ${s.id}`));
};

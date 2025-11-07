// Download functionality
        function downloadPortfolio() {
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'anubhav-kumar-portfolio.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('navbarMenu');
            const toggle = document.querySelector('.navbar-toggle');
            if (!menu || !toggle) return;
            menu.classList.toggle('active');
            const expanded = menu.classList.contains('active');
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }

        // Close on outside click
        document.addEventListener('click', function(e) {
            const menu = document.getElementById('navbarMenu');
            const toggle = document.querySelector('.navbar-toggle');
            if (!menu || !toggle) return;
            if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const menu = document.getElementById('navbarMenu');
                const toggle = document.querySelector('.navbar-toggle');
                if (!menu || !toggle) return;
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', () => {
                const menu = document.getElementById('navbarMenu');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
            });
        });

        // Active navbar link highlighting on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href').substring(1) === current) {
                    link.style.color = 'var(--linkedin-blue)';
                    link.style.fontWeight = '600';
                } else {
                    link.style.fontWeight = '400';
                }
            });
        });

        // Smooth scroll enhancement (for browsers that don't support CSS scroll-behavior)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 60;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add entrance animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply fade-in animation to cards
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Initialize - trigger animations for visible elements
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
        });

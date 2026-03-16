        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Check for saved theme preference; if none, follow system (no class override)
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        } else if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        // If no savedTheme, no class is added — CSS media query handles it

        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme') ||
                           (!document.body.classList.contains('light-theme') && prefersDarkScheme.matches);

            document.body.classList.remove('light-theme', 'dark-theme');

            if (isDark) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
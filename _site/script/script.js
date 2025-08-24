        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use the system preference
        const currentTheme = localStorage.getItem('theme') || 
                            (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Set the initial theme
        document.body.classList.toggle('light-theme', currentTheme === 'light');
        
        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
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
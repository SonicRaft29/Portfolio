document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Gestion des Traductions
    const translations = {
        'fr': {
            'nav-projects': 'Projets',
            'nav-about': 'À propos',
            'nav-formations': 'Parcours',
            'nav-skills': 'Compétences',
            'nav-contact': 'Contact',
            'nav-cv' : 'Mon CV',
            'hero-lead': 'Étudiant en BUT Informatique & Développeur Fullstack',
            'hero-btn-projects': 'Voir mes projets',
            'hero-btn-contact': 'Me contacter',
            'projects-title': 'Mes Projets',
            'projects-sort-label': 'Filtrer : ',
            'project-moustik-desc': 'Jeu d\'arcade réalisé en C# (WPF). Gestion des collisions, score et boucles de jeu.',
            'project-sae-desc': 'Développement d\'un site web dynamique avec Laravel et gestion de base de données PostgreSQL.',
            'project-nicolas-desc': 'Application CRUD connectée à une BDD pour la gestion de stocks et utilisateurs.',
            'about-title': 'À propos',
            'about-p1': 'Bonjour ! Je suis <strong>Tiago Rafael Belchior Dias</strong>, étudiant en informatique passionné par le développement logiciel. J\'aime concevoir des architectures solides en C# et créer des expériences web interactives.',
            'skills-title': 'Stack Technique',
            'contact-title': 'Contact',
            'footer-top': 'Haut de page ↑'
        },
        'en': {
            'nav-projects': 'Projects',
            'nav-about': 'About',
            'nav-formations': 'Career',
            'nav-skills': 'Skills',
            'nav-contact': 'Contact',
            'nav-cv': 'My Resume',
            'hero-lead': 'CS Student & Fullstack Developer',
            'hero-btn-projects': 'View my projects',
            'hero-btn-contact': 'Contact me',
            'projects-title': 'My Projects',
            'projects-sort-label': 'Filter: ',
            'project-moustik-desc': 'Arcade game built in C# (WPF). Features collision handling, scoring, and game loops.',
            'project-sae-desc': 'Developed a dynamic website using Laravel with PostgreSQL database management.',
            'project-nicolas-desc': 'CRUD application connected to a DB for inventory and user management.',
            'about-title': 'About Me',
            'about-p1': 'Hello! I am <strong>Tiago Rafael Belchior Dias</strong>, a computer science student passionate about software development. I enjoy designing solid architectures in C# and creating interactive web experiences.',
            'skills-title': 'Technical Stack',
            'contact-title': 'Contact',
            'footer-top': 'Back to top ↑'
        }
    };
    
    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'about-p1') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        document.documentElement.setAttribute('lang', lang);
    }

    // 3. Boutons Langue et Thème (Insérés dans la Navbar)
    const controlsContainer = document.getElementById('controls-container');
    
    // -- Thème --
    const themeBtn = document.createElement('button');
    themeBtn.className = 'icon-btn';
    themeBtn.setAttribute('aria-label', 'Changer le thème');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark'
            ? '<i data-lucide="moon"></i>'
            : '<i data-lucide="sun"></i>';
        if(typeof lucide !== 'undefined') lucide.createIcons({root: themeBtn});
    }

    updateThemeIcon(savedTheme);
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // -- Langue --
    const langBtn = document.createElement('button');
    langBtn.className = 'icon-btn lang-btn';
    
    let currentLang = localStorage.getItem('lang') || 'fr';
    langBtn.textContent = currentLang.toUpperCase();
    translatePage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langBtn.textContent = currentLang.toUpperCase();
        localStorage.setItem('lang', currentLang);
        translatePage(currentLang);
    });

    controlsContainer.append(langBtn, themeBtn);

    // 4. Gestion du chargement (Loader)
    const loader = document.getElementById('loading');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        });
    }

    // 5. Gestion des étoiles optimisée
    const starsEl = document.getElementById('stars');
    if (starsEl) {
        const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 100000));
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < count; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            const size = Math.random() * 2 + 1;
            s.style.width = `${size}px`;
            s.style.height = `${size}px`;
            s.style.left = `${Math.random() * 100}%`;
            s.style.top = `${Math.random() * 100}%`;
            s.style.animationDuration = `${3 + Math.random() * 5}s`;
            s.style.animationDelay = `${Math.random() * 5}s`;
            fragment.appendChild(s);
        }
        starsEl.appendChild(fragment);
    }

    // 6. Animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.section, .reveal').forEach(el => observer.observe(el));

    // 7. Filtrage des projets
    const chips = document.querySelectorAll('.chip');
    const cards = document.querySelectorAll('#projects-grid .card');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');
            
            cards.forEach(card => {
                const type = card.getAttribute('data-type') || '';
                if (filter === 'all' || type.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 8. Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 9. Année automatique footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});

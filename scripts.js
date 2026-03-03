document.addEventListener('DOMContentLoaded', () => {

    // 1. Traductions (inchangées)
    const translations = {
        'fr': {
            'nav-projects': 'PROJETS',
            'nav-about': 'À PROPOS',
            'nav-formations': 'PARCOURS',
            'nav-skills': 'ARSENAL',
            'nav-contact': 'CONTACT',
            'nav-cv' : 'CV PDF',
            'hero-lead': 'Étudiant en BUT Informatique & Développeur Fullstack',
            'hero-btn-projects': 'VOIR LES MISSIONS',
            'hero-btn-contact': 'TRANSMISSION',
            'projects-title': '/ MES PROJETS',
            'projects-sort-label': 'FILTRE : ',
            'project-moustik-desc': 'Jeu d\'arcade réalisé en C# (WPF). Gestion des collisions, score et boucles de jeu.',
            'project-sae-desc': 'Développement d\'un site web dynamique avec Laravel et gestion de base de données PostgreSQL.',
            'project-nicolas-desc': 'Application CRUD connectée à une BDD pour la gestion de stocks et utilisateurs.',
            'project-status-private': 'ACCÈS RESTREINT',
            'about-title': '/ À PROPOS',
            'about-p1': 'Salutations, Gardien. Je suis <strong>Tiago Rafael Belchior Dias</strong>, étudiant en informatique passionné par le développement logiciel. J\'aime concevoir des architectures solides en C# et créer des expériences web interactives.',
            'timeline-formation': 'FORMATION_',
            'timeline-experience': 'EXPÉRIENCES_',
            'skills-title': '/ ARSENAL TECHNIQUE',
            'contact-title': '/ CONTACT'
        },
        'en': {
            'nav-projects': 'PROJECTS',
            'nav-about': 'ABOUT',
            'nav-formations': 'JOURNEY',
            'nav-skills': 'ARSENAL',
            'nav-contact': 'CONTACT',
            'nav-cv': 'RESUME',
            'hero-lead': 'CS Student & Fullstack Developer',
            'hero-btn-projects': 'VIEW MISSIONS',
            'hero-btn-contact': 'TRANSMISSION',
            'projects-title': '/ MY PROJECTS',
            'projects-sort-label': 'FILTER: ',
            'project-moustik-desc': 'Arcade game built in C# (WPF). Features collision handling, scoring, and game loops.',
            'project-sae-desc': 'Developed a dynamic website using Laravel with PostgreSQL database management.',
            'project-nicolas-desc': 'CRUD application connected to a DB for inventory and user management.',
            'project-status-private': 'RESTRICTED ACCESS',
            'about-title': '/ ABOUT ME',
            'about-p1': 'Greetings, Guardian. I am <strong>Tiago Rafael Belchior Dias</strong>, a computer science student passionate about software development. I enjoy designing solid architectures in C# and creating interactive web experiences.',
            'timeline-formation': 'EDUCATION_',
            'timeline-experience': 'EXPERIENCE_',
            'skills-title': '/ TECHNICAL ARSENAL',
            'contact-title': '/ CONTACT'
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

    // 2. Boutons Toggles : CORRECTION DU BUG SVG (Ajout de xmlns)
    const controlsContainer = document.getElementById('controls-container');
    
    // -- Thème --
    const themeBtn = document.createElement('button');
    themeBtn.className = 'icon-btn';
    themeBtn.setAttribute('aria-label', 'Changer le thème');
    
    // Le secret de la réparation : xmlns="http://www.w3.org/2000/svg"
    const svgMoon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    const svgSun = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark' ? svgMoon : svgSun;
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

    // 3. Gestion du chargement
    const loader = document.getElementById('loading');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 600);
        });
    }

    // 4. Génération des étoiles (Style espace profond)
    const starsEl = document.getElementById('stars');
    if (starsEl) {
        const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 20000));
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            const size = Math.random() * 2 + 1;
            s.style.width = `${size}px`; s.style.height = `${size}px`;
            s.style.left = `${Math.random() * 100}%`; s.style.top = `${Math.random() * 100}%`;
            s.style.animationDuration = `${3 + Math.random() * 4}s`;
            s.style.animationDelay = `${Math.random() * 4}s`;
            fragment.appendChild(s);
        }
        starsEl.appendChild(fragment);
    }

    // 5. Animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 6. Filtrage des projets
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
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 7. Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const svgMenu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
    const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
            menuToggle.innerHTML = isExpanded ? svgMenu : svgClose;
        });
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = svgMenu;
            }
        });
    }

    // 8. Gestion Back-to-Top et Active Link
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinksA = document.querySelectorAll('.nav-item:not(.btn-cv)');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
        });

        navLinksA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) a.classList.add('active');
        });
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});

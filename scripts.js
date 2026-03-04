document.addEventListener('DOMContentLoaded', () => {

    // 1. Dictionnaire de Traduction Intégrale
    const translations = {
        'fr': {
            'nav-projects': 'PROJETS',
            'nav-about': 'À PROPOS',
            'nav-formations': 'PARCOURS',
            'nav-skills': 'ARSENAL',
            'nav-contact': 'CONTACT',
            'nav-cv': 'CV PDF',
            'hero-subtitle': '/ CLASSE : DÉVELOPPEUR',
            'hero-lead': 'Étudiant en BUT Informatique & Développeur Fullstack',
            'hero-btn-projects': 'VOIR LES MISSIONS',
            'hero-btn-contact': 'TRANSMISSION',
            'projects-title': '/ MES PROJETS',
            'projects-filter-all': 'TOUS',
            'project-moustik-desc': 'Jeu d\'arcade réalisé en C# (WPF). Gestion des collisions, score et boucles de jeu.',
            'project-sae-desc': 'Développement d\'un site web dynamique avec Laravel et gestion de base de données PostgreSQL.',
            'project-nicolas-desc': 'Application CRUD connectée à une BDD pour la gestion de stocks et utilisateurs.',
            'project-status-private': 'ACCÈS RESTREINT',
            'about-title': '/ À PROPOS',
            'about-p1': 'Salutations, Gardien. Je suis <strong>Tiago Rafael Belchior Dias</strong>, étudiant en informatique passionné par le développement logiciel. J\'aime concevoir des architectures solides en C# et créer des expériences web interactives.',
            'about-list-formation': 'FORMATION //',
            'about-list-specialties': 'SPÉCIALITÉS //',
            'about-list-languages': 'LANGUES //',
            'timeline-formation-title': 'FORMATION_',
            'timeline-degree-but': 'BUT Informatique',
            'timeline-desc-but': 'Spécialisation en réalisation d\'applications : conception, développement, tests et déploiement.',
            'timeline-degree-bac': 'Baccalauréat STI2D',
            'timeline-desc-bac': 'Mention Bien. Option Systèmes d\'Information et Numérique.',
            'timeline-experience-title': 'EXPÉRIENCES_',
            'timeline-role-dev': 'Développeur Fullstack',
            'timeline-comp-but': 'IUT Annecy (Projet Académique)',
            'timeline-desc-dev': 'Gestion complète du cycle de vie logiciel : Analyse des besoins, modélisation UML, développement et recette.',
            'timeline-date-smc2': 'ÉTÉS 2023 & 2024',
            'timeline-role-saisonniere': 'Emplois Saisonniers',
            'timeline-desc-smc2': 'Développement de l\'autonomie, travail d\'équipe et rigueur professionnelle dans le secteur du BTP et de l\'industrie.',
            'skills-title': '/ ARSENAL TECHNIQUE',
            'skill-title-backend': 'BACKEND_',
            'skill-title-frontend': 'FRONTEND_',
            'skill-title-data': 'DATA_&_OUTILS_',
            'contact-title': '/ CONTACT',
            'contact-description': 'RECHERCHE D\'ALTERNANCE OU DE STAGE EN COURS. PRÊT POUR LA PROCHAINE MISSION.',
            'contact-email-btn': 'LANCER LA TRANSMISSION',
            'footer-copyright': 'TIAGO RAFAEL BELCHIOR DIAS. TOUS DROITS RÉSERVÉS.'
        },
        'en': {
            'nav-projects': 'PROJECTS',
            'nav-about': 'ABOUT',
            'nav-formations': 'JOURNEY',
            'nav-skills': 'ARSENAL',
            'nav-contact': 'CONTACT',
            'nav-cv': 'RESUME',
            'hero-subtitle': '/ CLASS: DEVELOPER',
            'hero-lead': 'CS Student & Fullstack Developer',
            'hero-btn-projects': 'VIEW MISSIONS',
            'hero-btn-contact': 'TRANSMISSION',
            'projects-title': '/ MY PROJECTS',
            'projects-filter-all': 'ALL',
            'project-moustik-desc': 'Arcade game built in C# (WPF). Features collision handling, scoring, and game loops.',
            'project-sae-desc': 'Developed a dynamic website using Laravel with PostgreSQL database management.',
            'project-nicolas-desc': 'CRUD application connected to a DB for inventory and user management.',
            'project-status-private': 'RESTRICTED ACCESS',
            'about-title': '/ ABOUT ME',
            'about-p1': 'Greetings, Guardian. I am <strong>Tiago Rafael Belchior Dias</strong>, a computer science student passionate about software development. I enjoy designing solid architectures in C# and creating interactive web experiences.',
            'about-list-formation': 'EDUCATION //',
            'about-list-specialties': 'SPECIALTIES //',
            'about-list-languages': 'LANGUAGES //',
            'timeline-formation-title': 'EDUCATION_',
            'timeline-degree-but': 'Bachelor in Computer Science (BUT)',
            'timeline-desc-but': 'Specialization in application development: design, development, testing, and deployment.',
            'timeline-degree-bac': 'High School Diploma (STI2D)',
            'timeline-desc-bac': 'With Honors. Option in Information Systems and Digital Technology.',
            'timeline-experience-title': 'EXPERIENCE_',
            'timeline-role-dev': 'Fullstack Developer',
            'timeline-comp-but': 'IUT Annecy (Academic Project)',
            'timeline-desc-dev': 'Full software life cycle management: Requirements analysis, UML modeling, development, and acceptance testing.',
            'timeline-date-smc2': 'SUMMERS 2023 & 2024',
            'timeline-role-saisonniere': 'Seasonal Jobs',
            'timeline-desc-smc2': 'Developed autonomy, teamwork, and professional rigor in the construction and industrial sectors.',
            'skills-title': '/ TECHNICAL ARSENAL',
            'skill-title-backend': 'BACKEND_',
            'skill-title-frontend': 'FRONTEND_',
            'skill-title-data': 'DATA_&_TOOLS_',
            'contact-title': '/ CONTACT',
            'contact-description': 'CURRENTLY SEEKING INTERNSHIP OR APPRENTICESHIP. READY FOR THE NEXT MISSION.',
            'contact-email-btn': 'LAUNCH TRANSMISSION',
            'footer-copyright': 'TIAGO RAFAEL BELCHIOR DIAS. ALL RIGHTS RESERVED.'
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

    // 2. Boutons Toggles : Sécurisation de l'affichage SVG
    const controlsContainer = document.getElementById('controls-container');
    
    // -- Thème --
    const themeBtn = document.createElement('button');
    themeBtn.className = 'icon-btn';
    themeBtn.setAttribute('aria-label', 'Changer le thème');
    
    // SVG du Soleil et de la Lune
    const svgMoon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: currentColor;"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    const svgSun = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: currentColor;"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

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

    if (controlsContainer) {
        controlsContainer.appendChild(langBtn);
        controlsContainer.appendChild(themeBtn);
    }

    // 3. Gestion du chargement (AVEC GIF ET FAILSAFE 2 SECONDES)
    const loader = document.getElementById('loading');
    if (loader) {
        let isLoaded = false;
        
        const removeLoader = () => {
            if (isLoaded) return; 
            isLoaded = true;
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 600);
        };

        window.addEventListener('load', removeLoader);
        setTimeout(removeLoader, 2000); // 2 secondes max
    }

    // 4. Génération des étoiles
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
        if (backToTop) {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        }

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

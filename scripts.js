document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Gestion des Traductions (Mise à jour avec le ton pro)
    const translations = {
        'fr': {
            'nav-projects': 'Projets',
            'nav-about': 'À propos',
            'nav-formations': 'Parcours',
            'nav-skills': 'Stack Tech',
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
            'footer-top': 'Haut de page'
        },
        'en': {
            'nav-projects': 'Projects',
            'nav-about': 'About',
            'nav-formations': 'Career',
            'nav-skills': 'Tech Stack',
            'nav-contact': 'Contact',
            'nav-cv': 'My CV',
            'hero-lead': 'CS Student & Fullstack Developer',
            'hero-btn-projects': 'View my projects',
            'hero-btn-contact': 'Contact me',
            'projects-title': 'My Projects',
            'projects-sort-label': 'Filter : ',
            'project-moustik-desc': 'Arcade game made in C# (WPF). Collision handling, scoring, and game loops.',
            'project-sae-desc': 'Development of a dynamic website with Laravel and PostgreSQL database management.',
            'project-nicolas-desc': 'CRUD application connected to a DB for stock and user management.',
            'about-title': 'About',
            'about-p1': 'Hello! I am <strong>Tiago Rafael Belchior Dias</strong>, a computer science student passionate about software development. I enjoy designing solid architectures in C# and creating interactive web experiences.',
            'skills-title': 'Technical Stack',
            'contact-title': 'Contact',
            'footer-top': 'Back to top'
        }
    };
    
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        const texts = translations[lang];

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (texts && texts[key]) {
                // Si c'est le paragraphe à propos, on utilise innerHTML pour garder le gras
                if (key === 'about-p1') {
                    element.innerHTML = texts[key];
                } else {
                    element.textContent = texts[key];
                }
            }
        });
        
        // Mettre à jour l'attribut lang du HTML
        document.documentElement.setAttribute('lang', lang);
    }

    // 3. Création dynamique du bouton de Thème (Dark/Light)
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Changer le thème');
    document.body.appendChild(themeToggle);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }

    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // 4. Création dynamique du bouton de Langue
    const langToggleContainer = document.createElement('div');
    langToggleContainer.className = 'lang-toggle';
    langToggleContainer.innerHTML = `
        <button id="lang-fr" data-lang="fr">FR</button>
        <button id="lang-en" data-lang="en">EN</button>
    `;
    document.body.appendChild(langToggleContainer); 

    const langButtons = document.querySelectorAll('.lang-toggle button');
    const savedLang = localStorage.getItem('lang') || 'fr';
    
    function updateLang(newLang) {
        document.documentElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        
        langButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`#lang-${newLang}`);
        if (activeButton) activeButton.classList.add('active');
        
        translatePage(newLang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateLang(button.getAttribute('data-lang'));
        });
    });
    
    // Initialiser la langue
    updateLang(savedLang);


    // 5. Gestion du chargement (Loader)
    const loader = document.getElementById('loading');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(()=> loader.remove(), 450);
        }, 600);
    }

    // 6. Gestion des étoiles (Background)
    const starsEl = document.getElementById('stars');
    if (starsEl) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Un peu moins d'étoiles pour la performance sur mobile
        const count = Math.min(100, Math.floor((w*h)/80000));
        
        for (let i=0; i<count; i++){
            const s = document.createElement('div');
            s.className = 'star';
            const size = Math.random() * 2 + 1; // Étoiles plus petites et fines
            s.style.width = `${size}px`;
            s.style.height = `${size}px`;
            s.style.position = 'absolute';
            s.style.left = `${Math.random()*100}%`;
            s.style.top = `${Math.random()*100}%`;
            s.style.opacity = Math.random();
            s.style.animation = `twinkle ${3 + Math.random()*4}s infinite alternate`;
            starsEl.appendChild(s);
        }
    }

    // 7. Animations d'apparition au scroll (Intersection Observer)
    const sections = document.querySelectorAll('.section, .reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    sections.forEach(section => observer.observe(section));


    // 8. Système de Filtrage des projets
    const chips = Array.from(document.querySelectorAll('.chip'));
    const projectsGrid = document.getElementById('projects-grid');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Gestion de l'état actif des boutons
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');
            const cards = Array.from(document.querySelectorAll('#projects-grid .card'));

            cards.forEach(card => {
                const typeString = card.getAttribute('data-type') || '';
                // On vérifie si le filtre est inclus dans le data-type du projet
                if (filter === 'all' || typeString.includes(filter)) {
                    card.style.display = 'flex'; // Important pour garder le layout flex de la carte
                    // Petite animation de réapparition
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // 9. Menu Mobile (Corrigé pour utiliser classList)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le clic de se propager au document
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav__links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 10. Année automatique dans le footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});
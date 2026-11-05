const pageMenu = document.getElementById('menu');
const pageNav = document.getElementById('nav');
const pageLanguageToggle = document.getElementById('languageToggle');
let pageLanguage = 'bg';

if (pageNav && !pageNav.querySelector('a[href="guides.html"]')) {
    pageNav.querySelector('a[href="process.html"]')?.insertAdjacentHTML('afterend', '<a class="desktop-guides-link" href="guides.html" data-bg="Фолиа" data-en="Films">Фолиа</a>');
}


if (pageNav && !pageNav.querySelector('a[href="useful.html"]')) {
    pageNav.querySelector('a[href="guides.html"]')?.insertAdjacentHTML('afterend', '<a href="useful.html" data-bg="Полезно" data-en="Useful">Полезно</a>');
}

if (pageMenu && pageNav) {
    pageMenu.setAttribute('aria-controls', 'nav');
    pageMenu.setAttribute('aria-expanded', 'false');

    const setPageMenuOpen = isOpen => {
        pageNav.classList.toggle('open', isOpen);
        pageMenu.setAttribute('aria-expanded', String(isOpen));
        pageMenu.setAttribute('aria-label', isOpen ? 'Затвори менюто' : 'Отвори менюто');
    };

    pageMenu.addEventListener('click', event => {
        event.stopPropagation();
        setPageMenuOpen(!pageNav.classList.contains('open'));
    });
    pageNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setPageMenuOpen(false)));
    document.addEventListener('click', event => {
        if (pageNav.classList.contains('open') && !pageNav.contains(event.target)) setPageMenuOpen(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && pageNav.classList.contains('open')) {
            setPageMenuOpen(false);
            pageMenu.focus();
        }
    });
}

function setPageLanguage(language) {
    pageLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-bg][data-en]').forEach(element => {
        element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-placeholder-bg][data-placeholder-en]').forEach(element => {
        element.placeholder = element.dataset[language === 'bg' ? 'placeholderBg' : 'placeholderEn'];
    });
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.toggle('active', element.dataset.lang === language);
    });
    const title = document.body.dataset[language === 'bg' ? 'titleBg' : 'titleEn'];
    if (title) document.title = title;
}

pageLanguageToggle?.addEventListener('click', () => setPageLanguage(pageLanguage === 'bg' ? 'en' : 'bg'));

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.toggle('open');
        button.setAttribute('aria-expanded', String(isOpen));
    });
});

const galleryGrid = document.getElementById('galleryGrid');
const galleryTemplate = document.getElementById('galleryProjectTemplate');
if (galleryGrid && galleryTemplate && window.VeloraGallery) {
    const galleryUrls = [];
    window.VeloraGallery.getAll().then(projects => {
        projects.forEach(project => {
            const fragment = galleryTemplate.content.cloneNode(true);
            const image = fragment.querySelector('img');
            const imageUrl = URL.createObjectURL(project.image);
            galleryUrls.push(imageUrl);
            image.src = imageUrl;
            image.alt = project.alt || project.title;
            galleryGrid.appendChild(fragment);
        });
    }).catch(() => {
        // The original gallery remains fully usable if local storage is unavailable.
    });
    window.addEventListener('beforeunload', () => galleryUrls.forEach(url => URL.revokeObjectURL(url)));
}

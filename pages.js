const pageMenu = document.getElementById('menu');
const pageNav = document.getElementById('nav');
const pageLanguageToggle = document.getElementById('languageToggle');
let pageLanguage = 'bg';

pageMenu?.addEventListener('click', () => pageNav.classList.toggle('open'));
pageNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => pageNav.classList.remove('open')));

function setPageLanguage(language) {
    pageLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-bg][data-en]').forEach(element => {
        element.textContent = element.dataset[language];
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

const pageRevealElements = document.querySelectorAll('.page-reveal');
if ('IntersectionObserver' in window) {
    const pageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            pageObserver.unobserve(entry.target);
        });
    }, { threshold: .12 });
    pageRevealElements.forEach(element => pageObserver.observe(element));
} else {
    pageRevealElements.forEach(element => element.classList.add('visible'));
}

const galleryGrid = document.getElementById('galleryGrid');
const galleryTemplate = document.getElementById('galleryProjectTemplate');
if (galleryGrid && galleryTemplate && window.VeloraGallery) {
    const galleryUrls = [];
    window.VeloraGallery.getAll().then(projects => {
        projects.forEach(project => {
            const fragment = galleryTemplate.content.cloneNode(true);
            const image = fragment.querySelector('img');
            const category = fragment.querySelector('span');
            const title = fragment.querySelector('h3');
            const imageUrl = URL.createObjectURL(project.image);
            galleryUrls.push(imageUrl);
            image.src = imageUrl;
            image.alt = project.alt || project.title;
            category.textContent = project.category;
            title.textContent = project.title;
            galleryGrid.appendChild(fragment);
        });
    }).catch(() => {
        // The original gallery remains fully usable if local storage is unavailable.
    });
    window.addEventListener('beforeunload', () => galleryUrls.forEach(url => URL.revokeObjectURL(url)));
}

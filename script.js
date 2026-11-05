const menu = document.getElementById('menu');
const nav = document.getElementById('nav');

if (menu && nav) {
    menu.setAttribute('aria-controls', 'nav');
    menu.setAttribute('aria-expanded', 'false');

    const setMenuOpen = isOpen => {
        nav.classList.toggle('open', isOpen);
        menu.setAttribute('aria-expanded', String(isOpen));
        menu.setAttribute('aria-label', isOpen ? 'Затворете менюто' : 'Отворете менюто');
    };

    menu.addEventListener('click', event => {
        event.stopPropagation();
        setMenuOpen(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

    document.addEventListener('click', event => {
        if (nav.classList.contains('open') && !nav.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
            setMenuOpen(false);
            menu.focus();
        }
    });
}
const translations = {
    bg: { title: 'Velora Protect — Защитно фолио за повърхности', navSurfaces: 'Повърхности', navProcess: 'Процес', navGallery: 'Галерия', navAbout: 'За нас', navContact: 'Контакт', heroTitle: 'Защитете повърхността<br><em>Запазете визията</em>', heroLead: 'Професионално поставяне на <b>матово</b> и <b>прозрачно защитно фолио</b> за маси, барове, плотове и други интериорни повърхности.', getQuote: 'Поискайте оферта →', badgeFilms: '<b>2 вида фолио</b>Матово и прозрачно', badgeClean: '<b>Чист монтаж</b>Без къртене и прах', badgeLook: '<b>Запазена визия</b>Подходящо за интериор', badgeLife: '<b>По-дълъг живот</b>За ежедневно ползване', usesEyebrow: 'КЪДЕ СЕ ИЗПОЛЗВА', usesTitle: 'За повърхности, които<br><em>се използват всеки ден</em>', usesCopy: 'Работим върху подходящи гладки интериорни повърхности. Преди монтаж преценяваме състоянието и дали конкретният материал е подходящ за фолиране.', barsTitle: 'Барове', barsCopy: 'Бар-плотове, рецепции и работни зони.', tablesTitle: 'Маси', tablesCopy: 'Трапезни, офис и търговски маси.', topsTitle: 'Плотове', topsCopy: 'Подходящи интериорни работни повърхности.', otherTitle: 'Други повърхности', otherCopy: 'Шкафове, панели и други гладки основи след оглед.', processEyebrow: 'ПРОЦЕС', processTitle: 'Лесно Чисто<br><em>Без излишно усложняване</em>', photoTitle: 'Снимка', photoCopy: 'Изпращате снимки на повърхността и приблизителни размери.', choiceTitle: 'Избор', choiceCopy: 'Уточняваме дали искате матово или прозрачно защитно фолио.', prepTitle: 'Подготовка', prepCopy: 'Повърхността се почиства и подготвя за прецизен монтаж.', installTitle: 'Монтаж', installCopy: 'Фолиото се поставя внимателно за чист и завършен резултат.', quoteEyebrow: 'ИСКАТЕ ОФЕРТА?', quoteTitle: 'Изпратете снимка<br><em style="color:#9a6f43">на повърхността</em>', quoteCopy: 'Напишете приблизителни размери и кой вариант предпочитате — матово или прозрачно. Така ще можем да преценим проекта по-точно.', namePlaceholder: 'Име', phonePlaceholder: 'Телефон', cityPlaceholder: 'Град', messagePlaceholder: 'Каква е повърхността, размери и кое фолио искате?', send: 'Изпратете запитване →', sent: 'Готово ✓', demoNote: 'Формата е демо. Може да се свърже с имейл, WhatsApp или собствен backend.', footerCopy: 'Матово и прозрачно защитно фолио за интериорни повърхности.' },
    en: { title: 'Velora Protect — Premium Surface Protection', navSurfaces: 'Surfaces', navProcess: 'Process', navGallery: 'Gallery', navAbout: 'About us', navContact: 'Contact', heroTitle: 'Protect the surface<br><em>Preserve the look</em>', heroLead: 'Professional installation of <b>matte</b> and <b>clear protective film</b> for tables, bars, worktops and other interior surfaces.', getQuote: 'Request a quote →', badgeFilms: '<b>2 film finishes</b>Matte and clear', badgeClean: '<b>Clean installation</b>No demolition or dust', badgeLook: '<b>Original look</b>Made for interiors', badgeLife: '<b>Longer lifespan</b>For everyday use', usesEyebrow: 'WHERE IT WORKS', usesTitle: 'For surfaces<br><em>used every day</em>', usesCopy: 'We work on suitable smooth interior surfaces. Before installation, we assess their condition and confirm whether the material is suitable for wrapping.', barsTitle: 'Bars', barsCopy: 'Bar tops, reception desks and work areas.', tablesTitle: 'Tables', tablesCopy: 'Dining, office and commercial tables.', topsTitle: 'Worktops', topsCopy: 'Suitable interior work surfaces.', otherTitle: 'Other surfaces', otherCopy: 'Cabinets, panels and other smooth surfaces after inspection.', processEyebrow: 'PROCESS', processTitle: 'Simple Clean<br><em>Without the hassle</em>', photoTitle: 'Photo', photoCopy: 'Send photos of the surface and its approximate dimensions.', choiceTitle: 'Choose', choiceCopy: 'We confirm whether you prefer matte or clear protective film.', prepTitle: 'Preparation', prepCopy: 'The surface is cleaned and prepared for precise installation.', installTitle: 'Installation', installCopy: 'The film is carefully applied for a clean, refined finish.', quoteEyebrow: 'NEED A QUOTE?', quoteTitle: 'Send a photo<br><em style="color:#9a6f43">of the surface</em>', quoteCopy: 'Add approximate dimensions and tell us whether you prefer matte or clear film. This helps us assess the project accurately.', namePlaceholder: 'Name', phonePlaceholder: 'Phone', cityPlaceholder: 'City', messagePlaceholder: 'What is the surface, its dimensions and your preferred film?', send: 'Send enquiry →', sent: 'Sent ✓', demoNote: 'This is a demo form. It can be connected to email, WhatsApp or a custom backend.', footerCopy: 'Matte and clear protective film for interior surfaces.' }
};
Object.assign(translations.bg, { navFAQ: 'Въпроси', navReview: 'Оставете мнение', navGuides: 'Фолиа', hoursEyebrow: 'РАБОТНО ВРЕМЕ', hoursTitle: 'Кога сме на линия', weekdays: 'Понеделник – Петък', saturday: 'Събота', sunday: 'Неделя', byAppointment: 'С уговорка', closed: 'Почивен ден', backToTop: 'Обратно нагоре ↑' });
Object.assign(translations.en, { navFAQ: 'FAQ', navReview: 'Leave a review', navGuides: 'Films', hoursEyebrow: 'WORKING HOURS', hoursTitle: 'When we are available', weekdays: 'Monday – Friday', saturday: 'Saturday', sunday: 'Sunday', byAppointment: 'By appointment', closed: 'Closed', backToTop: 'Back to top ↑' });
Object.assign(translations.bg, {
    filmsEyebrow: 'ИЗБЕРЕТЕ ПОКРИТИЕ', filmsTitle: 'Два финиша<br><em>Една цел - защита</em>', filmsCopy: 'Изборът между матово и прозрачно фолио зависи от оригиналната повърхност, светлината и ефекта, който искате да запазите.',
    matteTag: 'МЕК ИЗИСКАН ФИНИШ', matteTitle: 'Матово фолио', matteCopy: 'Намалява отраженията и придава по-спокойно, кадифено усещане на повърхността.', matteFeature1: 'По-малко отблясъци', matteFeature2: 'Дискретна визия', matteFeature3: 'Premium усещане',
    clearTag: 'ЗАПАЗЕН ОРИГИНАЛЕН ВИД', clearTitle: 'Прозрачно фолио', clearCopy: 'Запазва цвета, шарката и дълбочината на оригиналната повърхност максимално видими.', clearFeature1: 'Ясна текстура', clearFeature2: 'Запазен блясък', clearFeature3: 'Невидима защита',
    matteLabel: 'МАТОВО', clearLabel: 'ПРОЗРАЧНО', compareEyebrow: 'СРАВНИ ФИНИША', compareTitle: 'Плъзнете и вижте<br><em>разликата</em>', compareCopy: 'Интерактивният пример показва как матовият ефект омекотява отраженията, докато прозрачният запазва повече блясък.', comparePoint1: 'Избор според конкретната повърхност', comparePoint2: 'Консултация преди монтажа', comparePoint3: 'Тест на визията при необходимост'
});
Object.assign(translations.en, {
    filmsEyebrow: 'CHOOSE A FINISH', filmsTitle: 'Two finishes<br><em>One goal - protection</em>', filmsCopy: 'The choice between matte and clear film depends on the original surface, the lighting and the look you want to preserve.',
    matteTag: 'SOFT REFINED FINISH', matteTitle: 'Matte film', matteCopy: 'Reduces reflections and gives the surface a calmer, velvety appearance.', matteFeature1: 'Fewer reflections', matteFeature2: 'Understated look', matteFeature3: 'Premium feel',
    clearTag: 'PRESERVED ORIGINAL LOOK', clearTitle: 'Clear film', clearCopy: 'Keeps the original colour, pattern and depth of the surface as visible as possible.', clearFeature1: 'Clear texture', clearFeature2: 'Preserved gloss', clearFeature3: 'Invisible protection',
    matteLabel: 'MATTE', clearLabel: 'CLEAR', compareEyebrow: 'COMPARE FINISHES', compareTitle: 'Slide to see<br><em>the difference</em>', compareCopy: 'The interactive example shows how a matte effect softens reflections while clear film preserves more gloss.', comparePoint1: 'Selected for the specific surface', comparePoint2: 'Consultation before installation', comparePoint3: 'Visual test when needed'
});
Object.assign(translations.bg, {
    benefitsEyebrow: 'КАКВО ПОЛУЧАВАТЕ', benefitsTitle: 'Повече спокойствие<br><em>По-малко следи от ежедневието</em>', benefitsCopy: 'Защитното фолио помага на натоварените повърхности да запазят добрия си вид и да се поддържат по-лесно.',
    benefitProtectTitle: 'Ежедневна защита', benefitProtectCopy: 'Допълнителен защитен слой срещу леки драскотини, петна и следи от употреба.', benefitCleanTitle: 'По-лесна поддръжка', benefitCleanCopy: 'Гладката повърхност се почиства бързо и е удобна за натоварени домашни и търговски зони.',
    benefitLookTitle: 'Запазена визия', benefitLookCopy: 'Избирате матов или прозрачен финиш според материала, светлината и желания ефект.', benefitFitTitle: 'Прецизно напасване', benefitFitCopy: 'Всеки проект се преценява индивидуално за чисти ръбове и завършен резултат.',
    prepEyebrow: 'ЗА ПО-БЪРЗА ОФЕРТА', quotePrepTitle: 'Подгответе три неща', quotePrepCopy: 'Тази информация ни помага да преценим повърхността и проекта още при първия контакт.', prepPhoto: 'Снимки отблизо и отдалеч', prepSize: 'Приблизителни размери', prepFinish: 'Матов или прозрачен финиш', prepButton: 'Изпратете запитване →'
});
Object.assign(translations.en, {
    benefitsEyebrow: 'WHAT YOU GET', benefitsTitle: 'More peace of mind<br><em>Fewer signs of daily use</em>', benefitsCopy: 'Protective film helps frequently used surfaces retain their appearance and makes everyday care easier.',
    benefitProtectTitle: 'Everyday protection', benefitProtectCopy: 'An additional protective layer against light scratches, stains and everyday wear.', benefitCleanTitle: 'Easier maintenance', benefitCleanCopy: 'The smooth surface is quick to clean and practical for busy homes and commercial spaces.',
    benefitLookTitle: 'Preserved appearance', benefitLookCopy: 'Choose a matte or clear finish to suit the material, lighting and desired effect.', benefitFitTitle: 'Precise fitting', benefitFitCopy: 'Every project is assessed individually for clean edges and a refined result.',
    prepEyebrow: 'FOR A FASTER QUOTE', quotePrepTitle: 'Prepare three things', quotePrepCopy: 'This information helps us assess the surface and project from the first conversation.', prepPhoto: 'Close-up and wider photos', prepSize: 'Approximate dimensions', prepFinish: 'Matte or clear finish', prepButton: 'Send an enquiry →'
});
Object.assign(translations.bg, {
    teamStatus: 'НА ЛИНИЯ ЗА НОВИ ПРОЕКТИ', teamRole: 'Екип за професионален монтаж на защитно фолио', teamEyebrow: 'КОИ СМЕ НИЕ', teamTitle: 'Малък екип<br><em>Голямо внимание към детайла</em>', teamCopy: 'Подхождаме лично към всеки проект — от първата снимка и избора на финиш до подготовката и чистия монтаж на място.',
    teamPoint1: 'Честна предварителна оценка', teamPoint2: 'Прецизна подготовка', teamPoint3: 'Грижа за интериора', teamLink: 'Научете повече за нас →', reviewsEyebrow: 'МНЕНИЯ И ИСТОРИИ', reviewsTitle: 'Какво остава<br><em>след добрия монтаж</em>', reviewsCopy: 'Прочетете споделените впечатления от завършени проекти или добавете своето мнение на отделната страница.', reviewsWriteLink: 'Оставете мнение →', sampleReview: 'ПРИМЕРЕН ОТЗИВ',
    reviewHomeText: 'Плотът запази естествения си вид, а почистването вече е много по-лесно. Резултатът е дискретен и чист.', reviewHomeName: 'Домашен проект', reviewHomeRole: 'Кухненски плот', reviewBusinessText: 'Работата беше организирана и без излишно прекъсване. Повърхността изглежда завършена и готова за ежедневно натоварване.', reviewBusinessName: 'Бизнес пространство', reviewBusinessRole: 'Бар и работна зона', reviewOfficeText: 'Получихме ясна препоръка за финиша и точна предварителна оценка. Монтажът се вписа естествено в интериора.', reviewOfficeName: 'Офис проект', reviewOfficeRole: 'Маса в заседателна зала', reviewRetailText: 'Рецепцията изглежда като нова, без да променя оригиналния си цвят. Монтажът беше бърз и много чист.', reviewRetailName: 'Търговски обект', reviewRetailRole: 'Рецепция и плот', publishedReview: 'КЛИЕНТСКИ ОТЗИВ', likeReview: 'Харесайте отзива с 6 звезди', likedReview: 'Вече харесан отзив'
});
Object.assign(translations.en, {
    teamStatus: 'AVAILABLE FOR NEW PROJECTS', teamRole: 'Professional protective film installation team', teamEyebrow: 'WHO WE ARE', teamTitle: 'A small team<br><em>Great attention to detail</em>', teamCopy: 'We take a personal approach to every project — from the first photo and finish selection to preparation and clean installation on site.',
    teamPoint1: 'Honest initial assessment', teamPoint2: 'Precise preparation', teamPoint3: 'Care for your interior', teamLink: 'Learn more about us →', reviewsEyebrow: 'REVIEWS AND STORIES', reviewsTitle: 'What remains<br><em>after a quality installation</em>', reviewsCopy: 'Read feedback from completed projects or add your own review on the dedicated page.', reviewsWriteLink: 'Leave a review →', sampleReview: 'SAMPLE REVIEW',
    reviewHomeText: 'The worktop kept its natural appearance and is now much easier to clean. The result feels discreet and refined.', reviewHomeName: 'Home project', reviewHomeRole: 'Kitchen worktop', reviewBusinessText: 'The work was organised with minimal disruption. The surface looks finished and ready for daily use.', reviewBusinessName: 'Business space', reviewBusinessRole: 'Bar and work area', reviewOfficeText: 'We received a clear finish recommendation and an accurate initial assessment. The installation fits naturally into the interior.', reviewOfficeName: 'Office project', reviewOfficeRole: 'Meeting room table', reviewRetailText: 'The reception desk looks new without changing its original colour. Installation was quick and very clean.', reviewRetailName: 'Retail space', reviewRetailRole: 'Reception desk and counter', publishedReview: 'CUSTOMER REVIEW', likeReview: 'Like this review with 6 stars', likedReview: 'Review already liked'
});
translations.bg.contactQuoteTitle = '<span class="contact-title-first">Изпратете снимка<span class="contact-title-mobile"> на</span></span><br><em><span class="contact-title-desktop">на </span>повърхността</em>';
translations.en.contactQuoteTitle = '<span class="contact-title-first">Send a photo<span class="contact-title-mobile"> of</span></span><br><em><span class="contact-title-desktop">of </span>the surface</em>';
let currentLanguage = 'bg';
function setLanguage(language) {
    currentLanguage = language;
    const copy = translations[language];
    document.documentElement.lang = language;
    document.title = document.body.dataset[language === 'bg' ? 'titleBg' : 'titleEn'] || copy.title;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.innerHTML = copy[element.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = copy[element.dataset.i18nPlaceholder];
    });
    document.querySelectorAll('[data-bg][data-en]').forEach(element => {
        element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-alt-bg][data-alt-en]').forEach(element => {
        element.alt = element.dataset[language === 'bg' ? 'altBg' : 'altEn'];
    });
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.toggle('active', element.dataset.lang === language);
    });
    renderPublicReviews();
}
document.getElementById('languageToggle')?.addEventListener('click', () => setLanguage(currentLanguage === 'bg' ? 'en' : 'bg'));
document.getElementById('form')?.addEventListener('submit', e => { e.preventDefault(); const b = e.currentTarget.querySelector('button'); b.textContent = translations[currentLanguage].sent; setTimeout(() => b.textContent = translations[currentLanguage].send, 1800) });

const reviewsGrid = document.getElementById('reviewsGrid');
const reviewCardTemplate = document.getElementById('reviewCardTemplate');
const reviewsPrev = document.getElementById('reviewsPrev');
const reviewsNext = document.getElementById('reviewsNext');
const reviewsDots = document.getElementById('reviewsDots');
const supabaseConfig = window.VELORA_SUPABASE || {};
const supabaseUrl = String(supabaseConfig.url || '').replace(/\/$/, '');
const supabaseKey = String(supabaseConfig.publishableKey || '');
const supabaseReady = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) && supabaseKey.length > 20;
let publicReviews = [];
const likedReviewsKey = 'velora-liked-reviews';
const reviewVisitorKey = 'velora-review-visitor';

function reviewCarouselPages() {
    if (!reviewsGrid) return 1;
    const width = reviewsGrid.clientWidth;
    const contentWidth = reviewsGrid.scrollWidth;
    // Device emulation can temporarily collapse the grid during layout.
    // Never let a zero width produce Infinity and an unbounded dots loop.
    if (width <= 0 || !Number.isFinite(width) || !Number.isFinite(contentWidth)) return 1;
    const cardCount = Math.max(1, reviewsGrid.querySelectorAll('.review-card').length);
    return Math.max(1, Math.min(cardCount, Math.ceil(contentWidth / width)));
}

function updateReviewCarousel() {
    if (!reviewsGrid || !reviewsDots || !reviewsPrev || !reviewsNext) return;
    const pages = reviewCarouselPages();
    const maxScroll = Math.max(0, reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
    const currentPage = maxScroll ? Math.min(pages - 1, Math.round((reviewsGrid.scrollLeft / maxScroll) * (pages - 1))) : 0;

    if (reviewsDots.children.length !== pages) {
        reviewsDots.replaceChildren();
        for (let index = 0; index < pages; index += 1) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'reviews-slider-dot';
            dot.addEventListener('click', () => {
                const currentPages = reviewCarouselPages();
                const currentMaxScroll = Math.max(0, reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
                reviewsGrid.scrollTo({ left: currentPages === 1 ? 0 : currentMaxScroll * index / (currentPages - 1), behavior: 'smooth' });
            });
            reviewsDots.append(dot);
        }
    }

    [...reviewsDots.children].forEach((dot, index) => {
        dot.setAttribute('aria-label', `${currentLanguage === 'bg' ? 'Покажи страница' : 'Show page'} ${index + 1}`);
        dot.classList.toggle('is-active', index === currentPage);
        dot.setAttribute('aria-current', index === currentPage ? 'true' : 'false');
    });
    reviewsGrid.setAttribute('aria-label', currentLanguage === 'bg' ? 'Плъзгащи се клиентски мнения' : 'Sliding customer reviews');
    reviewsPrev.setAttribute('aria-label', currentLanguage === 'bg' ? 'Предишни мнения' : 'Previous reviews');
    reviewsNext.setAttribute('aria-label', currentLanguage === 'bg' ? 'Следващи мнения' : 'Next reviews');
    const hasOverflow = maxScroll > 2;
    reviewsPrev.disabled = !hasOverflow;
    reviewsNext.disabled = !hasOverflow;
}

function moveReviewCarousel(direction) {
    if (!reviewsGrid) return;
    const maxScroll = Math.max(0, reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
    if (maxScroll <= 2) return;
    if (direction > 0 && reviewsGrid.scrollLeft >= maxScroll - 4) {
        reviewsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        return;
    }
    if (direction < 0 && reviewsGrid.scrollLeft <= 4) {
        reviewsGrid.scrollTo({ left: maxScroll, behavior: 'smooth' });
        return;
    }
    const card = reviewsGrid.querySelector('.review-card');
    const gap = parseFloat(getComputedStyle(reviewsGrid).gap) || 0;
    const distance = card ? card.getBoundingClientRect().width + gap : reviewsGrid.clientWidth;
    reviewsGrid.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

reviewsPrev?.addEventListener('click', () => moveReviewCarousel(-1));
reviewsNext?.addEventListener('click', () => moveReviewCarousel(1));
reviewsGrid?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveReviewCarousel(event.key === 'ArrowLeft' ? -1 : 1);
});

let reviewScrollFrame = 0;
function scheduleReviewCarouselUpdate() {
    cancelAnimationFrame(reviewScrollFrame);
    reviewScrollFrame = requestAnimationFrame(updateReviewCarousel);
}

reviewsGrid?.addEventListener('scroll', scheduleReviewCarouselUpdate, { passive: true });

if (reviewsGrid && 'ResizeObserver' in window) {
    new ResizeObserver(scheduleReviewCarouselUpdate).observe(reviewsGrid);
}

if (reviewsGrid) {
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragPointer = null;
    reviewsGrid.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button')) return;
        dragPointer = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = reviewsGrid.scrollLeft;
        reviewsGrid.setPointerCapture(dragPointer);
        reviewsGrid.classList.add('is-dragging');
    });
    reviewsGrid.addEventListener('pointermove', event => {
        if (event.pointerId !== dragPointer) return;
        reviewsGrid.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });
    const stopReviewDrag = event => {
        if (event.pointerId !== dragPointer) return;
        const dragDistance = event.clientX - dragStartX;
        const maxScroll = Math.max(0, reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
        reviewsGrid.classList.remove('is-dragging');
        dragPointer = null;
        if (maxScroll > 2 && dragStartScroll >= maxScroll - 4 && dragDistance < -35) {
            reviewsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (maxScroll > 2 && dragStartScroll <= 4 && dragDistance > 35) {
            reviewsGrid.scrollTo({ left: maxScroll, behavior: 'smooth' });
        }
        updateReviewCarousel();
    };
    reviewsGrid.addEventListener('pointerup', stopReviewDrag);
    reviewsGrid.addEventListener('pointercancel', stopReviewDrag);

    let touchStartX = 0;
    let touchStartedAt = 0;
    reviewsGrid.addEventListener('touchstart', event => {
        touchStartX = event.touches[0]?.clientX || 0;
        touchStartedAt = reviewsGrid.scrollLeft;
    }, { passive: true });
    reviewsGrid.addEventListener('touchend', event => {
        const touchEndX = event.changedTouches[0]?.clientX || touchStartX;
        const swipeDistance = touchEndX - touchStartX;
        const maxScroll = Math.max(0, reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
        if (maxScroll <= 2 || Math.abs(swipeDistance) < 35) return;
        if (touchStartedAt >= maxScroll - 4 && swipeDistance < 0) {
            reviewsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (touchStartedAt <= 4 && swipeDistance > 0) {
            reviewsGrid.scrollTo({ left: maxScroll, behavior: 'smooth' });
        }
    }, { passive: true });
}

function supabaseHeaders(extra = {}) {
    const headers = { apikey: supabaseKey, ...extra };
    if (supabaseKey.startsWith('eyJ')) headers.Authorization = `Bearer ${supabaseKey}`;
    return headers;
}

function readLikedReviews() {
    try {
        return new Set(JSON.parse(localStorage.getItem(likedReviewsKey) || '[]').map(String));
    } catch (error) {
        return new Set();
    }
}

function createReviewVisitorToken() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;
    const hex = [...bytes].map(byte => byte.toString(16).padStart(2, '0'));
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

function getReviewVisitorToken() {
    try {
        let token = localStorage.getItem(reviewVisitorKey);
        if (!token) {
            token = createReviewVisitorToken();
            localStorage.setItem(reviewVisitorKey, token);
        }
        return token;
    } catch (error) {
        return createReviewVisitorToken();
    }
}

async function likePublicReview(review, button) {
    if (!supabaseReady || button.disabled) return;
    button.disabled = true;

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/like_review`, {
            method: 'POST',
            headers: supabaseHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ p_review_id: review.id, p_visitor_token: getReviewVisitorToken() })
        });
        if (!response.ok) throw new Error('Like could not be saved');

        review.likes_count = Number(await response.json()) || 0;
        button.querySelector('b').textContent = review.likes_count;
        button.querySelector('span').textContent = '★★★★★★';
        button.classList.add('is-liked');
        button.setAttribute('aria-label', translations[currentLanguage].likedReview);

        const likedReviews = readLikedReviews();
        likedReviews.add(String(review.id));
        try {
            localStorage.setItem(likedReviewsKey, JSON.stringify([...likedReviews]));
        } catch (error) {
            // The database remains the source of truth if browser storage is unavailable.
        }
    } catch (error) {
        console.error(error);
        button.disabled = false;
    }
}

function renderPublicReviews() {
    if (!reviewsGrid || !reviewCardTemplate) return;
    reviewsGrid.querySelectorAll('.user-review').forEach(card => card.remove());

    publicReviews.slice().reverse().forEach(review => {
        const fragment = reviewCardTemplate.content.cloneNode(true);
        const card = fragment.querySelector('.review-card');
        const likeButton = card.querySelector('.review-like');
        const isLiked = readLikedReviews().has(String(review.id));
        card.querySelector('.review-label').textContent = translations[currentLanguage].publishedReview;
        card.querySelector('blockquote').textContent = review.comment;
        card.querySelector('.review-avatar').textContent = review.name.trim().charAt(0).toLocaleUpperCase(currentLanguage);
        card.querySelector('.review-profile b').textContent = review.name;
        card.querySelector('.review-profile span').textContent = review.project_type;
        likeButton.querySelector('b').textContent = Number(review.likes_count) || 0;
        likeButton.querySelector('span').textContent = isLiked ? '★★★★★★' : '☆☆☆☆☆☆';
        likeButton.classList.toggle('is-liked', isLiked);
        likeButton.disabled = isLiked;
        likeButton.setAttribute('aria-label', translations[currentLanguage][isLiked ? 'likedReview' : 'likeReview']);
        likeButton.addEventListener('click', () => likePublicReview(review, likeButton));
        reviewsGrid.prepend(fragment);
    });
    requestAnimationFrame(updateReviewCarousel);
}

async function loadPublicReviews() {
    if (!supabaseReady) return;
    try {
        const query = 'select=id,name,project_type,comment,likes_count,created_at&order=created_at.desc&limit=12';
        const response = await fetch(`${supabaseUrl}/rest/v1/reviews?${query}`, { headers: supabaseHeaders() });
        if (!response.ok) throw new Error('Reviews could not be loaded');
        publicReviews = await response.json();
        renderPublicReviews();
    } catch (error) {
        console.error(error);
    }
}

loadPublicReviews();
requestAnimationFrame(updateReviewCarousel);

const finishSlider = document.getElementById('finishSlider');
const finishCompare = document.getElementById('finishCompare');
const updateFinish = () => {
    const position = finishSlider.value;
    finishCompare.querySelector('.matte').style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    finishCompare.querySelector('.divider').style.left = `${position}%`;
    finishCompare.querySelector('.knob').style.left = `${position}%`;
};
if (finishSlider && finishCompare) {
    const knob = finishCompare.querySelector('.knob');
    let pointer = null;
    let offset = 0;
    finishSlider.addEventListener('input', updateFinish);
    knob.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
        event.preventDefault();
        const bounds = finishCompare.getBoundingClientRect();
        offset = event.clientX - bounds.left - bounds.width * Number(finishSlider.value) / 100;
        pointer = event.pointerId;
        knob.setPointerCapture(pointer);
        knob.classList.add('is-dragging');
        finishSlider.focus({ preventScroll: true });
    });
    knob.addEventListener('pointermove', event => {
        if (event.pointerId !== pointer) return;
        const bounds = finishCompare.getBoundingClientRect();
        if (!bounds.width) return;
        const position = (event.clientX - bounds.left - offset) / bounds.width * 100;
        finishSlider.value = Math.max(Number(finishSlider.min), Math.min(Number(finishSlider.max), position));
        finishSlider.dispatchEvent(new Event('input', { bubbles: true }));
    });
    const stopDrag = event => {
        if (event.pointerId !== pointer) return;
        pointer = null;
        knob.classList.remove('is-dragging');
        if (knob.hasPointerCapture(event.pointerId)) knob.releasePointerCapture(event.pointerId);
    };
    knob.addEventListener('pointerup', stopDrag);
    knob.addEventListener('pointercancel', stopDrag);
    knob.addEventListener('lostpointercapture', stopDrag);
    updateFinish();
}

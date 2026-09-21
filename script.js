const menu = document.getElementById('menu'), nav = document.getElementById('nav'); menu?.addEventListener('click', () => nav.classList.toggle('open')); nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const translations = {
    bg: { title: 'Velora Protect — Защитно фолио за повърхности', navSurfaces: 'Повърхности', navProcess: 'Процес', navGallery: 'Галерия', navAbout: 'За нас', navContact: 'Контакт', heroTitle: 'Защити повърхността.<br><em>Запази визията.</em>', heroLead: 'Професионално поставяне на <b>матово</b> и <b>прозрачно защитно фолио</b> за маси, барове, плотове и други интериорни повърхности.', getQuote: 'Поискай оферта →', badgeFilms: '<b>2 вида фолио</b>Матово и прозрачно', badgeClean: '<b>Чист монтаж</b>Без къртене и прах', badgeLook: '<b>Запазена визия</b>Подходящо за интериор', badgeLife: '<b>По-дълъг живот</b>За ежедневно ползване', usesEyebrow: 'КЪДЕ СЕ ИЗПОЛЗВА', usesTitle: 'За повърхности, които<br><em>се използват всеки ден.</em>', usesCopy: 'Работим върху подходящи гладки интериорни повърхности. Преди монтаж преценяваме състоянието и дали конкретният материал е подходящ за фолиране.', barsTitle: 'Барове', barsCopy: 'Бар-плотове, рецепции и работни зони.', tablesTitle: 'Маси', tablesCopy: 'Трапезни, офис и търговски маси.', topsTitle: 'Плотове', topsCopy: 'Подходящи интериорни работни повърхности.', otherTitle: 'Други повърхности', otherCopy: 'Шкафове, панели и други гладки основи след оглед.', processEyebrow: 'ПРОЦЕС', processTitle: 'Лесно. Чисто.<br><em>Без излишно усложняване.</em>', photoTitle: 'Снимка', photoCopy: 'Изпращаш снимки на повърхността и приблизителни размери.', choiceTitle: 'Избор', choiceCopy: 'Уточняваме дали искаш матово или прозрачно защитно фолио.', prepTitle: 'Подготовка', prepCopy: 'Повърхността се почиства и подготвя за прецизен монтаж.', installTitle: 'Монтаж', installCopy: 'Фолиото се поставя внимателно за чист и завършен резултат.', quoteEyebrow: 'ИСКАШ ОФЕРТА?', quoteTitle: 'Изпрати снимка<br><em style="color:#9a6f43">на повърхността.</em>', quoteCopy: 'Напиши приблизителни размери и кой вариант предпочиташ — матово или прозрачно. Така ще можем да преценим проекта по-точно.', namePlaceholder: 'Име', phonePlaceholder: 'Телефон', cityPlaceholder: 'Град', messagePlaceholder: 'Каква е повърхността, размери и кое фолио искаш?', send: 'Изпрати запитване →', sent: 'Готово ✓', demoNote: 'Формата е демо. Може да се свърже с имейл, WhatsApp или собствен backend.', footerCopy: 'Матово и прозрачно защитно фолио за интериорни повърхности.' },
    en: { title: 'Velora Protect — Premium Surface Protection', navSurfaces: 'Surfaces', navProcess: 'Process', navGallery: 'Gallery', navAbout: 'About us', navContact: 'Contact', heroTitle: 'Protect the surface.<br><em>Preserve the look.</em>', heroLead: 'Professional installation of <b>matte</b> and <b>clear protective film</b> for tables, bars, worktops and other interior surfaces.', getQuote: 'Request a quote →', badgeFilms: '<b>2 film finishes</b>Matte and clear', badgeClean: '<b>Clean installation</b>No demolition or dust', badgeLook: '<b>Original look</b>Made for interiors', badgeLife: '<b>Longer lifespan</b>For everyday use', usesEyebrow: 'WHERE IT WORKS', usesTitle: 'For surfaces<br><em>used every day.</em>', usesCopy: 'We work on suitable smooth interior surfaces. Before installation, we assess their condition and confirm whether the material is suitable for wrapping.', barsTitle: 'Bars', barsCopy: 'Bar tops, reception desks and work areas.', tablesTitle: 'Tables', tablesCopy: 'Dining, office and commercial tables.', topsTitle: 'Worktops', topsCopy: 'Suitable interior work surfaces.', otherTitle: 'Other surfaces', otherCopy: 'Cabinets, panels and other smooth surfaces after inspection.', processEyebrow: 'PROCESS', processTitle: 'Simple. Clean.<br><em>Without the hassle.</em>', photoTitle: 'Photo', photoCopy: 'Send photos of the surface and its approximate dimensions.', choiceTitle: 'Choose', choiceCopy: 'We confirm whether you prefer matte or clear protective film.', prepTitle: 'Preparation', prepCopy: 'The surface is cleaned and prepared for precise installation.', installTitle: 'Installation', installCopy: 'The film is carefully applied for a clean, refined finish.', quoteEyebrow: 'NEED A QUOTE?', quoteTitle: 'Send a photo<br><em style="color:#9a6f43">of the surface.</em>', quoteCopy: 'Add approximate dimensions and tell us whether you prefer matte or clear film. This helps us assess the project accurately.', namePlaceholder: 'Name', phonePlaceholder: 'Phone', cityPlaceholder: 'City', messagePlaceholder: 'What is the surface, its dimensions and your preferred film?', send: 'Send enquiry →', sent: 'Sent ✓', demoNote: 'This is a demo form. It can be connected to email, WhatsApp or a custom backend.', footerCopy: 'Matte and clear protective film for interior surfaces.' }
};
Object.assign(translations.bg, { navFAQ: 'Въпроси', hoursEyebrow: 'РАБОТНО ВРЕМЕ', hoursTitle: 'Кога сме на линия', weekdays: 'Понеделник – Петък', saturday: 'Събота', sunday: 'Неделя', byAppointment: 'С уговорка', closed: 'Почивен ден', backToTop: 'Обратно нагоре ↑' });
Object.assign(translations.en, { navFAQ: 'FAQ', hoursEyebrow: 'WORKING HOURS', hoursTitle: 'When we are available', weekdays: 'Monday – Friday', saturday: 'Saturday', sunday: 'Sunday', byAppointment: 'By appointment', closed: 'Closed', backToTop: 'Back to top ↑' });
Object.assign(translations.bg, {
    filmsEyebrow: 'ИЗБЕРИ ПОКРИТИЕ', filmsTitle: 'Два финиша.<br><em>Една цел — защита.</em>', filmsCopy: 'Изборът между матово и прозрачно фолио зависи от оригиналната повърхност, светлината и ефекта, който искаш да запазиш.',
    matteTag: 'МЕК ИЗИСКАН ФИНИШ', matteTitle: 'Матово фолио', matteCopy: 'Намалява отраженията и придава по-спокойно, кадифено усещане на повърхността.', matteFeature1: 'По-малко отблясъци', matteFeature2: 'Дискретна визия', matteFeature3: 'Premium усещане',
    clearTag: 'ЗАПАЗЕН ОРИГИНАЛЕН ВИД', clearTitle: 'Прозрачно фолио', clearCopy: 'Запазва цвета, шарката и дълбочината на оригиналната повърхност максимално видими.', clearFeature1: 'Ясна текстура', clearFeature2: 'Запазен блясък', clearFeature3: 'Невидима защита',
    matteLabel: 'МАТОВО', clearLabel: 'ПРОЗРАЧНО', compareEyebrow: 'СРАВНИ ФИНИША', compareTitle: 'Плъзни и виж<br><em>разликата.</em>', compareCopy: 'Интерактивният пример показва как матовият ефект омекотява отраженията, докато прозрачният запазва повече блясък.', comparePoint1: 'Избор според конкретната повърхност', comparePoint2: 'Консултация преди монтажа', comparePoint3: 'Тест на визията при необходимост'
});
Object.assign(translations.en, {
    filmsEyebrow: 'CHOOSE A FINISH', filmsTitle: 'Two finishes.<br><em>One goal — protection.</em>', filmsCopy: 'The choice between matte and clear film depends on the original surface, the lighting and the look you want to preserve.',
    matteTag: 'SOFT REFINED FINISH', matteTitle: 'Matte film', matteCopy: 'Reduces reflections and gives the surface a calmer, velvety appearance.', matteFeature1: 'Fewer reflections', matteFeature2: 'Understated look', matteFeature3: 'Premium feel',
    clearTag: 'PRESERVED ORIGINAL LOOK', clearTitle: 'Clear film', clearCopy: 'Keeps the original colour, pattern and depth of the surface as visible as possible.', clearFeature1: 'Clear texture', clearFeature2: 'Preserved gloss', clearFeature3: 'Invisible protection',
    matteLabel: 'MATTE', clearLabel: 'CLEAR', compareEyebrow: 'COMPARE FINISHES', compareTitle: 'Slide to see<br><em>the difference.</em>', compareCopy: 'The interactive example shows how a matte effect softens reflections while clear film preserves more gloss.', comparePoint1: 'Selected for the specific surface', comparePoint2: 'Consultation before installation', comparePoint3: 'Visual test when needed'
});
let currentLanguage = 'bg';
function setLanguage(language) { currentLanguage = language; const copy = translations[language]; document.documentElement.lang = language; document.title = copy.title; document.querySelectorAll('[data-i18n]').forEach(element => { element.innerHTML = copy[element.dataset.i18n] }); document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.placeholder = copy[element.dataset.i18nPlaceholder] }); document.querySelectorAll('[data-lang]').forEach(element => element.classList.toggle('active', element.dataset.lang === language)); }
document.getElementById('languageToggle')?.addEventListener('click', () => setLanguage(currentLanguage === 'bg' ? 'en' : 'bg'));
document.getElementById('form')?.addEventListener('submit', e => { e.preventDefault(); const b = e.currentTarget.querySelector('button'); b.textContent = translations[currentLanguage].sent; setTimeout(() => b.textContent = translations[currentLanguage].send, 1800) });

const revealElements = document.querySelectorAll('#films > .wrap > .eyebrow, #films > .wrap > h2, #films > .wrap > .copy, .film-card, .compare, #process > .wrap > .eyebrow, #process > .wrap > h2, .step, .quote-box, .footer .wrap');
revealElements.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    if (element.classList.contains('step')) {
        const stepIndex = [...element.parentElement.children].indexOf(element);
        element.style.setProperty('--reveal-delay', `${stepIndex * 120}ms`);
    }
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: .14, rootMargin: '0px 0px -45px' });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('is-visible'));
}

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

(() => {
    const main = document.querySelector('main');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!main || !('IntersectionObserver' in window) || !Element.prototype.animate || motion.matches) return;

    const textSelector = 'h1, h2, h3, p, .eyebrow';
    const selector = `${textSelector}, .use-card, .film-card, .benefit-card, .step, .guide-card, .value-card, .care-card, .detail-card, .project-card, .surface-example`;
    const registered = new WeakSet();
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            if (motion.matches) return;
            const element = entry.target;
            if (element.matches('.film-range-section h2')) {
                const animation = element.animate([
                    { opacity: 0, transform: 'translateY(38px) scale(.92)', filter: 'blur(8px)', textShadow: '0 0 0 transparent' },
                    { opacity: 1, transform: 'translateY(-3px) scale(1.025)', filter: 'blur(0px)', textShadow: '0 0 28px rgba(237, 203, 144, .8)', offset: .65 },
                    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)', textShadow: '0 0 0 transparent' }
                ], { duration: 1250, fill: 'backwards', easing: 'cubic-bezier(.16, 1, .3, 1)' });
                element.classList.add('film-title-revealed');
                animations.add(animation);
                animation.finished.catch(() => {}).finally(() => animations.delete(animation));
                return;
            }
            if (element.matches(textSelector)) {
                const isHeading = element.matches('h1, h2, h3');
                const isEyebrow = element.matches('.eyebrow');
                const textSiblings = Array.from(element.parentElement.children)
                    .filter(sibling => sibling.matches(textSelector));
                const position = Math.max(0, textSiblings.indexOf(element));
                const animation = element.animate([
                    {
                        opacity: 0,
                        transform: `perspective(900px) translate3d(0, ${isHeading ? 48 : 24}px, 0) rotateX(${isHeading ? 12 : 0}deg)`,
                        filter: `blur(${isHeading ? 7 : 3}px)`,
                        clipPath: isHeading ? 'inset(0 -24px 100% -24px)' : 'inset(-24px)',
                        offset: 0
                    },
                    {
                        opacity: 1,
                        transform: 'perspective(900px) translate3d(0, -2px, 0) rotateX(0deg)',
                        filter: 'blur(0px)',
                        clipPath: 'inset(-24px)',
                        offset: .8
                    },
                    {
                        opacity: 1,
                        transform: 'perspective(900px) translate3d(0, 0, 0) rotateX(0deg)',
                        filter: 'blur(0px)',
                        clipPath: 'inset(-24px)',
                        offset: 1
                    }
                ], {
                    duration: isHeading ? 1150 : 850,
                    delay: isEyebrow ? 0 : Math.min(position, 3) * 100,
                    fill: 'backwards',
                    easing: 'cubic-bezier(.16, 1, .3, 1)'
                });
                animations.add(animation);
                animation.finished.catch(() => {}).finally(() => animations.delete(animation));
                return;
            }
            const isPanel = element.matches('main > section > .wrap, .page-reveal');
            const siblings = Array.from(element.parentElement.children)
                .filter(sibling => sibling.matches(selector));
            const position = Math.max(0, siblings.indexOf(element));
            const sideways = isPanel ? 0 : (position % 2 ? 22 : -22);
            const animation = element.animate([
                {
                    opacity: 0,
                    transform: `translate3d(${sideways}px, ${isPanel ? 70 : 90}px, 0) scale(${isPanel ? .97 : .9})`,
                    filter: `blur(${isPanel ? 3 : 6}px)`,
                    offset: 0
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, -5px, 0) scale(1.005)',
                    filter: 'blur(0px)',
                    offset: .78
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0) scale(1)',
                    filter: 'blur(0px)',
                    offset: 1
                }
            ], {
                duration: isPanel ? 1000 : 850,
                delay: isPanel ? 0 : Math.min(position, 3) * 110,
                fill: 'backwards',
                easing: 'cubic-bezier(.16, 1, .3, 1)'
            });
            animations.add(animation);
            animation.finished.catch(() => {}).finally(() => animations.delete(animation));
        });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    function register(element) {
        if (registered.has(element)) return;
        registered.add(element);
        // Text gets an entrance on load too; cards already on screen stay still.
        if (element.matches(textSelector) || element.getBoundingClientRect().top >= window.innerHeight - 24) {
            observer.observe(element);
        }
    }

    main.querySelectorAll(selector).forEach(register);
    const updates = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.matches(selector)) register(node);
            node.querySelectorAll(selector).forEach(register);
        }));
    });
    updates.observe(main, { childList: true, subtree: true });
    motion.addEventListener('change', () => {
        if (!motion.matches) return;
        observer.disconnect();
        updates.disconnect();
        animations.forEach(animation => animation.cancel());
    });
})();

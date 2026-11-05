(() => {
    const main = document.querySelector('main');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!main || !('IntersectionObserver' in window) || !Element.prototype.animate || motion.matches) return;

    const registered = new WeakSet();
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            if (motion.matches) return;
            const animation = entry.target.animate([
                { opacity: 0, transform: 'translateY(48px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 850,
                fill: 'backwards',
                easing: 'cubic-bezier(.16, 1, .3, 1)'
            });
            animations.add(animation);
            animation.finished.catch(() => {}).finally(() => animations.delete(animation));
        });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    function register(section) {
        if (section.parentElement !== main || section.tagName !== 'SECTION' || registered.has(section)) return;
        registered.add(section);
        // Sections already visible on load stay still.
        if (section.getBoundingClientRect().top >= window.innerHeight - 24) {
            observer.observe(section);
        }
    }

    Array.from(main.children).forEach(register);
    const updates = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) register(node);
        }));
    });
    updates.observe(main, { childList: true });
    motion.addEventListener('change', () => {
        if (!motion.matches) return;
        observer.disconnect();
        updates.disconnect();
        animations.forEach(animation => animation.cancel());
    });
})();

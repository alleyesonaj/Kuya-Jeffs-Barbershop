const hero = document.querySelector('.hero-banner');
const subprofiles = document.querySelectorAll('.hero-side-image');

if (hero && subprofiles.length) {
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (event) => {
        const bounds = hero.getBoundingClientRect();

        pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
        pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    });

    hero.addEventListener('mouseleave', () => {
        pointerX = 0;
        pointerY = 0;
    });

    function animate(time) {
        currentX += (pointerX - currentX) * 0.07;
        currentY += (pointerY - currentY) * 0.07;

        subprofiles.forEach((profile, index) => {
            const direction = index === 0 ? 1 : -1;
            const floatingY = Math.sin(time * 0.0015 + index) * 7;

            profile.style.transform = `
                translate3d(
                    ${currentX * 18 * direction}px,
                    ${currentY * 14 + floatingY}px,
                    0
                )
                scale3d(1.03, 1.03, 1)
            `;
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

const revealSections = document.querySelectorAll(
    '.move-section, .strategy-section, footer'
);

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealSections.forEach((section) => revealObserver.observe(section));
} else {
    revealSections.forEach((section) => section.classList.add('is-visible'));
}
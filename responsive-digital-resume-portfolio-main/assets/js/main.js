/*=============== TABS BUTTONS WITH SMOOTH ANIMATION ===============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target;
        const targetContent = document.querySelector(targetSelector);
        const currentContent = document.querySelector(
            '[data-content].main--active'
        );

        // Pastikan target ditemukan
        if (!targetContent) {
            console.error('Target content tidak ditemukan:', targetSelector);
            return;
        }

        // Hindari klik ulang pada tab yang sama
        if (targetContent === currentContent) return;

        // Ubah tombol aktif
        tabs.forEach((t) => {
            t.classList.remove('main--active');
        });

        tab.classList.add('main--active');

        // Jika tidak ada content aktif, langsung tampilkan target
        if (!currentContent) {
            targetContent.classList.add('main--active');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    targetContent.classList.add('show');
                });
            });
            return;
        }

        // Fade out content lama
        currentContent.classList.remove('show');

        let switched = false;

        const switchContent = () => {
            if (switched) return;
            switched = true;

            currentContent.classList.remove('main--active');
            currentContent.removeEventListener('transitionend', handleTransition);

            // Tampilkan content baru
            targetContent.classList.add('main--active');

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    targetContent.classList.add('show');
                });
            });
        };

        const handleTransition = (event) => {
            if (
                event.target === currentContent &&
                event.propertyName === 'opacity'
            ) {
                switchContent();
            }
        };

        currentContent.addEventListener('transitionend', handleTransition);

        // Fallback jika transitionend tidak terpanggil
        setTimeout(switchContent, 450);
    });
});

/*=============== INITIAL FADE IN ON LOAD ===============*/
window.addEventListener('load', () => {
    const initialContent = document.querySelector('[data-content].main--active');
    if (!initialContent) return;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            initialContent.classList.add('show');
        });
    });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'right',
    distance: '200px',
    duration: 1500,
    delay: 300,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // reset: true, // Animations repeat
})

sr.reveal('.main__content', { origin: 'top' })
sr.reveal('.profile', { delay: 600 })
sr.reveal('.profile__image', { rotate: { z: -55 }, scale: 0, delay: 900 })
sr.reveal('.profile__greeting', { delay: 900 })
sr.reveal('.profile__name', { delay: 1100 })
sr.reveal('.profile__buttons', { delay: 1300, scale: 0 })
sr.reveal('.profile__data .section__title', { delay: 1500 })
sr.reveal('.profile__description', { delay: 1700 })
sr.reveal('.main__area', { origin: 'left', delay: 2000 })
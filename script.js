document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    const portrait = document.querySelector('.hero-portrait');
    const portraitCard = portrait?.querySelector('.portrait-card');

    if (portrait && portraitCard) {
        portraitCard.addEventListener('click', () => {
            const isFlipped = portrait.classList.toggle('is-flipped');
            portraitCard.setAttribute('aria-pressed', String(isFlipped));
        });
    }

    const pronunciationButton = document.querySelector('.pronunciation-button');
    const pronunciationAudio = document.querySelector('#pronunciation-audio');

    if (pronunciationButton && pronunciationAudio) {
        pronunciationButton.addEventListener('click', () => {
            pronunciationAudio.currentTime = 0;
            const playPromise = pronunciationAudio.play();
            pronunciationButton.classList.add('is-playing');

            if (playPromise) {
                playPromise.catch(() => {
                    pronunciationButton.classList.remove('is-playing');
                });
            }
        });

        pronunciationAudio.addEventListener('ended', () => {
            pronunciationButton.classList.remove('is-playing');
        });

        pronunciationAudio.addEventListener('pause', () => {
            pronunciationButton.classList.remove('is-playing');
        });
    }

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const nav = document.querySelector('.site-nav');
                const offset = nav ? nav.offsetHeight + 16 : 80;

                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

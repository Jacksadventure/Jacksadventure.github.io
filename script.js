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
        const rect = reveal.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            reveal.classList.add('active');
            return;
        }

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

    const blogSearch = document.querySelector('#blog-search');
    const blogPosts = Array.from(document.querySelectorAll('[data-blog-post]'));
    const blogTagButtons = Array.from(document.querySelectorAll('[data-blog-tag]'));
    const blogEmptyState = document.querySelector('[data-blog-empty]');
    const blogCount = document.querySelector('[data-blog-count]');

    if (blogSearch && blogPosts.length > 0) {
        let activeTag = 'all';

        const updateBlogFilters = () => {
            const query = blogSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            blogPosts.forEach(post => {
                const tags = post.dataset.tags.split(',').map(tag => tag.trim());
                const searchableText = [post.dataset.title, post.dataset.summary, post.dataset.tags]
                    .join(' ')
                    .toLowerCase();
                const matchesSearch = query.length === 0 || searchableText.includes(query);
                const matchesTag = activeTag === 'all' || tags.includes(activeTag);
                const isVisible = matchesSearch && matchesTag;

                post.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (blogEmptyState) {
                blogEmptyState.hidden = visibleCount !== 0;
            }

            if (blogCount) {
                blogCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'post' : 'posts'}`;
            }
        };

        blogSearch.addEventListener('input', updateBlogFilters);

        blogTagButtons.forEach(button => {
            button.addEventListener('click', () => {
                activeTag = button.dataset.blogTag;
                blogTagButtons.forEach(tagButton => {
                    tagButton.classList.toggle('active', tagButton === button);
                });
                updateBlogFilters();
            });
        });

        updateBlogFilters();
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

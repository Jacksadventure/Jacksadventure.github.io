document.addEventListener("DOMContentLoaded", () => {
    // Reveal components on scroll using IntersectionObserver
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Stop observing once element is animated in
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Simple smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Make the background orbs slightly move with mouse cursor for dynamic effect
    const orbs = document.querySelectorAll('.orb');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (window.innerWidth / 2 - e.pageX) / speed;
            const yOffset = (window.innerHeight / 2 - e.pageY) / speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});

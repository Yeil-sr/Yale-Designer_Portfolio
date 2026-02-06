function setupSliderDrag() {
    const slider = document.querySelector(".projects-slider");
    if (!slider) return;
    let isDown = !1;
    let startX;
    let scrollLeft;
    slider.addEventListener("mousedown", (e) => {
        isDown = !0;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
        isDown = !1;
        slider.classList.remove("dragging");
    });
    slider.addEventListener("mouseup", () => {
        isDown = !1;
        slider.classList.remove("dragging");
    });
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    slider.addEventListener("touchstart", (e) => {
        isDown = !0;
        slider.classList.add("dragging");
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("touchend", () => {
        isDown = !1;
        slider.classList.remove("dragging");
    });
    slider.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    if (arrowLeft) {
        arrowLeft.addEventListener("click", () => {
            slider.scrollBy({ left: -350, behavior: "smooth" });
        });
    }
    if (arrowRight) {
        arrowRight.addEventListener("click", () => {
            slider.scrollBy({ left: 350, behavior: "smooth" });
        });
    }
}
function setupScrollAnimations() {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("section-animate")) {
                    entry.target.classList.add("animated");
                }
                if (entry.target.classList.contains("fade-in")) {
                    entry.target.classList.add("visible");
                }
                if (entry.target.classList.contains("process-card")) {
                    entry.target.classList.add("visible");
                }
                if (entry.target.classList.contains("project-card")) {
                    entry.target.classList.add("visible");
                }
                if (entry.target.classList.contains("plan-card")) {
                    entry.target.classList.add("visible");
                }
                if (entry.target.classList.contains("slide")) {
                    entry.target.classList.add("visible");
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const sections = document.querySelectorAll("#div1, #div2, #div3, #div4, #div5, #div6, #div7");
    sections.forEach((section) => {
        section.classList.add("section-animate");
        observer.observe(section);
    });
    const processCards = document.querySelectorAll(".process-card");
    processCards.forEach((card, index) => {
        card.classList.add("fade-in");
        card.classList.add(`delay-${(index % 3) + 1}`);
        observer.observe(card);
    });
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
        card.classList.add("fade-in");
        card.classList.add(`delay-${(index % 3) + 1}`);
        observer.observe(card);
    });
    const planCards = document.querySelectorAll(".plan-card");
    planCards.forEach((card, index) => {
        card.classList.add("fade-in");
        observer.observe(card);
    });
    const serviceSlides = document.querySelectorAll(".slide");
    serviceSlides.forEach((slide) => {
        slide.classList.add("fade-in");
        observer.observe(slide);
    });
    const animatedElements = document.querySelectorAll(".floating-badge, .about-badge, .tech-tags");
    animatedElements.forEach((el) => {
        el.classList.add("fade-in");
        observer.observe(el);
    });
    function checkInitialVisibility() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add("animated");
            }
        });
    }
    setTimeout(checkInitialVisibility, 100);
    window.addEventListener("resize", checkInitialVisibility);
}
function setupAccordion() {
    document.querySelectorAll(".accordion-button").forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-bs-target");
            const target = document.querySelector(targetId);
            const parent = button.closest(".accordion");
            parent.querySelectorAll(".accordion-collapse").forEach((collapse) => {
                if (collapse !== target) {
                    collapse.classList.remove("show");
                    collapse.previousElementSibling.querySelector(".accordion-button").classList.add("collapsed");
                    collapse.previousElementSibling
                        .querySelector(".accordion-button")
                        .setAttribute("aria-expanded", "false");
                }
            });
            const isOpen = target.classList.contains("show");
            target.classList.toggle("show");
            button.classList.toggle("collapsed");
            button.setAttribute("aria-expanded", !isOpen);
        });
    });
}
function setupMobileMenuNew() {
    const mobileHamburgerBtn = document.getElementById("mobileHamburgerBtn");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const sidebar = document.getElementById("sidebar");
    const menuLinks = document.querySelectorAll("#menuL a");
    function isMobile() {
        return window.innerWidth <= 992;
    }
    function openMenu() {
        if (isMobile()) {
            sidebar.classList.add("active");
            menuOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }
    function closeMenu() {
        if (isMobile()) {
            sidebar.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }
    if (mobileHamburgerBtn && isMobile()) {
        mobileHamburgerBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openMenu();
        });
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener("click", function (e) {
                e.preventDefault();
                closeMenu();
            });
        }
        if (menuOverlay) {
            menuOverlay.addEventListener("click", closeMenu);
        }
        menuLinks.forEach((link) => {
            if (!link.target || link.target !== "_blank") {
                link.addEventListener("click", function (e) {
                    if (this.getAttribute("href").startsWith("#")) {
                        closeMenu();
                    }
                });
            }
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && sidebar.classList.contains("active")) {
                closeMenu();
            }
        });
    }
    function adjustMobileHeights() {
        if (isMobile()) {
            const sections = [
                document.getElementById("banner"),
                document.getElementById("div1"),
                document.getElementById("div2"),
                document.getElementById("div3"),
                document.getElementById("div4"),
                document.getElementById("div5"),
                document.getElementById("div6"),
                document.getElementById("div7"),
            ];
            sections.forEach((section) => {
                if (section) {
                    section.style.minHeight = "auto";
                    const contentHeight = section.scrollHeight;
                    const viewportHeight = window.innerHeight;
                    if (contentHeight < viewportHeight * 0.8) {
                        section.style.minHeight = viewportHeight * 0.8 + "px";
                    }
                }
            });
        }
    }
    adjustMobileHeights();
    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            adjustMobileHeights();
            if (!isMobile() && sidebar) {
                sidebar.classList.remove("active");
                if (menuOverlay) {
                    menuOverlay.classList.remove("active");
                }
                document.body.style.overflow = "auto";
            }
        }, 250);
    });
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "#!") return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                if (isMobile() && sidebar.classList.contains("active")) {
                    closeMenu();
                }
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: "smooth" });
            }
        });
    });
}
function initProjectCarousel() {
    const slider = document.querySelector(".projects-slider");
    const leftButton = document.querySelector(".arrow-left");
    const rightButton = document.querySelector(".arrow-right");
    let projectCards = document.querySelectorAll(".project-card");
    let currentPosition = 0;
    let isScrolling = !1;
    function duplicateCardsForInfiniteEffect() {
        const cardsToDuplicate = Array.from(projectCards);
        cardsToDuplicate.forEach((card) => {
            const clone = card.cloneNode(!0);
            slider.appendChild(clone);
        });
        projectCards = document.querySelectorAll(".project-card");
    }
    function getCardWidth() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            return slider.offsetWidth + 30;
        } else if (window.innerWidth <= 1024) {
            return slider.offsetWidth / 2 + 15;
        } else {
            return slider.offsetWidth / 3 + 10;
        }
    }
    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    function getMaxPosition() {
        const cardWidth = getCardWidth();
        const visibleCards = getVisibleCardsCount();
        const originalCardsCount = projectCards.length / 2;
        return -((cardWidth - 30) * (originalCardsCount - visibleCards));
    }
    function smoothScrollTo(position) {
        isScrolling = !0;
        slider.scrollTo({ left: -position, behavior: "smooth" });
        setTimeout(() => {
            isScrolling = !1;
        }, 500);
    }
    function nextSlide() {
        if (isScrolling) return;
        const cardWidth = getCardWidth();
        const maxPosition = getMaxPosition();
        currentPosition -= cardWidth;
        if (currentPosition <= maxPosition - cardWidth) {
            setTimeout(() => {
                currentPosition = 0;
                slider.scrollTo({ left: -currentPosition, behavior: "auto" });
            }, 500);
        }
        smoothScrollTo(currentPosition);
    }
    function prevSlide() {
        if (isScrolling) return;
        const cardWidth = getCardWidth();
        const maxPosition = getMaxPosition();
        if (currentPosition >= 0) {
            currentPosition = maxPosition - cardWidth;
        } else {
            currentPosition += cardWidth;
        }
        smoothScrollTo(currentPosition);
    }
    function initCarousel() {
        duplicateCardsForInfiniteEffect();
        if (rightButton) rightButton.addEventListener("click", nextSlide);
        if (leftButton) leftButton.addEventListener("click", prevSlide);
        slider.setAttribute("tabindex", "0");
        slider.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        });
    }
    function initPortfolioNavigation() {
        const navLinks = document.querySelectorAll("#div2 nav a");
        const portfolioSections = document.querySelectorAll(".portfolio-section");
        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                navLinks.forEach((l) => l.classList.remove("active"));
                portfolioSections.forEach((s) => s.classList.remove("active"));
                this.classList.add("active");
                const target = this.getAttribute("data-target");
                document.getElementById(target).classList.add("active");
                if (target === "website") {
                    currentPosition = 0;
                    smoothScrollTo(currentPosition);
                }
            });
        });
    }
    function handleResize() {
        currentPosition = 0;
        smoothScrollTo(currentPosition);
        const originalCards = Array.from(document.querySelectorAll(".project-card"));
        const half = Math.floor(originalCards.length / 2);
        const sliderChildren = Array.from(slider.children);
        slider.innerHTML = "";
        originalCards.slice(0, half || originalCards.length).forEach((card) => {
            slider.appendChild(card);
        });
        projectCards = document.querySelectorAll(".project-card");
        duplicateCardsForInfiniteEffect();
    }
    initCarousel();
    initPortfolioNavigation();
    window.addEventListener("resize", handleResize);
}
function slide3d() {
    const imagens = [
        "/src/public/assets/img/1080x1080/infantil.png",
        "/src/public/assets/img/1080x1080/d27.png",
        "/src/public/assets/img/1080x1080/h1.png",
        "/src/public/assets/img/1080x1080/d11.png",
        "/src/public/assets/img/design/gta1.png",
        "/src/public/assets/img/1080x1080/otto.png",
        "/src/public/assets/img/design/MaiDefinitive.png",
        "/src/public/assets/img/1080x1080/lobo.png",
        "/src/public/assets/img/design/my.png",
        "/src/public/assets/img/design/un.png",
        "/src/public/assets/img/design/fg.png",
        "/src/public/assets/img/design/nago.png",
        "/src/public/assets/img/1080x1080/load.gif",
    ];
    let fotoClasses = ["foto1", "foto2", "foto3", "foto4", "foto5"];
    let indiceAtual = 0;
    const fotos = document.querySelectorAll(".foto");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const mais = document.querySelector(".mais");
    const close = document.querySelector("#close");
    const image = document.querySelectorAll(".ft");
    const classesOriginais = [...fotoClasses];
    if (prev) {
        prev.addEventListener("click", () => {
            prev.classList.toggle("active");
            const firstClass = fotoClasses.shift();
            fotoClasses.push(firstClass);
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[(index + fotoClasses.length - 1) % fotoClasses.length]);
                foto.classList.add(fotoClasses[index]);
            });
            indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
            fotos.forEach((foto, index) => {
                const nextIndex = (index + 1) % imagens.length;
                foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
            });
        });
    }
    if (next) {
        next.addEventListener("click", () => {
            next.classList.toggle("active");
            const lastClass = fotoClasses.pop();
            fotoClasses.unshift(lastClass);
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[(index + 1) % fotoClasses.length]);
                foto.classList.add(fotoClasses[index]);
            });
            indiceAtual = (indiceAtual + 1) % imagens.length;
            fotos.forEach((foto, index) => {
                const nextIndex = (index + 1) % imagens.length;
                foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
            });
        });
    }
    if (image.length > 0) {
        image.forEach((ft, index) => {
            ft.addEventListener("click", () => {
                const sl = document.querySelector("#slide");
                sl.classList.add("active");
                const clickedImgSrc = ft.getAttribute("src");
                const imgIndex = imagens.findIndex((imgSrc) => imgSrc === clickedImgSrc);
                indiceAtual = imgIndex;
                document.querySelector("#slide img").src = clickedImgSrc;
                fotos.forEach((foto, index) => {
                    foto.src = imagens[(indiceAtual + index) % imagens.length];
                });
            });
        });
    }
    if (mais) {
        mais.addEventListener("click", () => {
            const sl = document.querySelector("#slide");
            sl.classList.toggle("active");
        });
    }
    if (close) {
        close.addEventListener("click", () => {
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[index]);
                foto.classList.add(classesOriginais[index]);
            });
            fotoClasses = [...classesOriginais];
            indiceAtual = 0;
            fotos.forEach((foto, index) => {
                foto.src = imagens[(indiceAtual + index) % imagens.length];
            });
            const sl = document.querySelector("#slide");
            sl.classList.remove("active");
            prev.classList.remove("active");
            next.classList.remove("active");
        });
    }
}
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(
        function () {
            const originalText = element.innerHTML;
            element.innerHTML = "Link copiado";
            setTimeout(function () {
                element.innerHTML = originalText;
            }, 2000);
        },
        function (err) {
            console.error("Erro ao copiar o texto: ", err);
        }
    );
}
function setupEmailCopy() {
    const emailBotao = document.getElementById("email");
    if (emailBotao) {
        emailBotao.addEventListener("click", (event) => {
            const contact_email = document.querySelector("#contact-email");
            contact_email.classList.toggle("active");
        });
    }
    const contact_email = document.getElementById("contact-email");
    if (contact_email) {
        contact_email.addEventListener("click", function (event) {
            event.preventDefault();
            copyToClipboard("yale.designers@gmail.com", this);
        });
    }
}
function setupMobileMenu() {
    const btn = document.querySelector(".btn");
    if (btn) {
        btn.addEventListener("click", () => {
            const menuL = document.querySelector("#menuL");
            menuL.classList.toggle("active");
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    setupSliderDrag();
    setupScrollAnimations();
    setupAccordion();
    setupMobileMenuNew();
    initProjectCarousel();
    setupEmailCopy();
    setupMobileMenu();
});
window.addEventListener("load", function () {
    slide3d();
});
window.addEventListener("resize", function () {
    if (typeof slide3d === "function") {
        slide3d();
    }
});

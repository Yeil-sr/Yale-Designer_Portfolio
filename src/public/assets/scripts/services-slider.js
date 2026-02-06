class ServicesSlider {
    constructor(container) {
        this.container = container;
        this.slidesWrapper = container.querySelector(".slides-wrapper");
        this.slides = Array.from(container.querySelectorAll(".slide"));
        this.dots = Array.from(container.querySelectorAll(".dot"));
        this.prevBtn = container.querySelector(".slider-arrow.prev");
        this.nextBtn = container.querySelector(".slider-arrow.next");
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        this.isAnimating = !1;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.swipeThreshold = 50;
        this.init();
    }
    init() {
        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());
        this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => this.goToSlide(index));
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.prevSlide();
            if (e.key === "ArrowRight") this.nextSlide();
        });
        this.container.addEventListener(
            "touchstart",
            (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            },
            { passive: !0 }
        );
        this.container.addEventListener(
            "touchend",
            (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            },
            { passive: !0 }
        );
        if (!this.prefersReducedMotion()) {
            this.startAutoplay();
        }
        this.container.addEventListener("mouseenter", () => this.stopAutoplay());
        this.container.addEventListener("mouseleave", () => {
            if (!this.prefersReducedMotion()) {
                this.startAutoplay();
            }
        });
        this.container.addEventListener("focusin", () => this.stopAutoplay());
        this.container.addEventListener("focusout", () => {
            if (!this.prefersReducedMotion()) {
                this.startAutoplay();
            }
        });
        this.updateAria();
    }
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = !0;
        this.currentIndex = index;
        this.updateSlides();
        this.updateDots();
        this.updateAria();
        this.container.dispatchEvent(new CustomEvent("slideChange", { detail: { currentIndex: this.currentIndex } }));
        setTimeout(() => {
            this.isAnimating = !1;
        }, 600);
    }
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    updateSlides() {
        this.slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        this.slides[this.currentIndex].classList.add("active");
        this.slidesWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    updateDots() {
        this.dots.forEach((dot) => {
            dot.classList.remove("active");
            dot.setAttribute("aria-selected", "false");
        });
        this.dots[this.currentIndex].classList.add("active");
        this.dots[this.currentIndex].setAttribute("aria-selected", "true");
    }
    updateAria() {
        this.slides.forEach((slide, index) => {
            slide.setAttribute("aria-hidden", index !== this.currentIndex ? "true" : "false");
        });
    }
    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    destroy() {
        this.stopAutoplay();
        this.prevBtn.removeEventListener("click", () => this.prevSlide());
        this.nextBtn.removeEventListener("click", () => this.nextSlide());
        this.dots.forEach((dot, index) => {
            dot.removeEventListener("click", () => this.goToSlide(index));
        });
        document.removeEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.prevSlide();
            if (e.key === "ArrowRight") this.nextSlide();
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.querySelector(".services-slider");
    if (sliderContainer) {
        window.servicesSlider = new ServicesSlider(sliderContainer);
    }
});
if (typeof module !== "undefined" && module.exports) {
    module.exports = ServicesSlider;
}

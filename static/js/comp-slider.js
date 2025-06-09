const btn = document.querySelector('#btt-button');
const bttArr = document.querySelector('#btt-arr');

// Появление стрелочки навверх в середине страницы
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

btn.addEventListener('mouseover', function (e) {
    bttArr.classList.add("btt-hover");
});

btn.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    bttArr.classList.remove('btt-hover');
});

btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

class Slider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Go one level up from the slider container
        this.root = this.container.closest('.content');

        this.sliderLine = this.container.querySelector('.slider__line');
        this.sliderItems = this.container.querySelectorAll('.slider__item');
        this.sliderDots = this.root.querySelectorAll('.slider__dot');
        this.btnNext = this.root.querySelector('.slider__btn-next');
        this.btnPrev = this.root.querySelector('.slider__btn-prev');

        this.currentIndex = 0;
        this.sliderWidth = 0;

        this.init();
    }

    init() {
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());

        this.btnNext?.addEventListener('click', () => this.nextSlide());
        this.btnPrev?.addEventListener('click', () => this.prevSlide());

        this.sliderDots?.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlide();
            });
        });

        this.updateSlide();
    }

    updateSize() {
        this.sliderWidth = this.container.offsetWidth;
        this.sliderItems.forEach(item => item.style.width = `${this.sliderWidth}px`);
        this.sliderLine.style.width = `${this.sliderWidth * this.sliderItems.length}px`;
        this.updateSlide();
    }

    updateSlide() {
        this.sliderLine.style.transform = `translateX(-${this.currentIndex * this.sliderWidth}px)`;
        this.sliderDots.forEach(dot => dot.classList.remove('active-dot'));
        if (this.sliderDots[this.currentIndex]) {
            this.sliderDots[this.currentIndex].classList.add('active-dot');
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.sliderItems.length;
        this.updateSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.sliderItems.length) % this.sliderItems.length;
        this.updateSlide();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Slider('unislider');
    new Slider('multslider');
    new Slider('expslider');
});

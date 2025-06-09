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

        this.sliderItems = this.container.querySelectorAll('.slider__item');
        this.sliderLine = this.container.querySelector('.slider__line');
        this.sliderDots = this.container.querySelectorAll('.slider__dot');
        this.sliderBtnNext = this.container.querySelector('.slider__btn-next');
        this.sliderBtnPrev = this.container.querySelector('.slider__btn-prev');

        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.showSlide());
        this.showSlide();

        this.sliderBtnNext?.addEventListener('click', () => this.nextSlide());
        this.sliderBtnPrev?.addEventListener('click', () => this.prevSlide());

        this.sliderDots?.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.sliderCount = index;
                this.rollSlider();
                this.updateDots();
            });
        });
    }

    showSlide() {
        this.sliderWidth = this.container.offsetWidth;
        this.sliderLine.style.width = this.sliderWidth * this.sliderItems.length + 'px';
        this.sliderItems.forEach(item => item.style.width = this.sliderWidth + 'px');
        this.rollSlider();
    }

    rollSlider() {
        this.sliderLine.style.transform = `translateX(-${this.sliderCount * this.sliderWidth}px)`;
    }

    updateDots() {
        this.sliderDots.forEach(dot => dot.classList.remove('active-dot'));
        if (this.sliderDots[this.sliderCount]) {
            this.sliderDots[this.sliderCount].classList.add('active-dot');
        }
    }

    nextSlide() {
        this.sliderCount++;
        if (this.sliderCount >= this.sliderItems.length) this.sliderCount = 0;
        this.rollSlider();
        this.updateDots();
    }

    prevSlide() {
        this.sliderCount--;
        if (this.sliderCount < 0) this.sliderCount = this.sliderItems.length - 1;
        this.rollSlider();
        this.updateDots();
    }
}

var unislider = new Slider('unislider');
var multslider = new Slider('multslider');
var expslider = new Slider('expslider');
document.addEventListener("DOMContentLoaded", function () {
    const swiperElement = document.querySelector(".bathDetailSwiper");

    if (!swiperElement) return;

    new Swiper(swiperElement, {
        slidesPerView: 1,
        speed: 900,
        effect: "slide",

        navigation: {
            nextEl: ".bath_next",
            prevEl: ".bath_prev"
        },

        pagination: {
            el: ".bath_pagination",
            type: "fraction"
        },

        keyboard: {
            enabled: true
        },

        a11y: {
            enabled: true,
            prevSlideMessage: "이전 무드",
            nextSlideMessage: "다음 무드"
        }
    });
});
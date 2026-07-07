const bathDetailSwiper = new Swiper(".bathDetailSwiper", {
    slidesPerView: 1,
    speed: 900,
    effect: "slide",

    navigation: {
        nextEl: ".bathDetailSwiper .bath_next",
        prevEl: ".bathDetailSwiper .bath_prev",
    },

    pagination: {
        el: ".bathDetailSwiper .bath_pagination",
        type: "fraction",
        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                ' / ' +
                '<span class="' + totalClass + '"></span>';
        }
    }
});
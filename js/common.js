document.addEventListener("DOMContentLoaded", function () {
    /* =========================
        HEADER SCROLL
    ========================= */
    const header = document.querySelector("#header");
    const mainBanner = document.querySelector("#main_banner");

    if (header && mainBanner) {
        window.addEventListener("scroll", function () {
            const bannerBottom = mainBanner.offsetHeight;

            if (window.scrollY >= bannerBottom) {
                header.classList.add("active");
            } else {
                header.classList.remove("active");
            }
        });
    }


    const topBtn = document.querySelector(".top_btn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            topBtn.classList.add("is_show");
        } else {
            topBtn.classList.remove("is_show");
        }
    });

    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("#header");
    const mainBanner = document.querySelector("#main_banner");
    const topBtn = document.querySelector(".top_btn");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =========================
        HEADER
    ========================= */
    if (header) {
        if (mainBanner) {
            const headerObserver = new IntersectionObserver(
                ([entry]) => {
                    header.classList.toggle(
                        "active",
                        !entry.isIntersecting
                    );
                },
                {
                    threshold: 0,
                    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`
                }
            );

            headerObserver.observe(mainBanner);
        } else {
            /* 메인 배너가 없는 서브페이지 */
            header.classList.add("active");
        }
    }

    /* =========================
        TOP BUTTON
    ========================= */
    if (topBtn) {
        function updateTopButton() {
            topBtn.classList.toggle(
                "is_show",
                window.scrollY > 500
            );
        }

        window.addEventListener("scroll", updateTopButton, {
            passive: true
        });

        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });

        updateTopButton();
    }
});
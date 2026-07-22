document.addEventListener("DOMContentLoaded", function () {

    /* =========================
        BATH COLLECTION OPTION
    ========================= */
    const collectionItems = document.querySelectorAll("#bath_collection .collection_item");

    collectionItems.forEach(function (item) {
        const swatches = item.querySelectorAll(".option_swatch");

        swatches.forEach(function (swatch) {
            swatch.addEventListener("click", function () {
                swatches.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                swatch.classList.add("active");
            });
        });
    });

    /* =========================
    MAIN BANNER
========================= */

    const bannerElement = document.querySelector(".mainbanner");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (bannerElement) {
        const bannerSlides = bannerElement.querySelectorAll(
            ".video_slide"
        );

        function stopBannerVideo(slide) {
            const video = slide.querySelector(".mb_video");

            slide.classList.remove("is_video_playing");

            if (!video) return;

            video.pause();
            video.currentTime = 0;
        }

        function playBannerVideo(slide) {
            const video = slide.querySelector(".mb_video");

            if (
                !video ||
                reduceMotion ||
                !slide.classList.contains("swiper-slide-active")
            ) {
                return;
            }

            video.play()
                .then(() => {
                    slide.classList.add("is_video_playing");
                })
                .catch(() => { });
        }

        const mainBannerSwiper = new Swiper(bannerElement, {
            speed: 900,
            rewind: true,

            navigation: {
                nextEl: ".mb_next",
                prevEl: ".mb_prev"
            },

            keyboard: {
                enabled: true
            },

            a11y: {
                enabled: true,
                prevSlideMessage: "이전 배너",
                nextSlideMessage: "다음 배너"
            },

            on: {
                slideChangeTransitionStart() {
                    bannerSlides.forEach(stopBannerVideo);
                }
            }
        });

        /* 호버가 가능한 PC에서만 영상 전환 */
        if (window.matchMedia("(hover: hover)").matches) {
            bannerSlides.forEach(slide => {
                slide.addEventListener("mouseenter", () => {
                    playBannerVideo(slide);
                });

                slide.addEventListener("mouseleave", () => {
                    stopBannerVideo(slide);
                });
            });
        }
    }


    /* =========================
        CHOOSE YOUR TIDE
    ========================= */
    const tideData = {
        haemu: {
            ko: "해무",
            en: "foggy dawn",
            desc: "희뿌연 해무가 연상되는 코코넛 밀크와,<br>붉은 동백, 로즈마리가 스며든 고요한 아침의 향기.",
            visual: "./images/choose_your_tide haemu .png",
            video: "./video/Water_ripples_with_floating_petals_202606251200.mp4",

            hair: [
                { name: "해무 샴푸", img: "./images/haemu_shampoo.jpg" },
                { name: "해무 트리트먼트", img: "./images/haemu_hair_mask.jpg" },
                { name: "해무 세럼", img: "./images/haemu_hair_serum.jpg" }
            ],

            body: [
                { name: "해무 바디워시", img: "./images/haemu_body_wash.jpg" },
                { name: "해무 바디로션", img: "./images/haemu_body_lotion.jpg" },
                { name: "해무 바디 바", img: "./images/haemu_body_bar.png" }
            ]
        },

        yunseul: {
            ko: "윤슬",
            en: "wave & glint",
            desc: "햇빛에 반짝이는 윤슬을 닮은 씨솔트와,<br>시트러스, 베르가못이 남기는 맑고 청량한 여운.",
            visual: "./images/choose_your_tide yunseul .png",
            video: "./video/yunseul_video.mp4",

            hair: [
                { name: "윤슬 샴푸", img: "./images/yunseul_shampoo.jpg" },
                { name: "윤슬 헤어 컨디셔너", img: "./images/yunseul_hair_conditioner.jpg" },
                { name: "윤슬 두피 스프레이", img: "./images/yunseul_scalp_spray.jpg" }
            ],

            body: [
                { name: "윤슬 바디워시", img: "./images/yunseul_body_wash.png" },
                { name: "윤슬 바디스크럽", img: "./images/yunseul_body_scrub.png" },
                { name: "윤슬 바디미스트", img: "./images/yunseul_body_mist.jpg" }
            ]
        },

        hwanghon: {
            ko: "황혼",
            en: "muted dusk",
            desc: "붉게 물드는 부산의 저녁 바다처럼,<br>따뜻하고 부드러운 무드가 하루의 끝을 감싸줍니다.",
            visual: "./images/choose_your_tide hwanghon.png",
            video: "./video/hwanghon_video.mp4",

            hair: [
                { name: "황혼 샴푸", img: "./images/hwanghon_shampoo.png" },
                { name: "황혼 헤어팩 트리트먼트", img: "./images/hwanghon_hair_mask.png" },
                { name: "황혼 헤어 세럼", img: "./images/hwanghon_hair_oil.png" }
            ],

            body: [
                { name: "황혼 바디워시", img: "./images/hwanghon_body_wash.png" },
                { name: "황혼 바디로션", img: "./images/hwanghon_body_lotion.png" },
                { name: "황혼 바디오일", img: "./images/hwanghon_body_oil.png" }
            ]
        },

        simhae: {
            ko: "심해",
            en: "deep abyss",
            desc: "고요한 심해의 어둠과 깊이처럼,<br>차분하고 묵직한 향이 긴장을 천천히 가라앉힙니다.",
            visual: "./images/choose_your_tide_simhae.png",
            video: "./video/simhae_video.mp4",

            hair: [
                { name: "심해 샴푸", img: "./images/simhae_shampoo.png" },
                { name: "심해 트리트먼트", img: "./images/simhae_hair_treatment.png" },
                { name: "심해 헤어 토닉", img: "./images/simhae_hair_tonic.png" }
            ],

            body: [
                { name: "심해 바디 마스크", img: "./images/simhae_body_mask.png" },
                { name: "심해 바디 밤", img: "./images/simhae_body_balm.png" },
                { name: "심해 바디 토닉", img: "./images/simhae_body_tonic.png" }
            ]
        }
    };

    const tideButtons = document.querySelectorAll(".tide_btn");
    const careTabs = document.querySelectorAll(".care_tab");

    const tideKo = document.querySelector("#tideKo");
    const tideEn = document.querySelector("#tideEn");
    const tideDesc = document.querySelector("#tideDesc");

    const tideVisualBox = document.querySelector(".tide_visual");
    const tideVisualImg = document.querySelector("#tideVisualImg");
    const tideVisualVideo = document.querySelector("#tideVisualVideo");

    const productList = document.querySelector("#productList");

    let currentTide = "haemu";
    let currentCare = "hair";

    function renderTide() {
        const data = tideData[currentTide];

        tideKo.textContent = data.ko;
        tideEn.textContent = data.en;
        tideDesc.innerHTML = data.desc;

        tideVisualImg.src = data.visual;
        tideVisualImg.alt = `${data.ko} mood image`;

        if (tideVisualVideo) {
            tideVisualVideo.pause();
            tideVisualVideo.currentTime = 0;

            if (data.video) {
                tideVisualVideo.src = data.video;
                tideVisualVideo.load();
            } else {
                tideVisualVideo.removeAttribute("src");
            }
        }

        renderProducts();
    }

    function renderProducts() {
        const products = tideData[currentTide][currentCare];

        productList.innerHTML = products.map(product => `
            <li class="product_item">
                <a href="#">
                    <div class="product_img">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <p>${product.name}</p>
                </a>
            </li>
        `).join("");
    }

    tideButtons.forEach(button => {
        button.addEventListener("click", () => {
            tideButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            currentTide = button.dataset.tide;
            renderTide();
        });
    });

    careTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            careTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            currentCare = tab.dataset.care;
            renderProducts();
        });
    });

    if (tideVisualBox && tideVisualVideo) {
        tideVisualBox.addEventListener("mouseenter", () => {
            if (tideVisualVideo.src) {
                tideVisualVideo.play().catch(() => { });
            }
        });

        tideVisualBox.addEventListener("mouseleave", () => {
            tideVisualVideo.pause();
            tideVisualVideo.currentTime = 0;
        });
    }

    if (
        tideButtons.length &&
        careTabs.length &&
        tideKo &&
        tideEn &&
        tideDesc &&
        tideVisualImg &&
        productList
    ) {
        renderTide();
    }
});
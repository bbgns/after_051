document.addEventListener("DOMContentLoaded", function () {
    const aboutStory = document.querySelector("#about_story");

    if (
        !aboutStory ||
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const aboutTexts = [
        {
            count: "01 / origin",
            title: "A quiet ritual,<br>born from Busan’s sea.",
            desc: "after 051은 부산의 바다에서 시작된 헤어·바디·배스 브랜드입니다. 바다 위로 번지는 빛, 안개처럼 흐려지는 경계, 하루의 끝에 남는 고요함에서 우리의 감각은 출발합니다."
        },
        {
            count: "02 / 051",
            title: "051 is where<br>our story begins.",
            desc: "051은 부산의 지역번호이자, after 051이 기억하는 장소의 이름입니다. 우리는 부산을 관광지의 이미지가 아닌, 하루를 씻어내고 다시 자신에게 돌아오는 조용한 배경으로 바라봅니다."
        },
        {
            count: "03 / scent & ingredients",
            title: "Scented by<br>the mood of tide.",
            desc: "after 051의 향은 바다의 장면에서 시작됩니다. 해무의 부드러움, 윤슬의 맑은 빛, 황혼의 따뜻한 잔향, 심해의 고요한 깊이를 식물성 향료와 자연에서 온 재료의 감각으로 풀어냅니다."
        },
        {
            count: "05 / recycled packaging",
            title: "Made to leave<br>less behind.",
            desc: "after 051은 제품을 사용한 뒤 남는 패키지까지 생각합니다. 재활용 플라스틱과 종이 소재를 활용하고 불필요한 포장을 줄여, 제품의 분위기는 유지하면서 버려지는 것은 덜어내고자 합니다."
        },
        {
            count: "06 / refill",
            title: "Refill,<br>and use it longer.",
            desc: "익숙한 용기를 한 번 쓰고 버리지 않도록 일부 제품에 리필 방식을 적용합니다. 사용하던 용기에 내용물만 다시 채워, after 051의 리추얼을 부담 없이 오래 이어갈 수 있도록 합니다."
        },
        {
            count: "07 / ritual",
            title: "Not just cleansing,<br>but returning.",
            desc: "셀프케어는 단순한 케어가 아니라 하루를 마무리하는 과정이 될 수 있습니다. after 051은 헤어와 바디에 남는 향과 텍스처를 통해 평범한 일상에 조용한 휴식을 제안합니다."
        },
        {
            count: "08 / philosophy",
            title: "For your<br>quiet rest.",
            desc: "우리는 강한 인상보다 오래 머무는 잔향을 믿습니다. 부산의 바다에서 발견한 감각을 당신의 일상에 전합니다. 당신의 평온한 휴식을 위해, after 051."
        }
    ];

    const aboutPin = aboutStory.querySelector(".about_pin");
    const aboutTextBox = aboutStory.querySelector(".about_text");
    const aboutCount = aboutStory.querySelector(".about_count");
    const aboutTitle = aboutStory.querySelector(".about_text h2");
    const aboutDesc = aboutStory.querySelector(".about_desc");
    const aboutVisual = aboutStory.querySelector(".about_visual");
    const visualTrack = aboutStory.querySelector(".visual_track");

    if (
        !aboutPin ||
        !aboutTextBox ||
        !aboutCount ||
        !aboutTitle ||
        !aboutDesc ||
        !aboutVisual ||
        !visualTrack
    ) {
        return;
    }

    let currentIndex = 0;
    let textTimeline;

    function setText(index) {
        const data = aboutTexts[index];

        aboutCount.textContent = data.count;
        aboutTitle.innerHTML = data.title;
        aboutDesc.textContent = data.desc;
    }

    function changeText(index) {
        if (currentIndex === index) return;

        currentIndex = index;

        if (textTimeline) {
            textTimeline.kill();
        }

        textTimeline = gsap.timeline();

        textTimeline
            .to(aboutTextBox, {
                autoAlpha: 0.25,
                y: 10,
                duration: 0.16,
                ease: "power1.out"
            })
            .add(function () {
                setText(index);
            })
            .to(aboutTextBox, {
                autoAlpha: 1,
                y: 0,
                duration: 0.24,
                ease: "power1.out"
            });
    }

    function getScrollDistance() {
        return Math.max(
            0,
            visualTrack.scrollHeight - aboutVisual.clientHeight
        );
    }

    /* 첫 화면 텍스트를 애니메이션 전에 확정 */
    setText(0);

    gsap.set(aboutTextBox, {
        autoAlpha: 1,
        y: 0
    });

    gsap.to(visualTrack, {
        y: function () {
            return -getScrollDistance();
        },

        ease: "none",

        scrollTrigger: {
            trigger: aboutStory,
            start: "top top",
            end: function () {
                return "+=" + getScrollDistance();
            },

            pin: aboutPin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: function (self) {
                const index = Math.min(
                    Math.floor(self.progress * aboutTexts.length),
                    aboutTexts.length - 1
                );

                changeText(index);
            }
        }
    });

    /* 이미지가 모두 로드된 후 높이 재계산 */
    window.addEventListener(
        "load",
        function () {
            ScrollTrigger.refresh();
        },
        { once: true }
    );
});
document.addEventListener("DOMContentLoaded", function () {
    const aboutStory = document.querySelector("#about_story");

    if (!aboutStory) return;

    gsap.registerPlugin(ScrollTrigger);

    const aboutTexts = [
        {
            count: "01 / origin",
            title: "A quiet ritual,<br>born from Busan’s sea.",
            desc: "after 051은 부산의 바다에서 시작된 헤어·바디·배스 브랜드입니다.         바다 위로 번지는 빛, 안개처럼 흐려지는 경계, 하루의 끝에 남는 고요함에서 우리의 감각은 출발합니다."
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
            count: "04 / ocean-minded",
            title: "Inspired by the sea,<br>made with care.",
            desc: "우리는 바다에서 영감을 받았기 때문에, 그 감각을 빌려오는 방식 또한 조심스러워야 한다고 믿습니다. 피부와 바다에 부담을 줄이는 방향을 고민하며, 부드러운 사용감과 자연 유래 성분을 중심으로 제품을 설계합니다."
        },
        {
            count: "05 / ritual",
            title: "Not just cleansing,<br>but returning.",
            desc: "셀프케어는 단순한 케어가 아니라 하루를 마무리하는 과정이 될 수 있습니다. after 051은 헤어와 바디에 남는 향과 텍스처를 통해 평범한 일상에 조용한 휴식을 제안합니다."
        },
        {
            count: "06 / philosophy",
            title: "For your<br>quiet rest.",
            desc: "우리는 강한 인상보다 오래 머무는 잔향을 믿습니다. 부산의 바다에서 발견한 모습을 당신의 일상에 선물합니다. 당신의 평온한 휴식을 위해, after 051."
        }
    ];

    const aboutTextBox = document.querySelector(".about_text");
    const aboutCount = document.querySelector(".about_count");
    const aboutTitle = document.querySelector(".about_text h2");
    const aboutDesc = document.querySelector(".about_desc");

    const visualTrack = document.querySelector(".visual_track");
    const visualSlides = gsap.utils.toArray(".visual_slide");

    let currentIndex = -1;

    function setText(index) {
        aboutCount.textContent = aboutTexts[index].count;
        aboutTitle.innerHTML = aboutTexts[index].title;
        aboutDesc.textContent = aboutTexts[index].desc;
        currentIndex = index;
    }

    function changeText(index) {
        if (currentIndex === index) return;

        currentIndex = index;
        aboutTextBox.classList.add("is-changing");

        setTimeout(function () {
            aboutCount.textContent = aboutTexts[index].count;
            aboutTitle.innerHTML = aboutTexts[index].title;
            aboutDesc.textContent = aboutTexts[index].desc;

            aboutTextBox.classList.remove("is-changing");
        }, 180);
    }

    setText(0);

    gsap.to(visualTrack, {
        y: () => -(visualTrack.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
            trigger: "#about_story",
            start: "top top",
            end: () => "+=" + (visualTrack.scrollHeight - window.innerHeight),
            pin: ".about_pin",
            scrub: 1,
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
});
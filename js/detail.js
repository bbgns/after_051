document.addEventListener("DOMContentLoaded", function () {
    const tabBtns = document.querySelectorAll(".tab_btn");
    const tabPanels = document.querySelectorAll(".tab_panel");

    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.dataset.tab;

            // 버튼 active 제거
            tabBtns.forEach(function (item) {
                item.classList.remove("active");
            });

            // 섹션 active 제거
            tabPanels.forEach(function (panel) {
                panel.classList.remove("active");
            });

            // 클릭한 버튼 active
            btn.classList.add("active");

            // 해당 섹션 active
            document.querySelector(`[data-panel="${target}"]`).classList.add("active");
        });
    });
});
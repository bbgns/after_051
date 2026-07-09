document.addEventListener("DOMContentLoaded", function () {
    const tabBtns = document.querySelectorAll(".tab_btn");
    const panels = document.querySelectorAll(".board_panel");

    function activateTab(tabName) {
        tabBtns.forEach(function (btn) {
            btn.classList.remove("active");
        });

        panels.forEach(function (panel) {
            panel.classList.remove("active");
        });

        const activeBtn = document.querySelector(`.tab_btn[data-tab="${tabName}"]`);
        const activePanel = document.querySelector(`.board_panel[data-panel="${tabName}"]`);

        if (activeBtn && activePanel) {
            activeBtn.classList.add("active");
            activePanel.classList.add("active");
        } else {
            document.querySelector('.tab_btn[data-tab="notice"]').classList.add("active");
            document.querySelector('.board_panel[data-panel="notice"]').classList.add("active");
        }
    }

    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const tabName = btn.dataset.tab;

            activateTab(tabName);

            history.pushState(null, "", "#" + tabName);
        });
    });

    const firstTab = location.hash.replace("#", "") || "notice";
    activateTab(firstTab);
});
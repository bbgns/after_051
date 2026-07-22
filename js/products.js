document.addEventListener("DOMContentLoaded", function () {
    const categoryTabs = [
        ...document.querySelectorAll(".category_tab")
    ];

    const productSections = [
        ...document.querySelectorAll(".product_section")
    ];

    if (!categoryTabs.length || !productSections.length) {
        return;
    }

    const validCategories = categoryTabs.map(function (tab) {
        return tab.dataset.category;
    });

    function getSafeCategory(category) {
        return validCategories.includes(category)
            ? category
            : "all";
    }

    function showProductCategory(category) {
        const safeCategory = getSafeCategory(category);

        categoryTabs.forEach(function (tab) {
            const isActive =
                tab.dataset.category === safeCategory;

            tab.classList.toggle("is_active", isActive);
            tab.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        productSections.forEach(function (section) {
            const sectionCategory =
                section.dataset.category;

            /*
             * 전체 상품에서는 best를 제외한다.
             * best 상품은 다른 카테고리 상품과 중복되기 때문.
             */
            const isVisible =
                safeCategory === "all"
                    ? sectionCategory !== "best"
                    : sectionCategory === safeCategory;

            section.classList.toggle(
                "is_active",
                isVisible
            );
        });

        return safeCategory;
    }

    function updateCategoryURL(category, push = true) {
        const url = new URL(window.location.href);

        url.searchParams.set("category", category);

        if (push) {
            history.pushState(
                { category: category },
                "",
                url
            );
        } else {
            history.replaceState(
                { category: category },
                "",
                url
            );
        }
    }

    categoryTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const category = showProductCategory(
                tab.dataset.category
            );

            updateCategoryURL(category);
        });
    });

    /* 브라우저 뒤로 가기 대응 */
    window.addEventListener("popstate", function () {
        const params = new URLSearchParams(
            window.location.search
        );

        showProductCategory(
            params.get("category") || "all"
        );
    });

    /* 라인 버튼 선택 표시 */
    document.querySelectorAll(".filter_chips").forEach(
        function (chipGroup) {
            const buttons = [
                ...chipGroup.querySelectorAll("button")
            ];

            buttons.forEach(function (button) {
                button.addEventListener("click", function () {
                    buttons.forEach(function (btn) {
                        btn.classList.remove("is_active");
                        btn.setAttribute(
                            "aria-pressed",
                            "false"
                        );
                    });

                    button.classList.add("is_active");
                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );
                });
            });
        }
    );

    const initialParams = new URLSearchParams(
        window.location.search
    );

    const initialCategory = showProductCategory(
        initialParams.get("category") || "all"
    );

    updateCategoryURL(initialCategory, false);
});
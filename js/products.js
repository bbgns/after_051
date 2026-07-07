document.querySelectorAll(".filter_chips").forEach(function (chipGroup) {
    const buttons = chipGroup.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (btn) {
                btn.classList.remove("is_active");
            });

            button.classList.add("is_active");
        });
    });
});

const categoryTabs = document.querySelectorAll(".category_tab");
const productSections = document.querySelectorAll(".product_section");

function showProductCategory(category) {
    categoryTabs.forEach((tab) => {
        tab.classList.toggle("is_active", tab.dataset.category === category);
    });

    productSections.forEach((section) => {
        const sectionCategory = section.dataset.category;

        if (category === "all") {
            section.classList.toggle("is_active", sectionCategory !== "best");
        } else {
            section.classList.toggle("is_active", sectionCategory === category);
        }
    });
}

categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const category = tab.dataset.category;
        showProductCategory(category);
        history.pushState(null, "", `?category=${category}`);
    });
});

const params = new URLSearchParams(window.location.search);
const initialCategory = params.get("category") || "all";

showProductCategory(initialCategory);
// Theme mode setup moved from inline to external file
(function () {
    try {
        var themeMode = "system";
        var stored = localStorage.getItem("kt_theme_mode_value");
        if (stored) {
            themeMode = stored;
        }
        if (themeMode === "system") {
            themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        document.documentElement.setAttribute("data-bs-theme", themeMode);
    } catch (e) {
        // Fail silently if storage or access is restricted
    }
})();

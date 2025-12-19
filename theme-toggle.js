// js/theme-toggle.js
// Перемикач світла/темна тема з запам'ятовуванням у localStorage

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) {
        console.warn("themeToggle button not found");
        return;
    }

    // Застосувати тему
    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            btn.textContent = "🌙";
        } else {
            document.body.classList.remove("dark-mode");
            btn.textContent = "🌞";
        }

        try {
            localStorage.setItem("369yax_theme", theme);
        } catch (e) {
            // якщо браузер блокує localStorage – просто ігноруємо
        }
    }

    // Прочитати попереднє значення теми
    let savedTheme = "light";
    try {
        const stored = localStorage.getItem("369yax_theme");
        if (stored === "dark" || stored === "light") {
            savedTheme = stored;
        }
    } catch (e) {
        // нічого, залишаємо "light"
    }

    // Застосувати тему під час завантаження
    applyTheme(savedTheme);

    // Клік по кнопці – перемикаємо
    btn.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
    });
});


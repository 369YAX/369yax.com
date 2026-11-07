// =====================================================
// 369YAX – Clean Chat Widget (no big KB, no APP_CHAT)
//
// Мета:
// - Акуратний UI з мінімальною логікою.
// - Підтримка мов через APP_I18N (translations.js).
// - НІЯКИХ window.APP_CHAT, APP_CHAT_TECH, findAnswer тощо.
// =====================================================

(function () {
    // Безпечний пошук елементів
    const $ = (selector) => document.querySelector(selector);

    const launcher = $("#chatLauncher");
    const widget = $("#chatWidget");
    const chatInner = widget ? widget.querySelector(".chat-widget-inner") : null;
    const closeBtn = $("#chatCloseBtn");
    const resizeBtn = $("#chatResizeBtn");
    const clearBtn = $("#chatClearBtn");
    const messagesEl = $("#chatMessages");
    const form = $("#chatForm");
    const input = $("#chatInput");
    const fileInput = $("#chatFile");
    const fileInfo = $("#chatFileInfo");
    const hintEl = widget ? widget.querySelector(".chat-hint") : null;
    const titleStrong = widget ? widget.querySelector(".chat-title strong") : null;
    const titleSpan = widget ? widget.querySelector(".chat-title span") : null;

    if (!launcher || !widget || !messagesEl || !form || !input) {
        // Якщо раптом чогось немає – тихо виходимо
        return;
    }

    // -----------------------------
    // Локалізовані тексти чату
    // -----------------------------
    let chatTexts = {
        // fallback на випадок, якщо APP_I18N недоступний
        title: "369YAX – Technical chat",
        subtitle: "Ask about engineering design, fabrication and automation",
        placeholder: "Type your question about engineering design or manufacturing...",
        hint:
            'Tip: briefly describe your project (stairs, sheet metal, frame or engineering automation) and what deliverables you need.',
        initial:
            "👋 Hi! This is the 369YAX knowledge chat.<br><br>" +
            "I can help with spiral/straight stairs (EU / US / AU), sheet metal, welded frames and SolidWorks automation.<br>" +
            "You can type a free question, or use the quick buttons below.",
        launcher: "💬 Chat",
        email_btn: "📧 Prepare email to Vitalii",
        email_subject: "Project from 369YAX website chat"
    };

    function loadChatTexts(lang) {
        try {
            if (window.APP_I18N && typeof window.APP_I18N.getChatTexts === "function") {
                const localized = window.APP_I18N.getChatTexts(lang);\n                if (localized && Object.keys(localized).length) chatTexts = localized;
            }
        } catch (e) {
            // якщо щось пішло не так – просто залишаємо fallback
        }
    }

    function applyChatTexts() {
        // Заголовок
        if (titleStrong && chatTexts.title) {
            titleStrong.textContent = chatTexts.title;
        }
        if (titleSpan && chatTexts.subtitle) {
            titleSpan.textContent = chatTexts.subtitle;
        }

        // Кнопка запуску
        if (launcher && chatTexts.launcher) {
            launcher.textContent = chatTexts.launcher;
        }

        // Hint під формою – тут є HTML (посилання), тому innerHTML
        if (hintEl && chatTexts.hint) {
            hintEl.innerHTML = chatTexts.hint;
        }

        // Placeholder в textarea
        if (input && chatTexts.placeholder) {
            input.setAttribute("placeholder", chatTexts.placeholder);
        }
    }

    // -----------------------------
    // Допоміжні функції UI
    // -----------------------------
    function openChat() {
        widget.classList.add("is-open");
        widget.setAttribute("aria-hidden", "false");
        document.body.classList.add("chat-open"); // можна використовувати для розмиття фону в CSS
        ensureWelcomeMessage();
        focusInput();
    }

    function closeChat() {
        widget.classList.remove("is-open");
        widget.setAttribute("aria-hidden", "true");
        document.body.classList.remove("chat-open");
    }

    function toggleSize() {
        // Клас is-large ставимо на .chat-widget (узгоджено з CSS)
        if (!widget || !resizeBtn) return;
        const large = widget.classList.toggle("is-large");
        resizeBtn.title = large ? "Shrink chat" : "Resize chat";
    }

    function clearChat() {
        messagesEl.innerHTML = "";
        firstWelcomeShown = false;
        ensureWelcomeMessage();
    }

    function focusInput() {
        setTimeout(() => {
            input.focus();
        }, 120);
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // Створення повідомлення (user/bot)
    // options.html = true → вставляємо як HTML
    function createMessageElement(text, type, options = {}) {
        const wrap = document.createElement("div");
        wrap.className =
            "chat-message " + (type === "user" ? "chat-message--user" : "chat-message--bot");

        const bubble = document.createElement("div");
        bubble.className = "chat-message__bubble";

        if (options.html) {
            bubble.innerHTML = text;
        } else {
            bubble.textContent = text;
        }

        wrap.appendChild(bubble);
        return wrap;
    }

    // -----------------------------
    // Welcome message (одноразовий)
    // -----------------------------
    let firstWelcomeShown = false;

    function ensureWelcomeMessage() {
        if (firstWelcomeShown) return;
        firstWelcomeShown = true;

        const welcomeHtml = chatTexts.initial || "";
        const msgEl = createMessageElement(welcomeHtml, "bot", { html: true });
        messagesEl.appendChild(msgEl);
        scrollToBottom();
    }

    // -----------------------------
    // Проста логіка відповідей
    // (без бази, тільки ключові слова)
    // -----------------------------
    function buildSimpleAnswer(text) {
        const lower = text.toLowerCase();

        const isStairs =
            lower.includes("stair") ||
            lower.includes("scala") ||
            lower.includes("sclada") ||
            lower.includes("сход") ||
            lower.includes("лестниц");

        const isSheetMetal =
            lower.includes("sheet") ||
            lower.includes("lamiera") ||
            lower.includes("листовий") ||
            lower.includes("sheet metal");

        const isFrame =
            lower.includes("frame") ||
            lower.includes("struttura") ||
            lower.includes("каркас") ||
            lower.includes("rame") ||
            lower.includes("steel frame");

        const isMacro =
            lower.includes("macro") ||
            lower.includes("engineering") || lower.includes("workflow") ||
            lower.includes("automat") ||
            lower.includes("vba");

        if (isStairs) {
            return (
                "For stair projects, it’s helpful if you share:\n" +
                "• Type: spiral / straight / multi-flight / with landing\n" +
                "• Approx. floor-to-floor height and available diameter / length\n" +
                "• Indoor / outdoor + location (country, so we can align with rules)\n" +
                "• What you need: 3D model, drawings, DXF for cutting, BOM, or all of them.\n\n" +
                "You can also send sketches or photos via email: 369yax@gmail.com."
            );
        }

        if (isSheetMetal) {
            return (
                "For sheet metal parts, please specify:\n" +
                "• Material and thickness (e.g. S235 5 mm, AISI 304 2 mm)\n" +
                "• Approx. dimensions and quantity\n" +
                "• Processes: laser cutting, punching, bending, welding, coating\n" +
                "• Needed outputs: 3D, DXF flat patterns, drawings, BOM.\n\n" +
                "If you have existing DXF or sketches, you can mention them and then send by email."
            );
        }

        if (isFrame) {
            return (
                "For welded frames / platforms / supports, it helps to know:\n" +
                "• Overall size (L × W × H) and approximate loads\n" +
                "• Environment: indoor / outdoor, industrial / residential\n" +
                "• Preferred profiles (HEA, IPE, tubes, angles, etc.)\n" +
                "• What deliverables you expect: 3D model, drawings with cut lists, BOM.\n\n" +
                "Describe your project in a few lines and I’ll outline a realistic way to model and document it."
            );
        }

        if (isMacro) {
            return (
                "For engineering automation, please describe:\n" +
                "• Your current workflow (parts, assemblies, drawings, PDM or simple folders)\n" +
                "• What is repetitive or slow today (naming, templates, BOM, properties, exports)\n" +
                "• The tools and systems involved, if relevant.\n\n" +
                "Then I can propose an automation solution or a focused set of tools for your workflow."
            );
        }

        // Загальна відповідь за замовчуванням
        return (
            "Thank you for the details.\n\n" +
            "To give you a clear proposal, please specify:\n" +
            "• Project type: stairs, sheet metal, welded frame, or engineering automation\n" +
            "• Approximate dimensions and material\n" +
            "• Which deliverables you need: 3D, drawings, DXF, STEP, BOM.\n\n" +
            "If it’s easier, you can also contact me directly at 369yax@gmail.com or via Fiverr / Upwork / LinkedIn (search for “369YAX”)."
        );
    }

    // -----------------------------
    // Ініціалізація (після того, як DOM вже є)
    // -----------------------------

    // Зчитати поточну мову і застосувати тексти
    loadChatTexts();          // без аргументу → APP_I18N сам візьме свою мову
    applyChatTexts();

    // Реагувати на зміну мови з translations.js
    document.addEventListener("app:language-changed", (ev) => {
        const lang = ev.detail && ev.detail.lang;
        loadChatTexts(lang);
        applyChatTexts();

        // Якщо welcome ще не був показаний – показати вже новою мовою
        if (!firstWelcomeShown) {
            ensureWelcomeMessage();
        }
    });

    // Якщо hint ще не був проставлений (на випадок, якщо APP_I18N недоступний)
    if (hintEl && !hintEl.innerHTML.trim()) {
        hintEl.innerHTML = chatTexts.hint;
    }

    // -----------------------------
    // Обробка подій
    // -----------------------------
    launcher.addEventListener("click", openChat);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeChat);
    }

    if (resizeBtn) {
        resizeBtn.addEventListener("click", toggleSize);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", clearChat);
    }

    // Ввід файлу – тільки показуємо назву
    if (fileInput && fileInfo) {
        fileInput.addEventListener("change", () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const f = fileInput.files[0];
                fileInfo.textContent = "Attached file: " + f.name;
            } else {
                fileInfo.textContent = "";
            }
        });
    }

    // Відправка повідомлення
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

        if (!text && !hasFile) {
            return;
        }

        // Повідомлення користувача
        if (text) {
            const userMsgEl = createMessageElement(text, "user");
            messagesEl.appendChild(userMsgEl);
        }

        input.value = "";

        // Відповідь “бота” (проста логіка)
        const answer = buildSimpleAnswer(text || "");
        const botMsgEl = createMessageElement(answer, "bot");
        messagesEl.appendChild(botMsgEl);

        scrollToBottom();
    });

    // Відправка по Enter (без Shift)
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
    });

    // Якщо хочеш — можна автоматично відкривати чат:
    // openChat();
})();

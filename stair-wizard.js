// =====================================================
// 369YAX – Stair concept wizard (3 steps, auto/manual)
//
// STEP 1: Region / usage / stair type
// STEP 2: Geometry (auto by default) + comfort check
// STEP 3: Summary, reference standards & message
//
// NOTE:
// - Геометрія базується на комфортних діапазонах,
//   узгоджених з основними нормами:
//   * EU/UK: Approved Document K, BS 5395-2 (spiral)
//   * US: IRC / IBC (residential / public)
//   * AU: NCC + AS 1657
// - Діаметр центральної труби для спіралей впливає на:
//   * внутрішній радіус,
//   * чисту ширину маршу,
//   * положення walkline і комфорт по треду.
// - Це інструмент concept / comfort, а не сертифікований code-checker.
// =====================================================

(function () {
    // -----------------------------
    // Helpers
    // -----------------------------
    function $(sel, root) {
        return (root || document).querySelector(sel);
    }

    function $all(sel, root) {
        return Array.from((root || document).querySelectorAll(sel));
    }

    function parseNum(v, fb) {
        if (v === "" || v == null) return fb;
        const n = Number(v);
        return Number.isFinite(n) ? n : fb;
    }

    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    function fmt(v, d) {
        return Number(v).toFixed(d ?? 1);
    }

    // Поточна мова з APP_I18N або <html lang>
    function getLang() {
        try {
            if (window.APP_I18N && typeof window.APP_I18N.getLanguage === "function") {
                return window.APP_I18N.getLanguage();
            }
        } catch (e) {
            // ignore
        }
        return (document.documentElement.lang || "en").toLowerCase();
    }

    // Простий шаблонізатор {key}
    function tpl(str, vars) {
        return str.replace(/\{(\w+)\}/g, function (_, key) {
            return Object.prototype.hasOwnProperty.call(vars, key)
                ? vars[key]
                : "{" + key + "}";
        });
    }

    // -----------------------------
    // I18N для wizard (динамічні тексти)
    // -----------------------------
    const WIZARD_I18N = {
        en: {
            live_enter_height_basic:
                "Enter floor-to-floor height (≥ 2000 mm) to see a live concept.",
            live_enter_height_step2:
                "Enter floor-to-floor height (≥ 2000 mm) on Step 2 to calculate a concept.",

            live_header: "Region: {region} · Usage: {usage} · Type: {type}",
            live_core:
                "Height {height} mm → {steps} steps, riser ≈ {riser} mm, tread ≈ {tread} mm (Blondel ≈ {blondel} mm).",
            live_spiral:
                "Spiral: outer diameter ≈ {dia} mm{column}{clear}, rotation ≈ {angle}°, ≈ {stepAngle}° per step; walkline tread ≈ {walkTread}{walkBlondel}.",
            live_spiral_column_part: ", central column ≈ Ø{columnDia} mm",
            live_spiral_clear_part: ", clear stair width ≈ {clearWidth} mm",
            live_spiral_walk_blondel_part: " (2R + T_walk ≈ {walkBlondel} mm)",
            live_straight_run:
                "Approx. run ≈ {run} mm{runLimit}.",
            live_run_limit_part: " vs max run ≈ {maxRun} mm",

            live_comfort_ok_label: "Balanced comfort profile",
            live_comfort_ok_note:
                "Riser, tread and Blondel are within typical comfort ranges for this configuration.",
            live_comfort_warn_label: "Acceptable but tight",
            live_comfort_warn_note:
                "Some parameters are close to their limits – the stair may feel steep, shallow or constrained.",
            live_comfort_bad_label: "Not recommended without changes",
            live_comfort_bad_note:
                "One or more core parameters are clearly outside typical comfort ranges and should be adjusted.",

            summary_no_data:
                "Set geometry on Step 2 to generate a summary here.",

            summary_input_title: "Input parameters",
            summary_geom_title: "Suggested core geometry",
            summary_comfort_title: "Comfort note",

            summary_region_label: "Region",
            summary_usage_label: "Usage",
            summary_type_label: "Stair type",
            summary_height_label: "Floor-to-floor height",
            summary_steps_label: "Number of steps",
            summary_steps_manual_suffix: " (manual)",
            summary_steps_auto_suffix: " (auto from profile)",
            summary_max_run_label: "Max run",
            summary_outer_dia_label: "Outer diameter",
            summary_column_label: "Central column",
            summary_column_clear_suffix: " (clear stair width ≈ {clearWidth} mm)",
            summary_headroom_label: "Headroom target",
            summary_spiral_rot_label: "Spiral rotation",
            summary_spiral_rot_unit: "°",
            summary_spiral_step_angle_suffix: " ({stepAngle}° per step)",

            summary_riser_label: "Riser height",
            summary_riser_typical_suffix: " (typical {rMin}–{rMax} mm)",
            summary_tread_label_straight: "Tread depth",
            summary_tread_label_spiral: "Nominal tread (straight-equivalent)",
            summary_tread_typical_suffix: " (typical {tMin}–{tMax} mm)",
            summary_blondel_label: "Blondel (2R + T)",
            summary_blondel_target_suffix: " (target {bMin}–{bMax} mm)",
            summary_walk_tread_label: "Tread at walkline",
            summary_walk_tread_suffix: " (Blondel ≈ {walkBlondel} mm)",

            comfort_block_bad:
                "One or more parameters are clearly outside typical comfort ranges. Adjustment of riser, tread, diameter, column or rotation is strongly recommended before detailed design.",
            comfort_block_warn:
                "Some parameters are close to their limits. The stair may feel steep or constrained. Consider fine-tuning geometry (riser, tread, diameter, column or rotation) for better comfort.",
            comfort_block_ok:
                "The proposed geometry is broadly consistent with common comfort ranges for the selected region and usage. Final code check is still required.",

            region_eu: "Europe / UK",
            region_us: "United States",
            region_au: "Australia",

            usage_residential: "Residential",
            usage_office: "Office / light commercial",
            usage_industrial: "Industrial / technical",
            usage_external_private: "External – private",
            usage_external_public: "External – public",

            type_straight: "Straight",
            type_straight_landing: "Straight with landing",
            type_l: "L-shaped",
            type_u: "U-shaped",
            type_spiral: "Spiral / helical"
        },

        it: {
            live_enter_height_basic:
                "Inserisci l’altezza piano-piano (≥ 2000 mm) per vedere il concetto in tempo reale.",
            live_enter_height_step2:
                "Inserisci l’altezza piano-piano (≥ 2000 mm) al Passo 2 per calcolare il concetto.",

            live_header: "Regione: {region} · Uso: {usage} · Tipo: {type}",
            live_core:
                "Altezza {height} mm → {steps} alzate, alzata ≈ {riser} mm, pedata ≈ {tread} mm (Blondel ≈ {blondel} mm).",
            live_spiral:
                "Chiocciola: diametro esterno ≈ {dia} mm{column}{clear}, rotazione ≈ {angle}°, ≈ {stepAngle}° per gradino; pedata sulla linea di cammino ≈ {walkTread}{walkBlondel}.",
            live_spiral_column_part: ", colonna centrale ≈ Ø{columnDia} mm",
            live_spiral_clear_part: ", larghezza utile ≈ {clearWidth} mm",
            live_spiral_walk_blondel_part: " (2R + T_walk ≈ {walkBlondel} mm)",
            live_straight_run:
                "Corsa approssimativa ≈ {run} mm{runLimit}.",
            live_run_limit_part:
                " rispetto alla corsa massima ≈ {maxRun} mm",

            live_comfort_ok_label: "Profilo di comfort bilanciato",
            live_comfort_ok_note:
                "Alzata, pedata e Blondel rientrano nei range di comfort tipici per questa configurazione.",
            live_comfort_warn_label: "Accettabile ma al limite",
            live_comfort_warn_note:
                "Alcuni parametri sono vicini ai limiti – la scala può risultare ripida, poco profonda o un po’ compressa.",
            live_comfort_bad_label: "Non consigliato senza modifiche",
            live_comfort_bad_note:
                "Uno o più parametri sono chiaramente fuori dai range di comfort tipici e andrebbero corretti.",

            summary_no_data:
                "Imposta la geometria al Passo 2 per generare un riepilogo qui.",

            summary_input_title: "Parametri di input",
            summary_geom_title: "Geometria principale suggerita",
            summary_comfort_title: "Nota sul comfort",

            summary_region_label: "Regione",
            summary_usage_label: "Uso",
            summary_type_label: "Tipo di scala",
            summary_height_label: "Altezza piano-piano",
            summary_steps_label: "Numero di alzate",
            summary_steps_manual_suffix: " (manuale)",
            summary_steps_auto_suffix: " (automatico dal profilo)",
            summary_max_run_label: "Corsa massima",
            summary_outer_dia_label: "Diametro esterno",
            summary_column_label: "Colonna centrale",
            summary_column_clear_suffix:
                " (larghezza utile ≈ {clearWidth} mm)",
            summary_headroom_label: "Headroom target",
            summary_spiral_rot_label: "Rotazione chiocciola",
            summary_spiral_rot_unit: "°",
            summary_spiral_step_angle_suffix: " ({stepAngle}° per gradino)",

            summary_riser_label: "Alzata",
            summary_riser_typical_suffix:
                " (tipico {rMin}–{rMax} mm)",
            summary_tread_label_straight: "Pedata",
            summary_tread_label_spiral:
                "Pedata nominale (equivalente rettilinea)",
            summary_tread_typical_suffix:
                " (tipico {tMin}–{tMax} mm)",
            summary_blondel_label: "Blondel (2R + T)",
            summary_blondel_target_suffix:
                " (target {bMin}–{bMax} mm)",
            summary_walk_tread_label: "Pedata sulla linea di cammino",
            summary_walk_tread_suffix:
                " (Blondel ≈ {walkBlondel} mm)",

            comfort_block_bad:
                "Uno o più parametri sono chiaramente fuori dai range di comfort tipici. Prima del dettaglio è fortemente consigliato modificare alzata, pedata, diametro, colonna o rotazione.",
            comfort_block_warn:
                "Alcuni parametri sono vicini ai limiti. La scala può risultare ripida o un po’ compressa. Valuta una piccola ottimizzazione di alzata, pedata, diametro, colonna o rotazione.",
            comfort_block_ok:
                "La geometria proposta è in linea, in modo generale, con i range di comfort tipici per la regione e l’uso selezionati. È comunque necessaria una verifica finale con le norme locali.",

            region_eu: "Europa / UK",
            region_us: "Stati Uniti",
            region_au: "Australia",

            usage_residential: "Residenziale",
            usage_office: "Ufficio / terziario leggero",
            usage_industrial: "Industriale / tecnico",
            usage_external_private: "Esterno – privato",
            usage_external_public: "Esterno – pubblico",

            type_straight: "Dritta",
            type_straight_landing: "Dritta con pianerottolo",
            type_l: "A L",
            type_u: "A U",
            type_spiral: "A chiocciola / elicoidale"
        },

        uk: {
            live_enter_height_basic:
                "Введіть висоту від підлоги до підлоги (≥ 2000 мм), щоб побачити концепцію в реальному часі.",
            live_enter_height_step2:
                "Введіть висоту від підлоги до підлоги (≥ 2000 мм) на Кроці 2, щоб розрахувати концепцію.",

            live_header: "Регіон: {region} · Призначення: {usage} · Тип: {type}",
            live_core:
                "Висота {height} мм → {steps} сходинок, підйом ≈ {riser} мм, проступ ≈ {tread} мм (Блондель ≈ {blondel} мм).",
            live_spiral:
                "Спіраль: зовнішній діаметр ≈ {dia} мм{column}{clear}, поворот ≈ {angle}°, ≈ {stepAngle}° на сходинку; проступ по лінії ходу ≈ {walkTread}{walkBlondel}.",
            live_spiral_column_part:
                ", центральна труба ≈ Ø{columnDia} мм",
            live_spiral_clear_part:
                ", корисна ширина маршу ≈ {clearWidth} мм",
            live_spiral_walk_blondel_part:
                " (2R + T_walk ≈ {walkBlondel} мм)",
            live_straight_run:
                "Орієнтовна довжина маршу ≈ {run} мм{runLimit}.",
            live_run_limit_part:
                " у порівнянні з максимальною довжиною ≈ {maxRun} мм",

            live_comfort_ok_label: "Збалансований комфорт",
            live_comfort_ok_note:
                "Підйом, проступ та Блондель знаходяться в типових комфортних діапазонах для цієї конфігурації.",
            live_comfort_warn_label: "Допустимо, але на межі",
            live_comfort_warn_note:
                "Деякі параметри близькі до граничних значень – сходи можуть відчуватися крутими або дещо стиснутими.",
            live_comfort_bad_label: "Не рекомендовано без змін",
            live_comfort_bad_note:
                "Один або кілька ключових параметрів явно виходять за типові комфортні діапазони і потребують корекції.",

            summary_no_data:
                "Задайте геометрію на Кроці 2, щоб отримати підсумок тут.",

            summary_input_title: "Вхідні параметри",
            summary_geom_title: "Запропонована основна геометрія",
            summary_comfort_title: "Примітка щодо комфорту",

            summary_region_label: "Регіон",
            summary_usage_label: "Призначення",
            summary_type_label: "Тип сходів",
            summary_height_label: "Висота від підлоги до підлоги",
            summary_steps_label: "Кількість сходинок",
            summary_steps_manual_suffix: " (вручну)",
            summary_steps_auto_suffix: " (автоматично з профілю)",
            summary_max_run_label: "Макс. проекція маршу",
            summary_outer_dia_label: "Зовнішній діаметр",
            summary_column_label: "Центральна труба",
            summary_column_clear_suffix:
                " (корисна ширина маршу ≈ {clearWidth} мм)",
            summary_headroom_label: "Цільовий просвіт (headroom)",
            summary_spiral_rot_label: "Кут повороту спіралі",
            summary_spiral_rot_unit: "°",
            summary_spiral_step_angle_suffix:
                " ({stepAngle}° на сходинку)",

            summary_riser_label: "Підйом сходинки",
            summary_riser_typical_suffix:
                " (типово {rMin}–{rMax} мм)",
            summary_tread_label_straight: "Проступ сходинки",
            summary_tread_label_spiral:
                "Номінальний проступ (еквівалент прямої)",
            summary_tread_typical_suffix:
                " (типово {tMin}–{tMax} мм)",
            summary_blondel_label: "Блондель (2R + T)",
            summary_blondel_target_suffix:
                " (ціль {bMin}–{bMax} мм)",
            summary_walk_tread_label:
                "Проступ по лінії ходу",
            summary_walk_tread_suffix:
                " (Блондель ≈ {walkBlondel} мм)",

            comfort_block_bad:
                "Один або кілька параметрів явно виходять за межі комфортних діапазонів. Перед детальним опрацюванням strongly рекомендовано скоригувати підйом, проступ, діаметр, колону чи кут повороту.",
            comfort_block_warn:
                "Деякі параметри близькі до граничних. Сходи можуть здаватися крутими або дещо тісними. Розгляньте можливість тонкого налаштування підйому, проступу, діаметра, колони чи кута.",
            comfort_block_ok:
                "Запропонована геометрія загалом відповідає типовим комфортним діапазонам для вибраного регіону та призначення. Остаточну відповідність нормам потрібно перевірити окремо.",

            region_eu: "Європа / UK",
            region_us: "США",
            region_au: "Австралія",

            usage_residential: "Житлові",
            usage_office: "Офіс / легка комерція",
            usage_industrial: "Індустріальні / технічні",
            usage_external_private: "Зовнішні – приватні",
            usage_external_public: "Зовнішні – публічні",

            type_straight: "Прямі",
            type_straight_landing: "Прямі з площадкою",
            type_l: "Г-подібні",
            type_u: "П-подібні",
            type_spiral: "Спіральні / гвинтові"
        }
    };

    function getWizardStrings() {
        const lang = getLang();
        return WIZARD_I18N[lang] || WIZARD_I18N.en;
    }

    function regionLabel(region) {
        const L = getWizardStrings();
        if (region === "us") return L.region_us;
        if (region === "au") return L.region_au;
        return L.region_eu;
    }

    function usageLabel(usage) {
        const L = getWizardStrings();
        switch (usage) {
            case "office":
                return L.usage_office;
            case "industrial":
                return L.usage_industrial;
            case "external-private":
                return L.usage_external_private;
            case "external-public":
                return L.usage_external_public;
            default:
                return L.usage_residential;
        }
    }

    function typeLabel(type) {
        const L = getWizardStrings();
        switch (type) {
            case "straight-landing":
                return L.type_straight_landing;
            case "l":
                return L.type_l;
            case "u":
                return L.type_u;
            case "spiral":
                return L.type_spiral;
            default:
                return L.type_straight;
        }
    }

    let currentStep = 1;
    let lastSummaryData = null;

    // Авто/Manual стани для полів Step 2
    const AUTO_STATE = {
        steps: true,
        maxRun: true,
        headroom: true,
        spiralAngle: true,
        columnDia: true,
        minTread: true,
        maxRiser: true
    };

    // -----------------------------
    // Геометричні профілі (comfort)
    // -----------------------------
    const GEOM_PROFILES = {
        eu: {
            straight: {
                usage: {
                    residential: {
                        riserMin: 160,
                        riserMax: 190,
                        treadMin: 240,
                        treadMax: 280,
                        blondelMin: 600,
                        blondelMax: 640
                    },
                    office: {
                        riserMin: 150,
                        riserMax: 180,
                        treadMin: 260,
                        treadMax: 300,
                        blondelMin: 600,
                        blondelMax: 640
                    },
                    industrial: {
                        riserMin: 160,
                        riserMax: 200,
                        treadMin: 230,
                        treadMax: 270,
                        blondelMin: 580,
                        blondelMax: 650
                    },
                    "external-private": {
                        riserMin: 160,
                        riserMax: 190,
                        treadMin: 240,
                        treadMax: 280,
                        blondelMin: 600,
                        blondelMax: 640
                    },
                    "external-public": {
                        riserMin: 135,
                        riserMax: 170,
                        treadMin: 280,
                        treadMax: 320,
                        blondelMin: 580,
                        blondelMax: 630
                    }
                }
            },
            spiral: {
                usage: {
                    residential: {
                        riserMin: 170,
                        riserMax: 200,
                        treadMin: 200,
                        treadMax: 260,
                        blondelMin: 580,
                        blondelMax: 640
                    },
                    office: {
                        riserMin: 150,
                        riserMax: 190,
                        treadMin: 230,
                        treadMax: 280,
                        blondelMin: 580,
                        blondelMax: 630
                    },
                    industrial: {
                        riserMin: 170,
                        riserMax: 210,
                        treadMin: 200,
                        treadMax: 260,
                        blondelMin: 580,
                        blondelMax: 650
                    },
                    "external-private": {
                        riserMin: 170,
                        riserMax: 200,
                        treadMin: 210,
                        treadMax: 270,
                        blondelMin: 580,
                        blondelMax: 640
                    },
                    "external-public": {
                        riserMin: 150,
                        riserMax: 190,
                        treadMin: 230,
                        treadMax: 280,
                        blondelMin: 580,
                        blondelMax: 630
                    }
                }
            }
        },

        us: {
            straight: {
                usage: {
                    residential: {
                        riserMin: 165,
                        riserMax: 190,
                        treadMin: 260,
                        treadMax: 290,
                        blondelMin: 610,
                        blondelMax: 645
                    },
                    office: {
                        riserMin: 130,
                        riserMax: 175,
                        treadMin: 280,
                        treadMax: 310,
                        blondelMin: 580,
                        blondelMax: 640
                    },
                    industrial: {
                        riserMin: 170,
                        riserMax: 210,
                        treadMin: 250,
                        treadMax: 280,
                        blondelMin: 600,
                        blondelMax: 650
                    },
                    "external-private": {
                        riserMin: 165,
                        riserMax: 190,
                        treadMin: 260,
                        treadMax: 290,
                        blondelMin: 610,
                        blondelMax: 645
                    },
                    "external-public": {
                        riserMin: 130,
                        riserMax: 175,
                        treadMin: 280,
                        treadMax: 310,
                        blondelMin: 580,
                        blondelMax: 640
                    }
                }
            },
            spiral: {
                usage: {
                    residential: {
                        riserMin: 170,
                        riserMax: 210,
                        treadMin: 210,
                        treadMax: 260,
                        blondelMin: 600,
                        blondelMax: 650
                    },
                    office: {
                        riserMin: 160,
                        riserMax: 190,
                        treadMin: 230,
                        treadMax: 280,
                        blondelMin: 600,
                        blondelMax: 650
                    },
                    industrial: {
                        riserMin: 170,
                        riserMax: 220,
                        treadMin: 210,
                        treadMax: 260,
                        blondelMin: 590,
                        blondelMax: 660
                    },
                    "external-private": {
                        riserMin: 170,
                        riserMax: 210,
                        treadMin: 210,
                        treadMax: 260,
                        blondelMin: 600,
                        blondelMax: 650
                    },
                    "external-public": {
                        riserMin: 160,
                        riserMax: 190,
                        treadMin: 230,
                        treadMax: 280,
                        blondelMin: 600,
                        blondelMax: 650
                    }
                }
            }
        },

        au: {
            straight: {
                usage: {
                    residential: {
                        riserMin: 150,
                        riserMax: 185,
                        treadMin: 250,
                        treadMax: 310,
                        blondelMin: 580,
                        blondelMax: 650
                    },
                    industrial: {
                        riserMin: 140,
                        riserMax: 200,
                        treadMin: 230,
                        treadMax: 320,
                        blondelMin: 560,
                        blondelMax: 670
                    },
                    office: {
                        riserMin: 145,
                        riserMax: 180,
                        treadMin: 260,
                        treadMax: 310,
                        blondelMin: 580,
                        blondelMax: 650
                    },
                    "external-private": {
                        riserMin: 150,
                        riserMax: 185,
                        treadMin: 250,
                        treadMax: 310,
                        blondelMin: 580,
                        blondelMax: 650
                    },
                    "external-public": {
                        riserMin: 140,
                        riserMax: 180,
                        treadMin: 260,
                        treadMax: 320,
                        blondelMin: 580,
                        blondelMax: 650
                    }
                }
            },
            spiral: {
                usage: {
                    residential: {
                        riserMin: 160,
                        riserMax: 200,
                        treadMin: 230,
                        treadMax: 300,
                        blondelMin: 600,
                        blondelMax: 660
                    },
                    office: {
                        riserMin: 150,
                        riserMax: 190,
                        treadMin: 240,
                        treadMax: 310,
                        blondelMin: 600,
                        blondelMax: 660
                    },
                    industrial: {
                        riserMin: 160,
                        riserMax: 210,
                        treadMin: 230,
                        treadMax: 300,
                        blondelMin: 590,
                        blondelMax: 670
                    },
                    "external-private": {
                        riserMin: 160,
                        riserMax: 200,
                        treadMin: 230,
                        treadMax: 300,
                        blondelMin: 600,
                        blondelMax: 660
                    },
                    "external-public": {
                        riserMin: 150,
                        riserMax: 190,
                        treadMin: 240,
                        treadMax: 310,
                        blondelMin: 600,
                        blondelMax: 660
                    }
                }
            }
        }
    };

    const SPIRAL_WIDTH_TARGETS = {
        eu: { minOk: 700, minWarn: 660 },
        us: { minOk: 700, minWarn: 660 },
        au: { minOk: 700, minWarn: 650 },
        default: { minOk: 700, minWarn: 660 }
    };

    const SPIRAL_WIDTH_TEXT = {
        eu: "Spiral clear width often 700–800 mm for private use (check BS 5395-2 & Approved Document K).",
        us: "IRC spiral stairs require around 660 mm minimum clear width; comfort is usually 700+ mm.",
        au: "NCC and AS 1657 often target ~700 mm or more clear width for comfortable use.",
        default: "Clear width for spiral stairs is typically ≥ 660–700 mm, depending on local codes."
    };

    const NORMATIVE_INFO = {
        eu: {
            title: "Key European / UK references",
            items: [
                {
                    label: "BS 5395-2:1984 – Code of practice for helical and spiral stairs",
                    url: "https://codehub.building.govt.nz/resources/bs-539521984/"
                },
                {
                    label: "UK Building Regulations – Approved Document K",
                    url: "https://www.gov.uk/government/publications/protection-from-falling-collision-and-impact-approved-document-k"
                },
                {
                    label: "Eurocode guidance (EN 1991 / EN 1993)",
                    url: "https://eurocodes.jrc.ec.europa.eu/"
                }
            ]
        },
        us: {
            title: "Key US references",
            items: [
                {
                    label: "International Residential Code (IRC) – Stairways",
                    url: "https://codes.iccsafe.org/"
                },
                {
                    label: "International Building Code (IBC) – Stairways",
                    url: "https://upsideinnovations.com/blog/ibc-stairs-code/"
                },
                {
                    label: "OSHA 1910 Subpart D – Walking-Working Surfaces",
                    url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.25"
                }
            ]
        },
        au: {
            title: "Key Australian references",
            items: [
                {
                    label: "AS 1657:2018 – Fixed platforms, walkways, stairways and ladders",
                    url: "https://codehub.building.govt.nz/resources/as-16572018/"
                },
                {
                    label: "NCC (National Construction Code)",
                    url: "https://ncc.abcb.gov.au/"
                },
                {
                    label: "State-based building regulations and guidance",
                    url: "https://www.abcb.gov.au/"
                }
            ]
        }
    };

    // -----------------------------
// Профіль для конкретної конфігурації
// -----------------------------
function getProfile(region, usage, stairType, minTreadPref, maxRiserPref) {
    // Безпечні ключі
    const regKey = GEOM_PROFILES[region] ? region : "eu";
    const typeKey = stairType === "spiral" ? "spiral" : "straight";

    const reg = GEOM_PROFILES[regKey][typeKey];
    const usageMap = reg.usage;
    const useKey = usageMap[usage] ? usage : "residential";

    const base = usageMap[useKey];

    let riserMin = base.riserMin;
    let riserMax = base.riserMax;
    let treadMin = base.treadMin;
    let treadMax = base.treadMax;
    const blondelMin = base.blondelMin;
    const blondelMax = base.blondelMax;

    // Враховуємо побажання користувача
    if (Number.isFinite(maxRiserPref) && maxRiserPref > 0) {
        riserMax = Math.min(riserMax, maxRiserPref);
    }
    if (Number.isFinite(minTreadPref) && minTreadPref > 0) {
        treadMin = Math.max(treadMin, minTreadPref);
    }

    // Мінімальна ширина діапазону, щоб не вийшло 180–180
    if (riserMax < riserMin + 5) riserMax = riserMin + 5;
    if (treadMax < treadMin + 10) treadMax = treadMin + 10;

    return { riserMin, riserMax, treadMin, treadMax, blondelMin, blondelMax };
}

// -----------------------------
// Нормативні нотатки (Step 2 box)
// -----------------------------
function updateNormNotes(region, usage, stairType, profile) {
    const box = $("#swNormNotes");
    if (!box) return;

    const isSpiral = stairType === "spiral";

    // короткий alias для перекладу
    const tt = (key, fb) =>
        (window.APP_I18N && typeof APP_I18N.t === "function")
            ? APP_I18N.t(key, fb)
            : (fb || key);

    const treadLabel = isSpiral
        ? tt("wizard_norm_tread_spiral_label", "Tread at walkline")
        : tt("wizard_norm_tread_straight_label", "Tread / going");

    const runText = isSpiral
        ? tt(
              "wizard_norm_run_spiral",
              "Spiral rotation: typically around 270–450° between floors, depending on layout."
          )
        : tt(
              "wizard_norm_run_straight",
              "Max run: stair projection must fit within available length and headroom constraints."
          );

    const walklineText = isSpiral
        ? tt(
              "wizard_norm_walkline_radius",
              "Walkline radius: measured between inner column and outer edge, typically ≈ 2/3 of clear width from the inner side."
          )
        : "";

    const headroomText = tt(
        "wizard_norm_headroom",
        "Headroom: usually ≥ 2000 mm (check local codes)."
    );

    const html =
        `<ul>` +
        `<li><strong>${tt("wizard_norm_riser_label", "Riser (typical)")}:` +
        `</strong> ${profile.riserMin}–${profile.riserMax} mm</li>` +
        `<li><strong>${treadLabel}:</strong> ${profile.treadMin}–${profile.treadMax} mm</li>` +
        `<li><strong>${tt("wizard_norm_blondel_label", "Blondel (2R + T)")}:` +
        `</strong> ${profile.blondelMin}–${profile.blondelMax} mm</li>` +
        (isSpiral
            ? `<li>${runText}</li>` +
              (walklineText ? `<li>${walklineText}</li>` : "")
            : `<li>${runText}</li>`) +
        `<li>${headroomText}</li>` +
        `</ul>`;

    box.innerHTML = html;
}

// -----------------------------
// Ліміти / підказки під полями (Step 2)
// -----------------------------
function updateGeomLimits(profile, region, usage, stairType) {
    const suffix = `(${region.toUpperCase()}, ${usage})`;
    const isSpiral = stairType === "spiral";

    // Мінімальний tread (комфорт)
    const limitMinTread = $("#swLimitMinTread");
    if (limitMinTread) {
        const treadKey = "wizard_limit_tread_comfort";
        const fbTread = isSpiral
            ? "Tread at walkline comfort"
            : "Tread / going comfort";

        const txtTread = (window.APP_I18N && typeof APP_I18N.t === "function")
            ? APP_I18N.t(treadKey, fbTread)
            : fbTread;

        limitMinTread.textContent =
            `${txtTread}: ${profile.treadMin}–${profile.treadMax} mm ${suffix}.`;
    }

    // Максимальний riser (комфорт)
    const limitMaxRiser = $("#swLimitMaxRiser");
    if (limitMaxRiser) {
        const fbRiser = "Riser comfort range";
        const txtRiser = (window.APP_I18N && typeof APP_I18N.t === "function")
            ? APP_I18N.t("wizard_limit_riser_comfort", fbRiser)
            : fbRiser;

        limitMaxRiser.textContent =
            `${txtRiser}: ${profile.riserMin}–${profile.riserMax} mm ${suffix}.`;
    }

    // Кількість сходинок
    const limitSteps = $("#swLimitSteps");
    if (limitSteps) {
        const fallbackSteps =
            "Typical concept range: 10–18 steps; wizard clamps between 8 and 30 steps";

        let txtSteps = fallbackSteps;
        if (window.APP_I18N && typeof APP_I18N.t === "function") {
            txtSteps = APP_I18N.t("wizard_limit_steps", fallbackSteps);
        }

        limitSteps.textContent = `${txtSteps} ${suffix}.`;
    }

    // Max run / діаметр
    const limitRun = $("#swLimitRun");
    if (limitRun) {
        if (isSpiral) {
            // можна теж завести через I18N, але це вже текст більш вільний
            limitRun.textContent =
                `Spiral comfort often at 1500–1900 mm outer diameter ${suffix}.`;
        } else {
            const fb = "Straight stairs: max run must respect available space and headroom";
            const txt = (window.APP_I18N && typeof APP_I18N.t === "function")
                ? APP_I18N.t("wizard_limit_run_straight_full", fb)
                : fb;
            limitRun.textContent = `${txt} ${suffix}.`;
        }
    }

    // Headroom
    const limitHeadroom = $("#swLimitHeadroom");
    if (limitHeadroom) {
        const fb = "Common target ≥ 2000 mm; many codes accept 1950–2000 mm in specific cases";
        const txt = (window.APP_I18N && typeof APP_I18N.t === "function")
            ? APP_I18N.t("wizard_limit_headroom", fb)
            : fb;
        limitHeadroom.textContent = `${txt} ${suffix}.`;
    }

    // Кут повороту спіралі
    const limitSpiral = $("#swLimitSpiral");
    if (limitSpiral) {
        limitSpiral.textContent =
            `Concept range for total rotation: 270–450°; in constrained layouts 210–540° may be seen ${suffix}.`;
    }

    // Колона та ширина маршу
    const limitColumn = $("#swLimitColumn");
    if (limitColumn) {
        const txt = SPIRAL_WIDTH_TEXT[region] || SPIRAL_WIDTH_TEXT.default;
        limitColumn.textContent =
            `Typical central columns ~114–168 mm; ` + txt;
    }
}


    // -----------------------------
    // Статусні точки
    // -----------------------------
    function setStatusDot(id, status) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove(
            "sw-geom-status--neutral",
            "sw-geom-status--ok",
            "sw-geom-status--warn",
            "sw-geom-status--bad"
        );
        if (status === "ok") el.classList.add("sw-geom-status--ok");
        else if (status === "warning") el.classList.add("sw-geom-status--warn");
        else if (status === "bad") el.classList.add("sw-geom-status--bad");
        else el.classList.add("sw-geom-status--neutral");
    }

    // -----------------------------
    // AUTO / MANUAL
    // -----------------------------
    function setAutoState(key, isAuto) {
        AUTO_STATE[key] = isAuto;

        const toggle = document.querySelector(`.sw-toggle-auto[data-key="${key}"]`);
        const targetId = toggle ? toggle.getAttribute("data-target") : null;
        const input = targetId ? document.getElementById(targetId) : null;

        if (toggle) {
            toggle.classList.toggle("is-auto", isAuto);
            toggle.classList.toggle("is-manual", !isAuto);
            toggle.textContent = isAuto ? "Auto" : "Manual";
        }
        if (input) {
            input.disabled = isAuto;
        }
    }

    function resetAutoStates() {
        setAutoState("steps", true);
        setAutoState("maxRun", true);
        setAutoState("headroom", true);
        setAutoState("spiralAngle", true);
        setAutoState("columnDia", true);
        setAutoState("minTread", true);
        setAutoState("maxRiser", true);
    }

    // -----------------------------
    // Основні обчислення (Step 2)
    // -----------------------------
    function computeConcept() {
        const liveBox = $("#swLiveResult");
        const L = getWizardStrings();

        const region = $("#swRegion")?.value || "eu";
        const usage = $("#swUsage")?.value || "residential";
        const stairType = $("#swType")?.value || "straight";
        const isSpiral = stairType === "spiral";

        const height = parseNum($("#swHeight")?.value, NaN);

        const stepsInputRaw = parseNum($("#swSteps")?.value, NaN);
        let maxRunInput = parseNum($("#swMaxRun")?.value, NaN);
        let headroomInput = parseNum($("#swHeadroom")?.value, NaN);
        let spiralAngleInput = parseNum($("#swSpiralAngle")?.value, NaN);
        let columnDiaInput = parseNum($("#swColumnDia")?.value, NaN);
        const minTreadInput = parseNum($("#swMinTread")?.value, NaN);
        const maxRiserInput = parseNum($("#swMaxRiser")?.value, NaN);

        const minTreadPref = AUTO_STATE.minTread ? NaN : minTreadInput;
        const maxRiserPref = AUTO_STATE.maxRiser ? NaN : maxRiserInput;

        const profile = getProfile(region, usage, stairType, minTreadPref, maxRiserPref);
        updateNormNotes(region, usage, stairType, profile);
        updateGeomLimits(profile, region, usage, stairType);

        // Немає висоти – тільки пояснення
        if (!height || height < 2000) {
            lastSummaryData = null;

            setStatusDot("swStatusHeight", "neutral");
            setStatusDot("swStatusSteps", "neutral");
            setStatusDot("swStatusRun", "neutral");
            setStatusDot("swStatusHeadroom", "neutral");
            setStatusDot("swStatusSpiral", "neutral");
            setStatusDot("swStatusColumn", "neutral");
            setStatusDot("swStatusTread", "neutral");
            setStatusDot("swStatusRiser", "neutral");

            if (liveBox) {
                liveBox.innerHTML =
                    `<p style="font-size:0.8rem;color:#9ca3af;">` +
                    L.live_enter_height_step2 +
                    `</p>`;
            }
            updateSummary(null);
            updateCodes(region);
            return;
        }

        // Висота – статус
        setStatusDot(
            "swStatusHeight",
            height >= 2200 && height <= 3600 ? "ok" : "warning"
        );

        // Авто minTread / maxRiser
        if (AUTO_STATE.minTread) {
            const el = $("#swMinTread");
            if (el) el.value = fmt(profile.treadMin, 0);
        }
        if (AUTO_STATE.maxRiser) {
            const el = $("#swMaxRiser");
            if (el) el.value = fmt(profile.riserMax, 0);
        }

        const targetRiser = (profile.riserMin + profile.riserMax) / 2;

        // Steps
        let steps;
        if (
            !AUTO_STATE.steps &&
            Number.isFinite(stepsInputRaw) &&
            stepsInputRaw >= 8 &&
            stepsInputRaw <= 40
        ) {
            steps = Math.round(stepsInputRaw);
        } else {
            steps = clamp(Math.round(height / targetRiser), 8, 30);
            const elSteps = $("#swSteps");
            if (elSteps && AUTO_STATE.steps) elSteps.value = fmt(steps, 0);
        }

        const riser = height / steps;

        // Headroom
        let headroom;
        if (AUTO_STATE.headroom) {
            headroom = 2000;
            const el = $("#swHeadroom");
            if (el) el.value = fmt(headroom, 0);
        } else {
            headroom = headroomInput;
        }

        // Max run / diameter
        let maxRunOrDia = maxRunInput;

        if (isSpiral && AUTO_STATE.maxRun) {
            maxRunOrDia = 1600;
            const el = $("#swMaxRun");
            if (el) el.value = fmt(maxRunOrDia, 0);
        }

        // Spiral angle
        let spiralAngle = spiralAngleInput;
        if (isSpiral && AUTO_STATE.spiralAngle) {
            spiralAngle = 360;
            const el = $("#swSpiralAngle");
            if (el) el.value = fmt(spiralAngle, 0);
        }
        if (!isSpiral) {
            spiralAngle = 0;
        }

        // Column diameter
        let columnDia = columnDiaInput;
        if (!isSpiral) {
            columnDia = NaN;
            setStatusDot("swStatusColumn", "neutral");
        } else {
            if (AUTO_STATE.columnDia || !Number.isFinite(columnDia) || columnDia <= 0) {
                columnDia = 140;
                const el = $("#swColumnDia");
                if (el) el.value = fmt(columnDia, 0);
            }
        }

        // Blondel / tread
        const blondelTarget = (profile.blondelMin + profile.blondelMax) / 2;
        let tread = blondelTarget - 2 * riser;
        tread = clamp(tread, profile.treadMin, profile.treadMax);
        const blondel = 2 * riser + tread;

        // Статуси core
        let statusBlondel = "warning";
        if (blondel >= profile.blondelMin && blondel <= profile.blondelMax) {
            statusBlondel = "ok";
        } else if (
            blondel < profile.blondelMin - 10 ||
            blondel > profile.blondelMax + 10
        ) {
            statusBlondel = "bad";
        }

        let statusRiser = "ok";
        if (riser < profile.riserMin - 5 || riser > profile.riserMax + 5) {
            statusRiser = "bad";
        } else if (riser < profile.riserMin || riser > profile.riserMax) {
            statusRiser = "warning";
        }

        let statusTread = "ok";
        if (tread < profile.treadMin - 10 || tread > profile.treadMax + 10) {
            statusTread = "bad";
        } else if (tread < profile.treadMin || tread > profile.treadMax) {
            statusTread = "warning";
        }

        setStatusDot("swStatusSteps", statusRiser);
        setStatusDot("swStatusRiser", statusRiser);
        setStatusDot("swStatusTread", statusTread);

        // Run / walkline / clear width
        let approxRun = null;
        let statusRun = null;
        let walkTread = null;
        let walkBlondel = null;
        let statusWalk = null;
        let stepAngle = 0;
        let clearWidth = null;

        if (!isSpiral) {
            approxRun = tread * (steps - 1);
            statusRun = "ok";
            if (maxRunOrDia) {
                if (approxRun <= maxRunOrDia * 1.02) statusRun = "ok";
                else if (approxRun <= maxRunOrDia * 1.2) statusRun = "warning";
                else statusRun = "bad";
            } else {
                statusRun = "warning";
            }

            setStatusDot("swStatusRun", statusRun);
            setStatusDot("swStatusSpiral", "neutral");
            setStatusDot("swStatusColumn", "neutral");
        } else if (maxRunOrDia && maxRunOrDia > 0) {
            const widthTargets =
                SPIRAL_WIDTH_TARGETS[region] || SPIRAL_WIDTH_TARGETS.default;

            const outerRadius = maxRunOrDia / 2;
            const innerStructRadius = (columnDia || 140) / 2;
            const clearanceInner = 50;
            const innerRadius = innerStructRadius + clearanceInner;

            clearWidth = Math.max(outerRadius - innerRadius, 0);

            const walkRadius = innerRadius + (clearWidth * 2) / 3;
            const walkCirc = 2 * Math.PI * walkRadius;
            const walkLen = walkCirc * (spiralAngle / 360);
            walkTread = walkLen / steps;
            walkBlondel = 2 * riser + walkTread;
            stepAngle = spiralAngle / steps;

            if (walkTread >= profile.treadMin && walkTread <= profile.treadMax) {
                statusWalk = "ok";
            } else if (
                walkTread >= profile.treadMin - 10 &&
                walkTread <= profile.treadMax + 10
            ) {
                statusWalk = "warning";
            } else {
                statusWalk = "bad";
            }

            let statusColumn = "neutral";
            if (!clearWidth || clearWidth <= 0) {
                statusColumn = "bad";
            } else if (clearWidth >= widthTargets.minOk) {
                statusColumn = "ok";
            } else if (clearWidth >= widthTargets.minWarn) {
                statusColumn = "warning";
            } else {
                statusColumn = "bad";
            }

            setStatusDot("swStatusRun", statusWalk || "warning");
            setStatusDot("swStatusSpiral", statusWalk || "warning");
            setStatusDot("swStatusColumn", statusColumn);
        } else {
            setStatusDot("swStatusRun", "warning");
            setStatusDot("swStatusSpiral", isSpiral ? "warning" : "neutral");
            setStatusDot("swStatusColumn", isSpiral ? "warning" : "neutral");
        }

        // Headroom
        let statusHead = "warning";
        if (!headroom) statusHead = "warning";
        else if (headroom >= 2000) statusHead = "ok";
        else if (headroom < 1900) statusHead = "bad";
        setStatusDot("swStatusHeadroom", statusHead);

        // Comfort evaluation
        const keyStatuses = [statusRiser, statusTread, statusBlondel].filter(Boolean);
        const hasBad = keyStatuses.some((s) => s === "bad");
        const hasWarn = keyStatuses.some((s) => s === "warning");

        let comfortStatus = "ok";
        let comfortLabel = L.live_comfort_ok_label;
        let comfortNote = L.live_comfort_ok_note;

        if (hasBad) {
            comfortStatus = "bad";
            comfortLabel = L.live_comfort_bad_label;
            comfortNote = L.live_comfort_bad_note;
        } else if (hasWarn) {
            comfortStatus = "warning";
            comfortLabel = L.live_comfort_warn_label;
            comfortNote = L.live_comfort_warn_note;
        }

        // Live overview (локалізовано)
        if (liveBox) {
            const header = tpl(L.live_header, {
                region: regionLabel(region),
                usage: usageLabel(usage),
                type: typeLabel(stairType)
            });

            const core = tpl(L.live_core, {
                height: fmt(height, 0),
                steps: fmt(steps, 0),
                riser: fmt(riser, 1),
                tread: fmt(tread, 1),
                blondel: fmt(blondel, 0)
            });

            let extra = "";

            if (isSpiral && maxRunOrDia) {
                const columnPart = Number.isFinite(columnDia)
                    ? tpl(L.live_spiral_column_part, {
                          columnDia: fmt(columnDia, 0)
                      })
                    : "";
                const clearPart = Number.isFinite(clearWidth)
                    ? tpl(L.live_spiral_clear_part, {
                          clearWidth: fmt(clearWidth, 0)
                      })
                    : "";
                const walkBlondelPart = walkBlondel
                    ? tpl(L.live_spiral_walk_blondel_part, {
                          walkBlondel: fmt(walkBlondel, 0)
                      })
                    : "";

                extra =
                    `<p>` +
                    tpl(L.live_spiral, {
                        dia: fmt(maxRunOrDia, 0),
                        column: columnPart,
                        clear: clearPart,
                        angle: fmt(spiralAngle, 0),
                        stepAngle: fmt(stepAngle, 2),
                        walkTread: walkTread ? fmt(walkTread, 1) + " mm" : "–",
                        walkBlondel: walkBlondelPart
                    }) +
                    `</p>`;
            } else if (!isSpiral && approxRun) {
                const runLimitPart = maxRunOrDia
                    ? tpl(L.live_run_limit_part, {
                          maxRun: fmt(maxRunOrDia, 0)
                      })
                    : "";
                extra =
                    `<p>` +
                    tpl(L.live_straight_run, {
                        run: fmt(approxRun, 0),
                        runLimit: runLimitPart
                    }) +
                    `</p>`;
            }

            liveBox.innerHTML =
                `<div class="sw-result-header">${header}</div>` +
                `<div class="sw-result-main">` +
                `<p>${core}</p>` +
                extra +
                `<p><strong>${comfortLabel}.</strong> ${comfortNote}</p>` +
                `</div>`;
        }

        const summaryData = {
            region,
            usage,
            stairType,
            height,
            steps,
            stepsInput: AUTO_STATE.steps ? NaN : stepsInputRaw,
            maxRunOrDia,
            headroom,
            spiralAngle,
            stepAngle,
            columnDia,
            clearWidth,
            riser,
            tread,
            blondel,
            walkTread,
            walkBlondel,
            profile,
            comfortStatus
        };

        lastSummaryData = summaryData;
        updateSummary(summaryData);
        updateCodes(region);
    }

    // -----------------------------
    // STEP 3 – SUMMARY (локалізовано)
    // -----------------------------
    function updateSummary(data) {
        const box = $("#stairWizardSummary");
        const L = getWizardStrings();
        if (!box) return;

        if (!data) {
            box.innerHTML =
                `<div class="stair-wizard__summary-block">` +
                `<p style="font-size:0.86rem;color:#6b7280;">` +
                L.summary_no_data +
                `</p>` +
                `</div>`;
            return;
        }

        const {
            region,
            usage,
            stairType,
            height,
            steps,
            stepsInput,
            maxRunOrDia,
            headroom,
            spiralAngle,
            stepAngle,
            columnDia,
            clearWidth,
            riser,
            tread,
            blondel,
            walkTread,
            walkBlondel,
            profile,
            comfortStatus
        } = data;

        const isSpiral = stairType === "spiral";

        const regionStr = regionLabel(region);
        const usageStr = usageLabel(usage);
        const typeStr = typeLabel(stairType);

        let html =
            `<div class="stair-wizard__summary-block">` +
            `<h4>${L.summary_input_title}</h4>` +
            `<ul>` +
            `<li><strong>${L.summary_region_label}:</strong> ${regionStr}</li>` +
            `<li><strong>${L.summary_usage_label}:</strong> ${usageStr}</li>` +
            `<li><strong>${L.summary_type_label}:</strong> ${typeStr}</li>` +
            `<li><strong>${L.summary_height_label}:</strong> ${fmt(height, 0)} mm</li>` +
            `<li><strong>${L.summary_steps_label}:</strong> ${steps}` +
            (Number.isFinite(stepsInput)
                ? L.summary_steps_manual_suffix
                : L.summary_steps_auto_suffix) +
            `</li>` +
            (maxRunOrDia
                ? `<li><strong>${isSpiral ? L.summary_outer_dia_label : L.summary_max_run_label}:</strong> ${fmt(
                      maxRunOrDia,
                      0
                  )} mm</li>`
                : "") +
            (isSpiral && Number.isFinite(columnDia)
                ? `<li><strong>${L.summary_column_label}:</strong> Ø${fmt(
                      columnDia,
                      0
                  )} mm` +
                  (Number.isFinite(clearWidth)
                      ? tpl(L.summary_column_clear_suffix, {
                            clearWidth: fmt(clearWidth, 0)
                        })
                      : "") +
                  `</li>`
                : "") +
            (headroom
                ? `<li><strong>${L.summary_headroom_label}:</strong> ${fmt(
                      headroom,
                      0
                  )} mm</li>`
                : "") +
            (isSpiral && spiralAngle
                ? `<li><strong>${L.summary_spiral_rot_label}:</strong> ${fmt(
                      spiralAngle,
                      0
                  )}${L.summary_spiral_rot_unit}${tpl(
                      L.summary_spiral_step_angle_suffix,
                      { stepAngle: fmt(stepAngle, 2) }
                  )}</li>`
                : "") +
            `</ul>` +
            `</div>`;

        html +=
            `<div class="stair-wizard__summary-block">` +
            `<h4>${L.summary_geom_title}</h4>` +
            `<ul>` +
            `<li><strong>${L.summary_riser_label}:</strong> ${fmt(riser, 1)} mm` +
            tpl(L.summary_riser_typical_suffix, {
                rMin: profile.riserMin,
                rMax: profile.riserMax
            }) +
            `</li>` +
            (isSpiral
                ? `<li><strong>${L.summary_tread_label_spiral}:</strong> ${fmt(
                      tread,
                      1
                  )} mm</li>`
                : `<li><strong>${L.summary_tread_label_straight}:</strong> ${fmt(
                      tread,
                      1
                  )} mm` +
                  tpl(L.summary_tread_typical_suffix, {
                      tMin: profile.treadMin,
                      tMax: profile.treadMax
                  }) +
                  `</li>`) +
            `<li><strong>${L.summary_blondel_label}:</strong> ${fmt(
                blondel,
                0
            )} mm` +
            tpl(L.summary_blondel_target_suffix, {
                bMin: profile.blondelMin,
                bMax: profile.blondelMax
            }) +
            `</li>` +
            (isSpiral && walkTread
                ? `<li><strong>${L.summary_walk_tread_label}:</strong> ${fmt(
                      walkTread,
                      1
                  )} mm` +
                  tpl(L.summary_walk_tread_suffix, {
                      walkBlondel: fmt(walkBlondel, 0)
                  }) +
                  `</li>`
                : "") +
            `</ul>` +
            `</div>`;

        let comfortText = L.comfort_block_ok;
        if (comfortStatus === "bad") {
            comfortText = L.comfort_block_bad;
        } else if (comfortStatus === "warning") {
            comfortText = L.comfort_block_warn;
        }

        html +=
            `<div class="stair-wizard__summary-block">` +
            `<h4>${L.summary_comfort_title}</h4>` +
            `<p>${comfortText}</p>` +
            `</div>`;

        box.innerHTML = html;
    }

    // -----------------------------
    // Normative links (Step 3)
    // -----------------------------
    function updateCodes(region) {
    const box = $("#stairWizardCodes");
    if (!box) return;

    const info = NORMATIVE_INFO[region] || NORMATIVE_INFO.eu;

    // локальний alias для перекладів
    const tt = (key, fb) =>
        (window.APP_I18N && typeof APP_I18N.t === "function")
            ? APP_I18N.t(key, fb)
            : (fb || key);

    const hintText = tt(
        "wizard_codes_hint",
        "These references summarise typical stair geometry requirements. Local amendments or additional regulations may apply – final compliance must always be checked by a local engineer or building authority."
    );

    let html =
        `<div class="stair-wizard__summary-block">` +
        `<h4>${info.title}</h4>` +
        `<ul>`;

    info.items.forEach((item) => {
        html +=
            `<li>` +
            `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>` +
            `</li>`;
    });

    html +=
        `</ul>` +
        `<p class="stair-wizard__hint-small">${hintText}</p>` +
        `</div>`;

    box.innerHTML = html;
}
   // -----------------------------
// Message builder (локалізований)
// -----------------------------
function buildMessage() {
    const textArea = $("#swMessageBox");
    if (!textArea) return;

    const I18N = window.APP_I18N || null;
    const t = (key, fb) =>
        (I18N && typeof I18N.t === "function")
            ? I18N.t(key, fb)
            : (fb || key);

    // Якщо немає розрахованих даних – показуємо локалізоване попередження
    if (!lastSummaryData) {
        textArea.value = t(
            "wizard_msg_no_data",
            "Please set at least floor-to-floor height and geometry on Step 2 so the wizard can generate a message."
        );
        textArea.focus();
        textArea.select();
        return;
    }

    const d = lastSummaryData;
    const isSpiral = d.stairType === "spiral";

    // Локалізовані назви регіону / призначення / типу
    const regionStr = regionLabel(d.region);
    const usageStr = usageLabel(d.usage);
    const typeStr = typeLabel(d.stairType);

    // Сuffix для “manual / auto” беремо з WIZARD_I18N (ті ж, що й у summary)
    const L = getWizardStrings();
    const stepsSuffix = Number.isFinite(d.stepsInput)
        ? (L.summary_steps_manual_suffix || " (manual)")
        : (L.summary_steps_auto_suffix || " (auto from profile)");

    const lines = [];

    // Привітання + вступ (локалізовано)
    lines.push(
        t("wizard_msg_greeting", "Hello Vitalii,")
    );
    lines.push("");
    lines.push(
        t(
            "wizard_msg_intro",
            "Here is a stair concept I would like you to review:"
        )
    );
    lines.push("");

    // Параметри (мітки також з i18n)
    lines.push(
        `• ${t("wizard_msg_label_region", "Region / code base")}: ${regionStr}`
    );
    lines.push(
        `• ${t("wizard_msg_label_usage", "Usage")}: ${usageStr}`
    );
    lines.push(
        `• ${t("wizard_msg_label_type", "Stair type")}: ${typeStr}`
    );
    lines.push(
        `• ${t("wizard_msg_label_height", "Floor-to-floor height")}: ${fmt(
            d.height,
            0
        )} mm`
    );
    lines.push(
        `• ${t("wizard_msg_label_steps", "Number of steps")}: ${d.steps}${stepsSuffix}`
    );

    if (d.maxRunOrDia) {
        if (isSpiral) {
            lines.push(
                `• ${t("wizard_msg_label_outer_dia", "Outer diameter")}: ${fmt(
                    d.maxRunOrDia,
                    0
                )} mm`
            );
        } else {
            lines.push(
                `• ${t("wizard_msg_label_max_run", "Max run")}: ${fmt(
                    d.maxRunOrDia,
                    0
                )} mm`
            );
        }
    }

    if (isSpiral && Number.isFinite(d.columnDia)) {
        let colLine =
            `• ${t("wizard_msg_label_column", "Central column")}: Ø${fmt(
                d.columnDia,
                0
            )} mm`;
        if (Number.isFinite(d.clearWidth)) {
            colLine += ` (${t(
                "wizard_summary_clear_width_suffix",
                "clear stair width"
            )} ≈ ${fmt(d.clearWidth, 0)} mm)`;
        }
        lines.push(colLine);
    }

    if (d.headroom) {
        lines.push(
            `• ${t("wizard_msg_label_headroom", "Target headroom")}: ${fmt(
                d.headroom,
                0
            )} mm`
        );
    }

    if (isSpiral && d.spiralAngle) {
        lines.push(
            `• ${t("wizard_msg_label_spiral_angle", "Spiral rotation")}: ${fmt(
                d.spiralAngle,
                0
            )}° (≈ ${fmt(d.stepAngle, 2)}° per step)`
        );
    }

    lines.push(
        `• ${t("wizard_msg_label_riser", "Riser")}: ≈ ${fmt(
            d.riser,
            1
        )} mm (typical ${d.profile.riserMin}–${d.profile.riserMax} mm)`
    );

    lines.push(
        `• ${t("wizard_msg_label_tread", "Tread / going")}: ≈ ${fmt(
            d.tread,
            1
        )} mm (typical ${d.profile.treadMin}–${d.profile.treadMax} mm)`
    );

    lines.push(
        `• ${t("wizard_msg_label_blondel", "Blondel 2R + T")}: ≈ ${fmt(
            d.blondel,
            0
        )} mm (target ${d.profile.blondelMin}–${d.profile.blondelMax} mm)`
    );

    if (isSpiral && d.walkTread) {
        lines.push(
            `• ${t("wizard_msg_label_walkline", "Tread at walkline")}: ≈ ${fmt(
                d.walkTread,
                1
            )} mm (Blondel ≈ ${fmt(d.walkBlondel, 0)} mm)`
        );
    }

    lines.push("");
    lines.push(
        t(
            "wizard_msg_outro",
            "Please check this configuration against the relevant local codes and, if it is viable, refine the geometry and prepare a full production-ready design (3D model, drawings, DXF, STEP, BOM)."
        )
    );
    lines.push("");
    lines.push(
        t("wizard_msg_thanks", "Thank you!")
    );

    textArea.value = lines.join("\n");
    textArea.focus();
    textArea.select();
}

    // -----------------------------
    // Step navigation
    // -----------------------------
    function setStep(step) {
        currentStep = clamp(step, 1, 3);
        const stepsEls = $all(".stair-wizard__step");
        const indicators = $all(".stair-wizard__step-indicator");

        stepsEls.forEach((s) => {
            s.classList.toggle(
                "is-active",
                Number(s.getAttribute("data-step")) === currentStep
            );
        });

        indicators.forEach((i) => {
            i.classList.toggle(
                "is-active",
                Number(i.getAttribute("data-step")) === currentStep
            );
        });

        const prevBtn = $("#stairWizardPrev");
        const nextBtn = $("#stairWizardNext");

        if (prevBtn) prevBtn.disabled = currentStep === 1;

        if (nextBtn) {
            nextBtn.textContent = "Next →";
            nextBtn.style.display = currentStep === 3 ? "none" : "";
        }
    }

    function openWizard() {
        const w = $("#stairWizard");
        if (!w) return;
        w.setAttribute("aria-hidden", "false");
        w.classList.add("is-open");
        document.body.classList.add("no-scroll-wizard");
        setStep(1);
        computeConcept();
    }

    function closeWizard() {
        const w = $("#stairWizard");
        if (!w) return;
        w.setAttribute("aria-hidden", "true");
        w.classList.remove("is-open");
        document.body.classList.remove("no-scroll-wizard");
    }

    function toggleSpiralVisibility() {
        const type = $("#swType")?.value || "straight";
        const rowSpiral = $("#swSpiralRow");
        const rowColumn = $("#swColumnRow");
        const isSpiral = type === "spiral";

        if (rowSpiral) {
            rowSpiral.style.display = isSpiral ? "" : "none";
        }
        if (rowColumn) {
            rowColumn.style.display = isSpiral ? "" : "none";
        }
    }

    function resetGeometry() {
        const ids = [
            "swHeight",
            "swSteps",
            "swMaxRun",
            "swHeadroom",
            "swSpiralAngle",
            "swColumnDia",
            "swMinTread",
            "swMaxRiser"
        ];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });
        resetAutoStates();
        lastSummaryData = null;

        const liveBox = $("#swLiveResult");
        if (liveBox) {
            const L = getWizardStrings();
            liveBox.innerHTML =
                `<p style="font-size:0.8rem;color:#9ca3af;">` +
                L.live_enter_height_basic +
                `</p>`;
        }

        setStatusDot("swStatusHeight", "neutral");
        setStatusDot("swStatusSteps", "neutral");
        setStatusDot("swStatusRun", "neutral");
        setStatusDot("swStatusHeadroom", "neutral");
        setStatusDot("swStatusSpiral", "neutral");
        setStatusDot("swStatusColumn", "neutral");
        setStatusDot("swStatusTread", "neutral");
        setStatusDot("swStatusRiser", "neutral");

        updateSummary(null);
    }

    // -----------------------------
    // INIT
    // -----------------------------
    document.addEventListener("DOMContentLoaded", function () {
        const openBtn = $("#openStairWizard");
        const closeBtn = $("#stairWizardClose");
        const cancelBtn = $("#stairWizardCancel");
        const prevBtn = $("#stairWizardPrev");
        const nextBtn = $("#stairWizardNext");
        const backdrop = $("#stairWizard .stair-wizard__backdrop");
        const resetBtn = $("#swResetBtn");
        const msgBtn = $("#swBuildMessage");

        if (openBtn) openBtn.addEventListener("click", openWizard);
        if (closeBtn) closeBtn.addEventListener("click", closeWizard);
        if (cancelBtn) cancelBtn.addEventListener("click", closeWizard);
        if (backdrop) backdrop.addEventListener("click", closeWizard);

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                setStep(currentStep - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                if (currentStep < 3) {
                    setStep(currentStep + 1);
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", function () {
                resetGeometry();
                computeConcept();
            });
        }

        if (msgBtn) {
            msgBtn.addEventListener("click", buildMessage);
        }

        document.addEventListener("keydown", function (ev) {
            if (ev.key === "Escape") {
                const w = $("#stairWizard");
                if (w && w.classList.contains("is-open")) {
                    closeWizard();
                }
            }
        });

        // Auto/Manual toggle buttons
        $all(".sw-toggle-auto").forEach((btn) => {
            btn.addEventListener("click", function () {
                const key = btn.getAttribute("data-key");
                if (!key) return;
                const newState = !AUTO_STATE[key];
                setAutoState(key, newState);
                computeConcept();
            });
        });

        // Live-оновлення
        const wizard = $("#stairWizard");
        if (wizard) {
            const inputs = $all("input, select", wizard);
            inputs.forEach((el) => {
                const evt =
                    el.tagName === "SELECT" || el.type === "number"
                        ? "change"
                        : "input";
                el.addEventListener(evt, function () {
                    if (el.id === "swType") {
                        toggleSpiralVisibility();
                    }
                    computeConcept();
                });
            });
        }

        // Реакція на зміну мови (з translations.js)
        document.addEventListener("app:language-changed", function () {
            const region = $("#swRegion")?.value || "eu";
            const usage = $("#swUsage")?.value || "residential";
            const stairType = $("#swType")?.value || "straight";

            const minTreadInput = parseNum($("#swMinTread")?.value, NaN);
            const maxRiserInput = parseNum($("#swMaxRiser")?.value, NaN);
            const minTreadPref = AUTO_STATE.minTread ? NaN : minTreadInput;
            const maxRiserPref = AUTO_STATE.maxRiser ? NaN : maxRiserInput;

            const profile = getProfile(
                region,
                usage,
                stairType,
                minTreadPref,
                maxRiserPref
            );
            updateNormNotes(region, usage, stairType, profile);
            updateGeomLimits(profile, region, usage, stairType);

            computeConcept();
        });

        resetAutoStates();
        toggleSpiralVisibility();
        computeConcept();
        updateCodes($("#swRegion")?.value || "eu");
        setStep(1);
    });
})();

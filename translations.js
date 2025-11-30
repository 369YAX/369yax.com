// =====================================================
// 369YAX – translations.js
// Усі тексти сайту + словник для чату в одному місці
// =====================================================

(function () {
    // Ключ для збереження мови
    const LANG_STORAGE_KEY = "369yax_lang";

    // -----------------------------
    // UI-тексти (data-i18n)
    // -----------------------------
    const UI_TRANSLATIONS = {
        // =============================
        // ENGLISH
        // =============================
        en: {
            nav_services: "Services",
            nav_portfolio: "Portfolio",
            nav_macros: "SW Macros",
            nav_about: "About",
            nav_contact: "Contact",

            hero_title:
                'Production-ready design for<br /><span class="accent">metal structures &amp; staircases</span>',
            hero_sub:
                "I’m <strong>Vitalii Borys</strong>, mechanical designer based in Italy. Under the brand <strong>369YAX – Automation &amp; Design</strong> I help workshops and fabrication companies turn ideas into <strong>SolidWorks models, drawings, DXF, STEP &amp; BOM</strong> ready for real production – with a strong focus on spiral stairs, sheet metal and welded steel structures.",
            hero_btn_primary: "Send a project request",
            hero_btn_secondary: "View portfolio",
            wizard_btn_open: "Generate stair concept",
            hero_tag_1: "Spiral stairs (EU / US / AU)",
            hero_tag_2: "Sheet metal &amp; welded frames",
            hero_tag_3: "SolidWorks automation &amp; macros",
            hero_card_title: "What you get with 369YAX",
            hero_card_li_1: "3D models (SolidWorks, STEP)",
            hero_card_li_2: "Manufacturing drawings (PDF, DWG, DXF)",
            hero_card_li_3: "Cut lists &amp; BOM ready for fabrication",
            hero_card_li_4: "Laser &amp; bending-ready sheet metal parts",
            hero_card_li_5: "Custom SolidWorks macros for your workflow",
            hero_note: "Based in Italy · Remote worldwide · English / Italian / Ukrainian",

            services_title: "Services",
            services_subtitle:
                "Practical, workshop-oriented design with focus on manufacturability, standards and clean documentation.",
            services_card1_title: "Spiral &amp; straight stair design",
            services_card1_text:
                "Design of spiral and straight stairs with compliance checks (EU / UK, US, AU), clear geometry and safe walking comfort.",
            services_card1_li_1: "Spiral stairs with walkline &amp; headroom control",
            services_card1_li_2: "Straight stairs, landings, railings and guardrails",
            services_card1_li_3: "Full package: 3D model, drawings, DXF, BOM",

            services_card2_title: "Sheet metal &amp; welded structures",
            services_card2_text:
                "Design and optimization of sheet metal parts, stainless steel elements, support frames and industrial brackets ready for TRUMPF laser &amp; bending.",
            services_card2_li_1: "Flat patterns (DXF, DWG) with correct bend allowances",
            services_card2_li_2: "Welded frames, platforms, brackets and supports",
            services_card2_li_3: "Welding symbols, notes and cut lists for the workshop",

            services_card3_title: "SolidWorks automation &amp; macros",
            services_card3_text:
                "Custom SolidWorks tools under the 369YAX ecosystem to speed up repetitive work and standardize your documentation and models.",
            services_card3_li_1: "Automatic part &amp; drawing creation from templates",
            services_card3_li_2: "BOM and cut-list export to Excel",
            services_card3_li_3: "Project libraries and property automation",

            portfolio_title: "Selected projects",
            portfolio_subtitle:
                "A few examples of how I combine SolidWorks, standards and real metalworking experience. More detailed references available on request.",
            portfolio_item1_title: "Indoor spiral staircase – compliant configuration",
            portfolio_item1_text:
                "Parametric spiral stair designed around local regulations with checked walkline, headroom and comfortable riser/tread combination. Deliverables included complete 3D model, production drawings, DXF for laser cutting and detailed BOM.",
            portfolio_item1_tag: "Spiral stairs",

            portfolio_item2_title: "Stainless steel A4 shelf",
            portfolio_item2_text:
                "Minimalistic sheet metal shelf for laser cutting and bending, optimized for clean manufacturing with clear drawings, flat patterns and all fixing details prepared.",
            portfolio_item2_tag: "Sheet metal",

            portfolio_item3_title: "Industrial support frame",
            portfolio_item3_text:
                "Welded steel frame with correctly dimensioned profiles, connection details and workshop-ready drawings including cut lists, welding notes and assembly views.",
            portfolio_item3_tag: "Welded structure",

            portfolio_item4_title: "Custom automation tools – 369YAX macros",
            portfolio_item4_text:
                "Internal macro pack for SolidWorks: automatic creation of parts and drawings, project property population, BOM export and standard note libraries used daily to accelerate design work.",
            portfolio_item4_tag: "Automation",

            macros_title: "369YAX – SolidWorks automation",
            macros_subtitle:
                "A growing ecosystem of custom tools built around real daily needs in SolidWorks: parts, drawings, BOM, standards and project management.",
            macros_card1_title: "IntelliPack / project tools",
            macros_card1_text:
                "Tools for organizing project structure, standardizing naming and automating repetitive actions related to drawings and BOM export.",
            macros_card1_li_1: "Automatic creation of project folders and files",
            macros_card1_li_2: "Batch update of model properties",
            macros_card1_li_3: "Smart export of BOM and cut lists",

            macros_card2_title: "IntelliStandards &amp; note libraries",
            macros_card2_text:
                "Macro-driven libraries of technical notes, welding symbols and standard texts aligned with ISO/UNI/EN practices, ready to drop into your drawings.",
            macros_card2_li_1: "Bilingual notes (IT / EN, and more when needed)",
            macros_card2_li_2: "Standardized welding and tolerance notes",
            macros_card2_li_3: "Fast insertion into SolidWorks drawings",

            macros_card3_title: "Stair generators",
            macros_card3_text:
                "Dedicated tools to assist with spiral and straight stair configuration, checking comfort and key parameters against selected standards.",
            macros_card3_li_1: "Parametric spiral stair configurations",
            macros_card3_li_2: "Support for EU / US / AU rulesets",
            macros_card3_li_3: "Export-ready geometry for further detailing",

            about_title: "About 369YAX &amp; Vitalii",
            about_subtitle: "Mechanical design with real workshop background – not just “nice CAD pictures”.",
            about_text:
                "I’m <strong>Vitalii Borys</strong>, mechanical designer and SolidWorks power-user based in Italy, working under the brand <strong>369YAX – Automation &amp; Design</strong>. Before focusing on design and automation, I spent years directly in metal fabrication environments, which strongly influences the way I model and document projects.",
            about_li_1:
                "8+ years in metalworking (bending, rolling, MIG/MAG welding, TRUMPF laser)",
            about_li_2:
                "3+ years professional SolidWorks work (Italian version, 3D &amp; drawings)",
            about_li_3: "Experience in Italian companies: Metalinox, Gortani, OFFMA",
            about_li_4: "TRUMPF BOOST &amp; TruBend programming for laser cutting and bending",
            about_li_5: "Focus on simple, robust and workshop-friendly solutions",

            about_box_title: "How I work",
            about_box_li_1: "Start from your idea, sketch, photos or existing 3D/drawings",
            about_box_li_2: "Clarify constraints: standards, materials, processes, budget",
            about_box_li_3: "Develop clear 3D models and engineering drawings",
            about_box_li_4: "Deliver production-ready files: DXF, DWG, STEP, PDF, BOM",
            about_box_li_5: "Communicate in English, Italian or Ukrainian as you prefer",

            contact_title: "Let’s work together",
            contact_subtitle:
                "Tell me a bit about your project – stairs, sheet metal, welded frame or SolidWorks automation – and I’ll come back with a clear, practical way to move forward.",
            contact_direct_title: "Direct contact",
            contact_email_label: "Email:",
            contact_location: "Location: Italy · Working remotely with clients worldwide",
            contact_note:
                "For a faster start, please include: project type (stairs, frame, sheet metal, macro), approximate dimensions, material, and what deliverables you need (3D, drawings, DXF, STEP, BOM).",
            contact_platforms_title: "Freelance platforms",
            contact_platforms_note:
                'You can also contact me directly via freelance platforms – just search for <strong>“369YAX”</strong> and send a short description of your idea.',

            contact_form_title: "Contact form",
            contact_form_name_label: "Your name",
            contact_form_email_label: "Your email",
            contact_form_subject_label: "Project type / subject",
            contact_form_message_label: "Project details",
            contact_form_submit: "Send message",
            contact_form_hint:
                "The form will open your email client with a pre-filled message to 369yax@gmail.com – you can review and send it.",

            footer_left: "© 369YAX – Automation &amp; Design · Vitalii Borys",
            footer_right: "SolidWorks · Metal structures · Spiral &amp; straight stairs · Automation",

            // -----------------------------
// STAIR WIZARD (EN)
// -----------------------------
wizard_title: "Stair concept generator",
wizard_intro:
    "Quick concept-level configuration for stairs according to common comfort rules and typical ranges used in Europe, US and Australia. Final compliance must always be checked by a local engineer.",

wizard_step1_label: "Region &amp; type",
wizard_step2_label: "Geometry",
wizard_step3_label: "Preferences",
wizard_step4_label: "Result",

wizard_step1_title: "1. Region, use and stair type",

wizard_region_label: "Region / code base",
wizard_region_eu: "Europe / UK",
wizard_region_us: "United States",
wizard_region_au: "Australia",
wizard_region_hint:
    "Used to select typical riser / tread ranges and comfort targets.",

wizard_usage_label: "Primary use",
wizard_usage_residential: "Residential (house, apartment)",
wizard_usage_office: "Office / light commercial",
wizard_usage_industrial: "Industrial / plant access (technical)",
wizard_usage_external_private: "External – private use",
wizard_usage_external_public: "External – public use",

wizard_type_label: "Stair type",
wizard_type_straight: "Straight, one flight",
wizard_type_straight_landing: "Straight with landing",
wizard_type_l: "L-shaped (quarter turn)",
wizard_type_u: "U-shaped (half turn)",
wizard_type_spiral: "Spiral / helical",
wizard_type_hint:
    "In this version, geometry is calculated like a single flight. For turns / landings I’ll summarise recommended constraints.",

wizard_step2_title: "2. Geometry – height and available space",

wizard_height_label: "Floor-to-floor height (mm)",
wizard_height_hint:
    "Vertical distance between finished floors (not just clear opening).",

wizard_run_label: "Max. horizontal run / diameter (mm)",
wizard_run_hint:
    "For straight stairs – max available run. For spiral – max outer diameter.",

wizard_headroom_label: "Target headroom (mm)",
wizard_headroom_hint:
    "Typical minimum is around 2000 mm, depends on local rules.",

wizard_spiral_angle_label: "Spiral rotation (°)",
wizard_spiral_angle_hint:
    "Used only for spiral stairs: total rotation between floors (e.g. 360°, 450°).",

wizard_center_column_label: "Central column diameter (mm)",
wizard_center_column_hint:
    "Used only for spiral stairs: outside diameter of the central supporting tube.",

wizard_step3_title: "3. Comfort vs compactness",

wizard_comfort_label: "Comfort level",
wizard_comfort_option_comfort:
    "Comfort first (lower riser, deeper tread)",
wizard_comfort_option_balanced: "Balanced",
wizard_comfort_option_compact:
    "More compact (higher riser, shorter run)",

wizard_min_tread_label: "Preferred minimum tread at walkline (mm)",
wizard_min_tread_hint:
    "Many comfort ranges use 240–280 mm at the walkline for residential stairs.",

wizard_max_riser_label: "Preferred maximum riser (mm)",
wizard_max_riser_hint:
    "The wizard will try to keep the riser below this value where possible.",

wizard_step4_title: "4. Suggested configuration (concept only)",

wizard_result_placeholder:
    'Fill in the previous steps and click <strong>“Generate concept”</strong> to see a suggested configuration.',

wizard_disclaimer:
    "This tool provides concept-level geometry using typical comfort rules (e.g. Blondel: <code>2 × riser + tread ≈ 600–640&nbsp;mm</code>) and usual ranges for residential / light commercial stairs. It is <strong>not</strong> a certified code-check. Final design and compliance with local standards (EU/EN, BS, IRC/IBC, AS/NCC, etc.) must be verified by a local engineer or architect.",

// Wizard – help texts
wizard_steps_help_title: "What happens on the next steps?",
wizard_steps_help_p1:
    "Step 2 will suggest a complete geometry (steps, riser, tread, run/diameter, headroom, spiral rotation, central column and walkline comfort).",
wizard_steps_help_p2:
    "You can switch any parameter from Auto to Manual if you want full control.",
wizard_steps_help_p3:
    "Step 3 collects everything into a clean summary, adds reference standards for your region and generates a ready-to-send message to 369YAX.",

wizard_steps_label: "Number of steps",
wizard_steps_hint:
    "Automatically derived from comfort profile; override only if you know the exact step count.",
wizard_steps_note:
    "Typical concept range: 10–18 steps; the wizard clamps between 8 and 30 steps.",

wizard_step1_intro:
    "Choose where the stair will be used, its main purpose and the general stair type. These choices define comfort ranges for riser, tread and Blondel, as well as typical values for spiral stairs.",

wizard_step2_intro:
    "Start with floor-to-floor height. All other parameters are automatically selected from comfort profiles and can be switched to manual control when needed. Small status dots show whether each parameter is inside typical comfort ranges (green), near the limit (yellow) or clearly out of range (red).",

wizard_geom_auto_note:
    "Most fields are <strong>Auto</strong> by default. Switch to <strong>Manual</strong> to override.",

wizard_reset_geometry: "Reset geometry",

wizard_limit_height:
    "Typical residential range ≈ 2600–3200 mm (concept).",

wizard_norm_box_title:
    "Typical comfort ranges for this configuration",

wizard_msg_title: "Generate a message for 369YAX",
wizard_msg_hint:
    "Click the button to generate a short technical description with all key parameters. You can copy-paste it into an email or the contact form.",
wizard_msg_btn: "Build message from current concept",

// --- Norm notes (Step 2 box) ---
wizard_norm_riser_label: "Riser (typical)",
wizard_norm_tread_straight_label: "Tread / going",
wizard_norm_tread_spiral_label: "Tread at walkline",
wizard_norm_blondel_label: "Blondel (2R + T)",
wizard_norm_run_straight:
    "Max run: stair projection must fit within available length and headroom constraints.",
wizard_norm_run_spiral:
    "Spiral rotation: typically around 270–450° between floors, depending on layout.",
wizard_norm_walkline_radius:
    "Walkline radius: usually measured between inner column and outer edge, often ≈ 2/3 of clear width from the inner side.",
wizard_norm_headroom:
    "Headroom: usually ≥ 2000 mm (check local codes).",

// --- Step 3: codes + message ---
wizard_codes_hint:
    "These references summarise typical stair geometry requirements. Local amendments or additional regulations may apply – final compliance must always be checked by a local engineer or building authority.",
wizard_message_title: "Generate a message for 369YAX",
wizard_message_hint:
    "Click the button to generate a short technical description with all key parameters. You can copy-paste it into an email or the contact form.",
wizard_message_btn: "Build message from current concept",
wizard_message_placeholder: "The message will appear here…",
wizard_message_missing:
    "Please set at least floor-to-floor height and geometry on Step 2 so the wizard can generate a message.",

wizard_limit_steps:
    "Typical concept range: 10–18 steps; wizard clamps between 8 and 30 steps",
wizard_limit_run_straight:
    "Straight stairs: max run must respect available space and headroom",
wizard_limit_headroom:
    "Common target ≥ 2000 mm; many codes accept 1950–2000 mm in specific cases",
wizard_limit_tread_comfort:
    "Tread / going comfort",
wizard_limit_riser_comfort:
    "Riser comfort range",
wizard_limit_run_straight_full:
    "Straight stairs: max run must respect available space and headroom",

// -----------------------------
// STAIR WIZARD – MESSAGE (EN)
// -----------------------------
wizard_msg_greeting: "Hello Vitalii,",
wizard_msg_intro: "Here is a stair concept I would like you to review:",
wizard_msg_outro:
    "Please check this configuration against the relevant local codes and, if it is viable, refine the geometry and prepare a full production-ready design (3D model, drawings, DXF, STEP, BOM).",
wizard_msg_thanks: "Thank you!",
wizard_msg_no_data:
    "Please set at least floor-to-floor height and geometry on Step 2 so the wizard can generate a message.",

wizard_msg_label_region: "Region / code base",
wizard_msg_label_usage: "Usage",
wizard_msg_label_type: "Stair type",
wizard_msg_label_height: "Floor-to-floor height",
wizard_msg_label_steps: "Number of steps",
wizard_msg_label_outer_dia: "Outer diameter",
wizard_msg_label_max_run: "Max run",
wizard_msg_label_column: "Central column",
wizard_msg_label_headroom: "Target headroom",
wizard_msg_label_spiral_angle: "Spiral rotation",
wizard_msg_label_riser: "Riser",
wizard_msg_label_tread: "Tread",
wizard_msg_label_blondel: "Blondel 2R + T",
wizard_msg_label_walkline: "Tread at walkline",

wizard_btn_back: "← Back",
wizard_btn_cancel: "Cancel",
wizard_btn_next: "Next →",
wizard_btn_generate: "🧮 Generate concept",
            
        },

        // =============================
        // ITALIAN
        // =============================
        it: {
            nav_services: "Servizi",
            nav_portfolio: "Portfolio",
            nav_macros: "SW Macros",
            nav_about: "Chi sono",
            nav_contact: "Contatti",

            hero_title:
                'Progettazione pronta per la produzione<br /><span class="accent">strutture metalliche e scale</span>',
            hero_sub:
                "Sono <strong>Vitalii Borys</strong>, disegnatore meccanico con base in Italia. Con il marchio <strong>369YAX – Automation &amp; Design</strong> aiuto officine e aziende metalmeccaniche a trasformare idee in <strong>modelli SolidWorks, disegni, DXF, STEP e distinte materiali</strong> pronti per la produzione reale – con un forte focus su scale a chiocciola, carpenteria e lamiera.",
            hero_btn_primary: "Inviami il tuo progetto",
            hero_btn_secondary: "Guarda il portfolio",
            wizard_btn_open: "Genera concetto di scala",
            hero_tag_1: "Scale a chiocciola (EU / US / AU)",
            hero_tag_2: "Lamiera e carpenteria saldata",
            hero_tag_3: "Automazione e macro SolidWorks",
            hero_card_title: "Cosa offre 369YAX",
            hero_card_li_1: "Modelli 3D (SolidWorks, STEP)",
            hero_card_li_2: "Disegni costruttivi (PDF, DWG, DXF)",
            hero_card_li_3: "Distinte materiali e liste di taglio",
            hero_card_li_4: "Sviluppi per laser e piega lamiera",
            hero_card_li_5: "Macro SolidWorks personalizzate",
            hero_note: "Con base in Italia · Lavoro da remoto · Inglese / Italiano / Ucraino",

            services_title: "Servizi",
            services_subtitle:
                "Progettazione pratica, orientata all’officina, con attenzione a producibilità, norme e documentazione chiara.",
            services_card1_title: "Scale a chiocciola e scale rettilinee",
            services_card1_text:
                "Progettazione di scale a chiocciola e scale rettilinee con verifica rispetto alle normative (EU / UK, US, AU), geometria chiara e comfort di utilizzo.",
            services_card1_li_1:
                "Scale a chiocciola con controllo linea di cammino e headroom",
            services_card1_li_2: "Scale dritte, pianerottoli, parapetti e corrimano",
            services_card1_li_3: "Pacchetto completo: modello 3D, disegni, DXF, BOM",

            services_card2_title: "Lamiera e carpenteria metallica",
            services_card2_text:
                "Progettazione e ottimizzazione di particolari in lamiera, elementi inox, telai e staffe industriali pronti per TRUMPF laser e piegatura.",
            services_card2_li_1:
                "Sviluppi (DXF, DWG) con corretta compensazione di piega",
            services_card2_li_2: "Telai saldati, piattaforme, staffe e supporti",
            services_card2_li_3:
                "Simboli di saldatura, note e liste di taglio per l’officina",

            services_card3_title: "Automazione e macro SolidWorks",
            services_card3_text:
                "Strumenti personalizzati nell’ecosistema 369YAX per velocizzare il lavoro ripetitivo e standardizzare modelli e disegni.",
            services_card3_li_1:
                "Creazione automatica di parti e disegni da template",
            services_card3_li_2: "Esportazione distinta e liste di taglio in Excel",
            services_card3_li_3:
                "Librerie di progetto e automatismi sulle proprietà",

            portfolio_title: "Progetti selezionati",
            portfolio_subtitle:
                "Alcuni esempi di come unisco SolidWorks, normative e esperienza reale in officina. Altri riferimenti disponibili su richiesta.",
            portfolio_item1_title: "Scala a chiocciola interna – configurazione a norma",
            portfolio_item1_text:
                "Scala a chiocciola parametrica progettata sulle normative locali, con controllo di linea di cammino, headroom e combinazione alzata/pedata confortevole. Inclusi modello 3D completo, disegni costruttivi, DXF per taglio laser e distinta dettagliata.",
            portfolio_item1_tag: "Scale a chiocciола",

            portfolio_item2_title: "Mensola inox formato A4",
            portfolio_item2_text:
                "Mensola minimalista in lamiera inox per taglio laser e piega, ottimizzata per una produzione pulita con disegni chiari, sviluppi e tutti i dettagli di fissaggio preparati.",
            portfolio_item2_tag: "Lamiera",

            portfolio_item3_title: "Telaio di supporto industriale",
            portfolio_item3_text:
                "Telaio saldato in acciaio con profili correttamente dimensionati, dettagli di collegamento e disegni da officina completi di liste di taglio, note di saldatura e viste di montaggio.",
            portfolio_item3_tag: "Carpenteria saldata",

            portfolio_item4_title: "Strumenti di automazione – macro 369YAX",
            portfolio_item4_text:
                "Pacchetto interno di macro per SolidWorks: creazione automatica di parti e disegni, compilazione proprietà di progetto, esportazione BOM e librerie di note standard usate quotidianamente.",
            portfolio_item4_tag: "Automazione",

            macros_title: "369YAX – Automazione per SolidWorks",
            macros_subtitle:
                "Un ecosistema in crescita di strumenti personalizzati costruiti su esigenze reali di lavoro in SolidWorks: parti, disegni, distinte, norme e gestione commesse.",
            macros_card1_title: "IntelliPack / strumenti di commessa",
            macros_card1_text:
                "Strumenti per organizzare la struttura delle commesse, standardizzare le denominazioni e automatizzare azioni ripetitive legate a disegni e distinte.",
            macros_card1_li_1:
                "Creazione automatica di cartelle e file di commessa",
            macros_card1_li_2:
                "Aggiornamento massivo delle proprietà dei modelli",
            macros_card1_li_3: "Esportazione intelligente di distinte e liste di taglio",

            macros_card2_title: "IntelliStandards &amp; librerie di note",
            macros_card2_text:
                "Librerie guidate da macro per note tecniche, simboli di saldatura e testi standard allineati a ISO/UNI/EN, pronte da inserire nei disegni.",
            macros_card2_li_1:
                "Note bilingue (IT / EN, altre su richiesta)",
            macros_card2_li_2:
                "Note standardizzate per saldature e tolleranze",
            macros_card2_li_3:
                "Inserimento rapido nei disegni SolidWorks",

            macros_card3_title: "Generatori di scale",
            macros_card3_text:
                "Strumenti dedicati per assistere nella configurazione di scale a chiocciola e scale rettilinee, con controllo del comfort e dei parametri chiave secondo le norme scelte.",
            macros_card3_li_1:
                "Configurazioni parametriche di scale a chiocciola",
            macros_card3_li_2: "Supporto per set di norme EU / US / AU",
            macros_card3_li_3: "Geometria pronta per il dettaglio finale",

            about_title: "Chi sono – 369YAX &amp; Vitalii",
            about_subtitle:
                "Progettazione meccanica con vera esperienza d’officina – non solo “belle immagini CAD”.",
            about_text:
                "Sono <strong>Vitalii Borys</strong>, disegnatore meccanico e power-user SolidWorks con base in Italia, attivo con il marchio <strong>369YAX – Automation &amp; Design</strong>. Prima di concentrarmi sulla progettazione e sull’automazione, ho lavorato per anni direttamente in officina, esperienza che influisce molto sul modo in cui modello e impagino i progetti.",
            about_li_1:
                "Oltre 8 anni in lavorazioni metalliche (piegatura, calandratura, saldatura MIG/MAG, laser TRUMPF)",
            about_li_2:
                "Più di 3 anni di lavoro professionale in SolidWorks (versione italiana, 3D e tavole)",
            about_li_3: "Esperienza presso aziende italiane: Metalinox, Gortani, OFFMA",
            about_li_4:
                "Programmazione TRUMPF BOOST &amp; TruBend per taglio laser e pieга",
            about_li_5:
                "Focus su soluzioni semplici, robuste e adatte all’officina",

            about_box_title: "Come lavoro",
            about_box_li_1:
                "Parto dalla tua idea, schizzo, foto o modello/disegno esistente",
            about_box_li_2:
                "Chiarisco i vincoli: norme, materiali, processi, budget",
            about_box_li_3:
                "Sviluppo modelli 3D chiari e disegni tecnici completi",
            about_box_li_4:
                "Consegno file pronti per la produzione: DXF, DWG, STEP, PDF, BOM",
            about_box_li_5:
                "Comunicazione in inglese, italiano o ucraino, come preferisci",

            contact_title: "Lavoriamo insieme",
            contact_subtitle:
                "Descrivimi brevemente il tuo progetto – scale, lamiera, carpenteria o automazione SolidWorks – e ti proporrò un modo chiaro e concreto per procedere.",
            contact_direct_title: "Contatto diretto",
            contact_email_label: "Email:",
            contact_location: "Sede: Italia · Lavorо da remoto in tutto il mondo",
            contact_note:
                "Per partire più velocemente, indica: tipo di progetto (scala, telaio, lamiera, macro), dimensioni indicative, materiale e quali deliverable ti servono (3D, disegni, DXF, STEP, BOM).",
            contact_platforms_title: "Piattaforme freelance",
            contact_platforms_note:
                'Puoi contattarmi anche tramite le piattaforme freelance – cerca semplicemente <strong>“369YAX”</strong> e inviami una breve descrizione del tuo progetto.',

            contact_form_title: "Modulo di contatto",
            contact_form_name_label: "Il tuo nome",
            contact_form_email_label: "La tua email",
            contact_form_subject_label: "Tipo di progetto / oggetto",
            contact_form_message_label: "Dettagli del progetto",
            contact_form_submit: "Invia messaggio",
            contact_form_hint:
                "Il modulo aprirà il tuo programma di posta con un messaggio già compilato verso 369yax@gmail.com – puoi controllarlo e inviarlo.",

            footer_left: "© 369YAX – Automation &amp; Design · Vitalii Borys",
            footer_right: "SolidWorks · Carpenteria metallica · Scale a chiocciola · Automazione",

            // -----------------------------
// STAIR WIZARD (IT)
// -----------------------------
wizard_title: "Wizard concetto scala",
wizard_intro:
    "Configurazione rapida a livello concettuale secondo regole di comfort e intervalli tipici usati in Europa, Stati Uniti e Australia. La verifica finale di conformità deve sempre essere fatta da un tecnico locale.",

wizard_step1_label: "Regione &amp; tipologia",
wizard_step2_label: "Geometria",
wizard_step3_label: "Preferenze",
wizard_step4_label: "Risultato",

wizard_step1_title: "1. Regione, utilizzo e tipo di scala",

wizard_region_label: "Regione / base normativa",
wizard_region_eu: "Europa / UK",
wizard_region_us: "Stati Uniti",
wizard_region_au: "Australia",
wizard_region_hint:
    "Serve per scegliere gli intervalli tipici di alzata/pedata e i target di comfort.",

wizard_usage_label: "Uso principale",
wizard_usage_residential: "Residenziale (casa, appartamento)",
wizard_usage_office: "Ufficio / terziario leggero",
wizard_usage_industrial: "Industriale / accesso tecnico",
wizard_usage_external_private: "Esterno – uso privato",
wizard_usage_external_public: "Esterno – uso pubblico",

wizard_type_label: "Tipologia di scala",
wizard_type_straight: "Dritta, una rampa",
wizard_type_straight_landing: "Dritta con pianerottolo",
wizard_type_l: "A L (quarto giro)",
wizard_type_u: "A U (mezzo giro)",
wizard_type_spiral: "A chiocciola / elicoidale",
wizard_type_hint:
    "In questa versione la geometria viene calcolata come una singola rampa. Per giri/pianerottoli vengono forniti solo vincoli consigliati.",

wizard_step2_title: "2. Geometria – altezza e spazio disponibile",

wizard_height_label: "Altezza piano-piano (mm)",
wizard_height_hint:
    "Distanza verticale tra pavimenti finiti (non solo luce del foro).",

wizard_run_label: "Corsa massima / diametro (mm)",
wizard_run_hint:
    "Per scale dritte – corsa orizzontale massima. Per chiocciola – diametro esterno massimo.",

wizard_headroom_label: "Headroom target (mm)",
wizard_headroom_hint:
    "Il minimo tipico è circa 2000 mm, dipende dalle norme locali.",

wizard_spiral_angle_label: "Rotazione chiocciola (°)",
wizard_spiral_angle_hint:
    "Usato solo per scale a chiocciola: rotazione totale tra i piani (es. 360°, 450°).",

wizard_center_column_label: "Diametro colonna centrale (mm)",
wizard_center_column_hint:
    "Usato solo per scale a chiocciola: diametro esterno del tubo centrale portante.",

wizard_step3_title: "3. Comfort vs compattezza",

wizard_comfort_label: "Livello di comfort",
wizard_comfort_option_comfort:
    "Comfort prima di tutto (alzata più bassa, pedata più profonda)",
wizard_comfort_option_balanced: "Bilanciato",
wizard_comfort_option_compact:
    "Più compatta (alzata più alta, scala più corta)",

wizard_min_tread_label: "Pedata minima preferita sulla linea di cammino (mm)",
wizard_min_tread_hint:
    "Molti intervalli di comfort usano 240–280 mm sulla linea di cammino per scale residenziali.",

wizard_max_riser_label: "Alzata massima preferita (mm)",
wizard_max_riser_hint:
    "Quando possibile, il wizard cercherà di mantenere l’alzata sotto questo valore.",

wizard_step4_title: "4. Configurazione suggerita (solo concetto)",

wizard_result_placeholder:
    'Compila i passi precedenti e clicca su <strong>“Genera concetto”</strong> per vedere una configurazione consigliata.',

wizard_disclaimer:
    "Questo strumento fornisce una geometria a livello concettuale usando regole di comfort tipiche (es. Blondel: <code>2 × alzata + pedata ≈ 600–640&nbsp;mm</code>) e intervalli usuali per scale residenziali/terziarie. <strong>Non</strong> sostituisce una verifica normativa. Il progetto finale e la conformità alle norme locali (EU/EN, BS, IRC/IBC, AS/NCC, ecc.) devono essere verificati da un tecnico abilitato.",

// Wizard – testi di aiuto
wizard_steps_help_title: "Cosa succede nei prossimi passi?",
wizard_steps_help_p1:
    "Al Passo 2 il wizard suggerirà una geometria completa (numero di alzate, alzata, pedata, corsa/diametro, headroom, rotazione della chiocciola, colonna centrale e comfort sulla linea di cammino).",
wizard_steps_help_p2:
    "Puoi passare qualsiasi parametro da Auto a Manuale se vuoi il pieno controllo.",
wizard_steps_help_p3:
    "Al Passo 3 tutto viene raccolto in un riepilogo pulito, con i riferimenti normativi per la tua regione e un messaggio pronto da inviare a 369YAX.",

wizard_steps_label: "Numero di alzate",
wizard_steps_hint:
    "Calcolato automaticamente dal profilo di comfort; modifica solo se conosci esattamente il numero di alzate.",
wizard_steps_note:
    "Range concettuale tipico: 10–18 alzate; il wizard limita comunque tra 8 e 30 alzate.",

wizard_step1_intro:
    "Seleziona dove sarà utilizzata la scala, il suo uso principale e la tipologia generale. Queste scelte definiscono gli intervalli di comfort per alzata, pedata e regola di Blondel, oltre ai valori tipici per le scale a chiocciola.",

wizard_step2_intro:
    "Parti dall’altezza piano-piano. Tutti gli altri parametri vengono scelti automaticamente dai profili di comfort e possono essere passati al controllo manuale quando necessario. I piccoli indicatori mostrano se ogni parametro è dentro gli intervalli tipici (verde), vicino al limite (giallo) o chiaramente fuori range (rosso).",

wizard_geom_auto_note:
    "La maggior parte dei campi è in modalità <strong>Auto</strong> di default. Passa a <strong>Manuale</strong> per forzare un valore.",

wizard_reset_geometry: "Reimposta geometria",

wizard_limit_height:
    "Range residenziale tipico ≈ 2600–3200 mm (concettuale).",

wizard_norm_box_title:
    "Intervalli di comfort tipici per questa configurazione",

wizard_msg_title: "Genera un messaggio per 369YAX",
wizard_msg_hint:
    "Clicca il pulsante per generare una breve descrizione tecnica con tutti i parametri principali. Puoi copiarla in una email o nel modulo di contatto.",
wizard_msg_btn: "Crea messaggio dalla configurazione attuale",

// --- Note normative (Step 2) ---
wizard_norm_riser_label: "Alzata (tipica)",
wizard_norm_tread_straight_label: "Pedata / going",
wizard_norm_tread_spiral_label: "Pedata sulla linea di cammino",
wizard_norm_blondel_label: "Blondel (2R + P)",
wizard_norm_run_straight:
    "Corsa massima: la proiezione delle scale deve rientrare nello spazio disponibile e nel vincolo di headroom.",
wizard_norm_run_spiral:
    "Rotazione chiocciola: tipicamente intorno a 270–450° tra i piani, in funzione della geometria.",
wizard_norm_walkline_radius:
    "Raggio linea di cammino: misurato tra colonna interna e bordo esterno, spesso ≈ 2/3 della larghezza utile dal lato interno.",
wizard_norm_headroom:
    "Headroom: di solito ≥ 2000 mm (verificare le norme locali).",

// --- Step 3: codici + messaggio ---
wizard_codes_hint:
    "Questi riferimenti riassumono i requisiti tipici di geometria delle scale. Possono esistere integrazioni o regolamenti locali aggiuntivi – la conformità finale deve sempre essere verificata da un tecnico abilitato o dall’ente competente.",

wizard_message_title: "Genera un messaggio per 369YAX",
wizard_message_hint:
    "Clicca il pulsante per generare una breve descrizione tecnica con tutti i parametri principali. Puoi copiarla e incollarla in una email o nel modulo di contatto.",
wizard_message_btn: "Crea messaggio dalla configurazione corrente",
wizard_message_placeholder: "Qui verrà visualizzato il messaggio…",
wizard_message_missing:
    "Imposta almeno l’altezza piano-piano e la geometria al Passo 2, così il wizard può generare il messaggio.",

wizard_limit_steps:
    "Intervallo concettuale tipico: 10–18 gradini; il wizard limita tra 8 e 30 gradini",
wizard_limit_run_straight:
    "Scale dritte: la corsa massima deve rispettare lo spazio disponibile e l’altezza libera",
wizard_limit_headroom:
    "Valore tipico ≥ 2000 mm; molte normative consentono 1950–2000 mm in casi specifici",
wizard_limit_tread_comfort:
    "Comfort del gradino / pedata",
wizard_limit_riser_comfort:
    "Intervallo di comfort dell’alzata",
wizard_limit_run_straight_full:
    "Scale dritte: la corsa massima deve rispettare lo spazio disponibile e l’altezza libera",

// -----------------------------
// STAIR WIZARD – MESSAGE (IT)
// -----------------------------
wizard_msg_greeting: "Ciao Vitalii,",
wizard_msg_intro:
    "Ti invio di seguito un concetto di scala che vorrei fosse verificato:",
wizard_msg_outro:
    "Ti chiedo di verificare questa configurazione rispetto alle norme locali di riferimento e, se risulta fattibile, di affinare la geometria e preparare un progetto completo pronto per la produzione (modello 3D, disegni, DXF, STEP, BOM).",
wizard_msg_thanks: "Grazie!",
wizard_msg_no_data:
    "Imposta almeno l’altezza piano-piano e la geometria al Passo 2, così il wizard potrà generare un messaggio.",

wizard_msg_label_region: "Regione / base normativa",
wizard_msg_label_usage: "Uso principale",
wizard_msg_label_type: "Tipologia di scala",
wizard_msg_label_height: "Altezza piano-piano",
wizard_msg_label_steps: "Numero di gradini",
wizard_msg_label_outer_dia: "Diametro esterno",
wizard_msg_label_max_run: "Corsa massima",
wizard_msg_label_column: "Colonna centrale",
wizard_msg_label_headroom: "Headroom target",
wizard_msg_label_spiral_angle: "Rotazione chiocciola",
wizard_msg_label_riser: "Alzata",
wizard_msg_label_tread: "Pedata",
wizard_msg_label_blondel: "Blondel 2R + P",
wizard_msg_label_walkline: "Pedata sulla linea di cammino",

wizard_btn_back: "← Indietro",
wizard_btn_cancel: "Annulla",
wizard_btn_next: "Avanti →",
wizard_btn_generate: "🧮 Genera concetto",

        },

        // =============================
        // UKRAINIAN
        // =============================
        uk: {
            nav_services: "Послуги",
            nav_portfolio: "Портфоліо",
            nav_macros: "SW Макроси",
            nav_about: "Про мене",
            nav_contact: "Контакти",

            hero_title:
                'Конструкційний дизайн для виробництва<br /><span class="accent">металеві конструкції та сходи</span>',
            hero_sub:
                "Я <strong>Віталій Борис</strong>, інженер-конструктор, що живе та працює в Італії. Під брендом <strong>369YAX – Automation &amp; Design</strong> я допомагаю майстерням та виробникам перетворювати ідеї у <strong>3D-моделі SolidWorks, креслення, DXF, STEP та специфікації</strong>, готові до реального виробництва – з акцентом на спіральні сходи, листовий метал та зварні конструкції.",
            hero_btn_primary: "Написати щодо проєкту",
            hero_btn_secondary: "Переглянути портфоліо",
            wizard_btn_open: "Згенерувати концепт сходів",
            hero_tag_1: "Спіральні сходи (EU / US / AU)",
            hero_tag_2: "Листовий метал та зварні рами",
            hero_tag_3: "Автоматизація та макроси SolidWorks",
            hero_card_title: "Що ви отримуєте з 369YAX",
            hero_card_li_1: "3D-моделі (SolidWorks, STEP)",
            hero_card_li_2: "Креслення для виробництва (PDF, DWG, DXF)",
            hero_card_li_3: "Відомості деталей та карти різу",
            hero_card_li_4:
                "Деталі з листового металу, готові до різки та гнуття",
            hero_card_li_5:
                "Індивідуальні макроси SolidWorks під ваш процес",
            hero_note:
                "Базуюсь в Італії · Працюю віддалено · Англійська / Італійська / Українська",

            services_title: "Послуги",
            services_subtitle:
                "Практичний інженерний дизайн з орієнтацією на цех: технологічність, норми та зрозуміла документація.",
            services_card1_title: "Проєктування спіральних та прямих сходів",
            services_card1_text:
                "Проєктування спіральних та прямих сходів з урахуванням норм (EU / UK, US, AU), чіткою геометрією та комфортом користування.",
            services_card1_li_1:
                "Спіральні сходи з контролем лінії ходу та висоти проходу",
            services_card1_li_2:
                "Прямі сходи, площадки, поручні та огородження",
            services_card1_li_3:
                "Повний пакет: 3D-модель, креслення, DXF, специфікація",

            services_card2_title: "Листовий метал та зварні конструкції",
            services_card2_text:
                "Розробка та оптимізація деталей з листового металу, нержавіючих елементів, рам та кронштейнів, готових до TRUMPF-різки та гнуття.",
            services_card2_li_1:
                "Розгортки (DXF, DWG) з коректними припусками на згин",
            services_card2_li_2:
                "Зварні рами, платформи, кронштейни та опори",
            services_card2_li_3:
                "Умовні позначення зварних швів, примітки та карти різу для цеху",

            services_card3_title: "Автоматизація та макроси SolidWorks",
            services_card3_text:
                "Кастомні інструменти в екосистемі 369YAX для прискорення рутини та стандартизації моделей і креслень.",
            services_card3_li_1:
                "Автоматичне створення деталей і креслень із шаблонів",
            services_card3_li_2:
                "Експорт специфікацій та карт різу в Excel",
            services_card3_li_3:
                "Бібліотеки проєктів та автоматичне заповнення властивостей",

            portfolio_title: "Обрані проєкти",
            portfolio_subtitle:
                "Кілька прикладів того, як я поєдную SolidWorks, норми та реальний досвід роботи з металом. Детальніші кейси – за запитом.",
            portfolio_item1_title:
                "Внутрішні спіральні сходи – конфігурація за нормами",
            portfolio_item1_text:
                "Параметричні спіральні сходи, спроєктовані згідно з локальними нормами, з перевіреною лінією ходу, висотою проходу та комфортною комбінацією підйому/проступу. Включено повну 3D-модель, креслення, DXF-файли для лазерної різки та специфікацію.",
            portfolio_item1_tag: "Спіральні сходи",

            portfolio_item2_title:
                "Полиця з нержавіючої сталі формату A4",
            portfolio_item2_text:
                "Мінімалістична полиця з листового металу для лазерної різки та гнуття, оптимізована під просте виготовлення з чіткими кресленнями, розгортками та продуманими кріпленнями.",
            portfolio_item2_tag: "Листовий метал",

            portfolio_item3_title: "Промислова опорна рама",
            portfolio_item3_text:
                "Зварна сталева рама з правильно підібраними профілями, вузлами з’єднання та кресленнями для цеху – з відомістю деталей, примітками по зварюванню та монтажними видами.",
            portfolio_item3_tag: "Зварна конструкція",

            portfolio_item4_title:
                "Інструменти автоматизації – макроси 369YAX",
            portfolio_item4_text:
                "Внутрішній пакет макросів для SolidWorks: автоматичне створення моделей і креслень, заповнення властивостей проєкту, експорт специфікацій та бібліотеки стандартних приміток, які використовуються щодня.",
            portfolio_item4_tag: "Автоматизація",

            macros_title: "369YAX – Автоматизація для SolidWorks",
            macros_subtitle:
                "Екосистема власних інструментів, побудована на реальних щоденних задачах у SolidWorks: моделі, креслення, специфікації, норми та керування проєктами.",
            macros_card1_title: "IntelliPack / інструменти для комісій",
            macros_card1_text:
                "Інструменти для організації структури проєкту, стандартизації назв та автоматизації повторюваних дій, пов’язаних із кресленнями та специфікаціями.",
            macros_card1_li_1:
                "Автоматичне створення папок і файлів проєкту",
            macros_card1_li_2:
                "Масове оновлення властивостей моделей",
            macros_card1_li_3:
                "Розумний експорт специфікацій та карт різу",

            macros_card2_title: "IntelliStandards та бібліотеки приміток",
            macros_card2_text:
                "Бібліотеки приміток, символів зварювання та стандартних текстів, керовані макросами та узгоджені з ISO/UNI/EN – готові до вставки в креслення.",
            macros_card2_li_1:
                "Двомовні примітки (IT / EN, інші за потреби)",
            macros_card2_li_2:
                "Стандартизовані примітки для зварювання та допусків",
            macros_card2_li_3:
                "Швидка вставка приміток у креслення SolidWorks",

            macros_card3_title: "Генератори сходів",
            macros_card3_text:
                "Спеціальні інструменти для налаштування спіральних та прямих сходів із контролем зручності та ключових параметрів за обраними нормами.",
            macros_card3_li_1:
                "Параметричні конфігурації спіральних сходів",
            macros_card3_li_2:
                "Підтримка наборів норм EU / US / AU",
            macros_card3_li_3:
                "Геометрія, готова до деталювання",

            about_title: "Про мене – 369YAX &amp; Віталій",
            about_subtitle:
                "Машинобудівний дизайн з реальним цеховим бекграундом – не просто «красиві CAD-картинки».",
            about_text:
                "Я – <strong>Віталій Борис</strong>, інженер-конструктор і power-user SolidWorks, живу та працюю в Італії під брендом <strong>369YAX – Automation &amp; Design</strong>. До того як зосередитися на конструюванні та автоматизації, я багато років працював безпосередньо у виробництві, що дуже впливає на те, як я будую моделі та оформляю документацію.",
            about_li_1:
                "8+ років у металообробці (гнуття, вальцювання, зварювання MIG/MAG, лазер TRUMPF)",
            about_li_2:
                "3+ роки професійної роботи в SolidWorks (італійська версія, 3D та креслення)",
            about_li_3:
                "Досвід на італійських підприємствах: Metalinox, Gortani, OFFMA",
            about_li_4:
                "Програмування TRUMPF BOOST &amp; TruBend для лазерної різки та гнуття",
            about_li_5:
                "Фокус на простих, надійних і зручних у виробництві рішеннях",

            about_box_title: "Як я працюю",
            about_box_li_1:
                "Починаю з вашої ідеї, ескізу, фото або наявних 3D/креслень",
            about_box_li_2:
                "Уточнюю обмеження: норми, матеріали, процеси, бюджет",
            about_box_li_3:
                "Розробляю зрозумілі 3D-моделі та технічні креслення",
            about_box_li_4:
                "Передаю файли, готові до виробництва: DXF, DWG, STEP, PDF, BOM",
            about_box_li_5:
                "Спілкування українською, італійською або англійською",

            contact_title: "Давайте працювати разом",
            contact_subtitle:
                "Розкажіть коротко про свій проєкт – сходи, листовий метал, зварну раму чи автоматизацію SolidWorks – і я запропоную зрозумілий та реалістичний варіант рішення.",
            contact_direct_title: "Прямий контакт",
            contact_email_label: "Email:",
            contact_location: "Локація: Італія · Працюю віддалено по всьому світу",
            contact_note:
                "Щоб швидше стартувати, напишіть: тип проєкту (сходи, рама, листовий метал, макрос), приблизні габарити, матеріал та які файли вам потрібні (3D, креслення, DXF, STEP, BOM).",
            contact_platforms_title: "Фриланс-платформи",
            contact_platforms_note:
                'Також ви можете написати мені через фриланс-платформи – просто знайдіть <strong>“369YAX”</strong> і коротко опишіть задачу.',

            contact_form_title: "Форма контакту",
            contact_form_name_label: "Ваше ім’я",
            contact_form_email_label: "Ваша email-адреса",
            contact_form_subject_label: "Тип проєкту / тема",
            contact_form_message_label: "Деталі проєкту",
            contact_form_submit: "Надіслати повідомлення",
            contact_form_hint:
                "Форма відкриє ваш поштовий клієнт із готовим листом на 369yax@gmail.com – ви зможете перевірити та надіслати його.",

            footer_left: "© 369YAX – Automation &amp; Design · Віталій Борис",
            footer_right:
                "SolidWorks · Металеві конструкції · Спіральні та прямі сходи · Автоматизація",

            //// -----------------------------
// STAIR WIZARD (UK)
// -----------------------------
wizard_title: "Майстер концепції сходів",
wizard_intro:
    "Швидка конфігурація на рівні концепції за типовими діапазонами комфорту, що застосовуються в Європі, США та Австралії. Остаточну відповідність нормам завжди має перевіряти місцевий інженер.",

wizard_step1_label: "Регіон і тип",
wizard_step2_label: "Геометрія",
wizard_step3_label: "Побажання",
wizard_step4_label: "Результат",

wizard_step1_title: "1. Регіон, призначення та тип сходів",

wizard_region_label: "Регіон / база норм",
wizard_region_eu: "Європа / UK",
wizard_region_us: "США",
wizard_region_au: "Австралія",
wizard_region_hint:
    "Використовується для вибору типових діапазонів підйому/проступу та цільового комфорту.",

wizard_usage_label: "Основне призначення",
wizard_usage_residential: "Житлові (будинок, квартира)",
wizard_usage_office: "Офіс / легка комерція",
wizard_usage_industrial: "Індустріальні / технічний доступ",
wizard_usage_external_private: "Зовнішні – приватні",
wizard_usage_external_public: "Зовнішні – публічні",

wizard_type_label: "Тип сходів",
wizard_type_straight: "Прямі, одна маршова ділянка",
wizard_type_straight_landing: "Прямі з площадкою",
wizard_type_l: "Г-подібні (чверть обороту)",
wizard_type_u: "П-подібні (пів оберту)",
wizard_type_spiral: "Спіральні / гвинтові",
wizard_type_hint:
    "У цій версії геометрія рахується як один марш. Для поворотів/площадок будуть лише загальні рекомендації.",

wizard_step2_title: "2. Геометрія – висота та доступний простір",

wizard_height_label: "Висота від підлоги до підлоги (мм)",
wizard_height_hint:
    "Вертикальна відстань між готовими рівнями підлоги (не тільки отвір у перекритті).",

wizard_run_label: "Макс. горизонтальна проекція / діаметр (мм)",
wizard_run_hint:
    "Для прямих сходів – максимальна довжина в плані. Для спіральних – максимальний зовнішній діаметр.",

wizard_headroom_label: "Бажаний просвіт (headroom) (мм)",
wizard_headroom_hint:
    "Типове мінімальне значення близько 2000 мм, залежить від локальних норм.",

wizard_spiral_angle_label: "Кут повороту спіралі (°)",
wizard_spiral_angle_hint:
    "Використовується лише для спіральних сходів: сумарний поворот між поверхами (наприклад, 360°, 450°).",

wizard_center_column_label: "Діаметр центральної труби (мм)",
wizard_center_column_hint:
    "Використовується лише для спіральних сходів: зовнішній діаметр несучої центральної труби.",

wizard_step3_title: "3. Комфорт проти компактності",

wizard_comfort_label: "Рівень комфорту",
wizard_comfort_option_comfort:
    "Комфортні (менший підйом, ширший проступ)",
wizard_comfort_option_balanced: "Збалансовані",
wizard_comfort_option_compact:
    "Компактні (вищий підйом, коротші сходи)",

wizard_min_tread_label: "Бажаний мінімальний проступ на лінії ходу (мм)",
wizard_min_tread_hint:
    "Для житлових сходів комфорт зазвичай досягається при 240–280 мм на лінії ходу.",

wizard_max_riser_label: "Бажаний максимальний підйом (мм)",
wizard_max_riser_hint:
    "Майстер по можливості намагатиметься не перевищувати це значення.",

wizard_step4_title: "4. Запропонована конфігурація (концепт)",

wizard_result_placeholder:
    'Заповніть попередні кроки і натисніть <strong>«Згенерувати концепт»</strong>, щоб побачити рекомендовану конфігурацію.',

wizard_disclaimer:
    "Цей інструмент дає геометрію лише на концептуальному рівні, використовуючи типові правила комфорту (наприклад, Блондель: <code>2 × підйом + проступ ≈ 600–640&nbsp;мм</code>) та звичайні діапазони для житлових/легких комерційних сходів. Він <strong>не</strong> замінює перевірку за місцевими будівельними нормами та розрахунки міцності. Остаточну відповідність має підтвердити кваліфікований спеціаліст на основі реальної геометрії проєкту.",

// Wizard – допоміжні тексти
wizard_steps_help_title: "Що відбувається на наступних кроках?",
wizard_steps_help_p1:
    "На Кроці 2 майстер запропонує повну геометрію (кількість сходинок, підйом, проступ, проекцію/діаметр, просвіт, кут повороту спіралі, центральну трубу та комфорт по лінії ходу).",
wizard_steps_help_p2:
    "Ви можете перемкнути будь-який параметр з Auto на Manual, якщо потрібен повний контроль.",
wizard_steps_help_p3:
    "На Кроці 3 все збирається в акуратний підсумок, додаються посилання на норми для вашого регіону та формується готове до відправки повідомлення для 369YAX.",

wizard_steps_label: "Кількість сходинок",
wizard_steps_hint:
    "Автоматично розраховується за комфортним профілем; змінюйте лише якщо точно знаєте потрібну кількість.",
wizard_steps_note:
    "Типовий концепт-діапазон: 10–18 сходинок; майстер обмежує значення між 8 і 30.",

wizard_step1_intro:
    "Виберіть, де будуть використовуватися сходи, їх основне призначення та тип. Ці параметри задають діапазони комфорту для підйому, проступу та правила Блонделя, а також типові значення для спіральних сходів.",

wizard_step2_intro:
    "Почніть з висоти від підлоги до підлоги. Усі інші параметри автоматично беруться з комфортних профілів і за потреби можуть бути переведені в ручний режим. Маленькі індикатори показують, чи параметр у типовому діапазоні (зелений), біля межі (жовтий) або явно поза ними (червоний).",

wizard_geom_auto_note:
    "Більшість полів за замовчуванням у режимі <strong>Auto</strong>. Перемкніть у <strong>Manual</strong>, щоб задати власне значення.",

wizard_reset_geometry: "Скинути геометрію",

wizard_limit_height:
    "Типовий житловий діапазон ≈ 2600–3200 мм (концепт).",

wizard_norm_box_title:
    "Типові діапазони комфорту для цієї конфігурації",

wizard_msg_title: "Згенерувати повідомлення для 369YAX",
wizard_msg_hint:
    "Натисніть кнопку, щоб згенерувати короткий технічний опис з усіма ключовими параметрами. Потім ви можете скопіювати його в email або форму зворотного зв’язку.",
wizard_msg_btn: "Сформувати повідомлення з поточної конфігурації",

// --- Нормативні нотатки (крок 2) ---
wizard_norm_riser_label: "Підйом (типовий)",
wizard_norm_tread_straight_label: "Проступ / «going»",
wizard_norm_tread_spiral_label: "Проступ на лінії ходу",
wizard_norm_blondel_label: "Блондель (2R + T)",
wizard_norm_run_straight:
    "Максимальний винос: проєкція сходів повинна вміщуватися в доступну довжину та забезпечувати потрібний headroom.",
wizard_norm_run_spiral:
    "Поворот спіралі: зазвичай близько 270–450° між поверхами, залежно від планування.",
wizard_norm_walkline_radius:
    "Радіус лінії ходу: зазвичай вимірюється між центральною трубою та зовнішнім краєм, часто ≈ 2/3 корисної ширини від внутрішнього краю.",
wizard_norm_headroom:
    "Headroom: зазвичай ≥ 2000 мм (перевірити локальні норми).",

// --- Крок 3: коди + повідомлення ---
wizard_codes_hint:
    "Ці посилання узагальнюють типові вимоги до геометрії сходів. Можуть діяти додаткові місцеві норми – остаточну відповідність завжди має підтверджувати місцевий інженер або відповідальний орган.",

wizard_message_title: "Створити повідомлення для 369YAX",
wizard_message_hint:
    "Натисніть кнопку, щоб згенерувати короткий технічний опис з усіма ключовими параметрами. Ви можете скопіювати його в email або у форму контакту.",
wizard_message_btn: "Сформувати повідомлення з поточного концепту",
wizard_message_placeholder: "Тут з’явиться текст повідомлення…",
wizard_message_missing:
    "Будь ласка, задайте щонайменше висоту від підлоги до підлоги та геометрію на Кроці 2, щоб майстер міг згенерувати повідомлення.",

wizard_limit_steps:
    "Типовий концептуальний діапазон: 10–18 сходинок; майстер обмежує між 8 та 30 сходинками",
wizard_limit_run_straight:
    "Прямі сходи: максимальна довжина повинна відповідати доступному простору та висоті проходу",
wizard_limit_headroom:
    "Типова ціль ≥ 2000 мм; багато норм дозволяють 1950–2000 мм у спеціальних випадках",
wizard_limit_tread_comfort:
    "Комфортний діапазон проступу (tread / going)",
wizard_limit_riser_comfort:
    "Комфортний діапазон висоти підйому (riser)",
wizard_limit_run_straight_full:
    "Прямі сходи: максимальна довжина маршу повинна відповідати доступному простору та висоті проходу",

// -----------------------------
// STAIR WIZARD – MESSAGE (UK)
// -----------------------------
wizard_msg_greeting: "Привіт, Віталію,",
wizard_msg_intro:
    "Надсилаю параметри концептуальної конфігурації сходів для перевірки:",
wizard_msg_outro:
    "Будь ласка, перевір цю конфігурацію щодо відповідних місцевих будівельних норм та, якщо варіант є реалістичним, уточни геометрію і підготуй повноцінний комплект для виробництва (3D-модель, креслення, DXF, STEP, специфікація).",
wizard_msg_thanks: "Дякую!",
wizard_msg_no_data:
    "Будь ласка, задай хоча б висоту від підлоги до підлоги та основну геометрію на Кроці 2, щоб майстер міг сформувати повідомлення.",

wizard_msg_label_region: "Регіон / база норм",
wizard_msg_label_usage: "Призначення",
wizard_msg_label_type: "Тип сходів",
wizard_msg_label_height: "Висота від підлоги до підлоги",
wizard_msg_label_steps: "Кількість сходинок",
wizard_msg_label_outer_dia: "Зовнішній діаметр",
wizard_msg_label_max_run: "Максимальна проекція",
wizard_msg_label_column: "Центральна труба",
wizard_msg_label_headroom: "Бажаний просвіт (headroom)",
wizard_msg_label_spiral_angle: "Кут повороту спіралі",
wizard_msg_label_riser: "Підйом (riser)",
wizard_msg_label_tread: "Проступ (tread)",
wizard_msg_label_blondel: "Блондель 2R + T",
wizard_msg_label_walkline: "Проступ по лінії ходу",

wizard_btn_back: "← Назад",
wizard_btn_cancel: "Скасувати",
wizard_btn_next: "Далі →",
wizard_btn_generate: "🧮 Згенерувати концепт",

        }
    };

    // -----------------------------
    // helpers
    // -----------------------------
    function getLanguage() {
        let lang = "en";

        // 1) localStorage (якщо є)
        try {
            const stored = localStorage.getItem(LANG_STORAGE_KEY);
            if (stored && UI_TRANSLATIONS[stored]) {
                lang = stored.toLowerCase();
            } else {
                // 2) <html lang="">
                const htmlLang = (document.documentElement.lang || "").toLowerCase();
                if (htmlLang && UI_TRANSLATIONS[htmlLang]) {
                    lang = htmlLang;
                }
            }
        } catch (e) {
            // localStorage недоступний → ігноруємо
            const htmlLang = (document.documentElement.lang || "").toLowerCase();
            if (htmlLang && UI_TRANSLATIONS[htmlLang]) {
                lang = htmlLang;
            }
        }

        if (!UI_TRANSLATIONS[lang]) lang = "en";
        return lang;
    }

        function setLanguage(lang) {
        if (!UI_TRANSLATIONS[lang]) {
            lang = "en";
        }

        document.documentElement.lang = lang;

        const dict = UI_TRANSLATIONS[lang];
           function t(key, lang) {
        const l = lang || getLanguage();
        const dict = UI_TRANSLATIONS[l] || UI_TRANSLATIONS.en;
        if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
            return dict[key];
        }
        // fallback – англійська або сам ключ
        const dictEn = UI_TRANSLATIONS.en || {};
        return dictEn[key] || key;
    }

        // Основні тексти (innerHTML)
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Placeholder-и
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key]) {
                el.setAttribute("placeholder", dict[key]);
            }
        });

        // Кнопки вибору мови
        document.querySelectorAll(".lang-btn").forEach((btn) => {
            const btnLang = btn.getAttribute("data-lang");
            btn.classList.toggle("is-active", btnLang === lang);
        });

        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (e) {
            // нічого страшного, якщо сховище недоступне
        }

        // 🔔 дати знати іншим частинам (chat-widget.js, тощо)
        const ev = new CustomEvent("app:language-changed", { detail: { lang } });
        document.dispatchEvent(ev);
    }
    function getChatTexts(lang) {
        const l = lang || getLanguage();

        // Захист: якщо CHAT_TRANSLATIONS ще не визначений – повертаємо порожній словник
        if (typeof window.CHAT_TRANSLATIONS === "undefined") {
            return {};
        }

        const base = window.CHAT_TRANSLATIONS || {};
        return base[l] || base.en || {};
    }

    // -----------------------------
    // init on DOM ready
    // -----------------------------
    document.addEventListener("DOMContentLoaded", function () {
        const initialLang = getLanguage();
        setLanguage(initialLang);

        document.querySelectorAll(".lang-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const lang = btn.getAttribute("data-lang");
                if (lang) {
                    setLanguage(lang);
                }
            });
        });
    });

    // -----------------------------
    // простий helper для JS-коду
    // -----------------------------
    function t(key, fallback) {
        const lang = getLanguage();
        const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en || {};
        if (dict && dict[key]) return dict[key];
        return fallback || key;
    }

    // -----------------------------
    // публічний API
    // -----------------------------
        window.APP_I18N = {
        setLanguage,
        getLanguage,
        getChatTexts,
        t
    };
})();


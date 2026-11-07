/**
 * خالد البشيري | KHALID AL-BSHYRI - REAL ESTATE BROKER JEDDAH
 * Master Luxury Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. IMMEDIATE PRELOADER DISMISSAL ENGINE ---
  const loader = document.getElementById('intro-loader');
  const dismissLoader = () => {
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        if (loader && loader.style) {
          loader.style.display = 'none';
        }
      }, 700);
    }
  };

  if (loader) {
    // Normal auto dismiss after 1.4 seconds
    setTimeout(dismissLoader, 1400);
    // Instant dismiss on click or touch
    loader.addEventListener('click', dismissLoader);
  }

  // --- 1. STATE & STORAGE MANAGEMENT ---
  const state = {
    theme: localStorage.getItem('kb_theme') || 'dark',
    lang: localStorage.getItem('kb_lang') || 'ar',
    sliderIndex: 0,
    testimonialIndex: 0,
    testimonialInterval: null,
    isTestimonialHovered: false,
    statsAnimated: false
  };

  // --- 2. BILINGUAL TRANSLATION DICTIONARY ---
  const i18n = {
    ar: {
      site_title: "خالد البشيري | وسيط عقاري معتمد في جدة - شقق تمليك واستثمار",
      nav_home: "الرئيسية",
      nav_services: "خدماتنا",
      nav_projects: "المشاريع",
      nav_why: "لماذا نحن",
      nav_about: "من نحن",
      nav_testimonials: "آراء العملاء",
      nav_faq: "الأسئلة الشائعة",
      nav_contact: "تواصل معنا",
      nav_book: "احجز الآن",

      hero_badge: "معتمد من الهيئة العامة للعقار | رخصة رقم 7100000000 (تجريبي)",
      hero_title_1: "امتلك شقتك بثقة…",
      hero_title_2: "قبل ما تكتمل",
      hero_sub: "وسيط عقاري معتمد من الهيئة العامة للعقار | بيع، تأجير، وشقق تمليك تبدأ من 249 ألف ريال في أرقى أحياء جدة",
      hero_cta_wa: "احجز عبر واتساب",
      hero_cta_call: "اتصل الآن",

      stat_clients: "عميل سعيد",
      stat_projects: "مشروع نوعي",
      stat_exp: "سنوات خبرة",
      stat_sat: "رضا العملاء",
      stat_price: "ألف سعر البداية",

      services_tag: "خدمات وساطة واستثمار",
      services_title: "حلول عقارية متكاملة ترتقي لتطلعاتك",
      services_desc: "نضع خبرتنا وسجلنا المرخص بين يديك لنضمن لك أفضل العوائد الاستثمارية وأرقى خيارات السكن في عروس البحر الأحمر.",
      srv_1_title: "بيع العقارات الفاخرة",
      srv_1_desc: "تسويق وبيع الأبراج والفلل والشقق بأعلى معايير الشفافية وبأفضل قيمة سوقية ممكنة في مدينة جدة.",
      srv_2_title: "التأجير وإدارة الأملاك",
      srv_2_desc: "إيجاد المستأجر المثالي، وتوثيق عقود إيجار المعتمدة، ومتابعة التحصيل والصيانة الدورية بكل احترافية.",
      srv_3_title: "شقق تمليك تحت الإنشاء",
      srv_3_desc: "فرص حصرية للتملك بأسعار التأسيس تبدأ من 249,000 ريال، مع خطط دفع ميسرة ومتابعة هندسية.",
      srv_4_title: "الاستشارات والاستثمار العقاري",
      srv_4_desc: "دراسات جدوى متخصصة وتحليل دقيق للعوائد الإيجارية ورأس المال لضمان استثمار آمن ومربح.",
      srv_more: "طلب الخدمة الآن",

      proj_tag: "المشروع المميز",
      proj_title: "برج اللؤلؤة - جدة (تحت الإنشاء)",
      proj_desc: "أيقونة معمارية ساحلية تجمع بين الرفاهية والموقع الاستراتيجي، بتشطيبات فندقية VIP وأسعار تنافسية تبدأ من 249 ألف ريال.",
      proj_price_from: "يبدأ السعر من:",
      proj_price_val: "249,000 ريال",
      feat_tamleek: "شقق تمليك موثقة",
      feat_offplan: "تحت الإنشاء (أسعار تأسيسية)",
      feat_services: "قريب من جميع الخدمات الحيوية",
      feat_invest: "عائد استثماري سنوي متوقع يصل 10%",
      feat_location: "موقع استراتيجي (شمال جدة / الكورنيش)",
      proj_units_label: "الوحدات المتبقية في هذه المرحلة:",
      proj_units_val: "12 من أصل 40 وحدة",
      proj_dl_brochure: "حمّل بروشور المشروع (PDF)",

      pay_title: "خطة الدفع الميسرة:",
      pay_step1: "دفعة أولى 15%",
      pay_step2: "دفعات مع مراحل البناء",
      pay_step3: "دفعة الاستلام 20%",

      why_tag: "المصداقية والأمان",
      why_title: "لماذا يختارنا نخبة العملاء والمستثمرين؟",
      why_desc: "لأننا لا نبيعك مجرد عقار، بل نبني معك شراكة استثمارية موثوقة ومحمية بالأنظمة الرسمية.",
      why_1_title: "وسيط معتمد رسمياً",
      why_1_desc: "مرخص من الهيئة العامة للعقار وحامل رخصة فال، لتضمن نظامية كافة الإجراءات.",
      why_2_title: "شفافية كاملة في الأسعار",
      why_2_desc: "أسعار مباشرة وواضحة بدون أي هوامش خفية أو تكاليف غير معلنة على الإطلاق.",
      why_3_title: "متابعة معك لين الاستلام",
      why_3_desc: "نرافقك خطوة بخطوة من مرحلة اختيار المخطط حتى استلام المفتاح ونقل الملكية.",
      why_4_title: "فرص استثمارية مدروسة",
      why_4_desc: "ننتقي المشاريع ذات النمو الرأسمالي العالي والإقبال التأجيري المضمون في جدة.",
      why_5_title: "رد سريع على واتساب",
      why_5_desc: "فريق جاهز لخدمتك والإجابة على كل استفساراتك على مدار الساعة بأعلى استجابة.",
      why_6_title: "بدون عمولات مخفية",
      why_6_desc: "نلتزم بنسب الوساطة المعتمدة نظاماً ونسعى لتحقيق أقصى توفير لك.",

      license_tag: "المصداقية والترخيص",
      license_title: "تأكد من ترخيصي العقاري الرسمي",
      license_desc: "وفقاً للائحة الوساطة العقارية الصادرة عن الهيئة العامة للعقار بالمملكة العربية السعودية، يمكنك التحقق الفوري من سريان رخصتي وسجل أعمالي عبر المنصة الرسمية.",
      license_card_title: "رخصة فال للوساطة والتسويق العقاري",
      license_num_label: "رقم الرخصة المعتمد: 7100000000",
      license_status_label: "حالة الاعتماد: موثق وساري المفعول",
      license_btn: "تحقق عبر موقع الهيئة العامة للعقار (REGA)",

      timeline_tag: "خطوات التملك",
      timeline_title: "كيف تبدأ رحلة امتلاك شقتك؟",
      timeline_desc: "4 خطوات واضحة وميسرة تنقلك من مرحلة الاستفسار إلى استلام مفتاح شقتك الجديدة.",
      step_1_title: "1) تواصل معنا",
      step_1_desc: "أرسل لنا متطلباتك وميزانيتك عبر واتساب أو الهاتف لتحديد أهدافك السكنية أو الاستثمارية.",
      step_2_title: "2) نعرض لك الخيارات المناسبة",
      step_2_desc: "نقدم لك ملفاً شاملاً بالمشاريع والمخططات وجداول الدفعات المتوافقة تماماً مع طلبك.",
      step_3_title: "3) نحجز لك الوحدة ونوثق العقد",
      step_3_desc: "إتمام حجز وحدتك المختارة وتوثيق العقود رسمياً عبر منصة إيجار أو منصات الوساطة المعتمدة.",
      step_4_title: "4) تستلم شقتك بكل ثقة",
      step_4_desc: "متابعة مراحل الإنجاز الإنشائي حتى تسليم المفتاح وجاهزية الشقة للسكن أو التأجير.",

      about_tag: "نبذة عن الوسيط",
      about_title: "خالد البشيري | شريكك العقاري الموثوق في جدة",
      about_p1: "بصفتي وسيطاً عقارياً مرخصاً وممارساً معتمداً من الهيئة العامة للعقار بالمملكة العربية السعودية، أكرّس شغفي وخبرتي لتقديم أفضل الفرص الاستثمارية والسكنية لعملائي الكرام.",
      about_p2: "نركز بشكل خاص على شقق التمليك تحت الإنشاء في مدينة جدة لما توفره من نمو رأسمالي متسارع وتوفير حقيقي في أسعار الشراء مقارنة بالعقارات الجاهزة. أؤمن بأن الأمانة والشفافية التامة هما حجر الأساس في كل صفقة ناجحة.",
      badge_licensed: "مرخص من الهيئة العامة للعقار",
      badge_fal: "حامل رخصة فال العقارية",
      badge_experience: "+5 سنوات في سوق جدة",
      about_reels_title: "شاهد أحدث التغطيات عبر إنستغرام",

      calc_tag: "حاسبة التملك والاستثمار",
      calc_title: "احسب قسطك وعائدك التقديري في ثوانٍ",
      calc_desc: "حدد سعر الشقة ونسبة الدفعة الأولى لاحتساب القسط الشهري والعائد الاستثماري السنوي المتوقع.",
      calc_price_lbl: "سعر الوحدة العقارية:",
      calc_down_lbl: "نسبة الدفعة الأولى:",
      calc_period_lbl: "فترة التقسيط (أثناء الإنشاء):",
      calc_result_down: "مبلغ الدفعة الأولى:",
      calc_result_monthly: "القسط الشهري التقديري:",
      calc_result_roi: "العائد الاستثماري المتوقع:",
      calc_note: "* هذه الحسبة تقريبية تخضع لشروط المطور وخطة الدفع المعتمدة للمشروع.",

      testi_tag: "تجارب حقيقية",
      testi_title: "ماذا يقول عملاؤنا عنا؟",
      testi_desc: "ثقة عملائنا وشهاداتهم هي أكبر إنجاز نفتخر به.",

      faq_tag: "الشفافية أولاً",
      faq_title: "الأسئلة الشائعة والأجوبة الشافية",
      faq_desc: "كل ما تحتاج معرفته عن شراء شقق التمليك تحت الإنشاء والوساطة العقارية.",
      faq_q1: "1. ما معنى شقة تمليك تحت الإنشاء؟",
      faq_a1: "الشقق تحت الإنشاء هي وحدات سكنية يتم شراؤها أثناء مرحلة التأسيس أو البناء وقبل اكتمال المشروع، مما يمنح المشتري ميزة سعرية كبرى تبدأ من 249,000 ريال، مع إمكانية سداد المبلغ على دفعات ميسرة مرتبطة بمراحل الإنجاز الفعلي، وتحقيق نمو رأسمالي مرتفع عند اكتمال المشروع.",
      faq_q2: "2. هل التمليك موثق رسمياً بنظام الصكوك؟",
      faq_a2: "نعم بالتأكيد. جميع المشاريع التي نتعامل معها حاصلة على التراخيص الإنشائية والموافقات الرسمية، وتتم كتابة وتوثيق العقود وفق اللوائح النظامية المعتمدة من الهيئة العامة للعقار ووزارة العدل، ويتم فرز الوحدات وإصدار صك ملكية إلكتروني مستقل لكل شقة عند اكتمال المشروع.",
      faq_q3: "3. كيف أحجز وحدة وما هي الإجراءات المطلوبة؟",
      faq_a3: "تبدأ العملية بالتواصل معنا لتحديد الشقة المناسبة حسب ميزانيتك وموقعك المفضل، ثم نقوم بتجهيز نموذج الحجز المبدئي وسداد دفعة تأكيد الحجز (عادة 10% إلى 15%) وتوقيع العقد الرسمي المعتمد الذي يوضح كافة مواصفات الوحدة وجدول الدفعات وموعد التسليم.",
      faq_q4: "4. هل أقدر أدفع بالتقسيط أم الدفع كاش فقط؟",
      faq_a4: "تتوفر خيارات دفع مرنة جداً؛ حيث يمكنك الدفع بنظام الأقساط والدفعات المرحلية المتوافقة مع مراحل تشييد المشروع بدون فوائد إضافية، كما تتوفر إمكانية الاستفادة من برامج التمويل العقاري عبر البنوك والجهات التمويلية المعتمدة للوحدات المكتملة أو المعتمدة تمويلياً.",
      faq_q5: "5. هل الأسعار قابلة للتفاوض؟",
      faq_a5: "الأسعار التأسيسية التي نبدأ بها (من 249,000 ريال) تكون مدروسة ومخفضة جداً في المراحل الأولى لتشجيع المستثمرين والراغبين في التملك. ومع ذلك، نحرص دائماً على التفاوض مع المطور لتحقيق أفضل شروط دفع أو خصومات خاصة لعملائنا في حال السداد المبكر أو شراء أكثر من وحدة.",
      faq_q6: "6. ما الفرق بين الوسيط المعتمد وغير المعتمد؟",
      faq_a6: "الوسيط العقاري المعتمد يحمل رخصة رسمية صادرة من الهيئة العامة للعقار (رخصة فال)، ويلتزم بالقوانين واللوائح الصارمة التي تحمي أموال المشتري وتضمن صحة التراخيص وعدم وجود تدليس أو صفقات وهمية. التعامل مع وسيط غير مرخص يعرضك لمخاطر قانونية ومالية جسيمة.",
      faq_q7: "7. متى يكون موعد استلام الشقة؟",
      faq_a7: "تختلف مدة الإنجاز بحسب مرحلة البناء وحجم المشروع، ولكن في المتوسط تتراوح مدة التسليم بين 12 إلى 24 شهراً من تاريخ بدء التنفيذ. يتم توثيق تاريخ الاستلام وشروط التسليم وجداول الضمانات الهندسية بدقة داخل العقد الملزم.",
      faq_q8: "8. كيف أتأكد من جودة المشروع ومصداقية المطور؟",
      faq_a8: "نقوم بفحص ومراجعة السجل الهندسي والتطويري للمطورين قبل تسويق أي مشروع، كما نتيح لعملائنا الاطلاع على رخصة البناء المعتمدة من أمانة جدة، وتقارير الإشراف الهندسي الدوري، ونقدم زيارات ميدانية لمعاينة مراحل العمل على أرض الواقع.",

      testi_1_text: "تعامل راقي ومصداقية عالية، الأستاذ خالد وفر علي وقت وجهد كبير، وشرح لي كل تفاصيل مشروع شقق التمليك بجدة ونصحني بالخيار الأنسب لميزانيتي.",
      testi_1_name: "محمد العتيبي",
      testi_1_city: "جدة - مستثمر عقاري",
      testi_2_text: "حجزت شقة تمليك تحت الإنشاء بسعر 249 ألف ريال، خطة الدفع كانت ميسرة جداً والتوثيق نظامي رسمي 100%. متابعة ممتازة حتى في مرحلة التشطيب.",
      testi_2_name: "م. عبدالله الغامدي",
      testi_2_city: "مكة المكرمة",
      testi_3_text: "أفضل وسيط عقاري تعاملت معه في جدة. وضوح تام في الشروط والأسعار وبدون أي مبالغات أو عمولات مبطنة. أنصح بشدة بالتعامل معه.",
      testi_3_name: "د. سارة الشهري",
      testi_3_city: "الرياض",
      testi_4_text: "الاستشارة التي قدمها لي حول العائد التأجيري في شمال جدة كانت دقيقة جداً ومبنية على أرقام واقعية في السوق. شكراً لحسن التعامل والأمانة.",
      testi_4_name: "فيصل الحربي",
      testi_4_city: "جدة",
      testi_5_text: "سرعة في الرد والاهتمام بكل الملاحظات والتفاصيل الهندسية. تجربة شراء شقة تمليك سلسة ومريحة وأشعر بالأمان التام بفضل ترخيص فال الرسمي.",
      testi_5_name: "خالد القحطاني",
      testi_5_city: "جدة",

      contact_tag: "تواصل مباشر",
      contact_banner: "فرصتك اليوم… لا تنتظر الغد",
      contact_desc: "الأسعار في مشاريع جدة تتصاعد مع كل مرحلة إنجاز. احجز وحدتك الآن بأفضل سعر قبل نفاد المرحلة الحالية.",
      f_name: "الاسم الكريم",
      f_phone: "رقم الجوال (مع مفتاح الدولة)",
      f_type: "نوع الطلب",
      f_type_buy: "شراء شقة تمليك",
      f_type_invest: "استثمار عقاري بعائد سنوي",
      f_type_rent: "تأجير / إدارة أملاك",
      f_type_inquiry: "استفسار عام واستشارة",
      f_budget: "الميزانية المتوقعة",
      f_budget_1: "من 250,000 إلى 400,000 ريال",
      f_budget_2: "من 400,000 إلى 700,000 ريال",
      f_budget_3: "من 700,000 إلى 1,200,000 ريال",
      f_budget_4: "أكثر من 1,200,000 ريال",
      f_pay: "طريقة الدفع المفضلة",
      f_pay_cash: "كاش دفعة واحدة / دفعات مرحلية",
      f_pay_install: "تمويل عقاري / أقساط ميسرة",
      f_time: "أفضل وقت للتواصل معك",
      f_time_morn: "صباحاً (9 ص - 12 ظهراً)",
      f_time_eve: "مساءً (4 م - 9 م)",
      f_time_wa: "في أي وقت عبر واتساب",
      f_submit: "إرسال الطلب عبر واتساب الآن",

      modal_title: "تحميل بروشور برج اللؤلؤة",
      modal_sub: "فضلاً أدخل رقم جوالك لتصلك نسخة البروشور الكاملة ومخططات الشقق فوراً:",
      modal_btn: "تحميل فوري عبر واتساب",

      footer_about: "خالد البشيري، وسيط عقاري معتمد في جدة. متخصصون في تسويق وإدارة شقق التمليك تحت الإنشاء والاستثمارات العقارية الفاخرة.",
      footer_links_title: "روابط سريعة",
      footer_contact_title: "بيانات التواصل المباشر",
      footer_city: "جدة، المملكة العربية السعودية",
      footer_demo_note: "نموذج أولي تجريبي - كافة البيانات والأرقام لأغراض العرض والبروتوتايب فقط.",
      footer_rights: "جميع الحقوق محفوظة © خالد البشيري",

      mob_call: "اتصال",
      mob_wa: "واتساب",
      mob_book: "احجز وحدة"
    },

    en: {
      site_title: "Khalid Al-Bshyri | Licensed Real Estate Broker in Jeddah - Luxury Freehold & Off-Plan",
      nav_home: "Home",
      nav_services: "Services",
      nav_projects: "Projects",
      nav_why: "Why Us",
      nav_about: "About",
      nav_testimonials: "Testimonials",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_book: "Book Now",

      hero_badge: "Licensed by Real Estate General Authority | License #7100000000 (Demo)",
      hero_title_1: "Own Your Apartment with Confidence…",
      hero_title_2: "Before Completion",
      hero_sub: "REGA-Certified Real Estate Broker | Sales, Rentals & Off-Plan Freehold Apartments Starting from 249,000 SAR in Jeddah",
      hero_cta_wa: "Book via WhatsApp",
      hero_cta_call: "Call Now",

      stat_clients: "Happy Clients",
      stat_projects: "Signature Projects",
      stat_exp: "Years Experience",
      stat_sat: "Client Satisfaction",
      stat_price: "K SAR Starting Price",

      services_tag: "Brokerage & Advisory",
      services_title: "Integrated Real Estate Solutions",
      services_desc: "We place our certified expertise and proven track record at your service to guarantee maximum investment returns and luxury living in Jeddah.",
      srv_1_title: "Luxury Property Sales",
      srv_1_desc: "Marketing and sales of towers, villas, and apartments with utmost transparency and optimum market valuations.",
      srv_2_title: "Leasing & Property Management",
      srv_2_desc: "Tenant screening, official Ejar lease notarization, rent collection, and rigorous maintenance management.",
      srv_3_title: "Off-Plan Freehold Apartments",
      srv_3_desc: "Exclusive off-plan freehold opportunities starting from 249,000 SAR with easy milestone payments.",
      srv_4_title: "Consulting & Real Estate Investment",
      srv_4_desc: "Tailored feasibility studies and ROI yield analysis to guarantee secure and profitable property investment.",
      srv_more: "Request Service",

      proj_tag: "Featured Project",
      proj_title: "Pearl Tower - Jeddah (Off-Plan)",
      proj_desc: "A coastal architectural icon combining luxury and prime location, featuring VIP finishes and prices starting from 249k SAR.",
      proj_price_from: "Prices starting from:",
      proj_price_val: "249,000 SAR",
      feat_tamleek: "Freehold Ownership Deed",
      feat_offplan: "Under Construction (Foundation Prices)",
      feat_services: "Close to Key Vital Amenities",
      feat_invest: "Projected Annual ROI up to 10%",
      feat_location: "Prime Location (North Jeddah / Corniche)",
      proj_units_label: "Remaining Units in Current Phase:",
      proj_units_val: "12 of 40 Units Available",
      proj_dl_brochure: "Download Project Brochure (PDF)",

      pay_title: "Flexible Payment Plan:",
      pay_step1: "15% Down Payment",
      pay_step2: "Construction Milestones",
      pay_step3: "20% Handover Payment",

      why_tag: "Trust & Security",
      why_title: "Why Discerning Investors Choose Us?",
      why_desc: "We don't merely sell real estate; we build a secure, officially regulated investment partnership with you.",
      why_1_title: "Officially Certified Broker",
      why_1_desc: "Licensed by REGA with active FAL Brokerage accreditation, ensuring complete compliance.",
      why_2_title: "Full Price Transparency",
      why_2_desc: "Direct and straightforward pricing with zero hidden fees or unannounced charges.",
      why_3_title: "With You Until Handover",
      why_3_desc: "We accompany you from initial floorplan selection until key handover and title deed registration.",
      why_4_title: "Curated High-Yield Assets",
      why_4_desc: "We handpick projects with solid capital appreciation and proven rental demand in Jeddah.",
      why_5_title: "Instant WhatsApp Support",
      why_5_desc: "Dedicated real estate advisory team available around the clock for rapid answers.",
      why_6_title: "Zero Hidden Commissions",
      why_6_desc: "We adhere strictly to official brokerage rates, maximizing your financial savings.",

      license_tag: "Credentials & Verification",
      license_title: "Verify My Official Real Estate License",
      license_desc: "In accordance with Saudi Arabia Real Estate General Authority (REGA) brokerage bylaws, you can verify my active FAL license and official standing directly.",
      license_card_title: "FAL Brokerage & Real Estate Marketing License",
      license_num_label: "Certified License No: 7100000000",
      license_status_label: "Status: Officially Active & Verified",
      license_btn: "Verify on Official REGA Portal",

      timeline_tag: "How It Works",
      timeline_title: "Your Journey to Apartment Ownership",
      timeline_desc: "4 simple, transparent steps from initial inquiry to receiving the keys to your new home.",
      step_1_title: "1) Contact Us",
      step_1_desc: "Send your requirements and budget via WhatsApp or phone to define your residential or investment goals.",
      step_2_title: "2) Explore Tailored Options",
      step_2_desc: "We provide comprehensive brochures, architectural floorplans, and matching payment schedules.",
      step_3_title: "3) Unit Booking & Contract Notarization",
      step_3_desc: "Reserve your chosen unit and execute binding contracts through verified government portals.",
      step_4_title: "4) Handover & Enjoy Your Home",
      step_4_desc: "Monitor construction progress until key handover and readiness for living or high-yield leasing.",

      about_tag: "About The Broker",
      about_title: "Khalid Al-Bshyri | Your Trusted Jeddah Broker",
      about_p1: "As a licensed real estate broker certified by the Saudi Real Estate General Authority, I dedicate my expertise to unlocking prime investment and residential opportunities for our esteemed clients.",
      about_p2: "We specialize in off-plan freehold apartments in Jeddah, offering accelerated capital appreciation and substantial purchase discounts compared to built properties. Integrity and transparency guide every transaction.",
      badge_licensed: "REGA Licensed Broker",
      badge_fal: "Active FAL Certification",
      badge_experience: "+5 Years Jeddah Market Experience",
      about_reels_title: "Watch Recent Coverage on Instagram",

      calc_tag: "Mortgage & ROI Calculator",
      calc_title: "Calculate Installments & Projected Returns",
      calc_desc: "Adjust apartment price and down payment to view estimated monthly installments and annual yields.",
      calc_price_lbl: "Property Price:",
      calc_down_lbl: "Down Payment Ratio:",
      calc_period_lbl: "Installment Horizon (During Construction):",
      calc_result_down: "Down Payment Amount:",
      calc_result_monthly: "Est. Monthly Installment:",
      calc_result_roi: "Projected Annual ROI:",
      calc_note: "* Approximate estimate subject to developer terms and approved payment milestones.",

      testi_tag: "Testimonials",
      testi_title: "What Our Clients Say",
      testi_desc: "The trust and satisfaction of our clients represent our greatest professional achievement.",

      faq_tag: "Answers & Transparency",
      faq_title: "Frequently Asked Questions",
      faq_desc: "Everything you need to know about purchasing off-plan freehold apartments in Jeddah.",
      faq_q1: "1. What is an off-plan freehold apartment?",
      faq_a1: "Off-plan apartments are residential units purchased during foundation or early construction stages prior to project completion. This provides buyers with prime ground-floor pricing starting from 249,000 SAR, convenient construction milestone payment plans, and superior capital appreciation upon project delivery.",
      faq_q2: "2. Is freehold ownership officially notarized and titled?",
      faq_a2: "Yes, absolutely. All projects we represent are fully licensed with municipal approvals. Contracts comply with Saudi Real Estate General Authority (REGA) and Ministry of Justice standards. Upon completion, independent electronic title deeds (Sukuk) are issued for each unit.",
      faq_q3: "3. How do I reserve a unit and what is the process?",
      faq_a3: "The process begins by contacting us to identify units matching your budget and preferred location. We prepare the initial booking form, collect the reservation deposit (typically 10% to 15%), and execute the official notarized contract detailing specifications, payment milestones, and handover dates.",
      faq_q4: "4. Can I pay via installments or is it cash only?",
      faq_a4: "Flexible payment options are available. You can pay via milestone installments aligned with construction stages without added interest. In addition, bank mortgage financing facilities are available for eligible buyers on approved projects.",
      faq_q5: "5. Are prices negotiable?",
      faq_a5: "Foundation launch prices (starting from 249,000 SAR) are already discounted to incentivize early buyers and investors. Nonetheless, we actively negotiate with developers to secure preferential payment terms or additional discounts for upfront settlement or multi-unit purchases.",
      faq_q6: "6. What is the difference between a licensed and unlicensed broker?",
      faq_a6: "A licensed real estate broker holds an active FAL license from REGA and is legally bound by stringent consumer-protection regulations. Dealing with unlicensed brokers exposes buyers to immense legal and financial vulnerabilities.",
      faq_q7: "7. When is the apartment handover date?",
      faq_a7: "Handover timelines depend on the project scale and construction phase, averaging 12 to 24 months from ground-breaking. Guaranteed delivery milestones and engineering warranties are strictly stipulated in the binding contract.",
      faq_q8: "8. How do I verify project quality and developer credibility?",
      faq_a8: "We thoroughly audit developer track records, building permits from Jeddah Municipality, and civil engineering supervision logs before marketing any development. We also coordinate escorted on-site inspections for our clients.",

      testi_1_text: "Exceptional professionalism and integrity. Mr. Khalid saved me tremendous time and effort, thoroughly explained Pearl Tower off-plan details, and matched my exact investment budget.",
      testi_1_name: "Mohammed Al-Otaibi",
      testi_1_city: "Jeddah - Real Estate Investor",
      testi_2_text: "I booked an off-plan freehold apartment starting at 249k SAR. The installment plan was seamless and 100% legally notarized. Outstanding follow-up throughout construction.",
      testi_2_name: "Eng. Abdullah Al-Ghamdi",
      testi_2_city: "Makkah",
      testi_3_text: "The finest real estate broker I have worked with in Jeddah. Complete transparency with zero hidden commissions. Highly recommended.",
      testi_3_name: "Dr. Sarah Al-Shehri",
      testi_3_city: "Riyadh",
      testi_4_text: "The rental ROI analysis he prepared for North Jeddah was remarkably accurate and grounded in real market data. Truly grateful for his honesty and professionalism.",
      testi_4_name: "Faisal Al-Harbi",
      testi_4_city: "Jeddah",
      testi_5_text: "Prompt responses and meticulous attention to architectural details. A seamless freehold purchase journey with full peace of mind thanks to his official FAL license.",
      testi_5_name: "Khalid Al-Qahtani",
      testi_5_city: "Jeddah",

      contact_tag: "Direct Contact",
      contact_banner: "Seize Your Opportunity Today… Don't Delay",
      contact_desc: "Prices in Jeddah projects increase with each construction milestone. Secure your unit now at early-bird pricing.",
      f_name: "Full Name",
      f_phone: "Mobile Number (with country code)",
      f_type: "Inquiry Type",
      f_type_buy: "Purchase Freehold Apartment",
      f_type_invest: "High-Yield Property Investment",
      f_type_rent: "Leasing / Property Management",
      f_type_inquiry: "General Advisory & Consultation",
      f_budget: "Estimated Budget",
      f_budget_1: "250,000 to 400,000 SAR",
      f_budget_2: "400,000 to 700,000 SAR",
      f_budget_3: "700,000 to 1,200,000 SAR",
      f_budget_4: "Above 1,200,000 SAR",
      f_pay: "Preferred Payment Method",
      f_pay_cash: "Cash / Milestone Staged Payments",
      f_pay_install: "Mortgage / Installment Facility",
      f_time: "Preferred Contact Time",
      f_time_morn: "Morning (9 AM - 12 PM)",
      f_time_eve: "Evening (4 PM - 9 PM)",
      f_time_wa: "Anytime via WhatsApp",
      f_submit: "Submit via WhatsApp Now",

      modal_title: "Download Pearl Tower Brochure",
      modal_sub: "Please enter your phone number to receive the full brochure and floorplans instantly:",
      modal_btn: "Instant Download via WhatsApp",

      footer_about: "Khalid Al-Bshyri, licensed real estate broker in Jeddah. Specializing in off-plan freehold apartments and luxury investments.",
      footer_links_title: "Quick Links",
      footer_contact_title: "Direct Contact Info",
      footer_city: "Jeddah, Kingdom of Saudi Arabia",
      footer_demo_note: "Prototype Demo - All numbers, names, and reviews are for demonstration purposes.",
      footer_rights: "All rights reserved © Khalid Al-Bshyri",

      mob_call: "Call",
      mob_wa: "WhatsApp",
      mob_book: "Book Unit"
    }
  };

  // --- 3. THEME TOGGLE (DARK / LIGHT) ---
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('kb_theme', theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'تبديل للوضع الفاتح' : 'تبديل للوضع الليلي');
    }
  };

  // --- 3.5 SAFE CALCULATOR ENGINE ---
  function updateCalculator() {
    const priceSlider = document.getElementById('calc-price-slider');
    const downSlider = document.getElementById('calc-down-slider');
    if (!priceSlider || !downSlider) return;

    const priceBadge = document.getElementById('calc-price-val');
    const downBadge = document.getElementById('calc-down-val');
    const resDown = document.getElementById('calc-res-down');
    const resMonthly = document.getElementById('calc-res-monthly');
    const resRoi = document.getElementById('calc-res-roi');

    const price = parseInt(priceSlider.value, 10) || 350000;
    const downPercent = parseInt(downSlider.value, 10) || 20;
    const isAr = state.lang === 'ar';
    const currency = isAr ? 'ريال' : 'SAR';

    if (priceBadge) priceBadge.textContent = `${price.toLocaleString()} ${currency}`;
    if (downBadge) downBadge.textContent = `${downPercent}%`;

    const downPaymentAmount = Math.round(price * (downPercent / 100));
    const remainingAmount = price - downPaymentAmount;
    const monthlyInstallment = Math.round(remainingAmount / 36);
    const estimatedAnnualReturn = Math.round(price * 0.095);

    if (resDown) resDown.textContent = `${downPaymentAmount.toLocaleString()} ${currency}`;
    if (resMonthly) resMonthly.textContent = `${monthlyInstallment.toLocaleString()} ${currency} / ${isAr ? 'شهرياً' : 'mo'}`;
    if (resRoi) resRoi.textContent = `${estimatedAnnualReturn.toLocaleString()} ${currency} (${isAr ? 'عائد 9.5% سنوي' : '9.5% ROI'})`;
  }

  // --- 4. LANGUAGE TOGGLE (AR / EN) ---
  const applyLanguage = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    state.lang = lang;
    localStorage.setItem('kb_lang', lang);

    // Update Language Toggle Button label
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = lang === 'ar' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> <span>English</span>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> <span>العربية</span>`;
    }

    // Apply translations across all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    // Update placeholders
    const placeholders = document.querySelectorAll('[data-i18n-ph]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18n[lang] && i18n[lang][key]) {
        el.setAttribute('placeholder', i18n[lang][key]);
      }
    });

    document.title = i18n[lang].site_title;
    updateCalculator();
  };

  // Bind Switchers
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(state.lang === 'ar' ? 'en' : 'ar');
    });
  }

  // Initial Theme & Lang execution
  applyTheme(state.theme);
  applyLanguage(state.lang);

  // --- 6. SCROLL PROGRESS BAR & NAVBAR SHADOW ---
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 7. DESKTOP CURSOR GLOW ---
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // --- 8. HERO GOLD DUST PARTICLES CANVAS ---
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width / 25);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.6,
          speedY: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.65 + 0.2,
          pulse: Math.random() * 0.02 + 0.005
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulse) * 0.01;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 208, 138, ${Math.max(0.1, Math.min(0.85, p.opacity))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#C9A24B';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParticles();
  }

  // --- 9. 3D TILT ON HOVER FOR GLASS CARDS ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // --- 10. MAGNETIC HOVER ON GOLD BUTTONS ---
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 450);
    });
  });

  // --- 11. SCROLL REVEAL OBSERVER & STATS ANIMATOR ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Timeline glow line animation on scroll
  const timelineSection = document.getElementById('how-it-works');
  const timelineGlow = document.querySelector('.timeline-line-glow');
  if (timelineSection && timelineGlow) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineGlow.style.height = '100%';
        }
      });
    }, { threshold: 0.2 });
    timelineObserver.observe(timelineSection);
  }

  // Count-up Animated Stats Bar
  const statsSection = document.getElementById('stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !state.statsAnimated) {
          state.statsAnimated = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  function animateStats() {
    const statCounters = document.querySelectorAll('[data-target]');
    statCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });

    // Circular progress ring animation for 100%
    const circleBar = document.querySelector('.circle-bar');
    if (circleBar) {
      // 201 is full dasharray, 0 means 100% filled ring
      circleBar.style.strokeDashoffset = '0';
    }
  }

  // --- 12. FEATURED PROJECT GALLERY SLIDER ---
  const slides = document.querySelectorAll('.slide-img');
  const thumbs = document.querySelectorAll('.thumb-item');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  function setSlide(index) {
    if (!slides.length) return;
    state.sliderIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === state.sliderIndex);
    });

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === state.sliderIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => setSlide(state.sliderIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setSlide(state.sliderIndex + 1));

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => setSlide(idx));
  });

  // Touch Swipe for project gallery
  const gallery = document.querySelector('.gallery-main-slide');
  if (gallery) {
    let touchStartX = 0;
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        setSlide(state.sliderIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        setSlide(state.sliderIndex - 1);
      }
    }, { passive: true });
  }

  // --- 13. INVESTMENT CALCULATOR EVENT LISTENERS ---
  const priceSlider = document.getElementById('calc-price-slider');
  const downSlider = document.getElementById('calc-down-slider');
  if (priceSlider) priceSlider.addEventListener('input', updateCalculator);
  if (downSlider) downSlider.addEventListener('input', updateCalculator);
  updateCalculator();

  // --- 14. TESTIMONIALS CAROUSEL ---
  const testTrack = document.querySelector('.testimonials-track');
  const testCards = document.querySelectorAll('.testimonial-card');
  const testIndicators = document.querySelectorAll('.indicator-dot');

  function updateTestimonial(index) {
    if (!testTrack || !testCards.length) return;
    const cardsPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    const maxIndex = Math.max(0, testCards.length - cardsPerView);
    state.testimonialIndex = Math.min(Math.max(0, index), maxIndex);

    const cardWidth = testCards[0].offsetWidth + 28; // 28 is gap
    const direction = state.lang === 'ar' ? 1 : -1;
    testTrack.style.transform = `translateX(${direction * state.testimonialIndex * cardWidth}px)`;

    testIndicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.testimonialIndex);
    });
  }

  testIndicators.forEach((dot, i) => {
    dot.addEventListener('click', () => updateTestimonial(i));
  });

  const startTestimonialsAuto = () => {
    state.testimonialInterval = setInterval(() => {
      if (!state.isTestimonialHovered) {
        const cardsPerView = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = Math.max(0, testCards.length - cardsPerView);
        let nextIdx = state.testimonialIndex + 1;
        if (nextIdx > maxIndex) nextIdx = 0;
        updateTestimonial(nextIdx);
      }
    }, 4500);
  };

  if (testTrack) {
    testTrack.addEventListener('mouseenter', () => state.isTestimonialHovered = true);
    testTrack.addEventListener('mouseleave', () => state.isTestimonialHovered = false);
    startTestimonialsAuto();
  }

  // --- 15. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 16. BROCHURE MODAL ---
  const brochureModal = document.getElementById('brochure-modal');
  const openBrochureBtns = document.querySelectorAll('.open-brochure-modal');
  const closeBrochureBtn = document.getElementById('close-brochure-modal');
  const brochureForm = document.getElementById('brochure-form');

  openBrochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (brochureModal) brochureModal.classList.add('open');
    });
  });

  if (closeBrochureBtn) {
    closeBrochureBtn.addEventListener('click', () => {
      if (brochureModal) brochureModal.classList.remove('open');
    });
  }

  if (brochureModal) {
    brochureModal.addEventListener('click', (e) => {
      if (e.target === brochureModal) {
        brochureModal.classList.remove('open');
      }
    });
  }

  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById('brochure-phone');
      const phone = phoneInput ? phoneInput.value.trim() : '';

      const isAr = state.lang === 'ar';
      const msg = isAr 
        ? `السلام عليكم ورحمة الله وبركاته،\nأرغب في الحصول على بروشور مشروع *برج اللؤلؤة - جدة* ومخططات الشقق المتوفرة.\nرقم التواصل: ${phone}`
        : `Hello Khalid Al-Bshyri,\nI would like to receive the *Pearl Tower - Jeddah* brochure and floorplans.\nContact phone: ${phone}`;

      const waUrl = `https://wa.me/966530756536?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      brochureModal.classList.remove('open');
    });
  }

  // --- 17. CONTACT FORM -> WHATSAPP INTEGRATION ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('c-name')?.value.trim() || '';
      const phone = document.getElementById('c-phone')?.value.trim() || '';
      const type = document.getElementById('c-type')?.value || '';
      const budget = document.getElementById('c-budget')?.value || '';
      const payment = document.getElementById('c-payment')?.value || '';
      const time = document.getElementById('c-time')?.value || '';

      const isAr = state.lang === 'ar';

      let msg = '';
      if (isAr) {
        msg = `*طلب عقاري جديد عبر الموقع الإلكتروني*\n` +
              `-------------------------------------\n` +
              `👤 *الاسم:* ${name}\n` +
              `📱 *رقم الجوال:* ${phone}\n` +
              `🏢 *نوع الطلب:* ${type}\n` +
              `💰 *الميزانية المتوقعة:* ${budget}\n` +
              `💳 *طريقة الدفع:* ${payment}\n` +
              `⏰ *أفضل وقت للتواصل:* ${time}\n` +
              `-------------------------------------\n` +
              `مرحباً أ. خالد البشيري، بانتظار تواصلكم لمناقشة الخيارات المناسبة.`;
      } else {
        msg = `*New Real Estate Inquiry from Website*\n` +
              `-------------------------------------\n` +
              `👤 *Name:* ${name}\n` +
              `📱 *Phone:* ${phone}\n` +
              `🏢 *Inquiry Type:* ${type}\n` +
              `💰 *Estimated Budget:* ${budget}\n` +
              `💳 *Payment Method:* ${payment}\n` +
              `⏰ *Preferred Time:* ${time}\n` +
              `-------------------------------------\n` +
              `Hello Khalid Al-Bshyri, looking forward to your response.`;
      }

      const waUrl = `https://wa.me/966530756536?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  }

  // --- 18. LIVE BOOKINGS TICKER TOAST NOTIFICATIONS ---
  const bookingsDataAr = [
    { text: "محمد العتيبي من جدة حجز وحدة في برج اللؤلؤة", time: "قبل ساعتين" },
    { text: "م. عبدالله الغامدي من مكة استفسر عن شقق التمليك", time: "قبل 45 دقيقة" },
    { text: "د. سارة الشهري من الرياض حجزت استشارة استثمارية", time: "قبل 10 دقائق" },
    { text: "خالد الحربي من جدة قام بتحميل بروشور المشروع", time: "الآن" }
  ];

  const bookingsDataEn = [
    { text: "Mohammed Al-Otaibi from Jeddah booked a unit in Pearl Tower", time: "2 hours ago" },
    { text: "Eng. Abdullah Al-Ghamdi from Makkah inquired about off-plan units", time: "45 mins ago" },
    { text: "Dr. Sarah Al-Shehri from Riyadh booked an investment consultation", time: "10 mins ago" },
    { text: "Khalid Al-Harbi from Jeddah downloaded project brochure", time: "Just now" }
  ];

  const tickerToast = document.getElementById('live-ticker-toast');
  let currentTickerIdx = 0;

  function showNextTicker() {
    if (!tickerToast) return;
    const isAr = state.lang === 'ar';
    const list = isAr ? bookingsDataAr : bookingsDataEn;
    const item = list[currentTickerIdx % list.length];

    const contentEl = tickerToast.querySelector('.ticker-text');
    const timeEl = tickerToast.querySelector('.ticker-time');

    if (contentEl) contentEl.textContent = item.text;
    if (timeEl) timeEl.textContent = item.time;

    tickerToast.classList.add('active');

    setTimeout(() => {
      tickerToast.classList.remove('active');
    }, 5500);

    currentTickerIdx++;
  }

  // Run ticker every 13 seconds
  setTimeout(() => {
    showNextTicker();
    setInterval(showNextTicker, 13000);
  }, 4000);

  // --- 19. MOBILE MENU DRAWER ---
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
});

/**
 * خالد البشيري | KHALID AL-BSHYRI - REAL ESTATE BROKER JEDDAH
 * High-Performance, Architectural Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  const state = {
    theme: localStorage.getItem('kb_theme') || 'dark',
    lang: localStorage.getItem('kb_lang') || 'ar'
  };

  // Translations
  const i18n = {
    ar: {
      site_title: "خالد البشيري | وسيط عقاري معتمد في جدة",
      nav_home: "الرئيسية",
      nav_about: "من نحن",
      nav_services: "خدماتنا",
      nav_projects: "المشاريع",
      nav_why: "لماذا نحن",
      nav_testimonials: "آراء العملاء",
      nav_faq: "الأسئلة الشائعة",
      nav_contact: "تواصل معنا",
      nav_book: "احجز الآن",

      hero_headline: "استثمارك الذكي وسكنك الراقي<br><span class='text-accent'>في قلب جدة</span>",
      hero_sub: "خيارات عقارية مدروسة وتمليك شقق استثنائية تناسب تطلعاتك.. نرافقك بوضوح وشفافية من أول استشارة حتى استلام المفتاح.",
      hero_cta_wa: "تواصل عبر واتساب",
      hero_cta_call: "اتصال هاتفي",

      stat_1: "وحدة تحت المتابعة",
      stat_2: "حياً في جدة",
      stat_3: "رضا العملاء",
      stat_4: "خدمات متكاملة",

      tag_contracts: "عقود واضحة",
      tag_followup: "متابعة دورية",
      tag_services: "خدمات متكاملة",

      about_tag: "من نحن",
      about_title: "خالد البشيري | وسيطك العقاري الموثوق في جدة",
      about_desc: "نعمل في مدينة جدة على تقديم خيارات عقارية مدروسة في البيع والتأجير وشقق التمليك، بفهم عميق لاحتياجك وميزانيتك. هدفنا توفير وضوح كامل في كل خطوة، ومقارنة هادئة بلا استعجال، لتحمي وقتك وتحافظ على قيمة استثمارك العقاري.",
      chk_1: "خيارات عقارية أقرب لاحتياجك",
      chk_2: "معلومات واضحة قبل المعاينة",
      chk_3: "مقارنة هادئة بلا استعجال",
      chk_4: "متابعة مباشرة عبر واتساب",

      services_tag: "خدماتنا العقارية",
      services_title: "حلول عقارية متكاملة تلبي تطلعاتك",
      services_desc: "نقدم خدمات الوساطة والاستشارات العقارية في جدة بأعلى معايير الاحترافية والمصداقية.",
      srv_1_title: "بيع وشراء العقارات",
      srv_1_desc: "تسويق وبيع الشقق والفلل السكنية بقيم سوقية واقعية وشفافية كاملة.",
      srv_2_title: "التأجير وإدارة الأملاك",
      srv_2_desc: "إدارة احترافية للوحدات وتوثيق العقود ومتابعة التحصيل والصيانة بكل دقة.",
      srv_3_title: "شقق تمليك تحت الإنشاء",
      srv_3_desc: "فرص حصرية للتملك بأسعار تأسيسية تبدأ من 249 ألف ريال وبدفعات مرحلية ميسرة.",
      srv_4_title: "الاستشارات العقارية",
      srv_4_desc: "دراسة وتحليل العوائد وفرص النمو الرأسمالي لمساعدتك في اتخاذ القرار الأمثل.",

      proj_tag: "مشروع مميز في جدة",
      proj_title: "برج اللؤلؤة - جدة (تحت الإنشاء)",
      proj_desc: "أيقونة سكنية حديثة تجمع بين الموقع المميز والتصميم الراقي، بأسعار تبدأ من 249 ألف ريال.",

      why_tag: "المصداقية والوضوح",
      why_title: "لماذا يفضل العملاء التعامل معنا؟",
      why_desc: "نهتم بتفاصيل كل صفقة ونضع مصلحة العميل أولاً لضمان تجربة تملك مريحة وآمنة.",
      w_1_title: "وساطة معتمدة رسمياً",
      w_1_desc: "إجراءات نظامية وعقود موثقة وفق اشتراطات الهيئة العامة للعقار.",
      w_2_title: "شفافية كاملة في الأسعار",
      w_2_desc: "أسعار واضحة ومباشرة دون أي تكاليف أو عمولات غير معلنة.",
      w_3_title: "متابعة حتى الاستلام",
      w_3_desc: "نرافقك في كافة مراحل الإنجاز حتى استلام المفتاح ونقل الملكية.",
      w_4_title: "خيارات مدروسة بعناية",
      w_4_desc: "ننتقي مشاريع ذات جودة إنشائية ومواقع واعدة بنمو رأسمالي قوي.",
      w_5_title: "تواصل مباشر وسريع",
      w_5_desc: "استجابة سريعة عبر واتساب للإجابة على كافة تساؤلاتك وملاحظاتك.",
      w_6_title: "مقارنة هادئة بلا استعجال",
      w_6_desc: "نساعدك على المقارنة واختيار الأنسب لك دون أي ضغط أو إلحاح.",

      calc_tag: "حاسبة الأقساط",
      calc_title: "احسب قسطك التقديري",
      calc_desc: "حدد سعر الشقة ونسبة الدفعة الأولى لمعرفة القسط الشهري التقديري خلال فترة البناء.",
      calc_price_lbl: "سعر الشقة:",
      calc_down_lbl: "الدفعة الأولى:",
      calc_res_lbl: "القسط الشهري التقديري:",

      testi_tag: "آراء وتجارب",
      testi_title: "ماذا يقول عملاؤنا؟",
      testi_desc: "ثقة عملائنا هي الأساس في كل خطوة نخطوها.",

      faq_tag: "الأسئلة الشائعة",
      faq_title: "إجابات على أهم تساؤلاتك",
      faq_desc: "كل ما تحتاج معرفته حول شقق التمليك تحت الإنشاء وإجراءات الشراء.",

      contact_tag: "تواصل معنا",
      contact_title: "نسعد بخدمتك ومساعدتك في اختيار عقارك",
      f_name: "الاسم الكريم",
      f_phone: "رقم الجوال",
      f_type: "نوع الطلب",
      f_budget: "الميزانية التقريبية",
      f_submit: "إرسال الطلب عبر واتساب"
    },

    en: {
      site_title: "Khalid Al-Bshyri | Real Estate Broker in Jeddah",
      nav_home: "Home",
      nav_about: "About Us",
      nav_services: "Services",
      nav_projects: "Projects",
      nav_why: "Why Us",
      nav_testimonials: "Testimonials",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_book: "Book Now",

      hero_headline: "Smart Investment & Luxury Living<br><span class='text-accent'>In the Heart of Jeddah</span>",
      hero_sub: "Curated real estate opportunities and prime freehold apartments tailored to your goals. Guided with clarity and transparency from first inquiry to key handover.",
      hero_cta_wa: "Contact via WhatsApp",
      hero_cta_call: "Call Us",

      stat_1: "Units Under Management",
      stat_2: "Districts in Jeddah",
      stat_3: "Client Satisfaction",
      stat_4: "Integrated Services",

      tag_contracts: "Clear Contracts",
      tag_followup: "Regular Follow-up",
      tag_services: "Full Services",

      about_tag: "About Us",
      about_title: "Khalid Al-Bshyri | Your Trusted Broker in Jeddah",
      about_desc: "We provide curated options in sales, leasing, and off-plan freehold apartments in Jeddah, tailored to your budget and aspirations. Our goal is complete transparency, unhurried comparisons, and protecting the long-term value of your real estate investment.",
      chk_1: "Properties closely matched to your needs",
      chk_2: "Clear upfront details before viewing",
      chk_3: "Calm, unhurried comparisons",
      chk_4: "Direct follow-up via WhatsApp",

      services_tag: "Our Services",
      services_title: "Integrated Solutions for Your Ambitions",
      services_desc: "Professional brokerage and real estate consulting in Jeddah upholding maximum integrity.",
      srv_1_title: "Property Sales & Purchases",
      srv_1_desc: "Marketing and sales of luxury apartments and villas at realistic market valuations.",
      srv_2_title: "Leasing & Property Management",
      srv_2_desc: "Rigorous tenant screening, official lease notarization, and thorough maintenance follow-up.",
      srv_3_title: "Off-Plan Freehold Apartments",
      srv_3_desc: "Exclusive off-plan units starting from 249,000 SAR with flexible milestone payments.",
      srv_4_title: "Real Estate Consulting",
      srv_4_desc: "In-depth ROI and capital appreciation analysis to empower confident decisions.",

      proj_tag: "Featured Project in Jeddah",
      proj_title: "Pearl Tower - Jeddah (Off-Plan)",
      proj_desc: "A contemporary residential icon combining prime location and refined architecture, starting from 249k SAR.",

      why_tag: "Trust & Clarity",
      why_title: "Why Discerning Clients Choose Us?",
      why_desc: "We treat every transaction with utmost care, placing your peace of mind first.",
      w_1_title: "Officially Certified Brokerage",
      w_1_desc: "Compliant legal procedures and official contracts protecting your rights.",
      w_2_title: "Complete Price Transparency",
      w_2_desc: "Clear upfront prices with zero hidden fees or unannounced charges.",
      w_3_title: "With You Until Handover",
      w_3_desc: "Continuous progress monitoring until key handover and title deed registration.",
      w_4_title: "Carefully Curated Assets",
      w_4_desc: "Developments handpicked for construction quality and solid capital appreciation.",
      w_5_title: "Direct & Rapid Support",
      w_5_desc: "Immediate WhatsApp responses to all your questions and feedback.",
      w_6_title: "Calm, Unhurried Guidance",
      w_6_desc: "We help you compare options at your pace without aggressive sales pressure.",

      calc_tag: "Mortgage Calculator",
      calc_title: "Estimate Your Installment",
      calc_desc: "Select apartment price and down payment ratio to preview estimated monthly installments.",
      calc_price_lbl: "Apartment Price:",
      calc_down_lbl: "Down Payment:",
      calc_res_lbl: "Estimated Monthly Installment:",

      testi_tag: "Client Reviews",
      testi_title: "What Our Clients Say",
      testi_desc: "Client trust is the cornerstone of everything we build.",

      faq_tag: "FAQ",
      faq_title: "Answers to Key Questions",
      faq_desc: "Everything you need to know regarding off-plan purchases and procedures.",

      contact_tag: "Contact Us",
      contact_title: "We are pleased to assist you",
      f_name: "Full Name",
      f_phone: "Phone Number",
      f_type: "Inquiry Type",
      f_budget: "Approximate Budget",
      f_submit: "Submit via WhatsApp"
    }
  };

  // --- Theme Toggle ---
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('kb_theme', theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'تبديل للوضع الفاتح' : 'تبديل للوضع الليلي');
    }
  };

  // --- Calculator Engine ---
  function updateCalculator() {
    const priceSlider = document.getElementById('calc-price-slider');
    const downSlider = document.getElementById('calc-down-slider');
    if (!priceSlider || !downSlider) return;

    const priceBadge = document.getElementById('calc-price-val');
    const downBadge = document.getElementById('calc-down-val');
    const resDown = document.getElementById('calc-res-down');
    const resMonthly = document.getElementById('calc-res-monthly');

    const price = parseInt(priceSlider.value, 10) || 350000;
    const downPercent = parseInt(downSlider.value, 10) || 20;
    const isAr = state.lang === 'ar';
    const currency = isAr ? 'ريال' : 'SAR';

    if (priceBadge) priceBadge.textContent = `${price.toLocaleString()} ${currency}`;
    if (downBadge) downBadge.textContent = `${downPercent}%`;

    const downPaymentAmount = Math.round(price * (downPercent / 100));
    const remainingAmount = price - downPaymentAmount;
    const monthlyInstallment = Math.round(remainingAmount / 36);

    if (resDown) resDown.textContent = `${downPaymentAmount.toLocaleString()} ${currency}`;
    if (resMonthly) resMonthly.textContent = `${monthlyInstallment.toLocaleString()} ${currency} / ${isAr ? 'شهرياً' : 'mo'}`;
  }

  // --- Language Toggle ---
  const applyLanguage = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    state.lang = lang;
    localStorage.setItem('kb_lang', lang);

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = lang === 'ar' 
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> <span>English</span>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> <span>العربية</span>`;
    }

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });

    document.title = i18n[lang].site_title;
    updateCalculator();
  };

  // Bind Buttons
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

  // Initial Execution
  applyTheme(state.theme);
  applyLanguage(state.lang);

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
    if (progressBar) {
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    }
  }, { passive: true });

  // --- Calculator Event Listeners ---
  const priceSlider = document.getElementById('calc-price-slider');
  const downSlider = document.getElementById('calc-down-slider');
  if (priceSlider) priceSlider.addEventListener('input', updateCalculator);
  if (downSlider) downSlider.addEventListener('input', updateCalculator);
  updateCalculator();

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // --- Contact Form Submit -> WhatsApp ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('c-name')?.value.trim() || '';
      const phone = document.getElementById('c-phone')?.value.trim() || '';
      const type = document.getElementById('c-type')?.value || '';
      const budget = document.getElementById('c-budget')?.value || '';

      const isAr = state.lang === 'ar';
      let msg = '';
      if (isAr) {
        msg = `*طلب عقاري جديد عبر الموقع*\n` +
              `-------------------------------------\n` +
              `👤 *الاسم:* ${name}\n` +
              `📱 *رقم الجوال:* ${phone}\n` +
              `🏢 *نوع الطلب:* ${type}\n` +
              `💰 *الميزانية التقريبية:* ${budget}\n` +
              `-------------------------------------\n` +
              `مرحباً أ. خالد البشيري، أرجو التواصل معي لمناقشة الخيارات المناسبة.`;
      } else {
        msg = `*New Real Estate Inquiry from Website*\n` +
              `-------------------------------------\n` +
              `👤 *Name:* ${name}\n` +
              `📱 *Phone:* ${phone}\n` +
              `🏢 *Inquiry:* ${type}\n` +
              `💰 *Budget:* ${budget}\n` +
              `-------------------------------------\n` +
              `Hello Khalid Al-Bshyri, looking forward to your response.`;
      }

      const waUrl = `https://wa.me/966530756536?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  }

  // --- Mobile Menu Toggle ---
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

export const localeOptions = [
  { code: "en", label: "English", shortLabel: "ENG" },
  { code: "es", label: "Español", shortLabel: "ESP" },
  { code: "ru", label: "Русский", shortLabel: "РУС" },
  { code: "de", label: "Deutsch", shortLabel: "DE" },
] as const;

export type Locale = (typeof localeOptions)[number]["code"];

export const defaultLocale: Locale = "en";

type Stat = {
  label: string;
  value: string;
};

type ContentCard = {
  copy: string;
  title: string;
};

type ProcessCard = ContentCard & {
  step: string;
};

type DetailRow = {
  label: string;
  value: string;
};

type FormOption = {
  label: string;
  value: string;
};

export type InquiryFormCopy = {
  emailLabel: string;
  emailPlaceholder: string;
  errorFallback: string;
  fullNameLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  namePlaceholder: string;
  optionalPhonePlaceholder: string;
  phoneLabel: string;
  sendButton: string;
  sendingButton: string;
  successFallback: string;
  timelineLabel: string;
  timelineOptions: FormOption[];
  timelinePlaceholder: string;
};

type LocaleCopy = {
  approachSection: {
    eyebrow: string;
    items: ProcessCard[];
    text: string;
    title: string;
  };
  brandTag: string;
  contactSection: {
    details: DetailRow[];
    eyebrow: string;
    text: string;
    title: string;
  };
  form: InquiryFormCopy;
  hero: {
    eyebrow: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Stat[];
    statsAriaLabel: string;
    text: string;
    title: string;
  };
  heroCard: {
    highlights: string[];
    kicker: string;
    text: string;
    title: string;
  };
  languageSwitcherLabel: string;
  nav: {
    approach: string;
    ariaLabel: string;
    contact: string;
    services: string;
  };
  neighborhoodsSection: {
    eyebrow: string;
    items: ContentCard[];
    text: string;
    title: string;
  };
  servicesSection: {
    eyebrow: string;
    items: ContentCard[];
    text: string;
    title: string;
  };
};

export const siteCopy: Record<Locale, LocaleCopy> = {
  en: {
    brandTag: "Boutique Real Estate Guidance",
    languageSwitcherLabel: "Choose a language",
    nav: {
      ariaLabel: "Primary",
      services: "Services",
      approach: "Approach",
      contact: "Contact",
    },
    hero: {
      eyebrow: "For clients who want steady guidance and elevated presentation",
      title: "Real estate that feels grounded, graceful, and deeply personal.",
      text:
        "Verdant Realty pairs calm strategy with concierge-level care, helping buyers and sellers move forward with confidence and a sense of ease.",
      primaryCta: "Book a Consultation",
      secondaryCta: "Explore Services",
      statsAriaLabel: "Brand highlights",
      stats: [
        { value: "1:1", label: "client care" },
        { value: "Tailored", label: "market strategy" },
        { value: "Elegant", label: "listing presentation" },
      ],
    },
    heroCard: {
      kicker: "Signature Experience",
      title: "A warm, polished brand for meaningful moves.",
      text:
        "Built for a relationship-first agent who wants every touchpoint to feel intentional, trustworthy, and a little more refined than the standard template.",
      highlights: [
        "Boutique attention with polished, high-trust service",
        "Elegant marketing direction and listing presentation",
        "Measured advice that keeps decisions clear and confident",
        "Warm, relationship-driven guidance from first tour to closing day",
      ],
    },
    servicesSection: {
      eyebrow: "Signature Services",
      title: "Support that meets people where they are.",
      text:
        "The experience is designed to feel attentive and practical, with strategy that adapts to each client instead of forcing them into a canned process.",
      items: [
        {
          title: "Seller Representation",
          copy:
            "Preparation strategy, pricing clarity, polished marketing, and hands-on negotiation for listings that deserve care.",
        },
        {
          title: "Buyer Guidance",
          copy:
            "A calm, curated search experience with sharp local insight, steady communication, and confident offer strategy.",
        },
        {
          title: "Relocation Support",
          copy:
            "Neighborhood orientation, trusted vendor introductions, and a grounded plan for clients entering a new market.",
        },
      ],
    },
    approachSection: {
      eyebrow: "The Verdant Approach",
      title: "Thoughtful process. Clear communication. Beautiful execution.",
      text:
        "This homepage is now multilingual and ready to support an internationally-minded client base, while the project structure stays ready for future Supabase-powered inquiries, listings, testimonials, or neighborhood content.",
      items: [
        {
          step: "01",
          title: "Listen First",
          copy:
            "Every move starts with the story behind it, so the strategy fits the season of life as much as the market.",
        },
        {
          step: "02",
          title: "Shape The Plan",
          copy:
            "From pricing to presentation to timelines, each detail is arranged to feel elegant, realistic, and well-supported.",
        },
        {
          step: "03",
          title: "Lead With Care",
          copy:
            "Clients get attentive communication, thoughtful advocacy, and a process that stays composed from start to close.",
        },
      ],
    },
    neighborhoodsSection: {
      eyebrow: "Neighborhood Storytelling",
      title: "Marketed with feeling, not just square footage.",
      text:
        "The brand language leans into lifestyle, texture, and place so the site feels memorable before you even add live listings or sold properties.",
      items: [
        {
          title: "Garden District Charm",
          copy:
            "Leafy streets, character homes, and classic curb appeal for clients who want warmth, texture, and timeless detail.",
        },
        {
          title: "Refined Urban Living",
          copy:
            "Well-designed condos and lock-and-leave homes close to dining, culture, and a more walkable rhythm of life.",
        },
        {
          title: "Family-Focused Retreats",
          copy:
            "Quiet streets, larger lots, and practical layouts for buyers looking for both breathing room and everyday ease.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Start The Conversation",
      title: "Let’s turn interest into an actual client inquiry flow.",
      text:
        "The form below works across all four languages and posts to a Next.js API route that is ready to insert leads into Supabase once project keys are connected.",
      details: [
        {
          label: "Availability",
          value: "Private consultations by appointment",
        },
        {
          label: "Best fit",
          value: "Buyers, sellers, and relocation clients",
        },
      ],
    },
    form: {
      fullNameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone Number",
      optionalPhonePlaceholder: "Optional",
      timelineLabel: "Timeline",
      timelinePlaceholder: "Select a timeframe",
      timelineOptions: [
        { value: "Immediately", label: "Immediately" },
        { value: "1-3 months", label: "1-3 months" },
        { value: "3-6 months", label: "3-6 months" },
        { value: "6+ months", label: "6+ months" },
      ],
      messageLabel: "How can Verdant Realty help?",
      messagePlaceholder:
        "Tell us a little about your move, your goals, or the property you have in mind.",
      sendButton: "Send Inquiry",
      sendingButton: "Sending...",
      errorFallback: "Something went wrong. Please try again.",
      successFallback: "Inquiry submitted successfully.",
    },
  },
  es: {
    brandTag: "Asesoría Inmobiliaria Boutique",
    languageSwitcherLabel: "Elegir idioma",
    nav: {
      ariaLabel: "Principal",
      services: "Servicios",
      approach: "Enfoque",
      contact: "Contacto",
    },
    hero: {
      eyebrow: "Para clientes que buscan guía constante y una presentación más cuidada",
      title: "Bienes raíces con calma, elegancia y un trato profundamente personal.",
      text:
        "Verdant Realty combina estrategia serena con atención tipo concierge para ayudar a compradores y vendedores a avanzar con confianza y tranquilidad.",
      primaryCta: "Reservar una consulta",
      secondaryCta: "Ver servicios",
      statsAriaLabel: "Puntos destacados de la marca",
      stats: [
        { value: "1:1", label: "atención personal" },
        { value: "A medida", label: "estrategia de mercado" },
        { value: "Elegante", label: "presentación de propiedades" },
      ],
    },
    heroCard: {
      kicker: "Experiencia Distintiva",
      title: "Una marca cálida y refinada para cambios importantes.",
      text:
        "Pensada para una agente enfocada en las relaciones, que quiere que cada contacto se sienta intencional, confiable y más refinado que una plantilla común.",
      highlights: [
        "Atención boutique con un servicio pulido y de alta confianza",
        "Dirección de marketing elegante y presentación cuidada",
        "Consejo sereno que aporta claridad y seguridad",
        "Acompañamiento cercano desde la primera visita hasta el cierre",
      ],
    },
    servicesSection: {
      eyebrow: "Servicios Destacados",
      title: "Apoyo que se adapta a cada persona.",
      text:
        "La experiencia está diseñada para sentirse cercana y práctica, con una estrategia que se ajusta a cada cliente en lugar de encajarlo en un proceso rígido.",
      items: [
        {
          title: "Representación para vendedores",
          copy:
            "Estrategia de preparación, claridad en el precio, marketing cuidado y negociación activa para propiedades que merecen atención.",
        },
        {
          title: "Asesoría para compradores",
          copy:
            "Una búsqueda tranquila y curada, con visión local, comunicación constante y una estrategia de oferta segura.",
        },
        {
          title: "Apoyo para reubicación",
          copy:
            "Orientación sobre barrios, recomendaciones de proveedores de confianza y un plan claro para quienes llegan a un nuevo mercado.",
        },
      ],
    },
    approachSection: {
      eyebrow: "El Enfoque Verdant",
      title: "Proceso pensado. Comunicación clara. Ejecución hermosa.",
      text:
        "La página ahora funciona en varios idiomas para una clientela internacional, y la estructura sigue lista para futuras consultas, testimonios o contenidos de barrios conectados con Supabase.",
      items: [
        {
          step: "01",
          title: "Escuchar primero",
          copy:
            "Cada mudanza comienza con la historia detrás de ella, para que la estrategia responda tanto al momento de vida como al mercado.",
        },
        {
          step: "02",
          title: "Diseñar el plan",
          copy:
            "Desde el precio hasta la presentación y los tiempos, cada detalle se organiza para sentirse elegante, realista y bien acompañado.",
        },
        {
          step: "03",
          title: "Guiar con cuidado",
          copy:
            "Los clientes reciben comunicación atenta, defensa estratégica y un proceso sereno desde el inicio hasta el cierre.",
        },
      ],
    },
    neighborhoodsSection: {
      eyebrow: "Narrativa del vecindario",
      title: "Se vende una forma de vivir, no solo metros cuadrados.",
      text:
        "El lenguaje de la marca apuesta por estilo de vida, textura y sentido de lugar, para que el sitio resulte memorable incluso antes de mostrar propiedades reales.",
      items: [
        {
          title: "Encanto de barrio jardín",
          copy:
            "Calles arboladas, casas con carácter y una estética clásica para clientes que buscan calidez y detalles atemporales.",
        },
        {
          title: "Vida urbana refinada",
          copy:
            "Condominios bien diseñados y hogares prácticos cerca de restaurantes, cultura y un ritmo de vida más caminable.",
        },
        {
          title: "Refugios para familias",
          copy:
            "Calles tranquilas, terrenos más amplios y distribuciones cómodas para quienes buscan espacio y facilidad diaria.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Empecemos a conversar",
      title: "Convirtamos el interés en un flujo real de consultas.",
      text:
        "El formulario funciona en los cuatro idiomas y envía los datos a una ruta de Next.js lista para guardar prospectos en Supabase cuando se conecten las claves del proyecto.",
      details: [
        {
          label: "Disponibilidad",
          value: "Consultas privadas con cita previa",
        },
        {
          label: "Ideal para",
          value: "Compradores, vendedores y clientes de reubicación",
        },
      ],
    },
    form: {
      fullNameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      phoneLabel: "Teléfono",
      optionalPhonePlaceholder: "Opcional",
      timelineLabel: "Plazo",
      timelinePlaceholder: "Selecciona un plazo",
      timelineOptions: [
        { value: "Inmediatamente", label: "Inmediatamente" },
        { value: "1-3 meses", label: "1-3 meses" },
        { value: "3-6 meses", label: "3-6 meses" },
        { value: "6+ meses", label: "6+ meses" },
      ],
      messageLabel: "¿Cómo puede ayudarte Verdant Realty?",
      messagePlaceholder:
        "Cuéntanos un poco sobre tu mudanza, tus objetivos o la propiedad que tienes en mente.",
      sendButton: "Enviar consulta",
      sendingButton: "Enviando...",
      errorFallback: "Algo salió mal. Vuelve a intentarlo.",
      successFallback: "Consulta enviada correctamente.",
    },
  },
  ru: {
    brandTag: "Бутик-сопровождение в недвижимости",
    languageSwitcherLabel: "Выберите язык",
    nav: {
      ariaLabel: "Основная навигация",
      services: "Услуги",
      approach: "Подход",
      contact: "Контакты",
    },
    hero: {
      eyebrow: "Для клиентов, которым важны уверенное сопровождение и высокий уровень подачи",
      title: "Недвижимость с опорой на вкус, спокойствие и личный подход.",
      text:
        "Verdant Realty сочетает спокойную стратегию и сервис concierge, помогая покупателям и продавцам двигаться вперед уверенно и без лишнего стресса.",
      primaryCta: "Записаться на консультацию",
      secondaryCta: "Посмотреть услуги",
      statsAriaLabel: "Ключевые преимущества бренда",
      stats: [
        { value: "1:1", label: "личное сопровождение" },
        { value: "Точно", label: "выстроенная стратегия" },
        { value: "Элегантно", label: "презентация объекта" },
      ],
    },
    heroCard: {
      kicker: "Фирменный Подход",
      title: "Теплый и изысканный бренд для важных жизненных перемен.",
      text:
        "Этот сайт создан для агента, который строит работу на доверии и хочет, чтобы каждая точка контакта ощущалась продуманной, надежной и более утонченной, чем обычный шаблон.",
      highlights: [
        "Бутик-сервис с высоким уровнем доверия и внимания",
        "Элегантная маркетинговая подача и визуальная презентация",
        "Взвешенные советы, которые дают ясность и уверенность",
        "Теплое сопровождение от первого просмотра до сделки",
      ],
    },
    servicesSection: {
      eyebrow: "Ключевые Услуги",
      title: "Поддержка, которая учитывает конкретную ситуацию клиента.",
      text:
        "Опыт выстроен так, чтобы быть и внимательным, и практичным, а стратегия адаптируется под человека, а не заставляет его подстраиваться под шаблонный процесс.",
      items: [
        {
          title: "Сопровождение продавцов",
          copy:
            "Подготовка объекта, ясность в цене, сильный маркетинг и активные переговоры для листингов, которым нужен бережный подход.",
        },
        {
          title: "Сопровождение покупателей",
          copy:
            "Спокойный и продуманный поиск с глубоким знанием района, четкой коммуникацией и уверенной стратегией предложения.",
        },
        {
          title: "Поддержка при переезде",
          copy:
            "Ориентация по районам, проверенные контакты специалистов и понятный план для клиентов, выходящих на новый рынок.",
        },
      ],
    },
    approachSection: {
      eyebrow: "Подход Verdant",
      title: "Продуманный процесс. Понятная коммуникация. Красивая реализация.",
      text:
        "Теперь главная страница поддерживает несколько языков для международной аудитории, а структура проекта по-прежнему готова к будущим заявкам, отзывам и контенту районов через Supabase.",
      items: [
        {
          step: "01",
          title: "Сначала слушаем",
          copy:
            "Каждый переезд начинается с истории, которая за ним стоит, чтобы стратегия соответствовала и жизненному этапу, и состоянию рынка.",
        },
        {
          step: "02",
          title: "Формируем план",
          copy:
            "От цены до подачи и сроков: каждая деталь выстраивается так, чтобы все ощущалось элегантно, реалистично и надежно.",
        },
        {
          step: "03",
          title: "Ведем с заботой",
          copy:
            "Клиенты получают внимательную коммуникацию, сильную защиту интересов и спокойный процесс от старта до закрытия сделки.",
        },
      ],
    },
    neighborhoodsSection: {
      eyebrow: "История Района",
      title: "Здесь продается не только метраж, но и образ жизни.",
      text:
        "Язык бренда опирается на атмосферу, фактуру и ощущение места, поэтому сайт запоминается еще до того, как вы добавите реальные объекты или проданные сделки.",
      items: [
        {
          title: "Садовый квартал с характером",
          copy:
            "Зеленые улицы, дома с историей и классическая привлекательность для клиентов, которым важны тепло и вневременные детали.",
        },
        {
          title: "Утонченная городская жизнь",
          copy:
            "Хорошо продуманные квартиры и удобные городские дома рядом с ресторанами, культурой и более пешим ритмом жизни.",
        },
        {
          title: "Семейные тихие районы",
          copy:
            "Спокойные улицы, большие участки и удобные планировки для покупателей, которым нужны и простор, и комфорт на каждый день.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Начнем Разговор",
      title: "Превратим интерес в реальный поток обращений.",
      text:
        "Форма работает на всех четырех языках и отправляет данные в маршрут Next.js, который готов записывать лиды в Supabase после подключения ключей проекта.",
      details: [
        {
          label: "Доступность",
          value: "Частные консультации по предварительной записи",
        },
        {
          label: "Подходит для",
          value: "Покупателей, продавцов и клиентов при переезде",
        },
      ],
    },
    form: {
      fullNameLabel: "Полное имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Электронная почта",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Телефон",
      optionalPhonePlaceholder: "Необязательно",
      timelineLabel: "Срок",
      timelinePlaceholder: "Выберите срок",
      timelineOptions: [
        { value: "Сразу", label: "Сразу" },
        { value: "1-3 месяца", label: "1-3 месяца" },
        { value: "3-6 месяцев", label: "3-6 месяцев" },
        { value: "6+ месяцев", label: "6+ месяцев" },
      ],
      messageLabel: "Чем Verdant Realty может помочь?",
      messagePlaceholder:
        "Расскажите немного о вашем переезде, целях или объекте, который вас интересует.",
      sendButton: "Отправить запрос",
      sendingButton: "Отправка...",
      errorFallback: "Что-то пошло не так. Попробуйте еще раз.",
      successFallback: "Запрос успешно отправлен.",
    },
  },
  de: {
    brandTag: "Boutique-Immobilienberatung",
    languageSwitcherLabel: "Sprache wählen",
    nav: {
      ariaLabel: "Hauptnavigation",
      services: "Leistungen",
      approach: "Ansatz",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Für Kundinnen und Kunden, die klare Begleitung und eine hochwertige Präsentation schätzen",
      title: "Immobilien mit Ruhe, Stil und einem sehr persönlichen Ansatz.",
      text:
        "Verdant Realty verbindet ruhige Strategie mit concierge-artigem Service und begleitet Käuferinnen, Käufer sowie Verkäufer mit Klarheit und Sicherheit.",
      primaryCta: "Beratung vereinbaren",
      secondaryCta: "Leistungen ansehen",
      statsAriaLabel: "Marken-Highlights",
      stats: [
        { value: "1:1", label: "persönliche Betreuung" },
        { value: "Individuell", label: "Marktstrategie" },
        { value: "Elegant", label: "Objektpräsentation" },
      ],
    },
    heroCard: {
      kicker: "Besondere Erfahrung",
      title: "Eine warme und stilvolle Marke für bedeutsame Veränderungen.",
      text:
        "Die Seite ist für eine beziehungsorientierte Maklerin gedacht, die jeden Kontakt bewusst, vertrauenswürdig und spürbar hochwertiger als eine Standardvorlage gestalten möchte.",
      highlights: [
        "Boutique-Betreuung mit hochwertigem und vertrauensvollem Service",
        "Elegante Vermarktung und starke Präsentation der Immobilie",
        "Besonnene Beratung für klare und sichere Entscheidungen",
        "Herzliche Begleitung vom ersten Termin bis zum Abschluss",
      ],
    },
    servicesSection: {
      eyebrow: "Ausgewählte Leistungen",
      title: "Unterstützung, die Menschen dort abholt, wo sie stehen.",
      text:
        "Das Erlebnis ist aufmerksam und praktisch gestaltet, mit einer Strategie, die sich an den Menschen anpasst statt sie in einen starren Ablauf zu pressen.",
      items: [
        {
          title: "Verkäufervertretung",
          copy:
            "Vorbereitung, klare Preisstrategie, hochwertige Vermarktung und aktive Verhandlung für Immobilien, die besondere Aufmerksamkeit verdienen.",
        },
        {
          title: "Käuferbegleitung",
          copy:
            "Eine ruhige, kuratierte Suche mit lokalem Wissen, verlässlicher Kommunikation und einer sicheren Angebotsstrategie.",
        },
        {
          title: "Relocation-Begleitung",
          copy:
            "Orientierung in den Stadtteilen, Empfehlungen zu verlässlichen Partnern und ein klarer Plan für Kundschaft in einem neuen Markt.",
        },
      ],
    },
    approachSection: {
      eyebrow: "Der Verdant-Ansatz",
      title: "Durchdachter Prozess. Klare Kommunikation. Schöne Umsetzung.",
      text:
        "Die Startseite unterstützt jetzt mehrere Sprachen für internationale Kundschaft, während die Projektstruktur weiterhin für künftige Anfragen, Referenzen oder Stadtteilinhalte mit Supabase vorbereitet ist.",
      items: [
        {
          step: "01",
          title: "Zuerst zuhören",
          copy:
            "Jeder Umzug beginnt mit der Geschichte dahinter, damit die Strategie sowohl zur Lebensphase als auch zum Markt passt.",
        },
        {
          step: "02",
          title: "Den Plan formen",
          copy:
            "Von Preis und Präsentation bis zu Zeitabläufen wird jedes Detail so angelegt, dass es elegant, realistisch und gut begleitet wirkt.",
        },
        {
          step: "03",
          title: "Mit Sorgfalt führen",
          copy:
            "Kundinnen und Kunden erhalten aufmerksame Kommunikation, klare Interessenvertretung und einen ruhigen Ablauf vom Start bis zum Abschluss.",
        },
      ],
    },
    neighborhoodsSection: {
      eyebrow: "Stadtteil-Geschichten",
      title: "Hier wird nicht nur Fläche vermarktet, sondern Lebensgefühl.",
      text:
        "Die Markensprache setzt auf Atmosphäre, Textur und Ort, damit die Seite schon vor echten Objekten oder Referenzen im Gedächtnis bleibt.",
      items: [
        {
          title: "Charmantes Gartenviertel",
          copy:
            "Baumgesäumte Straßen, charaktervolle Häuser und klassische Ausstrahlung für Menschen, die Wärme und zeitlose Details suchen.",
        },
        {
          title: "Stilvolles urbanes Wohnen",
          copy:
            "Gut gestaltete Wohnungen und unkomplizierte Stadthäuser nahe Gastronomie, Kultur und einem fußläufigeren Alltag.",
        },
        {
          title: "Rückzugsorte für Familien",
          copy:
            "Ruhige Straßen, größere Grundstücke und praktische Grundrisse für Käuferinnen und Käufer, die Raum und Alltagstauglichkeit möchten.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Gespräch Beginnen",
      title: "Machen wir aus Interesse einen echten Anfragefluss.",
      text:
        "Das Formular funktioniert in allen vier Sprachen und sendet an eine Next.js-Route, die Leads in Supabase speichern kann, sobald die Projektschlüssel hinterlegt sind.",
      details: [
        {
          label: "Verfügbarkeit",
          value: "Private Beratung nach Terminvereinbarung",
        },
        {
          label: "Passend für",
          value: "Käufer, Verkäufer und Relocation-Kundschaft",
        },
      ],
    },
    form: {
      fullNameLabel: "Vollständiger Name",
      namePlaceholder: "Ihr Name",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Telefonnummer",
      optionalPhonePlaceholder: "Optional",
      timelineLabel: "Zeitrahmen",
      timelinePlaceholder: "Zeitrahmen auswählen",
      timelineOptions: [
        { value: "Sofort", label: "Sofort" },
        { value: "1-3 Monate", label: "1-3 Monate" },
        { value: "3-6 Monate", label: "3-6 Monate" },
        { value: "6+ Monate", label: "6+ Monate" },
      ],
      messageLabel: "Wie kann Verdant Realty helfen?",
      messagePlaceholder:
        "Erzählen Sie uns etwas über Ihren Umzug, Ihre Ziele oder die Immobilie, die Sie im Blick haben.",
      sendButton: "Anfrage senden",
      sendingButton: "Wird gesendet...",
      errorFallback: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      successFallback: "Anfrage erfolgreich gesendet.",
    },
  },
};

export function isSupportedLocale(value: string): value is Locale {
  return localeOptions.some((option) => option.code === value);
}

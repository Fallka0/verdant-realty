export const publicLocales = ["en", "es", "ru", "de"] as const;

export type PublicLocale = (typeof publicLocales)[number];

export function isPublicLocale(value: string): value is PublicLocale {
  return publicLocales.includes(value as PublicLocale);
}

export function resolvePublicLocale(value?: string | null): PublicLocale {
  if (value && isPublicLocale(value)) {
    return value;
  }

  return "en";
}

export type PublicCopy = {
  brandSubtitle: string;
  buttons: {
    browseProperties: string;
    callNow: string;
    openListings: string;
    seeAllProperties: string;
    sendInquiry: string;
    sending: string;
    viewDetails: string;
    viewListing: string;
    whatsapp: string;
  };
  carousel: {
    closeZoom: string;
    enlargeImage: string;
    galleryHint: string;
    thumbnailsLabel: string;
    nextImage: string;
    previousImage: string;
    showImage: string;
    zoomHint: string;
  };
  contact: {
    availabilityLabel: string;
    availabilityValue: string;
    eyebrow: string;
    panelSummary: string;
    panelTitle: string;
    phoneLabel: string;
    summary: string;
    title: string;
    whatsappMessage: string;
  };
  coverage: {
    eyebrow: string;
    summary: string;
    title: string;
  };
  detail: {
    bathrooms: string;
    bedrooms: string;
    interior: string;
    listingOverview: string;
    plot: string;
    requestInfo: string;
    requestTitle: string;
    type: string;
    whyPause: string;
  };
  filters: {
    availableInventory: string;
    emptyBody: string;
    emptyTitle: string;
    heading: string;
    minimumBedrooms: string;
    propertyType: string;
    region: string;
    results: string;
    search: string;
    searchPlaceholder: string;
    sort: string;
    title: string;
    types: {
      all: string;
      any: string;
    };
    sortOptions: {
      latest: string;
      priceAsc: string;
      priceDesc: string;
    };
  };
  hero: {
    eyebrow: string;
    text: string;
    title: string;
  };
  inquiry: {
    email: string;
    emailPlaceholder: string;
    error: string;
    fullName: string;
    message: string;
    messagePlaceholder: string;
    optional: string;
    phone: string;
    propertyInquiry: string;
    rateLimited: string;
    sendingAria: string;
    success: string;
    yourName: string;
  };
  languageLabel: string;
  masonry: {
    eyebrow: string;
    title: string;
  };
  footer: {
    blurb: string;
    browseLabel: string;
    copyright: string;
  };
  neighborhoods: {
    cards: Array<{
      area: string;
      summary: string;
      title: string;
    }>;
    eyebrow: string;
    title: string;
  };
  nav: {
    home: string;
    properties: string;
  };
  overview: {
    body: string;
    eyebrow: string;
    items: Array<{
      copy: string;
      title: string;
    }>;
    title: string;
  };
  propertiesPage: {
    eyebrow: string;
    text: string;
    title: string;
  };
  seo: {
    description: string;
    ogDescription: string;
    ogTitle: string;
    title: string;
  };
  propertyMeta: {
    bathroomsShort: string;
    bedroomsShort: string;
    featuredSnapshot: string;
    homesOnline: string;
    homesSelected: string;
    homesSelectedLabel: string;
    updatedListings: string;
  };
  testimonials: {
    eyebrow: string;
    items: Array<{
      name: string;
      quote: string;
      role: string;
    }>;
    summary: string;
    title: string;
  };
};

export const areaNames = [
  "Torrevieja",
  "La Mata",
  "Orihuela Costa",
  "Guardamar del Segura",
] as const;

export const neighborhoodImages: Record<(typeof areaNames)[number], string> = {
  Torrevieja:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "La Mata":
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "Orihuela Costa":
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "Guardamar del Segura":
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
};

export const publicCopy: Record<PublicLocale, PublicCopy> = {
  en: {
    brandSubtitle: "Homes Along The Costa Blanca",
    buttons: {
      browseProperties: "Browse Properties",
      callNow: "Call Now",
      openListings: "Open Full Listings",
      seeAllProperties: "See All Properties",
      sendInquiry: "Send Inquiry",
      sending: "Sending...",
      viewDetails: "View Details",
      viewListing: "View Listing",
      whatsapp: "WhatsApp",
    },
    carousel: {
      closeZoom: "Close zoom view",
      enlargeImage: "Open enlarged image",
      galleryHint: "Swipe, use the arrows, or choose a thumbnail.",
      thumbnailsLabel: "Property gallery thumbnails",
      nextImage: "Show next image",
      previousImage: "Show previous image",
      showImage: "Show image",
      zoomHint: "Use the side arrows or your keyboard to move through the gallery.",
    },
    contact: {
      availabilityLabel: "Best for",
      availabilityValue: "Calls and WhatsApp",
      eyebrow: "Direct Contact",
      panelSummary: "If a home already feels right, a quick call or WhatsApp message is often the fastest next step.",
      panelTitle: "Prefer to speak directly instead of filling out forms?",
      phoneLabel: "Phone",
      summary: "When a property stands out, a direct conversation can answer the practical questions much faster.",
      title: "Reach your agent quickly when a listing feels worth pursuing.",
      whatsappMessage: "Hello, I am interested in a property from Verdant Realty and would like more information.",
    },
    coverage: {
      eyebrow: "A More Personal Search",
      summary:
        "Buying near the coast often means balancing lifestyle, location, and long-term confidence. Verdant Realty helps buyers move through that decision with more calm and more clarity.",
      title: "A thoughtful property search should feel personal from the very beginning.",
    },
    detail: {
      bathrooms: "Bathrooms",
      bedrooms: "Bedrooms",
      interior: "Interior",
      listingOverview: "Listing Overview",
      plot: "Plot",
      requestInfo: "Request More Information",
      requestTitle: "Schedule a viewing or ask for more detail.",
      type: "Type",
      whyPause: "Why buyers will pause on this one.",
    },
    filters: {
      availableInventory: "Available Inventory",
      emptyBody: "Try broadening the search or lowering the bedroom minimum.",
      emptyTitle: "No properties match those filters yet.",
      heading: "Property Search",
      minimumBedrooms: "Minimum Bedrooms",
      propertyType: "Property Type",
      region: "Region",
      results: "properties currently match.",
      search: "Search",
      searchPlaceholder: "Title or keyword",
      sort: "Sort",
      title: "Find the right listing faster.",
      types: {
        all: "All types",
        any: "Any",
      },
      sortOptions: {
        latest: "Latest",
        priceAsc: "Price: low to high",
        priceDesc: "Price: high to low",
      },
    },
    hero: {
      eyebrow: "Homes for sale in Torrevieja and nearby coastal areas",
      text:
        "Verdant Realty takes a more personal approach to buying on the Costa Blanca: clear guidance, carefully chosen listings, and direct support when a property feels right.",
      title: "Finding the right home should feel guided, calm, and genuinely personal.",
    },
    inquiry: {
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      error: "Something went wrong. Please try again.",
      fullName: "Full Name",
      message: "Message",
      messagePlaceholder: "Tell us what kind of property you are looking for.",
      optional: "Optional",
      phone: "Phone Number",
      propertyInquiry: "Property Inquiry",
      rateLimited: "Too many inquiries were sent just now. Please wait a few minutes and try again.",
      sendingAria: "Sending your property inquiry",
      success: "Inquiry sent successfully.",
      yourName: "Your name",
    },
    languageLabel: "Choose language",
    masonry: {
      eyebrow: "Explore Available Homes",
      title: "Browse the current collection and open the listings that feel most relevant to you.",
    },
    footer: {
      blurb: "Verdant Realty offers a more personal way to explore homes in Torrevieja and the surrounding coast.",
      browseLabel: "Browse Listings",
      copyright: "© Verdant Realty",
    },
    neighborhoods: {
      cards: [
        {
          area: "Torrevieja",
          title: "Year-round life by the marina",
          summary: "A broad mix of apartments, villas, and walkable neighborhoods close to the water.",
        },
        {
          area: "La Mata",
          title: "Beachfront calm with open light",
          summary: "Known for sea views, long beach walks, and homes that feel a little more relaxed.",
        },
        {
          area: "Orihuela Costa",
          title: "Resort energy with strong inventory",
          summary: "Popular with international buyers looking for polished developments and coastal access.",
        },
        {
          area: "Guardamar del Segura",
          title: "Green edges and softer pace",
          summary: "A quieter coastal rhythm with dunes, parks, and homes that feel tucked away.",
        },
      ],
      eyebrow: "Neighborhoods",
      title: "Different corners of the coast, each with its own mood.",
    },
    nav: {
      home: "Home",
      properties: "Properties",
    },
    overview: {
      body:
        "Buyers are supported with honest guidance, a calmer pace, and listings presented in a way that makes comparison feel easier.",
      eyebrow: "What Clients Value",
      items: [
        {
          title: "A more personal approach",
          copy: "Conversations stay focused on what actually matters to the buyer, not just on pushing the next viewing.",
        },
        {
          title: "Clear guidance without pressure",
          copy: "Homes, locations, and differences between areas are explained with more calm and less noise.",
        },
        {
          title: "Care through every step",
          copy: "From the first shortlist to the first call, the experience is designed to feel attentive and reassuring.",
        },
      ],
      title: "The right property search feels clearer when there is trust behind it.",
    },
    propertiesPage: {
      eyebrow: "Property Listings",
      text: "Browse current inventory, refine the search, and open any listing for more detail.",
      title: "Available homes in Torrevieja and the surrounding coast.",
    },
    seo: {
      description: "Browse homes for sale in Torrevieja, La Mata, Orihuela Costa, and nearby coastal areas with Verdant Realty.",
      ogDescription: "Discover refined property listings across Torrevieja and the surrounding coast.",
      ogTitle: "Verdant Realty | Coastal Homes in Torrevieja",
      title: "Verdant Realty | Homes For Sale In Torrevieja",
    },
    propertyMeta: {
      bathroomsShort: "bath",
      bedroomsShort: "bed",
      featuredSnapshot: "Featured Snapshot",
      homesOnline: "sample listings ready",
      homesSelected: "featured slots on the homepage",
      homesSelectedLabel: "core target areas nearby",
      updatedListings: "updated listings",
    },
    testimonials: {
      eyebrow: "Client Impressions",
      items: [
        {
          name: "Private buyer",
          quote: "From the beginning, the search felt focused and reassuring. We could quickly tell which homes deserved real attention.",
          role: "Relocating from Northern Europe",
        },
        {
          name: "Second-home couple",
          quote: "The listings made the differences between locations much easier to understand, so our decision came together faster.",
          role: "Buying near the coast",
        },
        {
          name: "Family purchaser",
          quote: "It felt more thoughtful than a generic portal. By the time we reached out, we already felt confident in the shortlist.",
          role: "Looking for a year-round home",
        },
      ],
      summary: "The difference shows up in the tone, the pacing, and how clearly each listing is presented before the first conversation.",
      title: "A well-guided property search leaves buyers feeling informed rather than overwhelmed.",
    },
  },
  es: {
    brandSubtitle: "Viviendas En La Costa Blanca",
    buttons: {
      browseProperties: "Ver propiedades",
      callNow: "Llamar ahora",
      openListings: "Abrir propiedades",
      seeAllProperties: "Ver todas",
      sendInquiry: "Enviar consulta",
      sending: "Enviando...",
      viewDetails: "Ver detalles",
      viewListing: "Ver propiedad",
      whatsapp: "WhatsApp",
    },
    carousel: {
      closeZoom: "Cerrar vista ampliada",
      enlargeImage: "Abrir imagen ampliada",
      galleryHint: "Desliza, usa las flechas o elige una miniatura.",
      thumbnailsLabel: "Miniaturas de la galería",
      nextImage: "Mostrar la siguiente imagen",
      previousImage: "Mostrar la imagen anterior",
      showImage: "Mostrar imagen",
      zoomHint: "Usa las flechas laterales o el teclado para moverte por la galería.",
    },
    contact: {
      availabilityLabel: "Ideal para",
      availabilityValue: "Llamadas y WhatsApp",
      eyebrow: "Contacto directo",
      panelSummary: "Si ya te interesa una vivienda, una llamada o un mensaje suele ser la forma más rápida de avanzar.",
      panelTitle: "¿Prefieres hablar directamente en vez de completar formularios?",
      phoneLabel: "Teléfono",
      summary: "Cuando una propiedad encaja de verdad, una conversación directa ayuda a resolver dudas con más rapidez.",
      title: "Habla con tu agente enseguida cuando una propiedad merezca seguir adelante.",
      whatsappMessage: "Hola, me interesa una propiedad de Verdant Realty y me gustaría recibir más información.",
    },
    coverage: {
      eyebrow: "Una búsqueda más personal",
      summary:
        "Comprar en la costa implica comparar estilo de vida, zona y tranquilidad para el futuro. Verdant Realty acompaña ese proceso con más calma y más claridad.",
      title: "La búsqueda de una vivienda debería sentirse personal desde el primer momento.",
    },
    detail: {
      bathrooms: "Baños",
      bedrooms: "Dormitorios",
      interior: "Interior",
      listingOverview: "Resumen de la propiedad",
      plot: "Parcela",
      requestInfo: "Solicitar más información",
      requestTitle: "Solicita una visita o pide más detalles.",
      type: "Tipo",
      whyPause: "Por qué esta vivienda llama la atención.",
    },
    filters: {
      availableInventory: "Propiedades disponibles",
      emptyBody: "Prueba ampliar la búsqueda o bajar el mínimo de dormitorios.",
      emptyTitle: "No hay propiedades con esos filtros.",
      heading: "Búsqueda de propiedades",
      minimumBedrooms: "Dormitorios mínimos",
      propertyType: "Tipo de propiedad",
      region: "Zona",
      results: "propiedades coinciden.",
      search: "Buscar",
      searchPlaceholder: "Título o palabra clave",
      sort: "Ordenar",
      title: "Encuentra la propiedad adecuada más rápido.",
      types: {
        all: "Todos los tipos",
        any: "Cualquiera",
      },
      sortOptions: {
        latest: "Más recientes",
        priceAsc: "Precio: menor a mayor",
        priceDesc: "Precio: mayor a menor",
      },
    },
    hero: {
      eyebrow: "Viviendas en venta en Torrevieja y la costa cercana",
      text:
        "Verdant Realty apuesta por una forma más personal de comprar en la Costa Blanca: orientación clara, selección cuidada y acompañamiento directo cuando una propiedad encaja.",
      title: "Encontrar la vivienda adecuada debería sentirse guiado, sereno y realmente cercano.",
    },
    inquiry: {
      email: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      error: "Algo salió mal. Inténtalo de nuevo.",
      fullName: "Nombre completo",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos qué tipo de propiedad estás buscando.",
      optional: "Opcional",
      phone: "Teléfono",
      propertyInquiry: "Consulta sobre la propiedad",
      rateLimited: "Se han enviado demasiadas consultas en este momento. Espera unos minutos y vuelve a intentarlo.",
      sendingAria: "Enviando tu consulta sobre la propiedad",
      success: "Consulta enviada correctamente.",
      yourName: "Tu nombre",
    },
    languageLabel: "Elegir idioma",
    masonry: {
      eyebrow: "Explora viviendas disponibles",
      title: "Recorre la selección actual y abre las propiedades que más sentido tengan para ti.",
    },
    footer: {
      blurb: "Verdant Realty ofrece una manera más personal de explorar viviendas en Torrevieja y la costa cercana.",
      browseLabel: "Ver propiedades",
      copyright: "© Verdant Realty",
    },
    neighborhoods: {
      cards: [
        {
          area: "Torrevieja",
          title: "Vida activa junto al puerto",
          summary: "Una mezcla amplia de apartamentos, villas y zonas caminables cerca del mar.",
        },
        {
          area: "La Mata",
          title: "Calma frente al mar y mucha luz",
          summary: "Conocida por sus vistas, sus paseos junto a la playa y un ritmo más sereno.",
        },
        {
          area: "Orihuela Costa",
          title: "Ambiente residencial con oferta sólida",
          summary: "Muy buscada por compradores internacionales que quieren costa y urbanizaciones cuidadas.",
        },
        {
          area: "Guardamar del Segura",
          title: "Entorno verde y ritmo más suave",
          summary: "Una zona costera más tranquila, con dunas, parques y viviendas más resguardadas.",
        },
      ],
      eyebrow: "Zonas destacadas",
      title: "Distintas partes de la costa, cada una con una forma de vivir diferente.",
    },
    nav: {
      home: "Inicio",
      properties: "Propiedades",
    },
    overview: {
      body:
        "El comprador recibe orientación honesta, un ritmo más calmado y una selección presentada de forma que comparar opciones resulte mucho más fácil.",
      eyebrow: "Lo que valoran los clientes",
      items: [
        {
          title: "Un trato más personal",
          copy: "Las conversaciones se centran en lo que de verdad importa al comprador, no en empujar la siguiente visita.",
        },
        {
          title: "Orientación clara y sin presión",
          copy: "Las viviendas, las zonas y sus diferencias se explican con más calma y menos ruido.",
        },
        {
          title: "Acompañamiento en cada paso",
          copy: "Desde la primera selección hasta la primera llamada, todo está pensado para transmitir confianza.",
        },
      ],
      title: "La búsqueda se vuelve más clara cuando detrás hay confianza y criterio.",
    },
    propertiesPage: {
      eyebrow: "Listado de propiedades",
      text: "Explora el inventario actual, ajusta la búsqueda y abre cualquier propiedad para más detalle.",
      title: "Viviendas disponibles en Torrevieja y la costa cercana.",
    },
    seo: {
      description: "Descubre propiedades en venta en Torrevieja, La Mata, Orihuela Costa y otras zonas cercanas con Verdant Realty.",
      ogDescription: "Explora una selección cuidada de viviendas en Torrevieja y la costa cercana.",
      ogTitle: "Verdant Realty | Viviendas en Torrevieja",
      title: "Verdant Realty | Viviendas En Venta En Torrevieja",
    },
    propertyMeta: {
      bathroomsShort: "baño",
      bedroomsShort: "hab",
      featuredSnapshot: "Propiedad destacada",
      homesOnline: "propiedades listas para mostrar",
      homesSelected: "espacios destacados en la portada",
      homesSelectedLabel: "zonas clave cercanas",
      updatedListings: "listados actualizados",
    },
    testimonials: {
      eyebrow: "Experiencias",
      items: [
        {
          name: "Compradora internacional",
          quote: "La búsqueda se sintió ordenada y tranquila desde el principio. Era fácil ver qué viviendas merecían de verdad una visita.",
          role: "Mudanza a la costa",
        },
        {
          name: "Pareja compradora",
          quote: "Nos ayudó mucho poder entender mejor cada zona y no solo mirar viviendas sueltas. Todo estaba presentado con criterio.",
          role: "Segunda residencia",
        },
        {
          name: "Familia compradora",
          quote: "Transmitía más cercanía que un portal genérico. Antes de escribir ya sentíamos que entendíamos mejor el mercado.",
          role: "Compra para todo el año",
        },
      ],
      summary: "La diferencia se nota en el tono, en la claridad de cada anuncio y en la forma en que el proceso acompaña al comprador.",
      title: "Cuando la búsqueda está bien guiada, el comprador avanza con más calma y confianza.",
    },
  },
  ru: {
    brandSubtitle: "Недвижимость на Коста-Бланке",
    buttons: {
      browseProperties: "Смотреть объекты",
      callNow: "Позвонить",
      openListings: "Все объекты",
      seeAllProperties: "Все объекты",
      sendInquiry: "Отправить запрос",
      sending: "Отправка...",
      viewDetails: "Подробнее",
      viewListing: "Смотреть объект",
      whatsapp: "WhatsApp",
    },
    carousel: {
      closeZoom: "Закрыть увеличенное изображение",
      enlargeImage: "Открыть увеличенное изображение",
      galleryHint: "Листайте, используйте стрелки или выбирайте миниатюры.",
      thumbnailsLabel: "Миниатюры галереи",
      nextImage: "Показать следующее изображение",
      previousImage: "Показать предыдущее изображение",
      showImage: "Показать изображение",
      zoomHint: "Используйте боковые стрелки или клавиатуру для просмотра галереи.",
    },
    contact: {
      availabilityLabel: "Удобно для",
      availabilityValue: "Звонков и WhatsApp",
      eyebrow: "Прямой контакт",
      panelSummary: "Если объект уже заинтересовал, звонок или сообщение в WhatsApp обычно помогают быстрее перейти к следующему шагу.",
      panelTitle: "Удобнее обсудить детали напрямую?",
      phoneLabel: "Телефон",
      summary: "Когда объект действительно подходит, короткий разговор часто снимает практические вопросы быстрее, чем переписка.",
      title: "Свяжитесь с агентом сразу, когда объект кажется действительно подходящим.",
      whatsappMessage: "Здравствуйте, меня заинтересовал объект на Verdant Realty. Хотелось бы получить больше информации.",
    },
    coverage: {
      eyebrow: "Более личный поиск",
      summary:
        "Покупка жилья у моря почти всегда связана не только с объектом, но и с образом жизни, районом и ощущением уверенности в решении. Verdant Realty помогает пройти этот путь спокойнее и яснее.",
      title: "Поиск недвижимости должен ощущаться личным и внимательным с самого начала.",
    },
    detail: {
      bathrooms: "Ванные",
      bedrooms: "Спальни",
      interior: "Площадь",
      listingOverview: "Обзор объекта",
      plot: "Участок",
      requestInfo: "Запросить информацию",
      requestTitle: "Запросите просмотр или дополнительную информацию.",
      type: "Тип",
      whyPause: "Почему этот объект привлекает внимание.",
    },
    filters: {
      availableInventory: "Доступные объекты",
      emptyBody: "Попробуйте расширить поиск или уменьшить минимум по спальням.",
      emptyTitle: "По этим фильтрам пока ничего не найдено.",
      heading: "Поиск недвижимости",
      minimumBedrooms: "Минимум спален",
      propertyType: "Тип недвижимости",
      region: "Район",
      results: "объектов найдено.",
      search: "Поиск",
      searchPlaceholder: "Название или ключевое слово",
      sort: "Сортировка",
      title: "Найдите нужный объект быстрее.",
      types: {
        all: "Все типы",
        any: "Любой",
      },
      sortOptions: {
        latest: "Сначала новые",
        priceAsc: "Цена: по возрастанию",
        priceDesc: "Цена: по убыванию",
      },
    },
    hero: {
      eyebrow: "Объекты на продажу в Торревьехе и рядом с побережьем",
      text:
        "Verdant Realty предлагает более личный подход к покупке на Коста-Бланке: понятное сопровождение, тщательно подобранные объекты и прямую связь, когда вариант действительно подходит.",
      title: "Поиск дома должен ощущаться спокойным, понятным и по-настоящему личным.",
    },
    inquiry: {
      email: "Электронная почта",
      emailPlaceholder: "you@example.com",
      error: "Что-то пошло не так. Попробуйте еще раз.",
      fullName: "Полное имя",
      message: "Сообщение",
      messagePlaceholder: "Расскажите, какую недвижимость вы ищете.",
      optional: "Необязательно",
      phone: "Телефон",
      propertyInquiry: "Запрос по объекту",
      rateLimited: "Слишком много запросов за короткое время. Подождите несколько минут и попробуйте снова.",
      sendingAria: "Отправка запроса по объекту",
      success: "Запрос успешно отправлен.",
      yourName: "Ваше имя",
    },
    languageLabel: "Выберите язык",
    masonry: {
      eyebrow: "Смотреть доступные объекты",
      title: "Изучайте актуальные предложения и открывайте те объекты, которые действительно подходят именно вам.",
    },
    footer: {
      blurb: "Verdant Realty помогает искать жилье в Торревьехе и на побережье рядом более спокойно, лично и внимательно.",
      browseLabel: "Смотреть объекты",
      copyright: "© Verdant Realty",
    },
    neighborhoods: {
      cards: [
        {
          area: "Torrevieja",
          title: "Городская жизнь у воды",
          summary: "Широкий выбор апартаментов, вилл и районов, где удобно жить круглый год.",
        },
        {
          area: "La Mata",
          title: "Пляжный ритм и больше света",
          summary: "Район с морскими видами, длинной набережной и более спокойной атмосферой.",
        },
        {
          area: "Orihuela Costa",
          title: "Сильный выбор у побережья",
          summary: "Популярная зона среди международных покупателей благодаря курортной инфраструктуре и новому фонду.",
        },
        {
          area: "Guardamar del Segura",
          title: "Более зеленая и тихая сторона",
          summary: "Дюны, парки и более мягкий темп жизни для тех, кто хочет меньше шума.",
        },
      ],
      eyebrow: "Районы",
      title: "У каждого участка побережья свой темп, настроение и тип покупателей.",
    },
    nav: {
      home: "Главная",
      properties: "Объекты",
    },
    overview: {
      body:
        "Покупатели получают честную поддержку, более спокойный ритм поиска и подачу, при которой сравнивать варианты становится проще.",
      eyebrow: "Что ценят клиенты",
      items: [
        {
          title: "Более личный подход",
          copy: "Разговор строится вокруг того, что действительно важно покупателю, а не вокруг давления и спешки.",
        },
        {
          title: "Понятно и без лишнего шума",
          copy: "Разница между объектами и районами объясняется спокойно, ясно и без перегрузки лишними деталями.",
        },
        {
          title: "Внимание на каждом этапе",
          copy: "От первого просмотра до первого звонка поиск выстроен так, чтобы людям было легче доверять своему выбору.",
        },
      ],
      title: "Когда за поиском стоит доверие, принимать решение становится легче.",
    },
    propertiesPage: {
      eyebrow: "Каталог недвижимости",
      text: "Просматривайте текущие объекты, используйте фильтры и открывайте подробные карточки.",
      title: "Доступные объекты в Торревьехе и на побережье рядом.",
    },
    seo: {
      description: "Смотрите объекты в Торревьехе, Ла Мата, Ориуэла Коста и соседних прибрежных районах вместе с Verdant Realty.",
      ogDescription: "Подборка домов и квартир у побережья Торревьехи с более ясной и спокойной подачей.",
      ogTitle: "Verdant Realty | Недвижимость в Торревьехе",
      title: "Verdant Realty | Недвижимость На Побережье Торревьехи",
    },
    propertyMeta: {
      bathroomsShort: "ван.",
      bedroomsShort: "спал.",
      featuredSnapshot: "Выбранный объект",
      homesOnline: "объектов в каталоге",
      homesSelected: "объектов на главной",
      homesSelectedLabel: "ключевых районов рядом",
      updatedListings: "актуальные объекты",
    },
    testimonials: {
      eyebrow: "Впечатления клиентов",
      items: [
        {
          name: "Частный покупатель",
          quote: "С самого начала поиск ощущался спокойным и понятным. Сразу было видно, какие объекты действительно заслуживают внимания.",
          role: "Переезд к морю",
        },
        {
          name: "Пара покупателей",
          quote: "Нам очень помогло, что сайт показывал не только сами дома, но и разницу между районами. Решение принимать стало легче.",
          role: "Покупка второй резиденции",
        },
        {
          name: "Семья покупателя",
          quote: "Подача выглядела более человечной, чем на обычных порталах. Это сразу вызвало доверие.",
          role: "Покупка для постоянного проживания",
        },
      ],
      summary: "Когда поиск выглядит более спокойным и личным, людям легче перейти от просмотра к реальному контакту.",
      title: "Хороший опыт поиска запоминается не меньше, чем сами объекты.",
    },
  },
  de: {
    brandSubtitle: "Häuser An Der Costa Blanca",
    buttons: {
      browseProperties: "Immobilien ansehen",
      callNow: "Jetzt anrufen",
      openListings: "Alle Immobilien öffnen",
      seeAllProperties: "Alle ansehen",
      sendInquiry: "Anfrage senden",
      sending: "Wird gesendet...",
      viewDetails: "Details ansehen",
      viewListing: "Objekt ansehen",
      whatsapp: "WhatsApp",
    },
    carousel: {
      closeZoom: "Zoomansicht schließen",
      enlargeImage: "Vergrößertes Bild öffnen",
      galleryHint: "Wischen, Pfeile nutzen oder ein Vorschaubild wählen.",
      thumbnailsLabel: "Vorschaubilder der Galerie",
      nextImage: "Nächstes Bild anzeigen",
      previousImage: "Vorheriges Bild anzeigen",
      showImage: "Bild anzeigen",
      zoomHint: "Mit den seitlichen Pfeilen oder der Tastatur durch die Galerie gehen.",
    },
    contact: {
      availabilityLabel: "Am besten für",
      availabilityValue: "Anrufe und WhatsApp",
      eyebrow: "Direkter Kontakt",
      panelSummary: "Wenn ein Objekt bereits passt, bringt ein kurzer Anruf oder eine WhatsApp-Nachricht oft am schnellsten Klarheit.",
      panelTitle: "Sie möchten lieber direkt sprechen als Formulare ausfüllen?",
      phoneLabel: "Telefon",
      summary: "Wenn eine Immobilie wirklich interessant wirkt, lassen sich praktische Fragen in einem direkten Gespräch meist schneller klären.",
      title: "Sprechen Sie direkt mit Ihrer Ansprechpartnerin, sobald ein Objekt ernsthaft infrage kommt.",
      whatsappMessage: "Hallo, ich interessiere mich für eine Immobilie von Verdant Realty und hätte gern weitere Informationen.",
    },
    coverage: {
      eyebrow: "Eine persönlichere Suche",
      summary:
        "Der Kauf an der Küste ist oft mehr als nur eine Objektentscheidung. Verdant Realty begleitet diesen Weg mit mehr Ruhe, mehr Klarheit und einem persönlicheren Blick auf das, was wirklich passt.",
      title: "Die Suche nach einem Zuhause sollte sich von Anfang an persönlich und gut begleitet anfühlen.",
    },
    detail: {
      bathrooms: "Bäder",
      bedrooms: "Schlafzimmer",
      interior: "Wohnfläche",
      listingOverview: "Objektüberblick",
      plot: "Grundstück",
      requestInfo: "Mehr Informationen anfragen",
      requestTitle: "Fragen Sie einen Besichtigungstermin oder weitere Details an.",
      type: "Typ",
      whyPause: "Warum dieses Objekt im Gedächtnis bleibt.",
    },
    filters: {
      availableInventory: "Verfügbare Immobilien",
      emptyBody: "Versuchen Sie eine breitere Suche oder weniger Schlafzimmer als Minimum.",
      emptyTitle: "Zu diesen Filtern wurden noch keine Immobilien gefunden.",
      heading: "Immobiliensuche",
      minimumBedrooms: "Mindestens Schlafzimmer",
      propertyType: "Objektart",
      region: "Region",
      results: "Immobilien passen aktuell.",
      search: "Suche",
      searchPlaceholder: "Titel oder Stichwort",
      sort: "Sortieren",
      title: "Schneller zur passenden Immobilie.",
      types: {
        all: "Alle Arten",
        any: "Beliebig",
      },
      sortOptions: {
        latest: "Neueste",
        priceAsc: "Preis: aufsteigend",
        priceDesc: "Preis: absteigend",
      },
    },
    hero: {
      eyebrow: "Immobilien zum Verkauf in Torrevieja und an der nahen Küste",
      text:
        "Verdant Realty steht für einen persönlicheren Weg zum Immobilienkauf an der Costa Blanca: klare Begleitung, sorgfältig ausgewählte Angebote und direkte Unterstützung, wenn sich ein Objekt richtig anfühlt.",
      title: "Die Suche nach dem richtigen Zuhause sollte ruhig, klar und wirklich persönlich wirken.",
    },
    inquiry: {
      email: "E-Mail-Adresse",
      emailPlaceholder: "you@example.com",
      error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      fullName: "Vollständiger Name",
      message: "Nachricht",
      messagePlaceholder: "Teilen Sie uns mit, nach welcher Immobilie Sie suchen.",
      optional: "Optional",
      phone: "Telefonnummer",
      propertyInquiry: "Anfrage zur Immobilie",
      rateLimited: "Es wurden gerade zu viele Anfragen gesendet. Bitte warten Sie einige Minuten und versuchen Sie es erneut.",
      sendingAria: "Ihre Immobilienanfrage wird gesendet",
      success: "Anfrage erfolgreich gesendet.",
      yourName: "Ihr Name",
    },
    languageLabel: "Sprache wählen",
    masonry: {
      eyebrow: "Verfügbare Immobilien entdecken",
      title: "Durchstöbern Sie die aktuelle Auswahl und öffnen Sie die Objekte, die für Sie wirklich relevant sind.",
    },
    footer: {
      blurb: "Verdant Realty begleitet die Immobiliensuche in Torrevieja und an der nahen Küste auf eine persönlichere und ruhigere Weise.",
      browseLabel: "Immobilien ansehen",
      copyright: "© Verdant Realty",
    },
    neighborhoods: {
      cards: [
        {
          area: "Torrevieja",
          title: "Ganzjähriges Leben am Wasser",
          summary: "Ein breiter Mix aus Apartments, Villen und gut angebundenen Wohnlagen nahe der Promenade.",
        },
        {
          area: "La Mata",
          title: "Mehr Ruhe direkt am Strand",
          summary: "Bekannt für Meerblick, lange Strandwege und ein etwas entspannteres Wohngefühl.",
        },
        {
          area: "Orihuela Costa",
          title: "Starke Auswahl an der Küste",
          summary: "Beliebt bei internationalen Käufern, die gepflegte Anlagen und Küstennähe suchen.",
        },
        {
          area: "Guardamar del Segura",
          title: "Grüner, weicher, ruhiger",
          summary: "Eine leisere Küstenlage mit Dünen, Parks und Häusern, die etwas geschützter wirken.",
        },
      ],
      eyebrow: "Lagen",
      title: "Jeder Teil der Küste hat seine eigene Stimmung und spricht andere Käufer an.",
    },
    nav: {
      home: "Start",
      properties: "Immobilien",
    },
    overview: {
      body:
        "Käuferinnen und Käufer erhalten ehrliche Begleitung, ein ruhigeres Tempo und eine Darstellung, die Vergleiche zwischen Objekten und Lagen leichter macht.",
      eyebrow: "Was Kunden schätzen",
      items: [
        {
          title: "Ein persönlicherer Umgang",
          copy: "Gespräche orientieren sich daran, was für den Käufer wirklich wichtig ist, nicht nur am nächsten Besichtigungstermin.",
        },
        {
          title: "Klarheit ohne Druck",
          copy: "Objekte, Lagen und Unterschiede werden ruhig erklärt, damit Entscheidungen mit mehr Sicherheit getroffen werden können.",
        },
        {
          title: "Begleitung in jedem Schritt",
          copy: "Von der ersten Auswahl bis zum ersten Gespräch ist der Ablauf darauf ausgelegt, Vertrauen aufzubauen.",
        },
      ],
      title: "Mit Vertrauen im Prozess wird auch die Entscheidung selbst klarer.",
    },
    propertiesPage: {
      eyebrow: "Immobilienübersicht",
      text: "Durchsuchen Sie das aktuelle Angebot, nutzen Sie Filter und öffnen Sie jede Immobilie im Detail.",
      title: "Verfügbare Immobilien in Torrevieja und an der umliegenden Küste.",
    },
    seo: {
      description: "Entdecken Sie Immobilien in Torrevieja, La Mata, Orihuela Costa und weiteren Küstenlagen mit Verdant Realty.",
      ogDescription: "Ausgewählte Immobilien an der Costa Blanca, klar und hochwertig präsentiert.",
      ogTitle: "Verdant Realty | Immobilien in Torrevieja",
      title: "Verdant Realty | Immobilien An Der Küste Von Torrevieja",
    },
    propertyMeta: {
      bathroomsShort: "Bad",
      bedroomsShort: "SZ",
      featuredSnapshot: "Ausgewähltes Objekt",
      homesOnline: "vorbereitete Immobilien online",
      homesSelected: "hervorgehobene Plätze auf der Startseite",
      homesSelectedLabel: "wichtige Zielgebiete in der Nähe",
      updatedListings: "aktualisierte Angebote",
    },
    testimonials: {
      eyebrow: "Stimmen zum Ablauf",
      items: [
        {
          name: "Privater Käufer",
          quote: "Die Suche wirkte von Anfang an ruhig und gut strukturiert. Man merkte schnell, welche Objekte wirklich näher angeschaut werden sollten.",
          role: "Umzug an die Küste",
        },
        {
          name: "Kaufinteressiertes Paar",
          quote: "Uns half besonders, dass nicht nur die Immobilien, sondern auch die Unterschiede zwischen den Lagen klar erklärt wurden.",
          role: "Zweitwohnsitz an der Costa Blanca",
        },
        {
          name: "Familienkauf",
          quote: "Es wirkte persönlicher als auf klassischen Portalen. Schon vor der Anfrage hatten wir deutlich mehr Vertrauen in die Auswahl.",
          role: "Suche nach einem dauerhaften Zuhause",
        },
      ],
      summary: "Der Unterschied zeigt sich im Ton, in der Klarheit der Exposés und darin, wie ruhig der Weg zur Anfrage geführt wird.",
      title: "Eine gut geführte Immobiliensuche gibt Käufern Sicherheit statt Überforderung.",
    },
  },
};

export function getLocalizedPropertyTypeLabel(locale: PublicLocale, type: string) {
  const labels = {
    en: {
      apartment: "Apartment",
      bungalow: "Bungalow",
      finca: "Finca",
      penthouse: "Penthouse",
      townhouse: "Townhouse",
      villa: "Villa",
    },
    es: {
      apartment: "Apartamento",
      bungalow: "Bungaló",
      finca: "Finca",
      penthouse: "Ático",
      townhouse: "Adosado",
      villa: "Villa",
    },
    ru: {
      apartment: "Апартаменты",
      bungalow: "Бунгало",
      finca: "Финка",
      penthouse: "Пентхаус",
      townhouse: "Таунхаус",
      villa: "Вилла",
    },
    de: {
      apartment: "Apartment",
      bungalow: "Bungalow",
      finca: "Finca",
      penthouse: "Penthouse",
      townhouse: "Reihenhaus",
      villa: "Villa",
    },
  } as const;

  return labels[locale][type as keyof (typeof labels)[typeof locale]] ?? type;
}

export function getLocalizedPropertyStatusLabel(locale: PublicLocale, status: string) {
  const labels = {
    en: { available: "Available", draft: "Draft", reserved: "Reserved", sold: "Sold" },
    es: { available: "Disponible", draft: "Borrador", reserved: "Reservada", sold: "Vendida" },
    ru: { available: "Доступно", draft: "Черновик", reserved: "Забронировано", sold: "Продано" },
    de: { available: "Verfügbar", draft: "Entwurf", reserved: "Reserviert", sold: "Verkauft" },
  } as const;

  return labels[locale][status as keyof (typeof labels)[typeof locale]] ?? status;
}

export function getLocalizedResultsLabel(locale: PublicLocale, count: number) {
  if (locale === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return `${count} объект найден`;
    }

    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return `${count} объекта найдено`;
    }

    return `${count} объектов найдено`;
  }

  if (locale === "es") {
    return count === 1 ? "1 propiedad coincide." : `${count} propiedades coinciden.`;
  }

  if (locale === "de") {
    return count === 1 ? "1 Immobilie passt aktuell." : `${count} Immobilien passen aktuell.`;
  }

  return count === 1 ? "1 property currently matches." : `${count} properties currently match.`;
}

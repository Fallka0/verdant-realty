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
  areasLabel: string;
  areasTitle: string;
  areasSummary: string;
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
    homesOnlineValue: string;
    homesSelected: string;
    homesSelectedValue: string;
    homesSelectedLabel: string;
    targetAreasValue: string;
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
    areasLabel: "Popular Search Areas",
    areasTitle: "Coastal locations buyers ask for most often.",
    areasSummary:
      "From central Torrevieja to the nearby coastline, buyers can quickly move into the areas they already know and love.",
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
      phoneLabel: "Phone",
      summary: "For buyers who prefer a direct conversation, Verdant Realty is also available by phone or on WhatsApp.",
      title: "Speak with your agent right away when a listing feels promising.",
      whatsappMessage: "Hello, I am interested in a property from Verdant Realty and would like more information.",
    },
    coverage: {
      eyebrow: "Coastal Collection",
      summary:
        "A clear property-first experience for buyers searching Torrevieja and nearby coastal neighborhoods.",
      title: "Homes presented with more clarity and less noise.",
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
      results: "properties currently match.",
      search: "Search",
      searchPlaceholder: "Area or title",
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
        "Verdant Realty showcases available homes with a calm, refined presentation so buyers can move from discovery to inquiry with ease.",
      title: "Beautiful properties, clearly presented.",
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
      eyebrow: "Visual Browse",
      title: "Explore the collection through a more visual layout.",
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
      homesOnlineValue: "2",
      homesSelected: "featured slots on the homepage",
      homesSelectedValue: "1",
      homesSelectedLabel: "core target areas nearby",
      targetAreasValue: "4",
      updatedListings: "updated listings",
    },
    testimonials: {
      eyebrow: "Client Impressions",
      items: [
        {
          name: "Private buyer",
          quote: "The search felt calm and clear from the start. We always knew which homes were genuinely worth opening.",
          role: "Relocating from Northern Europe",
        },
        {
          name: "Second-home couple",
          quote: "The presentation made it easier to compare areas, not just properties, which helped us decide much faster.",
          role: "Buying near the coast",
        },
        {
          name: "Family purchaser",
          quote: "Everything felt more personal than a generic portal. The listings gave us confidence before we even reached out.",
          role: "Looking for a year-round home",
        },
      ],
      summary: "A relationship-first approach shows up in how the listings are explained, paced, and presented.",
      title: "Buyers remember when the search feels calm, human, and well-guided.",
    },
  },
  es: {
    areasLabel: "Zonas Más Buscadas",
    areasTitle: "Lugares costeros que más interesan a los compradores.",
    areasSummary:
      "Desde el centro de Torrevieja hasta la costa cercana, los compradores pueden entrar rápido en las zonas que ya conocen y desean.",
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
      phoneLabel: "Teléfono",
      summary: "Si prefieres hablar directamente, Verdant Realty también está disponible por teléfono o por WhatsApp.",
      title: "Habla con tu agente enseguida cuando una propiedad te interese.",
      whatsappMessage: "Hola, me interesa una propiedad de Verdant Realty y me gustaría recibir más información.",
    },
    coverage: {
      eyebrow: "Selección Costera",
      summary:
        "Una experiencia clara y centrada en propiedades para compradores que buscan en Torrevieja y sus alrededores.",
      title: "Viviendas presentadas con más claridad y menos ruido.",
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
      results: "propiedades coinciden.",
      search: "Buscar",
      searchPlaceholder: "Zona o título",
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
        "Verdant Realty presenta viviendas disponibles con una imagen serena y cuidada para que el comprador pase de descubrir a consultar con facilidad.",
      title: "Propiedades bonitas, presentadas con claridad.",
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
      eyebrow: "Exploración Visual",
      title: "Descubre la colección con una presentación más visual.",
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
        "La web está organizada alrededor de propiedades reales, una presentación sólida y un camino más fácil desde la búsqueda hasta la consulta.",
      eyebrow: "Por Qué El Comprador Se Queda",
      items: [
        {
          title: "Experiencia centrada en propiedades",
          copy: "Los visitantes llegan directamente a las viviendas, zonas y oportunidades que importan.",
        },
        {
          title: "Presentación clara y elegante",
          copy: "Fotografía, precio y detalles clave se leen con orden y sin saturación.",
        },
        {
          title: "Pensada para stock activo",
          copy: "La experiencia está preparada para mantener la oferta visible y fácil de explorar.",
        },
      ],
      title: "Una web inmobiliaria construida alrededor de las viviendas.",
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
      homesOnlineValue: "2",
      homesSelected: "espacios destacados en la portada",
      homesSelectedValue: "1",
      homesSelectedLabel: "zonas clave cercanas",
      targetAreasValue: "4",
      updatedListings: "listados actualizados",
    },
    testimonials: {
      eyebrow: "Experiencias",
      items: [
        {
          name: "Compradora internacional",
          quote: "La búsqueda se sintió clara y tranquila desde el principio. Era fácil entender qué viviendas merecían una visita.",
          role: "Mudanza a la costa",
        },
        {
          name: "Pareja compradora",
          quote: "Nos ayudó mucho comparar zonas y no solo viviendas. La presentación tenía orden y criterio.",
          role: "Segunda residencia",
        },
        {
          name: "Familia compradora",
          quote: "La web transmite cercanía. Antes de escribir ya sentíamos que entendíamos mejor el mercado.",
          role: "Compra para todo el año",
        },
      ],
      summary: "Una experiencia más humana se nota en cómo se presenta cada propiedad y en el ritmo de la búsqueda.",
      title: "Cuando la búsqueda se siente más personal, los compradores avanzan con más confianza.",
    },
  },
  ru: {
    areasLabel: "Популярные районы",
    areasTitle: "Прибрежные локации, которые чаще всего ищут покупатели.",
    areasSummary:
      "От центра Торревьехи до соседних прибрежных районов покупатели могут быстро перейти к тем местам, которые им действительно интересны.",
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
      eyebrow: "Быстрый контакт",
      phoneLabel: "Телефон",
      summary: "Если удобнее поговорить напрямую, с Verdant Realty можно быстро связаться по телефону или в WhatsApp.",
      title: "Когда объект заинтересовал, связаться с агентом можно сразу.",
      whatsappMessage: "Здравствуйте, меня заинтересовал объект на Verdant Realty. Хотелось бы получить больше информации.",
    },
    coverage: {
      eyebrow: "Прибрежная коллекция",
      summary:
        "Понятный и ориентированный на объекты интерфейс для покупателей, которые ищут жилье в Торревьехе и рядом.",
      title: "Объекты показаны яснее и спокойнее.",
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
      results: "объектов найдено.",
      search: "Поиск",
      searchPlaceholder: "Район или название",
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
        "Verdant Realty показывает доступные дома и квартиры в спокойной и аккуратной подаче, чтобы путь от просмотра до запроса был проще.",
      title: "Красивые объекты, показанные с ясностью.",
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
      eyebrow: "Фотоподборка",
      title: "Изучайте объекты через более визуальную подачу.",
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
        "Сайт построен вокруг реальных объектов, сильной презентации и более простого пути от просмотра к обращению.",
      eyebrow: "Почему здесь задерживаются",
      items: [
        {
          title: "Фокус на объектах",
          copy: "Посетители сразу попадают к объектам, районам и предложениям, которые действительно важны.",
        },
        {
          title: "Четкая и элегантная подача",
          copy: "Фотографии, цены и ключевые параметры остаются читаемыми и аккуратно организованными.",
        },
        {
          title: "Подходит для активной витрины",
          copy: "Опыт рассчитан на то, чтобы актуальные объекты было легко держать на виду.",
        },
      ],
      title: "Сайт о недвижимости, построенный вокруг самих объектов.",
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
      homesOnlineValue: "2",
      homesSelected: "объектов на главной",
      homesSelectedValue: "1",
      homesSelectedLabel: "ключевых районов рядом",
      targetAreasValue: "4",
      updatedListings: "актуальные объекты",
    },
    testimonials: {
      eyebrow: "Впечатления клиентов",
      items: [
        {
          name: "Частный покупатель",
          quote: "Поиск ощущался спокойным и понятным. Было легко понять, какие объекты действительно стоит открыть.",
          role: "Переезд к морю",
        },
        {
          name: "Пара покупателей",
          quote: "Нам помогло то, что сайт показывает не только дома, но и характер районов. Решение стало принимать проще.",
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
    areasLabel: "Beliebte Suchlagen",
    areasTitle: "Küstenlagen, nach denen Käufer besonders oft fragen.",
    areasSummary:
      "Von Torrevieja selbst bis zu den nahen Küstenorten gelangen Interessenten schnell in die Lagen, die sie wirklich suchen.",
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
      phoneLabel: "Telefon",
      summary: "Wenn ein direktes Gespräch angenehmer ist, ist Verdant Realty auch telefonisch oder über WhatsApp erreichbar.",
      title: "Sprechen Sie sofort mit Ihrer Ansprechpartnerin, wenn ein Objekt interessant wirkt.",
      whatsappMessage: "Hallo, ich interessiere mich für eine Immobilie von Verdant Realty und hätte gern weitere Informationen.",
    },
    coverage: {
      eyebrow: "Küstenkollektion",
      summary:
        "Ein klarer, objektorientierter Auftritt für Käuferinnen und Käufer, die in Torrevieja und der nahen Küste suchen.",
      title: "Immobilien mit mehr Klarheit und weniger Unruhe präsentiert.",
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
      results: "Immobilien passen aktuell.",
      search: "Suche",
      searchPlaceholder: "Lage oder Titel",
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
        "Verdant Realty zeigt verfügbare Immobilien in einer ruhigen, hochwertigen Präsentation, damit aus dem ersten Blick leichter eine echte Anfrage wird.",
      title: "Schöne Immobilien, klar präsentiert.",
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
      eyebrow: "Visuelles Entdecken",
      title: "Die Auswahl in einer visuellen Darstellung erkunden.",
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
        "Die Seite ist auf echte Immobilien, starke Präsentation und einen einfacheren Weg von der Suche zur Anfrage ausgerichtet.",
      eyebrow: "Warum Käufer Hier Bleiben",
      items: [
        {
          title: "Immobilien im Mittelpunkt",
          copy: "Besucher gelangen direkt zu den Objekten, Lagen und Chancen, die wirklich zählen.",
        },
        {
          title: "Klare und elegante Darstellung",
          copy: "Fotos, Preise und Kerndaten bleiben lesbar und gut strukturiert.",
        },
        {
          title: "Für aktive Angebote gemacht",
          copy: "Das Erlebnis ist darauf ausgelegt, verfügbare Immobilien aktuell und leicht durchsuchbar zu halten.",
        },
      ],
      title: "Eine Immobilienseite, die um die Objekte selbst gebaut ist.",
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
      homesOnlineValue: "2",
      homesSelected: "hervorgehobene Plätze auf der Startseite",
      homesSelectedValue: "1",
      homesSelectedLabel: "wichtige Zielgebiete in der Nähe",
      targetAreasValue: "4",
      updatedListings: "aktualisierte Angebote",
    },
    testimonials: {
      eyebrow: "Stimmen zum Ablauf",
      items: [
        {
          name: "Privater Käufer",
          quote: "Die Suche fühlte sich von Anfang an ruhig und klar an. Man wusste sofort, welche Objekte wirklich interessant sind.",
          role: "Umzug an die Küste",
        },
        {
          name: "Kaufinteressiertes Paar",
          quote: "Uns half besonders, dass nicht nur die Immobilien, sondern auch die Lagen verständlich dargestellt wurden.",
          role: "Zweitwohnsitz an der Costa Blanca",
        },
        {
          name: "Familienkauf",
          quote: "Alles wirkte persönlicher als auf klassischen Portalen. Das gab uns schon vor der Anfrage mehr Vertrauen.",
          role: "Suche nach einem dauerhaften Zuhause",
        },
      ],
      summary: "Ein beziehungsorientierter Auftritt zeigt sich darin, wie Immobilien erklärt, sortiert und erlebbar gemacht werden.",
      title: "Wenn sich die Suche klar und menschlich anfühlt, entsteht schneller echtes Vertrauen.",
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

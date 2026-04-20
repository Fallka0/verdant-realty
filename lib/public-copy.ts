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
    openListings: string;
    seeAllProperties: string;
    sendInquiry: string;
    sending: string;
    viewDetails: string;
    viewListing: string;
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
    success: string;
    yourName: string;
  };
  languageLabel: string;
  masonry: {
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
  propertyMeta: {
    bathroomsShort: string;
    bedroomsShort: string;
    featuredSnapshot: string;
    homesOnline: string;
    homesSelected: string;
    homesSelectedLabel: string;
    updatedListings: string;
  };
};

export const areaNames = [
  "Torrevieja",
  "La Mata",
  "Orihuela Costa",
  "Guardamar del Segura",
] as const;

export const publicCopy: Record<PublicLocale, PublicCopy> = {
  en: {
    areasLabel: "Popular Search Areas",
    areasTitle: "Coastal locations buyers ask for most often.",
    areasSummary:
      "From central Torrevieja to the nearby coastline, buyers can quickly move into the areas they already know and love.",
    brandSubtitle: "Homes Along The Costa Blanca",
    buttons: {
      browseProperties: "Browse Properties",
      openListings: "Open Full Listings",
      seeAllProperties: "See All Properties",
      sendInquiry: "Send Inquiry",
      sending: "Sending...",
      viewDetails: "View Details",
      viewListing: "View Listing",
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
      searchPlaceholder: "Area, reference, or title",
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
      success: "Inquiry sent successfully.",
      yourName: "Your name",
    },
    languageLabel: "Choose language",
    masonry: {
      eyebrow: "Visual Browse",
      title: "Explore the collection through a more visual layout.",
    },
    nav: {
      home: "Home",
      properties: "Properties",
    },
    overview: {
      body:
        "The site is shaped around real listings, strong presentation, and an easier path from browsing to inquiry.",
      eyebrow: "Why Buyers Stay Longer",
      items: [
        {
          title: "Clean listing-first experience",
          copy: "Visitors land directly in the properties, the areas, and the homes that matter.",
        },
        {
          title: "Clear, elegant presentation",
          copy: "Photography, pricing, and key details stay readable and well-organized across the site.",
        },
        {
          title: "Built for active inventory",
          copy: "The experience is designed to keep available homes current and easy to browse.",
        },
      ],
      title: "A property website built around the homes themselves.",
    },
    propertiesPage: {
      eyebrow: "Property Listings",
      text: "Browse current inventory, refine the search, and open any listing for more detail.",
      title: "Available homes in Torrevieja and the surrounding coast.",
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
  },
  es: {
    areasLabel: "Zonas Más Buscadas",
    areasTitle: "Lugares costeros que más interesan a los compradores.",
    areasSummary:
      "Desde el centro de Torrevieja hasta la costa cercana, los compradores pueden entrar rápido en las zonas que ya conocen y desean.",
    brandSubtitle: "Viviendas En La Costa Blanca",
    buttons: {
      browseProperties: "Ver propiedades",
      openListings: "Abrir propiedades",
      seeAllProperties: "Ver todas",
      sendInquiry: "Enviar consulta",
      sending: "Enviando...",
      viewDetails: "Ver detalles",
      viewListing: "Ver propiedad",
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
      searchPlaceholder: "Zona, referencia o título",
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
      success: "Consulta enviada correctamente.",
      yourName: "Tu nombre",
    },
    languageLabel: "Elegir idioma",
    masonry: {
      eyebrow: "Exploración Visual",
      title: "Descubre la colección con una presentación más visual.",
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
    propertyMeta: {
      bathroomsShort: "baño",
      bedroomsShort: "hab",
      featuredSnapshot: "Propiedad destacada",
      homesOnline: "propiedades listas para mostrar",
      homesSelected: "espacios destacados en la portada",
      homesSelectedLabel: "zonas clave cercanas",
      updatedListings: "listados actualizados",
    },
  },
  ru: {
    areasLabel: "Популярные Районы",
    areasTitle: "Прибрежные локации, которые чаще всего ищут покупатели.",
    areasSummary:
      "От центра Торревьехи до соседних прибрежных районов покупатели могут быстро перейти к тем местам, которые им действительно интересны.",
    brandSubtitle: "Недвижимость На Коста-Бланке",
    buttons: {
      browseProperties: "Смотреть объекты",
      openListings: "Открыть объекты",
      seeAllProperties: "Все объекты",
      sendInquiry: "Отправить запрос",
      sending: "Отправка...",
      viewDetails: "Подробнее",
      viewListing: "Смотреть объект",
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
    coverage: {
      eyebrow: "Прибрежная Подборка",
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
      searchPlaceholder: "Район, референс или название",
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
      success: "Запрос успешно отправлен.",
      yourName: "Ваше имя",
    },
    languageLabel: "Выберите язык",
    masonry: {
      eyebrow: "Визуальный Просмотр",
      title: "Изучайте коллекцию в более визуальной подаче.",
    },
    nav: {
      home: "Главная",
      properties: "Объекты",
    },
    overview: {
      body:
        "Сайт построен вокруг реальных объектов, сильной презентации и более простого пути от просмотра к обращению.",
      eyebrow: "Почему Покупатели Остаются",
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
    propertyMeta: {
      bathroomsShort: "ванн.",
      bedroomsShort: "спал.",
      featuredSnapshot: "Выбранный объект",
      homesOnline: "готовых объектов в каталоге",
      homesSelected: "выделенных мест на главной",
      homesSelectedLabel: "ключевых районов рядом",
      updatedListings: "обновленных объектов",
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
      openListings: "Alle Immobilien öffnen",
      seeAllProperties: "Alle ansehen",
      sendInquiry: "Anfrage senden",
      sending: "Wird gesendet...",
      viewDetails: "Details ansehen",
      viewListing: "Objekt ansehen",
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
      searchPlaceholder: "Lage, Referenz oder Titel",
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
      success: "Anfrage erfolgreich gesendet.",
      yourName: "Ihr Name",
    },
    languageLabel: "Sprache wählen",
    masonry: {
      eyebrow: "Visuelles Entdecken",
      title: "Die Auswahl in einer visuellen Darstellung erkunden.",
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
    propertyMeta: {
      bathroomsShort: "Bad",
      bedroomsShort: "SZ",
      featuredSnapshot: "Ausgewähltes Objekt",
      homesOnline: "vorbereitete Immobilien online",
      homesSelected: "hervorgehobene Plätze auf der Startseite",
      homesSelectedLabel: "wichtige Zielgebiete in der Nähe",
      updatedListings: "aktualisierte Angebote",
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

import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server";
import { defaultLocale, isSupportedLocale, type Locale } from "@/lib/site-copy";

type InquiryPayload = {
  email?: string;
  locale?: string;
  message?: string;
  name?: string;
  phone?: string;
  timeline?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const apiMessages: Record<
  Locale,
  {
    invalidEmail: string;
    invalidJson: string;
    notConfigured: string;
    required: string;
    saveFailed: string;
    success: string;
  }
> = {
  en: {
    invalidJson: "Please send valid JSON.",
    required: "Name, email, and message are required.",
    invalidEmail: "Please enter a valid email address.",
    notConfigured:
      "Supabase is not configured yet. Add the project URL and service role key to enable inquiries.",
    saveFailed: "The inquiry could not be saved right now. Please try again.",
    success: "Thanks for reaching out. Verdant Realty will be in touch soon.",
  },
  es: {
    invalidJson: "Envía JSON válido, por favor.",
    required: "El nombre, el correo y el mensaje son obligatorios.",
    invalidEmail: "Introduce una dirección de correo válida.",
    notConfigured:
      "Supabase aún no está configurado. Añade la URL del proyecto y la service role key para activar las consultas.",
    saveFailed: "No se pudo guardar la consulta en este momento. Inténtalo de nuevo.",
    success: "Gracias por escribir. Verdant Realty se pondrá en contacto pronto.",
  },
  ru: {
    invalidJson: "Пожалуйста, отправьте корректный JSON.",
    required: "Имя, электронная почта и сообщение обязательны.",
    invalidEmail: "Укажите корректный адрес электронной почты.",
    notConfigured:
      "Supabase пока не настроен. Добавьте URL проекта и service role key, чтобы включить отправку заявок.",
    saveFailed: "Сейчас не удалось сохранить заявку. Пожалуйста, попробуйте еще раз.",
    success: "Спасибо за обращение. Verdant Realty свяжется с вами в ближайшее время.",
  },
  de: {
    invalidJson: "Bitte senden Sie gültiges JSON.",
    required: "Name, E-Mail-Adresse und Nachricht sind erforderlich.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    notConfigured:
      "Supabase ist noch nicht eingerichtet. Fügen Sie die Projekt-URL und den Service-Role-Key hinzu, um Anfragen zu aktivieren.",
    saveFailed: "Die Anfrage konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut.",
    success: "Vielen Dank für Ihre Nachricht. Verdant Realty meldet sich in Kürze.",
  },
};

function getLocale(locale?: string): Locale {
  if (locale && isSupportedLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}

function normalizeInput(payload: InquiryPayload) {
  return {
    locale: getLocale(payload.locale),
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim().toLowerCase() ?? "",
    phone: payload.phone?.trim() ?? "",
    timeline: payload.timeline?.trim() ?? "",
    message: payload.message?.trim() ?? "",
  };
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: apiMessages[defaultLocale].invalidJson }, { status: 400 });
  }

  const inquiry = normalizeInput(payload);
  const messages = apiMessages[inquiry.locale];

  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return NextResponse.json({ error: messages.required }, { status: 400 });
  }

  if (!emailPattern.test(inquiry.email)) {
    return NextResponse.json({ error: messages.invalidEmail }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: messages.notConfigured }, { status: 503 });
  }

  const { error } = await supabase.from("inquiries").insert({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    timeline: inquiry.timeline || null,
    message: inquiry.message,
  });

  if (error) {
    return NextResponse.json({ error: messages.saveFailed }, { status: 500 });
  }

  return NextResponse.json({
    message: messages.success,
  });
}

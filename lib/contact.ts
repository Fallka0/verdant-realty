export const motherPhoneNumber = "+34652679443";
export const motherPhoneDisplay = "+34 652 679 443";

export function getPhoneHref() {
  return `tel:${motherPhoneNumber}`;
}

export function getWhatsAppHref(message: string) {
  const digitsOnly = motherPhoneNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

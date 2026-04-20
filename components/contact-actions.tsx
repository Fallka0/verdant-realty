import Link from "next/link";

import { getPhoneHref, getWhatsAppHref } from "@/lib/contact";

type ContactActionsProps = {
  callLabel: string;
  className?: string;
  whatsappLabel: string;
  whatsappMessage: string;
};

export function ContactActions({
  callLabel,
  className,
  whatsappLabel,
  whatsappMessage,
}: ContactActionsProps) {
  return (
    <div className={className ?? "contact-actions"}>
      <Link className="button button-primary" href={getPhoneHref()}>
        {callLabel}
      </Link>
      <Link
        className="button button-ghost"
        href={getWhatsAppHref(whatsappMessage)}
        rel="noreferrer"
        target="_blank"
      >
        {whatsappLabel}
      </Link>
    </div>
  );
}

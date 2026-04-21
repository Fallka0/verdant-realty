import Link from "next/link";

import { ContactActions } from "@/components/contact-actions";
import { type PublicCopy } from "@/lib/public-copy";

type SiteFooterProps = {
  copy: PublicCopy;
};

export function SiteFooter({ copy }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer-copy">
        <strong>Verdant Realty</strong>
        <p>{copy.footer.blurb}</p>
      </div>

      <div className="site-footer-actions">
        <Link className="button button-secondary" href="/properties">
          {copy.footer.browseLabel}
        </Link>
        <ContactActions
          callLabel={copy.buttons.callNow}
          className="contact-actions footer-contact-actions"
          whatsappLabel={copy.buttons.whatsapp}
          whatsappMessage={copy.contact.whatsappMessage}
        />
      </div>

      <div className="site-footer-meta">
        <span>{copy.footer.copyright}</span>
      </div>
    </footer>
  );
}

import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
};

export function BrandLogo({ priority = false, showSubtitle = false, subtitle }: BrandLogoProps) {
  return (
    <span className="brand-logo-lockup">
      <Image
        className="brand-logo-image"
        src="/logos/milla-homes-logo.png"
        alt="Milla Homes"
        width={2000}
        height={2000}
        priority={priority}
      />
      {showSubtitle && subtitle ? <small>{subtitle}</small> : null}
    </span>
  );
}

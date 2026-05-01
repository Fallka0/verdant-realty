import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
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
    </span>
  );
}

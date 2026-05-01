const concepts = [
  {
    file: "/logos/verdant-monogram.svg",
    title: "Concept 1: Monogram",
    summary: "A refined V mark with a soft botanical accent. Best if you want something elegant, minimal, and easy to use everywhere.",
  },
  {
    file: "/logos/verdant-arch.svg",
    title: "Concept 2: Coastal Arch",
    summary: "A more architectural direction inspired by Mediterranean doorways and villas. Best if you want it to feel rooted in place.",
  },
  {
    file: "/logos/verdant-seal.svg",
    title: "Concept 3: Boutique Seal",
    summary: "A more established, premium identity with a framed mark. Best if you want something that feels trustworthy and upscale.",
  },
] as const;

export default function LogoPreviewPage() {
  return (
    <main
      style={{
        background: "linear-gradient(180deg, #f8f2e8 0%, #f4ecdf 100%)",
        color: "#123524",
        minHeight: "100vh",
        padding: "48px 24px 72px",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 1240 }}>
        <div style={{ marginBottom: 32, maxWidth: 760 }}>
          <p
            style={{
              color: "#8b7443",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Brand Direction
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 6vw, 4.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              margin: "12px 0 16px",
            }}
          >
            Milla Homes logo sketches
          </h1>
          <p
            style={{
              color: "rgba(18,53,36,0.76)",
              fontFamily: "var(--font-ui)",
              fontSize: 18,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            These are quick editable SVG directions, not final polished logos yet. The goal is to help you choose the right
            visual language before refining spacing, proportions, and brand variants.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {concepts.map((concept) => (
            <article
              key={concept.file}
              style={{
                background: "rgba(255,251,244,0.82)",
                border: "1px solid rgba(18,53,36,0.08)",
                borderRadius: 28,
                boxShadow: "0 18px 45px rgba(18,53,36,0.08)",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={concept.title}
                src={concept.file}
                style={{ display: "block", height: "auto", width: "100%" }}
              />
              <div style={{ padding: 24 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 20,
                    fontWeight: 700,
                    margin: "0 0 10px",
                  }}
                >
                  {concept.title}
                </h2>
                <p
                  style={{
                    color: "rgba(18,53,36,0.74)",
                    fontFamily: "var(--font-ui)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {concept.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

import { InquiryForm } from "@/components/inquiry-form";

const services = [
  {
    title: "Seller Representation",
    copy:
      "Preparation strategy, pricing clarity, polished marketing, and hands-on negotiation for listings that deserve care.",
  },
  {
    title: "Buyer Guidance",
    copy:
      "A calm, curated search experience with sharp local insight, steady communication, and confident offer strategy.",
  },
  {
    title: "Relocation Support",
    copy:
      "Neighborhood orientation, trusted vendor introductions, and a grounded plan for clients entering a new market.",
  },
];

const process = [
  {
    step: "01",
    title: "Listen First",
    copy:
      "Every move starts with the story behind it, so the strategy fits the season of life as much as the market.",
  },
  {
    step: "02",
    title: "Shape The Plan",
    copy:
      "From pricing to presentation to timelines, each detail is arranged to feel elegant, realistic, and well-supported.",
  },
  {
    step: "03",
    title: "Lead With Care",
    copy:
      "Clients get attentive communication, thoughtful advocacy, and a process that stays composed from start to close.",
  },
];

const highlights = [
  "Boutique attention with polished, high-trust service",
  "Elegant marketing direction and listing presentation",
  "Measured advice that keeps decisions clear and confident",
  "Warm, relationship-driven guidance from first tour to closing day",
];

const neighborhoods = [
  {
    title: "Garden District Charm",
    copy:
      "Leafy streets, character homes, and classic curb appeal for clients who want warmth, texture, and timeless detail.",
  },
  {
    title: "Refined Urban Living",
    copy:
      "Well-designed condos and lock-and-leave homes close to dining, culture, and a more walkable rhythm of life.",
  },
  {
    title: "Family-Focused Retreats",
    copy:
      "Quiet streets, larger lots, and practical layouts for buyers looking for both breathing room and everyday ease.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-glow" />
        <header className="site-header">
          <div className="brand-lockup">
            <span className="brand-mark" />
            <div>
              <p className="brand-name">Verdant Realty</p>
              <p className="brand-tag">Boutique Real Estate Guidance</p>
            </div>
          </div>
          <nav className="site-nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">For clients who want steady guidance and elevated presentation</p>
            <h1>Real estate that feels grounded, graceful, and deeply personal.</h1>
            <p className="hero-text">
              Verdant Realty pairs calm strategy with concierge-level care, helping buyers and sellers
              move forward with confidence and a sense of ease.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Book a Consultation
              </a>
              <a className="button button-secondary" href="#services">
                Explore Services
              </a>
            </div>
            <div className="hero-stats" aria-label="Brand highlights">
              <div>
                <strong>1:1</strong>
                <span>client care</span>
              </div>
              <div>
                <strong>Tailored</strong>
                <span>market strategy</span>
              </div>
              <div>
                <strong>Elegant</strong>
                <span>listing presentation</span>
              </div>
            </div>
          </div>

          <aside className="hero-card">
            <p className="card-kicker">Signature Experience</p>
            <h2>A warm, polished brand for meaningful moves.</h2>
            <p>
              Built for a relationship-first agent who wants every touchpoint to feel intentional,
              trustworthy, and a little more refined than the standard template.
            </p>
            <ul className="feature-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Signature Services</p>
          <h2>Support that meets people where they are.</h2>
          <p>
            The experience is designed to feel attentive and practical, with strategy that adapts to
            each client instead of forcing them into a canned process.
          </p>
        </div>
        <div className="card-grid">
          {services.map((service) => (
            <article className="info-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-section" id="approach">
        <div className="section-heading">
          <p className="eyebrow">The Verdant Approach</p>
          <h2>Thoughtful process. Clear communication. Beautiful execution.</h2>
          <p>
            This homepage is set up to make a strong first impression now, while the project structure
            is ready for future Supabase-powered inquiries, listings, testimonials, or neighborhood content.
          </p>
        </div>
        <div className="process-list">
          {process.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Neighborhood Storytelling</p>
          <h2>Marketed with feeling, not just square footage.</h2>
          <p>
            The brand language leans into lifestyle, texture, and place so the site feels memorable
            before you even add live listings or sold properties.
          </p>
        </div>
        <div className="neighborhood-grid">
          {neighborhoods.map((area) => (
            <article className="neighborhood-card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Start The Conversation</p>
          <h2>Let’s turn interest into an actual client inquiry flow.</h2>
          <p>
            The form here posts to a Next.js API route that is ready to insert leads into Supabase.
            Once your mother adds her project keys, this becomes a working inquiry capture system.
          </p>
          <div className="contact-details">
            <div>
              <span>Availability</span>
              <strong>Private consultations by appointment</strong>
            </div>
            <div>
              <span>Best fit</span>
              <strong>Buyers, sellers, and relocation clients</strong>
            </div>
          </div>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}


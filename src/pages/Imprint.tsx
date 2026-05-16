import LegalLayout from "@/components/LegalLayout";

const Imprint = () => (
  <LegalLayout
    title="Imprint / Impressum"
    description="Legal information required under §5 TMG and DSGVO for visitors from Germany."
  >
    <h2>Information according to §5 TMG</h2>
    <p>
      <strong>Unbound Solutions</strong>
      <br />
      Full-service web development &amp; compliance studio
      <br />
      Available Worldwide, Remote-First
    </p>

    <h2>Contact</h2>
    <p>
      Email: <a href="mailto:hello@unboundhq.com">hello@unboundhq.com</a>
      <br />
      Phone: +1 (234) 567-890
    </p>

    <h2>Responsible for content (§55 Abs. 2 RStV)</h2>
    <p>Unbound Solutions Team — Editorial &amp; Content</p>

    <h2>EU Dispute Resolution</h2>
    <p>
      The European Commission provides a platform for online dispute resolution (ODR):{" "}
      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
        https://ec.europa.eu/consumers/odr
      </a>
      . We are neither willing nor obligated to participate in dispute resolution proceedings
      before a consumer arbitration board.
    </p>

    <h2>Liability for Content</h2>
    <p>
      As a service provider, we are responsible for our own content on these pages according to
      §7 Abs. 1 TMG and general laws. However, according to §§8 to 10 TMG, we are not obliged to
      monitor transmitted or stored third-party information.
    </p>

    <h2>Liability for Links</h2>
    <p>
      Our site contains links to external third-party websites whose content we have no influence
      over. We cannot assume any liability for these external contents.
    </p>

    <h2>Copyright</h2>
    <p>
      The content and works on these pages are subject to copyright law. Reproduction, processing,
      distribution, and any kind of exploitation outside the limits of copyright require written
      consent from Unbound Solutions.
    </p>
  </LegalLayout>
);

export default Imprint;

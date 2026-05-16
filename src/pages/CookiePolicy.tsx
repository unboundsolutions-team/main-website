import LegalLayout from "@/components/LegalLayout";

const CookiePolicy = () => (
  <LegalLayout
    title="Cookie Policy"
    description="How and why we use cookies on the Unbound Solutions website."
  >
    <h2>1. What Are Cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit a website. They allow the
      site to remember your actions and preferences over time.
    </p>

    <h2>2. Categories of Cookies We Use</h2>
    <ul>
      <li>
        <strong>Strictly necessary:</strong> Required for the site to function (e.g. session,
        security, consent state). These cannot be disabled.
      </li>
      <li>
        <strong>Analytics:</strong> Help us understand how visitors use the site so we can improve
        it. Only set with your consent.
      </li>
      <li>
        <strong>Marketing:</strong> Used to deliver more relevant content. Only set with your
        explicit consent.
      </li>
    </ul>

    <h2>3. Managing Your Preferences</h2>
    <p>
      You can change your cookie preferences at any time using the "Cookie Settings" link in our
      footer, or via your browser settings.
    </p>

    <h2>4. Third-Party Cookies</h2>
    <p>
      Some cookies are set by third-party services (e.g. analytics providers). These services have
      their own privacy and cookie policies, which we recommend reviewing.
    </p>

    <h2>5. Consent &amp; GDPR/DSGVO</h2>
    <p>
      For visitors in the EU/EEA, no non-essential cookies are set until you give explicit
      consent, in compliance with the GDPR and Germany's DSGVO/TTDSG.
    </p>

    <h2>6. Updates</h2>
    <p>This policy may be updated periodically. The "Last updated" date above reflects the most recent revision.</p>

    <h2>7. Contact</h2>
    <p>
      Questions? Email <a href="mailto:hello@unboundhq.com">hello@unboundhq.com</a>.
    </p>
  </LegalLayout>
);

export default CookiePolicy;

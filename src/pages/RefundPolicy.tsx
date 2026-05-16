import LegalLayout from "@/components/LegalLayout";

const RefundPolicy = () => (
  <LegalLayout
    title="Refund Policy"
    description="Our policy for refunds on services, deposits, and digital products."
  >
    <h2>1. Overview</h2>
    <p>
      This Refund Policy outlines the terms under which Unbound Solutions ("we", "us") issues
      refunds for services, project deposits, and digital products purchased through our website.
    </p>

    <h2>2. Project-Based Services</h2>
    <p>
      All custom development, design, and consulting engagements are governed by a signed Statement
      of Work (SoW). Refund eligibility is determined by the milestones completed at the time of
      cancellation:
    </p>
    <ul>
      <li>
        <strong>Before kickoff:</strong> Full refund of any deposit, minus payment processor fees.
      </li>
      <li>
        <strong>After kickoff, before first milestone:</strong> 50% of the deposit is refundable.
      </li>
      <li>
        <strong>After first milestone:</strong> No refund; work completed remains billable.
      </li>
    </ul>

    <h2>3. Subscription &amp; Maintenance Plans</h2>
    <p>
      Monthly retainers can be cancelled at any time and will end at the close of the current
      billing cycle. We do not pro-rate partial months.
    </p>

    <h2>4. Digital Products</h2>
    <p>
      One-time digital products (templates, audit reports, downloadable tools) are non-refundable
      once delivered, unless the product is materially defective.
    </p>

    <h2>5. How to Request a Refund</h2>
    <p>
      To request a refund, email{" "}
      <a href="mailto:hello@unboundhq.com">hello@unboundhq.com</a> with your order or invoice
      reference. We respond within 5 business days.
    </p>

    <h2>6. Chargebacks</h2>
    <p>
      We ask clients to contact us first before initiating a chargeback so we can resolve any
      issues quickly and fairly.
    </p>

    <h2>7. Contact</h2>
    <p>Questions about this policy? Reach us at hello@unboundhq.com.</p>
  </LegalLayout>
);

export default RefundPolicy;

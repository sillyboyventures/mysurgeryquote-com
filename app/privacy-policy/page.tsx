import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MySurgeryQuote collects, uses, and protects your data, including PHI handled as a HIPAA Business Associate. BAA available on request.",
  alternates: { canonical: "https://www.mysurgeryquote.com/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subhead="How MySurgeryQuote collects, uses, and protects your information."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 rounded-lg bg-bg-accent p-4 text-sm text-text-muted">
            This Privacy Policy is provided as a starting point and should be
            reviewed by your legal counsel before relying on it. Last updated May
            27, 2026.
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-poppins prose-headings:text-navy prose-a:text-primary">
            <h2>Overview</h2>
            <p>
              MySurgeryQuote (&quot;MySurgeryQuote,&quot; &quot;we,&quot;
              &quot;us&quot;) provides quoting software for surgical practices and
              medical spas. This Privacy Policy explains what information we
              collect, how we use it, and the choices you have. It applies to our
              marketing site and to the MySurgeryQuote application. Effective date:
              May 27, 2026.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect three categories of information:</p>
            <ul>
              <li>
                <strong>Account data.</strong> Name, work email, phone, practice
                name, role, and billing details you provide when you create or
                manage an account.
              </li>
              <li>
                <strong>Usage data.</strong> Log data, device and browser
                information, and product analytics about how you use the
                application, used to operate and improve the service.
              </li>
              <li>
                <strong>Patient data.</strong> Information your practice enters to
                build quotes, which may include protected health information (PHI)
                that you process through the application.
              </li>
            </ul>

            <h2>HIPAA &amp; PHI Handling</h2>
            <p>
              When we handle PHI on behalf of a Covered Entity, we act as a
              Business Associate under HIPAA. We make a Business Associate
              Agreement (BAA) available on request, and we handle PHI only as
              permitted by that BAA and applicable law. Please do not send PHI
              through our marketing forms; use the application for any
              patient-related data.
            </p>

            <h2>How We Use Information</h2>
            <p>We use information to:</p>
            <ul>
              <li>Provide, maintain, and secure the service.</li>
              <li>Respond to support requests and communicate with customers.</li>
              <li>Improve product features, performance, and reliability.</li>
              <li>Process billing and prevent fraud or abuse.</li>
            </ul>

            <h2>How We Share Information</h2>
            <p>
              We do not sell your data. We share information with subprocessors
              that help us run the service: hosting providers (such as AWS,
              Vercel, and Render), payment processing (Stripe), and transactional
              email (Resend). Each subprocessor is bound by contractual
              confidentiality and security obligations. We may also disclose
              information when required by law.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain account data for as long as your account is active and for
              up to seven years thereafter for billing and tax records. PHI is
              retained and disposed of in accordance with the terms of your BAA
              and your instructions.
            </p>

            <h2>Security</h2>
            <p>
              We protect data with encryption at rest and in transit, multi-factor
              authentication, role-based access control, access logging, and
              automatic session timeouts. No system is perfectly secure, but we
              work to apply industry-standard safeguards appropriate to the
              sensitivity of the data.
            </p>

            <h2>Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, subject to legal and contractual retention
              requirements. For data within the application, your practice
              controls patient records and is responsible for responding to
              patient requests as the Covered Entity.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              The service is intended for medical practices and is not directed to
              children under 18. We do not knowingly collect personal information
              from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. For material
              changes, we will notify customers by email or through the
              application. Continued use of the service after an update constitutes
              acceptance of the revised policy.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Reach us through the{" "}
              <Link href="/contact/">contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

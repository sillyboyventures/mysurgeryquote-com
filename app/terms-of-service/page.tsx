import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of MySurgeryQuote: accounts, billing, acceptable use, HIPAA, intellectual property, liability, and termination.",
  alternates: { canonical: "https://www.mysurgeryquote.com/terms-of-service/" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subhead="The terms that govern your use of MySurgeryQuote."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 rounded-lg bg-bg-accent p-4 text-sm text-text-muted">
            This Terms of Service is provided as a starting point and should be
            reviewed by your legal counsel before relying on it. Last updated May
            27, 2026.
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-poppins prose-headings:text-navy prose-a:text-primary">
            <h2>Acceptance</h2>
            <p>
              By accessing or using MySurgeryQuote (the &quot;Service&quot;), you
              agree to these Terms of Service. If you do not agree, do not use the
              Service.
            </p>

            <h2>Account Eligibility</h2>
            <p>
              You must be at least 18 years old and authorized to bind your
              practice to these terms. You are responsible for the activity of all
              users under your account and for keeping credentials secure.
            </p>

            <h2>Subscription &amp; Billing</h2>
            <p>
              The Service is billed as a monthly recurring subscription. You may
              cancel anytime; cancellation takes effect at the end of the current
              billing period. Fees are non-refundable for partial months. We may
              change pricing with notice that applies to your next billing cycle.
            </p>

            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Resell, sublicense, or scrape the Service.</li>
              <li>
                Process PHI of patients you are not authorized to handle, and you
                agree to comply with HIPAA and other applicable laws.
              </li>
              <li>
                Interfere with the Service&apos;s operation or attempt to gain
                unauthorized access.
              </li>
            </ul>

            <h2>User Content</h2>
            <p>
              You retain ownership of the data and content you submit. You grant us
              a limited license to host, process, and display that content solely
              to provide and improve the Service.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Service, including our software, branding, and content, remains
              our property. These terms do not grant you any rights to our
              intellectual property except the limited right to use the Service.
            </p>

            <h2>Warranties &amp; Disclaimers</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as
              available.&quot; We do not warrant that the Service will be
              uninterrupted or error-free. To the extent permitted by law, we
              disclaim implied warranties of merchantability and fitness for a
              particular purpose.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, our total liability arising
              out of or relating to the Service is limited to the fees you paid us
              in the twelve months preceding the claim.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify us for claims arising from your misuse of the
              Service or violation of these terms. We agree to indemnify you for
              third-party claims that the Service infringes their intellectual
              property rights, subject to standard conditions.
            </p>

            <h2>Termination</h2>
            <p>
              Either party may terminate with notice. On termination, your right to
              use the Service ends. We make a data export available for 30 days
              after termination, after which data may be deleted in accordance with
              our retention practices and any applicable BAA.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Delaware, USA,
              without regard to its conflict-of-laws rules.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the
              Service after an update constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Reach us through the{" "}
              <Link href="/contact/">contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - WatchPod",
  description:
    "How WatchPod collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-noir-900">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-coral/5 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-steel/5 blur-[120px]" />
        </div>

        <article className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
          {/* Header */}
          <div className="mb-16">
            <p className="text-coral text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm">
              Effective 2026-04-23
            </p>
          </div>

          <div className="space-y-12 text-white/70 leading-relaxed">
            <Section title="1. Information We Collect">
              <Subsection title="1.1 Information You Provide">
                <Term label="Account Information">
                  Email address, username, and any optional details you add to
                  your profile.
                </Term>
                <Term label="Pod/Group Activity">
                  When you create, join, or interact inside Pods, we collect:
                  <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                    <li>Movies you share into a Pod</li>
                    <li>Reactions, comments, and discussions</li>
                    <li>Pod membership and invites</li>
                    <li>Any content voluntarily posted by you</li>
                  </ul>
                  <p className="mt-3 text-white/50 text-sm italic">
                    Note: When you share a movie into a Pod, that movie can
                    appear on other members&rsquo; &ldquo;For You&rdquo; page
                    to enhance shared discovery and group engagement.
                  </p>
                </Term>
                <Term label="Preferences">
                  Genres, watchlists, and movie interests you select.
                </Term>
                <Term label="Subscription Details">
                  WatchPod+ plan choices and billing preferences. Payment card
                  details are not stored by us and are handled by secure
                  third-party processors.
                </Term>
              </Subsection>
            </Section>

            <Section title="2. Information Collected Automatically">
              <ul className="list-disc list-outside ml-6 space-y-1.5 text-white/60">
                <li>Device data (model, OS version, language settings)</li>
                <li>App usage metrics (screens visited, interactions, time spent)</li>
                <li>Crash logs and analytics (to improve stability and performance)</li>
              </ul>
              <p className="mt-4">
                No biometric or sensitive data is collected.
              </p>
            </Section>

            <Section title="3. How We Use Your Information">
              <Subsection title="3.1 To Operate and Improve WatchPod">
                <p>We use your data to:</p>
                <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                  <li>Enable Pod creation, membership, and collaboration</li>
                  <li>Recommend movies and personalize suggestions</li>
                  <li>
                    Display shared movies inside Pods and on other
                    members&rsquo; &ldquo;For You&rdquo; page, when relevant
                  </li>
                  <li>Improve content relevance based on how Pods interact</li>
                  <li>Maintain and optimize app performance</li>
                </ul>
              </Subsection>

              <Subsection title="3.2 Personalization">
                <p>Your interactions help us:</p>
                <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                  <li>Tailor your home feed</li>
                  <li>Recommend Pods</li>
                  <li>Highlight movies shared by people within your Pods</li>
                </ul>
              </Subsection>

              <Subsection title="3.3 Communication">
                <p>We may notify you about:</p>
                <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                  <li>Pod activity</li>
                  <li>Updates, feature releases</li>
                  <li>Subscription reminders or billing notices</li>
                </ul>
              </Subsection>

              <Subsection title="3.4 Safety, Security & Support">
                <ul className="list-disc list-outside ml-6 space-y-1.5 text-white/60">
                  <li>Prevent misuse or abuse</li>
                  <li>Enforce our Terms of Service</li>
                  <li>Detect suspicious or harmful activity</li>
                </ul>
              </Subsection>
            </Section>

            <Section title="4. Sharing Your Information">
              <p>
                We do not sell your data. We only share what is necessary to
                deliver the WatchPod experience.
              </p>

              <Subsection title="4.1 Sharing Within Pods">
                <ul className="list-disc list-outside ml-6 space-y-1.5 text-white/60">
                  <li>When you share a movie, Pod members can see that activity.</li>
                  <li>
                    Shared movies may appear on other members&rsquo; &ldquo;For
                    You&rdquo; page as part of the collaborative
                    recommendation experience.
                  </li>
                  <li>
                    Your name or profile may appear alongside your shared
                    content.
                  </li>
                </ul>
              </Subsection>

              <Subsection title="4.2 Service Providers">
                <p>This includes:</p>
                <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                  <li>Cloud hosting</li>
                  <li>Analytics platforms</li>
                  <li>Payment processors</li>
                </ul>
                <p className="mt-3">
                  They receive only the data needed to perform their functions
                  and are bound by confidentiality.
                </p>
              </Subsection>

              <Subsection title="4.3 Legal Compliance">
                <p>We may disclose information if required to:</p>
                <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                  <li>Comply with law or legal requests</li>
                  <li>Protect our users or platform integrity</li>
                </ul>
              </Subsection>
            </Section>

            <Section title="5. Your Controls & Choices">
              <p>You can:</p>
              <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                <li>Edit or delete certain profile information</li>
                <li>Leave Pods or remove shared content (where applicable)</li>
                <li>Manage notifications</li>
                <li>Cancel your subscription anytime</li>
              </ul>
              <h3 className="mt-6 mb-2 text-white font-semibold">
                Data Deletion
              </h3>
              <p>You may request account deletion. After deletion:</p>
              <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                <li>Personal information is removed from active systems</li>
                <li>
                  Pod activity may remain in aggregate or anonymized form for
                  integrity
                </li>
              </ul>
            </Section>

            <Section title="6. Security">
              <p>We apply industry-standard protections:</p>
              <ul className="list-disc list-outside ml-6 mt-3 space-y-1.5 text-white/60">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure token-based authentication</li>
                <li>Strict access controls</li>
              </ul>
              <p className="mt-4">
                However, no digital platform is fully immune to risk.
              </p>
            </Section>

            <Section title="7. Children's Privacy">
              <p>
                WatchPod is not intended for users under 13. We do not
                knowingly collect data from children under this age.
              </p>
            </Section>

            <Section title="8. International Data Use">
              <p>
                Your data may be processed in locations outside your country,
                following applicable laws and safeguards.
              </p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>
                External movie or media links in WatchPod may lead to
                third-party services. Their privacy practices are independent
                of ours.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this policy periodically. Your continued use
                signifies acceptance of these updates.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                For privacy questions or requests:{" "}
                <a
                  href="mailto:feedback@watchpod.com"
                  className="text-coral hover:text-coral-light transition-colors"
                >
                  feedback@watchpod.com
                </a>
              </p>
            </Section>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold text-white mb-3 tracking-tight">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Term({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-white font-medium mb-1">{label}</p>
      <div className="text-white/60">{children}</div>
    </div>
  );
}

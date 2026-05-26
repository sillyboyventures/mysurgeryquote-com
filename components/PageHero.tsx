import WaveDivider from "@/components/WaveDivider";

/**
 * Compact blue page hero (eyebrow + H1 + subhead) with the curved white wave
 * divider at the bottom. Used by /pricing, /integrations, /contact, /free-trial.
 */
export default function PageHero({
  eyebrow,
  title,
  subhead,
}: {
  eyebrow?: string;
  title: string;
  subhead: string;
}) {
  return (
    <section
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse at top right, #1FA9F7 0%, #0095F3 50%, #0078C7 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70 md:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="font-poppins text-4xl font-bold text-white md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{subhead}</p>
      </div>
      <WaveDivider />
    </section>
  );
}

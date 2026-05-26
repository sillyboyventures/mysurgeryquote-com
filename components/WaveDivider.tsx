/**
 * Curved white wave divider used at the bottom of blue page heroes,
 * transitioning into the white section below. Matches the homepage hero.
 */
export default function WaveDivider({ fill = "white" }: { fill?: string }) {
  return (
    <svg
      className="-mb-px block h-[50px] w-full sm:h-[80px] lg:h-[100px]"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill={fill} />
    </svg>
  );
}

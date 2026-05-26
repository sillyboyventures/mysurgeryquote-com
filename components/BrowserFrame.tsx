import Image from "next/image";

/**
 * A screenshot wrapped in a macOS-style browser chrome (traffic-light dots +
 * URL bar). Defaults to the 3200x2400 (4:3) capture dimensions used by the
 * Phase 2 product screenshots; pass width/height for differently-sized images.
 */
export default function BrowserFrame({
  src,
  alt,
  width = 3200,
  height = 2400,
  priority = false,
  url = "admin.mysurgeryquote.com",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-900/10">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center font-mono text-xs text-gray-500">
          {url}
        </div>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={95}
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

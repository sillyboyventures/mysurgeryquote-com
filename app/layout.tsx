import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Surgery Quote Software for Medical Practices | MySurgeryQuote",
    template: "%s | MySurgeryQuote",
  },
  description:
    "Surgery quote software for medical practices. Professional patient quotes in under 2 minutes with automatic fee calculations and branded PDFs. HIPAA compliant.",
  metadataBase: new URL("https://www.mysurgeryquote.com"),
  openGraph: {
    siteName: "MySurgeryQuote",
    type: "website",
    images: ["/og/home.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MySurgeryQuote",
  url: "https://www.mysurgeryquote.com",
  logo: "https://www.mysurgeryquote.com/brand/logo-white.png",
  description:
    "Quoting software for surgical practices and medical spas. Professional patient quotes in under 2 minutes with automatic fee calculations and branded PDFs. HIPAA compliant.",
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MySurgeryQuote",
  url: "https://www.mysurgeryquote.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.mysurgeryquote.com/help?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MySurgeryQuote",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    { "@type": "Offer", price: "100", priceCurrency: "USD", name: "Solo (Surgical)" },
    { "@type": "Offer", price: "150", priceCurrency: "USD", name: "Practice (Surgical)" },
    { "@type": "Offer", price: "350", priceCurrency: "USD", name: "Multi-Location (Surgical)" },
    { "@type": "Offer", price: "150", priceCurrency: "USD", name: "Med Spa" },
    { "@type": "Offer", price: "300", priceCurrency: "USD", name: "Med Spa Multi-Location" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} antialiased`}
    >
      <body className="font-inter flex min-h-screen flex-col bg-background text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

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
  metadataBase: new URL("https://mysurgeryquote-com.vercel.app"),
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

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MySurgeryQuote",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "Solo",
      price: "100",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Practice",
      price: "150",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Multi-Location",
      price: "350",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Med Spa",
      price: "150",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Med Spa Multi",
      price: "300",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Hybrid Add-On",
      price: "50",
      priceCurrency: "USD",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MySurgeryQuote",
  url: "https://mysurgeryquote.com",
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
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next"
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AML Funding | Absolute Mortgage & Lending | Philadelphia Mortgage Broker",
  description:
    "AML Funding LLC dba Absolute Mortgage & Lending is a premier mortgage broker in Philadelphia, PA. We offer Conventional, FHA, VA, Jumbo, Non-QM, DSCR, and Bank Statement loans. CO-NMLS #1910591 | NMLS #2180679. Licensed in PA, NJ, DE, MD, FL, TX & more.",
  keywords: [
    "mortgage broker Philadelphia",
    "home loans PA",
    "FHA loans",
    "VA loans",
    "conventional loans",
    "jumbo loans",
    "non-QM loans",
    "DSCR loans",
    "bank statement loans",
    "refinance",
    "AML Funding",
    "Absolute Mortgage and Lending",
    "Mai Hoang NMLS 2180679",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://absoluteml.com",
    siteName: "AML Funding - Absolute Mortgage & Lending",
    title: "AML Funding | Philadelphia's Premier Mortgage Broker",
    description:
      "Your trusted partner in homeownership. Premium mortgage solutions tailored to your unique financial goals. Licensed in 15+ states.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AML Funding - Absolute Mortgage & Lending",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AML Funding | Absolute Mortgage & Lending",
    description: "Philadelphia's premier mortgage broker. 500+ loans funded, $100M+ total volume.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://absoluteml.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MortgageBroker",
  name: "AML Funding LLC dba Absolute Mortgage & Lending",
  alternateName: "AML Funding",
  url: "https://absoluteml.com",
  logo: "https://absoluteml.com/images/aml-logo-space.png",
  telephone: "+1-814-386-7005",
  email: "teammai@absoluteml.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "600 Washington Ave",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19147",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.9363",
    longitude: "-75.1553",
  },
  areaServed: [
    { "@type": "State", name: "Pennsylvania" },
    { "@type": "State", name: "New Jersey" },
    { "@type": "State", name: "Delaware" },
    { "@type": "State", name: "Maryland" },
    { "@type": "State", name: "Florida" },
    { "@type": "State", name: "Texas" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  sameAs: [
    "https://www.facebook.com/amlfunding",
    "https://www.linkedin.com/company/amlfunding",
    "https://www.nmlsconsumeraccess.org",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mortgage Loan Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conventional Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "FHA Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VA Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jumbo Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Non-QM Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DSCR Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bank Statement Loans" } },
    ],
  },
  employee: [
    {
      "@type": "Person",
      name: "Mai Hoang",
      jobTitle: "Loan Originator",
      identifier: "NMLS #2180679",
      email: "Mai.Hoang@absoluteml.com",
    },
    {
      "@type": "Person",
      name: "Michael Mai",
      jobTitle: "Loan Consultant",
      email: "Michael.mai@absoluteml.com",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

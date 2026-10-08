import type { Metadata, Viewport } from "next";
import { Space_Mono } from "next/font/google"; 
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const spaceMono = Space_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: '--font-space' 
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nickkaramaroudisdev.com"), 
  title: {
    default: "Nikos Karamaroudis | Software Engineer",
    template: "%s // Nikos Karamaroudis",
  },
  description:
    "This is my Personal-Portfolio Website. This website is used to showcase my work and development through an engaging and clean design.",
  keywords: [
    "Nikos Karamaroudis",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Cyber-Brutalist Web Design",
    "Frontend Engineer",
    "React Developer Greece",
    "nick karamaroudis",
  ],
  authors: [{ name: "Nikos Karamaroudis" }],
  creator: "Nikos Karamaroudis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nickkaramaroudisdev.com",
    title: "Nikos Karamaroudis // Software Engineer",
    description: "Cyber-brutalist software engineering portfolio showcasing high-performance web applications and systems tooling.",
    siteName: "Nikos Karamaroudis Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Make sure to place an og-image.jpg inside your /public folder
        width: 1200,
        height: 630,
        alt: "Nikos Karamaroudis Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikos Karamaroudis // Software Engineer",
    description: "Cyber-brutalist software engineering portfolio showcasing high-performance web applications and systems tooling.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nikos Karamaroudis",
    jobTitle: "Software Engineer",
    url: "https://nickkaramaroudisdev.com",
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
    ],
    knowsAbout: ["Software Engineering", "React", "Next.js", "C#", "TypeScript", "Tailwind CSS", "SQL"],
  };

  return (
    <html lang="en" className={spaceMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#00F0FF] selection:text-black bg-[#050505]">
        <div className="noise-overlay" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
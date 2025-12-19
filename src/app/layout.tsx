import type React from "react";
import type { Metadata } from "next/types";
import { Montserrat, Dancing_Script, Roboto } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeDataProvider from "@/components/theme-color-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chitrada Durga Gowri Sankar — Portfolio",
  description: "Aspiring AI & ML Engineer with experience in Python, AI/ML, and building practical generative AI solutions.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${dancingScript.variable} ${montserrat.variable} ${roboto.variable} selection:bg-primary/20! antialiased font-montserrat h-dvh`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            <CursorProvider>
              <CustomCursor />
              <Navbar resumeLink={(process.env.RESUME as string) ?? '/DurgaGowrisankarCh_Resume.pdf'} />
              {children}
              <Footer resumeLink={(process.env.RESUME as string) ?? '/DurgaGowrisankarCh_Resume.pdf'} />
            </CursorProvider>
          </ThemeDataProvider>
        </ThemeProvider>
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "http://localhost:3000/#person",
            "name": "Chitrada Durga Gowri Sankar",
            "description": "Aspiring AI & ML Engineer and Prompt Engineer",
            "image": "/sankar.jpg",
            "url": "http://localhost:3000",
            "sameAs": [
              "https://github.com/Shankar1920",
              "https://www.linkedin.com/in/sankarch18"
            ],
            "jobTitle": "Aspiring AI & ML Engineer",
            "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Python", "Prompt Engineering", "NLP"]
          }
        `}
        </Script>

        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "http://localhost:3000/#website",
            "url": "http://localhost:3000",
            "name": "Chitrada Durga Gowri Sankar Portfolio",
            "description": "Portfolio of Chitrada Durga Gowri Sankar — Aspiring AI & ML Engineer / Prompt Engineering",
            "publisher": {
              "@id": "http://localhost:3000/#person"
            }
          }
        `}
        </Script>
      </body>
    </html>
  );
}

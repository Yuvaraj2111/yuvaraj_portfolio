import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/visuals/CustomCursor";
import { profile } from "@/data/profile";

const description =
  "Yuvaraj is a software engineer in Chennai building CI automation, test frameworks and full-stack tools for medical infusion software.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} — Software Engineer`, template: `%s — ${profile.name}` },
  description,
  keywords: ["Software Engineer", "Test Automation", "CI/CD", "Jenkins", "React", "FastAPI", "Medical Software", "Chennai"],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: `${profile.name} — Software Engineer`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — Software Engineer`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0e15" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">
        <ThemeProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative z-[2]">{children}</main>
          <Footer />
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}

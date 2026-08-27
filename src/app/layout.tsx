import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiangxiangzhi.vercel.app";

/* Display: Archivo, set tight and heavy. Carries the name and the language marks. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* Body: Instrument Sans — warm, quiet, and not Inter. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Data: every label, year, and count on the page. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chiang Xiang Zhi — Software Engineer",
  description:
    "Software engineering graduate from APU, previously a software engineering intern at IJM Corporation. I build management systems for desktop, mobile, and the web in C#, Flutter, Java, and Python. Available for graduate engineering roles.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  keywords: [
    "Software Engineer",
    "Chiang Xiang Zhi",
    "Portfolio",
    "C#",
    "Flutter",
    "Java",
    "Python",
    "APU",
    "Kuala Lumpur",
  ],
  authors: [{ name: "Chiang Xiang Zhi" }],
  openGraph: {
    title: "Chiang Xiang Zhi — Software Engineer",
    description:
      "Software engineering graduate from APU, available for graduate engineering roles. Building management systems for desktop, mobile, and the web.",
    type: "website",
    url: "/",
    siteName: "Chiang Xiang Zhi",
  },
  twitter: {
    card: "summary",
    title: "Chiang Xiang Zhi — Software Engineer",
    description:
      "Software engineering graduate from APU, available for graduate engineering roles.",
  },
};

/**
 * Paints the browser chrome to match the paper ground, and declares the page
 * light-only so browsers don't auto-invert it into a dark theme.
 */
export const viewport: Viewport = {
  themeColor: "#eae6db",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        {/* Paper grain, over everything, inert. */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}

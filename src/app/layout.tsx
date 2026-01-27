import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpaceBackgroundGlobal } from "@/app/others/layout/SpaceBackgroundGlobal";
import { SmoothScrollProvider } from "@/app/others/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/app/others/providers/ThemeProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiangxiangzhi.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chiang Xiang Zhi | Software Engineering Student",
  description:
    "Personal portfolio of Chiang Xiang Zhi - Software Engineering Student at APU, currently interning at IJM Corporation. Building robust systems and scalable solutions.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Software Engineer",
    "Developer",
    "Portfolio",
    "Java",
    "C#",
    "Python",
    "Flutter",
    "APU",
    "IJM Corporation",
  ],
  authors: [{ name: "Chiang Xiang Zhi" }],
  openGraph: {
    title: "Chiang Xiang Zhi | Software Engineering Student",
    description:
      "Personal portfolio of Chiang Xiang Zhi - Building robust systems and scalable solutions.",
    type: "website",
    url: "/",
    siteName: "Chiang Xiang Zhi",
  },
  twitter: {
    card: "summary",
    title: "Chiang Xiang Zhi | Software Engineering Student",
    description:
      "Personal portfolio of Chiang Xiang Zhi - Building robust systems and scalable solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <SpaceBackgroundGlobal />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

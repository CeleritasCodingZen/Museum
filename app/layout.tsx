import type { Metadata } from "next";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Museum of Lost Technology — Digital Archive",
  description:
    "An immersive digital archive containing humanity's forgotten technological achievements. 7 recovered artifacts spanning 2000 years of ingenuity, from antiquity to the space age.",
  keywords: [
    "museum",
    "lost technology",
    "archive",
    "ancient technology",
    "Antikythera mechanism",
    "forgotten inventions",
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
      className={`${bebasNeue.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

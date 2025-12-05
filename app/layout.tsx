import type React from "react";
import type { Metadata } from "next";
import { Exo_2, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-f1-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-f1-mono",
});

export const metadata: Metadata = {
  title: "F1 Abu Dhabi GP Tickets",
  description: "Your Formula 1 Grand Prix Abu Dhabi tickets",
  icons: {
    icon: {
      url: "/images/free-icon-circle-594739.png",
      type: "image/png",
    },
    apple: {
      url: "/images/free-icon-circle-594739.png",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${exo2.variable} ${plexMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

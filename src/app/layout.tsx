import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drinks on Chain · Pitch deck",
  description: "Trazabilidad y mercado para los vinos y singanis de altura de Bolivia.",
  // Shared by link only: the deck is not meant to be found through a search engine.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fdfcf5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${garamond.variable}`}>
      <body className="paper-grain">{children}</body>
    </html>
  );
}

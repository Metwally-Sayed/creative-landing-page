import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--next-font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--next-font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Core",
  description: "Brand strategy, identity, content, and 3D visuals that convert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

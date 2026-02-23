import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GrainyBackground from "@/components/ui/grainy-background";
import { GlobalClickSpark } from "@/components/ui/global-click-spark";

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
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-background text-foreground relative`}
      >
        <GrainyBackground />
        <div className="relative z-10 w-full min-h-svh">{children}</div>
        <GlobalClickSpark />
      </body>
    </html>
  );
}

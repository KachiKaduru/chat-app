import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./_styles/globals.css";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | Chat App",
    default: "Welcome | Chat App",
  },
  description: "Chat app created by Kachi Kaduru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}

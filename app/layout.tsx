import type { Metadata } from "next";
import "./_styles/globals.css";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat app created by Kachi Kaduru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}

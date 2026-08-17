import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARSLAN TECH'S AI Chat",
  description: "AI chat assistant by ARSLAN TECH'S",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
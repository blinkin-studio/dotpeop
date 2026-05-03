import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dotpeop",
  description: "Factory registration and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <header className="border-b border-gray-200 px-6 py-4">
          <a href="/" className="text-lg font-semibold tracking-tight">
            Dotpeop
          </a>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}

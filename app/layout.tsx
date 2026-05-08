import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Question Bank",
  description: "Interview questions and answers shared by the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/80 backdrop-blur-md">
          <div className="section-wrap flex items-center justify-between px-4 h-16">
            <Link href="/" className="text-lg font-bold text-[#4f46e5]">
              QBank
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-[#64748b] hover:text-[#4f46e5] transition-colors"
              >
                Browse
              </Link>
              <Link
                href="/addQuestion"
                className="text-sm px-4 py-2 rounded-lg bg-[#4f46e5] text-white hover:bg-[#4338ca] transition-colors font-medium"
              >
                + Add Question
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getSession } from "@/lib/session";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0   z-50 border-b border-[#e2e8f0] bg-white/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4   h-16">
            <Link href="/" className="text-lg font-bold text-[#4f46e5]">
              QBank
            </Link>
            <nav className="flex items-center gap-6  ">
              <Link
                href="/"
                className="text-sm text-[#64748b] hover:text-[#4f46e5] transition-colors"
              >
                Browse
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/addQuestion"
                    className="text-sm px-4 py-2 rounded-lg bg-[#4f46e5] text-white hover:bg-[#4338ca] transition-colors font-medium"
                  >
                    + Add Question
                  </Link>
                  <form action="/api/auth/logout" method="post">
                    <button
                      type="submit"
                      className="text-sm text-[#64748b] hover:text-[#4f46e5] transition-colors cursor-pointer"
                    >
                      Log Out
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-sm px-4 py-2 rounded-lg bg-[#4f46e5] text-white hover:bg-[#4338ca] transition-colors font-medium"
                >
                  Log In
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

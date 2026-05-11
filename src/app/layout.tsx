import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👉 DYNAMIC SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetch("/api/admin/settings", {
      cache: "no-store",
    }).then((res) => res.json());

    return {
      title: data?.title || "Default Title",
      description: data?.meta || "Default description",
    };
  } catch (e) {
    return {
      title: "Fallback Title",
      description: "Fallback description",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👉 DYNAMIC SEO (Prisma trực tiếp)
export async function generateMetadata(): Promise<Metadata> {
  try {
   const settings = await prisma.setting.findFirst();

    return {
      title: settings?.title || "Default Title",
      description: settings?.meta || "Default description",
    };
  } catch (error) {
    console.error("generateMetadata error:", error);

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
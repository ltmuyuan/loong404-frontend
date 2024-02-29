import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOONG MINT",
  description: "LOONG MINT",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {/*<script*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: `console.log('Build time: ${process.env.BUILD_TIME}')`,*/}
      {/*  }}*/}
      {/*/>*/}
    </html>
  );
}

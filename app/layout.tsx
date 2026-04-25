import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "スクリーンショット寸法計算機 | FreeLifeTools",
  description:
    "iPhone/iPad/Android/Windows/Macなどデバイスのプリセット解像度からアスペクト比・ピクセル↔インチ変換・DPI計算・物理サイズをワンクリックで計算。デザイン仕様書向けPNGエクスポートも対応。",
  keywords:
    "スクリーンショット,解像度,DPI,ピクセル,インチ変換,アスペクト比,デバイス寸法,デザイン仕様書",
  openGraph: {
    title: "スクリーンショット寸法計算機",
    description:
      "iPhone/iPad/Android/Windows/Macのスクリーンショット寸法をかんたん計算。ピクセル↔インチ変換・DPI対応・PNG仕様書出力。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-indigo-50 to-white">
        {children}
      </body>
    </html>
  );
}

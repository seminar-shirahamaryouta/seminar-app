import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "セミナー申し込み",
  description: "セミナーの申し込み・決済ページ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}

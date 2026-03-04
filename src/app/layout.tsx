import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  description:
    "大淘汰時代のビジネス生存戦略。構造理解・戦略判断・実装まで踏み込む一度きりの特別セミナー。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5/13 特別勉強会｜大規模イベントプロデュースの裏側",
  description:
    "AI時代に必要な「夢で人とお金を集める」プロジェクトの進め方。2ヶ月で5億円規模を動かした大規模イベントの裏側を、特別勉強会としてお話しします。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

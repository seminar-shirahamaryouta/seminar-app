"use client";

import { useState } from "react";

export default function Study0513() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/checkout-study-0513", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          question: (formData.get("question") as string) || "",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("エラーが発生しました。もう一度お試しください。");
        setLoading(false);
      }
    } catch {
      alert("エラーが発生しました。もう一度お試しください。");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">
            Special Study Session
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide leading-relaxed mb-4">
            【特別勉強会】5/13
            <br />
            大規模イベントプロデュースの裏側
          </h1>
          <div className="mt-8 space-y-1 text-[15px] leading-[2] text-neutral-300">
            <p>2ヶ月で5億円規模のプロジェクトを動かした、</p>
            <p>その実際の設計と運用についてお話しします。</p>
          </div>
        </div>

        {/* Main Copy */}
        <div className="space-y-10 mb-24 text-[15px] leading-[2] text-neutral-200">
          {/* Greeting */}
          <div className="space-y-1">
            <p>こんにちは、ハマーです。</p>
            <p>本日は5/13に開催する特別勉強会のご案内をお送りします。</p>
          </div>

          {/* Conclusion first */}
          <p className="text-lg font-light text-white">
            結論からお伝えします。
          </p>

          <div className="space-y-1">
            <p>AI時代において、これまでの</p>
            <p>DRM（ダイレクトレスポンスマーケティング）は</p>
            <p>急速に通用しなくなっています。</p>
          </div>

          <div className="space-y-1">
            <p>これからの時代に必要なのは、</p>
            <p>
              <span className="text-white font-medium">
                「夢」で人を集める力
              </span>
              です。
            </p>
          </div>

          <div className="border-t border-neutral-800" />

          {/* Why now */}
          <div className="space-y-4">
            <h2 className="text-base font-medium text-white">
              なぜ今このテーマなのか
            </h2>
            <p>
              AIによってコンテンツ生成のコストが限りなくゼロに近づき、
              情報そのものの価値が急速に薄れていきます。
            </p>
            <p>
              小手先のセールスコピーや反応率を競う時代は、
              すでに終わりに近づいています。
            </p>
            <p>
              これからは「何を売るか」ではなく、
              「どんな未来を共に描けるか」で人が動く時代です。
            </p>
          </div>

          {/* Theme explanation */}
          <div className="space-y-4">
            <h2 className="text-base font-medium text-white">
              今回の勉強会で扱うこと
            </h2>
            <p>
              DRMやリストシェアといった、小手先のテクニックの話ではありません。
            </p>
            <p>
              2ヶ月で5億円規模のプロジェクトを動かす際に組成した
              <span className="text-white font-medium">民間連合軍</span>
              の設計と運用について、その裏側をそのままお話しします。
            </p>
          </div>

          {/* 5 items */}
          <div className="space-y-4">
            <h2 className="text-base font-medium text-white">
              お話しする内容
            </h2>
            <ol className="space-y-3 pl-5 list-decimal marker:text-neutral-500">
              <li>AI時代にDRMが通用しなくなった構造的な理由</li>
              <li>「夢」で人を集めるとは具体的に何をすることか</li>
              <li>2ヶ月で5億円規模のプロジェクトを立ち上げた実際の流れ</li>
              <li>民間連合軍をどう組成し、どう動かしたのか</li>
              <li>大規模プロジェクトを終えた後に何が資産として残るのか</li>
            </ol>
          </div>

          {/* Supplement */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6 space-y-3">
            <p className="text-white font-medium">
              「自分は大きなプロジェクトをやる予定はない」という方へ
            </p>
            <p className="text-sm">
              今回の内容は、規模そのものの話ではありません。
              人がどんなときに動き、どんなときに集まるのか、
              その「設計の原理」をお伝えします。
            </p>
            <p className="text-sm">
              個人事業の商品ローンチ、コミュニティ運営、チーム組成など、
              ご自身の活動規模に合わせて応用していただける内容です。
            </p>
          </div>

          {/* Hikaru video reference */}
          <div className="space-y-3">
            <p>
              今回の勉強会のテーマに関連して、
              ヒカルさんが動画の中で触れている箇所があります。
            </p>
            <p>
              <a
                href="https://youtu.be/MzAUwTPINEU?si=W0IDiQgk72s2sXEr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-100 underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300 transition-colors"
              >
                参考動画はこちら（1:21:00頃から）
              </a>
            </p>
            <p className="text-sm text-neutral-400">
              事前にご視聴いただくと、当日の理解がより深まります。
            </p>
          </div>
        </div>

        {/* Seminar Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-20">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Details
          </h2>

          <dl className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                タイトル
              </dt>
              <dd className="text-neutral-200">
                5/13 特別勉強会｜大規模イベントプロデュースの裏側
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                日時
              </dt>
              <dd className="text-neutral-200">
                2026年5月13日（水）15:00〜16:30 JST
                <br />
                <span className="text-neutral-500 text-xs">
                  ※開始5分前にはご入室ください
                </span>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                開催方法
              </dt>
              <dd className="text-neutral-200">
                Zoom（申込後にURLをメールでお送りします）
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                参加費
              </dt>
              <dd className="text-white text-2xl font-light">
                ¥12,700
                <span className="text-sm text-neutral-400 ml-1">（税込）</span>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                参加条件
              </dt>
              <dd className="text-neutral-200">
                <span className="text-white font-medium">カメラオン必須</span>
                <br />
                <span className="text-neutral-500 text-xs">
                  ※顔出しいただける環境からご参加ください
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* CTA / Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10">
          <h2 className="text-center text-lg font-light tracking-wide mb-10 text-neutral-200">
            参加申し込み
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-wider text-neutral-500 mb-2"
              >
                お名前 <span className="text-neutral-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="山田 太郎"
              />
              <p className="text-xs text-neutral-600 mt-1.5">
                ※ビジネスネーム不可。本名でご入力ください。
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-wider text-neutral-500 mb-2"
              >
                メールアドレス <span className="text-neutral-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
                placeholder="taro@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="question"
                className="block text-xs tracking-wider text-neutral-500 mb-2"
              >
                当日の質問
              </label>
              <textarea
                id="question"
                name="question"
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                placeholder="自由にご記入ください（任意）"
              />
              <p className="text-xs text-neutral-600 mt-1.5">
                ※すべてのご質問にお答えできない場合があります。
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-white text-neutral-950 py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "処理中..." : "申し込む（¥12,700 税込）"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-xs text-neutral-600 space-y-1.5 leading-relaxed">
          <p className="font-medium text-neutral-500">株式会社webull</p>
          <p>大阪府大阪市西区北堀江2丁目17-15</p>
          <p>北堀江ANSOUビル5F・6F</p>
          <p className="mt-3">
            <a
              href="mailto:info@promote-business.academy"
              className="hover:text-neutral-400 transition-colors"
            >
              info@promote-business.academy
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

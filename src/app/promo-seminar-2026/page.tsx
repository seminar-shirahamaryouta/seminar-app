"use client";

import { useState } from "react";

export default function PromoSeminar2026() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/promo-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
        }),
      });
      const data = await res.json();
      if (data.redirect) {
        window.location.href = data.redirect;
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
          <p className="text-sm text-neutral-400 mb-8">
            SURVIVE 2026 にご参加いただいた方への特別ご案内です。
          </p>
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">
            限定ご案内
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide leading-relaxed mb-4">
            プロモートビジネスセミナー入門編
          </h1>
          <p className="text-sm text-neutral-400 tracking-wider">
            AIに代替されない働き方
          </p>
        </div>

        {/* Main Copy */}
        <div className="space-y-10 mb-24 text-[15px] leading-[2] text-neutral-200">
          <div className="space-y-6">
            <p>着実に蓄積しながら、AIに代替されないビジネスを学びませんか？</p>

            <p>
              誰でも簡単に、短期間で稼げる——
              <br />
              そのような安易なことはお伝えしません。
              <br />
              そんな方法は、ありません。
            </p>

            <p>
              市場やプラットフォームのトレンドで一時的に稼げたとしても、
              <br />
              流行りの手法やテクニックは、
              <br />
              どれだけ努力して身につけても、
              <br />
              一年後、いや時代の変化の早い今は、半年後には使えなくなります。
            </p>

            <p>それでも、次々と新しい手法を追いかけ続けることになる。</p>

            <p className="text-lg italic text-white">
              永遠とショートを繰り返すことになる。
            </p>
          </div>

          <div className="border-t border-neutral-800" />

          {/* こんな人へ */}
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
              こんな方へ
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>起業・副業をしたいが、売れる「強み」や「経験」が見つからない方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>集客が減り、新しい方向性を探している講師・コンサル・カウンセラーの方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>流行りの手法を試してきたが、なかなか結果が出ていない方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>自分がいなくてもビジネスが回る仕組みを手に入れたい方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>持ち出し資金を抑えながら、大きなビジネスをしたい方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>AIを活用した新しいビジネスの形を探している方</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>友人や家族に堂々と語れる、誇れるビジネスをしたい方</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-800" />

          {/* 当日お伝えすること */}
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
              当日お伝えすること
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>AI時代における「プロモートビジネス」の全体像</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>生産手段を持たずに戦う人が消えていく理由</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>一流の人とパートナーシップを組む具体的な方法</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>後発でも圧倒的に差をつけるポジション戦略</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>AIを使った新しいマネタイズの方法</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>会社員から副業で始めて28,000人を集客できるようになった事例</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>流行りに左右されない、未来に向けて資産を蓄積できるビジネス構築思考</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Seminar Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            セミナー詳細
          </h2>

          <dl className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                日時
              </dt>
              <dd className="text-neutral-200">
                2026年4月10日（金）20:00〜22:30
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
              <dd className="text-neutral-200">Zoom（申込後にURL送付）</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                参加費
              </dt>
              <dd className="text-white text-2xl font-light">
                無料
                <span className="text-sm text-neutral-400 ml-1">（SURVIVE 2026参加者限定）</span>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                定員
              </dt>
              <dd className="text-neutral-200">15名限定</dd>
            </div>
          </dl>
        </div>

        {/* 無料招待案内 */}
        <div className="bg-neutral-800 border border-neutral-600 rounded-sm p-10 mb-10">
          <p className="text-xs tracking-[0.2em] text-amber-400/80 uppercase mb-4">
            SURVIVE 2026 参加者限定
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            通常¥2,026のセミナーを、SURVIVE 2026参加者限定で
            <span className="text-white font-medium">無料</span>
            でご招待します。
          </p>
        </div>

        {/* Notes */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            ご注意事項
          </h2>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>・アーカイブはありません</p>
            <p>・一般募集はしていません。SURVIVE 2026参加者への限定案内です。</p>
          </div>
        </div>

        {/* 申し込みフォーム */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10">
          <h2 className="text-center text-lg font-light tracking-wide mb-10 text-neutral-200">
            無料で参加申し込み
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
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-white text-neutral-950 py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "処理中..." : "無料で申し込む →"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-xs text-neutral-600">
          <p>Promote Business Seminar 2026</p>
        </div>
      </div>
    </main>
  );
}

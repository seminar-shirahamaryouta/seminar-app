"use client";

import { useState } from "react";

const REFERRAL_SOURCES = [
  "ハマーのメルマガ・LINE",
  "いれぶん塾での紹介",
  "AI Dreamers Productionのメルマガ",
  "知人・友人からの紹介",
  "その他",
];

export default function Survive0416() {
  const [loading, setLoading] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const referral = formData.get("referral") as string;

    try {
      const res = await fetch("/api/checkout-survive-0416", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          referral:
            referral === "その他"
              ? `その他: ${formData.get("referralOther") as string}`
              : referral,
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
            Special Seminar
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide leading-relaxed mb-4">
            SURVIVE 2026
          </h1>
          <p className="text-sm text-neutral-400 tracking-wider">
            大淘汰時代のポジション再設計セミナー
          </p>
          <div className="mt-8 space-y-1 text-[15px] leading-[2] text-neutral-300">
            <p>AI時代に何を資産として残していくべきなのか？</p>
            <p>新しい時代のマーケティングをお伝えします。</p>
          </div>
        </div>

        {/* Main Copy */}
        <div className="space-y-10 mb-24 text-[15px] leading-[2] text-neutral-200">
          <p className="text-lg font-light text-white">
            大淘汰時代のビジネス生存戦略。
          </p>

          <div className="space-y-1">
            <p>これからは、経済格差という話ではありません。</p>
            <p>「伸びる人」と「停滞する人」に分かれるのではない。</p>
            <p>
              <span className="text-white font-medium">
                「残る人」と「消える人」
              </span>
              に分かれます。
            </p>
          </div>

          <div className="space-y-1">
            <p>その分岐は、すでに始まっています。</p>
            <p>問題は能力ではありません。</p>
            <p>
              問題は、
              <span className="text-white font-medium">
                残れる位置に立てているか
              </span>
              です。
            </p>
          </div>

          <div className="space-y-1">
            <p>様子を見ている余裕はありません。</p>
            <p>今どこに立っているのかを正確に把握し、</p>
            <p>立ち位置を変える決断を、いま下せるか。</p>
            <p>それが問われています。</p>
          </div>

          <p>現状に留まれば、どれだけ努力しても市場に飲み込まれます。</p>

          <div className="border-t border-neutral-800" />

          <p>今回の特別セミナーでは、</p>

          <ul className="space-y-3 pl-1">
            <li className="flex gap-3">
              <span className="text-neutral-600 shrink-0">—</span>
              <span>
                いま何が起きているのか
                <span className="text-neutral-500 text-sm ml-2">
                  （構造理解）
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neutral-600 shrink-0">—</span>
              <span>
                どのポジションを取るべきか
                <span className="text-neutral-500 text-sm ml-2">
                  （戦略判断）
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neutral-600 shrink-0">—</span>
              <span>
                マーケティングをどう切り替えるか
                <span className="text-neutral-500 text-sm ml-2">（実装）</span>
              </span>
            </li>
          </ul>

          <p>ここまで踏み込みます。</p>

          <div className="space-y-1">
            <p>これはモチベーションセミナーではありません。</p>
            <p>耳障りのいい話もしません。現実の話をします。</p>
          </div>

          <p className="text-neutral-500 text-sm">
            （大淘汰が始まっていることには、すでに気づいているはずです。）
          </p>

          <div className="space-y-1">
            <p className="text-white font-medium">
              人生、冷酷にもタイミングがすべてです。
            </p>
            <p>一度きりのセミナー、ぜひ参加ください。</p>
          </div>
        </div>

        {/* Seminar Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-20">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Seminar Details
          </h2>

          <dl className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                タイトル
              </dt>
              <dd className="text-neutral-200">
                SURVIVE 2026｜大淘汰時代のポジション再設計セミナー
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                日時
              </dt>
              <dd className="text-neutral-200">
                2026年4月16日（木）20:00〜22:00
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
                ¥5,500
                <span className="text-sm text-neutral-400 ml-1">（税込）</span>
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

        {/* Conditions */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-20">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Conditions
          </h2>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>
              ・事前にスケジュールを確保し、集中して参加できる方のみ
            </p>
            <p>・アーカイブはありません</p>
            <p className="text-white mt-6">
              その場にいる人だけに話します。
            </p>
          </div>
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

            <fieldset>
              <legend className="block text-xs tracking-wider text-neutral-500 mb-3">
                このセミナーをどこでお知りになりましたか？{" "}
                <span className="text-neutral-600">*</span>
              </legend>
              <div className="space-y-2">
                {REFERRAL_SOURCES.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 px-4 py-3 border border-neutral-800 rounded-sm cursor-pointer hover:border-neutral-600 has-[:checked]:border-neutral-500 has-[:checked]:bg-neutral-800/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="referral"
                      value={option}
                      required
                      onChange={() => setSelectedReferral(option)}
                      className="appearance-none w-3.5 h-3.5 border border-neutral-600 rounded-full checked:border-white checked:bg-white checked:shadow-[inset_0_0_0_2px_#171717] shrink-0 transition-colors"
                    />
                    <span className="text-sm text-neutral-200">{option}</span>
                  </label>
                ))}
              </div>
              {selectedReferral === "その他" && (
                <input
                  type="text"
                  name="referralOther"
                  required
                  className="w-full mt-2 bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
                  placeholder="紹介者名・媒体名などをご記入ください"
                />
              )}
            </fieldset>

            <div>
              <label
                htmlFor="question"
                className="block text-xs tracking-wider text-neutral-500 mb-2"
              >
                当日聞きたいこと
              </label>
              <textarea
                id="question"
                name="question"
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                placeholder="自由にご記入ください"
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
              {loading ? "処理中..." : "申し込む — ¥5,500"}
            </button>
          </form>

          <p className="text-xs text-neutral-600 mt-6 text-center">
            ※4/8にお申し込みいただいた方は、こちらのフォームからではなく
            <br />
            info@promote-business.academy までご連絡ください。
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-xs text-neutral-600">
          <p>SURVIVE 2026</p>
        </div>
      </div>
    </main>
  );
}

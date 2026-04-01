export default function PromoSeminar2026() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">
            Invitation Only
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide leading-relaxed mb-4">
            プロモートビジネスセミナー入門編
          </h1>
          <p className="text-sm text-neutral-400 tracking-wider">
            AI時代に、誰かの力を借りて大きく動く。
          </p>
        </div>

        {/* Main Copy */}
        <div className="space-y-10 mb-24 text-[15px] leading-[2] text-neutral-200">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
              「自分が商品にならなくていい。」
            </p>
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
              「AIを使いこなせなくてもいい。」
            </p>
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
              「一流の人と組んで、プロデュースする側に回る。」
            </p>
          </div>

          <div className="border-t border-neutral-800" />

          {/* こんな人へ */}
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
              For You
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  AIを事業に入れたいけど、何から始めればいいかわからない
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  自分のスキルや経験をどう活かすか迷っている
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>一人でやることに限界を感じている</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>後発でも勝てるポジションを見つけたい</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-800" />

          {/* 当日お伝えすること */}
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
              What You Will Learn
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  AI時代における「プロモートビジネス」の全体像
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  生産手段を持たずに戦う人が消えていく理由
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  一流の人とパートナーシップを組む具体的な方法
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-600 shrink-0">—</span>
                <span>
                  後発でも圧倒的に差をつける3つのポジション戦略
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Seminar Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Seminar Details
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
                ¥TBD
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

        {/* Special Offer */}
        <div className="bg-neutral-800 border border-neutral-600 rounded-sm p-10 mb-10">
          <p className="text-xs tracking-[0.2em] text-amber-400/80 uppercase mb-4">
            SURVIVE 2026 参加者限定
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed mb-6">
            Stripe決済画面でクーポンコードを入力すると
            <span className="text-white font-medium"> ¥2,026引き </span>
            になります。
          </p>
          <div className="bg-neutral-950 border border-neutral-700 rounded-sm px-6 py-4 flex items-center justify-between">
            <code className="text-xl md:text-2xl font-mono tracking-widest text-white">
              SURVIVE2026
            </code>
            <span className="text-xs text-neutral-500 shrink-0 ml-4">
              coupon code
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Notes
          </h2>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>・アーカイブはありません</p>
            <p>・一般募集はしていません。SURVIVE 2026参加者への限定案内です。</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#"
            className="inline-block w-full max-w-md bg-white text-neutral-950 py-5 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
          >
            席を確保する &rarr;
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-xs text-neutral-600">
          <p>Promote Business Seminar 2026</p>
        </div>
      </div>
    </main>
  );
}

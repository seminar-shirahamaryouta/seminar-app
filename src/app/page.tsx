import SeminarForm from "@/components/seminar-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">
            Special Seminar
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide leading-relaxed mb-4">
            SURVIVE 2026
          </h1>
          <p className="text-sm text-neutral-400 tracking-wider">
            大淘汰時代のポジション再設計セミナー
          </p>
        </div>

        {/* Main Copy */}
        <div className="space-y-8 mb-20 text-[15px] leading-[2] text-neutral-300">
          <p className="text-lg font-light text-neutral-100">
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

          {/* Divider */}
          <div className="border-t border-neutral-800 my-12" />

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
        <div className="border border-neutral-800 rounded-sm p-8 mb-16">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Seminar Details
          </h2>

          <dl className="space-y-5 text-sm">
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
                2026年3月11日（水）20:00〜21:30
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
              <dd className="text-neutral-200">Zoom（申込後、URL送付）</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                参加費
              </dt>
              <dd className="text-white text-lg font-light">¥5,500（税込）</dd>
            </div>
          </dl>

          <div className="mt-6 pt-6 border-t border-neutral-800 space-y-2 text-xs text-neutral-500">
            <p>※現在コンサル契約中の方・PBA生は無料</p>
            <p>
              ※クーポンコードをお持ちの方はStripe決済画面で入力してください
            </p>
            <p>※契約中の方は間違って決済しないようご注意ください。</p>
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-16 space-y-3 text-sm text-neutral-400">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
            Conditions
          </h2>
          <p>
            ・事前にスケジュールを確保し、カメラオンで集中して参加できる方のみ
          </p>
          <p>・アーカイブはありません</p>
          <p className="text-neutral-300 mt-4">
            その場にいる人だけに話します。
          </p>
        </div>

        {/* CTA / Form */}
        <div className="border border-neutral-800 rounded-sm p-8">
          <h2 className="text-center text-lg font-light tracking-wide mb-8 text-neutral-200">
            参加申し込み
          </h2>
          <SeminarForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-neutral-600">
          <p>SURVIVE 2026</p>
        </div>
      </div>
    </main>
  );
}

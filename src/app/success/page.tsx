import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">
        {/* 完了メッセージ */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 text-center">
          <div className="text-green-400 text-5xl mb-6">&#10003;</div>
          <h1 className="text-2xl font-light tracking-wide text-white mb-4">
            お申し込み完了
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8">
            決済が完了しました。確認メールをお送りしましたので、ご確認ください。
          </p>
          <Link
            href="/"
            className="inline-block text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            トップページに戻る
          </Link>
        </div>

        {/* 特別ご案内 */}
        <div className="mt-8 bg-yellow-400 rounded-sm p-10">
          <h2 className="text-xl font-medium tracking-wide text-neutral-950 mb-6">
            申込者限定の特別ご案内
          </h2>
          <div className="space-y-4 text-sm text-neutral-800 leading-relaxed mb-8">
            <p>
              <span className="text-neutral-950 font-medium">
                4月10日（金）20:00〜22:30
              </span>
              <br />
              <span className="text-base text-neutral-950 font-medium">
                プロモートビジネスセミナー入門編
              </span>
              を開催します。
            </p>
            <p>
              本セミナー参加者限定で
              <span className="text-neutral-950 font-bold">¥2,026引き</span>
              のクーポンをご用意しました。
              <br />
              Stripe決済画面でコードを入力してください。
            </p>
          </div>
          <div className="bg-neutral-950 rounded-sm px-6 py-4 flex items-center justify-between mb-8">
            <code className="text-xl md:text-2xl font-mono tracking-widest text-white">
              SURVIVE2026
            </code>
            <span className="text-xs text-neutral-400 shrink-0 ml-4">
              coupon code
            </span>
          </div>
          <a
            href="https://seminar-app-two.vercel.app/promo-seminar-2026"
            className="inline-block w-full text-center bg-neutral-950 text-white py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors"
          >
            セミナーの詳細を見る &rarr;
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-neutral-600">
          <p>SURVIVE 2026</p>
        </div>
      </div>
    </main>
  );
}

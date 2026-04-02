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

        {/* 特別ご招待 */}
        <div className="mt-8 bg-yellow-400 rounded-sm p-10">
          <h2 className="text-xl font-bold tracking-wide text-neutral-950 mb-6 text-center">
            ＼ 申込者限定の特別ご招待 ／
          </h2>
          <div className="space-y-4 text-sm text-neutral-800 leading-relaxed mb-8">
            <p>
              <span className="text-neutral-950 font-medium">
                4月14日（火）20:00〜22:30
              </span>
              <br />
              <span className="text-base text-neutral-950 font-medium">
                プロモートビジネスセミナー入門編
              </span>
            </p>
            <p className="text-neutral-950 font-bold text-base">
              通常¥2,026のセミナーを無料でご招待します
            </p>
          </div>
          <a
            href="https://seminar-app-two.vercel.app/promo-seminar-2026"
            className="inline-block w-full text-center bg-neutral-950 text-white py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors"
          >
            無料で申し込む &rarr;
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

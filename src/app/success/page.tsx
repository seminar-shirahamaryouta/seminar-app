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
        <div className="mt-8 bg-neutral-900 border border-neutral-700 rounded-sm p-10">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
            Special Offer
          </p>
          <h2 className="text-lg font-light tracking-wide text-white mb-4">
            【特別ご案内】
          </h2>
          <div className="space-y-3 text-sm text-neutral-300 leading-relaxed mb-8">
            <p>
              <span className="text-white font-medium">4/10（日）</span>開催
            </p>
            <p className="text-base text-white font-light">
              プロモートビジネスセミナー入門編
            </p>
            <p className="text-neutral-400">
              SURVIVE 2026参加者限定で割引価格でご案内します。
            </p>
          </div>
          <a
            href="#"
            className="inline-block w-full text-center bg-white text-neutral-950 py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
          >
            詳細・申し込みはこちら
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

import Link from "next/link";

export default function PromoSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">
        {/* 完了メッセージ */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 text-center">
          <div className="text-green-400 text-5xl mb-6">&#10003;</div>
          <h1 className="text-2xl font-light tracking-wide text-white mb-4">
            お申し込みありがとうございます。
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8">
            確認メールをお送りしました。ご確認ください。
          </p>
        </div>

        {/* セミナー情報 */}
        <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-sm p-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            セミナー情報
          </h2>
          <dl className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                セミナー名
              </dt>
              <dd className="text-neutral-200">
                プロモートビジネスセミナー入門編
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                日時
              </dt>
              <dd className="text-neutral-200">
                2026年4月14日（火）20:00〜22:30
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                Zoom URL
              </dt>
              <dd className="text-neutral-200 break-all">
                <a
                  href="https://us02web.zoom.us/j/83039552812"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  https://us02web.zoom.us/j/83039552812
                </a>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                ミーティングID
              </dt>
              <dd className="text-neutral-200">830 3955 2812</dd>
            </div>
          </dl>
        </div>

        {/* メッセージ */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-300 leading-relaxed">
            当日お会いできることを楽しみにしています。
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-neutral-600">
          <p>Promote Business Seminar 2026</p>
        </div>
      </div>
    </main>
  );
}

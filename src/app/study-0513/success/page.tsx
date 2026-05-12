import Link from "next/link";

export default function Study0513SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Confirmation */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 text-center mb-10">
          <div className="text-green-400 text-5xl mb-6">&#10003;</div>
          <h1 className="text-2xl font-light tracking-wide text-white mb-4">
            お申し込みありがとうございます
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            決済が完了しました。
            <br />
            確認メールをお送りしましたので、ご確認ください。
          </p>
        </div>

        {/* Event Details */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-8">
            Event Details
          </h2>

          <dl className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                日時
              </dt>
              <dd className="text-neutral-200">
                2026年5月13日（水）15:00〜16:30 JST
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                形式
              </dt>
              <dd className="text-neutral-200">Zoom</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                Zoom URL
              </dt>
              <dd className="text-neutral-200 break-all">
                <a
                  href="https://us02web.zoom.us/j/89256617909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-100 underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300 transition-colors"
                >
                  https://us02web.zoom.us/j/89256617909
                </a>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-neutral-500 w-32 shrink-0 mb-1 sm:mb-0">
                ミーティングID
              </dt>
              <dd className="text-neutral-200">892 5661 7909</dd>
            </div>
          </dl>
        </div>

        {/* Notes */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 mb-10">
          <h2 className="text-xs tracking-[0.2em] text-neutral-500 uppercase mb-6">
            Notes
          </h2>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li>
              <span className="text-white font-medium">カメラオン必須</span>
              でのご参加をお願いします。
            </li>
            <li>開始5分前にはご入室ください。</li>
            <li>
              確認メールが届かない場合は、
              <br className="sm:hidden" />
              <a
                href="mailto:info@promote-business.academy"
                className="text-neutral-100 underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300 transition-colors"
              >
                info@promote-business.academy
              </a>
              までご連絡ください。
            </li>
          </ul>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/study-0513"
            className="inline-block text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            勉強会ページに戻る
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-xs text-neutral-600">
          <p>5/13 特別勉強会</p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function Study0513SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-10 text-center">
          <div className="text-green-400 text-5xl mb-6">&#10003;</div>
          <h1 className="text-2xl font-light tracking-wide text-white mb-4">
            お申し込み完了
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8">
            決済が完了しました。
            <br />
            確認メールをお送りしましたので、ご確認ください。
          </p>
          <Link
            href="/study-0513"
            className="inline-block text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            勉強会ページに戻る
          </Link>
        </div>

        <div className="text-center mt-16 text-xs text-neutral-600">
          <p>5/13 特別勉強会</p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-green-500 text-5xl mb-4">&#10003;</div>
        <h1 className="text-2xl font-bold mb-4">お申し込み完了</h1>
        <p className="text-gray-600 mb-6">
          決済が完了しました。確認メールをお送りしましたので、ご確認ください。
        </p>
        <Link
          href="/"
          className="inline-block text-blue-600 hover:underline"
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}

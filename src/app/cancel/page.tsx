import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-yellow-500 text-5xl mb-4">!</div>
        <h1 className="text-2xl font-bold mb-4">お申し込みがキャンセルされました</h1>
        <p className="text-gray-600 mb-6">
          決済がキャンセルされました。再度お申し込みいただく場合は、下記からどうぞ。
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          申し込みページに戻る
        </Link>
      </div>
    </main>
  );
}

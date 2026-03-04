"use client";

import { useState } from "react";

export default function SeminarForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch {
      alert("エラーが発生しました。もう一度お試しください。");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="taro@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          電話番号
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="090-1234-5678"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          会社名
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="株式会社サンプル"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "処理中..." : "申し込む（決済へ進む）"}
      </button>
    </form>
  );
}

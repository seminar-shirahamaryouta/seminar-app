"use client";

import { useState } from "react";

const BUSINESS_TYPES = [
  "経営者",
  "フリーランス・個人事業主",
  "会社員（副業あり）",
  "会社員（副業なし）",
];

const REVENUE_RANGES = [
  "〜100万",
  "100〜500万",
  "500〜1000万",
  "1000万以上",
];

const CURRENT_SITUATIONS = [
  "すでに市場の変化を強く感じている",
  "何か違和感はあるが、まだ行動していない",
  "正直、まだ危機感はそこまでない",
  "変化をチャンスだと感じている",
];

function RadioGroup({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="block text-xs tracking-wider text-neutral-500 mb-3">
        {label} <span className="text-neutral-600">*</span>
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 px-4 py-3 border border-neutral-800 rounded-sm cursor-pointer hover:border-neutral-600 has-[:checked]:border-neutral-500 has-[:checked]:bg-neutral-800/50 transition-colors"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required
              className="appearance-none w-3.5 h-3.5 border border-neutral-600 rounded-full checked:border-white checked:bg-white checked:shadow-[inset_0_0_0_2px_#171717] shrink-0 transition-colors"
            />
            <span className="text-sm text-neutral-200">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function SeminarForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      businessType: formData.get("businessType") as string,
      revenue: formData.get("revenue") as string,
      situation: formData.get("situation") as string,
      question: (formData.get("question") as string) || "",
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="name"
          className="block text-xs tracking-wider text-neutral-500 mb-2"
        >
          お名前 <span className="text-neutral-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
          placeholder="山田 太郎"
        />
        <p className="text-xs text-neutral-600 mt-1.5">
          ※ビジネスネーム不可。本名でご入力ください。
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs tracking-wider text-neutral-500 mb-2"
        >
          メールアドレス <span className="text-neutral-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
          placeholder="taro@example.com"
        />
      </div>

      <RadioGroup
        name="businessType"
        label="現在のビジネス形態"
        options={BUSINESS_TYPES}
      />

      <RadioGroup
        name="revenue"
        label="現在の年商・売上規模"
        options={REVENUE_RANGES}
      />

      <RadioGroup
        name="situation"
        label="今の状況に最も近いもの"
        options={CURRENT_SITUATIONS}
      />

      <div>
        <label
          htmlFor="question"
          className="block text-xs tracking-wider text-neutral-500 mb-2"
        >
          当日聞きたいこと
        </label>
        <textarea
          id="question"
          name="question"
          rows={3}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
          placeholder="自由にご記入ください"
        />
        <p className="text-xs text-neutral-600 mt-1.5">
          ※すべてのご質問にお答えできない場合があります。
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-white text-neutral-950 py-4 rounded-sm text-sm font-medium tracking-wider hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "処理中..." : "申し込む — ¥5,500"}
      </button>
    </form>
  );
}

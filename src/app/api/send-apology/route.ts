import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getParticipants } from "@/lib/airtable";

function apologyHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.8;">
      <p>${name} 様</p>

      <p>先日はSURVIVE 2026｜大淘汰時代のポジション再設計セミナーにご参加いただき、誠にありがとうございました。</p>

      <p>途中、停電・パソコンの充電切れにより、最後までお伝えできず大変申し訳ありませんでした。<br>現在イギリスに滞在中ですが、物件ではなく地区一帯が停電状態となり、その後、電気のない状態で一夜を過ごしました。</p>

      <p>大枠は口頭でお伝えできましたが、セミナー中に話せなかった部分については、後日録画してお送りします。<br>4/13の週中にお届けできるよう準備しております。少しお待ちください。</p>

      <p>また、4月14日（火）20:00〜開催の<br>「プロモートビジネスセミナー入門編」についても、改めてご案内させていただきます。</p>

      <p>4/8にお申し込みいただいた方は、無料でご参加いただけます。</p>

      <p><strong>▼参加申込はこちら</strong><br>
      <a href="https://seminar-app-two.vercel.app/promo-seminar-2026">https://seminar-app-two.vercel.app/promo-seminar-2026</a></p>

      <p>ご不便をおかけして申し訳ありませんでした。<br>引き続きよろしくお願いいたします。</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 13px;">ハマー（白濱良太）<br>info@promote-business.academy</p>
    </div>
  `;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // 4/8参加者（SURVIVE 2026、3/11開催を除く）を取得
  const participants = await getParticipants(
    undefined,
    "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー"
  );

  let sent = 0;
  let failed = 0;
  const results: string[] = [];

  for (const p of participants) {
    try {
      await resend.emails.send({
        from: "SURVIVE 2026 <info@promote-business.academy>",
        replyTo: "info@promote-business.academy",
        to: p.email,
        subject: "【お詫び】先日のSURVIVE 2026セミナーについて",
        html: apologyHtml(p.name),
      });
      sent++;
      results.push(`✅ ${p.name} (${p.email})`);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      results.push(`❌ ${p.name} (${p.email}): ${msg}`);
    }
  }

  return NextResponse.json({
    sent,
    failed,
    total: participants.length,
    results,
  });
}

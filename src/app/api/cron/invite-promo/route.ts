import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getParticipants } from "@/lib/airtable";

function inviteHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <p>${name} 様</p>

      <p>本日はSURVIVE 2026にご参加いただき、<br>ありがとうございました。</p>

      <p>参加者の方への特別なご案内です。</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

      <p style="margin: 0;">
        <strong>4月10日（金）20:00〜22:30</strong><br>
        <span style="font-size: 18px;">「プロモートビジネスセミナー入門編」</span>
      </p>

      <p style="margin: 16px 0;">通常：¥2,026</p>

      <p style="font-size: 16px; font-weight: bold;">
        SURVIVE 2026参加者は無料でご招待します。
      </p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

      <p>SURVIVE 2026でお伝えした<br>「では、具体的に何をすればいいのか？」<br>その答えをお伝えするセミナーです。</p>

      <p style="margin: 24px 0;">
        <strong>▼ 参加者限定の無料申込フォーム</strong><br>
        <a href="https://seminar-app-two.vercel.app/promo-seminar-2026">https://seminar-app-two.vercel.app/promo-seminar-2026</a>
      </p>

      <p style="color: #888; font-size: 13px;">
        このURLは参加者限定です。<br>シェアはご遠慮ください。
      </p>

      <p>お会いできることを楽しみにしています。</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">ハマー</p>
    </div>
  `;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const participants = await getParticipants("completed");

  let sent = 0;
  let failed = 0;

  for (const p of participants) {
    try {
      await resend.emails.send({
        from: "SURVIVE 2026 <info@promote-business.academy>",
        to: p.email,
        subject: "【参加者限定】4月10日セミナーへの無料ご招待",
        html: inviteHtml(p.name),
      });
      sent++;
    } catch (err) {
      console.error(`Failed to send invite to ${p.email}:`, err);
      failed++;
    }
  }

  console.log(`Invite-promo: sent=${sent}, failed=${failed}`);

  return NextResponse.json({ sent, failed, total: participants.length });
}

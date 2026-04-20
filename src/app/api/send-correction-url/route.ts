import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENTS = [
  { name: "白濱良太", email: "shirahama@webull.jp" },
  { name: "数多昌典", email: "m.kazuta@gmail.com" },
  { name: "丸山ユウジ", email: "yuji@malmal.com" },
  { name: "坂口幸代", email: "kazusachi0329.2@gmail.com" },
  { name: "粕谷正志", email: "m-kasuya@da2.so-net.ne.jp" },
  { name: "有冨　美穂", email: "princetiacustomer@gmail.com" },
  { name: "上田敏彦", email: "tuedaoffice@gmail.com" },
  { name: "吉村 知子", email: "tomoko112235@yahoo.co.jp" },
  { name: "上市真也", email: "kamiichi@shinjinji.com" },
  { name: "勝 美穂", email: "micchy8888@gmail.com" },
];

function correctionHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.8;">
      <p>${name} さん</p>

      <p>ハマーです。</p>

      <p>先ほどお送りした動画ですが、<br>プラットフォームの不具合により視聴できない状況が発生しました。<br>大変失礼いたしました。</p>

      <p>改めて新しいURLをお送りします。</p>

      <p><strong>▼ 動画はこちら（新しいURL）</strong><br>
      <a href="https://vimeo.com/1184769550/bc5a0a54c1?share=copy&fl=sv&fe=ci">https://vimeo.com/1184769550/bc5a0a54c1?share=copy&fl=sv&fe=ci</a></p>

      <p>視聴期限：4/27まで</p>

      <p>先ほどのURLは無効です。<br>こちらの新しいURLからご視聴ください。</p>

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
  let sent = 0;
  let failed = 0;
  const results: string[] = [];

  for (const r of RECIPIENTS) {
    try {
      await resend.emails.send({
        from: "ハマー <info@promote-business.academy>",
        replyTo: "info@promote-business.academy",
        to: r.email,
        subject: "【訂正】動画URLを変更しました",
        html: correctionHtml(r.name),
      });
      sent++;
      results.push(`✅ ${r.name} (${r.email})`);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      results.push(`❌ ${r.name} (${r.email}): ${msg}`);
    }
  }

  return NextResponse.json({ sent, failed, total: RECIPIENTS.length, results });
}

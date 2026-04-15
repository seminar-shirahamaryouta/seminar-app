import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENTS = [
  { name: "白濱良太", email: "shirahama@webull.jp" },
  { name: "数多昌典", email: "m.kazuta@gmail.com" },
  { name: "丸山ユウジ", email: "yuji@malmal.com" },
  { name: "坂口幸代", email: "kazusachi0329.2@gmail.com" },
  { name: "粕谷正志", email: "m-kasuya@da2.so-net.ne.jp" },
];

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
        subject: "【お詫び】先ほどのメールは誤送信です",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.8;">
            <p>${r.name} さん</p>
            <p>先ほど「【お詫び】先日のSURVIVE 2026セミナーについて」というメールが<br>誤って再送信されてしまいました。</p>
            <p>システムの不具合によるものです。<br>ご迷惑をおかけして大変申し訳ございませんでした。</p>
            <p>先ほどのメールはどうぞ無視してください。</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #888; font-size: 13px;">ハマー（白濱良太）<br>info@promote-business.academy</p>
          </div>
        `,
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

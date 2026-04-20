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

function videoHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.8;">
      <p>${name} さん</p>

      <p>ハマーです。</p>

      <p>4/8「SURVIVE 2026」セミナーに参加いただきありがとうございました。</p>

      <p>こちらの停電により最後までお伝えできず、<br>大変申し訳ありませんでした。</p>

      <p>先日、追加でセミナーを行いました。<br>伝えきれなかった部分の録画動画をお送りします。</p>

      <p><strong>▼ 動画はこちら</strong><br>
      <a href="https://vimeo.com/1184752239/d0ab1cd6f3">https://vimeo.com/1184752239/d0ab1cd6f3</a></p>

      <p>視聴期限：4/27まで</p>

      <p style="border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 12px 0; margin: 24px 0; font-weight: bold;">■ 動画の補足</p>

      <p><strong>★ 現在の状況</strong></p>

      <p>メールアドレスを集めて、教育して、売る。<br>SNSで発信して、フォロワーを増やす。</p>

      <p>それだけでは、もう不十分です。</p>

      <p>みんなが同じことをやっていて、反応が取れなくなっています。<br>（SNSを見ると、異様な状況です）</p>

      <p><strong>★ これからのやり方</strong></p>

      <p>「ゼロパーティデータ」を集め、<br>お客さん一人ひとりに合わせた提案をする<br>1on1マーケティングに切り替えることをおすすめします。</p>

      <p>AIのメモリ機能やObsidianなどを活用して、<br>自分自身のパーソナルデータを集めてAI分析することを<br>進められているかと思います。</p>

      <p>次のステップは、自分自身だけではなく<br>ビジネスに関わる方やお客さんのデータを集めて<br>AI分析・活用していくことです。</p>

      <p>「ゼロパーティデータ」は、信頼関係がないと集まりません。<br>直接対話する場をつくることが、一番の近道です。<br>そこでおすすめなのはイベントです。</p>

      <p>4/14の「プロモートビジネスセミナー」に参加いただいた方は、<br>ぜひ参考にしてください。<br>（私のプロデュースしているADP経由でセミナーに参加いただきましたが<br>イベントによって人を集める流れはイメージつくかと思います）</p>

      <p>${name} さんのビジネスの参考になれば嬉しいです。</p>

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
        subject: "【動画】4/8セミナーで伝えきれなかった部分をお送りします",
        html: videoHtml(r.name),
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

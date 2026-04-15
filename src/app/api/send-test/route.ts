import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "ハマー <info@promote-business.academy>",
      replyTo: "info@promote-business.academy",
      to: "shirahama@webull.jp",
      subject: "昨日のセミナーありがとうございました",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.8;">
          <p>ryota shirahama さん</p>

          <p>こんにちは。</p>

          <p>昨日は遅くまでセミナーに参加いただき<br>ありがとうございました。</p>

          <p>昨日のセミナーでお伝えしたこと、<br>自分が商品にならずにビジネスをする方法です。</p>

          <p>一流の人とパートナーシップを組み、<br>人を集めるハブになる。<br>AIには絶対に代替できない、人と人をつなぐポジション。<br>「プロモーター」という働き方です。</p>

          <p>私のクライアントは、昨日お伝えした順番でビジネスを立ち上げ、<br>3万人を集客できるようになりました。</p>

          <p>このような人が集まる場を持つことで、<br>ご自身のサービスを販売することもできますし、<br>ご自身のクライアントのビジネスを応援することも可能です。</p>

          <p>あなたのビジネスの参考になれば嬉しいです。</p>

          <p>アンケートのご記入がまだの方はこちらから記入ください。<br>ご協力お願いします。<br><a href="https://forms.gle/uP7XeWAmxsK5VN6b8">https://forms.gle/uP7XeWAmxsK5VN6b8</a></p>

          <p>4/16（木）に「SURVIVE 2026｜大淘汰時代のポジション再設計セミナー」を<br>再開催いたします。<br>ご都合のよろしい方はこちらからお申し込みください。<br><a href="https://seminar-app-two.vercel.app/survive-0416">https://seminar-app-two.vercel.app/survive-0416</a></p>

          <p>※4/8に参加いただいた方は無料で参加いただけますので<br>このメールに参加希望と返信ください。</p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 13px;">ハマー（白濱良太）<br>info@promote-business.academy</p>
        </div>
      `,
    });

    return NextResponse.json({ status: "sent", to: "shirahama@webull.jp" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: "failed", error: msg }, { status: 500 });
  }
}

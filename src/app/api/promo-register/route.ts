import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  addAirtableRecord,
  upsertCustomer,
  incrementSeminarCount,
} from "@/lib/airtable";
import { formatJST } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "名前とメールアドレスは必須です" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const nowJST = formatJST(now);

    // Airtable・メール送信を並列実行
    const customerData = {
      name,
      email,
      businessType: "",
      situation: "",
      referral: "SURVIVE2026参加者",
      referralOther: "",
      question: "",
      paymentStatus: "無料招待",
      stripeSessionId: "",
      appliedAt: now,
    };

    const results = await Promise.allSettled([
      // 1. セミナー参加者管理に記録
      addAirtableRecord(customerData),
      // 2. Customersにupsert
      upsertCustomer(customerData, "SURVIVE 2026経由"),
      // 3. Seminarsの申込数+1
      incrementSeminarCount("プロモートビジネスセミナー入門編"),
      // 4. 確認メール送信
      sendPromoConfirmation(email, name),
      // 5. 管理者通知
      sendPromoAdminNotification(name, email, nowJST),
    ]);

    const services = [
      "Airtable(参加者管理)",
      "Airtable(Customers)",
      "Airtable(Seminars)",
      "確認メール",
      "管理者通知",
    ];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`[PromoRegister] ${services[index]} failed:`, {
          error:
            result.reason instanceof Error
              ? result.reason.message
              : result.reason,
          email,
        });
      } else {
        console.log(`[PromoRegister] ${services[index]} succeeded for ${email}`);
      }
    });

    return NextResponse.json({ redirect: "/promo-success" });
  } catch (err) {
    console.error("PromoRegister error:", err);
    return NextResponse.json(
      { error: "登録処理に失敗しました" },
      { status: 500 }
    );
  }
}

async function sendPromoConfirmation(to: string, name: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "ハマー <info@promote-business.academy>",
    to,
    subject: "【申込完了】プロモートビジネスセミナー入門編（無料招待）",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>プロモートビジネスセミナー入門編</h2>
        <p>${name} 様</p>
        <p>プロモートビジネスセミナー入門編へのお申し込みを<br>受け付けました。</p>
        <p>SURVIVE 2026参加者限定の無料招待として<br>ご参加いただきます。</p>

        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">セミナー名</td>
            <td style="padding: 8px;">プロモートビジネスセミナー入門編</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">日時</td>
            <td style="padding: 8px;">2026年4月10日（金） 20:00〜22:30</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">開催方法</td>
            <td style="padding: 8px;">Zoom（下記URLよりご参加ください）</td>
          </tr>
        </table>

        <h3 style="margin: 24px 0 12px;">Zoom情報</h3>
        <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 140px;">Zoom URL</td>
            <td style="padding: 8px;"><a href="https://us02web.zoom.us/j/83039552812">https://us02web.zoom.us/j/83039552812</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">ミーティングID</td>
            <td style="padding: 8px;">830 3955 2812</td>
          </tr>
        </table>

        <div style="background: #f9f9f9; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0 0 8px; font-weight: bold;">ご参加にあたって</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>開始5分前にはご入室ください</li>
            <li>アーカイブはありません。当日のみの開催です。</li>
          </ul>
        </div>

        <p>ご不明点がございましたら、下記までお問い合わせください。</p>
        <p>info@promote-business.academy</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 12px;">ハマー</p>
      </div>
    `,
  });
}

async function sendPromoAdminNotification(
  name: string,
  email: string,
  appliedAt: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Promote Business Seminar <info@promote-business.academy>",
    to: "shirahama@webull.jp",
    subject: "【無料招待申込】プロモートビジネスセミナー入門編",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>無料招待申込通知</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">セミナー</td>
            <td style="padding: 8px;">プロモートビジネスセミナー入門編</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">名前</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">メール</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">申込日時</td>
            <td style="padding: 8px;">${appliedAt}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">種別</td>
            <td style="padding: 8px;">SURVIVE 2026参加者 無料招待</td>
          </tr>
        </table>
      </div>
    `,
  });
}

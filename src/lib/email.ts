import { Resend } from "resend";
import { SEMINAR_CONFIG } from "./seminar-config";

interface SendConfirmationParams {
  to: string;
  name: string;
}

export async function sendConfirmationEmail({
  to,
  name,
}: SendConfirmationParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { title, date, time, venue, organizer, contactEmail } =
    SEMINAR_CONFIG;

  await resend.emails.send({
    from: `${organizer} <onboarding@resend.dev>`,
    to,
    subject: `【申込完了】${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${title}</h2>
        <p>${name} 様</p>
        <p>セミナーへのお申し込み、誠にありがとうございます。<br>決済が完了し、お申し込みが確定いたしました。</p>

        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">セミナー名</td>
            <td style="padding: 8px;">${title}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">日時</td>
            <td style="padding: 8px;">${date} ${time}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">開催方法</td>
            <td style="padding: 8px;">${venue}</td>
          </tr>
        </table>

        <p>Zoom URLは開催日までにメールにてお送りいたします。</p>

        <p>ご不明点がございましたら、下記までお問い合わせください。</p>
        <p>${contactEmail}</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 12px;">${organizer}</p>
      </div>
    `,
  });
}

interface SendAdminNotificationParams {
  name: string;
  email: string;
  appliedAt: string;
}

export async function sendAdminNotification({
  name,
  email,
  appliedAt,
}: SendAdminNotificationParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { title, organizer } = SEMINAR_CONFIG;

  await resend.emails.send({
    from: `${organizer} <onboarding@resend.dev>`,
    to: "shirahama@webull.jp",
    subject: `【新規申込】${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>新規セミナー申込通知</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">名前</td>
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
        </table>
      </div>
    `,
  });
}

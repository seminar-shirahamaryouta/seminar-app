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

const ZOOM_INFO = {
  url: "https://us02web.zoom.us/j/85272055617?pwd=Ny3nSpp7NMTDIvjxbZMnp7AC91xDUE.1",
  meetingId: "852 7205 5617",
  passcode: "868757",
};

function reminderHtml(name: string, subject: string) {
  const { title, date, time, organizer } = SEMINAR_CONFIG;
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${subject}</h2>
      <p>${name} 様</p>

      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold; width: 140px;">開催日時</td>
          <td style="padding: 8px;">${date} ${time}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold;">Zoom URL</td>
          <td style="padding: 8px;"><a href="${ZOOM_INFO.url}">${ZOOM_INFO.url}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold;">ミーティングID</td>
          <td style="padding: 8px;">${ZOOM_INFO.meetingId}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold;">パスコード</td>
          <td style="padding: 8px;">${ZOOM_INFO.passcode}</td>
        </tr>
      </table>

      <div style="background: #f9f9f9; padding: 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0 0 8px; font-weight: bold;">参加条件</p>
        <ul style="margin: 0; padding-left: 20px;">
          <li>カメラオンでご参加ください</li>
          <li>開始5分前にはご入室ください</li>
          <li>アーカイブはありません。当日のみの開催です。</li>
        </ul>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">${organizer}</p>
    </div>
  `;
}

export async function sendReminderEmail({
  to,
  name,
  subject,
}: {
  to: string;
  name: string;
  subject: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { organizer } = SEMINAR_CONFIG;

  await resend.emails.send({
    from: `${organizer} <onboarding@resend.dev>`,
    to,
    subject,
    html: reminderHtml(name, subject),
  });
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

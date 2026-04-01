import { Resend } from "resend";
import { SEMINAR_CONFIG } from "./seminar-config";

// --- Zoom情報 ---

const ZOOM_SURVIVE = {
  url: "https://us02web.zoom.us/j/81027127884",
  meetingId: "810 2712 7884",
};

const ZOOM_PROMO = {
  url: "https://us02web.zoom.us/j/83039552812",
  meetingId: "830 3955 2812",
};

// --- 4/10セミナー設定 ---

const PROMO_SEMINAR = {
  title: "プロモートビジネスセミナー入門編",
  date: "2026年4月10日（金）",
  time: "20:00〜22:30",
  organizer: "Promote Business Seminar",
  contactEmail: "info@promote-business.academy",
};

// --- セミナー種別 ---

export type SeminarType = "survive" | "promo";

function getSeminarInfo(type: SeminarType) {
  if (type === "promo") {
    return {
      title: PROMO_SEMINAR.title,
      date: PROMO_SEMINAR.date,
      time: PROMO_SEMINAR.time,
      organizer: PROMO_SEMINAR.organizer,
      contactEmail: PROMO_SEMINAR.contactEmail,
      zoom: ZOOM_PROMO,
    };
  }
  return {
    title: SEMINAR_CONFIG.title,
    date: SEMINAR_CONFIG.date,
    time: SEMINAR_CONFIG.time,
    organizer: SEMINAR_CONFIG.organizer,
    contactEmail: SEMINAR_CONFIG.contactEmail,
    zoom: ZOOM_SURVIVE,
  };
}

// --- 確認メール ---

interface SendConfirmationParams {
  to: string;
  name: string;
  seminarType?: SeminarType;
}

export async function sendConfirmationEmail({
  to,
  name,
  seminarType = "survive",
}: SendConfirmationParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const info = getSeminarInfo(seminarType);

  await resend.emails.send({
    from: `${info.organizer} <info@promote-business.academy>`,
    to,
    subject: `【申込完了】${info.title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${info.title}</h2>
        <p>${name} 様</p>
        <p>セミナーへのお申し込み、誠にありがとうございます。<br>決済が完了し、お申し込みが確定いたしました。</p>

        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">セミナー名</td>
            <td style="padding: 8px;">${info.title}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">日時</td>
            <td style="padding: 8px;">${info.date} ${info.time}</td>
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
            <td style="padding: 8px;"><a href="${info.zoom.url}">${info.zoom.url}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">ミーティングID</td>
            <td style="padding: 8px;">${info.zoom.meetingId}</td>
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
        <p>${info.contactEmail}</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 12px;">${info.organizer}</p>
      </div>
    `,
  });
}

// --- リマインドメール ---

function reminderHtml(name: string, subject: string, seminarType: SeminarType) {
  const info = getSeminarInfo(seminarType);
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${subject}</h2>
      <p>${name} 様</p>

      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold; width: 140px;">開催日時</td>
          <td style="padding: 8px;">${info.date} ${info.time}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold;">Zoom URL</td>
          <td style="padding: 8px;"><a href="${info.zoom.url}">${info.zoom.url}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px; font-weight: bold;">ミーティングID</td>
          <td style="padding: 8px;">${info.zoom.meetingId}</td>
        </tr>
      </table>

      <div style="background: #f9f9f9; padding: 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0 0 8px; font-weight: bold;">ご参加にあたって</p>
        <ul style="margin: 0; padding-left: 20px;">
          <li>開始5分前にはご入室ください</li>
          <li>アーカイブはありません。当日のみの開催です。</li>
        </ul>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">${info.organizer}</p>
    </div>
  `;
}

export async function sendReminderEmail({
  to,
  name,
  subject,
  seminarType = "survive",
}: {
  to: string;
  name: string;
  subject: string;
  seminarType?: SeminarType;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const info = getSeminarInfo(seminarType);

  await resend.emails.send({
    from: `${info.organizer} <info@promote-business.academy>`,
    to,
    subject,
    html: reminderHtml(name, subject, seminarType),
  });
}

// --- リマインド件名定義 ---

export const REMINDERS_SURVIVE: Record<string, string> = {
  eve: "【明日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  day: "【本日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  soon: "【30分後開始】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
};

export const REMINDERS_PROMO: Record<string, string> = {
  eve: "【明日開催】プロモートビジネスセミナー入門編",
  day: "【本日開催】プロモートビジネスセミナー入門編",
  soon: "【30分後開始】プロモートビジネスセミナー入門編",
};

// --- 日時フォーマット ---

export function formatJST(iso: string): string {
  const d = new Date(iso);
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getFullYear();
  const m = jst.getMonth() + 1;
  const day = jst.getDate();
  const h = String(jst.getHours()).padStart(2, "0");
  const min = String(jst.getMinutes()).padStart(2, "0");
  return `${y}年${m}月${day}日 ${h}:${min}`;
}

// --- 管理者通知 ---

interface SendAdminNotificationParams {
  name: string;
  email: string;
  appliedAt: string;
  seminarType?: SeminarType;
}

export async function sendAdminNotification({
  name,
  email,
  appliedAt,
  seminarType = "survive",
}: SendAdminNotificationParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const info = getSeminarInfo(seminarType);
  const appliedAtJST = formatJST(appliedAt);

  await resend.emails.send({
    from: `${info.organizer} <info@promote-business.academy>`,
    to: "shirahama@webull.jp",
    subject: `【新規申込】${info.title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>新規セミナー申込通知</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold; width: 120px;">セミナー</td>
            <td style="padding: 8px;">${info.title}</td>
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
            <td style="padding: 8px;">${appliedAtJST}</td>
          </tr>
        </table>
      </div>
    `,
  });
}

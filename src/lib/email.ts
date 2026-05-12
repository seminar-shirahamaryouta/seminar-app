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

const ZOOM_SURVIVE_0416 = {
  url: "https://us02web.zoom.us/j/85194698603",
  meetingId: "851 9469 8603",
};

const ZOOM_STUDY_0513 = {
  url: "https://us02web.zoom.us/j/89256617909",
  meetingId: "892 5661 7909",
};

// --- 4/14セミナー設定 ---

const PROMO_SEMINAR = {
  title: "プロモートビジネスセミナー入門編",
  date: "2026年4月14日（火）",
  time: "20:00〜22:30",
  organizer: "Promote Business Seminar",
  contactEmail: "info@promote-business.academy",
};

// --- 4/16セミナー設定 ---

const SURVIVE_0416_SEMINAR = {
  title: "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  date: "2026年4月16日（木）",
  time: "20:00〜22:00",
  organizer: "SURVIVE 2026",
  contactEmail: "info@promote-business.academy",
};

// --- 5/13特別勉強会設定 ---

const STUDY_0513_SEMINAR = {
  title: "5/13特別勉強会",
  date: "2026年5月13日（水）",
  time: "15:00〜16:30",
  organizer: "5/13特別勉強会",
  contactEmail: "info@promote-business.academy",
};

// --- セミナー種別 ---

export type SeminarType = "survive" | "promo" | "survive0416" | "study0513";

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
  if (type === "survive0416") {
    return {
      title: SURVIVE_0416_SEMINAR.title,
      date: SURVIVE_0416_SEMINAR.date,
      time: SURVIVE_0416_SEMINAR.time,
      organizer: SURVIVE_0416_SEMINAR.organizer,
      contactEmail: SURVIVE_0416_SEMINAR.contactEmail,
      zoom: ZOOM_SURVIVE_0416,
    };
  }
  if (type === "study0513") {
    return {
      title: STUDY_0513_SEMINAR.title,
      date: STUDY_0513_SEMINAR.date,
      time: STUDY_0513_SEMINAR.time,
      organizer: STUDY_0513_SEMINAR.organizer,
      contactEmail: STUDY_0513_SEMINAR.contactEmail,
      zoom: ZOOM_STUDY_0513,
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

  if (seminarType === "study0513") {
    await resend.emails.send({
      from: `${info.organizer} <info@promote-business.academy>`,
      to,
      subject: "【5/13 特別勉強会】お申し込みありがとうございます",
      html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <p>${name} さん</p>
        <p>ハマー（白濱良太）です。</p>
        <p>5/13 特別勉強会へのお申し込み、<br>ありがとうございます。</p>
        <p>決済が完了しましたのでご案内します。</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <h3 style="margin: 24px 0 12px;">■ 開催情報</h3>
        <p>日時：${info.date}${info.time} JST<br>形式：Zoom</p>
        <p>▼ 当日の入室URL<br><a href="${info.zoom.url}">${info.zoom.url}</a></p>
        <p>ミーティングID：${info.zoom.meetingId}</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <h3 style="margin: 24px 0 12px;">■ 参加条件</h3>
        <p>他では話せない内容をお伝えします。<br>ながらではなく、集中した環境で、<br>カメラオンでご参加ください。</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <h3 style="margin: 24px 0 12px;">■ 当日の流れ</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>開始5分前にはご入室ください</li>
          <li>カメラオンでお願いします</li>
          <li>録画・録音はご遠慮ください</li>
        </ul>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <h3 style="margin: 24px 0 12px;">■ 事前にご視聴いただきたい動画</h3>
        <p>イベントの様子を、YouTuberのヒカルさんが<br>動画で取り上げてくれています。</p>
        <p>▼ 該当動画<br><a href="https://youtu.be/MzAUwTPINEU?si=s7sd_zFRv2XouTfv&amp;t=4856">https://youtu.be/MzAUwTPINEU?si=s7sd_zFRv2XouTfv&amp;t=4856</a></p>
        <p>事前にご覧いただくと、<br>当日の話がより立体的に入ってきます。</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p>ご不明点があればこのメールに返信ください。</p>
        <p>当日お会いできるのを楽しみにしています。</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 12px;">ハマー（白濱良太）<br>株式会社webull<br><a href="mailto:${info.contactEmail}">${info.contactEmail}</a></p>
      </div>
    `,
    });
    return;
  }

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
  if (seminarType === "study0513") {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <p>${name} さん</p>
      <p>ハマーです。</p>
      <p>まもなく5/13 特別勉強会が始まります。<br>（15:00開始）</p>
      <p>▼ Zoom入室URL<br><a href="${info.zoom.url}">${info.zoom.url}</a></p>
      <p>カメラオンでのご参加をお願いします。</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">ハマー</p>
    </div>
  `;
  }
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

export const REMINDERS_SURVIVE_0416: Record<string, string> = {
  eve: "【明日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  day: "【本日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  soon: "【30分後開始】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
};

export const REMINDERS_STUDY_0513: Record<string, string> = {
  soon: "【まもなく開始】5/13 特別勉強会",
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

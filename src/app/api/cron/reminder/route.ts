import { NextRequest, NextResponse } from "next/server";
import { getParticipants } from "@/lib/airtable";
import {
  sendReminderEmail,
  REMINDERS_SURVIVE,
  REMINDERS_PROMO,
  REMINDERS_SURVIVE_0416,
  type SeminarType,
} from "@/lib/email";

const SEMINAR_NAMES: Record<SeminarType, string> = {
  survive: "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  promo: "プロモートビジネスセミナー入門編",
  survive0416:
    "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー（4/16開催）",
};

const REMINDERS_MAP: Record<SeminarType, Record<string, string>> = {
  survive: REMINDERS_SURVIVE,
  promo: REMINDERS_PROMO,
  survive0416: REMINDERS_SURVIVE_0416,
};

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type");
  const seminar = (req.nextUrl.searchParams.get("seminar") ||
    "survive") as SeminarType;

  const reminders = REMINDERS_MAP[seminar] || REMINDERS_SURVIVE;
  const subject = type ? reminders[type] : null;

  if (!subject) {
    return NextResponse.json(
      {
        error:
          "Invalid type. Use: eve, day, soon. seminar: survive|promo|survive0416",
      },
      { status: 400 }
    );
  }

  // セミナー名でフィルタして参加者を取得
  const seminarName = SEMINAR_NAMES[seminar];
  const participants = await getParticipants(undefined, seminarName);

  let sent = 0;
  let failed = 0;

  for (const p of participants) {
    try {
      await sendReminderEmail({
        to: p.email,
        name: p.name,
        subject,
        seminarType: seminar,
      });
      sent++;
    } catch (err) {
      console.error(`Failed to send reminder to ${p.email}:`, err);
      failed++;
    }
  }

  console.log(`Reminder [${seminar}/${type}]: sent=${sent}, failed=${failed}`);

  return NextResponse.json({
    seminar,
    type,
    sent,
    failed,
    total: participants.length,
  });
}

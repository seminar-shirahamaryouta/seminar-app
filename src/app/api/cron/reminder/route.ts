import { NextRequest, NextResponse } from "next/server";
import { getParticipants } from "@/lib/airtable";
import {
  sendReminderEmail,
  REMINDERS_SURVIVE,
  REMINDERS_PROMO,
  type SeminarType,
} from "@/lib/email";

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type");
  const seminar = (req.nextUrl.searchParams.get("seminar") ||
    "survive") as SeminarType;

  const reminders = seminar === "promo" ? REMINDERS_PROMO : REMINDERS_SURVIVE;
  const subject = type ? reminders[type] : null;

  if (!subject) {
    return NextResponse.json(
      {
        error:
          "Invalid type. Use: eve, day, soon. Optional: &seminar=survive|promo",
      },
      { status: 400 }
    );
  }

  // survive → completed のみ、promo → 無料招待 のみ
  const statusFilter = seminar === "promo" ? "無料招待" : "completed";
  const participants = await getParticipants(statusFilter);

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

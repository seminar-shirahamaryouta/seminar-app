import { NextRequest, NextResponse } from "next/server";
import { getParticipants } from "@/lib/airtable";
import { sendReminderEmail } from "@/lib/email";

const REMINDERS: Record<string, string> = {
  "eve": "【明日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  "day": "【本日開催】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
  "soon": "【30分後開始】SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
};

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type");
  const subject = type ? REMINDERS[type] : null;

  if (!subject) {
    return NextResponse.json(
      { error: "Invalid type. Use: eve, day, soon" },
      { status: 400 }
    );
  }

  const participants = await getParticipants();
  let sent = 0;
  let failed = 0;

  for (const p of participants) {
    try {
      await sendReminderEmail({ to: p.email, name: p.name, subject });
      sent++;
    } catch (err) {
      console.error(`Failed to send reminder to ${p.email}:`, err);
      failed++;
    }
  }

  console.log(`Reminder [${type}]: sent=${sent}, failed=${failed}`);

  return NextResponse.json({ type, sent, failed, total: participants.length });
}

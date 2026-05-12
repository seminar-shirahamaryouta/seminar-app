/*
 * /api/broadcast - 汎用メール配信エンドポイント（永続）
 *
 * 運用ルール：
 * - これは永続エンドポイント。削除禁止。
 * - 送信前に必ず testMode: true でドライラン実施
 * - 過去のセミナーリストをこのファイル内にハードコードしない
 *   （必ず外部から recipients として渡す）
 * - broadcastId 形式：YYYYMMDD-用途名（例: 20260512-study0513-invite）
 * - 削除されたエンドポイント invite-promo の轍を踏まないこと：
 *   ハードコードされた送信先・件名・本文を持たない設計を維持
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = "shirahama@webull.jp";
const MAX_RECIPIENTS = 100;
const BROADCASTS_TABLE = process.env.AIRTABLE_BROADCASTS_TABLE || "Broadcasts";
const DEFAULT_FROM_NAME = "ハマー（白濱良太）";
const DEFAULT_FROM_EMAIL = "info@promote-business.academy";

interface Recipient {
  name: string;
  email: string;
}

interface BroadcastRequest {
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  recipients: Recipient[];
  fromName?: string;
  fromEmail?: string;
  testMode?: boolean;
  broadcastId: string;
}

async function findRecentBroadcast(broadcastId: string): Promise<boolean> {
  const key = process.env.AIRTABLE_API_KEY;
  const base = process.env.AIRTABLE_BASE_ID;
  if (!key || !base) throw new Error("Airtable env not configured");

  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(BROADCASTS_TABLE)}`;
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const params = new URLSearchParams({
    filterByFormula: `AND({Broadcast ID} = "${broadcastId}", IS_AFTER({Sent At}, "${since}"))`,
    maxRecords: "1",
  });

  const res = await fetch(`${url}?${params}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    throw new Error(
      `Broadcasts table query failed: ${res.status} ${await res.text()}`
    );
  }
  const data = await res.json();
  return data.records.length > 0;
}

async function logBroadcast(args: {
  broadcastId: string;
  subject: string;
  total: number;
  sent: number;
  failed: number;
}) {
  const key = process.env.AIRTABLE_API_KEY;
  const base = process.env.AIRTABLE_BASE_ID;
  if (!key || !base) throw new Error("Airtable env not configured");

  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(BROADCASTS_TABLE)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            "Broadcast ID": args.broadcastId,
            Subject: args.subject,
            "Total Recipients": args.total,
            Sent: args.sent,
            Failed: args.failed,
            "Sent At": new Date().toISOString(),
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(
      `Broadcasts log write failed: ${res.status} ${await res.text()}`
    );
  }
}

export async function POST(req: NextRequest) {
  // === 1. Bearer auth ===
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // === 2. Parse body ===
  let body: BroadcastRequest;
  try {
    body = (await req.json()) as BroadcastRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Body must be a JSON object" },
      { status: 400 }
    );
  }

  // === 3. Validate required fields ===
  if (!body.broadcastId || typeof body.broadcastId !== "string") {
    return NextResponse.json(
      { error: "broadcastId is required" },
      { status: 400 }
    );
  }
  if (!body.subject || typeof body.subject !== "string") {
    return NextResponse.json(
      { error: "subject is required" },
      { status: 400 }
    );
  }
  if (!body.bodyHtml || typeof body.bodyHtml !== "string") {
    return NextResponse.json(
      { error: "bodyHtml is required" },
      { status: 400 }
    );
  }
  if (!Array.isArray(body.recipients)) {
    return NextResponse.json(
      { error: "recipients must be an array" },
      { status: 400 }
    );
  }
  if (body.recipients.length === 0) {
    return NextResponse.json(
      { error: "recipients must not be empty" },
      { status: 400 }
    );
  }
  if (body.recipients.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      {
        error: `recipients exceeds maximum of ${MAX_RECIPIENTS} (got ${body.recipients.length})`,
      },
      { status: 400 }
    );
  }

  const testMode = !!body.testMode;
  const fromName = body.fromName || DEFAULT_FROM_NAME;
  const fromEmail = body.fromEmail || DEFAULT_FROM_EMAIL;
  const fromAddress = `${fromName} <${fromEmail}>`;

  // === 4. Idempotency check (only for real sends, not testMode) ===
  if (!testMode) {
    try {
      const isDuplicate = await findRecentBroadcast(body.broadcastId);
      if (isDuplicate) {
        console.log(
          `[Broadcast] Duplicate broadcastId within 24h: ${body.broadcastId}`
        );
        return NextResponse.json(
          {
            error: "Duplicate broadcastId within 24h",
            broadcastId: body.broadcastId,
          },
          { status: 409 }
        );
      }
    } catch (err) {
      console.warn(
        `[Broadcast] Idempotency check unavailable (Broadcasts table may not exist), proceeding without guarantee:`,
        err instanceof Error ? err.message : err
      );
    }
  }

  // === 5. Determine final targets and subject ===
  const targets = testMode ? body.recipients.slice(0, 1) : body.recipients;
  const finalSubject = testMode ? `【TEST】${body.subject}` : body.subject;

  const resend = new Resend(process.env.RESEND_API_KEY);

  // === 6. Pre-broadcast admin notification (fire-and-keep-going) ===
  try {
    const previewLines = targets
      .slice(0, 3)
      .map((r) => `- ${r.email}`)
      .join("\n");
    const moreCount = targets.length - 3;
    await resend.emails.send({
      from: fromAddress,
      to: ADMIN_EMAIL,
      subject: `【配信開始予告】${finalSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <p>これから <strong>${targets.length}名</strong> に配信を開始します${testMode ? "（TEST MODE）" : ""}。</p>
          <p><strong>件名：</strong>${finalSubject}</p>
          <p><strong>broadcastId：</strong><code>${body.broadcastId}</code></p>
          <p><strong>先頭3名のメールアドレス：</strong></p>
          <pre style="background: #f6f6f6; padding: 12px; border-radius: 4px; font-size: 13px; white-space: pre-wrap;">${previewLines}${moreCount > 0 ? `\n... ほか ${moreCount} 名` : ""}</pre>
        </div>
      `,
    });
  } catch (err) {
    console.error(
      `[Broadcast] Pre-broadcast admin notification failed:`,
      err instanceof Error ? err.message : err
    );
  }

  // === 7. Send emails (1 by 1, {name} substitution) ===
  // The Resend SDK does NOT throw on API errors (rate limit, validation etc.);
  // it returns { data, error }. Must check result.error explicitly.
  // 500ms inter-send delay keeps us under Resend's default rate limit (~2 req/s).
  let sent = 0;
  let failed = 0;
  const failures: { email: string; error: string }[] = [];

  for (let i = 0; i < targets.length; i++) {
    const r = targets[i];
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (!r || !r.email || typeof r.email !== "string") {
      failed++;
      failures.push({
        email: (r && r.email) || "(empty)",
        error: "Missing or invalid email address",
      });
      continue;
    }
    const html = body.bodyHtml.replace(/\{name\}/g, r.name || "");
    const text = body.bodyText?.replace(/\{name\}/g, r.name || "");
    try {
      const result = await resend.emails.send({
        from: fromAddress,
        to: r.email,
        subject: finalSubject,
        html,
        ...(text ? { text } : {}),
      });
      if (result.error) {
        failed++;
        failures.push({
          email: r.email,
          error: result.error.message || JSON.stringify(result.error),
        });
      } else {
        sent++;
      }
    } catch (err) {
      failed++;
      failures.push({
        email: r.email,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // === 8. Log to Broadcasts table (best effort, only for real sends) ===
  if (!testMode) {
    try {
      await logBroadcast({
        broadcastId: body.broadcastId,
        subject: body.subject,
        total: targets.length,
        sent,
        failed,
      });
    } catch (err) {
      console.warn(
        `[Broadcast] Log write failed (Broadcasts table may not exist):`,
        err instanceof Error ? err.message : err
      );
    }
  }

  // === 9. Post-broadcast admin summary ===
  try {
    const failuresHtml =
      failures.length > 0
        ? `<h3>失敗詳細</h3><ul>${failures
            .map(
              (f) =>
                `<li><code>${f.email}</code>：${f.error}</li>`
            )
            .join("")}</ul>`
        : "";
    await resend.emails.send({
      from: fromAddress,
      to: ADMIN_EMAIL,
      subject: `【配信完了】${finalSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>配信結果サマリ</h2>
          <p><strong>件名：</strong>${finalSubject}</p>
          <p><strong>broadcastId：</strong><code>${body.broadcastId}</code></p>
          <p><strong>モード：</strong>${testMode ? "TEST" : "本送信"}</p>
          <p><strong>送信完了：</strong>${sent}件成功 / ${failed}件失敗 / 合計 ${targets.length}件</p>
          ${failuresHtml}
        </div>
      `,
    });
  } catch (err) {
    console.error(
      `[Broadcast] Post-broadcast admin summary failed:`,
      err instanceof Error ? err.message : err
    );
  }

  return NextResponse.json({
    sent,
    failed,
    failures,
    broadcastId: body.broadcastId,
  });
}

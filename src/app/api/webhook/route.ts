import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  addAirtableRecord,
  upsertCustomer,
  incrementSeminarCount,
} from "@/lib/airtable";
import { appendToSheet } from "@/lib/google-sheets";
import {
  sendConfirmationEmail,
  sendAdminNotification,
  type SeminarType,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const now = new Date().toISOString();
    const clientRefRaw = session.client_reference_id || "";

    // client_reference_id からメタデータをデコード
    let promoMeta: {
      name?: string;
      email?: string;
      referral?: string;
      referralOther?: string;
      question?: string;
    } = {};
    const isGeneralPromo = clientRefRaw.toLowerCase().startsWith("general");
    if (clientRefRaw.includes(":")) {
      try {
        const encoded = clientRefRaw.split(":").slice(1).join(":");
        const decoded = Buffer.from(encoded, "base64url").toString("utf-8");
        promoMeta = JSON.parse(decoded);
      } catch {
        console.warn("[Webhook] Failed to decode client_reference_id metadata");
      }
    }

    // name/emailのフォールバック
    const name =
      metadata.name ||
      promoMeta.name ||
      session.customer_details?.name ||
      "";
    const email =
      metadata.email ||
      promoMeta.email ||
      session.customer_details?.email ||
      "";

    // セミナー判別
    const clientRefLower = clientRefRaw.toLowerCase();
    let seminarName: string;
    let referralSource: string;
    let seminarType: SeminarType;

    if (clientRefLower.startsWith("survive2026")) {
      seminarName = "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー";
      referralSource = "SURVIVE 2026経由";
      seminarType = "promo";
    } else if (isGeneralPromo || clientRefLower === "promo2026") {
      seminarName = "プロモートビジネスセミナー入門編";
      referralSource = promoMeta.referral || "一般申込";
      seminarType = "promo";
    } else {
      // デフォルト: 4/8セミナー（フォーム経由の申込）
      seminarName = "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー";
      referralSource = metadata.referral || "";
      seminarType = "survive";
    }

    const customerData = {
      name,
      email,
      businessType: metadata.businessType || "",
      situation: metadata.situation || "",
      referral: promoMeta.referral || metadata.referral || referralSource,
      referralOther: promoMeta.referralOther || metadata.referralOther || "",
      question: promoMeta.question || metadata.question || "",
      paymentStatus: "completed",
      stripeSessionId: session.id,
      appliedAt: now,
      seminarName,
    };

    const results = await Promise.allSettled([
      addAirtableRecord(customerData),
      upsertCustomer(customerData, referralSource),
      incrementSeminarCount(seminarName),
      appendToSheet([
        customerData.name,
        customerData.email,
        customerData.businessType,
        customerData.situation,
        customerData.referral,
        customerData.referralOther,
        customerData.question,
        customerData.paymentStatus,
        customerData.stripeSessionId,
        customerData.appliedAt,
      ]),
      sendConfirmationEmail({
        to: customerData.email,
        name: customerData.name,
        seminarType,
      }),
      sendAdminNotification({
        name: customerData.name,
        email: customerData.email,
        appliedAt: now,
        seminarType,
      }),
    ]);

    const services = [
      "Airtable(参加者管理)",
      "Airtable(Customers)",
      "Airtable(Seminars)",
      "Google Sheets",
      "確認メール",
      "管理者通知",
    ];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`[Webhook] ${services[index]} failed:`, {
          service: services[index],
          error:
            result.reason instanceof Error
              ? result.reason.message
              : result.reason,
          stack:
            result.reason instanceof Error
              ? result.reason.stack
              : undefined,
          customerEmail: customerData.email,
          sessionId: session.id,
        });
      } else {
        console.log(
          `[Webhook] ${services[index]} succeeded for session ${session.id}`
        );
      }
    });
  }

  return NextResponse.json({ received: true });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { addAirtableRecord } from "@/lib/airtable";
import { appendToSheet } from "@/lib/google-sheets";
import { sendConfirmationEmail } from "@/lib/email";

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
    const metadata = session.metadata!;
    const now = new Date().toISOString();

    const customerData = {
      name: metadata.name,
      email: metadata.email,
      phone: metadata.phone,
      company: metadata.company,
      paymentStatus: "completed",
      stripeSessionId: session.id,
      appliedAt: now,
    };

    // 並行実行：Airtable記録、Google Sheets記録、メール送信
    const results = await Promise.allSettled([
      addAirtableRecord(customerData),
      appendToSheet([
        customerData.name,
        customerData.email,
        customerData.phone,
        customerData.company,
        customerData.paymentStatus,
        customerData.stripeSessionId,
        customerData.appliedAt,
      ]),
      sendConfirmationEmail({
        to: customerData.email,
        name: customerData.name,
      }),
    ]);

    // エラーログ
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const services = ["Airtable", "Google Sheets", "Email"];
        console.error(`${services[index]} error:`, result.reason);
      }
    });
  }

  return NextResponse.json({ received: true });
}

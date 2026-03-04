import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { addAirtableRecord } from "@/lib/airtable";
import { appendToSheet } from "@/lib/google-sheets";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

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
      phone: "",
      company: "",
      paymentStatus: "completed",
      stripeSessionId: session.id,
      appliedAt: now,
    };

    const results = await Promise.allSettled([
      addAirtableRecord(customerData),
      appendToSheet([
        customerData.name,
        customerData.email,
        customerData.paymentStatus,
        customerData.stripeSessionId,
        customerData.appliedAt,
      ]),
      sendConfirmationEmail({
        to: customerData.email,
        name: customerData.name,
      }),
      sendAdminNotification({
        name: customerData.name,
        email: customerData.email,
        appliedAt: now,
      }),
    ]);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const services = ["Airtable", "Google Sheets", "確認メール", "管理者通知"];
        console.error(`${services[index]} error:`, result.reason);
      }
    });
  }

  return NextResponse.json({ received: true });
}

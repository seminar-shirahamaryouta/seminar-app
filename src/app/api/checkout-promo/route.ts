import { NextRequest, NextResponse } from "next/server";
import { addAirtableRecord, upsertCustomer, incrementSeminarCount } from "@/lib/airtable";

const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/28E8wO73S4gi2jtc57ao800?client_reference_id=general";

export async function POST(req: NextRequest) {
  try {
    const { name, email, referral, question } = await req.json();

    if (!name || !email || !referral) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Airtableに事前記録（決済前）
    const customerData = {
      name,
      email,
      businessType: "",
      situation: "",
      referral,
      referralOther: "",
      question: question || "",
      paymentStatus: "決済待ち",
      stripeSessionId: "",
      appliedAt: now,
    };

    const results = await Promise.allSettled([
      addAirtableRecord(customerData),
      upsertCustomer(customerData, "一般申込"),
      incrementSeminarCount("プロモートビジネスセミナー入門編"),
    ]);

    const services = ["Airtable(参加者管理)", "Airtable(Customers)", "Airtable(Seminars)"];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`[CheckoutPromo] ${services[index]} failed:`, {
          error: result.reason instanceof Error ? result.reason.message : result.reason,
          email,
        });
      }
    });

    return NextResponse.json({ url: STRIPE_PAYMENT_LINK });
  } catch (err) {
    console.error("CheckoutPromo error:", err);
    return NextResponse.json(
      { error: "処理に失敗しました" },
      { status: 500 }
    );
  }
}

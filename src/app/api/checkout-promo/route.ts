import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const PROMO_PRICE_ID = "price_1THTIOB9FN6DaHV2Maqrxp9H";

export async function POST(req: NextRequest) {
  try {
    const { name, email, referral, referralOther, question } = await req.json();

    if (!name || !email || !referral) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: PROMO_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/promo-seminar`,
      customer_email: email,
      client_reference_id: "general",
      metadata: {
        name,
        email,
        referral,
        referralOther: referralOther || "",
        question: question || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("CheckoutPromo error:", err);
    return NextResponse.json(
      { error: "チェックアウトセッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}

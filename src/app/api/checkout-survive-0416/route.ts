import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const SURVIVE_0416_PRICE_ID = "price_1T7FZeB9FN6DaHV2sMGRb2NT";

export async function POST(req: NextRequest) {
  try {
    const { name, email, referral, question } = await req.json();

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
          price: SURVIVE_0416_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/survive-0416/success`,
      cancel_url: `${req.nextUrl.origin}/survive-0416`,
      customer_email: email,
      client_reference_id: "survive0416",
      metadata: {
        name,
        email,
        referral,
        question: question || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("CheckoutSurvive0416 error:", err);
    return NextResponse.json(
      { error: "チェックアウトセッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}

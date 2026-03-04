import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { SEMINAR_CONFIG } from "@/lib/seminar-config";

export async function POST(req: NextRequest) {
  try {
    const { name, email, businessType, revenue, situation, question } =
      await req.json();

    if (!name || !email || !businessType || !revenue || !situation) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: SEMINAR_CONFIG.currency,
            product_data: {
              name: SEMINAR_CONFIG.title,
              description: `${SEMINAR_CONFIG.date} ${SEMINAR_CONFIG.time}`,
            },
            unit_amount: SEMINAR_CONFIG.price,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
      customer_email: email,
      metadata: {
        name,
        email,
        businessType,
        revenue,
        situation,
        question: question || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "チェックアウトセッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}

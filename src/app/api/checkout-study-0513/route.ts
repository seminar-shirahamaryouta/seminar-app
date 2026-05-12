import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { name, email, question } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "お名前とメールアドレスは必須です" },
        { status: 400 }
      );
    }

    const priceId = process.env.STUDY_0513_PRICE_ID;
    if (!priceId) {
      console.error("CheckoutStudy0513: STUDY_0513_PRICE_ID is not set");
      return NextResponse.json(
        { error: "決済設定が未構成です。運営までご連絡ください。" },
        { status: 500 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${req.nextUrl.origin}/study-0513/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/study-0513`,
      customer_email: email,
      client_reference_id: "study0513",
      metadata: {
        name,
        email,
        question: question || "",
        seminar: "study0513",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("CheckoutStudy0513 error:", err);
    return NextResponse.json(
      { error: "チェックアウトセッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}

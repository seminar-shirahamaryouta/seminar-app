import { NextRequest, NextResponse } from "next/server";

const STRIPE_PAYMENT_LINK_BASE =
  "https://buy.stripe.com/28E8wO73S4gi2jtc57ao800";

export async function POST(req: NextRequest) {
  try {
    const { name, email, referral, referralOther, question } = await req.json();

    if (!name || !email || !referral) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    // client_reference_idにメタデータをエンコードして渡す
    const metadata = JSON.stringify({ name, email, referral, referralOther: referralOther || "", question: question || "" });
    const clientRefId = `general:${Buffer.from(metadata).toString("base64url")}`;

    const url = `${STRIPE_PAYMENT_LINK_BASE}?client_reference_id=${encodeURIComponent(clientRefId)}&prefilled_email=${encodeURIComponent(email)}`;

    return NextResponse.json({ url });
  } catch (err) {
    console.error("CheckoutPromo error:", err);
    return NextResponse.json(
      { error: "処理に失敗しました" },
      { status: 500 }
    );
  }
}

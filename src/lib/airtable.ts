const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "申込者";

interface CustomerRecord {
  name: string;
  email: string;
  businessType: string;
  situation: string;
  referral: string;
  referralOther: string;
  question: string;
  paymentStatus: string;
  stripeSessionId: string;
  appliedAt: string;
}

export async function addAirtableRecord(record: CustomerRecord) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            名前: record.name,
            メールアドレス: record.email,
            ビジネス形態: record.businessType,
            現在の状況: record.situation,
            流入経路: record.referral,
            流入経路詳細: record.referralOther,
            決済ステータス: record.paymentStatus,
            "Stripe Session ID": record.stripeSessionId,
            申込日時: record.appliedAt,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Airtable API error: ${error}`);
  }

  return response.json();
}

interface Participant {
  name: string;
  email: string;
}

export async function getParticipants(): Promise<Participant[]> {
  const participants: Participant[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({
      filterByFormula: '{決済ステータス} = "completed"',
      "fields[]": "名前",
    });
    params.append("fields[]", "メールアドレス");
    if (offset) params.set("offset", offset);

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?${params}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Airtable API error: ${error}`);
    }

    const data = await response.json();
    for (const record of data.records) {
      participants.push({
        name: record.fields["名前"] || "",
        email: record.fields["メールアドレス"] || "",
      });
    }
    offset = data.offset;
  } while (offset);

  return participants;
}

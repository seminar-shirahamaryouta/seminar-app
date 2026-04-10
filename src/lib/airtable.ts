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
  seminarName?: string;
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
            当日の質問: record.question,
            決済ステータス: record.paymentStatus,
            "Stripe Session ID": record.stripeSessionId,
            申込日時: record.appliedAt,
            セミナー名: record.seminarName || "",
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

// --- Customers テーブル (tblOZS4E3c2ZjAvye) ---

const CUSTOMERS_TABLE_ID = "tblOZS4E3c2ZjAvye";

export async function upsertCustomer(
  record: CustomerRecord,
  referralOverride?: string
) {
  const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CUSTOMERS_TABLE_ID}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  };
  const today = new Date().toISOString().slice(0, 10);

  // メールアドレスで既存レコードを検索
  const searchParams = new URLSearchParams({
    filterByFormula: `{メールアドレス} = "${record.email}"`,
    maxRecords: "1",
  });
  const searchRes = await fetch(`${baseUrl}?${searchParams}`, { headers });
  if (!searchRes.ok) {
    throw new Error(`Customers search error: ${await searchRes.text()}`);
  }
  const searchData = await searchRes.json();

  if (searchData.records.length > 0) {
    // 既存 → 最終接触日のみ更新
    const existingId = searchData.records[0].id;
    const updateRes = await fetch(`${baseUrl}/${existingId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        fields: { 最終接触日: today },
      }),
    });
    if (!updateRes.ok) {
      throw new Error(`Customers update error: ${await updateRes.text()}`);
    }
    return updateRes.json();
  } else {
    // 新規作成
    const createRes = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        records: [
          {
            fields: {
              名前: record.name,
              メールアドレス: record.email,
              "流入経路（初回）": referralOverride || record.referral || "",
              初回申込日: today,
              関係ステータス: "顧客",
              最終接触日: today,
            },
          },
        ],
      }),
    });
    if (!createRes.ok) {
      throw new Error(`Customers create error: ${await createRes.text()}`);
    }
    return createRes.json();
  }
}

// --- Seminars テーブル (tblLjcExsBR1iNEWG) ---

const SEMINARS_TABLE_ID = "tblLjcExsBR1iNEWG";

interface SeminarDefaults {
  name: string;
  dateTime: string;
  price: number;
}

const SEMINAR_DEFAULTS: Record<string, SeminarDefaults> = {
  "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー": {
    name: "SURVIVE 2026｜大淘汰時代のポジション再設計セミナー",
    dateTime: "2026-04-08T20:00:00.000Z",
    price: 5500,
  },
  "プロモートビジネスセミナー入門編": {
    name: "プロモートビジネスセミナー入門編",
    dateTime: "2026-04-14T20:00:00.000Z",
    price: 0,
  },
};

export async function incrementSeminarCount(seminarName: string) {
  const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${SEMINARS_TABLE_ID}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  };

  // セミナー名で検索
  const searchParams = new URLSearchParams({
    filterByFormula: `{セミナー名} = "${seminarName}"`,
    maxRecords: "1",
  });
  const searchRes = await fetch(`${baseUrl}?${searchParams}`, { headers });
  if (!searchRes.ok) {
    throw new Error(`Seminars search error: ${await searchRes.text()}`);
  }
  const searchData = await searchRes.json();

  let recordId: string;
  let currentCount = 0;

  if (searchData.records.length > 0) {
    recordId = searchData.records[0].id;
    currentCount = searchData.records[0].fields["申込数"] || 0;
  } else {
    // 存在しない場合は新規作成
    const defaults = SEMINAR_DEFAULTS[seminarName];
    const createRes = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        records: [
          {
            fields: {
              セミナー名: seminarName,
              "開催日時": defaults?.dateTime || "",
              参加費: defaults?.price || 0,
              ステータス: "受付中",
              申込数: 0,
            },
          },
        ],
      }),
    });
    if (!createRes.ok) {
      throw new Error(`Seminars create error: ${await createRes.text()}`);
    }
    const created = await createRes.json();
    recordId = created.records[0].id;
  }

  // 申込数を+1
  const updateRes = await fetch(`${baseUrl}/${recordId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      fields: { 申込数: currentCount + 1 },
    }),
  });
  if (!updateRes.ok) {
    throw new Error(`Seminars update error: ${await updateRes.text()}`);
  }
  return updateRes.json();
}

// --- 参加者一覧取得 ---

interface Participant {
  name: string;
  email: string;
}

export async function getParticipants(
  statusFilter?: string,
  seminarNameFilter?: string
): Promise<Participant[]> {
  const participants: Participant[] = [];
  let offset: string | undefined;

  let formula: string;
  if (seminarNameFilter) {
    // セミナー名でフィルタ（決済ステータスに関わらず、そのセミナーの参加者を取得）
    formula = `AND({セミナー名} = "${seminarNameFilter}", OR({決済ステータス} = "completed", {決済ステータス} = "無料招待"))`;
  } else if (statusFilter) {
    formula = `{決済ステータス} = "${statusFilter}"`;
  } else {
    formula = 'OR({決済ステータス} = "completed", {決済ステータス} = "無料招待")';
  }

  do {
    const params = new URLSearchParams({
      filterByFormula: formula,
      "fields[]": "名前",
    });
    params.append("fields[]", "メールアドレス");
    params.append("fields[]", "決済ステータス");
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

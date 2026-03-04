import { google } from "googleapis";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(row: string[]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

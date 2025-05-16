import { google } from 'googleapis';

interface SheetData {
    name: string;
    email: string;
    phone: string;
    questions: {
        q1: string; q2: string; q3: string; q4: string;
        q5: string; q6: string; q7: string; q8: string;
    };
}

export async function addToGoogleSheet(data: SheetData) {
    const { name, email, phone, questions } = data;

    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[
        name, email, phone,
        questions.q1, questions.q2,
        questions.q3, questions.q4,
        questions.q5, questions.q6,
        questions.q7, questions.q8,
        false, '', false
    ]];

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: 'Hoja 1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
    });
}
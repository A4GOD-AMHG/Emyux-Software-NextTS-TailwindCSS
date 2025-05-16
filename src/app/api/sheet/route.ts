import { NextRequest, NextResponse } from 'next/server';
import { addToGoogleSheet as _addToGoogleSheet } from '@/actions/sheet';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        await _addToGoogleSheet(data);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error('API Route /sheet error:', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

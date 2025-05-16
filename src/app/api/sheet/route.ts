import { NextRequest, NextResponse } from 'next/server';
import { addToGoogleSheet as _addToGoogleSheet } from '@/actions/sheet';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        await _addToGoogleSheet(data);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: unknown) {
        console.error('API Route /sheet error:', err);

        const errorMessage = err instanceof Error
            ? err.message
            : 'Ocurrió un error desconocido';

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

// src/app/api/settings/promo/route.ts
import { NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/settings-store';
import { revalidatePath } from 'next/cache';

/**
 * GET handler to fetch the current promo settings.
 */
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json(settings.promo);
  } catch (error) {
    console.error('[API /settings/promo GET] Error:', error);
    return NextResponse.json({ message: 'Failed to read settings' }, { status: 500 });
  }
}

/**
 * POST handler to update the promo settings.
 */
export async function POST(req: Request) {
  try {
    const newPromoSettings = await req.json();
     if (!newPromoSettings) {
      return NextResponse.json({ message: 'Invalid data provided.' }, { status: 400 });
    }

    const currentSettings = await readSettings();
    currentSettings.promo = newPromoSettings;
    await writeSettings(currentSettings);
    
    // Revalidate the homepage to show the new promo popup
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Promotional settings updated.' });
  } catch (error) {
    console.error('[API /settings/promo POST] Error:', error);
    return NextResponse.json({ message: 'Failed to write settings' }, { status: 500 });
  }
}


// src/app/api/settings/logo/route.ts
import { NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/settings-store';
import { revalidatePath } from 'next/cache';

/**
 * GET handler to fetch the current logo settings.
 */
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json({ logoUrl: settings.logoUrl });
  } catch (error) {
    console.error('[API /settings/logo GET] Error:', error);
    return NextResponse.json({ message: 'Failed to read settings' }, { status: 500 });
  }
}

/**
 * POST handler to update the logo settings.
 */
export async function POST(req: Request) {
  try {
    const { logoUrl } = await req.json();
    
    const currentSettings = await readSettings();
    currentSettings.logoUrl = logoUrl;
    await writeSettings(currentSettings);
    
    // Revalidate all pages to ensure the new logo is shown immediately
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true, message: 'Logo settings updated.' });
  } catch (error) {
    console.error('[API /settings/logo POST] Error:', error);
    return NextResponse.json({ message: 'Failed to write settings' }, { status: 500 });
  }
}

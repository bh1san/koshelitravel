
// src/app/api/settings/banner/route.ts
import { NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/settings-store';
import { revalidatePath } from 'next/cache';

/**
 * GET handler to fetch the current banner settings.
 * This is used by the admin page to load the initial data.
 */
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json(settings.banner);
  } catch (error) {
    console.error('[API /settings/banner GET] Error:', error);
    return NextResponse.json({ message: 'Failed to read settings' }, { status: 500 });
  }
}

/**
 * POST handler to update the banner settings.
 * This is called by the admin page when saving changes.
 */
export async function POST(req: Request) {
  try {
    const newBannerSettings = await req.json();
    if (!newBannerSettings || !newBannerSettings.title || !newBannerSettings.subtitle) {
      return NextResponse.json({ message: 'Invalid data provided.' }, { status: 400 });
    }

    const currentSettings = await readSettings();
    currentSettings.banner = newBannerSettings;
    await writeSettings(currentSettings);
    
    // Revalidate the homepage to ensure the new banner is shown immediately
    revalidatePath('/');
    
    return NextResponse.json({ success: true, message: 'Banner settings updated.' });
  } catch (error) {
    console.error('[API /settings/banner POST] Error:', error);
    return NextResponse.json({ message: 'Failed to write settings' }, { status: 500 });
  }
}

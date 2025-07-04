
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DEFAULT_BANNER_IMAGE_URL, DEFAULT_BANNER_TITLE, DEFAULT_BANNER_SUBTITLE } from '@/lib/mock-data';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'settings-store.json');

async function getSettings() {
  console.log(`[API /settings/banner] Reading settings from: ${settingsFilePath}`);
  try {
    await fs.access(settingsFilePath);
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    if (!fileContent) {
      console.log("[API /settings/banner] Settings file is empty, returning default structure.");
      return { banner: {}, promo: {} };
    }
    const settings = JSON.parse(fileContent);
    console.log("[API /settings/banner] Successfully read and parsed settings file.");
    return settings;
  } catch (error) {
    console.warn(`[API /settings/banner] Could not read settings file, will use defaults. Error:`, error);
    return { banner: {}, promo: {} };
  }
}

async function writeSettings(data: any) {
  console.log(`[API /settings/banner] Writing settings to: ${settingsFilePath}`);
  try {
    await fs.writeFile(settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`[API /settings/banner] Successfully wrote settings.`);
  } catch (error) {
    console.error("[API /settings/banner] Error writing settings file:", error);
    throw new Error("Could not save settings.");
  }
}

export async function GET() {
  console.log("--- [API /settings/banner] Received GET request ---");
  try {
    const settings = await getSettings();
    const bannerData = {
      imageUrl: settings.banner?.imageUrl || DEFAULT_BANNER_IMAGE_URL,
      title: settings.banner?.title || DEFAULT_BANNER_TITLE,
      subtitle: settings.banner?.subtitle || DEFAULT_BANNER_SUBTITLE,
    };
    console.log("[API /settings/banner] Sending banner data:", bannerData);
    return NextResponse.json(bannerData);
  } catch (error) {
    console.error("[API /settings/banner] GET Critical Error:", error);
    const defaultBannerData = {
      imageUrl: DEFAULT_BANNER_IMAGE_URL,
      title: DEFAULT_BANNER_TITLE,
      subtitle: DEFAULT_BANNER_SUBTITLE,
    };
    return NextResponse.json(defaultBannerData, { status: 500, statusText: "Internal Server Error" });
  }
}

export async function POST(req: Request) {
  console.log("--- [API /settings/banner] Received POST request ---");
  try {
    const body = await req.json();
    console.log("[API /settings/banner] Request body:", body);
    const { imageUrl, title, subtitle } = body;

    if (!imageUrl || !title || !subtitle) {
      console.error("[API /settings/banner] Missing required fields in request.");
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const settings = await getSettings();
    settings.banner = { imageUrl, title, subtitle };
    await writeSettings(settings);

    return NextResponse.json({ message: 'Banner settings updated successfully' });
  } catch (error: any) {
    console.error("[API /settings/banner] POST Error:", error.message, error.stack);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

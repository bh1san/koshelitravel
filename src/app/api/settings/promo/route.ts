
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DEFAULT_PROMO_IMAGE_URL } from '@/lib/mock-data';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'settings-store.json');

async function getSettings() {
  console.log(`[API /settings/promo] Reading settings from: ${settingsFilePath}`);
  try {
    await fs.access(settingsFilePath);
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    if (!fileContent) {
      console.log("[API /settings/promo] Settings file is empty, returning default structure.");
      return { banner: {}, promo: {} };
    }
    const settings = JSON.parse(fileContent);
    console.log("[API /settings/promo] Successfully read and parsed settings file.");
    return settings;
  } catch (error) {
    console.warn(`[API /settings/promo] Could not read settings file, will use defaults. Error:`, error);
    return { banner: {}, promo: {} };
  }
}

async function writeSettings(data: any) {
    console.log(`[API /settings/promo] Writing settings to: ${settingsFilePath}`);
  try {
    await fs.writeFile(settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`[API /settings/promo] Successfully wrote settings.`);
  } catch (error) {
    console.error("[API /settings/promo] Error writing settings file:", error);
    throw new Error("Could not save settings.");
  }
}

export async function GET() {
  console.log("--- [API /settings/promo] Received GET request ---");
  try {
    const settings = await getSettings();
    const promoData = {
      imageUrl: settings.promo?.imageUrl || DEFAULT_PROMO_IMAGE_URL,
    };
    console.log("[API /settings/promo] Sending promo data:", promoData);
    return NextResponse.json(promoData);
  } catch (error) {
    console.error("[API /settings/promo] GET Critical Error:", error);
    const defaultPromoData = {
      imageUrl: DEFAULT_PROMO_IMAGE_URL,
    };
    return NextResponse.json(defaultPromoData, { status: 500, statusText: "Internal Server Error" });
  }
}

export async function POST(req: Request) {
  console.log("--- [API /settings/promo] Received POST request ---");
  try {
    const body = await req.json();
    console.log("[API /settings/promo] Request body:", body);
    const { imageUrl } = body;

    if (!imageUrl) {
      console.error("[API /settings/promo] Missing required fields in request.");
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const settings = await getSettings();
    settings.promo = { imageUrl };
    await writeSettings(settings);

    return NextResponse.json({ message: 'Promo settings updated successfully' });
  } catch (error: any) {
    console.error("[API /settings/promo] POST Error:", error.message, error.stack);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

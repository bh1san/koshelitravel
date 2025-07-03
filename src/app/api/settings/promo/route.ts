import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DEFAULT_PROMO_IMAGE_URL } from '@/lib/mock-data';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'settings-store.json');

async function getSettings() {
  try {
    // Check if file exists before reading
    await fs.access(settingsFilePath);
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    // If file is empty, return default structure
    return fileContent ? JSON.parse(fileContent) : { banner: {}, promo: {} };
  } catch (error) {
     // If file doesn't exist or other read error, return default structure
    console.warn("Could not read settings file, will use defaults. Error:", error);
    return { banner: {}, promo: {} };
  }
}

async function writeSettings(data: any) {
  try {
    await fs.writeFile(settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing settings file:", error);
    throw new Error("Could not save settings.");
  }
}

export async function GET() {
  try {
    const settings = await getSettings();
    const promoData = {
      imageUrl: settings.promo?.imageUrl || DEFAULT_PROMO_IMAGE_URL,
    };
    return NextResponse.json(promoData);
  } catch (error) {
    console.error("GET /api/settings/promo Error:", error);
    const defaultPromoData = {
      imageUrl: DEFAULT_PROMO_IMAGE_URL,
    };
    return NextResponse.json(defaultPromoData, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const settings = await getSettings();
    settings.promo = { imageUrl };
    await writeSettings(settings);

    return NextResponse.json({ message: 'Promo settings updated successfully' });
  } catch (error) {
    console.error("POST /api/settings/promo Error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

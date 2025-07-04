
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DEFAULT_BANNER_IMAGE_URL, DEFAULT_BANNER_TITLE, DEFAULT_BANNER_SUBTITLE } from '@/lib/mock-data';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'settings-store.json');

async function getSettings() {
  try {
    await fs.access(settingsFilePath);
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    if (!fileContent) {
      return { banner: {}, promo: {} };
    }
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist or is unreadable/corrupt, return default structure
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
    const bannerData = {
      imageUrl: settings.banner?.imageUrl || DEFAULT_BANNER_IMAGE_URL,
      title: settings.banner?.title || DEFAULT_BANNER_TITLE,
      subtitle: settings.banner?.subtitle || DEFAULT_BANNER_SUBTITLE,
    };
    return NextResponse.json(bannerData);
  } catch (error) {
    console.error("GET /api/settings/banner Critical Error:", error);
    const defaultBannerData = {
      imageUrl: DEFAULT_BANNER_IMAGE_URL,
      title: DEFAULT_BANNER_TITLE,
      subtitle: DEFAULT_BANNER_SUBTITLE,
    };
    // Return a default response even on critical failure to prevent blank screens
    return NextResponse.json(defaultBannerData, { status: 500, statusText: "Internal Server Error" });
  }
}

export async function POST(req: Request) {
  try {
    const { imageUrl, title, subtitle } = await req.json();

    if (!imageUrl || !title || !subtitle) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const settings = await getSettings();
    settings.banner = { imageUrl, title, subtitle };
    await writeSettings(settings);

    return NextResponse.json({ message: 'Banner settings updated successfully' });
  } catch (error) {
    console.error("POST /api/settings/banner Error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

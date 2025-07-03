import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'settings-store.json');

async function getSettings() {
  try {
    const fileContent = await fs.readFile(settingsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading settings file:", error);
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
    return NextResponse.json(settings.banner);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

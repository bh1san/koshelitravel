
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

interface ResizeConfig {
  [key: string]: {
    width: number;
    height: number;
    fit: keyof sharp.FitEnum;
  };
}

// Define optimal sizes for different image types
const resizeConfig: ResizeConfig = {
  banners: { width: 1920, height: 1080, fit: 'cover' },
  packages: { width: 800, height: 600, fit: 'cover' },
  blogs: { width: 800, height: 400, fit: 'cover' },
  team: { width: 300, height: 300, fit: 'cover' },
  promo: { width: 1080, height: 1080, fit: 'inside' },
  general: { width: 1024, height: 1024, fit: 'inside' },
};


export async function POST(req: Request) {
  console.log('--- Received image upload request ---');
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file || !folder) {
      console.error('Upload API Error: Missing file or folder data.');
      return NextResponse.json({ success: false, message: 'Missing file or folder data.' }, { status: 400 });
    }

    console.log(`File Name: ${file.name}, Folder: ${folder}, Size: ${file.size} bytes`);

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a new filename with .webp extension
    const filename = `${Date.now()}.webp`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    const filePath = path.join(uploadDir, filename);

    console.log(`Attempting to write optimized image to: ${filePath}`);

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Directory ${uploadDir} ensured.`);

    // Get the resize configuration for the folder, or fallback to general
    const config = resizeConfig[folder] || resizeConfig.general;

    // Process the image with Sharp
    await sharp(buffer)
      .resize(config.width, config.height, { fit: config.fit })
      .webp({ quality: 80 }) // Convert to webp with 80% quality
      .toFile(filePath);

    console.log(`Successfully wrote optimized file ${filename}.`);

    const publicUrl = `/uploads/${folder}/${filename}`;
    
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error: any) {
    console.error('--- UPLOAD API CRITICAL ERROR ---');
    console.error(`Error details: ${error.message}`);
    console.error(`Stack trace: ${error.stack}`);
    console.error('---------------------------------');
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

    console.log(`File Name: ${file.name}, Folder: ${folder}`);

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileExtension = path.extname(file.name) || '.png';
    const filename = `${Date.now()}${fileExtension}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    const filePath = path.join(uploadDir, filename);

    console.log(`Attempting to write to: ${filePath}`);

    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Directory ${uploadDir} ensured.`);

    await fs.writeFile(filePath, buffer);
    console.log(`Successfully wrote file ${filename}.`);

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

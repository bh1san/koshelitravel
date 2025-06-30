
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file || !folder) {
      return NextResponse.json({ success: false, message: 'Missing file or folder data.' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a unique filename
    const fileExtension = path.extname(file.name) || '.png';
    const filename = `${Date.now()}${fileExtension}`;
    
    // Define the upload path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    const filePath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the filesystem
    await fs.writeFile(filePath, buffer);

    // Return the public URL of the uploaded file
    const publicUrl = `/uploads/${folder}/${filename}`;
    
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

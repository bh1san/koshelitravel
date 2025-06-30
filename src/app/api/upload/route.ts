import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { file, folder } = data;

    if (!file || !folder) {
      return NextResponse.json({ success: false, message: 'Missing file or folder data.' }, { status: 400 });
    }

    // The file is a Data URL: "data:image/png;base64,iVBORw0KGgo..."
    // We need to extract the mime type, extension, and the base64 data.
    const matches = file.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ success: false, message: 'Invalid file format.' }, { status: 400 });
    }
    
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const fileExtension = mimeType.split('/')[1] || 'png';
    const filename = `${Date.now()}.${fileExtension}`;
    
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

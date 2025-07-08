
import { NextResponse } from 'next/server';
import { readPackages } from '@/lib/package-store';

export async function GET() {
  try {
    const packages = await readPackages();
    return NextResponse.json(packages);
  } catch (error) {
    console.error('[API /packages GET] Error:', error);
    return NextResponse.json({ message: 'Failed to read package data' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures this route is re-executed on every request

export async function GET() {
  try {
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}

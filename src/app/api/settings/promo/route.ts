
// This API route is deprecated and no longer used.
// The functionality has been replaced by a more robust Server Action
// located in /src/app/actions/settingsActions.ts
// This file can be safely deleted.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This endpoint is deprecated.' }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ message: 'This endpoint is deprecated.' }, { status: 410 });
}

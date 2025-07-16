
import {NextResponse} from 'next/server';

const adstxt = `google.com, pub-3785928841766736, DIRECT, f08c47fec0942fa0`;

export async function GET() {
  return new NextResponse(adstxt, {
    headers: {'Content-Type': 'text/plain'},
  });
}

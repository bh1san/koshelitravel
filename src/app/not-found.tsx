import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-semibold tracking-wider text-neutral-200">404</h1>
      <p className="mt-4 text-lg text-neutral-400">This page could not be found.</p>
      <Button asChild variant="link" className="mt-10 text-neutral-300 hover:text-white">
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}

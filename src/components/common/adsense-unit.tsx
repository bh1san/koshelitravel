
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

interface AdsenseUnitProps {
  adClient?: string;
  adSlot?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AdsenseUnit({
  adClient,
  adSlot,
  className,
  style = { display: 'block', textAlign: 'center' },
}: AdsenseUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Adsense error:', err);
    }
  }, []);

  if (!adClient || !adSlot || adClient.includes('YOUR_ADSENSE_CLIENT_ID') || adSlot.includes('YOUR_AD_SLOT_ID')) {
    return (
        <div className="text-center p-4 my-4 bg-muted border border-border rounded-md text-muted-foreground">
            <p className="font-bold">Advertisement</p>
            <p className="text-sm">Your ad unit will be displayed here once configured.</p>
        </div>
    );
  }

  return (
    <div className={className} key={adSlot}>
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
    </div>
  );
}

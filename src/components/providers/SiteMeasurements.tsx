'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Never send document links or other parameters from the presentation viewer.
function withoutParameters<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  } catch { return null; }
}

export function SiteMeasurements() {
  return <><Analytics beforeSend={withoutParameters} /><SpeedInsights beforeSend={withoutParameters} /></>;
}

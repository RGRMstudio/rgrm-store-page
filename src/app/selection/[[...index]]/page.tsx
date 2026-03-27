'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  // This renders the entire Sanity CMS inside your Next.js app!
  return <NextStudio config={config} />;
}

'use client';

// This is the main website page
// The full React frontend from the artifact is imported here
// It fetches data from /api/* routes which connect to Supabase

import { useState, useEffect } from 'react';
import Website from '@/components/Website';

export default function Page() {
  return <Website />;
}

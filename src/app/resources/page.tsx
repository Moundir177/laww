'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResourcesPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the homepage
    router.push('/');
  }, [router]);
  
  // Return empty div while redirecting
  return <div></div>;
} 
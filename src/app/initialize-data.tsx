'use client';

import { useEffect, useState } from 'react';
import { initializeData } from '@/lib/api';
import { initializeNewsData } from '@/lib/newsApi';
import { initializeTeamData } from '@/lib/teamApi';
import { initializeTestimonialsData } from '@/lib/testimonialsApi';
import { initializeMediaData } from '@/lib/mediaApi';

export default function InitializeDataComponent() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize all data
    initializeData();
    initializeNewsData();
    initializeTeamData();
    initializeTestimonialsData();
    initializeMediaData();
    
    setInitialized(true);
  }, []);

  return (
    <div className="hidden">
      {initialized ? 'Data initialized' : 'Initializing data...'}
    </div>
  );
} 
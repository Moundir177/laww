'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import React from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </LanguageProvider>
  );
} 
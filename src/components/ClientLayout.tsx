'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import React from 'react';
import InitializeDataComponent from '@/app/initialize-data';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <InitializeDataComponent />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </LanguageProvider>
  );
} 
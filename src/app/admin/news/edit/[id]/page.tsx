import EditNewsClient from './client';
import { getNews } from '@/lib/database';

// Generate static params for the IDs
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

// The page component (server component)
export default function EditNewsPage() {
  return <EditNewsClient />;
} 
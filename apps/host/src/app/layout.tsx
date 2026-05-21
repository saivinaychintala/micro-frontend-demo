import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Micro-Frontend Demo',
  description: 'Demonstration of Micro-Frontend architecture with Module Federation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          <Navigation />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

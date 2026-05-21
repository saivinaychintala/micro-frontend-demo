import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navigation } from '@/components/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

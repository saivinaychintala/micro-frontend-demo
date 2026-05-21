import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navigation } from '@/components/Navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setCurrentPath(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navigation currentPath={currentPath} />
      <main className="flex-1 overflow-y-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

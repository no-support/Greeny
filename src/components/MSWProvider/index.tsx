'use client';
import { initMocking } from '@/mocks';
import { isMocking } from '@/mocks/constants';
import { useEffect, useState } from 'react';

const initialValue = !isMocking();

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(initialValue);

  useEffect(() => {
    if (!isReady) {
      // import('@/mocks/browser').then((module) => {
      //   module.worker.start();
      //   setIsReady(true);
      // });
      (async () => {
        await initMocking();

        setIsReady(true);
      })();
    }
  }, [isReady]);
  if (!isReady) {
    return null;
  }
  return children;
};

'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Container } from '@micro-frontend-demo/ui';

// @ts-ignore
const StatsWidget = React.lazy(() => import('dashboard/StatsWidget'));
// @ts-ignore
const ChartWidget = React.lazy(() => import('dashboard/ChartWidget'));
// @ts-ignore
const ActivityWidget = React.lazy(() => import('dashboard/ActivityWidget'));

function LoadingFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
      <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export function DashboardRemote() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Analytics and key metrics overview</p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <div className="space-y-6">
            <StatsWidget />
            <ChartWidget />
            <ActivityWidget />
          </div>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

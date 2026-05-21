'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Container } from '@micro-frontend-demo/ui';

// @ts-ignore
const ProfileForm = React.lazy(() => import('settings/ProfileForm'));
// @ts-ignore
const PreferencesForm = React.lazy(() => import('settings/PreferencesForm'));
// @ts-ignore
const SecurityForm = React.lazy(() => import('settings/SecurityForm'));

function LoadingFallback() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="h-48 bg-gray-200 rounded-lg"></div>
      <div className="h-56 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export function SettingsRemote() {
  return (
    <Container className="py-8" maxWidth="lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600">Manage your account and preferences</p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <div className="space-y-6">
            <ProfileForm />
            <PreferencesForm />
            <SecurityForm />
          </div>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

import { Container } from '@micro-frontend-demo/ui';
import ProfileForm from '../forms/ProfileForm';
import PreferencesForm from '../forms/PreferencesForm';
import SecurityForm from '../forms/SecurityForm';
import Head from 'next/head';

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings Remote</title>
        <meta name="description" content="Settings micro-frontend application" />
      </Head>

      <Container className="py-8" maxWidth="lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">Standalone settings application (Port 3002)</p>
        </div>

        <div className="space-y-6">
          <ProfileForm />
          <PreferencesForm />
          <SecurityForm />
        </div>
      </Container>
    </>
  );
}

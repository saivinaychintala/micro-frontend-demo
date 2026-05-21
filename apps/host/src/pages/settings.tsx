import { SettingsRemote } from '@/remotes/SettingsRemote';
import Head from 'next/head';

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings | Micro-Frontend Demo</title>
      </Head>
      <SettingsRemote />
    </>
  );
}

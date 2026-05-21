import { DashboardRemote } from '@/remotes/DashboardRemote';
import Head from 'next/head';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Micro-Frontend Demo</title>
      </Head>
      <DashboardRemote />
    </>
  );
}

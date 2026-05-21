import { Container } from '@micro-frontend-demo/ui';
import StatsWidget from '../widgets/StatsWidget';
import ChartWidget from '../widgets/ChartWidget';
import ActivityWidget from '../widgets/ActivityWidget';

export default function DashboardPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Standalone dashboard application (Port 3001)</p>
      </div>

      <div className="space-y-6">
        <StatsWidget />
        <ChartWidget />
        <ActivityWidget />
      </div>
    </Container>
  );
}

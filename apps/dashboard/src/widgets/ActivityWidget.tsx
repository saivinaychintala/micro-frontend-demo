'use client';

import { Card, CardHeader, CardBody } from '@micro-frontend-demo/ui';

export default function ActivityWidget() {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'created a new project',
      target: 'Mobile App Redesign',
      time: '2 minutes ago',
      avatar: 'JD',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      user: 'Sarah Smith',
      action: 'commented on',
      target: 'Dashboard Analytics',
      time: '15 minutes ago',
      avatar: 'SS',
      color: 'bg-purple-500',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'completed',
      target: 'User Authentication',
      time: '1 hour ago',
      avatar: 'MJ',
      color: 'bg-green-500',
    },
    {
      id: 4,
      user: 'Emily Brown',
      action: 'uploaded files to',
      target: 'Design Assets',
      time: '2 hours ago',
      avatar: 'EB',
      color: 'bg-orange-500',
    },
    {
      id: 5,
      user: 'David Wilson',
      action: 'invited',
      target: '3 new members',
      time: '3 hours ago',
      avatar: 'DW',
      color: 'bg-pink-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Latest updates from your team</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}
                  <span className="text-gray-600">{activity.action}</span>
                  {' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

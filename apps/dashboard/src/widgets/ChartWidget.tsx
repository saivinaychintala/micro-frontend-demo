'use client';

import { Card, CardHeader, CardBody } from '@micro-frontend-demo/ui';

export default function ChartWidget() {
  const data = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 },
    { month: 'Jul', value: 72 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
            <p className="text-sm text-gray-600">Monthly revenue in thousands</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">This Year</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-end justify-between h-64 space-x-2">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center mb-2" style={{ height: '200px' }}>
                  <div
                    className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-colors cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${item.value}K
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}

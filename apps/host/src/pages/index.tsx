import { Container, Card, CardBody } from '@micro-frontend-demo/ui';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Micro-Frontend Demo</title>
        <meta name="description" content="Demonstration of Micro-Frontend architecture with Module Federation" />
      </Head>

      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Micro-Frontend Architecture Demo
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to the host application using Module Federation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Dashboard Remote</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Independent micro-frontend with analytics widgets, charts, and real-time data visualization.
              </p>
              <div className="flex items-center text-sm text-blue-600">
                <span>Port: 3001</span>
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Settings Remote</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Configuration micro-frontend with profile settings, preferences, and security options.
              </p>
              <div className="flex items-center text-sm text-purple-600">
                <span>Port: 3002</span>
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Shared UI Library</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Common component library shared across all micro-frontends with consistent styling.
              </p>
              <div className="flex items-center text-sm text-green-600">
                <span>@micro-frontend-demo/ui</span>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Runtime Integration</h4>
                    <p className="text-gray-600">Remote applications load dynamically at runtime using Module Federation</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Independent Deployment</h4>
                    <p className="text-gray-600">Each micro-frontend can be deployed separately without affecting others</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Shared Dependencies</h4>
                    <p className="text-gray-600">React and other libraries are shared as singletons to avoid duplication</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Type Safety</h4>
                    <p className="text-gray-600">Full TypeScript support across all applications</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
}

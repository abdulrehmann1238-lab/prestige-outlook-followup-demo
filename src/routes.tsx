import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { AppShell } from './components/app/AppShell';
import { Skeleton } from './components/ui/Skeleton';

// Lazy load app routes per PRD Section 14
const TodayPage = lazy(() => import('./pages/app/Today').then((m) => ({ default: m.TodayPage })));
const PipelinePage = lazy(() => import('./pages/app/Pipeline').then((m) => ({ default: m.PipelinePage })));
const ReviewPage = lazy(() => import('./pages/app/Review').then((m) => ({ default: m.ReviewPage })));
const ProspectsPage = lazy(() => import('./pages/app/Prospects').then((m) => ({ default: m.ProspectsPage })));
const ManualListPage = lazy(() => import('./pages/app/ManualList').then((m) => ({ default: m.ManualListPage })));
const SequencesPage = lazy(() => import('./pages/app/Sequences').then((m) => ({ default: m.SequencesPage })));
const VoicePage = lazy(() => import('./pages/app/Voice').then((m) => ({ default: m.VoicePage })));
const OutlookPage = lazy(() => import('./pages/app/Outlook').then((m) => ({ default: m.OutlookPage })));
const CompliancePage = lazy(() => import('./pages/app/Compliance').then((m) => ({ default: m.CompliancePage })));
const ActivityPage = lazy(() => import('./pages/app/Activity').then((m) => ({ default: m.ActivityPage })));
const ReportsPage = lazy(() => import('./pages/app/Reports').then((m) => ({ default: m.ReportsPage })));
const ArchitecturePage = lazy(() => import('./pages/app/Architecture').then((m) => ({ default: m.ArchitecturePage })));
const SettingsPage = lazy(() => import('./pages/app/Settings').then((m) => ({ default: m.SettingsPage })));

const SuspenseFallback = () => (
  <div className="space-y-4 p-4 animate-in fade-in duration-160">
    <Skeleton className="h-10 w-48" />
    <Skeleton className="h-6 w-96" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
    <Skeleton className="h-64 w-full pt-4" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/today" replace />,
      },
      {
        path: 'today',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <TodayPage />
          </Suspense>
        ),
      },
      {
        path: 'pipeline',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PipelinePage />
          </Suspense>
        ),
      },
      {
        path: 'pipeline/:id',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PipelinePage />
          </Suspense>
        ),
      },
      {
        path: 'review',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ReviewPage />
          </Suspense>
        ),
      },
      {
        path: 'prospects',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ProspectsPage />
          </Suspense>
        ),
      },
      {
        path: 'prospects/manual',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ManualListPage />
          </Suspense>
        ),
      },
      {
        path: 'sequences',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <SequencesPage />
          </Suspense>
        ),
      },
      {
        path: 'voice',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <VoicePage />
          </Suspense>
        ),
      },
      {
        path: 'outlook',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <OutlookPage />
          </Suspense>
        ),
      },
      {
        path: 'compliance',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <CompliancePage />
          </Suspense>
        ),
      },
      {
        path: 'activity',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ActivityPage />
          </Suspense>
        ),
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ReportsPage />
          </Suspense>
        ),
      },
      {
        path: 'architecture',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ArchitecturePage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

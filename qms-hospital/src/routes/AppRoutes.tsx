import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/auth/Login';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const Admin = React.lazy(() => import('../pages/admin/Admin'));
const Documents = React.lazy(() => import('../pages/documents/Documents'));
const Performance = React.lazy(() => import('../pages/performance/Performance'));
const Risks = React.lazy(() => import('../pages/risks/Risks'));
const AuditCompliance = React.lazy(() => import('../pages/audit-compliance/AuditCompliance'));
const Training = React.lazy(() => import('../pages/training/Training'));
const Feedback = React.lazy(() => import('../pages/feedback/Feedback'));
const Incidents = React.lazy(() => import('../pages/incidents/Incidents'));
const Safety = React.lazy(() => import('../pages/safety/Safety'));
const Meetings = React.lazy(() => import('../pages/meetings/Meetings'));
const StrategyProjects = React.lazy(() => import('../pages/strategy-projects/StrategyProjects'));
const Knowledge = React.lazy(() => import('../pages/knowledge/Knowledge'));

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={['qualityAdmin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          
          <Route path="documents" element={<Documents />} />
          
          <Route
            path="performance"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <Performance />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="risks"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <Risks />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="audit-compliance"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <AuditCompliance />
              </ProtectedRoute>
            }
          />
          
          <Route path="training" element={<Training />} />
          
          <Route path="feedback" element={<Feedback />} />
          
          <Route
            path="incidents"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <Incidents />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="safety"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <Safety />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="meetings"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <Meetings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="strategy-projects"
            element={
              <ProtectedRoute allowedRoles={['ceo', 'qualityAdmin', 'hod']}>
                <StrategyProjects />
              </ProtectedRoute>
            }
          />
          
          <Route path="knowledge" element={<Knowledge />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
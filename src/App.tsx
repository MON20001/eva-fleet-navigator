import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { lazy, Suspense } from "react";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RoleIntroduction = lazy(() => import("./pages/RoleIntroduction"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WorkerDashboard = lazy(() => import("./pages/WorkerDashboard"));
const BusDriverDashboard = lazy(() => import("./pages/BusDriverDashboard"));
const TruckDriverDashboard = lazy(() => import("./pages/TruckDriverDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));

const queryClient = new QueryClient();

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Auth guard component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// Dashboard redirect based on role
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  switch (user.role) {
    case "worker": return <Navigate to="/worker" replace />;
    case "bus-driver": return <Navigate to="/bus-driver" replace />;
    case "truck-driver": return <Navigate to="/truck-driver" replace />;
    case "admin": return <Navigate to="/admin" replace />;
  }
};

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/intro" element={<RoleIntroduction />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardRedirect />} />
      <Route path="/worker" element={<ProtectedRoute allowedRoles={["worker"]}><WorkerDashboard /></ProtectedRoute>} />
      <Route path="/bus-driver" element={<ProtectedRoute allowedRoles={["bus-driver"]}><BusDriverDashboard /></ProtectedRoute>} />
      <Route path="/truck-driver" element={<ProtectedRoute allowedRoles={["truck-driver"]}><TruckDriverDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/feature/:id" element={<FeaturePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

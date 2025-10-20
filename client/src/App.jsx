import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import MainLayout from "@/layout/MainLayout";

// 💤 Lazy imports
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/AdminPanel"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Loading = lazy(() => import("./components/Loading.jsx"));
const Verify = lazy(() => import("./pages/Verify"));
const ArticlePage = lazy(() => import("./pages/Article"));

// 🔐 Componente para proteger rutas
function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth(); 

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ⚙️ Configurar el router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/article/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ArticlePage />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Suspense fallback={<Loading />}>
              <Admin />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/verify",
    element: (
      <Suspense fallback={<Loading />}>
        <Verify />
      </Suspense>
    ),
  },
  { 
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

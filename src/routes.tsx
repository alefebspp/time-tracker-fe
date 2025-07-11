import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import AppLayout from "./layouts/app-layout";
import NotFound from "./components/not-found";
import DashboardPage from "./pages/dashboard";
import HistoryPage from "./pages/dashboard/history";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
        {
          path: "cadastro",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <DashboardPage />,
        },
        {
          path: "historico",
          element: <HistoryPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

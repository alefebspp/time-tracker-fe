import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import Header from "@/components/header";

import api from "@/lib/axios";
import { useUserContext } from "@/contexts/user-context";

export default function AppLayout() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 401) {
            if (user) {
              logout();
            }
            toast("Por favor, faça login.");

            navigate("/", { replace: true });
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col w-full h-screen">
      <Header />
      <div className="w-full h-full p-4 lg:p-16 overflow-y-auto">
        <div className="w-full h-full max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

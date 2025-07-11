import { useUserContext } from "@/contexts/user-context";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const atAuthenticationPages = pathname === "/" || pathname === "/cadastro";

    if (user) {
      if (atAuthenticationPages) {
        navigate("/dashboard");
      }
    }
  }, [user]);

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <img src="/logo.svg" alt="App logo" className="size-12" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/app-banner.png"
          alt="Login Banner"
          className="w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  );
}

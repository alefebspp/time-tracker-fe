import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { useUserContext } from "@/contexts/user-context";
import { logout } from "@/services/auth";
import MobileHeaderDrawer from "./mobile-header-drawer";

export default function Header() {
  const { logout: contextLogout } = useUserContext();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    contextLogout();

    navigate("/", { replace: true });
  }

  return (
    <header className="w-full h-20 flex items-center justify-between border-b border-app-gray-border px-4 lg:px-8">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="App logo" className="size-6" />
        <span className="hidden lg:block text-app-gray-dark text-2xl font-semibold">
          TimeTrack
        </span>
      </div>

      <MobileHeaderDrawer />
      <div className="hidden lg:flex h-full items-center gap-12">
        <button
          onClick={() => navigate("/dashboard/historico")}
          className="appearance-none font-semibold text-base"
        >
          Histórico
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="appearance-none font-semibold"
        >
          Início
        </button>
        <Button
          onClick={handleLogout}
          className="flex items-center justify-between"
          variant="outline"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

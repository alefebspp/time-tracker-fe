import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useUserContext } from "@/contexts/user-context";
import { logout } from "@/services/auth";
import { Button } from "./ui/button";

export default function MobileHeaderDrawer() {
  const [open, setOpen] = useState<boolean>(false);

  const { logout: contextLogout } = useUserContext();
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);

    setOpen(false);
  }

  async function handleLogout() {
    await logout();

    contextLogout();

    navigate("/", { replace: true });
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger className="lg:hidden">
        <Menu className="w-6 h-6 text-app-gray-dark lg:hidden" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navegue pelas seções</DrawerTitle>
        </DrawerHeader>
        <DrawerClose className="absolute top-2 right-2">
          <X />
        </DrawerClose>
        <div className="w-full h-full flex flex-col p-4">
          <button
            onClick={() => handleNavigate("/dashboard/historico")}
            className="appearance-none border py-2 border-app-gray-border font-semibold text-xl mb-4"
          >
            Histórico
          </button>
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="appearance-none border py-2 border-app-gray-border font-semibold text-xl"
          >
            Início
          </button>
          <Button
            onClick={handleLogout}
            className="flex items-center justify-center gap-4 mt-auto"
            variant="outline"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

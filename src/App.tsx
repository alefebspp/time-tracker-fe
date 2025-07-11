import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import AppRoutes from "./routes";
import { Toaster } from "@/components/ui/sonner";
import { UserContextProvider } from "./contexts/user-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Toaster
          toastOptions={{
            classNames: {
              success: "!bg-green-100 !text-green-600 !border-green-100",
              error: "!bg-red-100 !text-red-600 !border-red-100",
            },
          }}
        />
        <AppRoutes />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;

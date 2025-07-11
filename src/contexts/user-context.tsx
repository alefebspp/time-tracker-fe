import { useQuery } from "@tanstack/react-query";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { User } from "@/types";
import { getProfile } from "@/services/auth";

export interface UserContextProps {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  loadingUser: boolean;
  logout(): void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>();

  const { isLoading } = useQuery({
    queryFn: async () => {
      const data = await getProfile();

      if (data.user) {
        setUser(data.user);
      }

      return data;
    },
    queryKey: ["profile"],
    enabled: !user,
    refetchOnWindowFocus: false,
    retry: false,
  });

  function logout() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loadingUser: isLoading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextProps {
  const context = useContext(UserContext) as UserContextProps;

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}

export default UserContext;

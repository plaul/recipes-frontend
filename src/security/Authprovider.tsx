import { createContext, useState, ReactNode } from "react";
import { fakeAuthProvider, User } from "../services/authFacade";
import { useContext } from "react";

interface AuthContextType {
  user: any;
  signIn: (user: User) => Promise<any>;
  signOut: () => Promise<void>;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
  skipSecurity: () => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);
const SKIP_SECURITY = false;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);

  const signIn = async (user_: User) => {
    return fakeAuthProvider.signIn(user_).then((user) => {
      setUser(user);
      setRoles(user.roles || null);
      return user;
    });
  };

  const signOut = () => {
    return fakeAuthProvider.signOut().then(() => setUser(null));
  };

  function isLoggedIn() {
    if (SKIP_SECURITY) return true;
    return user != null;
  }

  function isLoggedInAs(role: string[]) {
    return user?.roles?.some((r) => role.includes(r)) || false;
  }

  function skipSecurity() {
    return SKIP_SECURITY;
  }
  const value = { user, isLoggedIn, isLoggedInAs, signIn, signOut, skipSecurity };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

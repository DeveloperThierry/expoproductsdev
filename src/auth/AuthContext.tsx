import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAsyncUser, removeAsyncUser, setAsyncUser } from "./AsyncAuth";
interface IUser {
  username: string;
  password: string;
}
interface IAuthContext {
  user: IUser | null;
  logout: () => void;
  signUp: (username: string, password: string) => void;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const fetchUser = async () => {
    try {
      const res = await getAsyncUser();
      if (!res) return;
      setUser(res);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await removeAsyncUser();
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };
  const signUp = async (username: string, password: string) => {
    try {
      await setAsyncUser(username, password);
      setUser({ username: username, password: password });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error AuthContext");
  return context;
};

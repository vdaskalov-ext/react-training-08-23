import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const initialValue = {
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};
const AuthContext = createContext<AuthContext>(initialValue);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ ...initialValue, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

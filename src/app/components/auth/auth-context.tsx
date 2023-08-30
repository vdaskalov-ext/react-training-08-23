import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from 'react';
import {useLogin, useRegister} from './auth-utils';

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

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const register = useRegister();
    const login = useLogin(() => {
        setIsAuthenticated(true);
    });

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                register,
                logout: () => {
                    setIsAuthenticated(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

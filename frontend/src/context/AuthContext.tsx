import { createContext, useState, useEffect, useContext } from "react";
import { type User, type AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
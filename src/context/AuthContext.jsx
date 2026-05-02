import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const fetchUser = async () => {
        try {
            const { data } = await API.get("/users/profile");
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", { email, password });
        setUser(data.user);
    };

    const register = async (name, email, password) => {
        const { data } = await API.post("/auth/register", { name, email, password });
        setUser(data.user);
    };

    const logout = async () => {
        await API.post("/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isCheckingAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

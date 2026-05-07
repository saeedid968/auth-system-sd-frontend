import { useCallback, useState } from "react";
import API from "../services/api";
import AuthContext from "./AuthContextCore";
const STORAGE_KEY = "mern_auth_user";

const getStoredUser = () => {
    try {
        const user = sessionStorage.getItem(STORAGE_KEY);
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

const storeUser = (user) => {
    if (user) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
        sessionStorage.removeItem(STORAGE_KEY);
    }
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getStoredUser);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(Boolean(getStoredUser()));

    const checkAuth = useCallback(async () => {
        setIsCheckingAuth(true);
        try {
            const { data } = await API.get("/users/profile");
            setUser(data.user);
            storeUser(data.user);
        } catch {
            setUser(null);
            storeUser(null);
        } finally {
            setIsCheckingAuth(false);
            setHasCheckedAuth(true);
        }
    }, []);


    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", { email, password });
        setUser(data.user);
        storeUser(data.user);
        setHasCheckedAuth(true);
    };

    const register = async (name, email, password) => {
        const { data } = await API.post("/auth/register", { name, email, password });
        setUser(data.user);
        storeUser(data.user);
        setHasCheckedAuth(true);
    };

    const logout = async () => {
        await API.post("/auth/logout");
        setUser(null);
        storeUser(null);
        setHasCheckedAuth(true);
    };

    return (
        <AuthContext.Provider value={{ user, isCheckingAuth, hasCheckedAuth, checkAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

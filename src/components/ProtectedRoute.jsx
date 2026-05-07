import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppLoader from "./AppLoader";

const ProtectedRoute = ({ children }) => {

    const { user, isCheckingAuth, hasCheckedAuth, checkAuth } = useAuth();

    useEffect(() => {
        if (!user && !hasCheckedAuth && !isCheckingAuth) {
            checkAuth();
        }
    }, [checkAuth, hasCheckedAuth, isCheckingAuth, user]);

    if ((isCheckingAuth || !hasCheckedAuth) && !user) {
        return <AppLoader message="Checking your session" />;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

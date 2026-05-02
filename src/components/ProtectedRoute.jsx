import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { user, isCheckingAuth } = useAuth();

    if (isCheckingAuth) {
        return null;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

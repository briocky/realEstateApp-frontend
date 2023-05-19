import { useContext } from "react";
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const { user } = useAuthContext();
    if (!user?.token) {
        return <Navigate to="/login" />
    }

    return children;
}
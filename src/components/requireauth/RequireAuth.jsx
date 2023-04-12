import { useContext } from "react";
import AuthContext from '../context/AuthContext';
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const { user } = useContext(AuthContext);
    if(!user?.token) {
        return <Navigate to="/login" />
    }

    return children;
}
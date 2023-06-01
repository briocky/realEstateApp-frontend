import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext"


export default function LoggedOut({ children }) {
  const { user } = useAuthContext();

  if (user.isFetched) {
    return <Navigate to="/" />
  }

  return children;
}
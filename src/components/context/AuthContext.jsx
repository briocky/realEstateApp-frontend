import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => { },
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;

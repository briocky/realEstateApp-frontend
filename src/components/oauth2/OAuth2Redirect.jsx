import { useContext, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { getBasicUserInfo } from "../../services/userDataService";
import { useAuthContext } from "../context/AuthContext";
import { TOKEN_KEY_NAME } from "../../constants/consts";

export default function OAuth2Redirect() {
  const { user, setUser } = useAuthContext();

  useLayoutEffect(() => {
    let cookies = new Map();

    document.cookie.split(";").forEach((cookie) => {
      let [key, value] = cookie.split("=");
      cookies.set(key.trim(), value.trim());
    });

    const jwtToken = cookies.get(TOKEN_KEY_NAME);
    sessionStorage.setItem(TOKEN_KEY_NAME, jwtToken);

    if (jwtToken) {
      getBasicUserInfo().then((response) =>
        setUser({
          ...user,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          pictureUrl: response.data.pictureUrl,
          token: jwtToken,
        })
      );
    }
  }, [user, setUser]);

  return <Navigate to="/" />;
}

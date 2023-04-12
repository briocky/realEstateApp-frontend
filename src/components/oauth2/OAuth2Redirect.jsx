import { useContext, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { getBasicUserInfo } from "../../services/userDataService";
import AuthContext from "../context/AuthContext";

export default function OAuth2Redirect() {
  const { user, setUser } = useContext(AuthContext);
  useLayoutEffect(() => {
    const jwtToken = extractUrlParameter("token");
    if (jwtToken) {
      getBasicUserInfo(jwtToken).then((response) =>
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

  function extractUrlParameter(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  return <Navigate to="/" />;
}

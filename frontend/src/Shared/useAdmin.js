import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADMIN__LOGIN, ADMIN__LOGOUT } from "../Store/Admin/Admin_types";

let timer;
function useAdmin() {
  const dispatch = useDispatch();
  const [mytoken, setMytoken] = useState();
  const [timeExpire, setTimeExpire] = useState();
  const history = useHistory();

  const login = useCallback(
    (admin, token, dd) => {
      const expireDate = dd || new Date(new Date().getTime() + 1000 * 180 * 60);
      const storedUser = JSON.stringify({
        token,
        admin,
        expireDate,
      });
      setMytoken(token);
      setTimeExpire(expireDate);
      localStorage.setItem("admin", storedUser);

      dispatch({ type: ADMIN__LOGIN, admin, token });
    },
    [dispatch]
  );
  const logout = useCallback(() => {
    localStorage.removeItem("admin");
    setMytoken("");
    dispatch({ type: ADMIN__LOGOUT });
    history.push("/AdminLogin");
  }, [dispatch]);
  useEffect(() => {
    if (mytoken) {
      const timeLeft = new Date(timeExpire).getTime() - new Date().getTime();
      console.log("timeLeft : " + timeLeft);
      timer = setTimeout(logout, timeLeft);
    } else {
      clearInterval(timer);
    }
  }, [timeExpire, logout]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("admin"));
    if (storedUser && storedUser.expireDate) {
      login(
        storedUser.admin,
        storedUser.token,
        new Date(storedUser.expireDate)
      );
    }
  }, [login]);
  return { login, logout, mytoken };
}

export default useAdmin;

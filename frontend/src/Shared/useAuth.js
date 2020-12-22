import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  STUDENT__LOGIN,
  STUDENT__LOGOUT,
} from "../Store/Student/Student_types";
let timer;
function useAuth() {
  const dispatch = useDispatch();
  const [mytoken, setMytoken] = useState();
  const [timeExpire, setTimeExpire] = useState();
  const history = useHistory();

  const login = useCallback(
    (student, token, dd) => {
      const expireDate = dd || new Date(new Date().getTime() + 1000 * 60 * 60);
      const storedUser = JSON.stringify({
        token,
        student,
        expireDate,
      });
      setMytoken(token);
      setTimeExpire(expireDate);
      localStorage.setItem("auth", storedUser);

      dispatch({ type: STUDENT__LOGIN, student, token });
    },
    [dispatch]
  );
  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setMytoken("");
    dispatch({ type: STUDENT__LOGOUT });
    history.push("/Login");
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
    const storedUser = JSON.parse(localStorage.getItem("auth"));
    if (storedUser && storedUser.expireDate) {
      login(
        storedUser.student,
        storedUser.token,
        new Date(storedUser.expireDate)
      );
    }
  }, [login]);
  return { login, logout, mytoken };
}

export default useAuth;

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //user log in using email and password
      const now = new Date().toISOString();
      console.log(navigator.userAgentData.mobile);
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email,
          password,
          sessionCreatedTime: now,
          osname: navigator.userAgentData.platform,
          time: now,
          model: navigator.userAgentData.mobile ? "mobile" : "desktop",
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!res) {
        throw new Error("could not complete login");
      } else {
        console.log(res);
        localStorage.setItem("token", res.data.token); // save token in localStorage
      }

      //dispatch login action

      dispatch({ type: "LOGIN", payload: res.data.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      const error = err.response.data.error;
      if (error.includes("ECONNREFUSED")) {
        setError("Network Error!");
      } else setError(error);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};

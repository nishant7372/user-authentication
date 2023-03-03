import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "./../axiosInstance";

const bowser = require("bowser");

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const browser = bowser.getParser(window.navigator.userAgent);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //user log in using email and password
      const res = await axiosInstance.post(
        "/users/login",
        {
          email,
          password,
          creationTime: new Date().toISOString(),
          osname: `${browser.getOSName()} ${browser.getOSVersion()}`,
          model: browser.getPlatformType(),
          browser: `${browser.getBrowserName()}`,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!res) {
        throw new Error("could not complete login");
      } else {
        localStorage.setItem("token", res.data.token); // save token in localStorage
      }

      //dispatch login action

      dispatch({ type: "LOGIN", payload: res.data.user });

      setIsPending(false);
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

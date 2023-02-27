import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, name) => {
    setError(null);
    setIsPending(true);

    try {
      //user sign up with name, email and password
      const now = new Date().toISOString();
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/users",
        data: {
          name,
          email,
          password,
          age: 20,
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
        throw new Error("could not complete signup");
      } else {
        console.log(res);
        localStorage.setItem("token", res.data.token); // save token in localStorage
      }

      // dispatch login action

      dispatch({ type: "LOGIN", payload: res.data.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      const error = err.response.data.error;
      if (error.includes("duplicate key error"))
        setError("Account already exists!");
      else if (error.includes("ECONNREFUSED")) {
        setError("Network Error!");
      } else {
        setError(error);
      }
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};

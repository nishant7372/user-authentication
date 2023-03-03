import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "../axiosInstance";

export const useSessionLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const sessionLogout = async (id, active) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //session logout out by id

      const res = await axiosInstance.post(
        `/users/logout/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${header}`,
          },
        }
      );

      if (!res) {
        throw new Error("could not complete logout");
      }
      if (active) {
        localStorage.setItem("token", null); // delete token from localStorage
        dispatch({ type: "LOGOUT" });
      }
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { sessionLogout, error, isPending };
};

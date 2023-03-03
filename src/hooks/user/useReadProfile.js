import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "./../axiosInstance";

export const useReadProfile = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const readProfile = async () => {
    if (localStorage.getItem("token") === "null") return;
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("/users/me", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      // dispatch auth_is_ready

      dispatch({ type: "AUTH_IS_READY", payload: res.data });
      setIsPending(false);
    } catch (err) {
      dispatch({ type: "AUTH_IS_READY", payload: null });

      if (err.response.status === 401) {
        localStorage.setItem("token", null); //delete token from localStorage when not Authorized
      }
      setError(err);
      setIsPending(false);
    }
  };
  return { readProfile, error, isPending };
};

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useReadProfile = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const readProfile = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/users/me",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      // dispatch auth_is_ready

      dispatch({ type: "AUTH_IS_READY", payload: res.data });
      setIsPending(false);
      setError(null);
    } catch (err) {
      dispatch({ type: "AUTH_IS_READY", payload: null });
      setError(err);
      setIsPending(false);
    }
  };
  return { readProfile, error, isPending };
};

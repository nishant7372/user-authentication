import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "../axiosInstance";

export const useGetCurrentSession = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const getCurrentSession = async () => {
    setError(null);
    setIsPending(true);

    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("/users/currentSession", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      setIsPending(false);

      if (!res) {
        throw new Error("unable to get current session details");
      } else {
        dispatch({
          type: "SESSION_INDEX",
          payload: res.data.session_id,
        });
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      dispatch({ type: "SESSION_INDEX", payload: null });
    }
  };
  return { getCurrentSession, error, isPending };
};

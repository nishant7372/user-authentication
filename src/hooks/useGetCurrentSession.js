import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useGetCurrentSession = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const getCurrentSession = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/users/currentSession",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });
      setIsPending(false);
      setError(null);
      dispatch({
        type: "SESSION_INDEX",
        payload: res.data.session_id,
      });
      return res;
    } catch (err) {
      setError(err);
      setIsPending(false);
      dispatch({ type: "SESSION_INDEX", payload: null });
    }
  };
  return { getCurrentSession, error, isPending };
};

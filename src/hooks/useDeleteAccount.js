import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useDeleteAccount = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const deleteAccount = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "delete",
        url: "http://localhost:3000/users/me",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to delete Account");
      } else {
        localStorage.setItem("token", null); //delete token from localStorage
      }

      //dispatch logout action

      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { deleteAccount, error, isPending };
};

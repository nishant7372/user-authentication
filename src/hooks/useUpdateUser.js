import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useUpdateUser = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateUser = async (updates) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:3000/users/me",
        data: updates,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to update");
      }

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setIsPending(false);
    }
  };

  return { updateUser, error, isPending };
};

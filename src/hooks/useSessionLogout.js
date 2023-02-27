import { useState } from "react";
import axios from "axios";

export const useSessionLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const sessionLogout = async (id) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //session logout out

      const res = await axios({
        method: "post",
        url: `http://localhost:3000/users/logout/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("could not complete signout");
      }

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { sessionLogout, error, isPending };
};

import { useState } from "react";
import axios from "axios";

export const useLogoutAllOther = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logoutAllOther = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //user all session sign out

      const res = await axios({
        method: "post",
        url: "http://localhost:3000/users/logoutAllOther",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });
      if (res.status !== 200) {
        throw new Error("could not complete logOut");
      }

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logoutAllOther, error, isPending };
};

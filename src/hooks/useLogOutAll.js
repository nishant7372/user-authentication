import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogoutAll = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logoutAll = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //user all session sign out

      const res = await axios({
        method: "post",
        url: "http://localhost:3000/users/logoutAll",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        throw new Error("could not complete logOut");
      } else {
        localStorage.setItem("token", null); // delete token from localStorage
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

  return { logoutAll, error, isPending };
};

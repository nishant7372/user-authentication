import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "./../axiosInstance";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //user log out

      const res = await axiosInstance.post(
        "/users/logout",
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
      } else {
        localStorage.setItem("token", null); // delete token from localStorage
      }

      //dispatch logout action

      dispatch({ type: "LOGOUT" });

      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};

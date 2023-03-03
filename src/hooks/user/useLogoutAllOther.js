import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useLogoutAllOther = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logoutAllOther = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //user all other session log out

      const res = await axiosInstance.post(
        "/users/logoutAllOther",
        {},
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${header}`,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error("could not complete logOut");
      }

      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logoutAllOther, error, isPending };
};

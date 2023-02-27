import { useState } from "react";
import axios from "axios";

export const useUploadAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const uploadAvatar = async (avatarImage) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      //user log in using email and password
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const res = await axios({
        method: "post",
        url: "http://localhost:3000/users/me/avatar",
        data: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to upload image");
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.response.data.error);
      setIsPending(false);
    }
  };

  return { uploadAvatar, error, isPending };
};

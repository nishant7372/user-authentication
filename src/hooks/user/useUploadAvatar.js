import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useUploadAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const uploadAvatar = async (avatarImage) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const res = await axiosInstance.post("/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to upload image");
      }
      setIsPending(false);
    } catch (err) {
      setError(err.response.data.error);
      setIsPending(false);
    }
  };

  return { uploadAvatar, error, isPending };
};

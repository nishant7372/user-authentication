import React, { useState } from "react";
import styles from "./uploadAvatar.module.css";
import "../Settings-common.css";
import { useUploadAvatar } from "../../../../hooks/useUploadAvatar";
import { useReadProfile } from "../../../../hooks/useReadProfile";
import Spinner from "../../../../Components/Spinner/Spinner";
import Error from "../../../../Components/Message/error";
import Successful from "../../../../Components/Message/successful";

export default function UploadAvatar() {
  const { uploadAvatar, error, isPending } = useUploadAvatar();
  const { readProfile } = useReadProfile();

  const [selectedImage, setSelectedImage] = useState(
    require("../../../../img/avatar.png")
  );

  const [isUploaded, setIsUploaded] = useState(false);
  const [renderMsg, setRenderMsg] = useState(false);

  const handleSave = async (avatarImage) => {
    await uploadAvatar(avatarImage);
    readProfile();
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
  };

  return (
    <div className={styles["avatarUpload-box"]}>
      <div className={"heading"}>Upload Avatar</div>
      <div className={`${styles["avatar-img"]}`}>
        <img
          alt="not found"
          src={isUploaded ? URL.createObjectURL(selectedImage) : selectedImage}
        />
      </div>

      {isUploaded && (
        <div className={"flex-row"}>
          {isPending && (
            <>
              <div className={styles["disabled"]}>
                <Spinner />
              </div>
            </>
          )}
          {!isPending && (
            <>
              <div
                onClick={() => {
                  handleSave(selectedImage);
                }}
                className={"saveButton"}
              >
                Save
              </div>
              <div
                onClick={() => {
                  setSelectedImage(require("../../../../img/avatar.png"));
                  setIsUploaded(false);
                }}
                className={"removeButton"}
              >
                Remove
              </div>
            </>
          )}
        </div>
      )}

      {!isUploaded && (
        <div>
          <label htmlFor="myFileInput" className={"uploadButton"}>
            Upload Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="myFileInput"
            className={styles["avatar-input"]}
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              setIsUploaded(true);
            }}
          />
        </div>
      )}
      {renderMsg && error && <Error error={error} />}
      {renderMsg && !error && !isPending && (
        <Successful successful={"Upload successful"} />
      )}
      <div className={"description"}>
        Allowed Formats: ".jpeg, .jpg, .png" <br />
        Allowed size: 1mb
      </div>
    </div>
  );
}

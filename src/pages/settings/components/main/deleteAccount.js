import styles from "./deleteAccount.module.css";
import "../Settings-common.css";

import { useState } from "react";

import { useDeleteAccount } from "../../../../hooks/user/useDeleteAccount";

import Confirm from "../../../../Components/Confirm/Confirm";

export default function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteAccount, error } = useDeleteAccount();

  const handleClick = () => {
    setShowConfirm(true);
  };

  const deleteItem = (response) => {
    if (response) {
      deleteAccount();
    }
    setShowConfirm(false);
  };

  return (
    <div className={styles["deleteAccount-box"]}>
      <div className={"heading"}>Delete Account</div>
      <div>
        <p className={"description"}>
          Permanently delete your account and all data associated with it.
        </p>
        <p className={"warning"}>
          Please note that there is no option to restore the account or its
          data.
        </p>
      </div>

      <div className={"deleteButton"} onClick={handleClick}>
        Delete Account
      </div>
      {showConfirm && (
        <Confirm
          message={"Permanently delete Account."}
          deleteItem={deleteItem}
        />
      )}
      {error && <div className={"error"}>⚠️ {error.message}</div>}
    </div>
  );
}

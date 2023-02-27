import { useAuthContext } from "../../../../hooks/useAuthContext";
import styles from "./yourDevices.module.css";
import "../Settings-common.css";
import { useLogoutAll } from "../../../../hooks/useLogOutAll";
import Spinner from "../../../../Components/Spinner/Spinner";
import Session from "../session/session";
import { useGetCurrentSession } from "../../../../hooks/useGetCurrentSession";
import { useReadProfile } from "../../../../hooks/useReadProfile";
import { useEffect } from "react";

export default function CurrentSessions() {
  const { user, currentSession } = useAuthContext();
  const { sessions } = user;
  const { logoutAll, error, isPending } = useLogoutAll();
  const { readProfile } = useReadProfile();
  const handleLogOutAll = () => {
    logoutAll();
  };

  const { getCurrentSession } = useGetCurrentSession();

  useEffect(() => {
    getCurrentSession();
    readProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles["session-Box"]}>
      {currentSession !== null && (
        <>
          <div className={"heading"}>Your Devices</div>
          <p className={"description"}>
            You’re signed in on these devices. There might be multiple activity
            sessions from the same device.
          </p>
          <ul className={styles["sessionContainer"]}>
            {[...sessions].reverse().map((session, index) => (
              <Session
                key={session._id.toString()}
                session={session}
                currentSession={currentSession === index}
              />
            ))}
          </ul>

          {isPending && (
            <div className={styles["disabled"]}>
              <Spinner />
              <span>Logging Out...</span>
            </div>
          )}
          {!isPending && (
            <div className={"logOutButton"} onClick={() => handleLogOutAll()}>
              LogOut All
            </div>
          )}
          {error && <div className={"error"}>⚠️ {error.message}</div>}
        </>
      )}
    </div>
  );
}

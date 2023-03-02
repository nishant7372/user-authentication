import styles from "./yourDevices.module.css";
import "../Settings-common.css";
import { useEffect, useState } from "react";

import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useLogoutAllOther } from "../../../../hooks/useLogoutAllOther";
import { useGetCurrentSession } from "../../../../hooks/useGetCurrentSession";
import { useReadProfile } from "../../../../hooks/useReadProfile";

import Spinner from "../../../../Components/Spinner/Spinner";
import Session from "../session/session";
import Error from "../../../../Components/Message/error";
import Successful from "../../../../Components/Message/successful";

export default function CurrentSessions() {
  const { user, currentSessionID } = useAuthContext();
  const { logoutAllOther, error, isPending } = useLogoutAllOther();
  const { readProfile } = useReadProfile();

  const { sessions } = user;

  const [renderMsg, setRenderMsg] = useState(false);

  const handleLogOutAllOther = async () => {
    await logoutAllOther();
    await readProfile();
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
  };

  const getActiveSession = (sessions) => {
    return sessions.find(
      (session) => currentSessionID === session._id.toString()
    );
  };

  const getOtherSessions = (sessions) => {
    return sessions.filter(
      (session) => currentSessionID !== session._id.toString()
    );
  };

  const { getCurrentSession } = useGetCurrentSession();

  useEffect(() => {
    getCurrentSession();
    readProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles["session-Box"]}>
      {currentSessionID && sessions && (
        <>
          <div className={"heading"}>Your Devices</div>
          <p className={"description"}>
            You’re signed in on these devices. There might be multiple activity
            sessions from the same device.
          </p>
          <ul className={styles["sessionContainer"]}>
            <Session session={getActiveSession(sessions)} active={true} />
            <div className="seperator"></div>
            {[...getOtherSessions(sessions)].reverse().map((session) => (
              <Session
                key={session._id.toString()}
                session={session}
                active={false}
              />
            ))}
          </ul>
          <div className="flex-col">
            {isPending && (
              <div className={styles["disabled"]}>
                <Spinner />
                <span>Logging Out...</span>
              </div>
            )}
            {!isPending && (
              <div
                className={"logOutButton"}
                onClick={() => handleLogOutAllOther()}
              >
                Logout All Other Sessions
              </div>
            )}
            <p className={"warning"}>
              This will end {sessions.length - 1} of your other active sessions.
              It won't affect your current session.
            </p>
          </div>
          {renderMsg && error && <Error error={error} />}
          {renderMsg && !error && !isPending && (
            <Successful successful={"Logout successful"} />
          )}
        </>
      )}
    </div>
  );
}

import styles from "./session.module.css";
import { useSessionLogout } from "../../../../hooks/useSessionLogout";
import { useReadProfile } from "../../../../hooks/useReadProfile";
import Successful from "../../../../Components/Message/successful";
import Error from "../../../../Components/Message/error";
import Spinner from "../../../../Components/Spinner/Spinner";
import "../Settings-common.css";
import { useState } from "react";

export default function Session({ session, currentSession }) {
  const { osname, time, _id, model } = session;
  const { sessionLogout, error, isPending } = useSessionLogout();
  const { readProfile } = useReadProfile();
  const [renderMsg, setRenderMsg] = useState(false);
  const date = new Date(time);
  const locale = navigator.locale;

  const options = {
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const signinDate = new Intl.DateTimeFormat(locale, options).format(date);

  const handleClick = async () => {
    await sessionLogout(_id);
    await readProfile();
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
  };

  return (
    <div className={styles["session"]}>
      <div className="flex-row">
        <div className={styles["big-img"]}>
          {model === "mobile" ? "📲" : "🖥️"}
        </div>
        <div className="flex-col">
          <div className={styles["session-name"]}>
            <div className={styles["h3"]}>{osname}</div>
            {currentSession && <Successful successful={"Current Session"} />}
          </div>
          <div className={styles["h6"]}>{signinDate}</div>
        </div>
      </div>
      <div>
        {isPending && <Spinner />}
        {!isPending && (
          <div className="logOutButton" onClick={handleClick}>
            Logout
          </div>
        )}
        {renderMsg && error && <Error error={error} />}
        {renderMsg && !error && !isPending && (
          <Successful successful={"Logout successful"} />
        )}
      </div>
    </div>
  );
}

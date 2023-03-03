import styles from "./session.module.css";
import "../Settings-common.css";

import { useState } from "react";

import { useSessionLogout } from "../../../../hooks/user/useSessionLogout";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";

import Successful from "../../../../Components/Message/successful";
import Error from "../../../../Components/Message/error";
import Spinner from "../../../../Components/Spinner/Spinner";

export default function Session({ session, active }) {
  const [renderMsg, setRenderMsg] = useState(false);

  const { sessionLogout, error, isPending } = useSessionLogout();
  const { readProfile } = useReadProfile();

  const { _id } = session;
  const { osDetails, creationTime } = session.session;
  console.log(osDetails);
  const signInDate = (creationTime) => {
    const date = new Date(creationTime);
    const locale = navigator.locale;

    const options = {
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  const handleClick = async () => {
    await sessionLogout(_id, active);
    await readProfile();
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
  };

  const showDevice = (model) => {
    switch (model) {
      case "desktop":
        return "💻";
      case "mobile":
        return "📲";
      default:
        return "💻";
    }
  };

  return (
    <div className={styles["session"]}>
      <div className={`${styles["container"]} flex-row`}>
        <div className={styles["big-img"]}>
          {osDetails.model === "tablet" && (
            <img
              src={require("./../../../../img/tablet.png")}
              className={styles["device-img"]}
              alt="tablet"
            />
          )}
          {osDetails.model !== "tablet" && showDevice(osDetails.model)}
        </div>
        <div className="flex-col">
          <div className={styles["session-name"]}>
            <div className={styles["h3"]}>{osDetails.osname}</div>
            {active && (
              <Successful
                className={styles["active-now"]}
                successful={"Active Now"}
                color={"skyblue"}
              />
            )}
          </div>
          <div className={styles["h4"]}>🌐 {osDetails.browser}</div>
          <div className={styles["h6"]}>{signInDate(creationTime)}</div>
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

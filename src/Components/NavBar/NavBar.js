import styles from "./NavBar.module.css";
import "./NavBar.css";

import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { useLogout } from "../../hooks/user/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const parseUserName = (name) => {
    if (name.indexOf(" ") !== -1) return name.substring(0, name.indexOf(" "));
    else return name;
  };

  const handleProfileClick = () => {
    if (location.pathname !== "/settings") navigate("/settings");
  };

  return (
    <div className={`${styles["nav-container"]} ${styles["sticky"]}`}>
      <div className={styles["navbar"]}>
        <div className={styles["leftSection"]}>
          {/* <img src={require("../../img/logo.png")} /> */}
          <div className={styles["name"]}>User Auth Setup</div>
        </div>
        <div className={styles["rightSection"]}>
          {!user && (
            <>
              <NavLink to="/login">LogIn</NavLink>
              <NavLink to="/signup">SignUp</NavLink>
            </>
          )}
          {user && (
            <>
              <img
                src={
                  !user.avatar
                    ? require("../../img/avatar2.png")
                    : `data:image/jpeg;base64, ${user.avatar}`
                }
                alt={"avatar"}
                className={styles["avatar"]}
                onClick={handleProfileClick}
              />
              <div className={styles["userName"]}>
                Hello, {parseUserName(user.name)}
              </div>
              <div className={`${styles[`btn`]}`} onClick={logout}>
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

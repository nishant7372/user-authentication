import styles from "./NavBar.module.css";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navColors = ["green"];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex === navColors.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const parseUserName = (name) => {
    if (name.indexOf(" ") !== -1) return name.substring(0, name.indexOf(" "));
    else return name;
  };

  const handleProfileClick = () => {
    if (location.pathname !== "/settings") navigate("/settings");
  };

  return (
    <div
      className={`${styles["nav-container"]} ${navColors[index]} ${styles.sticky}`}
    >
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          {/* <img src={require("../../img/logo.png")} /> */}
          <div className={styles.name}>User Auth Setup</div>
        </div>
        <div className={styles["rightSection"]}>
          {!user && (
            <>
              <NavLink className={`font-${navColors[index]}`} to="/login">
                LogIn
              </NavLink>
              <NavLink className={`font-${navColors[index]}`} to="/signup">
                SignUp
              </NavLink>
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
                className={styles["avatar"]}
                onClick={handleProfileClick}
              />
              <div className={styles.userName}>
                Hello, {parseUserName(user.name)}
              </div>
              <div
                className={`${styles[`btn`]} font-${navColors[index]}`}
                onClick={logout}
              >
                LogOut
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

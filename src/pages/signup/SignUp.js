import styles from "./SignUp.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks//user/useSignup";

import Spinner from "../../Components/Spinner/Spinner";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, name);
  };

  return (
    // <Fade>
    <div className={styles[`form-container`]}>
      <form
        className={styles["signup-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <h2>SignUp</h2>
        <label>
          <span>Name</span>
          <input
            className={styles["input"]}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            autoFocus
          />
        </label>
        <label>
          <span>Email</span>
          <input
            className={styles["input"]}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label className={styles.lastLabel}>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <input
              type={passwordType}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className={styles["img"]}>
              <img
                src={require(`../../img/eye-${passwordType}.png`)}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </label>
        {error && <div className={styles.error}>{"⚠️ " + error}</div>}
        {isPending && (
          <>
            <div className={styles["disabled"]}>
              <Spinner />
              <p>Creating Account...</p>
            </div>
          </>
        )}
        {!isPending && <button className={`${styles["btn"]}`}>SignUp</button>}
      </form>
    </div>
    // </Fade>
  );
}

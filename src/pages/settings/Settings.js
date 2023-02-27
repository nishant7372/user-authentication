import styles from "./Settings.module.css";
import Option from "./components/option/option";
import Setting from "./components/setting/setting";
import UploadAvatar from "./components/main/uploadAvatar";
import BasicInfo from "./components/main/basicInfo";
import DeleteAccount from "./components/main/deleteAccount";
import YourDevices from "./components/main/yourDevices";
import Security from "./components/main/security";
import { useEffect, useState } from "react";

export default function Settings() {
  const [setting, setSetting] = useState(1);
  const [option, setOption] = useState(1);

  useEffect(() => {
    setOption(1);
  }, [setting]);

  return (
    <div className={styles["main-container"]}>
      <div className={styles["settingsBox"]}>
        <div className={styles["settings-bar"]}>
          <div className={styles["left"]}>Settings</div>
          <div className={styles["right"]}>
            <Setting
              active={setting === 1}
              setting={"Profile"}
              settingNo={1}
              setSetting={setSetting}
            />
            <Setting
              active={setting === 2}
              setting={"Accounts"}
              settingNo={2}
              setSetting={setSetting}
            />
          </div>
        </div>

        {setting === 1 && (
          <div className={styles["settings"]}>
            <div className={styles["options"]}>
              <div className={styles["sub-container"]}>
                <Option
                  emoji="💁"
                  option="Upload Avatar"
                  OptionNo={1}
                  setOption={setOption}
                  active={option === 1}
                />
                <Option
                  emoji="📖"
                  option="Basic Info"
                  OptionNo={2}
                  setOption={setOption}
                  active={option === 2}
                />
              </div>
            </div>

            <div className={styles["main"]}>
              {option === 1 && <UploadAvatar />}
              {option === 2 && <BasicInfo />}
            </div>
          </div>
        )}

        {setting === 2 && (
          <div className={styles["settings"]}>
            <div className={styles["options"]}>
              <div className={styles["sub-container"]}>
                <Option
                  emoji="🔒"
                  option="Security"
                  OptionNo={1}
                  setOption={setOption}
                  active={option === 1}
                />
                <Option
                  emoji="🖥️"
                  option="Your Devices"
                  OptionNo={2}
                  setOption={setOption}
                  active={option === 2}
                />
                <Option
                  emoji="🗑️"
                  option="Delete Account"
                  OptionNo={3}
                  setOption={setOption}
                  active={option === 3}
                />
              </div>
            </div>

            <div className={styles["main"]}>
              {option === 1 && <Security />}
              {option === 2 && <YourDevices />}
              {option === 3 && <DeleteAccount />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

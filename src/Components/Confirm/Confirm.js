import Styles from "./Confirm.module.css";

export default function Confirm({ message, deleteItem }) {
  async function main() {
    let platformDetails = await navigator.userAgentData.getHighEntropyValues([
      "architecture",
      "platform",
      "platformVersion",
      "model",
      "bitness",
      "uaFullVersion",
    ]);
    console.log(platformDetails);
  }
  main();
  console.log("n", navigator.userAgentData.platform);
  return (
    <div className={Styles["overlay"]}>
      <div className={Styles["confirm-message"]}>
        <div>
          {message} <br />
          Are you sure?
        </div>
        <div className={Styles.buttonContainer}>
          <button className={Styles.yes} onClick={() => deleteItem(true)}>
            yes
          </button>
          <button className={Styles.no} onClick={() => deleteItem(false)}>
            no
          </button>
        </div>
      </div>
    </div>
  );
}

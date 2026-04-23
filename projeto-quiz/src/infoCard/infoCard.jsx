import { useContext } from "react";
import { GameContext } from "../GameContext";
import Styles from "./info.module.css";

function InfoCard() {
  const { state, progress } = useContext(GameContext);

  return (
    <div className={Styles.infoCard}>
      <p className={Styles.points}>
        Correct Answers: <span>{state.points}</span>
      </p>

      <p className={Styles.progress}>
        Progress: <span>{progress.toFixed(2)}%</span>
      </p>
    </div>
  );
}

export default InfoCard;
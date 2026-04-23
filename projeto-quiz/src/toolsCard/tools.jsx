import { useContext } from "react";
import { GameContext } from "../GameContext";
import Styles from "./tools.module.css";

function Tools() {
  const { next, state } = useContext(GameContext);
  const disabled = !state.answeredIds.includes(state.currentIndex);

  return (
    <div className={Styles.tools}>
      <button className={Styles.helpButton}>Help</button>
      <button className={Styles.previousButton}>Previous</button>

      <button
        className={`${Styles.nextButton} ${disabled? Styles.disabled: ""}`}
        onClick={next}
        disabled={disabled}
      >
        Next
      </button>
    </div>
  );
}

export default Tools;
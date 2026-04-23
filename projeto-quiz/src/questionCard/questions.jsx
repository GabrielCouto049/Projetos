import { useContext, useState } from "react";
import { GameContext } from "../GameContext";
import Styles from "./questions.module.css";

function Questions() {
  const { currentQuestion, state, answer } = useContext(GameContext);

  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    if (state.answeredIds.includes(currentQuestion.id)) return;

    setSelected(option);
    answer(option);
  };

  return (
    <div className={Styles.questionCard}>
      <h2>{currentQuestion.title}</h2>

      <ul>
        {currentQuestion.options.map((option) => {
          const isCorrect =
            state.answeredIds.includes(currentQuestion.id) &&
            option === currentQuestion.correctAnswer;

          const isWrong =
            state.answeredIds.includes(currentQuestion.id) &&
            selected === option &&
            option !== currentQuestion.correctAnswer;

          return (
            <li
              key={option}
              className={`${Styles.options} ${
                isCorrect ? Styles.correct : ""
              } ${isWrong ? Styles.wrong : ""}`}
              onClick={() => handleClick(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Questions;
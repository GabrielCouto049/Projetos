import { createContext, useReducer, useMemo, useRef } from "react";
import questionsList from "./utils/questionList.json";

import rightSoundFile from './assets/sound.wav';
import wrongSoundFile from './assets/wrong.wav';

export const GameContext = createContext(null);

const initialState = {
  points: 0,
  answeredIds: [],
  currentIndex: 0,
  finished: false,
};

function getProgress(state) {
  return Math.min((state.answeredIds.length / questionsList.length) * 100, 100);
}

function reducer(state, action) {
  switch (action.type) {
    //Caso a ação requerida seja a de responder uma questão
    case "ANSWER": {
      //Caso a pergunta atual já tenha sido respondida o estado não muda
      if (state.answeredIds.includes(action.id)) return state;

      //Se a opção atual é igual a resposta correta, o jogador acertou
      const isCorrect = action.option === action.correctAnswer;

      //Refaz o array de perguntas respondidas, dessa vez com o id da questão recem respondida
      const updatedAnswered = [...state.answeredIds, action.id];

      //Refaz o estado do jogo com os pontos e perguntas respondidas atualizados
      return {
        ...state,
        //Se o jogador acertou, incrementa a pontuação
        points: isCorrect ? state.points + 1 : state.points,
        answeredIds: updatedAnswered,
      };
    }

    //Caso a opção requerida seja a de atualizar o progresso do jogo
    case "NEXT": {
      //Incrementa o "index"(progresso) do jogo
      const nextIndex = state.currentIndex + 1;

      //Refaz o estado do jogo, dessa vez com o progresso atual e se o jogo foi finalizado ou não
      return {
        ...state,
        // Se o proximo "index" for maior ou igual ao numero de questões, o index não muda. pois o jogo finalizou
        currentIndex: nextIndex >= questionsList.length ? state.currentIndex : nextIndex,
        finished: nextIndex >= questionsList.length,
      };
    }
    //Caso a opção não seja válida, o estado não muda
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const rightSoundRef = useRef(new Audio(rightSoundFile));
  const wrongSoundRef = useRef(new Audio(wrongSoundFile));

  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestion = questionsList[state.currentIndex];

  const progress = useMemo(() => getProgress(state), [state]);

  const answer = (option) => {
    const isCorrect = option === currentQuestion.correctAnswer;
    const audio = isCorrect? rightSoundRef.current: wrongSoundRef.current;

    audio.currentTime = 0;
    audio.play();

    dispatch({
      type: "ANSWER",
      id: currentQuestion.id,
      option,
      correctAnswer: currentQuestion.correctAnswer,
    });
  };

  const next = () => dispatch({ type: "NEXT" });

  return (
    <GameContext.Provider
      value={{
        state,
        currentQuestion,
        progress,
        answer,
        next,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
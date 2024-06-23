import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import React, { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  // loading, fetched, error, active, finished
  state: "loading",
  // index of current question
  index: 0,
  // array of answers for each question
  answers: [],
  // points
  points: 0,
};

const reducer = function (currState, action) {
  switch (action.type) {
    case "fetched":
      return {
        ...currState,
        state: "fetched",
        questions: action.payload,
        answers: new Array(action.payload.length),
      };
    case "error":
      return { ...currState, state: "error" };
    case "start":
      return { ...currState, state: "active" };
    case "selectOption":
      let copyArr = [...currState.answers];
      copyArr[currState.index] = action.payload.selectedOpt;
      // update points
      if (action.payload.selectedOpt === action.payload.correctOpt) {
        return {
          ...currState,
          answers: copyArr,
          points: currState.points + action.payload.points,
        };
      } else return { ...currState, answers: copyArr };

    // TODO change the functionality so that there's a way to change your selection and then lock it after
    // case "submitAnswer":
    //   return;
    default:
      throw new Error("No Action Found");
  }
};

function App() {
  const [{ questions, answers, points, state, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await fetch("http://localhost:3001/questions");
        const res = await data.json();
        dispatch({ type: "fetched", payload: res });
      } catch (error) {
        dispatch({ type: "error" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="App">
      <Header />

      <Main>
        {state === "loading" && <Loader />}
        {state === "error" && <Error />}
        {state === "fetched" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {state === "active" && (
          <Question
            question={questions[index]}
            answered={answers[index]}
            dispatch={dispatch}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

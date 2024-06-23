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
    case "submitAnswer":
      let copyArr = [...currState.answers];
      copyArr[currState.index] = action.payload;
      return { ...currState, answers: copyArr };
    default:
      throw new Error("No Action Found");
  }
};

function App() {
  const [{ questions, answers, state, index }, dispatch] = useReducer(
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
          />
        )}
      </Main>
    </div>
  );
}

export default App;

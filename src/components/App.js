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

  index: 0,
};

const reducer = function (currState, action) {
  switch (action.type) {
    case "fetched":
      return { ...currState, state: "fetched", questions: action.payload };
    case "error":
      return { ...currState, state: "error" };
    case "start":
      return { ...currState, state: "active" };
    default:
      throw new Error("No Action Found");
  }
};

function App() {
  const [{ questions, state, index }, dispatch] = useReducer(
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
          <Question question={questions[index]} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;

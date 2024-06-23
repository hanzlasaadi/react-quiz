import Header from "./Header";
import Main from "./Main";
import React, { useEffect, useReducer } from "react";

const initialState = {
  questions: [],

  // loading, fetched, error, active, finished
  state: "loading",
};

const reducer = function (currState, action) {
  switch (action.type) {
    case "fetched":
      return { ...currState, state: "fetched", questions: action.payload };
    case "error":
      return { ...currState, state: "error" };
    default:
      throw new Error("No Action Found");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question: </p>
      </Main>
    </div>
  );
}

export default App;

import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import React, { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const TIME_FOR_QUES = 15;

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
  highscore: 0,
  timeRemaining: 60,
};

const reducer = function (currState, action) {
  switch (action.type) {
    case "fetched":
      return {
        ...currState,
        state: "fetched",
        questions: action.payload,
        answers: new Array(action.payload.length),
        timeRemaining: action.payload.length * TIME_FOR_QUES,
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

    case "next":
      return { ...currState, index: currState.index + 1 };
    case "finish":
      return {
        ...currState,
        state: "finished",
        highscore:
          currState.points > currState.highscore
            ? currState.points
            : currState.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: currState.questions,
        state: "fetched",
        answers: new Array(currState.questions.length),
      };
    case "tick":
      const newTime = currState.timeRemaining - 1;
      return { ...currState, timeRemaining: newTime };
    default:
      throw new Error("No Action Found");
  }
};

function App() {
  const [
    { questions, answers, points, highscore, state, index, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

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
          <StartScreen length={maxQuestions} dispatch={dispatch} />
        )}
        {state === "active" && (
          <>
            <Progress
              index={index}
              maxQuestions={maxQuestions}
              answer={answers[index]}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              answered={answers[index]}
              dispatch={dispatch}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton dispatch={dispatch} answer={answers[index]}>
                {index < maxQuestions - 1 ? false : true}
              </NextButton>
            </Footer>
          </>
        )}
        {state === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

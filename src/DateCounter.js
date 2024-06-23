import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(prevState, action) {
  // if (action.type === "dec") return prevState + action.payload;
  // if (action.type === "inc") return prevState + action.payload;
  // if (action.type === "setCount") return action.payload;
  // return 0;

  switch (action.type) {
    case "inc":
      return { ...prevState, count: prevState.count + prevState.step };
    case "dec":
      return { ...prevState, count: prevState.count - prevState.step };
    case "setCount":
      return { ...prevState, count: action.payload };
    case "setStep":
      return { ...prevState, step: action.payload };
    case "reset":
      return initialState;
    default:
      return new Error("No action type found for useReducer hook!");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // using useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    // useReducer hook dispatcher func
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    // useReducer hook dispatcher func
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));

    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));

    // useReducer for setting step
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);

    // useReducer for reset
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

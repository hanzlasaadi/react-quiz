function Question({ question, dispatch, answered }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={opt}
            className={`btn btn-option ${answered === i ? "answer" : ""}
            ${
              answered !== undefined
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() =>
              dispatch({
                type: "selectOption",
                payload: {
                  selectedOpt: i,
                  correctOpt: question.correctOption,
                  points: question.points,
                },
              })
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

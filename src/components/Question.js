function Question({ question, dispatch, answered }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={opt}
            className={`btn btn-option ${
              answered !== undefined && answered === i ? "answer" : ""
            }`}
            onClick={() => dispatch({ type: "submitAnswer", payload: i })}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

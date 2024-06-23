function Question({ question, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((opt, i) => (
          <button key={opt} className="btn btn-option">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

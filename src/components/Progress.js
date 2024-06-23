function Progress({ answer, maxQuestions, index, points, maxPoints }) {
  return (
    <header className="progress">
      <progress
        max={maxQuestions}
        value={index + Number(answer !== undefined)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {maxQuestions}
      </p>

      <p>
        {points} / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;

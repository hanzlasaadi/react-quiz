function NextButton({ answer, dispatch, children = false }) {
  const condition = children ? "Finish" : "Next";
  return (
    answer !== undefined && (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: condition.toLowerCase() })}
      >
        {condition} ➡
      </button>
    )
  );
}

export default NextButton;

function NextButton({ answer, dispatch }) {
  return (
    answer !== undefined && (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next ➡
      </button>
    )
  );
}

export default NextButton;

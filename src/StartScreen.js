function StartScreen({ length }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>There are {length} questions to test your legitimacy!</h3>
      <button className="btn btn-ui">Let's Start!</button>
    </div>
  );
}

export default StartScreen;

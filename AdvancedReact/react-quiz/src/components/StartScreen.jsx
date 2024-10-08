export default function StartScreen({ numQuest, dispatch }) {
  const handleClick = () => {
    dispatch({ type: `start` });
  };

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuest} questions to test your React mastery!</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's Start
      </button>
    </div>
  );
}

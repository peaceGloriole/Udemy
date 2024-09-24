import { useEffect } from "react";

export default function Timer({ dispatch, seconds }) {
  const mins = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: `tick` });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && `0`}
      {mins}:{second < 10 && `0`}
      {second} time left
    </div>
  );
}
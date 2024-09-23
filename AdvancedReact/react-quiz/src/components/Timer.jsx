import { useEffect } from "react";

export default function Timer({ dispatch, seconds }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: `tick` });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return <div className="timer">{seconds} seconds left</div>;
}

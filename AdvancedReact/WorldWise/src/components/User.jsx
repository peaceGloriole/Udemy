import styles from "./User.module.css";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate(`/`);
  }

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

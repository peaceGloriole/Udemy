import FriendsList from "./components/FriendsList";
import FriendAddForm from "./components/friendAddForm/FriendAddForm";
import Button from "./components/Button";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FriendAddForm />
      </div>
    </div>
  );
}

export default App;

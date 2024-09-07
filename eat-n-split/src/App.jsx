import FormSplit from "./components/FormSplit";
import FriendsList from "./components/FriendsList";
import FriendAddForm from "./components/friendAddForm/FriendAddForm";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FriendAddForm />
      </div>
      <FormSplit />
    </div>
  );
}

export default App;

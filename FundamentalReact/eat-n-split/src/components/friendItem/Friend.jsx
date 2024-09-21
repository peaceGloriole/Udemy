import Button from "../Button";

export default function Friend({ friend, onSelect, selected }) {
  const isSelected = selected?.id === friend.id;

  const balanceColor = (balance) => {
    if (balance === 0) return "";
    return balance < 0 ? `red` : `green`;
  };

  const handleClick = () => {
    onSelect(friend);
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={balanceColor(friend.balance)}>
        {friend.balance === 0
          ? `You and ${friend.name} are even`
          : friend.balance < 0
          ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
          : `${friend.name} owes you ${Math.abs(friend.balance)}$`}
      </p>
      <Button onClick={handleClick}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}

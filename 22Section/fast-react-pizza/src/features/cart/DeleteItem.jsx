/* eslint-disable react/prop-types */
import Button from "../../UI/Button";

export default function DeleteItem({ type, onClick }) {
  return (
    <Button type={type} onClick={onClick}>
      Изтрий
    </Button>
  );
}

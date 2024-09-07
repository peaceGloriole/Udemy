export default function Output({ bill, tip }) {
  return (
    <h3>
      {bill === 0
        ? "Please enter the bill amount"
        : `You pay ${bill + tip} (${bill} + ${tip} tip)`}
    </h3>
  );
}

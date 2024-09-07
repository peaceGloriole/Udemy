import Bill from "./Bill";
import SelectPercentage from "./SelectPercentage";
import Output from "./Output";
import Reset from "./Reset";

export default function Calculator({
  bill,
  onSetBill,
  tip,
  onSetTip,
  friendTip,
  onSetFriendTip,
  tipAmount,
  handleReset,
}) {
  return (
    <div>
      <Bill bill={bill} onSetBill={onSetBill} />
      <SelectPercentage percentage={tip} onSelect={onSetTip}>
        How did you liked the service ?
      </SelectPercentage>
      <SelectPercentage percentage={friendTip} onSelect={onSetFriendTip}>
        How did your friend liked the service ?
      </SelectPercentage>
      <Output bill={bill} tip={tipAmount} />
      <Reset bill={bill} onReset={handleReset} />
    </div>
  );
}

import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { Cabin, Discount, Img, Price, StyledDiv, TableRow } from "./CabinStyle";

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteMutate } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <StyledDiv>
          <Button onClick={() => setShowForm((show) => !show)}>Edit</Button>
          <Button disabled={isDeleting} onClick={() => deleteMutate(cabinId)}>
            Delete
          </Button>
        </StyledDiv>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

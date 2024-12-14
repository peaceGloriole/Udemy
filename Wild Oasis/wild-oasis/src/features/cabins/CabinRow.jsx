import { useState } from "react";
import { HiPencil, HiOutlineDuplicate, HiTrash } from "react-icons/hi";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { Cabin, Discount, Img, Price, StyledDiv, TableRow } from "./CabinStyle";
import { useCreateCabin } from "./useCreateCabin";

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteMutate } = useDeleteCabin();
  const { isCreateLoading, createMutate } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

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
          <Button
            disabled={isCreateLoading}
            onClick={handleDuplicate}
            size={`small`}
            variation={`secondary`}
          >
            <HiOutlineDuplicate />
          </Button>
          <Button
            size={`small`}
            variation={`secondary`}
            onClick={() => setShowForm((show) => !show)}
          >
            <HiPencil />
          </Button>
          <Button
            variation={`danger`}
            disabled={isDeleting}
            onClick={() => deleteMutate(cabinId)}
          >
            <HiTrash />
          </Button>
        </StyledDiv>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FormRow, Label, Error } from "./CabinStyle";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreateLoading, mutate: createMutate } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success(`Cabin added successfully!`);

      queryClient.invalidateQueries({
        queryKey: [`cabin`],
      });
      reset();
      setIsFormVisible(false);
    },
    onError: (error) => {
      toast.error(`Cabin could not be added: ${error.message}`);
    },
  });

  const { isLoading: isEditLoading, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(`Cabin updated successfully!`);

      queryClient.invalidateQueries({
        queryKey: [`cabin`],
      });
      reset();
      setIsFormVisible(false);
    },
    onError: (error) => {
      toast.error(`Cabin could not be updated: ${error.message}`);
    },
  });

  const isWorking = isCreateLoading || isEditLoading;

  function onSubmit(data) {
    const image = typeof data.image === `string` ? data.image : data.image[0];

    if (isEditSession) {
      editMutate({
        newCabinData: {
          ...data,
          image,
        },
        id: editId,
      });
    } else {
      createMutate({ ...data, image: image });
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  if (!isFormVisible) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register(`name`, {
            required: `This field is required`,
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register(`maxCapacity`, {
            required: `This field is required`,
            min: {
              value: 1,
              message: `Capacity must be at least 1`,
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register(`regularPrice`, {
            required: `This field is required`,
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register(`discount`, {
            required: `This field is required`,
            validate: (value) => {
              const discountValue = parseFloat(value);
              const regularPriceValue = parseFloat(getValues().regularPrice);
              return (
                discountValue <= regularPriceValue ||
                `Discount should be less than regular price!`
              );
            },
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register(`description`, {
            required: `This field is required`,
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register(`image`, {
            required: isEditSession ? false : `This field is required`,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? `Update cabin` : `Add cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

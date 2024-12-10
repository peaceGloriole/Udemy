import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditLoading, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(`Cabin updated successfully!`);

      queryClient.invalidateQueries({
        queryKey: [`cabin`],
      });
    },
    onError: (error) => {
      toast.error(`Cabin could not be updated: ${error.message}`);
    },
  });

  return { isEditLoading, editMutate };
}

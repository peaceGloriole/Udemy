import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreateLoading, mutate: createMutate } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success(`Cabin added successfully!`);

      queryClient.invalidateQueries({
        queryKey: [`cabin`],
      });
    },
    onError: (error) => {
      toast.error(`Cabin could not be added: ${error.message}`);
    },
  });

  return { isCreateLoading, createMutate };
}

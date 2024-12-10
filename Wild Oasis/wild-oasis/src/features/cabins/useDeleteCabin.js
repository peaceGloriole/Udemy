import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success(`Cabin deleted successfully`);
      queryClient.invalidateQueries({ queryKey: [`cabin`] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteMutate };
}

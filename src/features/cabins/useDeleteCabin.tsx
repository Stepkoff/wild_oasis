import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "@/services/apiCabins.ts";
import {toast} from "react-toastify";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient()

  const {isPending, mutate} = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      toast.success('Cabin successfully deleted')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  return {isPending, deleteCabin: mutate}
}
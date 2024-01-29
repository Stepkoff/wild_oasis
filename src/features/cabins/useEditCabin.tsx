import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editCabin as editCabinApi} from "@/services/apiCabins.ts";
import {toast} from "react-toastify";


export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      toast.success('The cabin successfully updated');
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })


  return {isPending, editCabin: mutate}
}
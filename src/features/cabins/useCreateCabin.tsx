import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin} from "@/services/apiCabins.ts";
import {toast} from "react-toastify";

export const useCreateCabin = (reset?: () => void) => {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      toast.success('New cabin successfully created');
      reset?.()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })


  return {isPending ,createNewCabin: mutate}
};
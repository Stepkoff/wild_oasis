import {useMutation, useQueryClient} from "@tanstack/react-query";
import {duplicateCabin} from "@/services/apiCabins.ts";
import {toast} from "react-toastify";

export const useDuplicateCabin = () => {
  const queryClient = useQueryClient()

  const {mutate:duplicate, isPending} = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      toast.success('Cabin successfully duplicated')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return {isPending, duplicate}
}
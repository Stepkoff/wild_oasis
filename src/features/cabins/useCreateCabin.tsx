import {useMutation} from "@tanstack/react-query";
import {createCabin} from "@/services/apiCabins.ts";
import {toast} from "react-toastify";

export const useCreateCabin = () => {

  const {mutate, isPending} = useMutation({
    mutationFn: createCabin,
    onError: (err) => {
      toast.error(err.message)
    }
  })


  return {isPending ,createNewCabin: mutate}
};
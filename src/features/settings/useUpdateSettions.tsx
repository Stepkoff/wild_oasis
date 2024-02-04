import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSettings} from "@/services/apiSettings.ts";
import {toast} from "react-toastify";


export const useUpdateSettings = () => {
  const queryClient = useQueryClient()

  const {mutate: update, isPending} = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings']
      })
      toast.success('Settings successfully updated')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return {update, isPending}
}


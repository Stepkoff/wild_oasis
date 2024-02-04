import {useQuery} from "@tanstack/react-query";
import {getSettings} from "@/services/apiSettings.ts";
import {Settings} from "@/app/Types.ts";

export const useGetSettings = () => {

  const {data, isPending, error} = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: getSettings
  })

  return {data,isPending, error}
}
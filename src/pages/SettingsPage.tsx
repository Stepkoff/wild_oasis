import {Heading} from "../ui/Heading.js";
import { UpdateSettingsForm } from '@/features/settings/UpdateSettingsForm.tsx'
import {Row} from "@/ui/Row.tsx";
import {useGetSettings} from "@/features/settings/useGetSettings.tsx";
import {Spinner} from "@/ui/Spinner.tsx";
import {ErrorMessage} from "@/ui/ErrorMessage.tsx";

export const SettingsPage = () => {
  const {data, isPending, error} = useGetSettings();
  if(isPending) return <Spinner/>

  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      {data ?
        <UpdateSettingsForm settings={data}/>
      :
        <ErrorMessage>{error?.message}</ErrorMessage>
      }
    </Row>
  )
}


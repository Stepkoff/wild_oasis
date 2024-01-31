import {Form} from "@/ui/Form.tsx";
import {Input} from "@/ui/Input.tsx";
import {FormRow} from "@/ui/FormRow.tsx";
import {FormLabel} from "@/ui/FormLabel.tsx";
import {useForm} from "react-hook-form";
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Settings} from "@/app/Types.ts";
import {Button} from "@/ui/Button.tsx";
import {ErrorMessage} from "@/ui/ErrorMessage.tsx";

export const updateFormValidation = z.object({
  minBookingLength: z
    .number(),
  maxBookingLength: z
    .number(),
  maxGuestsPerBooking: z
    .number(),
  breakfastPrice: z
    .number()
})

interface UpdateSettingsFormProps {
  settings: Settings
}
export const UpdateSettingsForm = ({settings}:UpdateSettingsFormProps) => {

  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm<z.infer<typeof updateFormValidation>>({
    resolver: zodResolver(updateFormValidation),
    defaultValues: {
      breakfastPrice: settings.breakfastPrice,
      maxBookingLength: settings.maxBookingLength,
      maxGuestsPerBooking: settings.maxGuestsPerBooking,
      minBookingLength: settings.minBookingLength,
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data)
  })

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        <FormLabel htmlFor={'min-nights'}>Minimum nights/booking</FormLabel>
        <Input {...register('minBookingLength', {valueAsNumber: true})} type='number' id='min-nights' />
        {errors.minBookingLength && <ErrorMessage>{errors.minBookingLength.message}</ErrorMessage>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor={'max-nights'}>Maximum nights/booking</FormLabel>
        <Input {...register('maxBookingLength', {valueAsNumber: true})} type='number' id='max-nights' />
        {errors.maxBookingLength && <ErrorMessage>{errors.maxBookingLength.message}</ErrorMessage>}
      </FormRow>
      <FormRow >
        <FormLabel htmlFor={'max-guests'}>Maximum guests/booking</FormLabel>
        <Input {...register('maxGuestsPerBooking', {valueAsNumber: true})} type='number' id='max-guests' />
        {errors.maxGuestsPerBooking && <ErrorMessage>{errors.maxGuestsPerBooking.message}</ErrorMessage>}
      </FormRow>
      <FormRow >
        <FormLabel htmlFor={'breakfast-price'}>Breakfast price</FormLabel>
        <Input {...register('breakfastPrice', {valueAsNumber: true})} type='number' id='breakfast-price' />
        {errors.breakfastPrice && <ErrorMessage>{errors.breakfastPrice.message}</ErrorMessage>}
      </FormRow>
      <Button>Submit</Button>
    </Form>
  );
}


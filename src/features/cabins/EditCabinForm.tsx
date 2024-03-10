import {Form} from "@/ui/Form.tsx";
import {Input} from "@/ui/Input.tsx";
import {Textarea} from "@/ui/Textarea.tsx";
import {Controller, useForm} from "react-hook-form";
import {FileInput} from "@/ui/FileInput.tsx";
import {Button} from "@/ui/Button.tsx";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Cabin} from "@/app/Types.ts";
import {editCabinFormValidation} from "@/utils/validations.ts";
import {useEditCabin} from "@/features/cabins/useEditCabin.tsx";
import {FormRow} from "@/ui/FormRow.tsx";
import {FormLabel} from "@/ui/FormLabel.tsx";
import {ErrorMessage} from "@/ui/ErrorMessage.tsx";

interface editCabinFormProps {
  cabin: Cabin
  onClose?: () => void
}
export const EditCabinForm = ({cabin, onClose}:editCabinFormProps) => {
  const {
    handleSubmit,
    register,
    formState: {errors},
    control
  } = useForm<z.infer<typeof editCabinFormValidation>>({
    resolver: zodResolver(editCabinFormValidation),
    defaultValues: {
      cabinName: cabin.cabinName,
      discount: cabin.discount,
      description: cabin.description,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      cabinPhoto: undefined
    },
  });

  const {isPending, editCabin} = useEditCabin();

  const onSubmit = handleSubmit((data) => {
    editCabin({
      id: cabin.id,
      description: data.description,
      discount: data.discount,
      regularPrice: data.regularPrice,
      maxCapacity: data.maxCapacity,
      cabinName: data.cabinName,
      image: data.cabinPhoto,
      urlToOldPic: cabin.imageUrl
    }, {
      onSuccess: () => {
        onClose?.()
      }
    })
  })

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        <FormLabel htmlFor="cabinName">Cabin name</FormLabel>
        <Input disabled={isPending} {...register('cabinName')} type="text" id="cabinName" />
        {errors.cabinName && <ErrorMessage>{errors.cabinName.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="maxCapacity">Maximum capacity</FormLabel>
        <Input disabled={isPending} {...register('maxCapacity', {valueAsNumber: true})} type="number" id="maxCapacity" />
        {errors.maxCapacity && <ErrorMessage>{errors.maxCapacity.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="regularPrice">Regular price</FormLabel>
        <Input disabled={isPending} {...register('regularPrice', {valueAsNumber: true})} type="number" id="regularPrice" />
        {errors.regularPrice && <ErrorMessage>{errors.regularPrice.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="discount">Discount</FormLabel>
        <Input disabled={isPending} {...register('discount', {valueAsNumber: true})} type="number" id="discount" />
        {errors.discount && <ErrorMessage>{errors.discount.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="description">Description for website</FormLabel>
        <Textarea disabled={isPending} {...register('description')} id="description" />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="cabinPhoto">Cabin photo</FormLabel>
        <Controller
          control={control}
          // eslint-disable-next-line
          render={({field: {onChange, value, ...rest}}) => (
            <FileInput
              disabled={isPending}
              onChange={(event) => onChange(event.target?.files?.[0])}
              {...rest}
              id="cabinPhoto"
            />
          )}
          name={'cabinPhoto'}
        />
        {errors.cabinPhoto && <ErrorMessage>{errors.cabinPhoto.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Button type={'button'} disabled={isPending} onClick={() => console.log('close ?')} $variation={'secondary'}>
          Cancel
        </Button>
        <Button disabled={isPending} type={'submit'}>Save cabin</Button>
      </FormRow>
    </Form>
  )
}
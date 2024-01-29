import {Form} from "@/ui/Form.tsx";
import {Input} from "@/ui/Input.tsx";
import {Textarea} from "@/ui/Textarea.tsx";
import {Controller, useForm} from "react-hook-form";
import {FileInput} from "@/ui/FileInput.tsx";
import {Button} from "@/ui/Button.tsx";
import z from "zod";
import {Error, FormRow, Label} from "./CreateCabinForm.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Cabin} from "@/app/Types.ts";
import {editCabinFormValidation} from "@/utils/validations.ts";
import {useEditCabin} from "@/features/cabins/useEditCabin.tsx";

interface editCabinFormProps {
  cabin: Cabin
}
export const EditCabinForm = ({cabin}:editCabinFormProps) => {
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
    })
  })

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        <Label htmlFor="cabinName">Cabin name</Label>
        <Input disabled={isPending} {...register('cabinName')} type="text" id="cabinName" />
        {errors.cabinName && <Error>{errors.cabinName.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input disabled={isPending} {...register('maxCapacity', {valueAsNumber: true})} type="number" id="maxCapacity" />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input disabled={isPending} {...register('regularPrice', {valueAsNumber: true})} type="number" id="regularPrice" />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input disabled={isPending} {...register('discount', {valueAsNumber: true})} type="number" id="discount" />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea disabled={isPending} {...register('description')} id="description" />
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="cabinPhoto">Cabin photo</Label>
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
        {errors.cabinPhoto && <Error>{errors.cabinPhoto.message}</Error>}
      </FormRow>

      <FormRow>
        <Button type={'button'} disabled={isPending} onClick={() => console.log('close ?')} variation={'secondary'}>
          Cancel
        </Button>
        <Button disabled={isPending} type={'submit'}>Save cabin</Button>
      </FormRow>
    </Form>
  )
}
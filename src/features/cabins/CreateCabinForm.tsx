import {Form} from "@/ui/Form.tsx";
import {Input} from "@/ui/Input.tsx";
import {Textarea} from "@/ui/Textarea.tsx";
import {FileInput} from "@/ui/FileInput.tsx";
import {Button} from "@/ui/Button.tsx";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import z from 'zod'
import {createCabinFormValidation} from "@/utils/validations.ts";
import {useCreateCabin} from "@/features/cabins/useCreateCabin.tsx";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {FormRow} from "@/ui/FormRow.tsx";
import {FormLabel} from "@/ui/FormLabel.tsx";
import {ErrorMessage} from "@/ui/ErrorMessage.tsx";

interface CreateCabinFormProps {
  onClose?: () => void
}
export const CreateCabinForm = ({onClose}: CreateCabinFormProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
    control
  } = useForm<z.infer<typeof createCabinFormValidation>>({
    resolver: zodResolver(createCabinFormValidation),
    defaultValues: {
      cabinName: '',
      discount: 0,
      description: '',
      maxCapacity: 0,
      regularPrice: 0,
      cabinPhoto: undefined
    },
  });

  const {isPending, createNewCabin} = useCreateCabin()

  const onSubmit = handleSubmit((data) => {
    createNewCabin({
      description: data.description,
      discount: data.discount,
      regularPrice: data.regularPrice,
      maxCapacity: data.maxCapacity,
      cabinName: data.cabinName,
      image: data.cabinPhoto,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['cabins']
        })
        toast.success('New cabin successfully created');
        reset?.()
        onClose?.()
      }
    })
  })

  return (
    <Form type={'modal'}  onSubmit={onSubmit}>
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
        <Button disabled={isPending} onClick={() => reset()} $variation={'secondary'} type="reset">
          Cancel
        </Button>
        <Button disabled={isPending} type={'submit'}>Create cabin</Button>
      </FormRow>
    </Form>
  );
}


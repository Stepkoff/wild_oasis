import styled from "styled-components";
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

export const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export const CreateCabinForm = () => {
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
      }
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
        <Button disabled={isPending} onClick={() => reset()} variation={'secondary'} type="reset">
          Cancel
        </Button>
        <Button disabled={isPending} type={'submit'}>Create cabin</Button>
      </FormRow>
    </Form>
  );
}


import z from "zod";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateFormValidation = z.object({
  minBookingLength: z
    .number()
    .min(1, {message: 'Must be at least 1 night'}),
  maxBookingLength: z
    .number()
    .min(1, {message: 'Must be at least 1 night'}),
  maxGuestsPerBooking: z
    .number()
    .min(1, {message: 'Minimum 1 guest required'}),
  breakfastPrice: z
    .number()
    .min(1, {message: 'Breakfast must be at least 1$'}),
})

export const createCabinFormValidation = z.object({
  cabinName: z
    .string()
    .min(5, {message: 'Cabin name should be at least 5 characters.'}),
  maxCapacity: z
    .number()
    .min(1, {message: 'Capacity must be at least 1'}),
  regularPrice: z
    .number()
    .min(1, {message: 'Price must be at least 1$'}),
  discount: z
    .number(),
  description: z
    .string()
    .min(15, {message: 'Description must be at least 15 characters'})
    .max(100, {message: 'Decription must me maximum 100 characters'}),
  cabinPhoto: z
    .instanceof(File, {message: 'Select an image'})
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
})
  .refine((data) => data.regularPrice > data.discount, {
    message: 'Discount must be smaller then price',
    path: ['discount']
  });

export const editCabinFormValidation = z.object({
  cabinName: z
    .string()
    .min(5, {message: 'Cabin name should be at least 5 characters.'}),
  maxCapacity: z
    .number()
    .min(1, {message: 'Capacity must be at least 1'}),
  regularPrice: z
    .number()
    .min(1, {message: 'Price must be at least 1$'}),
  discount: z
    .number(),
  description: z
    .string()
    .min(15, {message: 'Description must be at least 15 characters'})
    .max(100, {message: 'Decription must me maximum 100 characters'}),
  cabinPhoto: z
    .instanceof(File, {message: 'Select an image'})
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional()
})
  .refine((data) => data.regularPrice > data.discount, {
    message: 'Discount must be smaller then price',
    path: ['discount']
  });
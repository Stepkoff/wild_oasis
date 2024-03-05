import supabase, {supabaseUrl} from "@/services/supabase.ts";
import {Cabin} from "@/app/Types.ts";

// ============================== get cabins
export const getCabins = async() => {
  const {data, error}= await supabase
    .from('cabins')
    .select('*')
    .order('created_at', {ascending: true});
  if(error) {
    console.error('getCabins',error)
    throw new Error(error.message)
  }
  return data
}

// ============================== duplicate cabin

type DuplicateCabinProps = Omit<Cabin, 'id' | 'created_at' | 'isCopy'>
export const duplicateCabin = async (cabin: DuplicateCabinProps) => {
  const { data, error:cabinsError } = await supabase
    .from('cabins')
    .insert([{
      cabinName: `Copy of ${cabin.cabinName}`,
      discount: cabin.discount,
      description: cabin.description,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      imageUrl: cabin.imageUrl,
      isCopy: true,
    }])
    .select()
    .single()
  if(cabinsError) {
    console.error('createCabin', cabinsError);
    throw new Error('Cabin could not be duplicated')
  }
  return data
}

// ============================== create cabin
interface CreateCabinProps {
  discount: number,
  description: string,
  cabinName: string,
  maxCapacity: number,
  regularPrice: number,
  image: File
}
export const createCabin = async(cabin: CreateCabinProps) => {
  const imageName = `${(Math.random() + 1).toString(36).substring(3)}_${cabin.image.name}`.replaceAll('/', '');
  const imagePath: string = `${supabaseUrl}/storage/v1/object/public/cabinsPics/${imageName}`

  // create cabin
  const { data:cabinsData, error:cabinsError } = await supabase
    .from('cabins')
    .insert([{
      cabinName: cabin.cabinName,
      discount: cabin.discount,
      description: cabin.description,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      imageUrl: imagePath,
      isCopy: false,
    }])
    .select()
    .single()
  if(cabinsError) {
    console.error('createCabin', cabinsError);
    throw new Error('Cabin could not be created')
  }
  // Upload image
  const { error:storageError } = await supabase
    .storage
    .from('cabinsPics')
    .upload(imageName, cabin.image);

  // delete cabin if there was an error while uploading image
  if(storageError) {
    await supabase.from('cabins').delete().eq('id', cabinsData?.[0]?.id)
    console.error('Storage error', storageError)
    throw new Error('Cabin image could not be uploaded')
  }

  return cabinsData
}

// ============================== update cabin
interface EditCabinProps {
  id: number,
  discount: number,
  description: string,
  cabinName: string,
  maxCapacity: number,
  regularPrice: number,
  image?: File,
  urlToOldPic: string
}

export const editCabin = async(cabin:EditCabinProps) => {
  let imageName = undefined
  let imagePath = undefined

  if(cabin.image) {
    imageName = `${(Math.random() + 1).toString(36).substring(3)}_${cabin.image.name}`.replaceAll('/', '')
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabinsPics/${imageName}`

    // Upload image
    const { error:storageError } = await supabase
      .storage
      .from('cabinsPics')
      .upload(imageName, cabin.image);

    if(storageError) {
      console.error('Storage error', storageError)
      throw new Error('Cabin image could not be uploaded')
    }
  }
  // update doc. if imageUrl === undefined the field in supabase will not be changed.
  const { data:cabinData, error } = await supabase
    .from('cabins')
    .update({
      cabinName: cabin.cabinName,
      discount: cabin.discount,
      description: cabin.description,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      imageUrl: cabin.image ? imagePath: undefined
    })
    .eq('id', cabin.id)
    .select()
    .single();
  if(error) {
    if(imageName && cabin.image) {
      // delete new uploaded picture is error occur
      await supabase
        .storage
        .from('cabinsPics')
        .remove([imageName])
    }   

    console.error('edit cabin error', error)
    throw new Error('Could not update cabin')
  }
  // delete old picture
  if(cabin.image) {
    await supabase
      .storage
      .from('cabinsPics')
      .remove([cabin.urlToOldPic.split('/').slice(-1).toString()])
  }

  return cabinData
}


// ============================== delete cabin
interface DeleteCabinProps {
  id: number,
  url: string,
  isCopy: boolean,
}
export const deleteCabin = async ({id, url, isCopy}:DeleteCabinProps) => {
  const {data, error} = await supabase.from('cabins').delete().eq('id', id);
  if(error) {
    console.error('deleteCabin', error);
    throw new Error('Cabin could not be deleted')
  }

  if(!isCopy) {
    const { error: storageError } = await supabase
      .storage
      .from('cabinsPics')
      .remove([url.split('/').slice(-1).toString()])

    if(storageError) {
      console.error('Delete image', storageError);
      throw new Error('image could not be deleted')
    }
  }

  return data
}
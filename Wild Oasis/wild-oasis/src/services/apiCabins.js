import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from(`cabins`).select(`*`);

  if (error) {
    console.log(`Cabins could not be loaded:`, error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    `/`,
    ``
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create cabin
  const { data, error } = await supabase
    .from(`cabins`)
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(`Cabin could not be added:`, error.message);
    throw new Error(error.message);
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from(`cabin-images`)
    .upload(imageName, newCabin.image);

  // delete cabin if image upload fails
  if (storageError) {
    await supabase.from(`cabins`).delete().eq(`id`, data.id);
    throw new Error(`Cabin could not be added because image upload failed`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from(`cabins`).delete().eq(`id`, id);

  if (error) {
    console.log(`Cabin could not be deleted:`, error.message);
    throw new Error(error.message);
  }

  return data;
}

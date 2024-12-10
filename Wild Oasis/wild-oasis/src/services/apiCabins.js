import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from(`cabins`).select(`*`);

  if (error) {
    console.log(`Cabins could not be loaded:`, error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    `/`,
    ``
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit cabin
  let query = supabase.from(`cabins`);

  // A create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B edit
  if (id) {
    // No array included in spreading
    query = query.update({ ...newCabin, image: imagePath }).eq(`id`, id);
  }

  const { data, error } = await query.select().single();

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

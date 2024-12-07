import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from(`cabins`).select(`*`);

  if (error) {
    console.log(`Cabins could not be loaded:`, error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from(`cabins`)
    .insert([newCabin])
    .select();

  if (error) {
    console.log(`Cabin could not be added:`, error.message);
    throw new Error(error.message);
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

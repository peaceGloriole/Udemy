import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from(`cabins`).select(`*`);

  if (error) {
    console.log(`Cabins could not be loaded:`, error.message);
    throw new Error(error.message);
  }

  return data;
}

import supabase from "./supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Could not fetch cabins", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.imagePath
    : `${supabaseUrl}/storage/v1/object/cabin-images/${imageName}`;

  //1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log("Could not create cabin", error.message);
    throw new Error(error.message);
  }

  //2. upload the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete cabin if image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(storageError.message);
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("Could not delete cabin", error.message);
    throw new Error(error.message);
  }
}

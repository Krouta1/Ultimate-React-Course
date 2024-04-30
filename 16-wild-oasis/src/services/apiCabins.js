import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Could not fetch cabins", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_BUCKET_URL
  }/storage/v1/object/cabin-images/${imageName}`;
  //1. Create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.log("Could not create cabin", error.message);
    throw new Error(error.message);
  }

  //2. upload the image
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

import supabase from "./supabase";

export const getSettings = async() => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error('getSettings', error);
    throw new Error("SettingsPage could not be loaded");
  }
  return data;
}

interface updateSettingProps {

}
export const updateSetting = async(newSetting: updateSettingProps) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("SettingsPage could not be updated");
  }
  return data;
}

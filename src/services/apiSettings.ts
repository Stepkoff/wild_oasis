import supabase from "./supabase";
import {Settings} from "@/app/Types.ts";

export const getSettings = async() => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error('getSettings', error);
    throw new Error("SettingsPage could not be loaded");
  }
  return data;
}

type updateSettingProps = Omit<Settings, 'id' | 'created_at'>
export const updateSettings = async(settings: updateSettingProps) => {
  const { data, error } = await supabase
    .from("settings")
    .update(settings)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("SettingsPage could not be updated");
  }
  return data;
}

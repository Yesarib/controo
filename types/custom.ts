import { Database } from "./supabase";


export type UserProfiles = Database["public"]["Tables"]["user_profiles"]["Row"]
import { Database } from "./supabase";


export type UserProfiles = Database["public"]["Tables"]["user_profiles"]["Row"]
export type Chats = Database["public"]["Tables"]["chats"]["Row"]
export type Messages = Database["public"]["Tables"]["messages"]["Row"]
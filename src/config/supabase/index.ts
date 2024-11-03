import { createClient } from "@supabase/supabase-js";
import { Database } from "src/types/supabase";

const url = import.meta.env.VITE_SUPA_URL;
const apiKey = import.meta.env.VITE_SUPA_KEY;

const supa = createClient<Database>(url, apiKey);

export default supa;

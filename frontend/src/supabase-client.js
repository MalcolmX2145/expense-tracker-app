import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://izolyxqxrsxwsslrjiae.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6b2x5eHF4cnN4d3NzbHJqaWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODA5MTEsImV4cCI6MjA1NDA1NjkxMX0.O08Q4E1xHgjVxRwe07bfc6ubVzszrPeYRXWgdRaRVlg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
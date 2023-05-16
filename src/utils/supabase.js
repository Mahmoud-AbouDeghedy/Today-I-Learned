import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yrprtswvfwjnegoqwoft.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHJ0c3d2ZndqbmVnb3F3b2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2Mjk4MzEsImV4cCI6MTk5OTIwNTgzMX0.OJMjnmigt7CdM36_XbT7E5GTuT4-orMw1LO4MZg850I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

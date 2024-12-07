import { createClient } from "@supabase/supabase-js";
const supabaseUrl = `https://aomloyoqfuiptzsjibpo.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbWxveW9xZnVpcHR6c2ppYnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MTQ3NzAsImV4cCI6MjA0OTA5MDc3MH0.3MVXnVUk937wu5-YbggGjuh6MFl9npY4uP79bFMb6qQ`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

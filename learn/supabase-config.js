// Shared Supabase connection details for the Learn section.
// The anon key below is *meant* to be public — it's safe to ship in client-side
// code because the row-level security policies set up in Supabase (see the
// migration SQL in PROJECT_NOTES / the "ratings" setup) control what it can
// actually do: submit a new rating, read the aggregate summary, nothing else.
// This is a different situation to a GitHub token or a database password,
// which must never appear in client-side code.
window.SUPABASE_URL = "https://qmquokylzvvpwtlqfqow.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtcXVva3lsenZ2cHd0bHFmcW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjk1MDIsImV4cCI6MjA5ODg0NTUwMn0.NKJ4mfKamAcmZo3wao4icR9ZsKeEgpHqXWBMeZwHhw0";

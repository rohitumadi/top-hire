import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a custom supabase client that injects the Clerk Supabase token into the request headers
function createClerkSupabaseClient(clerkToken: string) {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      // Get the custom Supabase token from Clerk
      fetch: async (url, options = {}) => {
        // Insert the Clerk Supabase token into the headers
        const headers = new Headers(options?.headers);
        headers.set("Authorization", `Bearer ${clerkToken}`);

        // Call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
}

export default createClerkSupabaseClient;

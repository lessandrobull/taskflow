import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xttzilpuuqjbztjkeadd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dHppbHB1dXFqYnp0amtlYWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NDM1NDAsImV4cCI6MjEwNDMxOTU0MH0.JChW7np_UAGozYm_jaBS44dBKA9y3gX0Lj2SVdosxUY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

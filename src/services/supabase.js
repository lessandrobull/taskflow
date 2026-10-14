import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xttzilpuuqjbztjkeadd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dHppbHB1dXFqYnp0amtlYWRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODc0MzU0MCwiZXhwIjoyMTA0MzE5NTQwfQ.KxBsOVvrLe7NdX8x53oy8wn5pkXipoR-N3HtflAboBo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

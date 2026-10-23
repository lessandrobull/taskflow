import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xttzilpuuqjbztjkeadd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uexabKupvCYRAAPqRiETSQ_I01UsSZI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
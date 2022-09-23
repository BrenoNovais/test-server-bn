import { createClient } from "@supabase/supabase-js"

const supabase = createClient(`https://dzhspeywokdkkyhbrvcd.supabase.co`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM1NTM3NjI4LCJleHAiOjE5NTExMTM2Mjh9.v1HaNiDLaLDWVPevNdfHt29otvwBQENotK84p_zvO-k`)

export default supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sfwyotytxteqbjvfnlud.supabase.co'
const supabaseAnonKey = 'sb_publishable_j7aONaz7f1lQiMzTiC05FQ_nGKe-jwu'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

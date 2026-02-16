// import { createClient } from '@supabase/supabase-js'
// import Constants from 'expo-constants'

// const expoExtra = (Constants.manifest && (Constants.manifest as any).extra) || {}

// const SUPABASE_URL = expoExtra.SUPABASE_URL || process.env.SUPABASE_URL || ''
// const SUPABASE_ANON_KEY = expoExtra.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//   console.warn('Supabase URL and ANON KEY are not set. Set them in app.json extra or env vars.')
// }

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// export default supabase



import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dbvofazpfuguhosofhus.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidm9mYXpwZnVndWhvc29maHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTA3NDUsImV4cCI6MjA4NjcyNjc0NX0.9eVr-SW27t2NHkc_Eo20BDns8qs5JhB4bWEvJCP5C3Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

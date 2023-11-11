import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://rdjwsyrizfkfqkyhryfo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkandzeXJpemZrZnFreWhyeWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDkyNzEsImV4cCI6MjAxNDYyNTI3MX0.QAQjjjPMccWmnUV3wHMxt19oW6ThUy3DAEM-5ItX3Yc')
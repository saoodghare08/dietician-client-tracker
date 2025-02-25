import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xckticifevlsiitzjhil.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja3RpY2lmZXZsc2lpdHpqaGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMjQxMDEsImV4cCI6MjA1NTgwMDEwMX0.0xnxqhETkhWQ-kUm-PZwl6JxUZDdP_q7eXJ6BF-fDic';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


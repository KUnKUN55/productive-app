import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Task, TimetableBlock, Bookmark } from '../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Singleton instance
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Compatibility function for existing pages
export const createClient = () => supabase;

// Helper types for the database
export type Database = {
  public: {
    Tables: {
      tasks_system: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
      timetable: {
        Row: TimetableBlock;
        Insert: Omit<TimetableBlock, 'id'>;
        Update: Partial<Omit<TimetableBlock, 'id'>>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, 'id'>;
        Update: Partial<Omit<Bookmark, 'id'>>;
      };
    };
  };
};

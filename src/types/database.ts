export type TaskType = 'DAILY_TODO' | 'ROUTINE' | 'EXAM' | 'ASSIGNMENT';
export type TaskStatus = 'TODO' | 'DOING' | 'DONE';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Task {
  id: string;
  title: string;
  emoji: string;
  type: TaskType;
  status: TaskStatus;
  priority: Priority;
  category_tag: string;
  start_time: string | null;
  end_time: string | null;
  deadline: string | null;
  description: string | null;
  created_at: string;
}

export interface TimetableBlock {
  id: string;
  day_of_week: number; // 0-6
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  subject_name: string;
  subject_code: string | null;
  instructor: string | null;
  is_custom_block: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tag: string;
  is_important: boolean;
}

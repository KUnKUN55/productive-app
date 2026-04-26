"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/database';
import { startOfDay, endOfDay } from 'date-fns';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayTasks = useCallback(async () => {
    try {
      setLoading(true);
      
      // In a real scenario, we'd filter by user_id and date
      const { data, error } = await supabase
        .from('tasks_system')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = async (id: string, status: 'DONE' | 'TODO') => {
    try {
      const { error } = await supabase
        .from('tasks_system')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Optimistic update
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    } catch (err: any) {
      setError(err.message);
      // Rollback if needed
      fetchTodayTasks();
    }
  };

  const createTask = async (task: Omit<Task, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks_system')
        .insert([task])
        .select();

      if (error) throw error;
      if (data) {
        setTasks(prev => [...prev, data[0]]);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks_system')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodayTasks();
  }, [fetchTodayTasks]);

  return {
    tasks,
    loading,
    error,
    updateTaskStatus,
    createTask,
    deleteTask,
    refresh: fetchTodayTasks
  };
}

"use client";

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, Circle } from "lucide-react";
import { Task } from "@/types/database";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (id: string, status: 'DONE' | 'TODO') => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onTaskUpdate} />
      ))}
    </div>
  );
}

function TaskItem({ task, onUpdate }: { task: Task, onUpdate: (id: string, status: 'DONE' | 'TODO') => void }) {
  const [isDone, setIsDone] = useState(task.status === 'DONE');
  
  // Local state update with debounce for the parent/API call
  const toggleDone = () => {
    const newStatus = !isDone;
    setIsDone(newStatus);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isDone !== (task.status === 'DONE')) {
        onUpdate(task.id, isDone ? 'DONE' : 'TODO');
      }
    }, 500); // 500ms Debounce as requested

    return () => clearTimeout(handler);
  }, [isDone, task.id, task.status, onUpdate]);

  const priorityColors = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-yellow-500",
    LOW: "bg-blue-500"
  };

  return (
    <div 
      className={`p-4 rounded-2xl bg-card border border-border flex items-center gap-4 hover:border-primary/30 transition-all group cursor-pointer ${
        isDone ? "opacity-60" : ""
      }`}
      onClick={toggleDone}
    >
      <div className="text-primary transition-transform group-hover:scale-110">
        {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-30" />}
      </div>
      
      <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-xl">
        {task.emoji}
      </div>
      
      <div className="flex-1">
        <h4 className={`font-bold transition-all ${isDone ? "line-through opacity-50" : ""}`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-3 text-xs opacity-50 mt-1">
          <span className="bg-foreground/10 px-2 py-0.5 rounded-md font-bold uppercase">{task.type}</span>
          {task.deadline && (
            <span className="flex items-center gap-1"><Clock size={12} /> {task.deadline}</span>
          )}
        </div>
      </div>
      
      <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
    </div>
  );
}

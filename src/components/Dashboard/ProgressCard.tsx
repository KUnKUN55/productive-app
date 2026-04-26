"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { Task } from "@/types/database";

interface ProgressCardProps {
  tasks: Task[];
}

export function ProgressCard({ tasks }: ProgressCardProps) {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="mb-8 p-6 rounded-3xl bg-card border border-border relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
        <LayoutDashboard size={120} />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm font-medium opacity-50 uppercase tracking-wider">Today's Progress</p>
            <h3 className="text-3xl font-bold">{progress}%</h3>
          </div>
          <p className="text-sm font-medium opacity-70">{doneTasks} of {totalTasks} tasks done</p>
        </div>
        <div className="h-3 w-full bg-foreground/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

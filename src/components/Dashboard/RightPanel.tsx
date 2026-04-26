"use client";

import React from "react";
import { Bell, Clock, Bookmark, User } from "lucide-react";
import { Task, Bookmark as BookmarkType } from "@/types/database";
import { differenceInDays, isPast, parseISO } from "date-fns";

interface RightPanelProps {
  tasks: Task[];
  bookmarks: BookmarkType[];
}

export function RightPanel({ tasks, bookmarks }: RightPanelProps) {
  const urgentTasks = tasks.filter(task => {
    if (!task.deadline || task.status === 'DONE') return false;
    const deadline = parseISO(task.deadline);
    const daysLeft = differenceInDays(deadline, new Date());
    return daysLeft < 3 || isPast(deadline);
  });

  return (
    <aside className="hidden xl:flex w-[25%] flex-col border-l border-border p-6 bg-card/50 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Bell size={18} className="text-accent" />
          Urgent Tasks
        </h3>
        <div className="space-y-3">
          {urgentTasks.length > 0 ? (
            urgentTasks.map(task => {
              const deadline = parseISO(task.deadline!);
              const isOverdue = isPast(deadline);
              return (
                <div key={task.id} className={`p-4 rounded-2xl border ${isOverdue ? "bg-accent/5 border-accent/10" : "bg-primary/5 border-primary/10"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isOverdue ? "text-accent bg-accent/10" : "text-primary bg-primary/10"
                    }`}>
                      {isOverdue ? "Overdue" : "Urgent"}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">{task.title}</h4>
                  <p className="text-xs opacity-50">
                    {isOverdue ? "Expired deadline" : `Due in ${differenceInDays(deadline, new Date())} days`}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-xs opacity-40 text-center py-4 italic">No urgent tasks at the moment.</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Next Class
        </h3>
        <div className="p-5 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <p className="text-xs font-medium opacity-80 uppercase mb-1">Starts in 15 mins</p>
          <h4 className="text-lg font-bold mb-2">Advance Programming</h4>
          <div className="flex items-center gap-4 text-xs opacity-90">
            <span className="flex items-center gap-1"><Clock size={12} /> 10:00 - 12:00</span>
            <span className="flex items-center gap-1"><User size={12} /> Room 402</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Bookmark size={18} className="text-secondary" />
          Quick Links
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {bookmarks.map(link => (
            <LinkCard key={link.id} title={link.title} url={link.url} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function LinkCard({ title, url }: { title: string, url: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-4 rounded-2xl bg-secondary/5 text-secondary flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform border border-transparent hover:border-current"
    >
      <Bookmark size={20} />
      <span className="text-xs font-bold text-center truncate w-full">{title}</span>
    </a>
  );
}

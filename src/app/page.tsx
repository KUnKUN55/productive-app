"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { ProgressCard } from "@/components/Dashboard/ProgressCard";
import { TaskList } from "@/components/Dashboard/TaskList";
import { RightPanel } from "@/components/Dashboard/RightPanel";
import { BottomNav } from "@/components/Dashboard/BottomNav";
import { TimetableGrid } from "@/components/Timetable/TimetableGrid";
import { useTasks } from "@/hooks/useTasks";
import { Bookmark, TimetableBlock } from "@/types/database";

// Mock Bookmarks and Timetable for now
const MOCK_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "SUT Reg", url: "https://reg.sut.ac.th", tag: "Study", is_important: true },
  { id: "2", title: "GitHub", url: "https://github.com", tag: "Dev", is_important: false },
  { id: "3", title: "ChatGPT", url: "https://chat.openai.com", tag: "AI", is_important: true },
  { id: "4", title: "Notion", url: "https://notion.so", tag: "Work", is_important: false },
];

const MOCK_TIMETABLE: TimetableBlock[] = [
  { 
    id: "t1", 
    day_of_week: 0, 
    start_time: "10:00", 
    end_time: "12:00", 
    subject_name: "Advance Programming", 
    subject_code: "CPE201", 
    instructor: "Dr. Smith", 
    is_custom_block: false 
  },
  { 
    id: "t2", 
    day_of_week: 2, 
    start_time: "13:00", 
    end_time: "16:00", 
    subject_name: "Chemistry Lab", 
    subject_code: "SCI102", 
    instructor: "Prof. Jane", 
    is_custom_block: false 
  },
  { 
    id: "t3", 
    day_of_week: 4, 
    start_time: "12:00", 
    end_time: "13:00", 
    subject_name: "Lunch Break", 
    subject_code: null, 
    instructor: null, 
    is_custom_block: true 
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { tasks, loading, updateTaskStatus } = useTasks();

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32 lg:pb-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              {activeTab === "dashboard" ? "Good morning, Iceic! 👋" : "Weekly Timetable"}
            </h2>
            <p className="opacity-50">
              {activeTab === "dashboard" ? "Let's see what we have for today." : "Manage your classes and teaching blocks."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-card border border-border hover:bg-foreground/5 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {activeTab === "dashboard" ? (
          <>
            <ProgressCard tasks={tasks} />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Active Tasks</h3>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-10 opacity-30">Loading tasks...</div>
              ) : (
                <TaskList tasks={tasks} onTaskUpdate={updateTaskStatus} />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1">
            <TimetableGrid blocks={MOCK_TIMETABLE} />
          </div>
        )}
      </section>

      <RightPanel tasks={tasks} bookmarks={MOCK_BOOKMARKS} />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}

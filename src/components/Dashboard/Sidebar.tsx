"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  Bookmark, 
  User,
  Settings,
  Flame
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-[20%] flex-col border-r border-border p-6 bg-card/50">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
          P
        </div>
        <h1 className="text-xl font-bold tracking-tight">Productive</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={activeTab === "dashboard"} 
          onClick={() => setActiveTab("dashboard")} 
        />
        <NavItem 
          icon={<Calendar size={20} />} 
          label="Timetable" 
          active={activeTab === "timetable"} 
          onClick={() => setActiveTab("timetable")} 
        />
        <NavItem 
          icon={<CheckSquare size={20} />} 
          label="Tasks & Exams" 
          active={activeTab === "tasks"} 
          onClick={() => setActiveTab("tasks")} 
        />
        <NavItem 
          icon={<Bookmark size={20} />} 
          label="Bookmarks" 
          active={activeTab === "bookmarks"} 
          onClick={() => setActiveTab("bookmarks")} 
        />
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <Flame size={16} />
            <span>5 Day Streak!</span>
          </div>
          <p className="text-xs opacity-70">Keep going, you're doing great!</p>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-foreground/5 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Iceic</p>
            <p className="text-xs opacity-50">Free Plan</p>
          </div>
          <Settings size={16} className="ml-auto opacity-30" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "hover:bg-foreground/5 opacity-60 hover:opacity-100"
      }`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

"use client";

import React from "react";
import { LayoutDashboard, Calendar, CheckSquare, User, Plus } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-card border-t border-border flex justify-around items-center px-6 z-50 glass">
      <MobileNavItem 
        icon={<LayoutDashboard size={24} />} 
        active={activeTab === "dashboard"} 
        onClick={() => setActiveTab("dashboard")} 
      />
      <MobileNavItem 
        icon={<Calendar size={24} />} 
        active={activeTab === "timetable"} 
        onClick={() => setActiveTab("timetable")} 
      />
      
      <button className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center -translate-y-6 shadow-xl shadow-primary/40 border-4 border-background hover:scale-110 transition-transform">
        <Plus size={28} />
      </button>
      
      <MobileNavItem 
        icon={<CheckSquare size={24} />} 
        active={activeTab === "tasks"} 
        onClick={() => setActiveTab("tasks")} 
      />
      <MobileNavItem 
        icon={<User size={24} />} 
        active={activeTab === "profile"} 
        onClick={() => setActiveTab("profile")} 
      />
    </nav>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-xl transition-all ${active ? "text-primary" : "opacity-40"}`}
    >
      {icon}
    </button>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { TimetableBlock } from "@/types/database";

interface TimetableGridProps {
  blocks: TimetableBlock[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 8); // 08:00 to 22:00

export function TimetableGrid({ blocks }: TimetableGridProps) {
  // Helper to calculate grid row from time string (HH:mm)
  const getRow = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 8) * 2 + (minutes >= 30 ? 1 : 0) + 2; // +2 for header and 0-indexing
  };

  return (
    <div className="w-full bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-foreground/5 border-b border-border">
        <div className="p-3 border-r border-border"></div>
        {DAYS.map((day, i) => (
          <div key={day} className="p-3 text-center text-xs font-bold uppercase tracking-wider border-r border-border last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-[60px_repeat(7,1fr)] grid-rows-[repeat(30,40px)] overflow-y-auto custom-scrollbar max-h-[600px]">
        {/* Time Labels */}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="row-span-2 flex items-start justify-center pt-2 text-[10px] font-medium opacity-40 border-r border-border bg-foreground/[0.02]">
              {`${hour}:00`}
            </div>
            {/* Horizontal lines for the whole row */}
            <div className="col-span-7 border-b border-border/50 h-[40px]"></div>
            <div className="col-span-7 border-b border-border/20 h-[40px]"></div>
          </React.Fragment>
        ))}

        {/* Blocks */}
        {blocks.map((block) => {
          const startRow = getRow(block.start_time);
          const endRow = getRow(block.end_time);
          const dayCol = block.day_of_week + 2; // +2 for time label col and 1-based grid

          return (
            <motion.div
              key={block.id}
              layoutId={block.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`absolute inset-0.5 rounded-xl p-3 flex flex-col shadow-lg border cursor-pointer group ${
                block.is_custom_block 
                  ? "bg-secondary text-white border-secondary/20" 
                  : "bg-primary text-white border-primary/20"
              }`}
              style={{
                gridRowStart: startRow,
                gridRowEnd: endRow,
                gridColumnStart: dayCol,
              }}
            >
              <span className="text-[10px] font-bold opacity-80 uppercase truncate">
                {block.subject_code || (block.is_custom_block ? "Break" : "Class")}
              </span>
              <h4 className="text-sm font-bold leading-tight line-clamp-2 mt-0.5">
                {block.subject_name}
              </h4>
              <div className="mt-auto flex items-center justify-between opacity-80 text-[10px]">
                <span>{block.start_time} - {block.end_time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

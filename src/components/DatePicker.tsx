import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  label: string;
  value: string;          // YYYY-MM-DD
  minDate?: string;       // YYYY-MM-DD
  onChange: (date: string) => void;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const toDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplay = (dateStr: string, fallback: string) => {
  if (!dateStr) return fallback;
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
};

export default function DatePicker({ label, value, minDate, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calendar view state
  const selectedDate = value ? new Date(value + 'T00:00:00') : new Date();
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Navigate months
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const todayStr = toDateString(new Date());
  const minDateObj = minDate ? new Date(minDate + 'T00:00:00') : null;

  const cells: { day: number; dateStr: string; isCurrentMonth: boolean; isDisabled: boolean }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const d = new Date(viewYear, viewMonth - 1, day);
    const dateStr = toDateString(d);
    cells.push({
      day,
      dateStr,
      isCurrentMonth: false,
      isDisabled: minDateObj ? d < minDateObj : false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(viewYear, viewMonth, day);
    const dateStr = toDateString(d);
    cells.push({
      day,
      dateStr,
      isCurrentMonth: true,
      isDisabled: minDateObj ? d < minDateObj : false,
    });
  }

  // Next month leading days (fill to 42 = 6 rows)
  const remaining = 42 - cells.length;
  for (let day = 1; day <= remaining; day++) {
    const d = new Date(viewYear, viewMonth + 1, day);
    const dateStr = toDateString(d);
    cells.push({
      day,
      dateStr,
      isCurrentMonth: false,
      isDisabled: minDateObj ? d < minDateObj : false,
    });
  }

  const handleSelect = (dateStr: string, isDisabled: boolean) => {
    if (isDisabled) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  // Check if prev month nav should be disabled
  const canGoPrev = (() => {
    if (!minDateObj) return true;
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0);
    return prevMonthLastDay >= minDateObj;
  })();

  return (
    <div className="relative" ref={containerRef}>
      {/* Capsule Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50 cursor-pointer"
      >
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">{label}</span>
          <span className="text-xs font-sans font-bold text-gray-800">
            {formatDisplay(value, label)}
          </span>
        </div>
        <Calendar className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors" />
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-40 w-[280px] select-none">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev}
              className="h-7 w-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <span className="text-sm font-bold text-gray-800">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="h-7 w-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0">
            {cells.map((cell, i) => {
              const isSelected = cell.dateStr === value;
              const isToday = cell.dateStr === todayStr;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(cell.dateStr, cell.isDisabled)}
                  disabled={cell.isDisabled}
                  className={`
                    h-9 w-full rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer
                    ${cell.isDisabled
                      ? 'text-gray-200 cursor-not-allowed'
                      : cell.isCurrentMonth
                        ? 'text-gray-700 hover:bg-[#B8860B]/10 hover:text-[#B8860B]'
                        : 'text-gray-300 hover:bg-gray-50'
                    }
                    ${isSelected
                      ? '!bg-[#B8860B] !text-white hover:!bg-[#9B7008] shadow-sm'
                      : ''
                    }
                    ${isToday && !isSelected
                      ? 'ring-1 ring-[#B8860B]/40 text-[#B8860B] font-bold'
                      : ''
                    }
                  `}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                if (!minDateObj || new Date() >= minDateObj) {
                  onChange(todayStr);
                  setIsOpen(false);
                }
              }}
              disabled={minDateObj ? new Date(todayStr + 'T00:00:00') < minDateObj : false}
              className="text-[11px] font-bold text-[#B8860B] hover:text-[#9B7008] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

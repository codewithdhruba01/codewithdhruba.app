import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

const COLORS = [
  'bg-cyan-400',
  'bg-indigo-400',
  'bg-amber-400',
  'bg-green-400',
  'bg-rose-400',
  'bg-purple-400'
];

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // State for events
  const [events, setEvents] = useState<Record<string, Event[]>>({
    '2023-10-24': [
      { id: '1', title: 'Standup meeting', start: '10:00 am', end: '10:15 am', color: 'bg-cyan-400' },
      { id: '2', title: 'Customer interview', start: '01:00 pm', end: '02:00 pm', color: 'bg-indigo-400' },
      { id: '3', title: 'Design review', start: '04:00 pm', end: '05:30 pm', color: 'bg-amber-400' },
    ],
    '2026-03-07': [
      { id: '4', title: 'Portfolio Update', start: '09:00 pm', end: '11:00 pm', color: 'bg-green-400' },
    ]
  });

  // State for new event form
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStart, setNewTaskStart] = useState('10:00');
  const [newTaskEnd, setNewTaskEnd] = useState('11:00');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const formatDateKey = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return `${String(h).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const dateKey = formatDateKey(selectedDate);
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      start: formatTime(newTaskStart),
      end: formatTime(newTaskEnd),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };

    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));

    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleRemoveTask = (id: string) => {
    const dateKey = formatDateKey(selectedDate);
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(e => e.id !== id)
    }));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDateEvents = events[selectedDateKey] || [];

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  if (!shouldRender) return null;

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const days = [];

    // Correcting starting day for Monday-first calendar (Mon=0, Sun=6)
    // Date.getDay() is Sun=0, Mon=1...
    const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

    // Empty slots for previous month
    for (let i = 0; i < adjustedFirstDay; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), -adjustedFirstDay + i + 1);
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12 flex items-center justify-center text-neutral-800 font-medium text-sm">
        {date.getDate()}
      </div>);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = formatDateKey(new Date()) === formatDateKey(date);
      const isSelected = formatDateKey(selectedDate) === formatDateKey(date);
      const dateKey = formatDateKey(date);
      const dayEvents = events[dateKey] || [];
      const hasEvents = dayEvents.length > 0;

      days.push(
        <div
          key={i}
          onClick={() => {
            setSelectedDate(date);
            setIsAddingTask(false);
          }}
          className={`h-10 md:h-12 flex flex-col items-center justify-center cursor-pointer relative transition-all duration-200 group`}
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-medium transition-all
                    ${isSelected ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-neutral-300 hover:bg-white/5'}
                    ${isToday && !isSelected ? 'text-green-400 font-bold' : ''}
                `}>
            {i}
          </div>
          {hasEvents && !isSelected && (
            <div className="absolute bottom-1 flex gap-0.5 justify-center">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <div key={idx} className={`w-1 h-1 rounded-full ${event.color}`} />
              ))}
            </div>
          )}
          {isSelected && hasEvents && (
            <div className="absolute bottom-1.5 flex gap-1 justify-center">
              {dayEvents.slice(0, 3).map((_, idx) => (
                <div key={idx} className={`w-1 h-1 rounded-full bg-black`} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${isAnimating ? 'bg-black/80 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: isAnimating ? 1 : 0, scale: isAnimating ? 1 : 0.9, y: isAnimating ? 0 : 20 }}
        className="relative w-full max-w-4xl bg-[#161616] rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row h-auto md:h-[550px]"
      >
        {/* Left Section: Calendar */}
        <div className="flex-1 p-6 md:p-8 border-r border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-2 text-neutral-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-lg md:text-xl font-bold font-outfit text-white min-w-[100px] text-center">
                {monthName}, {year}
              </h3>
              <button onClick={nextMonth} className="p-2 text-neutral-400 hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <button onClick={handleClose} className="md:hidden p-2 text-neutral-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
              <div key={day} className="text-center text-xs md:text-sm font-semibold text-neutral-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>

        {/* Right Section: Schedule */}
        <div className="w-full md:w-[350px] bg-[#1a1a1a] p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg md:text-xl font-bold font-outfit text-white">
              {selectedDate.toLocaleString('default', { month: 'short' })} {selectedDate.getDate()}, {selectedDate.getFullYear()}
            </h4>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className={`p-2 rounded-full transition-all ${isAddingTask ? 'bg-red-500/10 text-red-400 rotate-45' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}
              >
                <Plus size={20} />
              </button>
              <button onClick={handleClose} className="hidden md:block p-2 text-neutral-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="wait">
              {isAddingTask ? (
                <motion.div
                  key="add-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-4 mb-6"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Task Title</label>
                    <input
                      autoFocus
                      type="text"
                      placeholder="What needs to be done?"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-green-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Start</label>
                      <input
                        type="time"
                        value={newTaskStart}
                        onChange={(e) => setNewTaskStart(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-green-500/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">End</label>
                      <input
                        type="time"
                        value={newTaskEnd}
                        onChange={(e) => setNewTaskEnd(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-green-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddTask}
                    className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-sm transition-all active:scale-95"
                  >
                    Add Task
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="task-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event) => (
                      <div key={event.id} className="relative pl-4 py-1 group">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${event.color}`} />
                        <div className="bg-white/5 group-hover:bg-white/10 transition-all p-3 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="text-sm md:text-base font-bold text-white mb-1">{event.title}</h5>
                            <p className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                              <Clock size={12} className="text-neutral-500" />
                              {event.start} - {event.end}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveTask(event.id)}
                            className="p-2 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center py-10">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <CalendarIcon size={24} className="text-neutral-600" />
                      </div>
                      <p className="text-neutral-500 text-sm font-medium">No events scheduled.</p>
                      <button
                        onClick={() => setIsAddingTask(true)}
                        className="mt-4 text-xs text-green-400 font-bold hover:underline"
                      >
                        + Add New
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CalendarIcon = ({ size, className }: { size: number, className: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default ScheduleModal;

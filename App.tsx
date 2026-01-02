import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewMode, AppData } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import WeeklyPlanner from './components/WeeklyPlanner';
import MonthlyView from './components/MonthlyView';
import { v4 as uuidv4 } from 'uuid';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('zenplan_data');
    if (saved) return JSON.parse(saved);
    return {
      tasks: [],
      habits: [
        { id: uuidv4(), name: 'Morning Meditation', completions: [] },
        { id: uuidv4(), name: 'Read 20 Pages', completions: [] },
        { id: uuidv4(), name: 'Workout', completions: [] }
      ],
      dailyFocus: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('zenplan_data', JSON.stringify(data));
  }, [data]);

  const weeklyProgress = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    
    const weekDates = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    const weeklyTasks = data.tasks.filter(t => weekDates.includes(t.date));
    const tasksDone = weeklyTasks.filter(t => t.completed).length;
    const taskTotal = weeklyTasks.length;

    let habitsDone = 0;
    const habitsTotal = data.habits.length * 7;
    data.habits.forEach(h => {
      h.completions.forEach(date => {
        if (weekDates.includes(date)) habitsDone++;
      });
    });

    const totalActions = taskTotal + habitsTotal;
    if (totalActions === 0) return 0;

    const completedActions = tasksDone + habitsDone;
    return (completedActions / totalActions) * 100;
  }, [data]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `zenplan-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.tasks && json.habits) {
          setData(json);
          alert('Data successfully imported!');
        } else {
          alert('Invalid data format.');
        }
      } catch (err) {
        alert('Error reading file.');
      }
    };
    reader.readAsText(file);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewMode.DASHBOARD:
        return <Dashboard data={data} />;
      case ViewMode.WEEKLY:
        return <WeeklyPlanner data={data} onUpdate={updateData} />;
      case ViewMode.HABITS:
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-500">
            <div className="p-4 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold font-outfit text-slate-800 mb-6">Manage Habits</h2>
              <p className="text-slate-500 text-sm mb-8">Add or remove core habits that define your daily system.</p>
              <div className="space-y-4">
                {data.habits.map(habit => (
                  <div key={habit.id} className="flex items-center justify-between p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-100">
                        <ICONS.Target size={20} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm md:text-base">{habit.name}</span>
                    </div>
                    <button 
                      onClick={() => updateData({ habits: data.habits.filter(h => h.id !== habit.id) })}
                      className="text-slate-400 text-xs font-bold hover:text-red-500 bg-white hover:bg-red-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-slate-100 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className="pt-6">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.elements.namedItem('habitName') as HTMLInputElement).value;
                    if (name.trim()) {
                      updateData({ habits: [...data.habits, { id: uuidv4(), name, completions: [] }] });
                      form.reset();
                    }
                  }}>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        name="habitName"
                        type="text" 
                        placeholder="e.g., Meditation, Deep Work..." 
                        className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 ring-indigo-500/20 transition-all text-sm"
                      />
                      <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 text-sm">Add Habit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Data Management</h3>
              <p className="text-slate-500 text-xs mb-6">Backup your yearly data to a local file or restore from a previous backup.</p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={exportData}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold hover:bg-white hover:shadow-sm transition-all"
                >
                  <ICONS.Plus size={16} className="rotate-45" /> Export JSON
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                   Import Backup
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImport} 
                  accept=".json" 
                  className="hidden" 
                />
              </div>
            </div>
          </div>
        );
      case ViewMode.MONTHLY:
        return <MonthlyView data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">Z</div>
          <span className="font-bold font-outfit text-slate-800">ZenPlan</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <ICONS.X size={24} /> : <ICONS.Menu size={24} />}
        </button>
      </header>

      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        weeklyProgress={weeklyProgress}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
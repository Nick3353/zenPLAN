
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string; // ISO string YYYY-MM-DD
}

export interface Habit {
  id: string;
  name: string;
  completions: string[]; // Array of ISO dates YYYY-MM-DD
}

export interface DayData {
  date: string;
  tasks: Task[];
  focus: string;
}

export interface AppData {
  tasks: Task[];
  habits: Habit[];
  dailyFocus: Record<string, string>; // date string -> focus text
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  HABITS = 'HABITS'
}

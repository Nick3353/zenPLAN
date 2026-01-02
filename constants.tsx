import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  LayoutList, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Target,
  Menu,
  X,
  Info
} from 'lucide-react';

export const COLORS = {
  monday: 'bg-[#E8F5E9] border-[#C8E6C9] text-[#2E7D32]', // Green
  tuesday: 'bg-[#F3E5F5] border-[#E1BEE7] text-[#7B1FA2]', // Purple
  wednesday: 'bg-[#FFF9C4] border-[#FFF59D] text-[#FBC02D]', // Yellow
  thursday: 'bg-[#FFE0B2] border-[#FFCC80] text-[#E65100]', // Orange
  friday: 'bg-[#E1F5FE] border-[#B3E5FC] text-[#0288D1]', // Blue
  saturday: 'bg-[#FCE4EC] border-[#F8BBD0] text-[#C2185B]', // Pink
  sunday: 'bg-[#F5F5F5] border-[#E0E0E0] text-[#616161]', // Grey
};

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'MONTHLY', label: 'Monthly View', icon: <Calendar size={20} /> },
  { id: 'WEEKLY', label: 'Weekly Planner', icon: <LayoutList size={20} /> },
  { id: 'HABITS', label: 'Habit Tracker', icon: <CheckSquare size={20} /> },
];

export const ICONS = {
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Settings,
  Target,
  Menu,
  X,
  Calendar,
  Info
};
# ZenPlan Yearly Activity Tracker

## Overview
ZenPlan is a high-performance productivity application designed to help users track their yearly activities, habits, and daily focus. The application provides a tiered visualization system that breaks down long-term goals into monthly heatmaps, weekly workspaces, and daily execution lists. It integrates the Google Gemini API to provide intelligent productivity insights and automated goal suggestions.

## Key Features

### Performance Analytics Dashboard
The dashboard provides a high-level overview of execution scores based on task completion and habit consistency. It features:
- Total Execution Score: A weighted metric of overall productivity.
- AI Productivity Coach: Personalized insights generated from real-time activity data.
- Weekly Output Trends: A bar chart visualization of the last seven days of activity.
- Habit Balance Radar: A specialized chart showing consistency across different habit categories.

### Visual Roadmap (Monthly View)
A comprehensive heatmap of productivity across the entire year.
- Dynamic year selection.
- Intensity-based color coding for daily activity volume.
- Interactive tooltips showing specific activity counts for each day.
- Monthly totals for aggregate performance tracking.

### Weekly Workspace (Planner)
A redesigned vertical workspace architecture where each day is represented as a wide horizontal row.
- Identity Section: Displays the date and a large progress ring for immediate visual feedback.
- Core Intention: A dedicated space for setting the day's primary objective, featuring AI-powered goal suggestions.
- Execution Checklist: A robust task management system with real-time progress updates.
- Horizontal Alignment: Maximizes screen real estate by organizing day-specific data in a left-to-right flow.

### Consistency Matrix (Habit Tracker)
A foundational system for tracking repetitive behaviors.
- Habit definition and management.
- Weekly grid view for quick completion logging.
- Dark-themed high-contrast interface for focus on consistency.

## Technical Architecture

### Core Technologies
- Framework: React 19
- Styling: Tailwind CSS
- Icons: Lucide React
- Charts: Recharts
- AI: @google/genai (Gemini 3 Flash)
- Utilities: uuid for unique identifiers

### Data Management
The application uses a local-first data strategy:
- Persistence: All user data is stored in the browser's LocalStorage.
- Privacy: No user data is sent to external servers except for the prompts processed by the Gemini API.
- Portability: Users can export their entire database as a JSON file and import it on other devices.

### AI Implementation
ZenPlan utilizes the Gemini 3 Flash model for two primary functions:
- Productivity Insights: Analyzes completed tasks and habit streaks to provide professional coaching notes.
- Goal Summarization: Evaluates a list of raw tasks to suggest a concise three-word focus for the day.

## Installation and Setup
The project is built as a standard React application using ES6 modules.
1. Ensure a valid environment with access to the Google Gemini API key.
2. The application expects the API key to be available via process.env.API_KEY.
3. Use a modern browser that supports ES6 modules and the importmap specification.

## Usage Guidelines
- Dashboard: Use this for weekly reviews and checking long-term trends.
- Weekly Planner: This is the primary daily interface for task execution and intention setting.
- Monthly View: Use this for a retrospective look at your consistency over months or years.
- Habit Tracker: Set 3-5 core habits to ensure the Habit Radar chart on the dashboard functions optimally.

## Development Standards
- Components: Modular and functional React components.
- State: Centralized state in the main App component with prop drilling kept to a minimum.
- UI/UX: High-contrast typography using Inter and Outfit fonts, with a focus on generous spacing and smooth animations.
# 🎓 Student Management Dashboard

A modern, secure, and responsive web application designed for managing students and school courses. This project was developed with a strong focus on strict data typing, clear separation of concerns between components, and secure database communications.

---

## 🚀 Tech Stack

* **Front-end:** React 19 + Vite
* **Language:** TypeScript (Strict Mode)
* **Routing:** React Router
* **State Management & Data Fetching:** React Query (TanStack Query)
* **Database & Backend-as-a-Service:** Supabase (PostgreSQL + Auth)
* **Styling:** Custom CSS3 (Flexbox, Grid Layout, and Animated Modals)

---

## ✨ Key Features

* **Full school management:** dedicated pages for students, teachers, classes and lessons, with attendance tracking and a per-student history.
* **Authentication:** login backed by Supabase Auth.
* **Controlled Component Architecture:** Form inputs are handled entirely through React's controlled re-rendering cycle (`onChange`), preventing desynced UI states.
* **Relational Joins:** Advanced querying on Supabase to fetch student records combined with their respective class data in a single, efficient asynchronous request.
* **Granular Security (RLS):** Database secured via PostgreSQL Row Level Security (RLS), ensuring data access is restricted and only granted through explicit policies.
* **Fluid Modal Interface:** A centralized student data editing system utilizing dynamic modal overlays with smooth *backdrop-blur* transitions.

---

## 🛠️ Project Setup

### 1. Clone the repository and install dependencies
```bash
git clone https://github.com/TanturliMatteo/ClassManagement.git
cd ClassManagement
npm install
```

### 2. Configure Supabase
Create a `.env.local` file in the project root with your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run
```bash
npm run dev       # development server
npm run build     # typecheck + production build
npm run preview   # preview the production build
npm run lint      # eslint
```

---

## 📁 Project Structure

```
src/
├── pages/        # Home, Login, Students, Teachers, Classes, Lessons, NotFound
├── components/   # layout (Header, Footer), tables, insert/update forms, modals
├── hooks/        # one React Query hook per query/mutation (useGetStudents, useInsertLesson, …)
├── services/     # Supabase client and data-access functions
├── types/        # shared TypeScript types
└── utils/        # date formatting and small helpers
```

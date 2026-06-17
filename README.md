# 🎓 Student Management Dashboard

A modern, secure, and responsive web application designed for managing students and school courses. This project was developed with a strong focus on strict data typing, clear separation of concerns between components, and secure database communications.

---

## 🚀 Tech Stack

* **Front-end:** React 19 + Vite
* **Language:** TypeScript (Strict Mode)
* **State Management & Data Fetching:** React Query (TanStack Query)
* **Database & Backend-as-a-Service:** Supabase (PostgreSQL)
* **Styling:** Custom CSS3 (Flexbox, Grid Layout, and Animated Modals)

---

## ✨ Key Features

* **Controlled Component Architecture:** Form inputs are handled entirely through React's controlled re-rendering cycle (`onChange`), preventing desynced UI states.
* **Relational Joins:** Advanced querying on Supabase to fetch student records combined with their respective class data in a single, efficient asynchronous request.
* **Granular Security (RLS):** Database secured via PostgreSQL Row Level Security (RLS), ensuring data access is restricted and only granted through explicit policies.
* **Fluid Modal Interface:** A centralized student data editing system utilizing dynamic modal overlays with smooth *backdrop-blur* transitions.

---

## 🛠️ Project Setup

### 1. Clone the repository and install dependencies
```bash
npm install

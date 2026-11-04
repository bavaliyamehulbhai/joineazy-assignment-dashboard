# 🎓 Joineazy — Assignment & Review Dashboard

> **Frontend Internship Task 1 — Production-Ready Submission**  
> Candidate: **Mehul Bavaliya**  
> Tech Stack: **React 18 + Vite 6 + Tailwind CSS v4 + React Router v6 + Lucide Icons + Context API + LocalStorage**

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Executive Summary

**Joineazy Assignment & Review Dashboard** is a high-performance, responsive single-page web application designed for academic environments. It provides isolated, role-tailored dashboards for **Admins (Professors)** and **Students** with complete assignment lifecycle management, an audited **2-step submission confirmation flow**, granular student cohort allocation, live completion analytics, search/filter/sort, overdue tracking, and persistent light/dark themes.

The entire system runs **100% client-side** using a robust `localStorage` engine paired with React Context API, guaranteeing persistence across refreshes without requiring external database dependencies.

---

## 🚀 Live Demo & Repository

- **Live Application:** *[Add your deployed Vercel/Netlify link here]*
- **GitHub Repository:** *[https://github.com/MehulBavaliya/joineazy-assignment-dashboard]*
- **Video Walkthrough (Loom/Drive):** *[Add your 3–5 min video recording link here]*

---

## 👥 Demo Accounts (Quick Switch & Test)

The application includes an instant **Quick Switcher** on the login screen for effortless evaluation:

| Role | Name | Email | Default Focus / Scope |
| :--- | :--- | :--- | :--- |
| **Admin 1** | **Dr. Rajesh Patel** | `rajesh@joineazy.com` | Created Assignments 1, 2, 4 |
| **Admin 2** | **Prof. Priya Shah** | `priya@joineazy.com` | Created Assignments 3, 5 (Isolated) |
| **Student 1** | **Mehul Bavaliya** | `mehul@student.com` | Assigned to Assignments 1, 2, 3, 5 |
| **Student 2** | **Aarav Patel** | `aarav@student.com` | Assigned to Assignments 1, 2, 4 |
| **Student 3** | **Riya Shah** | `riya@student.com` | Assigned to Assignments 1, 3, 5 |
| **Student 4** | **Dhruv Mehta** | `dhruv@student.com` | Assigned to Assignments 1, 4 |
| **Student 5** | **Kavya Joshi** | `kavya@student.com` | Assigned to Assignments 2, 3, 5 |

---

## 🎯 Key Features & Requirements Matrix

### 1. 🛡️ Role Isolation & Authentication
- **Mock Role-Switching Auth:** Switch seamlessly between Admins and Students without complex passwords.
- **Strict Role Isolation:**
  - **Admins** only view and manage assignments created by their own user ID.
  - **Students** only see assignments explicitly allocated to them in the `assignedTo` list.
- **Guarded Routes:** Client-side `ProtectedRoute` intercepts unauthorized access and redirects to `/login`.

### 2. 👨‍🎓 Student Experience
- **Overview Dashboard:** Metrics for **Total Assigned**, **Submitted**, **Pending**, and **Completion Rate**.
- **Visual Progress Bar:** Real-time animated gradient bar reflecting personal completion.
- **Assignment Cards:** Shows title, brief description, relative/formatted due date, Google Drive resource button, and live status badge.
- **2-Step Submission Confirmation:**
  1. Student clicks **"Yes, I have submitted"**.
  2. A dedicated modal opens explaining that the action is final.
  3. Student clicks **"Confirm Submission"** $\rightarrow$ status immediately transitions to **Submitted**.
- **Isolated Status:** When Student A submits, Student B’s status remains **Pending**.

### 3. 👨‍🏫 Admin Experience
- **Admin Dashboard:** High-level metrics for **Assignments Created**, **Active Cohorts**, and **Overall Class Completion**.
- **Assignment CRUD:**
  - **Create:** Modal to input Title, Description, Due Date, Google Drive URL, and cohort allocation.
  - **Edit:** Update assignment details without wiping existing student submission records.
  - **Delete:** Two-step delete dialog preventing accidental loss of data.
- **Cohort Allocation:**
  - Multi-select student picker.
  - **"Select All Students"** and **"Clear Selection"** one-click triggers.
- **Detailed Submission Tracker (`/admin/assignment/:id`):**
  - Per-student status table (Avatar, Name, Email, Status Badge, Submission Timestamp).
  - Class-wide completion rate percentage bar.

### 4. 💎 Bonus Features & UX Polish
- 🔍 **Live Search:** Instant fuzzy search across assignment titles and descriptions.
- 🏷️ **Multi-Criteria Filtering:** Filter by status (`All`, `Pending`, `Submitted`, `Overdue`).
- ⚡ **Sorting:** Sort by Due Date (Ascending/Descending), Title (A–Z), and Creation Date.
- ⏰ **Overdue Intelligence:** Flags pending assignments past due date with a pulsing red warning indicator. Submitted assignments are never penalized.
- 🌓 **Persistent Theme Engine:** Flawless Light/Dark mode with automatic system sync and `localStorage` persistence.
- 📱 **Fully Responsive SaaS Layout:** Desktop macOS-style sidebar with active badges, transitioning into an authentic Apple iOS frosted glass Bottom Tab Bar on mobile devices.
- ♿ **Accessibility First:** Semantic HTML, ARIA labels, keyboard focus rings, and screen-reader considerations.

---

## 🏗️ System Architecture & Folder Structure

```text
joineazy/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminStats.jsx          # Admin KPI metric cards
│   │   │   ├── AssignmentModal.jsx      # Create/Edit assignment modal
│   │   │   ├── AssignmentTable.jsx      # Responsive desktop table / mobile cards
│   │   │   └── DeleteConfirmDialog.jsx  # Safety delete confirmation modal
│   │   ├── common/
│   │   │   ├── Badge.jsx                # Dynamic status badge with pulse dots
│   │   │   ├── EmptyState.jsx           # Clean zero-data illustrations
│   │   │   └── ProgressBar.jsx          # Animated gradient completion bar
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx      # Base responsive wrapper
│   │   │   ├── Navbar.jsx               # Sticky navbar with avatar, theme toggle, logout
│   │   │   └── Sidebar.jsx              # Navigation drawer for desktop/mobile
│   │   └── student/
│   │       ├── AssignmentCard.jsx       # Individual student assignment card
│   │       ├── StudentStats.jsx         # Student personal stats cards
│   │       └── SubmissionDialog.jsx     # 2-step submission modal
│   │
│   ├── context/
│   │   └── AppContext.jsx               # Single source of truth & business actions
│   │
│   ├── data/
│   │   └── seedData.js                  # Preloaded initial users & assignments
│   │
│   ├── pages/
│   │   ├── AdminAssignmentDetails.jsx   # Admin assignment submission inspector
│   │   ├── AdminAssignments.jsx         # Dedicated admin assignment manager (CRUD)
│   │   ├── AdminDashboard.jsx           # Faculty executive overview & analytics
│   │   ├── AssignmentDetails.jsx        # Student assignment view & 2-step submit
│   │   ├── Login.jsx                    # Apple-style multi-user selector & quick access
│   │   ├── StudentAssignments.jsx       # Dedicated student assignment hub & filters
│   │   └── StudentDashboard.jsx         # Student personal progress & deadlines
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx                # React Router v6 definitions
│   │   └── ProtectedRoute.jsx           # Role guard (admin / student)
│   │
│   ├── utils/
│   │   ├── calculations.js              # Pure functions for progress & metrics
│   │   ├── helpers.js                   # Date formatters, overdue logic, getters
│   │   ├── storage.js                   # Type-safe, fallback-guarded localStorage
│   │   └── validation.js                # Form validation rules
│   │
│   ├── App.jsx                          # App root with AppProvider & AppRoutes
│   ├── index.css                        # Tailwind v4 directives & custom themes
│   └── main.jsx                         # React 18 DOM mount point
│
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🧠 Architectural & Technical Decisions

### 1. Zero Backend & Pure Client-Side Persistence
To fulfill the requirement of zero backend dependency while ensuring state is never lost on refresh:
- `src/utils/storage.js` provides an idempotent initialization routine.
- Every state mutation (`createAssignment`, `updateAssignment`, `deleteAssignment`, `submitAssignment`) triggers synchronous updates to both React Context state and `localStorage`.
- Safe JSON parsing protects against corrupted browser storage with graceful fallback to `seedData`.

### 2. Functional Spread for Multi-Student State
When a student submits, only their own ID key in the assignment's `submissions` record is updated:
```javascript
const updatedAssignments = assignments.map((assignment) => {
  if (assignment.id !== assignmentId) return assignment;
  return {
    ...assignment,
    submissions: {
      ...assignment.submissions,
      [studentId]: "submitted",
    },
  };
});
```
This guarantees that **Student A** submitting never mutates or overwrites the status of **Student B**, maintaining complete multi-tenant simulation.

### 3. Tailwind CSS v4 Theme Variant Setup
Tailwind v4 adopts the modern `@variant dark` specification. To enable class-driven `.dark` switching independently of system OS dark-mode preferences, we configured:
```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```
The root `<html>` element is updated by `AppContext`, and the choice is cached under the `joineazy_theme` key in `localStorage`.

---

## 🛠️ Local Development Setup

Follow these steps to run the project locally on your machine:

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MehulBavaliya/joineazy-assignment-dashboard.git
   cd joineazy-assignment-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Run a production build:**
   ```bash
   npm run build
   ```
   Vite will compile and output optimized production assets into the `/dist` directory.

---

## 📋 Evaluation Checklist Reference

| Criteria | Implementation Status | Notes |
| :--- | :---: | :--- |
| **Student Assignment View** | ✅ Complete | Cards display title, description, due date, Google Drive link |
| **2-Step Submission Confirmation** | ✅ Complete | "Yes, I have submitted" button triggers explicit modal confirmation |
| **Progress Calculation** | ✅ Complete | Dynamic formula: `(submitted / total) * 100`, auto-updating |
| **Admin CRUD** | ✅ Complete | Full Create, Read, Update, and Delete with dialog safety |
| **Drive Link Integration** | ✅ Complete | Validated URLs linking students directly to learning materials |
| **Student Cohort Allocation** | ✅ Complete | Multi-select with "Select All" / "Clear Selection" options |
| **Submission Tracking** | ✅ Complete | Detailed per-student status table with submission metrics |
| **Role-Based Isolation** | ✅ Complete | Admins only see self-created; students only see allocated tasks |
| **Data Persistence** | ✅ Complete | 100% persistent in `localStorage`, survives browser reload |
| **Search, Filter & Sort** | ✅ Complete | Real-time text search, status filters, and due date sorting |
| **Overdue Highlighting** | ✅ Complete | Amber/Red indicators for overdue pending assignments |
| **Dark Mode** | ✅ Complete | Full contrast-tested light and dark themes |
| **Responsive Design** | ✅ Complete | Mobile first, tested on smartphones, tablets, and desktop |

---

## 👨‍💻 Candidate Details

- **Candidate:** Mehul Bavaliya
- **Role Applied:** Frontend Engineering Intern (Task 1)
- **Organization:** Joineazy
- **Date:** November 2026

*Crafted with precision, clean code architecture, and high attention to user experience.*


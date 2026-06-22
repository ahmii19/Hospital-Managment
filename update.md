# 🏥 MediCore — AI-Powered Hospital Management System
### Software Requirements Specification (SRS)
**Version:** 2.0 | **Date:** May 2026 | **Type:** Semester Project — Frontend Web Application

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Objectives](#2-objectives)
3. [Tech Stack](#3-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Folder Structure](#5-folder-structure)
6. [Module-wise Features & Functionalities](#6-module-wise-features--functionalities)
   - 6.1 Authentication System
   - 6.2 Dashboard Overview
   - 6.3 Analytics Dashboard
   - 6.4 Patient Management
   - 6.5 Doctor Management
   - 6.6 Appointment Management
   - 6.7 AI Analysis Engine
   - 6.8 Medical Reports
   - 6.9 Emergency Management
   - 6.10 Settings & Configuration
7. [UI/UX Design System](#7-uiux-design-system)
8. [State Management](#8-state-management)
9. [Routing & Navigation](#9-routing--navigation)
10. [Mock Data & Dummy Logic](#10-mock-data--dummy-logic)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Limitations & Future Scope](#12-limitations--future-scope)
13. [Installation & Running](#13-installation--running)

---

## 1. Project Overview

**Project Name:** MediCore — AI-Powered Hospital Management System
**Project Type:** Frontend-only Single Page Application (SPA)
**Purpose:** Semester final project demonstrating advanced React.js development skills, modern UI/UX design, component architecture, routing, state management, and interactive data visualization.

MediCore simulates a real-world, production-level hospital management platform used by administrators, doctors, receptionists, and patients. It provides a comprehensive interface for managing all hospital operations — from patient registration to AI-driven health analytics — through a beautifully designed, fully interactive frontend.

> **Note:** This is a frontend-only application. All data is mock/dummy data stored in memory. There is no backend, database, or real API integration. Authentication uses localStorage to simulate sessions.

---

## 2. Objectives

The main objectives of this project are:

- ✅ Build a fully functional, premium-quality hospital management SPA using React.js
- ✅ Demonstrate advanced component architecture and reusable UI patterns
- ✅ Implement React Router DOM for multi-page navigation with route protection
- ✅ Use Zustand for global state management (theme, sidebar, modals)
- ✅ Integrate Chart.js with 6 different chart types for data visualization
- ✅ Build animated, interactive UI using Framer Motion
- ✅ Create a complete design system with dark/light mode and glassmorphism
- ✅ Simulate real hospital workflows: patient admission, appointments, emergency alerts
- ✅ Implement AI-themed analytics module with predictive disease cards
- ✅ Achieve a production-quality look and feel as a semester showcase project

---

## 3. Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | v19.x | Core UI framework |
| **Vite** | v8.x | Build tool and dev server |
| **JavaScript (ES2024)** | ESNext | Primary language |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | v4.x | Utility-first base classes |
| **@tailwindcss/vite** | v4.x | Vite integration plugin |
| **Custom CSS Variables** | — | Full design system (colors, spacing, shadows) |
| **Google Fonts (Inter + Outfit)** | — | Typography |

### Routing & Navigation
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Router DOM** | v7.x | Client-side routing, protected routes, navigation |

### State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | v5.x | Lightweight global store (theme, sidebar, modals, search) |
| **React Context API** | Built-in | Authentication context (user session, login, logout) |
| **localStorage** | Browser API | Theme persistence, auth token storage |

### Data Visualization
| Technology | Version | Purpose |
|------------|---------|---------|
| **Chart.js** | v4.x | Chart rendering engine |
| **React-Chartjs-2** | v5.x | React wrapper for Chart.js |

### Animation & UX
| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | v12.x | Page transitions, modal animations, spring physics |

### Utilities & Notifications
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Hot Toast** | v2.x | Premium toast notification system |
| **Lucide React** | v0.x | Icon library (200+ SVG icons) |
| **clsx** | v2.x | Conditional className utility |
| **tailwind-merge** | v3.x | Tailwind class conflict resolver |

### Dev Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | v9.x | Code linting and quality |
| **@vitejs/plugin-react** | v6.x | React Fast Refresh support |

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                         │
├─────────────────────────────────────────────────────────────┤
│                    React Application                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Auth Context│  │ Zustand Store│  │  React Router    │   │
│  │ (user/login)│  │(theme/sidebar│  │  (route guards)  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   Layout Wrapper                        │  │
│  │  ┌─────────────┐  ┌────────────────────────────────┐  │  │
│  │  │   Sidebar   │  │          Navbar                │  │  │
│  │  │ (animated)  │  │ (search, notif, theme, user)   │  │  │
│  │  └─────────────┘  └────────────────────────────────┘  │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │               Page Content (Routes)                │ │  │
│  │  │  Dashboard | Patients | Doctors | Appointments     │ │  │
│  │  │  Analytics | AI Analysis | Reports | Emergency     │ │  │
│  │  │  Settings | Login | Register                       │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │  Mock Data Layer │  │     localStorage Persistence    │   │
│  │  (mockData.js)   │  │   (theme, auth token, user)     │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User visits `/` → Router redirects to `/login` (if not authenticated)
2. User logs in → AuthContext stores user in state + localStorage
3. PrivateRoute guards check auth → redirect to dashboard
4. All pages read from `mockData.js` — a centralized dummy data file
5. Mutations (add/delete/edit) update local component state only (no persistence)
6. Zustand store manages cross-component state (theme, sidebar collapse, modals)

---

## 5. Folder Structure

```
hospital-management-system/
│
├── public/                          # Static assets
│
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Sidebar.jsx          # Animated collapsible sidebar
│   │       ├── Navbar.jsx           # Top navigation bar
│   │       └── Layout.jsx           # Page wrapper with transitions
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # Auth provider + useAuth hook
│   │
│   ├── store/
│   │   └── useStore.js              # Zustand global store
│   │
│   ├── data/
│   │   └── mockData.js              # All dummy/mock data (JSON-like arrays)
│   │
│   ├── pages/
│   │   ├── Login.jsx                # Auth: Login page
│   │   ├── Register.jsx             # Auth: Registration page
│   │   ├── Dashboard.jsx            # Main overview dashboard
│   │   ├── Analytics.jsx            # Charts and data analytics
│   │   ├── Patients.jsx             # Patient management CRUD
│   │   ├── Doctors.jsx              # Doctor management
│   │   ├── Appointments.jsx         # Appointment scheduling
│   │   ├── AIAnalysis.jsx           # AI health analytics module
│   │   ├── MedicalReports.jsx       # Lab reports file manager
│   │   ├── Emergency.jsx            # Emergency monitoring panel
│   │   └── Settings.jsx             # System configuration
│   │
│   ├── App.jsx                      # Root component + route definitions
│   ├── main.jsx                     # React entry point
│   ├── index.css                    # Global design system styles
│   └── App.css                      # (Legacy - cleared)
│
├── index.html                       # HTML shell with SEO meta tags
├── vite.config.js                   # Vite config with Tailwind plugin
├── package.json                     # Dependencies and scripts
├── eslint.config.js                 # ESLint rules
└── Hospital Management Project Specifications.md
```

---

## 6. Module-wise Features & Functionalities

---

### 6.1 Authentication System

#### 6.1.1 Login Page (`/login`)

**Features:**
- Glassmorphism card design with animated floating radial gradient blobs
- Two input fields: Email and Password (with icon prefixes)
- Real-time form validation:
  - Required field checks
  - Email format validation using regex
  - Minimum password length (6 characters)
- Show/Hide password toggle button (Eye / EyeOff icons)
- "Remember Me" checkbox (UI functional)
- "Forgot Password?" link (UI placeholder)
- Social Login buttons (Google, Microsoft) — shows toast message in demo mode
- Demo credentials banner displayed on card
- Loading spinner state during authentication (1 second simulated delay)
- Success toast: `"Welcome back, [Name]! 👋"`
- Error toast on wrong credentials
- Redirects to `/dashboard` on success

**Mock Credentials:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | 123456 |
| Doctor | doctor@gmail.com | 123456 |
| Receptionist | receptionist@gmail.com | 123456 |
| Patient | patient@gmail.com | 123456 |

#### 6.1.2 Register Page (`/register`)

**Features:**
- Profile photo upload placeholder (click to trigger, shows toast in demo)
- Fields: Full Name, Phone Number, Email Address, Password, Confirm Password
- Role Selection Grid (4 options): Admin, Doctor, Receptionist, Patient
  - Selected role highlighted with cyan border + background
- Password Strength Indicator:
  - 5-segment colored progress bar
  - Levels: Weak (red) → Fair (orange) → Strong (green) → Very Strong (green)
  - Checks: length ≥6, length ≥10, uppercase, digit, special character
- Show/Hide password toggle
- Confirm password match validation
- Animated Framer Motion submit button
- Redirects to `/dashboard` on success

#### 6.1.3 Auth Logic (AuthContext)

- React Context API provider wrapping the entire app
- `login(email, password)` — matches against 4 mock users, returns success/error
- `register(data)` — creates new user object, stores in localStorage
- `logout()` — clears localStorage, resets state, redirects to `/login`
- JWT-simulated token: `btoa(email + timestamp)`
- `loading` state prevents flash of content on page reload
- `useAuth()` custom hook for easy consumption

#### 6.1.4 Route Protection

- `PrivateRoute` component — wraps all authenticated pages
  - If loading: shows centered spinning loader
  - If no user: redirects to `/login`
- `PublicRoute` component — wraps login/register
  - If already logged in: redirects to `/dashboard`

---

### 6.2 Dashboard Overview (`/dashboard`)

**Purpose:** High-level hospital performance overview on a single glance page.

#### Metric Cards (6 cards)
Each card contains:
- Title, Large Value, Gradient Icon (44×44px with glow shadow)
- Mini Chart.js Line chart (height 40px, responsive, no axes, no tooltips)
- Trending indicator: TrendingUp (green) or TrendingDown (red) with percentage

| Card | Value | Trend |
|------|-------|-------|
| Total Patients | 1,284 | +12.5% |
| Active Doctors | 48 | +3 |
| Appointments | 326 | +8.2% |
| Monthly Revenue | $625K | +5.8% |
| Emergency Cases | 18 | -2 |
| ICU Beds Available | 12/40 | 70% Occupied |

Each card has unique gradient: cyan, purple, green, orange, red, indigo.
Hover effect: `translateY(-3px)` + border glow.

#### Today's Appointments Panel
- Lists 5 upcoming appointments
- Shows: patient avatar, name, doctor, department, time, status badge
- "View all" link → `/appointments`

#### Recent Patients Panel
- Lists 5 recently admitted patients
- Shows: avatar with colored gradient, name, diagnosis, age, status badge, health score
- "View all" link → `/patients`

#### Quick Stats Row (4 small cards)
- Admitted count, Outpatient count, Discharged today, On-duty Doctors
- Each with emoji icon and large colored number

---

### 6.3 Analytics Dashboard (`/analytics`)

**Purpose:** Data-driven visualization of hospital performance metrics.

**Time Filter Buttons:** 7D | 1M | 3M | 1Y (UI only)

#### Chart 1 — Line Chart: Patient Admissions vs Discharges
- Dual dataset: Blue (Admissions) + Green (Discharges)
- Area fill enabled
- Data: 7 months (Jul–Jan)
- Tension 0.4 for smooth curves

#### Chart 2 — Bar Chart: Department Performance
- Dual dataset: Patients count + Revenue ($K) per department
- 6 departments: Cardiology, Neurology, Pediatrics, Orthopedics, Dermatology, Radiology
- Rounded bar corners (borderRadius: 6)

#### Chart 3 — Doughnut Chart: Disease Distribution
- 4 categories: Heart Disease (22%), Diabetes (18%), Hypertension (15%), Others (23%)
- Colored segments with 2px borders
- Legend at bottom

#### Chart 4 — Area Chart: AI Prediction Accuracy
- Single dataset with fill enabled
- 7 months showing accuracy growth (78% → 92%)
- Purple color scheme

#### Chart 5 — Radar Chart: Doctor Performance Scorecard
- 6 axes: Punctuality, Patient Rating, Success Rate, Active Hours, Research, Teamwork
- 2 doctors compared: Dr. Sarah Johnson (cyan) vs Dr. Michael Chen (purple)
- Semi-transparent fill polygons

#### Chart 6 — Bar Chart: Monthly Revenue
- 7-month trend in $K
- Last bar highlighted (current month) in darker cyan
- No legend

**All Charts Share:**
- Dark-themed tooltips (navy background, custom styling)
- Grid lines at 4% opacity
- Inter font on tick labels

---

### 6.4 Patient Management (`/patients`)

**Purpose:** Full CRUD-like interface for managing patient records.

#### Data Table
- Columns: Patient (avatar + name + room), Age/Gender, Diagnosis, Doctor, Status, Health Score, Actions
- Default data: 8 patients from `mockData.js`

#### Search & Filter
- Live text search: filters by name or diagnosis (case-insensitive)
- Status filter tabs: All | Admitted | Outpatient | Discharged
- Both filters combined with AND logic
- Page resets to 1 on filter change

#### Pagination
- 5 records per page
- Shows "Showing X–Y of Z" counter
- Previous/Next buttons + numbered page buttons
- Active page highlighted with primary gradient

#### Patient Detail Modal
- Opens on "View" (Eye icon) click
- Top section: 56px gradient avatar, name, diagnosis, blood group, age
- Vitals grid (2×2): Blood Pressure, Pulse, Temperature, O₂ Saturation
- AI Health Score section:
  - Large colored number (green/yellow/red based on score)
  - Full-width progress bar (color-coded)
  - Small Line chart showing 6-month health trend
- Details grid: Doctor, Status, Room, Admit Date, Phone, Email
- Spring animation: `scale(0.9 → 1)` on open

#### Add Patient Modal
- Fields: Full Name*, Age*, Gender (select), Status (select), Diagnosis*, Assign Doctor (select from list)
- Auto-generates: avatar initials, blood group, room, default vitals, health score
- Adds to top of patient list
- Shows success toast

#### Actions
- **Edit** (pencil icon): shows toast "Edit feature active"
- **Delete** (trash icon): removes from local state + shows success toast
- **View** (eye icon): opens detail modal

#### Status Badges
- Admitted → `badge-error` (red)
- Outpatient → `badge-info` (cyan)
- Discharged → `badge-success` (green)

---

### 6.5 Doctor Management (`/doctors`)

**Purpose:** Directory of specialist doctors with status tracking and profile management.

#### Doctor Cards (Grid Layout)
- Responsive: 3 columns → 2 → 1 (mobile)
- Each card contains:
  - 60px avatar with doctor-specific gradient color + glow box-shadow
  - Background decorative radial blob
  - Name, Specialization, Department
  - Star rating display (5 stars, filled vs outlined based on rating value)
  - Rating number + "patients" count
  - Experience text
  - Status badge: Available (green) / Busy (yellow) / Off Duty (gray)
  - Shift hours with Clock icon
  - Animated: `y: -4px` on hover via Framer Motion `whileHover`

#### Status Filter Tabs
- All | Available | Busy | Off Duty
- Shows count of currently available doctors

#### Doctor Detail Modal
- Avatar, name, specialization header
- Bio paragraph
- 6-cell info grid: Department, Experience, Shift, Status, Phone, Email
- Star rating display (large, 18px stars)
- Action buttons: "📩 Message" + "📅 Schedule" (both show toast in demo)

#### Add Doctor Modal
- Fields: Full Name*, Specialization*, Department*, Experience, Shift Hours, Phone, Email, Status (select), Biography (textarea)
- Auto-generates avatar initials from name
- Prepends to doctor list

---

### 6.6 Appointment Management (`/appointments`)

**Purpose:** Schedule, track, and manage patient appointments with dual view modes.

#### View Toggle
- **List View** (default): Full data table
- **Calendar View**: Month-view calendar grid

#### List View Table
- Columns: Patient, Doctor, Department, Date & Time, Type, Status, Actions
- Status color badges with matching background/border
- Lazy animation: rows fade in with stagger delay

#### Quick Status Actions (per row)
- `Pending` → Show "Confirm" button (green)
- `Confirmed` → Show "Complete" button (cyan)
- Any active status → Show "Cancel" button (red)
- Updates local state + toast notification

#### Calendar View
- 7-column grid with day headers (Sun–Sat)
- Month navigation (← Today →)
- Pre-filled with January 2024 data
- Day 25 highlighted as "Today" with gradient background
- Days with appointments show colored event chips (10px pills) with time + first name
- Days with >2 appointments show "+N more" overflow indicator

#### Booking Modal
- Fields: Patient Name*, Department* (6 options), Doctor* (dropdown from list), Type (6 options), Date*, Time Slot* (15 slots from 08:00–16:00), Notes (textarea)
- On submit: creates new appointment with "Pending" status, prepends to list
- Shows "📅 Book Appointment" button in header

---

### 6.7 AI Analysis Engine (`/ai-analysis`)

**Purpose:** Premium AI-themed health intelligence dashboard (the flagship module).

#### Status Banner
- "AI Engine Active" indicator with pulsing green dot
- Purple gradient border card

#### Top Stats (4 cards)
- Average Health Score (calculated from all patients)
- High Risk Patients count (score < 60)
- AI Predictions Today (static: 47)
- Accuracy Rate (static: 92%)

#### Patient Health Score Meter
- Patient selector dropdown (all patients)
- Animated SVG circular gauge:
  - Inner/outer circle with stroke-dasharray animation
  - Color changes: Green (≥80) / Yellow (≥60) / Red (<60)
  - Glow filter applied to stroke
  - Framer Motion `strokeDashoffset` animated on mount (1.5s ease-out)
- 4 vitals cards below: BP, Pulse, Temp, O₂ in glass cards

#### AI Insights Engine Panel
- 5 insight cards with severity color coding (red/yellow/green)
- Each card contains:
  - Severity emoji (🔴/🟡/🟢), message text
  - Confidence progress bar (4px height)
  - Confidence percentage + category badge
- Staggered fade-in animation

#### Predictive Disease Cards (3 cards)
Each card for a disease/patient shows:
- Disease name + patient name
- Trending arrow (up = risk rising)
- Doughnut chart (cutout: 72%) showing risk % vs remainder
  - Risk segment color based on severity
- Risk percentage in center of doughnut
- Risk indicators list (bullet points)
- Recommendation box with suggested action

#### Recommendations Block
Three recommendation sections for selected patient:
- 🥗 **Diet Plan**: Low sodium, potassium-rich foods, Mediterranean diet
- 🏃 **Fitness Routine**: Walking, yoga, breathing exercises
- 👨‍⚕️ **Specialist Referrals**: Cardiologist priority, nutritionist, physiotherapist

---

### 6.8 Medical Reports (`/reports`)

**Purpose:** File manager for lab reports and digital prescriptions.

#### Summary Cards (4 cards)
- Total Reports count
- Normal reports count
- Critical reports count (red)
- Pending Review count

#### Filter & Search
- Text search: by patient name or report type
- Status filter tabs: All | Normal | Review | Critical | Pending

#### Reports Table
- Columns: Patient (avatar + name), Report Type, Doctor, Date, Format/Size, Status Badge, Actions
- Actions: Preview (eye), Download (shows toast), Delete (removes from state)

#### Report Preview Modal
- Full-width mock PDF layout:
  - **Hospital Header**: MediCore Hospital logo, address, report date, report ID
  - **Patient Info**: Name, ordering physician
  - **Lab Results Table**: 8-row table (hemoglobin, WBC, platelets, cholesterol, triglycerides, HDL, LDL, glucose)
    - Values color-coded: High (red) / Low (orange) / Normal (green)
    - Status badge per row
  - **Digital Signature Block**: Stylized doctor name in Georgia serif font, horizontal rule, "Digital Signature Verified ✅", license number
- Download button (shows toast "Downloading...")

---

### 6.9 Emergency Management (`/emergency`)

**Purpose:** Real-time monitoring panel for critical hospital emergencies.

#### Emergency Banner
- Full-width high-contrast banner with red gradient
- Animated pulsing glow (Framer Motion `boxShadow` animation)
- Pulsing red icon with `pulse-red` CSS animation
- **Live Clock**: Real-time display using `setInterval` (updates every second)
  - Shows current time in large 32px Outfit font with red text glow

#### Quick Stats (4 cards)
- Active Alerts count
- Ambulances Available
- ICU Occupied ratio (28/40)
- ER Beds Free ratio (6/20)

#### Live Emergency Alerts
5 alert cards with:
- Alert type (bold title) + severity badge
- Patient name, room number, assigned doctor
- Timestamp with Clock icon
- Status badge (Active/Stable/Monitoring)
- Color-coded background by severity (red/orange/cyan)
- Action buttons (only for "Active" alerts):
  - "✅ Mark Resolved" — changes status, shows toast
  - "📟 Page Doctor" — shows info toast
- Framer Motion `layout` prop for smooth reorder animations on status change

#### Ambulance Dispatch Panel
5 ambulance units showing:
- Unit ID (AMB-01 through AMB-05)
- Status badge: Dispatched (yellow) / Available (green) / On Scene (cyan) / In Maintenance (gray)
- Destination with Navigation icon
- Driver name, ETA
- "Dispatch Now" button (only for Available units → changes status to Dispatched)

#### Department Bed Availability
6 department cards with:
- Department name, head doctor
- Occupied/Total ratio + percentage
- Animated progress bar (Framer Motion width animation from 0% on mount)
- Color changes: Green (<60%) → Orange (60-80%) → Red (>80%)
- "N beds available" text below bar

---

### 6.10 Settings & Configuration (`/settings`)

**Purpose:** Comprehensive system and user configuration panel.

#### Navigation: 6 Sidebar Tabs
Left panel with icon + label tabs. Active tab highlighted with cyan left border + gradient background.

---

**Tab 1: My Profile**
- 80px gradient avatar display with cyan glow border
- "Change Photo" button (shows toast in demo)
- Edit form: Full Name, Email, Phone, Role (disabled field)
- Biography textarea
- Role field is read-only (shows current user role)

---

**Tab 2: Security**
- **Change Password Form**: Current, New, Confirm New password fields
- "Update Password" button (shows success toast)
- **Two-Factor Authentication (2FA)**:
  - Animated toggle switch (Framer Motion `animate={{ left }}` for thumb position)
  - State persists in component (not localStorage in demo)
  - Toast on enable/disable

---

**Tab 3: Notifications**
- 6 toggle switches with animated thumb:
  - Email Notifications
  - SMS Notifications
  - Push Notifications
  - Emergency Alerts
  - Appointment Reminders
  - Report Ready Alerts
- Each toggle is an independent boolean in `notifs` state object
- Smooth Framer Motion animation on each toggle

---

**Tab 4: Hospital Info**
- Edit all hospital-level details:
  - Hospital Name, Address, Phone, Email, Website, Total Beds, Established Year

---

**Tab 5: Departments**
- Lists all 6 departments from mock data
- Each row shows: color dot, name, head doctor, bed count
- "Edit" button per row (shows modal in demo)
- "Add Department" button (shows toast)

---

**Tab 6: Appearance**
- **Theme Mode Cards**: Dark (🌙) and Light (☀️) selector
  - Clicking activates theme and toggles CSS variable set
  - Active card highlighted with cyan border
- **Language Selector**: 6 language cards with flag emojis
  - English 🇺🇸 | Español 🇪🇸 | Français 🇫🇷 | Deutsch 🇩🇪 | العربية 🇸🇦 | 中文 🇨🇳
  - Selecting shows toast with language name

**Footer Actions (all tabs):**
- "Discard" + "Save Changes" buttons
- Save shows success toast

---

## 7. UI/UX Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0D1B2A` | Page background (dark) |
| `--bg-secondary` | `#1a2a3d` | Sidebar, navbar, cards |
| `--bg-card` | `rgba(26,42,61,0.7)` | Glassmorphism cards |
| `--bg-glass` | `rgba(13,27,42,0.6)` | Input backgrounds |
| `--accent-cyan` | `#00B4D8` | Primary action color |
| `--accent-cyan-dark` | `#0096B7` | Hover state |
| `--accent-purple` | `#7209B7` | Secondary accent |
| `--accent-purple-light` | `#9B5DE5` | Text, badges |
| `--accent-green` | `#10b981` | Success states |
| `--accent-orange` | `#f59e0b` | Warning states |
| `--accent-red` | `#ef4444` | Error, emergency |
| `--text-primary` | `#e2e8f0` | Main text |
| `--text-secondary` | `#94a3b8` | Subtext |
| `--text-muted` | `#64748b` | Labels, hints |

### Light Mode Overrides
Applied via `[data-theme="light"]` CSS selector:
- `--bg-primary: #f0f4f8`
- `--bg-secondary: #ffffff`
- `--text-primary: #1e293b`

### Typography
| Role | Font | Weight | Size |
|------|------|--------|------|
| Headings/Numbers | Outfit | 800-900 | 18-32px |
| Body | Inter | 400-600 | 13-16px |
| Labels/Captions | Inter | 500-600 | 11-13px |

### Glassmorphism
```css
.glass {
  background: rgba(26, 42, 61, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 180, 216, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

### Animations
| Type | Implementation | Duration |
|------|----------------|---------|
| Page entrance | Framer Motion `fadeInUp` (y: 12→0, opacity: 0→1) | 300ms |
| Modal open | Framer Motion `scale(0.9→1)` + opacity | 150ms |
| Card hover | `translateY(-2 to -4px)` | 200ms CSS |
| Sidebar collapse | CSS `width` transition | 300ms |
| Health meter | SVG `strokeDashoffset` spring | 1500ms |
| Emergency pulse | CSS keyframe `box-shadow` | 1500ms infinite |
| Toggle switch | Framer Motion `left` position | 300ms |
| Progress bars | Framer Motion `width` from 0% | 1000ms on mount |

### Responsive Breakpoints
| Breakpoint | Columns | Notes |
|------------|---------|-------|
| >1200px | 6 / 4 / 3 cols | Full desktop layout |
| 901–1200px | 3 / 2 cols | Compact desktop |
| 601–900px | 2 cols | Tablet |
| <600px | 1 col | Mobile, sidebar becomes drawer |
| <768px | Sidebar hides | Mobile overlay drawer mode |

### Custom Scrollbar
```css
::-webkit-scrollbar { width: 6px }
::-webkit-scrollbar-thumb { background: #00B4D8; border-radius: 10px }
```

---

## 8. State Management

### AuthContext (React Context API)
```javascript
{
  user: { id, name, email, role, avatar, token } | null,
  login(email, password) → { success, user | error },
  register(data) → { success, user },
  logout() → void,
  loading: boolean
}
```
Consumed via `useAuth()` hook anywhere in the tree.

### Zustand Store (`useStore`)
```javascript
{
  // Theme
  theme: 'dark' | 'light',
  toggleTheme() → void,           // persisted to localStorage

  // Sidebar
  sidebarCollapsed: boolean,
  toggleSidebar() → void,
  mobileMenuOpen: boolean,
  setMobileMenuOpen(bool) → void,

  // Search
  searchQuery: string,
  setSearchQuery(string) → void,

  // Modal states
  modals: { addPatient, addDoctor, bookAppointment, viewReport },
  openModal(name) → void,
  closeModal(name) → void,

  // Entity selections
  selectedPatient: Patient | null,
  selectedDoctor: Doctor | null,
}
```

### localStorage Keys
| Key | Value | Purpose |
|-----|-------|---------|
| `hms_user` | JSON user object | Persist login session |
| `hms_token` | base64 token string | Auth token |
| `hms_theme` | `'dark'` or `'light'` | Theme persistence |

---

## 9. Routing & Navigation

### Route Table
| Path | Component | Protection | Description |
|------|-----------|------------|-------------|
| `/` | — | — | Redirects to `/dashboard` |
| `/login` | `Login` | PublicRoute | Login page |
| `/register` | `Register` | PublicRoute | Registration page |
| `/dashboard` | `Dashboard` | PrivateRoute | Main overview |
| `/analytics` | `Analytics` | PrivateRoute | Charts dashboard |
| `/patients` | `Patients` | PrivateRoute | Patient registry |
| `/doctors` | `Doctors` | PrivateRoute | Doctor directory |
| `/appointments` | `Appointments` | PrivateRoute | Scheduling |
| `/ai-analysis` | `AIAnalysis` | PrivateRoute | AI module |
| `/reports` | `MedicalReports` | PrivateRoute | Report manager |
| `/emergency` | `Emergency` | PrivateRoute | Emergency panel |
| `/settings` | `Settings` | PrivateRoute | Configuration |
| `*` | — | — | Fallback → `/dashboard` |

### Sidebar Navigation Groups
```
Overview:
  ├── Dashboard (/dashboard)
  └── Analytics (/analytics)

Management:
  ├── Patients (/patients)
  ├── Doctors (/doctors)
  └── Appointments (/appointments)

Tools:
  ├── AI Analysis (/ai-analysis)
  ├── Medical Reports (/reports)
  └── Emergency (/emergency)  ← pulsing red dot indicator

System:
  └── Settings (/settings)
```

---

## 10. Mock Data & Dummy Logic

### `mockData.js` Exports

| Export | Records | Description |
|--------|---------|-------------|
| `DOCTORS` | 6 | Doctors with name, specialization, rating, shift, color |
| `PATIENTS` | 8 | Patients with vitals, health score, doctor assignment |
| `APPOINTMENTS` | 10 | Appointments across 6 days |
| `REPORTS` | 7 | Lab reports with type, status, file info |
| `EMERGENCY_ALERTS` | 5 | Emergency cases with severity |
| `AMBULANCES` | 5 | Ambulance units with status and ETA |
| `NOTIFICATIONS` | 5 | Navbar notification items |
| `CHART_DATA` | 6 datasets | All data for analytics charts |
| `AI_INSIGHTS` | 5 | AI prediction insight cards |
| `DISEASE_PREDICTIONS` | 3 | Disease risk cards with indicators |
| `DEPARTMENTS` | 6 | Hospital departments with bed counts |

### Simulated Operations
| Action | Behavior |
|--------|----------|
| Login | 1 second delay → token created → user stored in localStorage |
| Register | 1.2 second delay → new user object → stored in localStorage |
| Add Patient | Instant → prepended to local state array |
| Delete Patient | Instant → filtered from local state array |
| Add Doctor | Instant → prepended to local state array |
| Book Appointment | Instant → prepended to local state array |
| Change Appointment Status | Instant → mapped over local state array |
| Delete Report | Instant → filtered from local state array |
| Resolve Alert | Instant → status updated in local state |
| Dispatch Ambulance | Instant → status changed to "Dispatched" |
| Settings Save | Toast confirmation only |
| Download Report | Toast "Downloading..." only |

---

## 11. Non-Functional Requirements

### Performance
- ✅ Vite dev server starts in < 500ms
- ✅ Page navigation is instant (SPA client-side routing)
- ✅ Charts render using canvas (GPU-accelerated)
- ✅ Framer Motion animations run at 60fps on modern hardware
- ✅ Google Fonts loaded asynchronously via CSS `@import`

### Security (Frontend)
- ✅ Routes protected via PrivateRoute component
- ✅ Token stored in localStorage (simulated — not production secure)
- ✅ No real passwords stored or transmitted

### Usability
- ✅ Keyboard-accessible form inputs
- ✅ Clear loading states (spinners, disabled buttons)
- ✅ Toast notifications for all user actions
- ✅ Form validation with inline error messages
- ✅ Consistent visual feedback (hover, active, focus states)

### Accessibility (Partial)
- ✅ Semantic HTML elements (button, input, label, table, nav, header, aside, main)
- ✅ Labels associated with form inputs
- ✅ Icon buttons have `title` attributes
- ✅ Sufficient color contrast (WCAG AA for primary text)

### Browser Compatibility
- ✅ Chrome 110+ (primary target)
- ✅ Firefox 110+
- ✅ Edge 110+
- ⚠️ Safari (backdrop-filter supported since Safari 15.4)

### Responsive Design
- ✅ Mobile: sidebar converts to overlay drawer
- ✅ Tablets: 2-column grids
- ✅ Desktop: 3–6 column grids
- ✅ All modals: padded with max-height scroll

---

## 12. Limitations & Future Scope

### Current Limitations (Frontend Demo)
- ❌ No real backend — all data is in-memory and resets on page refresh
- ❌ No real database — patients added during session are lost on refresh
- ❌ No real file uploads — photo upload shows toast only
- ❌ No real-time WebSocket updates for emergency alerts
- ❌ No print/export functionality for reports (shows toast)
- ❌ Social login (Google/Microsoft) not connected to OAuth

### Future Scope (Production Version)
| Feature | Technology |
|---------|-----------|
| REST API Backend | Node.js + Express or Django REST |
| Real Database | PostgreSQL or MongoDB |
| Real Authentication | JWT + Refresh Tokens or Firebase Auth |
| Real-time Alerts | WebSockets (Socket.io) |
| PDF Generation | React-PDF or jsPDF |
| File Uploads | AWS S3 or Firebase Storage |
| Role-Based Access | Middleware + Protected endpoints |
| Email Notifications | NodeMailer or SendGrid |
| Data Persistence | Full CRUD API integration |
| AI Integration | Python ML models via REST API |
| Mobile App | React Native or Flutter |
| Deployment | Vercel / Netlify (frontend) + Railway / Render (backend) |

---

## 13. Installation & Running

### Prerequisites
- Node.js v18+ (LTS recommended)
- npm v9+
- A modern browser (Chrome recommended)

### Setup Instructions

```bash
# 1. Clone or download the project
cd "hospital management sytem"

# 2. Install all dependencies (already done)
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173/  (or next available port)
```

### Available Scripts
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Build production bundle (dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code quality checks
```

### Default Login
Open the app → You'll be redirected to `/login`
- **Email:** `admin@gmail.com`
- **Password:** `123456`
- Click **Sign In** → Redirected to `/dashboard`

### All Installed Dependencies
```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.x",
    "chart.js": "^4.x",
    "react-chartjs-2": "^5.x",
    "lucide-react": "^0.x",
    "framer-motion": "^12.x",
    "react-hot-toast": "^2.x",
    "zustand": "^5.x",
    "clsx": "^2.x",
    "tailwind-merge": "^3.x"
  },
  "devDependencies": {
    "vite": "^8.x",
    "@vitejs/plugin-react": "^6.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/vite": "^4.x",
    "eslint": "^9.x"
  }
}
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Pages/Modules | 12 (including Login + Register) |
| Total Components | 30+ (pages + layout + inline) |
| Total Lines of Code | ~3,500+ |
| Chart Types Used | 6 (Line, Bar, Doughnut, Area, Radar, Revenue Bar) |
| Mock Data Records | 60+ (patients, doctors, appointments, etc.) |
| CSS Custom Properties | 25+ design tokens |
| Framer Motion Animations | 40+ instances |
| Unique Routes | 12 |
| Toast Notification Types | 4 (success, error, info, warning) |

---

*This SRS document was created for the MediCore Hospital Management System — a semester frontend project demonstrating modern React.js development practices, advanced UI/UX design, and comprehensive healthcare application simulation.*

**Document Version:** 2.0 | **Last Updated:** May 25, 2026

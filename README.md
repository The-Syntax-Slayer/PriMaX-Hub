# ⚡ PriMaX Hub — The AI-Powered Personal Growth OS

[![Vite](https://img.shields.io/badge/Vite-7.3+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Persistence-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI_Engine-8E75FF?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**PriMaX Hub** is a premium, all-in-one personal performance platform designed to unify your Career, Finance, Productivity, and Wellness into a single, AI-driven ecosystem. Built for high-performers, it leverages cutting-edge AI to provide actionable insights, automated planning, and a seamless cross-device experience.

---

## 🚀 Key Modules & Features

### 🏢 Career Strategy & Growth
- **AI Roadmap Generator**: Customized career development paths from current role to target role using Google Gemini.
- **Mock Interviews**: Domain-specific question sets generated in real-time to prepare for technical and behavioral assessments.
- **Resume Hub**: Manage your professional identity with exportable profiles and tailored career advice.

### 💰 Intelligent Finance Management
- **Interactive Dashboards**: Real-time tracking of income, expenses, and net balance with support for multi-currency (₹/$/€).
- **AI Financial Advisor**: Personalized fiscal advice based on actual spending patterns and savings goals.
- **Goal-Oriented Budgeting**: Set monthly limits and visualize progress toward multiple financial milestones.

### ⚡ Peak Productivity & Task Management
- **AI-Enhanced Kanban**: Intelligent task management with priority levels and automated context-aware scheduling tips.
- **Deep Focus Suite**: Integrated Pomodoro timer and activity tracking to maintain peak flow states.
- **Real-time Persistence**: Global state synchronization via Supabase for zero-latency data updates.

### 🧠 Mindset & Holistic Wellness
- **AI Mindset Coaching**: Journaling tools with AI-driven reflection feedback and mood tracking.
- **Fitness Engine**: Custom workout guidance, streak tracking, and holistic wellness monitoring.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router Dom 7 |
| **Styling** | Vanilla CSS (Variables), Framer Motion (Animations) |
| **Backend** | Supabase (PostgreSQL, Real-time, Auth) |
| **Intelligence** | Google Gemini AI (Generative AI SDK) |
| **Performance** | tsparticles, Lucide Icons |

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/The-Syntax-Slayer/PriMaX-Hub.git
   cd PriMaX-Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Launch Dev Server**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
src/
├── components/   # Reusable UI components (Modals, Cards, Nav)
├── contexts/     # Auth, Theme, and Global State providers
├── lib/          # AI Services, Supabase Client, API Hooks
├── pages/        # Core Module Containers (Finance, Career, Analytics)
└── App.css       # Global design system & responsiveness overrides
```

---

## 🚢 Deployment (Vercel)

This project is optimized for deployment on **Vercel**. 

1. Push your code to the GitHub repository.
2. Connect the repository to your Vercel Dashboard.
3. Add the `.env` variables in the Vercel Settings -> Environment Variables section.
4. Deploy!

---

## 📄 License
This project is private and intended for personal use and academic study.

Built with ❤️ for human potential.

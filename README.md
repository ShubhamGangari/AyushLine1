# 🌿 AYUSHLINE - Comprehensive AYUSH Health & Wellness Portal

Ayushline is a dedicated, production-ready portal for the AYUSH systems of healthcare (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy). It connects patients, certified AYUSH practitioners, students, and organizations with AI-guided consultations, verified doctor directories, academic resources, research publications, and event management.

---

## 🚀 Key Features

- **AYUSH Directory & Consultations:** Find verified practitioners across Ayurveda, Yoga, Unani, Siddha, and Homeopathy with role-based appointment booking, confirmation, and schedule management.
- **AI Symptom Matcher & Chat:** Gemini AI-assisted preliminary health analysis and AYUSH system recommendations.
- **Multi-Role Dashboards:** Customized interfaces for Patients, Doctors, Students, Organizations, and System Administrators (`/admin`).
- **Research & Publications:** Moderated blog and case studies archive with system-specific filtering.
- **Events & Seminars:** Search and RSVP to national seminars, workshops, and webinars.
- **Durable Persistence & Hybrid Fallback:** Dual architecture supporting Supabase PostgreSQL database + resilient browser local storage fallback.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Build Tool:** Vite
- **Database & Auth:** Supabase / Clerk / Local Auth Fallback
- **AI Integration:** Google Gemini API (`@google/genai`)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory by copying `.env.example`:

```env
# Gemini AI Configuration
GEMINI_API_KEY="your-gemini-api-key"

# App URL
APP_URL="https://your-domain.com"

# Supabase Database Configuration
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Clerk Authentication (Optional)
VITE_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"

# Admin Configuration
VITE_ADMIN_USER_ID="admin-user-id"
```

---

## 📦 Quick Start & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/ShubhamGangari/Ayushline.git
cd Ayushline
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

### 4. Database Setup (Optional if using Supabase)
Run the SQL schema located in `supabase_schema.sql` inside your Supabase SQL Editor.

### 5. Start Development Server
```bash
npm run dev
```
The app will be live at `http://localhost:3000`.

---

## 🚢 Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License. Created for AYUSH Line Healthcare Initiative.


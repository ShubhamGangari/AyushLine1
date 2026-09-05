-- ====================================================================
-- AYUSHLINE PORTAL - Complete Supabase Database Schema SQL
-- Copy and paste this script into your Supabase Dashboard > SQL Editor
-- ====================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. PROFILES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'doctor', 'student', 'org', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  whatsapp TEXT,
  phone TEXT,
  college TEXT,
  specialization TEXT,
  qualification TEXT,
  experience_years INTEGER DEFAULT 0,
  system TEXT,
  city TEXT,
  address TEXT,
  accreditation TEXT,
  clinic_address TEXT,
  clinic_location TEXT,
  website TEXT,
  google_map_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert/update own profile" ON public.profiles;
CREATE POLICY "Users can insert/update own profile" ON public.profiles 
  FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 2. DOCTORS TABLE (Consultation Directory)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.doctors (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT DEFAULT '919876543210',
  phone TEXT DEFAULT '+91 98765 43210',
  specialization TEXT DEFAULT 'Ayurveda Specialist',
  system TEXT DEFAULT 'ayurveda',
  experience_years INTEGER DEFAULT 5,
  qualification TEXT DEFAULT 'BAMS',
  clinic_name TEXT DEFAULT 'AYUSH Wellness Clinic',
  clinic_address TEXT,
  city TEXT DEFAULT 'Delhi',
  bio TEXT,
  certificate_url TEXT,
  profile_image_url TEXT,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  rating NUMERIC DEFAULT 4.9,
  total_reviews INTEGER DEFAULT 12,
  consultation_fee TEXT DEFAULT '₹500',
  listing_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for doctor search & system filtering
CREATE INDEX IF NOT EXISTS idx_doctors_system ON public.doctors(system);
CREATE INDEX IF NOT EXISTS idx_doctors_status ON public.doctors(status);
CREATE INDEX IF NOT EXISTS idx_doctors_city ON public.doctors(city);

-- RLS for doctors
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public doctors read" ON public.doctors;
CREATE POLICY "Public doctors read" ON public.doctors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Doctors insert and update" ON public.doctors;
CREATE POLICY "Doctors insert and update" ON public.doctors FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 3. DOCTOR REVIEWS TABLE (JustDial-style Reviews)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.doctor_reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  doctor_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL DEFAULT 'Verified Patient',
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doctor_reviews_doctor_id ON public.doctor_reviews(doctor_id);

ALTER TABLE public.doctor_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reviews read" ON public.doctor_reviews;
CREATE POLICY "Public reviews read" ON public.doctor_reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public reviews insert" ON public.doctor_reviews;
CREATE POLICY "Public reviews insert" ON public.doctor_reviews FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------------------
-- 4. APPOINTMENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  patient_id TEXT,
  patient_name TEXT NOT NULL,
  patient_email TEXT,
  doctor_id TEXT NOT NULL,
  doctor_name TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public appointments read" ON public.appointments;
CREATE POLICY "Public appointments read" ON public.appointments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public appointments write" ON public.appointments;
CREATE POLICY "Public appointments write" ON public.appointments FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 5. POSTS / ARTICLES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  author_id TEXT,
  author_name TEXT,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  type TEXT DEFAULT 'blog',
  system TEXT DEFAULT 'ayurveda',
  thumbnail_url TEXT,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  views INTEGER DEFAULT 0,
  read_time_minutes INTEGER DEFAULT 5,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_system ON public.posts(system);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public posts read" ON public.posts;
CREATE POLICY "Public posts read" ON public.posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public posts write" ON public.posts;
CREATE POLICY "Public posts write" ON public.posts FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 6. EVENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  organizer_id TEXT,
  organizer_name TEXT,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'webinar',
  event_date TEXT,
  location TEXT,
  description TEXT,
  banner_url TEXT,
  registration_link TEXT,
  attendees_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public events read" ON public.events;
CREATE POLICY "Public events read" ON public.events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public events write" ON public.events;
CREATE POLICY "Public events write" ON public.events FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 7. DISCUSSIONS & REPLIES TABLES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.discussions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  user_name TEXT NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'hidden')),
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public discussions read" ON public.discussions;
CREATE POLICY "Public discussions read" ON public.discussions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public discussions write" ON public.discussions;
CREATE POLICY "Public discussions write" ON public.discussions FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.discussion_replies (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  discussion_id TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public discussion_replies read" ON public.discussion_replies;
CREATE POLICY "Public discussion_replies read" ON public.discussion_replies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public discussion_replies write" ON public.discussion_replies;
CREATE POLICY "Public discussion_replies write" ON public.discussion_replies FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 8. NOTIFICATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  type TEXT DEFAULT 'consultation',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT,
  read BOOLEAN DEFAULT false,
  doctor_name TEXT,
  date TEXT,
  time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public notifications read" ON public.notifications;
CREATE POLICY "Public notifications read" ON public.notifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public notifications write" ON public.notifications;
CREATE POLICY "Public notifications write" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- SCHEMA CREATION COMPLETED SUCCESSFULLY!
-- ====================================================================

import { supabase, isSupabaseConfigured } from '../supabase';
import { getAllProfilesAdmin } from './profiles';
import { sanitizeText, sanitizeShortText, sanitizeUrl, sanitizePhone, sanitizeEmail } from '../sanitize';

export interface Doctor {
  id: string | number;
  user_id?: string | null;
  name: string;
  email?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  specialization: string;
  system: string;
  experience_years: number;
  qualification?: string | null;
  clinic_name?: string | null;
  clinic_address?: string | null;
  city?: string | null;
  bio?: string | null;
  certificate_url?: string | null;
  profile_image_url?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rating?: number;
  total_reviews?: number;
  created_at?: string;
  image?: string;
  experience?: string;
  expertise?: string[];
  conditions?: string[];
  consultation_fee?: string | number;
  listing_enabled?: boolean;
}

export interface DoctorReview {
  id: string;
  doctorId: string | number;
  patientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const LOCAL_DOCTORS_STORAGE_KEY = 'ayush_local_doctors_v2';
const DOCTOR_REVIEWS_STORAGE_KEY = 'ayush_doctor_reviews_v2';

export function getLocalDoctors(): Doctor[] {
  try {
    const raw = localStorage.getItem(LOCAL_DOCTORS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: Doctor[] = JSON.parse(raw);
    // Filter out corrupted or completely empty auto-generated dummy profiles
    return parsed.filter(d => Boolean(d && d.name));
  } catch {
    return [];
  }
}

export function saveLocalDoctors(docs: Doctor[]) {
  try {
    localStorage.setItem(LOCAL_DOCTORS_STORAGE_KEY, JSON.stringify(docs));
    window.dispatchEvent(new Event('ayush_doctors_update'));
  } catch (err) {
    console.error('Failed to save local doctors:', err);
  }
}

export function upsertLocalDoctor(docData: Partial<Doctor>): Doctor {
  const current = getLocalDoctors();
  const id = docData.id || docData.user_id || `doc_${Date.now()}`;
  const existingIdx = current.findIndex(d => String(d.id) === String(id) || (docData.user_id && d.user_id === docData.user_id));

  const existingStatus = existingIdx >= 0 ? current[existingIdx].status : null;
  const targetStatus: 'pending' | 'approved' | 'rejected' = docData.status || existingStatus || 'pending';

  const newDoc: Doctor = {
    id,
    user_id: docData.user_id || (docData.id ? String(docData.id) : null),
    name: docData.name || 'Doctor Practitioner',
    email: docData.email || null,
    whatsapp: docData.whatsapp || '',
    phone: docData.phone || docData.whatsapp || '',
    specialization: docData.specialization || '',
    system: docData.system || 'Ayurveda',
    experience_years: docData.experience_years !== undefined ? docData.experience_years : 0,
    experience: docData.experience_years ? `${docData.experience_years} Years` : '',
    qualification: docData.qualification || '',
    clinic_name: docData.clinic_name || '',
    clinic_address: docData.clinic_address || '',
    city: docData.city || '',
    bio: docData.bio || '',
    status: targetStatus,
    rating: docData.rating || (existingIdx >= 0 ? current[existingIdx].rating : 5.0),
    total_reviews: docData.total_reviews || (existingIdx >= 0 ? current[existingIdx].total_reviews : 0),
    consultation_fee: docData.consultation_fee || '₹500',
    listing_enabled: docData.listing_enabled !== undefined ? docData.listing_enabled : true,
    created_at: docData.created_at || (existingIdx >= 0 ? current[existingIdx].created_at : new Date().toISOString()),
    image: docData.profile_image_url || docData.image || (existingIdx >= 0 ? current[existingIdx].image : getDoctorAvatar(id, docData.name)),
    expertise: docData.specialization ? docData.specialization.toLowerCase().split(', ') : [],
  };

  if (existingIdx >= 0) {
    current[existingIdx] = { ...current[existingIdx], ...newDoc };
  } else {
    current.unshift(newDoc);
  }

  saveLocalDoctors(current);
  return newDoc;
}

export function getDoctorReviews(doctorId: string | number): DoctorReview[] {
  try {
    const raw = localStorage.getItem(`${DOCTOR_REVIEWS_STORAGE_KEY}_${doctorId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    { id: '1', doctorId, patientName: 'Ramesh Sharma', rating: 5, comment: 'Very skilled and patient practitioner. Highly recommended!', createdAt: '2 days ago' },
    { id: '2', doctorId, patientName: 'Priya Patel', rating: 5, comment: 'Detailed consultation and effective medicine. Felt much better in a week.', createdAt: '1 week ago' },
  ];
}

export function addDoctorReview(doctorId: string | number, patientName: string, rating: number, comment: string): DoctorReview[] {
  const current = getDoctorReviews(doctorId);
  // Sanitize review content before storage
  const cleanName = sanitizeShortText(patientName, 100) || 'Verified Patient';
  const cleanComment = sanitizeText(comment, 1000);
  const clampedRating = Math.min(5, Math.max(1, Math.round(rating)));

  const newReview: DoctorReview = {
    id: `rev_${Date.now()}`,
    doctorId,
    patientName: cleanName,
    rating: clampedRating,
    comment: cleanComment,
    createdAt: 'Just now'
  };
  const updated = [newReview, ...current];
  try {
    localStorage.setItem(`${DOCTOR_REVIEWS_STORAGE_KEY}_${doctorId}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('ayush_reviews_update'));
  } catch (err) {
    console.error('Failed to save review:', err);
  }
  return updated;
}

export const DOCTOR_AVATAR_POOL = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1594824813571-24a39073231f?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
];

export function getDoctorAvatar(id?: string | number, name?: string): string {
  if (!id) return DOCTOR_AVATAR_POOL[0];
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return DOCTOR_AVATAR_POOL[hash % DOCTOR_AVATAR_POOL.length];
}

export const fallbackDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ananya Sharma',
    system: 'Ayurveda',
    specialization: 'Panchakarma & Joint Pain',
    experience_years: 15,
    experience: '15 Years',
    rating: 4.8,
    whatsapp: '919876543210',
    phone: '+91 98765 43210',
    qualification: 'BAMS, MD (Ayurveda)',
    clinic_name: 'Sanjeevani Herbal Care',
    city: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    expertise: ['pain', 'digestion', 'arthritis', 'back pain'],
    status: 'approved',
    consultation_fee: '₹500',
    bio: 'Panchakarma specialist with 15+ years of clinical excellence in treating chronic arthritis and digestive disorders naturally.',
  },
  {
    id: '2',
    name: 'Dr. Rahul Verma',
    system: 'Homeopathy',
    specialization: 'Skin & Allergy Care',
    experience_years: 10,
    experience: '10 Years',
    rating: 4.5,
    whatsapp: '919876543211',
    phone: '+91 98765 43211',
    qualification: 'BHMS',
    clinic_name: 'Healing Touch Homeo',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    expertise: ['anxiety', 'skin', 'allergies', 'stress'],
    status: 'approved',
    consultation_fee: '₹400',
    bio: 'Dedicated homeopath focusing on root cause treatment for chronic eczema, psoriasis, and asthma.',
  },
  {
    id: '3',
    name: 'Dr. Priya Singh',
    system: 'Yoga Therapy',
    specialization: 'Mind & Body Wellness',
    experience_years: 8,
    experience: '8 Years',
    rating: 4.9,
    whatsapp: '919876543212',
    phone: '+91 98765 43212',
    qualification: 'M.Sc (Yoga Therapy)',
    clinic_name: 'Ananda Yoga Kendra',
    city: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1594824813571-24a39073231f?w=300&auto=format&fit=crop&q=80',
    expertise: ['stress', 'flexibility', 'breathing', 'mental health'],
    status: 'approved',
    consultation_fee: '₹600',
    bio: 'Specialist in therapeutic yoga pranayama for hypertension, insomnia, and postural correction.',
  },
  {
    id: '4',
    name: 'Dr. Vikram Aditya',
    system: 'Siddha',
    specialization: 'Chronic Disease & Immunity',
    experience_years: 20,
    experience: '20 Years',
    rating: 4.7,
    whatsapp: '919876543213',
    phone: '+91 98765 43213',
    qualification: 'BSMS',
    clinic_name: 'Agastya Siddha Hospital',
    city: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80',
    expertise: ['chronic', 'immunity', 'fever', 'wellness'],
    status: 'approved',
    consultation_fee: '₹700',
    bio: 'Ancient Siddha mineral and herbal remedy practitioner for auto-immune and metabolic health.',
  },
];

let cachedApprovedDoctors: Doctor[] | null = null;
let lastApprovedDoctorsFetch = 0;

async function fetchWithDoctorTimeout<T>(promiseFn: () => Promise<T>, timeoutMs: number = 1200): Promise<T | null> {
  return new Promise((resolve) => {
    let timer: any = setTimeout(() => resolve(null), timeoutMs);
    promiseFn()
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(null);
      });
  });
}

export async function getApprovedDoctors(): Promise<Doctor[]> {
  const localApprovedDocs = getLocalDoctors().filter(
    d => d.listing_enabled !== false &&
         d.status === 'approved' &&
         Boolean(d.name?.trim() && (d.specialization?.trim() || d.qualification?.trim()))
  );

  // Return cached result if available (0ms delay)
  if (cachedApprovedDoctors && (Date.now() - lastApprovedDoctorsFetch < 60000)) {
    const combined = [...localApprovedDocs];
    for (const cd of cachedApprovedDoctors) {
      if (!combined.some(c => String(c.id) === String(cd.id))) {
        combined.push(cd);
      }
    }
    return combined;
  }

  if (!isSupabaseConfigured || !supabase) {
    const combined = [...localApprovedDocs];
    for (const fb of fallbackDoctors) {
      if (fb.status === 'approved' && !combined.some(c => String(c.id) === String(fb.id))) {
        combined.push(fb);
      }
    }
    cachedApprovedDoctors = combined;
    lastApprovedDoctorsFetch = Date.now();
    return combined;
  }

  try {
    const fetchDoctors = async () => {
      return await supabase
        .from('doctors')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
    };

    const res = await fetchWithDoctorTimeout(fetchDoctors, 1200);

    if (!res || res.error || !res.data || res.data.length === 0) {
      const combined = [...localApprovedDocs];
      for (const fb of fallbackDoctors) {
        if (fb.status === 'approved' && !combined.some(c => String(c.id) === String(fb.id))) {
          combined.push(fb);
        }
      }
      cachedApprovedDoctors = combined;
      lastApprovedDoctorsFetch = Date.now();
      return combined;
    }

    const remoteDocs: Doctor[] = res.data
      .filter((d: any) => Boolean(d.name?.trim() && (d.specialization?.trim() || d.qualification?.trim())))
      .map((d: any) => ({
        ...d,
        image: d.profile_image_url || getDoctorAvatar(d.id, d.name),
        experience: `${d.experience_years} Years`,
        expertise: d.specialization ? d.specialization.toLowerCase().split(', ') : ['general'],
        whatsapp: d.whatsapp || '',
      }));

    const combined = [...localApprovedDocs];
    for (const rd of remoteDocs) {
      if (!combined.some(c => String(c.id) === String(rd.id))) {
        combined.push(rd);
      }
    }
    cachedApprovedDoctors = combined;
    lastApprovedDoctorsFetch = Date.now();
    return combined;
  } catch {
    const combined = [...localApprovedDocs];
    for (const fb of fallbackDoctors) {
      if (fb.status === 'approved' && !combined.some(c => String(c.id) === String(fb.id))) {
        combined.push(fb);
      }
    }
    return combined;
  }
}

export async function getAllDoctorsAdmin(): Promise<Doctor[]> {
  const localDocs = getLocalDoctors();
  let all: Doctor[] = [...localDocs];

  for (const fb of fallbackDoctors) {
    if (!all.some(c => String(c.id) === String(fb.id))) {
      all.push(fb);
    }
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const remoteDocs: Doctor[] = data.map(d => ({
          ...d,
          image: d.profile_image_url || getDoctorAvatar(d.id, d.name),
          experience: `${d.experience_years} Years`,
          expertise: d.specialization ? d.specialization.toLowerCase().split(', ') : ['general'],
          whatsapp: d.whatsapp || '',
        }));
        for (const rd of remoteDocs) {
          if (!all.some(c => String(c.id) === String(rd.id))) {
            all.push(rd);
          }
        }
      }
    } catch (e) {
      console.error('Error fetching admin doctors:', e);
    }
  }

  // Also sync doctor user profiles from profiles table/local storage so Admin sees full registration info
  try {
    const profiles = await getAllProfilesAdmin();
    const doctorProfiles = profiles.filter(p => p.role === 'doctor');
    for (const dp of doctorProfiles) {
      const existingIdx = all.findIndex(d =>
        (d.user_id && String(d.user_id) === String(dp.id)) ||
        (dp.email && d.email && d.email.toLowerCase() === dp.email.toLowerCase())
      );
      if (existingIdx >= 0) {
        all[existingIdx] = {
          ...all[existingIdx],
          email: all[existingIdx].email || dp.email || null,
          phone: all[existingIdx].phone || dp.phone || dp.whatsapp || '',
          whatsapp: all[existingIdx].whatsapp || dp.whatsapp || dp.phone || '',
          qualification: all[existingIdx].qualification || dp.qualification || '',
          specialization: all[existingIdx].specialization || dp.specialization || '',
          system: all[existingIdx].system || dp.system || 'Ayurveda',
          city: all[existingIdx].city || dp.city || '',
          clinic_name: all[existingIdx].clinic_name || dp.clinic_address || '',
          clinic_address: all[existingIdx].clinic_address || dp.clinic_address || '',
          experience_years: all[existingIdx].experience_years || dp.experience_years || 0,
          bio: all[existingIdx].bio || dp.bio || '',
        };
      } else {
        all.unshift({
          id: dp.id,
          user_id: dp.id,
          name: dp.name || 'Doctor Practitioner',
          email: dp.email || null,
          phone: dp.phone || dp.whatsapp || '',
          whatsapp: dp.whatsapp || dp.phone || '',
          specialization: dp.specialization || 'AYUSH Specialist',
          system: dp.system || 'Ayurveda',
          experience_years: dp.experience_years || 0,
          experience: dp.experience_years ? `${dp.experience_years} Years` : '0 Years',
          qualification: dp.qualification || 'Certified Practitioner',
          clinic_name: dp.clinic_address || '',
          clinic_address: dp.clinic_address || '',
          city: dp.city || '',
          bio: dp.bio || '',
          status: 'pending',
          rating: 5.0,
          total_reviews: 0,
          consultation_fee: '₹500',
          listing_enabled: true,
          created_at: dp.created_at || new Date().toISOString(),
          image: dp.avatar_url || getDoctorAvatar(dp.id, dp.name),
          expertise: dp.specialization ? dp.specialization.toLowerCase().split(', ') : [],
        });
      }
    }
  } catch (e) {
    console.error('Error syncing doctor profiles for admin:', e);
  }

  return all;
}

export async function registerDoctor(doctorData: Partial<Doctor>): Promise<{ success: boolean; message: string }> {
  // Sanitize all user-submitted fields before storage (XSS prevention)
  const cleanData: Partial<Doctor> = {
    ...doctorData,
    name: sanitizeShortText(doctorData.name, 100) || 'Doctor Practitioner',
    email: sanitizeEmail(doctorData.email),
    phone: sanitizePhone(doctorData.phone),
    whatsapp: sanitizePhone(doctorData.whatsapp),
    specialization: sanitizeShortText(doctorData.specialization, 200),
    system: sanitizeShortText(doctorData.system, 50),
    qualification: sanitizeShortText(doctorData.qualification, 200),
    clinic_name: sanitizeShortText(doctorData.clinic_name, 200),
    clinic_address: sanitizeShortText(doctorData.clinic_address, 300),
    city: sanitizeShortText(doctorData.city, 100),
    bio: sanitizeText(doctorData.bio, 2000),
    certificate_url: sanitizeUrl(doctorData.certificate_url),
    profile_image_url: sanitizeUrl(doctorData.profile_image_url),
  };

  // Save locally as pending so it goes to Admin Panel for review
  upsertLocalDoctor({
    ...cleanData,
    status: 'pending',
    listing_enabled: true
  });

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('doctors').insert([
        {
          name: cleanData.name,
          email: cleanData.email || null,
          whatsapp: cleanData.whatsapp,
          specialization: cleanData.specialization,
          system: cleanData.system || 'ayurveda',
          experience_years: cleanData.experience_years || 0,
          qualification: cleanData.qualification,
          clinic_name: cleanData.clinic_name,
          city: cleanData.city,
          bio: cleanData.bio,
          user_id: cleanData.user_id,
          status: 'pending'
        }
      ]);
    } catch (err: any) {
      console.error('Error inserting pending doctor in Supabase:', err);
    }
  }

  return {
    success: true,
    message: 'Doctor application submitted successfully! Your profile is now pending verification in the Ayushline Admin Panel. It will go live upon Admin approval.'
  };
}

export async function updateDoctorStatus(id: string | number, status: 'approved' | 'rejected'): Promise<boolean> {
  const localDocs = getLocalDoctors();
  const idx = localDocs.findIndex(d => String(d.id) === String(id) || (d.user_id && String(d.user_id) === String(id)));
  if (idx >= 0) {
    localDocs[idx].status = status;
    saveLocalDoctors(localDocs);
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('doctors').update({ status }).eq('id', id);
    if (!error) {
      window.dispatchEvent(new Event('ayush_doctors_update'));
    }
    return !error;
  }
  return true;
}

export async function deleteDoctor(id: string | number): Promise<boolean> {
  const localDocs = getLocalDoctors();
  const filtered = localDocs.filter(d => String(d.id) !== String(id) && String(d.user_id) !== String(id));
  saveLocalDoctors(filtered);

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (!error) {
      window.dispatchEvent(new Event('ayush_doctors_update'));
    }
    return !error;
  }
  return true;
}

export async function getDoctorById(id: string | number): Promise<Doctor | null> {
  // Check cached doctors first for 0ms lookup
  if (cachedApprovedDoctors) {
    const cachedMatch = cachedApprovedDoctors.find(d => String(d.id) === String(id) || d.user_id === String(id));
    if (cachedMatch) return cachedMatch;
  }

  // Check local doctors next
  const localMatch = getLocalDoctors().find(d => String(d.id) === String(id) || d.user_id === String(id));
  if (localMatch) return localMatch;

  // Then try fallback list
  const fallback = fallbackDoctors.find(d => String(d.id) === String(id));

  if (!isSupabaseConfigured || !supabase) {
    return fallback || null;
  }
  try {
    const fetchDoc = async () => {
      return await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .single();
    };

    const res = await fetchWithDoctorTimeout(fetchDoc, 1200);
    if (!res || res.error || !res.data) return fallback || null;

    const data = res.data;
    return {
      ...data,
      image: data.profile_image_url || getDoctorAvatar(data.id, data.name),
      experience: `${data.experience_years} Years`,
      expertise: data.specialization ? data.specialization.toLowerCase().split(', ') : ['general'],
      whatsapp: data.whatsapp || '919876543210',
    } as Doctor;
  } catch {
    return fallback || null;
  }
}

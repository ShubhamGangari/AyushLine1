import { supabase, isSupabaseConfigured } from '../supabase';

export type UserRole = 'user' | 'doctor' | 'student' | 'org' | 'admin';

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  college?: string | null;
  specialization?: string | null;
  qualification?: string | null;
  experience_years?: number | null;
  system?: string | null;
  city?: string | null;
  address?: string | null;
  accreditation?: string | null;
  clinic_address?: string | null;
  clinic_location?: string | null;
  website?: string | null;
  google_map_link?: string | null;
  created_at: string;
  updated_at: string;
}

export async function createOrUpsertProfile(
  userId: string,
  data: Partial<Profile>
): Promise<{ success: boolean; message: string; data?: Profile }> {
  const existingLocal = getLocalProfile(userId);
  const updatedLocal: Profile = {
    id: userId,
    name: data.name ?? existingLocal?.name ?? 'User',
    email: data.email ?? existingLocal?.email ?? null,
    role: data.role ?? existingLocal?.role ?? 'user',
    avatar_url: data.avatar_url ?? existingLocal?.avatar_url ?? null,
    bio: data.bio ?? existingLocal?.bio ?? null,
    whatsapp: data.whatsapp ?? existingLocal?.whatsapp ?? null,
    phone: data.phone ?? existingLocal?.phone ?? null,
    college: data.college ?? existingLocal?.college ?? null,
    specialization: data.specialization ?? existingLocal?.specialization ?? null,
    qualification: data.qualification ?? existingLocal?.qualification ?? null,
    experience_years: data.experience_years ?? existingLocal?.experience_years ?? null,
    system: data.system ?? existingLocal?.system ?? null,
    city: data.city ?? existingLocal?.city ?? null,
    address: data.address ?? existingLocal?.address ?? null,
    accreditation: data.accreditation ?? existingLocal?.accreditation ?? null,
    clinic_address: data.clinic_address ?? existingLocal?.clinic_address ?? null,
    clinic_location: data.clinic_location ?? existingLocal?.clinic_location ?? null,
    website: data.website ?? existingLocal?.website ?? null,
    google_map_link: data.google_map_link ?? existingLocal?.google_map_link ?? null,
    created_at: existingLocal?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  saveLocalProfile(updatedLocal);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, message: 'Profile saved (Local storage).', data: updatedLocal };
  }

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      name: updatedLocal.name,
      email: updatedLocal.email,
      role: updatedLocal.role,
      avatar_url: updatedLocal.avatar_url,
      bio: updatedLocal.bio,
      updated_at: updatedLocal.updated_at,
    });

    if (error) throw error;
    return { success: true, message: 'Profile saved successfully.', data: updatedLocal };
  } catch (err: any) {
    return { success: true, message: err.message || 'Profile saved locally.', data: updatedLocal };
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const local = getLocalProfile(userId);
  if (local) return local;

  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;
    return data as Profile;
  } catch {
    return null;
  }
}

export async function getAllProfilesAdmin(): Promise<Profile[]> {
  let list: Profile[] = [];

  // 1. Fetch from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        list = data as Profile[];
      }
    } catch {
      // Fallback to local
    }
  }

  // 2. Fetch from local storage registered users
  let localUsers: Profile[] = [];
  try {
    const raw = localStorage.getItem('ayush_registered_users_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      localUsers = parsed.map((u: any) => ({
        id: u.id,
        name: u.name || 'User',
        email: u.email || '',
        role: (u.role as UserRole) || 'student',
        avatar_url: u.avatarUrl || u.avatar_url || null,
        bio: u.bio || null,
        created_at: u.createdAt || u.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  } catch {
    // ignore
  }

  // 3. Scan all localStorage keys for any individual profile objects
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ayush_profile_')) {
        const val = localStorage.getItem(key);
        if (val) {
          const p = JSON.parse(val);
          if (p && p.id) {
            localUsers.push(p);
          }
        }
      }
    }

    const activeRaw = localStorage.getItem('ayush_active_session_v2');
    if (activeRaw) {
      const active = JSON.parse(activeRaw);
      if (active && active.id) {
        localUsers.push({
          id: active.id,
          name: active.name || 'User',
          email: active.email || '',
          role: active.role || 'user',
          avatar_url: active.avatarUrl || active.avatar_url || null,
          bio: active.bio || null,
          created_at: active.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }
  } catch {
    // ignore
  }

  // Merge lists by email or id
  const map = new Map<string, Profile>();
  [...list, ...localUsers].forEach(u => {
    const key = (u.email || u.id).toLowerCase();
    if (!map.has(key)) {
      map.set(key, u);
    } else {
      // prefer supabase profile if available, or merge fields
      const existing = map.get(key)!;
      map.set(key, { ...existing, ...u, role: u.role || existing.role });
    }
  });

  return Array.from(map.values());
}

export async function updateProfileRoleAdmin(userId: string, role: UserRole): Promise<boolean> {
  // Update local storage registered users
  try {
    const raw = localStorage.getItem('ayush_registered_users_v2');
    if (raw) {
      const users = JSON.parse(raw);
      const idx = users.findIndex((u: any) => u.id === userId || (u.email && u.email.toLowerCase() === userId.toLowerCase()));
      if (idx >= 0) {
        users[idx].role = role;
        localStorage.setItem('ayush_registered_users_v2', JSON.stringify(users));
      }
    }
  } catch {
    // ignore
  }

  // Update Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('profiles').update({ role, updated_at: new Date().toISOString() }).eq('id', userId);
    } catch {
      // ignore
    }
  }

  return true;
}

export async function deleteProfileAdmin(userId: string): Promise<boolean> {
  // Remove local storage
  try {
    const raw = localStorage.getItem('ayush_registered_users_v2');
    if (raw) {
      const users = JSON.parse(raw);
      const updated = users.filter((u: any) => u.id !== userId && u.email?.toLowerCase() !== userId.toLowerCase());
      localStorage.setItem('ayush_registered_users_v2', JSON.stringify(updated));
    }
    localStorage.removeItem(`ayush_profile_${userId}`);
  } catch {
    // ignore
  }

  // Delete from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('profiles').delete().eq('id', userId);
    } catch {
      // ignore
    }
  }

  return true;
}

function getLocalProfile(userId: string): Profile | null {
  try {
    const raw = localStorage.getItem(`ayush_profile_${userId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveLocalProfile(profile: Profile) {
  try {
    localStorage.setItem(`ayush_profile_${profile.id}`, JSON.stringify(profile));

    // Also sync active local session and local users array
    const activeRaw = localStorage.getItem('ayush_active_session_v2');
    if (activeRaw) {
      const active = JSON.parse(activeRaw);
      if (active.id === profile.id || (active.email && profile.email && active.email.toLowerCase() === profile.email.toLowerCase())) {
        active.role = profile.role;
        if (profile.name) active.name = profile.name;
        if (profile.avatar_url) active.avatarUrl = profile.avatar_url;
        localStorage.setItem('ayush_active_session_v2', JSON.stringify(active));
        window.dispatchEvent(new CustomEvent('ayush_auth_change'));
      }
    }

    const usersRaw = localStorage.getItem('ayush_registered_users_v2');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const idx = users.findIndex(
      (u: any) => u.id === profile.id || (u.email && profile.email && u.email.toLowerCase() === profile.email.toLowerCase())
    );
    const userItem = {
      id: profile.id,
      name: profile.name || 'User',
      email: profile.email || '',
      role: profile.role || 'user',
      avatarUrl: profile.avatar_url,
      avatar_url: profile.avatar_url,
      createdAt: profile.created_at || new Date().toISOString(),
    };
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...userItem };
    } else {
      users.push(userItem);
    }
    localStorage.setItem('ayush_registered_users_v2', JSON.stringify(users));
  } catch {
    // ignore
  }
}

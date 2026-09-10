import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { isClerkConfigured, useAuth, isLocalAuthMode } from './useAuth';

// Explicitly recognized admin User IDs (including user's Clerk ID)
const HARDCODED_ADMIN_USER_IDS = [
  'user_3J5YR8wS6wh6XnquYEzMVNqwSP8',
  'user_3J6CCVGjA3S8T4466lwnuXa8N9J',
];

// Explicitly recognized admin Email addresses
const HARDCODED_ADMIN_EMAILS = [
  'shubhamgangari3@gmail.com',
  'admin@ayushline.gov.in',
  'admin@ayush.gov.in',
];

const CLERK_LOAD_TIMEOUT_MS = 3000;

function useClerkFallbackActive(clerkIsLoaded: boolean): boolean {
  const [timedOut, setTimedOut] = useState<boolean>(() => !isClerkConfigured);

  useEffect(() => {
    if (!isClerkConfigured || timedOut) return;
    if (clerkIsLoaded) return; // still loading – keep waiting
    const t = setTimeout(() => setTimedOut(true), CLERK_LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [clerkIsLoaded]);

  return timedOut;
}

export function useAdmin() {
  const auth = useAuth();

  let clerkUser: ReturnType<typeof useUser>['user'] | null = null;
  let clerkLoaded = false;
  let fallbackActive = true;

  if (isClerkConfigured) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { user, isLoaded } = useUser();
      clerkUser = user;
      clerkLoaded = isLoaded;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const fallbackFromTimeout = useClerkFallbackActive(isLoaded);
      fallbackActive = isLocalAuthMode() || fallbackFromTimeout;
    } catch {
      // Clerk provider unavailable – fall through to local check
    }
  }

  // Parse VITE_ADMIN_USER_ID / VITE_ADMIN_USER_IDS env vars cleanly
  const envAdminIdsRaw = (import.meta.env.VITE_ADMIN_USER_ID || import.meta.env.VITE_ADMIN_USER_IDS || '').toString();
  const envAdminIds = envAdminIdsRaw
    .split(',')
    .map((id) => id.trim().replace(/^["']|["']$/g, ''))
    .filter((id) => id && id !== 'user_your_clerk_user_id_here');

  const allAdminUserIds = new Set([...HARDCODED_ADMIN_USER_IDS, ...envAdminIds]);

  const envAdminEmailsRaw = (import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.VITE_ADMIN_EMAILS || '').toString();
  const envAdminEmails = envAdminEmailsRaw
    .split(',')
    .map((email) => email.trim().toLowerCase().replace(/^["']|["']$/g, ''))
    .filter(Boolean);

  const allAdminEmails = new Set([...HARDCODED_ADMIN_EMAILS, ...envAdminEmails]);

  // Check auth user (local session or Clerk fallback)
  const localEmail = (auth.user?.email || '').toLowerCase();
  const isLocalAdmin =
    auth.user?.role === 'admin' ||
    (auth.userId && allAdminUserIds.has(auth.userId)) ||
    (localEmail && allAdminEmails.has(localEmail));

  if (!isClerkConfigured || fallbackActive) {
    return {
      isAdmin: Boolean(isLocalAdmin),
      isLoaded: true,
      userId: auth.userId,
      userEmail: auth.user?.email || null,
    };
  }

  if (!clerkLoaded || !clerkUser) {
    return {
      isAdmin: Boolean(isLocalAdmin),
      isLoaded: clerkLoaded,
      userId: auth.userId || null,
      userEmail: auth.user?.email || null,
    };
  }

  const clerkUserId = clerkUser.id;
  const clerkEmail = (clerkUser.primaryEmailAddress?.emailAddress || '').toLowerCase();
  const clerkMetadataRole = (clerkUser.publicMetadata as any)?.role;

  const isAdminByEnvOrId = allAdminUserIds.has(clerkUserId);
  const isAdminByEmail = clerkEmail ? allAdminEmails.has(clerkEmail) : false;
  const isAdminByMetadata = clerkMetadataRole === 'admin';
  const isAdminByLocal = auth.user?.role === 'admin';

  const isAdmin = Boolean(isAdminByEnvOrId || isAdminByEmail || isAdminByMetadata || isAdminByLocal || isLocalAdmin);

  return {
    isAdmin,
    isLoaded: true,
    userId: clerkUserId,
    userEmail: clerkEmail,
  };
}

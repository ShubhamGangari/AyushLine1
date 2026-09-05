import { useEffect } from 'react';
import { AuthenticateWithRedirectCallback, useUser, useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { createOrUpsertProfile } from '../lib/api/profiles';
import { registerDoctor } from '../lib/api/doctors';
import { isClerkConfigured, saveLocalUser } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, user } = useUser();
  const { signUp } = useSignUp();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // The role the user selected during sign-up was passed to Clerk as
      // unsafeMetadata — read it back so the profile (and therefore the
      // dashboard) reflects the correct role (doctor/student/org).
      const metadataRole =
        (user.unsafeMetadata as any)?.role ||
        (signUp?.unsafeMetadata as any)?.role ||
        (user.publicMetadata as any)?.role;

      const role = metadataRole || 'user';
      const name = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Google User';
      const email = user.primaryEmailAddress?.emailAddress || '';

      saveLocalUser({
        id: user.id,
        email: email,
        name: name,
        role: role as any,
        avatarUrl: user.imageUrl || undefined,
        createdAt: new Date().toISOString(),
      });

      void (async () => {
        await createOrUpsertProfile(user.id, {
          name: name,
          email: email,
          role: role,
          avatar_url: user.imageUrl || null,
        });

        void navigate('/dashboard');
      })();
    }
  }, [isLoaded, isSignedIn, user, signUp, navigate]);

  if (!isClerkConfigured) {
    return <Navigate to="/" replace />;
  }

  return <AuthenticateWithRedirectCallback signInUrl="/join/sign-in" signUpUrl="/join/sign-up" />;
};

export default SSOCallback;

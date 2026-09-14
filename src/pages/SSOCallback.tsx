import { useEffect, Component, ReactNode } from 'react';
import { AuthenticateWithRedirectCallback, useUser, useSignUp } from '@clerk/clerk-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { createOrUpsertProfile } from '../lib/api/profiles';
import { isClerkConfigured, saveLocalUser } from '../hooks/useAuth';

interface SafetyProps {
  children: ReactNode;
  fallbackTo: string;
}

interface SafetyState {
  hasError: boolean;
}

// Safety error boundary for Clerk OAuth callback component
class SSOSafetyBoundary extends Component<SafetyProps, SafetyState> {
  state: SafetyState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[SSOCallback] Caught auth callback error, redirecting safely:', error);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to={this.props.fallbackTo} replace />;
    }
    return this.props.children;
  }
}

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, user } = useUser();
  const { signUp } = useSignUp();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const metadataRole =
        (user.unsafeMetadata as any)?.role ||
        (signUp?.unsafeMetadata as any)?.role ||
        (user.publicMetadata as any)?.role;

      const role = metadataRole || 'user';
      const name =
        user.fullName ||
        [user.firstName, user.lastName].filter(Boolean).join(' ') ||
        user.primaryEmailAddress?.emailAddress?.split('@')[0] ||
        'User';
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
        try {
          await createOrUpsertProfile(user.id, {
            name: name,
            email: email,
            role: role,
            avatar_url: user.imageUrl || null,
          });
        } catch (e) {
          console.warn('[SSOCallback] Profile sync warning:', e);
        }

        void navigate('/dashboard', { replace: true });
      })();
    }
  }, [isLoaded, isSignedIn, user, signUp, navigate]);

  if (!isClerkConfigured) {
    return <Navigate to="/" replace />;
  }

  // If already signed in, immediately redirect to dashboard without re-running OAuth token parsing
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <SSOSafetyBoundary fallbackTo="/dashboard">
      <div className="min-h-screen flex items-center justify-center bg-ayush-cream">
        <AuthenticateWithRedirectCallback signInUrl="/join/sign-in" signUpUrl="/join/sign-up" />
      </div>
    </SSOSafetyBoundary>
  );
};

export default SSOCallback;


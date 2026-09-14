import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { isClerkConfigured, useAuth } from '../hooks/useAuth';

const SSOCallback = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isClerkConfigured) {
    return <Navigate to="/" replace />;
  }

  // If session is already active, immediately proceed to dashboard
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ayush-cream">
      <AuthenticateWithRedirectCallback
        signInUrl="/join/sign-in"
        signUpUrl="/join/sign-up"
        continueSignUpUrl="/dashboard"
        firstFactorUrl="/dashboard"
        secondFactorUrl="/dashboard"
      />
    </div>
  );
};

export default SSOCallback;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

// Catch and suppress harmless third-party script & network loading timeout rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const msg = (reason?.message || String(reason || '')).toLowerCase();
    if (
      msg.includes('clerk') ||
      msg.includes('failed to fetch') ||
      msg.includes('failed to load') ||
      msg.includes('network') ||
      reason?.code?.includes('clerk')
    ) {
      event.preventDefault();
    }
  });
}

const PUBLISHABLE_KEY = ((import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY as string) || '').trim();
const isValidKey = Boolean(
  PUBLISHABLE_KEY &&
  PUBLISHABLE_KEY.startsWith('pk_') &&
  PUBLISHABLE_KEY.length > 20 &&
  PUBLISHABLE_KEY !== 'pk_test_placeholder' &&
  !PUBLISHABLE_KEY.startsWith('pk_test_your_') &&
  !PUBLISHABLE_KEY.includes('Y2xlci1pbi1jbGVyay')
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isValidKey ? (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            footer: { display: 'none' },
            footerAction: { display: 'none' },
            footerActionLink: { display: 'none' },
            formButtonPrimary: 'bg-ayush-gold text-ayush-forest hover:bg-ayush-forest hover:text-white',
            card: 'shadow-none border border-ayush-charcoal/10 rounded-2xl',
            socialButtonsBlockButton: 'border border-ayush-charcoal/10 hover:bg-ayush-sage text-ayush-forest',
            socialButtonsBlockButtonText: 'font-ui text-sm font-semibold text-ayush-charcoal',
            headerTitle: 'font-display text-ayush-forest',
            headerSubtitle: 'font-body text-ayush-charcoal/70',
            formFieldLabel: 'font-ui text-ayush-forest text-sm font-semibold',
            formFieldInput: 'bg-ayush-ivory/50 border border-ayush-forest/20 rounded-xl focus:ring-2 focus:ring-ayush-gold font-ui',
            formFieldAction: 'text-ayush-gold font-ui text-sm font-semibold',
            identityPreview: 'text-ayush-forest font-ui',
            'cl-internal-b3fm6y': { display: 'none' },
          }
        }}
      >
        <App />
      </ClerkProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
)

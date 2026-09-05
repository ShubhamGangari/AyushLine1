import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { validateEmail } from '../../lib/authValidation';

const GoogleIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (user: { name: string; email: string; avatar: string }) => void;
}

const PRESET_ACCOUNTS = [
  {
    name: 'Dr. Ayush Sharma',
    email: 'dr.ayush.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Priya Verma',
    email: 'priya.verma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1594824813571-24a39073231f?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vaidya Rajesh Kumar',
    email: 'vaidya.rajesh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
  },
];

export const GoogleAuthModal = ({ isOpen, onClose, onSelectAccount }: GoogleAuthModalProps) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateEmail(customEmail);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email format');
      return;
    }

    if (!customName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSelectAccount({
        name: customName.trim(),
        email: customEmail.trim(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customName)}&background=0D9488&color=fff`,
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  const handleSelectPreset = (account: typeof PRESET_ACCOUNTS[0]) => {
    setLoading(true);
    setTimeout(() => {
      onSelectAccount(account);
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-ayush-charcoal/10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-ayush-charcoal/50 hover:text-ayush-charcoal hover:bg-ayush-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 text-center border-b border-ayush-charcoal/10">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3">
            <GoogleIcon />
          </div>
          <h2 className="text-xl font-display font-bold text-ayush-forest">Sign in with Google</h2>
          <p className="text-xs text-ayush-charcoal/70 font-body mt-1">
            Select a Google Account to continue to AYUSHLINE
          </p>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-xs font-ui font-bold text-ayush-forest uppercase tracking-wider block">
              Choose an account
            </label>
            {PRESET_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleSelectPreset(acc)}
                disabled={loading}
                className="w-full flex items-center p-3 rounded-xl border border-ayush-charcoal/10 hover:border-ayush-gold hover:bg-ayush-ivory/50 transition-all text-left group"
              >
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-10 h-10 rounded-full object-cover mr-3 border border-ayush-gold/30"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(acc.name)}&background=2d5a27&color=fff&size=100`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-ui font-semibold text-sm text-ayush-forest group-hover:text-ayush-gold truncate">
                    {acc.name}
                  </p>
                  <p className="text-xs font-body text-ayush-charcoal/70 truncate">{acc.email}</p>
                </div>
                <div className="w-6 h-6 rounded-full border border-ayush-charcoal/20 flex items-center justify-center text-transparent group-hover:text-ayush-forest group-hover:border-ayush-forest transition-colors">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ayush-charcoal/10"></div>
            </div>
            <div className="relative flex justify-center text-xs font-ui uppercase text-ayush-charcoal/50">
              <span className="px-3 bg-white">Or enter custom Gmail</span>
            </div>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Full Name (e.g. Rahul Sharma)"
                className="w-full px-3.5 py-2.5 text-sm border border-ayush-forest/20 rounded-xl focus:ring-2 focus:ring-ayush-gold bg-ayush-ivory/40 font-ui"
              />
            </div>
            <div>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="Gmail Address (e.g. rahul@gmail.com)"
                className="w-full px-3.5 py-2.5 text-sm border border-ayush-forest/20 rounded-xl focus:ring-2 focus:ring-ayush-gold bg-ayush-ivory/40 font-ui"
              />
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 font-ui">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-ayush-forest text-white rounded-xl font-ui font-semibold text-sm hover:bg-ayush-gold hover:text-ayush-forest transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Continue with Custom Google Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

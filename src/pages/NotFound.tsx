import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import AyushlineLogo from '../components/ui/AyushlineLogo';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-ayush-cream">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-ayush-forest/10">
        <div className="flex justify-center mb-6">
          <AyushlineLogo size="lg" />
        </div>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-4 border border-amber-200/60">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-bold text-ayush-forest mb-3">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-ayush-forest/90 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm font-body text-ayush-charcoal/70 mb-8 leading-relaxed">
          The page or resource you are looking for does not exist, has been moved, or is temporarily unavailable in the Ayushline portal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ayush-forest text-white font-ui font-semibold text-sm hover:bg-ayush-forest/90 transition-all shadow-sm"
          >
            <Home className="w-4 h-4 text-ayush-gold" /> Return Home
          </Link>
          <Link
            to="/consult"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ayush-sage/40 text-ayush-forest font-ui font-semibold text-sm hover:bg-ayush-sage/70 transition-all border border-ayush-forest/10"
          >
            <Search className="w-4 h-4 text-ayush-gold" /> Find Doctors
          </Link>
        </div>

        <div className="pt-6 border-t border-ayush-charcoal/10 flex flex-wrap justify-center gap-4 text-xs font-ui text-ayush-charcoal/70">
          <Link to="/whats-new" className="hover:text-ayush-forest flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-ayush-gold" /> What's New <ChevronRight className="w-3 h-3" />
          </Link>
          <Link to="/about" className="hover:text-ayush-forest font-medium">
            About Ayushline® <ChevronRight className="w-3 h-3 inline" />
          </Link>
          <Link to="/guidelines" className="hover:text-ayush-forest font-medium">
            Guidelines <ChevronRight className="w-3 h-3 inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

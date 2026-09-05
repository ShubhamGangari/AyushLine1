import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Stethoscope, Calendar, Search, BookOpen, Shield, ChevronRight, UserCheck, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Patient Welcome Banner */}
      <div className="bg-gradient-to-r from-ayush-forest to-emerald-900 text-white rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-ayush-gold/20 text-ayush-gold text-sm font-bold uppercase tracking-wider mb-3">
              <HeartHandshake className="w-4 h-4 mr-1.5" /> AYUSH Health & Wellness Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wide drop-shadow-xs">
              Welcome, {user?.name || 'Valued Patient'}
            </h1>
            <p className="text-ayush-ivory/80 font-body text-base mt-2 max-w-2xl leading-relaxed">
              Explore authentic Ayurvedic, Homeopathic, Unani, Siddha, and Yoga medical guidance. Book direct practitioner consultations and participate in therapeutic wellness webinars.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/consult"
              className="px-6 py-3.5 bg-ayush-gold text-ayush-forest font-ui font-bold rounded-xl hover:bg-white transition-all shadow-sm flex items-center gap-2 text-base"
            >
              <Stethoscope className="w-5 h-5" /> Book Doctor Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-ayush-charcoal/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-ayush-forest mb-2">Verified AYUSH Doctors</h3>
            <p className="text-sm font-body text-ayush-charcoal/70 mb-4 leading-relaxed">
              Connect directly with verified Ayurvedic, Homeopathic, and Siddha doctors via WhatsApp or appointment bookings.
            </p>
          </div>
          <Link
            to="/consult"
            className="inline-flex items-center gap-1.5 text-sm font-ui font-bold text-ayush-forest hover:text-ayush-gold transition-colors pt-2 border-t border-ayush-charcoal/5"
          >
            Find Doctor <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-ayush-charcoal/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-ayush-forest mb-2">Events & Workshops</h3>
            <p className="text-sm font-body text-ayush-charcoal/70 mb-4 leading-relaxed">
              Register for upcoming therapeutic yoga webinars, Panchakarma retreats, and national AYUSH health summits.
            </p>
          </div>
          <Link
            to="/whats-new"
            className="inline-flex items-center gap-1.5 text-sm font-ui font-bold text-ayush-forest hover:text-ayush-gold transition-colors pt-2 border-t border-ayush-charcoal/5"
          >
            Browse Events <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-ayush-charcoal/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4 font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-ayush-forest mb-2">Community Knowledge</h3>
            <p className="text-sm font-body text-ayush-charcoal/70 mb-4 leading-relaxed">
              Read verified clinical articles, blogs, research, and wellness guidelines contributed by certified practitioners.
            </p>
          </div>
          <Link
            to="/whats-new"
            className="inline-flex items-center gap-1.5 text-sm font-ui font-bold text-ayush-forest hover:text-ayush-gold transition-colors pt-2 border-t border-ayush-charcoal/5"
          >
            Read Articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Practitioner or Student Upgrade Callout */}
      <div className="bg-white rounded-3xl p-8 border border-ayush-charcoal/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-ayush-sage text-ayush-forest flex items-center justify-center shrink-0">
            <UserCheck className="w-8 h-8 text-ayush-gold" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-ayush-forest">Are you an AYUSH Practitioner or Student?</h3>
            <p className="text-sm md:text-base font-body text-ayush-charcoal/70 mt-1">
              Switch your account role anytime to access specialized doctor features, clinic management, or student learning resources.
            </p>
          </div>
        </div>

        <Link
          to="/profile"
          className="px-6 py-3.5 rounded-xl bg-ayush-forest text-white font-ui font-bold text-sm hover:bg-ayush-gold hover:text-ayush-forest transition-all shrink-0 shadow-xs"
        >
          Update Role in Profile
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;

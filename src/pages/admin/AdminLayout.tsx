import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Stethoscope, FileText, Calendar, Home, ArrowLeft, Users } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

const AdminLayout: React.FC = () => {
  const { isAdmin, isLoaded } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  // Forcibly redirect non-admins at the route level — not just hidden in JSX
  useEffect(() => {
    if (isLoaded && !isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isLoaded, isAdmin, navigate]);

  // Show spinner while auth state is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-ayush-cream flex items-center justify-center" aria-label="Loading admin portal">
        <div className="w-10 h-10 border-4 border-ayush-gold border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading..."></div>
      </div>
    );
  }

  // Blocked — useEffect redirect above handles navigation; this is a safe fallback render
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-ayush-cream flex items-center justify-center p-4" role="alert" aria-live="assertive">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg border border-ayush-forest/10">
          <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-display font-bold text-ayush-forest mb-2">Access Denied</h1>
          <p className="text-ayush-charcoal/70 font-body text-sm mb-6">
            You do not have administrator permissions to access this area.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-ayush-forest text-white py-3 rounded-full font-ui font-semibold flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Return to Website
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: <Home className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> },
    { label: 'Doctors', path: '/admin/doctors', icon: <Stethoscope className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> },
    { label: 'Articles', path: '/admin/posts', icon: <FileText className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> },
    { label: 'Events', path: '/admin/events', icon: <Calendar className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> },
    { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> },
  ];

  return (
    <div className="min-h-screen bg-ayush-ivory flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile & Desktop Header / Sidebar Container */}
      <aside className="w-full md:w-64 bg-ayush-forest text-ayush-ivory flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10" aria-label="Admin navigation">
        {/* Top Brand Strip */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-lg sm:text-xl text-ayush-gold">AYUSHLINE</span>
            <span className="block text-[10px] sm:text-xs font-ui text-ayush-ivory/60 uppercase tracking-widest mt-0.5">Admin Portal</span>
          </div>
          <Link to="/" className="text-xs font-ui font-semibold text-ayush-gold hover:underline flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all" aria-label="View main website">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> View Site
          </Link>
        </div>

        {/* Navigation Bar: Horizontal scroll on mobile, vertical stack on desktop */}
        <nav className="p-2 sm:p-4 flex md:flex-col overflow-x-auto gap-1.5 no-scrollbar" aria-label="Admin menu">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl font-ui text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 md:flex-shrink ${
                  isActive
                    ? 'bg-ayush-gold text-ayush-forest shadow-md font-bold'
                    : 'text-ayush-ivory/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="mr-2 md:mr-3">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-w-full" id="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

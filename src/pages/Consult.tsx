import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Wand2, ArrowRight, Mic, MicOff, X, Phone, Eye, MapPin, Award, Stethoscope, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getApprovedDoctors, type Doctor } from '../lib/api/doctors';
import { createAppointment } from '../lib/api/appointments';
import { useAuth } from '../hooks/useAuth';
import { AuthRequiredModal } from '../components/auth/AuthRequiredModal';

// Voice Recognition setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const Consult = () => {
  const { isSignedIn, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'book' | 'match'>('book');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authActionName, setAuthActionName] = useState('');

  // Smart Match State
  const [symptoms, setSymptoms] = useState('');
  const [matchedDoctor, setMatchedDoctor] = useState<any>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Appointment Booking State
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Voice Recognition States
  const [isListeningMatch, setIsListeningMatch] = useState(false);
  const [recognitionMatch, setRecognitionMatch] = useState<any>(null);

  const requireAuth = (action: string, callback?: () => void) => {
    if (!isSignedIn) {
      setAuthActionName(action);
      setAuthModalOpen(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  useEffect(() => {
    async function fetchData() {
      const docsData = await getApprovedDoctors();
      setDoctors(docsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (SpeechRecognition) {
      const recMatch = new SpeechRecognition();
      recMatch.continuous = false;
      recMatch.interimResults = false;
      recMatch.lang = 'en-US';

      recMatch.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(prev => prev ? prev + ' ' + transcript : transcript);
        setIsListeningMatch(false);
      };
      
      recMatch.onerror = () => setIsListeningMatch(false);
      recMatch.onend = () => setIsListeningMatch(false);
      setRecognitionMatch(recMatch);
    }
  }, []);

  const toggleListenMatch = () => {
    if (isListeningMatch) {
      recognitionMatch?.stop();
      setIsListeningMatch(false);
    } else {
      recognitionMatch?.start();
      setIsListeningMatch(true);
    }
  };

  const handleSmartMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    
    setIsMatching(true);
    setMatchedDoctor(null);

    setTimeout(() => {
      const lowerSymptoms = symptoms.toLowerCase();
      let found = doctors.find(doc => {
        const specs = doc.specialization ? doc.specialization.toLowerCase() : '';
        const exps = doc.expertise ? doc.expertise.join(' ').toLowerCase() : '';
        const sys = doc.system ? doc.system.toLowerCase() : '';
        return specs.includes(lowerSymptoms) || exps.includes(lowerSymptoms) || lowerSymptoms.includes(sys);
      });
      
      if (!found && doctors.length > 0) {
        found = doctors[0];
      }

      setMatchedDoctor(found);
      setIsMatching(false);
    }, 200);
  };

  const handleViewFullProfile = (docId: string | number) => {
    navigate(`/doctors/${docId}`);
  };

  const handleInitiateBooking = (doc: Doctor) => {
    requireAuth('book a consultation appointment', () => {
      setBookingDoctor(doc);
    });
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor) return;
    setIsBooking(true);
    setBookingResult(null);
    const res = await createAppointment({
      doctor_id: bookingDoctor.id.toString(),
      doctor_name: bookingDoctor.name,
      patient_id: user?.id || 'guest',
      patient_name: user?.name || 'AYUSH Patient',
      patient_email: user?.email || 'user@ayushline.com',
      preferred_date: bookingDate,
      preferred_time: bookingTime,
      message: bookingMessage,
    });
    setBookingResult(res);
    setIsBooking(false);
    if (res.success) {
      setBookingDate('');
      setBookingTime('');
      setBookingMessage('');
    }
  };

  const filteredDoctors = doctors.filter(doc => 
    (doc.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.system || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.specialization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.city || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-ayush-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        actionName={authActionName}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ayush-gold/20 text-ayush-forest border border-ayush-gold/30 text-xs font-ui font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-ayush-gold" /> Ayushline® Verified Network
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ayush-forest mb-4">
            AYUSH Consultation & Specialist Directory
          </h1>
          <p className="font-body text-ayush-charcoal/80 text-lg max-w-2xl mx-auto">
            Find verified AYUSH practitioners, book direct consultation appointments, or use Smart AI Match to connect with the right specialist.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="bg-white rounded-full shadow-md p-1 inline-flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex items-center px-6 py-3 rounded-full font-ui font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'book' ? 'bg-ayush-forest text-white' : 'text-ayush-charcoal/70 hover:text-ayush-forest'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Doctor Directory
            </button>
            <button
              onClick={() => setActiveTab('match')}
              className={`flex items-center px-6 py-3 rounded-full font-ui font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'match' ? 'bg-ayush-forest text-white' : 'text-ayush-charcoal/70 hover:text-ayush-forest'
              }`}
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Smart Match
            </button>
          </div>
        </div>

        {/* Smart Match Section */}
        {activeTab === 'match' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-ayush-forest/10 mb-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-ayush-sage text-ayush-forest flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-8 h-8 text-ayush-gold" />
              </div>
              <h2 className="text-2xl font-display font-bold text-ayush-forest mb-4">
                Not sure which practitioner to consult?
              </h2>
              <p className="font-body text-ayush-charcoal/80 mb-8 max-w-xl mx-auto">
                Tell us about your symptoms, health concerns, or goals. You can type or use voice dictation. Our intelligent matcher connects you with the most specialized AYUSH doctor.
              </p>
              
              <form onSubmit={handleSmartMatch} className="space-y-4 max-w-2xl mx-auto relative">
                <div className="relative">
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g. Chronic acidity and indigestion for 3 months, or Joint pain and stiffness in knees..."
                    className="w-full px-5 py-4 pr-12 rounded-2xl border border-ayush-forest/20 focus:ring-2 focus:ring-ayush-gold bg-ayush-cream/30 font-ui text-sm resize-none"
                    rows={3}
                  />
                  {SpeechRecognition && (
                    <button
                      type="button"
                      onClick={toggleListenMatch}
                      className={`absolute right-3 bottom-4 p-2 rounded-full transition-all ${
                        isListeningMatch ? 'bg-red-100 text-red-500 animate-pulse' : 'text-ayush-forest/60 hover:bg-ayush-sage hover:text-ayush-forest'
                      }`}
                      title={isListeningMatch ? "Listening..." : "Voice search"}
                    >
                      {isListeningMatch ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-3.5 text-base justify-center font-bold"
                  disabled={isMatching || !symptoms.trim()}
                >
                  {isMatching ? (
                    <span className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Finding Best Specialist...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Wand2 className="w-5 h-5 mr-2" /> Find Best Match
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Smart Match Result */}
            {matchedDoctor && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-ayush-gold/50 animate-scale-up">
                <div className="flex items-center space-x-2 text-ayush-gold text-sm font-ui font-bold mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>RECOMMENDED AYUSH PRACTITIONER</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src={matchedDoctor.image || matchedDoctor.profile_image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
                    alt={matchedDoctor.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-ayush-gold flex-shrink-0 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(matchedDoctor.name)}&background=2d5a27&color=fff&size=150`;
                    }}
                  />
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="font-display font-bold text-2xl text-ayush-forest">{matchedDoctor.name}</h3>
                      <span className="px-3 py-1 bg-ayush-sage text-ayush-forest rounded-full text-xs font-ui font-bold capitalize">
                        {matchedDoctor.system}
                      </span>
                    </div>

                    <p className="text-ayush-gold font-ui text-sm font-semibold">{matchedDoctor.qualification || 'Certified AYUSH Practitioner'}</p>
                    <p className="font-body text-sm text-ayush-charcoal/80">
                      <strong>Specialization:</strong> {matchedDoctor.specialization}
                    </p>
                    {matchedDoctor.city && (
                      <p className="font-ui text-xs text-ayush-charcoal/60 flex items-center justify-center sm:justify-start">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {matchedDoctor.city} {matchedDoctor.clinic_name ? `(${matchedDoctor.clinic_name})` : ''}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ayush-forest/10 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => handleInitiateBooking(matchedDoctor)}
                    className="px-6 py-3 bg-ayush-forest text-white hover:bg-ayush-gold hover:text-ayush-forest rounded-xl font-ui font-bold text-sm flex items-center justify-center transition-all shadow-md"
                  >
                    <Calendar className="w-4 h-4 mr-2" /> Book Consultation
                  </button>

                  <button
                    onClick={() => handleViewFullProfile(matchedDoctor.id)}
                    className="px-5 py-3 bg-ayush-cream text-ayush-forest hover:bg-ayush-sage rounded-xl font-ui font-semibold text-sm flex items-center justify-center border border-ayush-forest/10 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Book a Doctor Section */}
        {activeTab === 'book' && (
          <div className="space-y-8 animate-fade-in">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="w-5 h-5 text-ayush-charcoal/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, city, system (Ayurveda, Yoga...), or specialization..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-ayush-forest/20 focus:ring-2 focus:ring-ayush-gold bg-white font-ui text-sm shadow-sm"
              />
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-3xl p-6 shadow-sm border border-ayush-forest/10 hover:border-ayush-gold/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-3">
                      <img
                        src={doctor.image || doctor.profile_image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-ayush-gold/30 flex-shrink-0 shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2d5a27&color=fff&size=100`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-ui font-bold uppercase tracking-wider bg-ayush-sage text-ayush-forest mb-1">
                          {doctor.system}
                        </span>
                        <h3 className="font-display font-bold text-lg text-ayush-forest truncate" title={doctor.name}>{doctor.name}</h3>
                        <p className="font-ui text-xs text-ayush-gold font-bold truncate">{doctor.qualification || 'AYUSH Practitioner'}</p>
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="flex items-center text-xs font-ui text-ayush-forest bg-ayush-cream/60 px-3 py-1.5 rounded-xl border border-ayush-forest/5 mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-ayush-gold flex-shrink-0" />
                      <span className="font-semibold truncate">
                        {doctor.city || 'India'} {doctor.clinic_name ? `(${doctor.clinic_name})` : ''}
                      </span>
                    </div>

                    {/* Specialization */}
                    <p className="font-ui text-xs text-ayush-charcoal/80 mb-3 leading-relaxed">
                      <strong className="text-ayush-forest">Speciality:</strong> {doctor.specialization}
                    </p>

                    {/* Meta info row */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-ui text-ayush-charcoal/70 pt-2 border-t border-ayush-charcoal/5">
                      <div className="flex items-center">
                        <Award className="w-3 h-3 mr-1 text-ayush-gold flex-shrink-0" />
                        <span><strong>{doctor.experience_years || doctor.experience || 5}+ yrs</strong> Exp.</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Stethoscope className="w-3 h-3 mr-1 text-ayush-gold flex-shrink-0" />
                        <span>Fee: <strong>{doctor.consultation_fee || '₹500'}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Full Profile & Book Consultation */}
                  <div className="flex items-center gap-2 pt-2 border-t border-ayush-charcoal/5">
                    <button
                      onClick={() => handleInitiateBooking(doctor)}
                      className="flex-1 py-2.5 bg-ayush-forest hover:bg-ayush-gold hover:text-ayush-forest text-white rounded-xl font-ui text-xs font-bold flex items-center justify-center transition-all shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-ayush-gold" /> Book Consultation
                    </button>

                    <button
                      onClick={() => handleViewFullProfile(doctor.id)}
                      className="px-3.5 py-2.5 bg-ayush-cream hover:bg-ayush-sage text-ayush-forest rounded-xl font-ui text-xs font-bold flex items-center justify-center border border-ayush-forest/15 transition-colors gap-1"
                      title="View Full Profile"
                    >
                      <Eye className="w-3.5 h-3.5 text-ayush-forest" />
                      <span className="hidden sm:inline">View Full Profile</span>
                      <span className="sm:hidden">Profile</span>
                    </button>

                    {(doctor.whatsapp || doctor.phone) && (
                      <a
                        href={`https://wa.me/${(doctor.whatsapp || doctor.phone).replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-ui text-xs font-bold flex items-center justify-center border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Booking Modal */}
        {bookingDoctor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-ayush-forest/10 relative my-auto animate-scale-up">
              <button
                onClick={() => {
                  setBookingDoctor(null);
                  setBookingResult(null);
                }}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-ayush-cream flex items-center justify-center text-ayush-charcoal hover:bg-ayush-sage transition-colors font-bold"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={bookingDoctor.image || bookingDoctor.profile_image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
                  alt={bookingDoctor.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-ayush-gold/30 flex-shrink-0"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-ayush-forest">Book Consultation</h3>
                  <p className="font-ui text-xs text-ayush-gold font-bold">Dr. {bookingDoctor.name} ({bookingDoctor.system})</p>
                </div>
              </div>

              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-xs font-ui font-bold text-ayush-forest mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-ayush-forest/20 focus:ring-2 focus:ring-ayush-gold font-ui text-sm bg-ayush-cream/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-ui font-bold text-ayush-forest mb-1">Preferred Time Slot</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-ayush-forest/20 focus:ring-2 focus:ring-ayush-gold font-ui text-sm bg-ayush-cream/30"
                    required
                  >
                    <option value="">Select a time slot</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-ui font-bold text-ayush-forest mb-1">Message / Key Health Concern</label>
                  <textarea
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    rows={3}
                    placeholder="Describe your health problem or symptoms briefly..."
                    className="w-full px-4 py-2.5 rounded-xl border border-ayush-forest/20 focus:ring-2 focus:ring-ayush-gold font-ui text-sm bg-ayush-cream/30 resize-none"
                  ></textarea>
                </div>

                {bookingResult && (
                  <div className={`px-4 py-3 rounded-xl text-xs font-ui ${bookingResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {bookingResult.message}
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full justify-center py-3" disabled={isBooking}>
                  {isBooking ? 'Submitting Consultation Request...' : 'Confirm Consultation Request'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consult;

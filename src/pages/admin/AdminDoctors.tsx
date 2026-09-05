import React, { useEffect, useState } from 'react';
import { type Doctor, getAllDoctorsAdmin, updateDoctorStatus, deleteDoctor } from '../../lib/api/doctors';
import { Check, X, Stethoscope, MapPin, Award, Trash2, Eye, Phone, ExternalLink, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const loadDoctors = async () => {
    setLoading(true);
    const data = await getAllDoctorsAdmin();
    setDoctors(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleStatusChange = async (id: string | number, status: 'approved' | 'rejected') => {
    await updateDoctorStatus(id.toString(), status);
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    if (selectedDoctor && selectedDoctor.id === id) {
      setSelectedDoctor(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDeleteDoctor = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    await deleteDoctor(id);
    setDoctors(prev => prev.filter(d => d.id !== id));
    if (selectedDoctor && selectedDoctor.id === id) {
      setSelectedDoctor(null);
    }
  };

  const filteredDoctors = doctors.filter(d => filter === 'all' || d.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ayush-forest">Doctor Approvals</h1>
          <p className="text-ayush-charcoal/70 font-body text-sm mt-1">Review practitioner applications to grant official verification.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-ayush-forest/10 shadow-sm self-start">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-ui font-semibold capitalize transition-all ${
                filter === type ? 'bg-ayush-forest text-white' : 'text-ayush-charcoal/70 hover:text-ayush-forest'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-ayush-charcoal/60 font-ui">Loading doctor applications...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-ayush-forest/10 text-ayush-charcoal/60 font-ui">
          No doctor applications found for filter "{filter}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl p-6 border border-ayush-forest/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-ayush-gold/30 transition-all">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-display font-bold text-ayush-forest">{doctor.name}</h3>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-ui font-semibold capitalize ${
                    doctor.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    doctor.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doctor.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-ui text-ayush-charcoal/80">
                  <span className="flex items-center font-semibold text-ayush-forest"><Stethoscope className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {doctor.system} ({doctor.qualification || 'Degree'}) • {doctor.specialization || 'General'}</span>
                  {(doctor.whatsapp || doctor.phone) && <span className="flex items-center text-emerald-700 font-medium"><Phone className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {doctor.whatsapp || doctor.phone}</span>}
                  {doctor.email && <span className="flex items-center text-ayush-charcoal/70"><Mail className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {doctor.email}</span>}
                  {doctor.city && <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {doctor.city} {doctor.clinic_name ? `(${doctor.clinic_name})` : ''}</span>}
                  <span className="flex items-center"><Award className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {doctor.experience_years || doctor.experience || 0} Yrs Exp</span>
                </div>

                {doctor.bio && (
                  <p className="font-body text-sm text-ayush-charcoal/80 line-clamp-2">{doctor.bio}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="px-3.5 py-2 bg-ayush-cream hover:bg-ayush-sage text-ayush-forest rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all border border-ayush-forest/10"
                >
                  <Eye className="w-4 h-4 mr-1 text-ayush-forest" /> View Doctor Profile
                </button>

                {doctor.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusChange(doctor.id, 'approved')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </button>
                )}
                {doctor.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(doctor.id, 'rejected')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </button>
                )}
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Doctor Profile Preview Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-ayush-forest/10 relative max-h-[90vh] overflow-y-auto my-auto animate-scale-up">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ayush-cream flex items-center justify-center text-ayush-charcoal hover:bg-ayush-sage transition-colors font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-ayush-sage border-2 border-ayush-gold shadow-sm flex-shrink-0">
                  <img
                    src={selectedDoctor.image || selectedDoctor.profile_image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-display font-bold text-ayush-forest">{selectedDoctor.name}</h2>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-ui font-bold capitalize ${
                      selectedDoctor.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      selectedDoctor.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedDoctor.status}
                    </span>
                  </div>
                  <p className="text-sm font-ui text-ayush-gold font-bold capitalize mt-0.5">
                    {selectedDoctor.system} Practitioner ({selectedDoctor.qualification || 'BAMS'})
                  </p>
                  <p className="text-xs font-ui text-ayush-charcoal/60 mt-1">
                    Specialization: {selectedDoctor.specialization}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-ayush-cream/60 rounded-2xl border border-ayush-forest/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-ui text-ayush-forest">
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" /> <div><strong>Mobile / WhatsApp:</strong> {selectedDoctor.whatsapp || selectedDoctor.phone || 'N/A'}</div></div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Email:</strong> {selectedDoctor.email || 'N/A'}</div></div>
                <div className="flex items-center"><Award className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Degree / Qualification:</strong> {selectedDoctor.qualification || 'N/A'}</div></div>
                <div className="flex items-center"><Award className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Experience:</strong> {selectedDoctor.experience_years || selectedDoctor.experience || 0} Years</div></div>
                <div className="flex items-center"><Stethoscope className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>AYUSH System:</strong> {selectedDoctor.system || 'N/A'} ({selectedDoctor.specialization || 'General'})</div></div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>City / Region:</strong> {selectedDoctor.city || 'N/A'}</div></div>
                <div className="flex items-center sm:col-span-2"><MapPin className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Clinic & Address:</strong> {selectedDoctor.clinic_name || 'Clinic'} {selectedDoctor.clinic_address ? `— ${selectedDoctor.clinic_address}` : ''}</div></div>
                <div className="flex items-center"><Stethoscope className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Consultation Fee:</strong> {selectedDoctor.consultation_fee || '₹500'}</div></div>
              </div>

              {selectedDoctor.bio && (
                <div>
                  <h4 className="font-ui font-bold text-sm text-ayush-forest mb-1">Doctor Bio & Experience:</h4>
                  <p className="font-body text-ayush-charcoal text-sm leading-relaxed whitespace-pre-wrap bg-ayush-ivory/50 p-4 rounded-xl border border-ayush-forest/5">
                    {selectedDoctor.bio}
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-ayush-charcoal/10 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to={`/doctors/${selectedDoctor.id}`}
                  target="_blank"
                  className="px-4 py-2 bg-ayush-sage text-ayush-forest hover:bg-ayush-gold hover:text-white rounded-xl font-ui text-xs font-semibold flex items-center transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Public Card
                </Link>

                <div className="flex items-center space-x-3">
                  {selectedDoctor.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(selectedDoctor.id, 'approved')}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-ui text-sm font-bold flex items-center shadow-md transition-all"
                    >
                      <Check className="w-4 h-4 mr-1.5" /> Approve Doctor
                    </button>
                  )}
                  {selectedDoctor.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(selectedDoctor.id, 'rejected')}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-ui text-sm font-bold flex items-center shadow-md transition-all"
                    >
                      <X className="w-4 h-4 mr-1.5" /> Reject Doctor
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;

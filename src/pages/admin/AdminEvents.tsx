import React, { useEffect, useState } from 'react';
import { type EventItem, getAllEventsAdmin, updateEventStatus, deleteEvent } from '../../lib/api/events';
import { Check, X, Calendar, MapPin, Trash2, Eye, User } from 'lucide-react';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    const data = await getAllEventsAdmin();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleStatusChange = async (id: string | number, status: 'approved' | 'rejected') => {
    await updateEventStatus(id.toString(), status);
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDeleteEvent = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    await deleteEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  const filteredEvents = events.filter(e => filter === 'all' || e.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ayush-forest">Event Approvals</h1>
          <p className="text-ayush-charcoal/70 font-body text-sm mt-1">Approve community announcements, webinars, and seminars.</p>
        </div>

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
        <div className="py-12 text-center text-ayush-charcoal/60 font-ui">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-ayush-forest/10 text-ayush-charcoal/60 font-ui">
          No events found for filter "{filter}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-ayush-forest/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-ayush-gold/30 transition-all">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-ui font-bold uppercase tracking-wider bg-ayush-sage text-ayush-forest">
                    {event.type}
                  </span>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-ui font-semibold capitalize ${
                    event.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    event.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {event.status}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-ayush-forest">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-ui text-ayush-charcoal/70">
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {event.event_date || event.date}</span>
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-ayush-gold" /> {event.location}</span>
                </div>
                <p className="font-body text-sm text-ayush-charcoal/80 line-clamp-2">{event.description}</p>
              </div>

              <div className="flex items-center flex-wrap gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-3.5 py-2 bg-ayush-cream hover:bg-ayush-sage text-ayush-forest rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all border border-ayush-forest/10"
                >
                  <Eye className="w-4 h-4 mr-1 text-ayush-forest" /> View Event Details
                </button>

                {event.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusChange(event.id, 'approved')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </button>
                )}
                {event.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(event.id, 'rejected')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </button>
                )}
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-ui text-xs font-semibold flex items-center shadow-sm transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-ayush-forest/10 relative max-h-[90vh] overflow-y-auto my-auto animate-scale-up">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ayush-cream flex items-center justify-center text-ayush-charcoal hover:bg-ayush-sage transition-colors font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 pr-10">
                <span className="px-3 py-1 rounded-full text-xs font-ui font-bold uppercase tracking-wider bg-ayush-sage text-ayush-forest">
                  {selectedEvent.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-ui font-bold capitalize ${
                  selectedEvent.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                  selectedEvent.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Status: {selectedEvent.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ayush-forest leading-tight">
                {selectedEvent.title}
              </h2>

              <div className="p-4 bg-ayush-cream/60 rounded-2xl border border-ayush-forest/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-ui text-ayush-forest">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Date & Time:</strong> {selectedEvent.event_date || selectedEvent.date}</div></div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Location:</strong> {selectedEvent.location}</div></div>
                {selectedEvent.organizer && (
                  <div className="flex items-center col-span-1 sm:col-span-2"><User className="w-4 h-4 mr-2 text-ayush-gold flex-shrink-0" /> <div><strong>Organizer:</strong> {selectedEvent.organizer}</div></div>
                )}
              </div>

              <div>
                <h4 className="font-ui font-bold text-sm text-ayush-forest mb-2">Event Description:</h4>
                <p className="font-body text-ayush-charcoal text-base leading-relaxed whitespace-pre-wrap">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="pt-6 border-t border-ayush-charcoal/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 rounded-xl border border-ayush-charcoal/20 font-ui text-sm font-semibold text-ayush-charcoal hover:bg-ayush-cream transition-colors"
                >
                  Close Preview
                </button>

                <div className="flex items-center space-x-3">
                  {selectedEvent.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(selectedEvent.id, 'approved')}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-ui text-sm font-bold flex items-center shadow-md transition-all"
                    >
                      <Check className="w-4 h-4 mr-1.5" /> Approve Event
                    </button>
                  )}
                  {selectedEvent.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(selectedEvent.id, 'rejected')}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-ui text-sm font-bold flex items-center shadow-md transition-all"
                    >
                      <X className="w-4 h-4 mr-1.5" /> Reject Event
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

export default AdminEvents;

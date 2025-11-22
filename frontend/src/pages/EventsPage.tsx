import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventService } from '../services/eventService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import './EventsPage.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  facility?: {
    id: string;
    name: string;
    location: string;
  };
  creator: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  status: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Event;
}

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  // const [events, setEvents] = useState<Event[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    facilityId: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      // setEvents(data);
      
      // Convert to calendar events
      const calEvents = data.map((event: Event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        resource: event,
      }));
      
      setCalendarEvents(calEvents);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event.resource);
    setShowEventModal(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    if (user?.role === 'ADMIN') {
      setFormData({
        ...formData,
        startTime: slotInfo.start.toISOString().slice(0, 16),
        endTime: slotInfo.end.toISOString().slice(0, 16),
      });
      setShowCreateModal(true);
    }
  };

  const handleProposeEvent = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      location: '',
      facilityId: '',
    });
    setShowProposalModal(true);
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventService.proposeEvent(formData);
      setShowProposalModal(false);
      setFormData({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        facilityId: '',
      });
      alert('Event proposal submitted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to propose event');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventService.createEvent(formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        facilityId: '',
      });
      fetchEvents(); // Refresh calendar
      alert('Event created successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create event');
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || !window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await eventService.deleteEvent(selectedEvent.id);
      setShowEventModal(false);
      setSelectedEvent(null);
      fetchEvents(); // Refresh calendar
      alert('Event deleted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete event');
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3174ad';
    
    if (event.resource.status === 'PENDING') {
      backgroundColor = '#f59e0b';
    } else if (event.resource.status === 'REJECTED') {
      backgroundColor = '#ef4444';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events Calendar</h1>
        <div className="events-actions">
          {(user?.role === 'STUDENT' || user?.role === 'FACULTY') && (
            <Button onClick={handleProposeEvent}>Propose Event</Button>
          )}
          {user?.role === 'ADMIN' && (
            <Button onClick={() => setShowCreateModal(true)}>Create Event</Button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={user?.role === 'ADMIN'}
          view={currentView}
          onView={setCurrentView}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* Event Details Modal */}
      <Modal
        open={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        title="Event Details"
      >
        {selectedEvent && (
          <div className="event-details">
            <h2>{selectedEvent.title}</h2>
            {selectedEvent.description && <p>{selectedEvent.description}</p>}
            
            <div className="event-info">
              <p><strong>Start:</strong> {new Date(selectedEvent.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.endTime).toLocaleString()}</p>
              {selectedEvent.location && <p><strong>Location:</strong> {selectedEvent.location}</p>}
              {selectedEvent.facility && <p><strong>Facility:</strong> {selectedEvent.facility.name}</p>}
              <p><strong>Created by:</strong> {selectedEvent.creator.name}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${selectedEvent.status.toLowerCase()}`}>{selectedEvent.status}</span></p>
            </div>

            {user?.role === 'ADMIN' && (
              <div className="event-actions">
                <Button variant="contained" color="error" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Propose Event Modal */}
      <Modal
        open={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        title="Propose Event"
      >
        <form onSubmit={handleSubmitProposal} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <input
                type="datetime-local"
                id="startTime"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time *</label>
              <input
                type="datetime-local"
                id="endTime"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="outlined" onClick={() => setShowProposalModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">Submit Proposal</Button>
          </div>
        </form>
      </Modal>

      {/* Create Event Modal (Admin) */}
      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Event"
      >
        <form onSubmit={handleCreateEvent} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <input
                type="datetime-local"
                id="startTime"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time *</label>
              <input
                type="datetime-local"
                id="endTime"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="outlined" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">Create Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventsPage;

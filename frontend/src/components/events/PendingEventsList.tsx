import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import Button from '../common/Button';
import './PendingEventsList.css';

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
  createdAt: string;
}

interface PendingEventsListProps {
  onUpdate?: () => void;
}

const PendingEventsList: React.FC<PendingEventsListProps> = ({ onUpdate }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getPendingEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load pending events');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId: string) => {
    if (!window.confirm('Are you sure you want to approve this event?')) return;

    try {
      await eventService.approveEvent(eventId);
      await fetchPendingEvents();
      if (onUpdate) onUpdate();
      alert('Event approved successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to approve event');
    }
  };

  const handleRejectClick = (event: Event) => {
    setSelectedEvent(event);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedEvent) return;

    try {
      await eventService.rejectEvent(selectedEvent.id, rejectionReason);
      setShowRejectModal(false);
      setSelectedEvent(null);
      setRejectionReason('');
      await fetchPendingEvents();
      if (onUpdate) onUpdate();
      alert('Event rejected');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reject event');
    }
  };

  if (loading) return <div className="loading">Loading pending events...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (events.length === 0) return <div className="no-data">No pending event proposals</div>;

  return (
    <div className="pending-events-list">
      <h3>Pending Event Proposals ({events.length})</h3>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-header">
              <h4>{event.title}</h4>
              <span className="status-badge pending">Pending</span>
            </div>

            {event.description && (
              <p className="event-description">{event.description}</p>
            )}

            <div className="event-details-grid">
              <div className="detail-item">
                <span className="label">Start:</span>
                <span>{new Date(event.startTime).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">End:</span>
                <span>{new Date(event.endTime).toLocaleString()}</span>
              </div>
              {event.location && (
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span>{event.location}</span>
                </div>
              )}
              {event.facility && (
                <div className="detail-item">
                  <span className="label">Facility:</span>
                  <span>{event.facility.name}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="label">Proposed by:</span>
                <span>{event.creator.name} ({event.creator.role})</span>
              </div>
              <div className="detail-item">
                <span className="label">Proposed on:</span>
                <span>{new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="event-actions">
              <Button variant="contained" color="success" onClick={() => handleApprove(event.id)}>
                Approve
              </Button>
              <Button variant="contained" color="error" onClick={() => handleRejectClick(event)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedEvent && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reject Event Proposal</h3>
              <button className="close-btn" onClick={() => setShowRejectModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Event:</strong> {selectedEvent.title}</p>
              <p><strong>Proposed by:</strong> {selectedEvent.creator.name}</p>
              
              <div className="form-group">
                <label htmlFor="rejectionReason">Reason for rejection (optional):</label>
                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  placeholder="Provide a reason for rejecting this event proposal..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="outlined" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleRejectConfirm}>
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingEventsList;

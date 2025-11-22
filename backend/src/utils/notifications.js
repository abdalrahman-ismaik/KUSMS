import logger from './logger.js';

/**
 * Send booking notification to user
 * For MVP: Console log notification (can be extended to email/SMS later)
 * @param {Object} booking - Booking object
 * @param {string} type - Notification type ('approved', 'rejected', 'created')
 * @param {string} reason - Optional reason for rejection
 */
function sendBookingNotification(booking, type, reason = null) {
  const notification = {
    timestamp: new Date().toISOString(),
    type: 'BOOKING_NOTIFICATION',
    recipient: booking.user.email,
    subject: getNotificationSubject(type),
    message: getNotificationMessage(booking, type, reason),
  };

  // For MVP: Log to console (will be replaced with email service later)
  logger.info('📧 Notification sent:', notification);

  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  // await emailService.send(notification);

  return notification;
}

/**
 * Get notification subject based on type
 */
function getNotificationSubject(type) {
  switch (type) {
    case 'approved':
      return '✅ Your booking has been approved';
    case 'rejected':
      return '❌ Your booking has been rejected';
    case 'created':
      return '📝 Booking request submitted';
    default:
      return '📬 Booking update';
  }
}

/**
 * Generate notification message
 */
function getNotificationMessage(booking, type, reason) {
  const facilityName = booking.facility?.name || 'Facility';
  const startTime = new Date(booking.startTime).toLocaleString();
  const endTime = new Date(booking.endTime).toLocaleString();

  switch (type) {
    case 'approved':
      return `Your booking for ${facilityName} from ${startTime} to ${endTime} has been approved. You can now use the facility during this time.`;
    
    case 'rejected':
      return `Your booking for ${facilityName} from ${startTime} to ${endTime} has been rejected. ${reason ? `Reason: ${reason}` : 'Please contact admin for more information.'}`;
    
    case 'created':
      return `Your booking request for ${facilityName} from ${startTime} to ${endTime} has been submitted and is pending approval.`;
    
    default:
      return `Your booking for ${facilityName} has been updated.`;
  }
}

/**
 * Send maintenance notification
 * @param {Object} request - Maintenance request object
 * @param {string} type - Notification type ('assigned', 'completed', 'updated')
 */
function sendMaintenanceNotification(request, type) {
  const notification = {
    timestamp: new Date().toISOString(),
    type: 'MAINTENANCE_NOTIFICATION',
    recipient: request.user.email,
    subject: getMaintenanceSubject(type),
    message: getMaintenanceMessage(request, type),
  };

  logger.info('📧 Notification sent:', notification);
  return notification;
}

/**
 * Get maintenance notification subject
 */
function getMaintenanceSubject(type) {
  switch (type) {
    case 'assigned':
      return '🔧 Your maintenance request has been assigned';
    case 'completed':
      return '✅ Your maintenance request is complete';
    case 'updated':
      return '📝 Maintenance request status updated';
    default:
      return '🔔 Maintenance update';
  }
}

/**
 * Get maintenance notification message
 */
function getMaintenanceMessage(request, type) {
  const facilityName = request.facility?.name || 'Facility';

  switch (type) {
    case 'assigned':
      return `Your maintenance request for ${facilityName} has been assigned to our maintenance team and will be addressed soon.`;
    
    case 'completed':
      return `Great news! Your maintenance request for ${facilityName} has been completed. Thank you for reporting the issue.`;
    
    case 'updated':
      return `The status of your maintenance request for ${facilityName} has been updated to ${request.status}.`;
    
    default:
      return `Your maintenance request for ${facilityName} has been updated.`;
  }
}

/**
 * Send event notification
 * @param {string} type - Notification type ('created', 'updated', 'deleted', 'approved', 'rejected', 'reminder')
 * @param {Object} event - Event object
 * @param {string} reason - Optional reason for rejection
 */
function sendEventNotification(type, event, reason = null) {
  const notification = {
    timestamp: new Date().toISOString(),
    type: 'EVENT_NOTIFICATION',
    recipient: event.creator?.email || event.creatorEmail,
    subject: getEventSubject(type),
    message: getEventMessage(event, type, reason),
  };

  logger.info('📧 Notification sent:', notification);
  return notification;
}

/**
 * Get event notification subject
 */
function getEventSubject(type) {
  switch (type) {
    case 'created':
      return '✨ Event created successfully';
    case 'updated':
      return '📝 Event updated';
    case 'deleted':
      return '🗑️ Event deleted';
    case 'approved':
      return '🎉 Your event has been approved';
    case 'rejected':
      return '❌ Your event has been rejected';
    case 'reminder':
      return '⏰ Event reminder';
    default:
      return '📅 Event update';
  }
}

/**
 * Get event notification message
 */
function getEventMessage(event, type, reason) {
  const eventTitle = event.title;
  const startTime = new Date(event.startTime).toLocaleString();

  switch (type) {
    case 'created':
      return `Event "${eventTitle}" has been created and published for ${startTime}.`;
    
    case 'updated':
      return `Event "${eventTitle}" has been updated.`;
    
    case 'deleted':
      return `Event "${eventTitle}" scheduled for ${startTime} has been deleted.`;
    
    case 'approved':
      return `Your event "${eventTitle}" scheduled for ${startTime} has been approved and is now visible to all users.`;
    
    case 'rejected':
      return `Your event proposal "${eventTitle}" has been rejected. ${reason ? `Reason: ${reason}` : 'Please contact admin for more information.'}`;
    
    case 'reminder':
      return `Reminder: "${eventTitle}" starts at ${startTime}. Don't miss it!`;
    
    default:
      return `Your event "${eventTitle}" has been updated.`;
  }
}

export {
  sendBookingNotification,
  sendMaintenanceNotification,
  sendEventNotification,
};

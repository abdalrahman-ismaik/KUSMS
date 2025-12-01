# Phase 8: System Submission - Screenshot Guide

## Required Screenshots for Phase 8 Submission

This guide outlines the key pages/features to capture for your Phase 8 submission document.

### Prerequisites
Before taking screenshots:
1. Ensure backend and frontend servers are running
2. Database should be seeded with test data
3. Use a clean browser window (no dev tools visible unless showing errors)
4. Take screenshots at consistent resolution (1920x1080 recommended)

---

## Screenshot Checklist

### 1. **Login Page**
**File**: `01-login-page.png`

**Description**: KUSMS login interface with demo credentials displayed

**How to capture**:
- Navigate to http://localhost:5173
- Ensure the page is fully loaded
- Capture the entire login card including the KUSMS logo

---

### 2. **Student Dashboard**
**File**: `02-student-dashboard.png`

**Description**: Student dashboard showing personal bookings, upcoming events, and quick actions

**How to capture**:
- Login with: student@ku.ac.ae / password123
- Wait for dashboard to fully load
- Capture the main dashboard view with sidebar visible

---

### 3. **Admin Dashboard**
**File**: `03-admin-dashboard.png`

**Description**: Admin dashboard displaying system statistics, pending approvals, and management options

**How to capture**:
- Logout and login with: admin@ku.ac.ae / password123
- Navigate to dashboard
- Capture showing stats cards and pending items

---

### 4. **Facility Booking - List View**
**File**: `04-bookings-list.png`

**Description**: List of all bookings showing different statuses (Pending, Approved, Rejected)

**How to capture**:
- As student or admin, navigate to Bookings page
- Ensure multiple bookings with different statuses are visible
- Capture the full list with status badges

---

### 5. **Facility Booking - Create New Booking**
**File**: `05-create-booking.png`

**Description**: Booking creation form with facility selection, date/time pickers

**How to capture**:
- Click "New Booking" or "Book Facility" button
- Fill in some example data (don't submit yet)
- Capture the form modal/page

---

### 6. **Booking Approval (Admin)**
**File**: `06-booking-approval.png`

**Description**: Admin view of pending bookings with approve/reject actions

**How to capture**:
- Login as admin
- Navigate to pending bookings section
- Show the approval interface with action buttons

---

### 7. **Events Page**
**File**: `07-events-page.png`

**Description**: Events calendar or list showing upcoming university events

**How to capture**:
- Navigate to Events page
- Ensure at least one event is visible
- Capture the events listing/calendar view

---

### 8. **Create Event (Faculty)**
**File**: `08-create-event.png`

**Description**: Event creation form available to faculty members

**How to capture**:
- Login as faculty@ku.ac.ae / password123
- Navigate to Events page
- Click "Create Event" button
- Capture the event creation form

---

### 9. **Facilities Management**
**File**: `09-facilities-list.png`

**Description**: List of all facilities with their details (capacity, type, location)

**How to capture**:
- Login as admin
- Navigate to Facilities page
- Capture the facilities grid/list showing multiple facilities

---

### 10. **User Management (Admin)**
**File**: `10-user-management.png`

**Description**: Admin interface for managing users (view, add, edit users)

**How to capture**:
- As admin, navigate to Users/Settings page
- Show the user list with different roles
- Capture the management interface

---

### 11. **Maintenance Requests**
**File**: `11-maintenance-requests.png`

**Description**: Maintenance request submission or viewing interface

**How to capture**:
- Navigate to Maintenance page
- Show existing maintenance requests or submission form
- Capture with status indicators visible

---

### 12. **Maintenance Dashboard (Staff)**
**File**: `12-maintenance-staff-view.png`

**Description**: Maintenance staff view showing assigned tasks and status updates

**How to capture**:
- Login as maintenance@ku.ac.ae / password123
- Navigate to maintenance dashboard
- Show the queue of requests with status options

---

### 13. **Notifications/Alerts**
**File**: `13-notifications.png`

**Description**: System notification display (toast messages or notification center)

**How to capture**:
- Perform an action that triggers a notification (e.g., submit a booking)
- Quickly capture the success toast/notification
- Or show notification bell with unread notifications

---

### 14. **Mobile Responsiveness** (Optional but Recommended)
**File**: `14-mobile-view.png`

**Description**: Application displayed on mobile/tablet viewport

**How to capture**:
- Open browser dev tools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select a mobile device (e.g., iPhone 12 Pro)
- Capture responsive layout

---

### 15. **AI Booking Suggestions** ⭐ NEW
**File**: `15-ai-booking-suggestions.png`

**Description**: AI-powered booking recommendation card on Student Dashboard using Google Gemini API

**How to capture**:
- Login as student@ku.ac.ae / password123
- Navigate to Dashboard
- Wait 5-10 seconds for AI suggestion to generate
- Capture the "AI Booking Suggestion" card showing personalized recommendations
- Ensure lightbulb icon and suggestion text are visible

---

### 16. **AI Maintenance Summary** ⭐ NEW
**File**: `16-ai-maintenance-summary.png`

**Description**: AI-generated weekly maintenance workload summary for staff planning using Google Gemini API

**How to capture**:
- Login as maintenance@ku.ac.ae / password123
- Navigate to Maintenance Dashboard
- Wait 10-15 seconds for AI summary to generate
- Capture the "Weekly Maintenance AI Summary" card at top of dashboard
- Ensure the 3-6 sentence summary is fully visible

---

## Screenshot Document Format

For each screenshot in your submission document, include:

```
### [Number]. [Page Name]

![Screenshot Description](./screenshots/filename.png)

**Description**: [One-line description of what the screenshot shows and its key features]

**Key Features Visible**:
- Feature 1
- Feature 2
- Feature 3
```

### Example Entry:

```
### 1. Login Page

![KUSMS Login Interface](./screenshots/01-login-page.png)

**Description**: Secure login interface for KUSMS with role-based access and demo credentials.

**Key Features Visible**:
- Clean, modern UI with KU branding
- Email and password input fields
- Demo account credentials for all roles
- Responsive design with gradient background
```

---

## Tips for High-Quality Screenshots

1. **Clean Browser**: Use incognito mode or clean profile
2. **Full Page**: Use full-page screenshot tools if content is long
3. **Consistent Size**: Keep window size consistent across screenshots
4. **Highlight Important Elements**: Use annotations if needed (optional)
5. **No Personal Data**: Ensure only test data is visible
6. **Good Timing**: Capture after page fully loads
7. **Show Interactions**: Capture hover states, open modals, etc.

---

## Screenshot Tools

**Windows**:
- Snipping Tool (Win + Shift + S)
- Snip & Sketch
- Browser extensions: Awesome Screenshot, Nimbus

**Mac**:
- Command + Shift + 4 (selection)
- Command + Shift + 3 (full screen)

**Browser**:
- Chrome DevTools (Ctrl + Shift + P → "Screenshot")
- Firefox Screenshot tool (built-in)

---

## Final Checklist

Before submitting:
- [ ] All 16 screenshots captured (including 2 AI features)
- [ ] Each screenshot is clear and properly sized
- [ ] One-line descriptions added for each
- [ ] Screenshots organized in a folder
- [ ] Document properly formatted
- [ ] All key features visible in screenshots
- [ ] No errors or broken UI in screenshots
- [ ] Consistent user accounts used (test data)

---

## Phase 8 Submission Files

Your final submission should include:

1. **KUSMS-Code.zip**
   - Complete source code (backend + frontend)
   - Include README.md
   - Include .env.example files
   - Exclude node_modules, .git

2. **KUSMS-Screenshots.pdf** or **KUSMS-Screenshots.docx**
   - All screenshots with descriptions
   - Organized by module
   - Professional formatting

3. **PHASE_7_TESTING.md** (from docs folder)
   - Completed test cases with results
   - All actual outputs filled in
   - Test summary included

---

Good luck with your Phase 8 submission! 🚀

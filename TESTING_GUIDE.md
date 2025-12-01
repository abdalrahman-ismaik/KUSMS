# KUSMS Phase 7 Testing Guide

## Prerequisites
Before running tests, ensure both backend and frontend servers are running:

### 1. Start Backend Server
```powershell
cd backend
npm install
npx prisma migrate deploy
npx prisma db seed
npm start
```
Backend will run on: http://localhost:3000

### 2. Start Frontend Server
```powershell
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## Test Execution Instructions

### Module 1: User Authentication

**TC-01: Login with valid Student credentials**
1. Open http://localhost:5173 in browser
2. Enter email: `student@ku.ac.ae`
3. Enter password: `password123`
4. Click "Sign In" button
5. **Expected**: Redirected to `/dashboard` with "Welcome, Test Student" message
6. **Verify**: URL shows `/dashboard` and student dashboard is displayed

**TC-02: Login with valid Admin credentials**
1. If logged in, logout first
2. Open http://localhost:5173
3. Enter email: `admin@ku.ac.ae`
4. Enter password: `password123`
5. Click "Sign In" button
6. **Expected**: Redirected to `/dashboard` with Admin controls visible
7. **Verify**: Admin dashboard shows user management, pending approvals, etc.

**TC-03: Login with invalid password**
1. If logged in, logout first
2. Open http://localhost:5173
3. Enter email: `student@ku.ac.ae`
4. Enter password: `wrongpass`
5. Click "Sign In" button
6. **Expected**: Error message "Invalid email or password" displayed in red alert
7. **Verify**: User remains on login page

**TC-04: Access protected route without login**
1. Open new incognito/private browser window
2. Navigate directly to: http://localhost:5173/dashboard
3. **Expected**: Automatically redirected to `/login` page
4. **Verify**: URL changes to `/login` and login form is displayed

### Module 2: Facility Booking

**TC-05: Create a new Booking Request**
1. Login as Student (student@ku.ac.ae / password123)
2. Navigate to "Bookings" page
3. Click "New Booking" or "Book Facility" button
4. Select Facility: `Innovation Lab`
5. Select Date: Tomorrow's date
6. Select Time: 10:00 AM - 12:00 PM
7. Enter Purpose: "Study Group"
8. Click "Submit" or "Book" button
9. **Expected**: Success toast message "Booking submitted successfully"
10. **Verify**: Booking appears in list with status "PENDING"

**TC-06: Check Booking Conflict**
1. While still logged in as Student
2. Try to create another booking with same details:
   - Facility: `Innovation Lab`
   - Date: Tomorrow
   - Time: 10:00 AM - 12:00 PM
3. Click "Submit"
4. **Expected**: Error message "Time slot not available" or similar conflict message
5. **Verify**: Booking is not created

**TC-07: Admin Approve Booking**
1. Logout and login as Admin (admin@ku.ac.ae / password123)
2. Navigate to "Bookings" or "Pending Approvals" section
3. Find the pending booking from TC-05
4. Click "Approve" button
5. **Expected**: Status changes to "APPROVED", success message shown
6. **Verify**: Booking status badge shows "APPROVED" in green

**TC-08: Admin Reject Booking**
1. While logged in as Admin
2. Create a new booking as student first (or use existing pending booking)
3. Find the pending booking
4. Click "Reject" button
5. **Expected**: Status changes to "REJECTED"
6. **Verify**: Booking status badge shows "REJECTED" in red

### Module 3: Event Management

**TC-09: Create Public Event (Faculty)**
1. Logout and login as Faculty (faculty@ku.ac.ae / password123)
2. Navigate to "Events" page
3. Click "Create Event" button
4. Enter:
   - Title: "AI Workshop"
   - Location: "Lecture Hall 101"
   - Date/Time: Next week
   - Description: Workshop details
5. Click "Create" or "Publish"
6. **Expected**: Success message, event created
7. **Verify**: Event appears in "Upcoming Events" list

**TC-10: View Event Details**
1. Login as any user (or view as guest if public)
2. Navigate to "Events" page
3. Find "AI Workshop" event card
4. Click on the event card
5. **Expected**: Modal or detail page opens showing full event details
6. **Verify**: Title, description, time, and location are all displayed correctly

### Module 4: Maintenance Requests

**TC-11: Submit Maintenance Request**
1. Login as Faculty or Student
2. Navigate to "Maintenance" page
3. Click "Submit Request" or "Report Issue"
4. Select Facility: `Lecture Hall 101`
5. Enter Issue: "Projector broken"
6. Click "Submit"
7. **Expected**: Success message shown
8. **Verify**: Request appears in list with status "PENDING"

**TC-12: Update Request Status (Maintenance Staff)**
1. Logout and login as Maintenance (maintenance@ku.ac.ae / password123)
2. Navigate to Maintenance Dashboard
3. Find the request from TC-11
4. Change status from "PENDING" to "IN_PROGRESS"
5. Click "Update" or "Save"
6. **Expected**: Status updates successfully
7. **Verify**: Status badge shows "IN_PROGRESS" in yellow/orange

### Module 5: AI-Powered Features

**TC-13: AI Booking Suggestion Generation (Student)**
1. Login as Student (student@ku.ac.ae / password123)
2. Navigate to Dashboard
3. Wait for the page to fully load (AI suggestion may take 5-10 seconds)
4. **Expected**: "AI Booking Suggestion" card appears with personalized recommendation
5. **Verify**: 
   - Card displays with lightbulb icon
   - Suggestion includes facility name and details
   - Recommendation mentions booking patterns or optimal times
   - Loading message "Generating AI suggestion..." appears briefly during generation

**TC-14: AI Maintenance Summary Generation (Maintenance Staff)**
1. Login as Maintenance Staff (maintenance@ku.ac.ae / password123)
2. Navigate to Maintenance Dashboard
3. Wait for AI summary to generate (may take 10-15 seconds)
4. **Expected**: "Weekly Maintenance AI Summary" card displays at top of dashboard
5. **Verify**:
   - Summary contains 3-6 sentences about maintenance workload
   - Includes overall volume, main categories, and urgent priorities
   - Loading message "Waiting for AI response..." shown during generation
   - Summary is relevant to current maintenance requests

## Notes for Testing
- Take screenshots of each successful test
- Note any deviations from expected behavior
- Test on latest Chrome, Firefox, or Edge browser
- Ensure no browser console errors during tests
- Clear browser cache if experiencing issues

## Test Data Reset
To reset test data between test runs:
```powershell
cd backend
npx prisma migrate reset --force
npx prisma db seed
```

This will recreate the database with fresh seed data.

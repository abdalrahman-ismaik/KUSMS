---
description: "Task list for KUSMS MVP implementation"
---

# Tasks: KU Smart Management System (MVP)

**Input**: Design documents from `/specs/001-kusms-mvp/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories)  
**Tests**: Per Constitution v1.0.0, tests are OPTIONAL - manual testing is acceptable for MVP  
**Timeline**: 3 weeks (November 3-24, 2025)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. Focus is on P1 (critical) user stories only.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

**Monorepo Structure** (from plan.md):
- **Frontend**: `frontend/src/` (React application)
- **Backend**: `backend/src/` (Node.js/Express API)
- **Database**: `backend/prisma/` (Prisma schema)
- **Docs**: `docs/` (minimal documentation)

---

## Implementation Strategy (MVP-First)

**Phase Execution Order**:
1. **Phase 1: Setup** (Days 1-2) - Project initialization, foundational structure
2. **Phase 2: Foundational** (Days 3-5) - Authentication & RBAC (blocking prerequisite)
3. **Phase 3: User Story 1** (Days 6-7) - Facility Booking (P1 - Critical)
4. **Phase 4: User Story 2** (Days 8-9) - Event Scheduling (P1 - Critical)
5. **Phase 5: User Story 3** (Day 10) - Maintenance Tracking (P1 - Critical)
6. **Phase 6: Integration & Polish** (Days 11-15) - Testing, deployment, documentation

**Independent Testing Criteria**:
- Each user story delivers standalone value
- Can be manually tested against acceptance scenarios
- Does not block other stories from development
- Deployable as an increment

**Parallel Execution Opportunities**:
- Within Setup: Multiple [P] tasks can run simultaneously
- Within User Stories: Frontend and backend tasks with [P] marker
- Across Stories: US1, US2, US3 can be developed in parallel after Foundational phase completes

---

## Phase 1: Setup (Days 1-2)

**Purpose**: Project initialization and basic structure  
**Goal**: Complete development environment setup with database

### Infrastructure Setup

- [X] T001 Create root project directory structure (frontend/, backend/, docs/)
- [X] T002 [P] Initialize frontend React app in frontend/ with Vite or Create React App
- [X] T003 [P] Initialize backend Node.js project in backend/ with Express
- [X] T004 [P] Create docker-compose.yml for PostgreSQL, backend, frontend services
- [X] T005 [P] Create .env.example files for frontend and backend with required variables
- [X] T006 Configure ESLint and Prettier for frontend in frontend/.eslintrc.js
- [X] T007 Configure ESLint and Prettier for backend in backend/.eslintrc.js
- [X] T008 Create .gitignore for node_modules, .env, build directories

### Database Setup

- [X] T009 Install Prisma CLI and initialize Prisma in backend/prisma/
- [X] T010 Define Prisma schema in backend/prisma/schema.prisma with User, Role enum, Facility, Booking, BookingStatus enum, Event, EventStatus enum, MaintenanceRequest, MaintenanceStatus enum
- [ ] T011 Run initial Prisma migration: `npx prisma migrate dev --name init` (⚠️ Requires PostgreSQL running)
- [X] T012 Generate Prisma Client: `npx prisma generate`
- [X] T013 [P] Create seed script in backend/prisma/seed.js with sample users (student, faculty, admin, maintenance), facilities (5-10 rooms), and test data
- [ ] T014 Run seed script: `npx prisma db seed` (⚠️ Requires database migration first)

### Backend Foundation

- [X] T015 Create backend/src/server.js with Express app initialization, middleware (cors, json, morgan), and basic health check endpoint
- [X] T016 Create backend/src/utils/prisma.js for Prisma client singleton instance
- [X] T017 [P] Create backend/src/utils/logger.js for consistent logging
- [X] T018 [P] Create backend/src/utils/errors.js for custom error classes (ValidationError, AuthError, NotFoundError)

### Frontend Foundation

- [X] T019 Install React Router v6 in frontend: `npm install react-router-dom`
- [X] T020 Install UI library (Material-UI) in frontend: `npm install @mui/material @emotion/react @emotion/styled`
- [X] T021 Create frontend/src/App.jsx with React Router setup and placeholder routes
- [X] T022 [P] Create frontend/src/components/common/Layout.jsx with header, sidebar, main content area
- [X] T023 [P] Create frontend/src/components/common/Button.jsx reusable button component
- [X] T024 [P] Create frontend/src/components/common/Input.jsx reusable input component
- [X] T025 [P] Create frontend/src/components/common/Modal.jsx reusable modal component
- [X] T026 Create frontend/src/services/api.js with Axios instance and base API client configuration

### Documentation

- [X] T027 [P] Create docs/README.md with setup instructions (Node.js 18, Docker, prerequisites)
- [X] T028 [P] Create docs/API.md placeholder for API endpoint documentation

**Milestone 1**: Development environment ready, database running, basic apps scaffolded

---

## Phase 2: Foundational (Days 3-5) - Authentication & RBAC

**Purpose**: User authentication and role-based access control (BLOCKING PREREQUISITE for all user stories)  
**Goal**: Users can log in with mock auth (email/password + JWT) and see role-appropriate dashboards

### Backend Authentication

- [ ] T029 Install JWT dependencies in backend: `npm install jsonwebtoken bcryptjs`
- [ ] T030 Create backend/src/controllers/authController.js with login, logout, getCurrentUser functions
- [ ] T031 Create backend/src/middleware/auth.js with JWT verification middleware (verifyToken)
- [ ] T032 Create backend/src/middleware/rbac.js with role-based access control middleware (requireRole function)
- [ ] T033 Implement password hashing utility in backend/src/utils/hash.js using bcryptjs
- [ ] T034 Implement JWT token generation in backend/src/utils/jwt.js (sign, verify functions)
- [ ] T035 Create backend/src/routes/auth.js with POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me endpoints
- [ ] T036 Register auth routes in backend/src/server.js

### Frontend Authentication

- [ ] T037 Create frontend/src/contexts/AuthContext.jsx for global auth state (user, token, role)
- [ ] T038 Create frontend/src/hooks/useAuth.js custom hook to access AuthContext
- [ ] T039 Create frontend/src/services/authService.js with login, logout, getCurrentUser API calls
- [ ] T040 Create frontend/src/pages/Login.jsx with email/password form
- [ ] T041 Create frontend/src/components/auth/ProtectedRoute.jsx component for route protection
- [ ] T042 Update frontend/src/App.jsx to wrap app with AuthProvider and configure protected routes

### Role-Based Dashboards

- [x] T043 [P] Create frontend/src/pages/Dashboard.tsx with role detection and conditional rendering
- [x] T044 [P] Create frontend/src/components/dashboard/StudentDashboard.tsx with bookings, events sections
- [x] T045 [P] Create frontend/src/components/dashboard/FacultyDashboard.tsx similar to student dashboard
- [x] T046 [P] Create frontend/src/components/dashboard/AdminDashboard.tsx with approval workflows, analytics
- [x] T047 [P] Create frontend/src/components/dashboard/MaintenanceDashboard.tsx with assigned tasks list

### Global Navigation

- [x] T048 Update frontend/src/components/common/Layout.tsx Header with user info, logout button, role indicator
- [x] T049 Update frontend/src/components/common/Layout.tsx Sidebar with navigation links based on user role
- [x] T050 Implement logout functionality in frontend and backend (token invalidation)

**Milestone 2**: Users can log in, see role-specific dashboards, navigate protected routes

---

## Phase 3: User Story 1 - Facility Booking (Days 6-7)

**User Story**: Students/faculty book facilities with admin approval workflow  
**Priority**: P1 (Critical)  
**Independent Test**: User can request booking → Admin approves/rejects → User receives notification  
**Dependencies**: Phase 2 (Authentication) must be complete

### Backend - Booking Module

- [x] T051 [US1] Create backend/src/controllers/bookingController.js with createBooking, getBookings, getBookingById, approveBooking, rejectBooking functions
- [x] T052 [US1] Create backend/src/controllers/facilityController.js with getFacilities, getFacilityById, checkAvailability functions
- [x] T053 [US1] Implement conflict detection logic in backend/src/utils/bookingConflicts.js (check overlapping time slots)
- [x] T054 [US1] Implement alternative slot suggestion in backend/src/utils/bookingConflicts.js (find next 3 available slots)
- [x] T055 [US1] Create backend/src/routes/bookings.js with GET /api/bookings, POST /api/bookings, GET /api/bookings/:id, PATCH /api/bookings/:id/approve, PATCH /api/bookings/:id/reject endpoints
- [x] T056 [US1] Create backend/src/routes/facilities.js with GET /api/facilities, GET /api/facilities/:id, GET /api/facilities/:id/availability endpoints
- [x] T057 [US1] Apply auth and RBAC middleware to booking routes (students/faculty can create, admins can approve/reject)
- [x] T058 [US1] Register booking and facility routes in backend/src/server.js

### Backend - Notifications (Basic)

- [x] T059 [US1] Create backend/src/utils/notifications.js with sendBookingNotification function (console log for MVP, email later)
- [x] T060 [US1] Integrate notifications in bookingController for approval/rejection events

### Frontend - Booking UI

- [x] T061 [P] [US1] Create frontend/src/services/bookingService.ts with API calls (createBooking, getBookings, approveBooking, rejectBooking)
- [x] T062 [P] [US1] Create frontend/src/services/facilityService.ts with API calls (getFacilities, checkAvailability)
- [x] T063 [US1] Create frontend/src/pages/BookingPage.tsx with facility selection, date/time pickers, conflict detection display
- [x] T064 [US1] Create frontend/src/components/booking/BookingForm.tsx reusable form component
- [x] T065 [US1] Create frontend/src/components/booking/BookingList.tsx to display user's bookings with status
- [x] T066 [US1] Create frontend/src/components/booking/ConflictAlert.tsx to show conflicts and alternative slots
- [x] T067 [US1] Install date picker library: `npm install @mui/x-date-pickers dayjs`
- [x] T068 [US1] Implement date/time picker in BookingForm with conflict checking on selection

### Frontend - Admin Approval

- [x] T069 [P] [US1] Create frontend/src/pages/AdminPage.tsx with tabs for pending bookings, events, users
- [x] T070 [US1] Create frontend/src/components/booking/PendingBookingsList.tsx to display all pending booking requests
- [x] T071 [US1] Create frontend/src/components/booking/BookingApprovalModal.tsx with approve/reject actions and reason input
- [x] T072 [US1] Integrate approval/rejection actions in AdminPage with real-time list update

### Integration & Testing

- [ ] T073 [US1] Manually test complete booking workflow: login as student → create booking → login as admin → approve → verify notification
- [ ] T074 [US1] Manually test conflict detection: book same facility at same time → verify conflict message and alternatives
- [ ] T075 [US1] Manually test rejection workflow: login as admin → reject booking with reason → verify user sees rejection reason

**Milestone 3**: Facility booking workflow complete and tested

---

## Phase 4: User Story 2 - Event Scheduling (Days 8-9)

**User Story**: Centralized calendar with event proposals and admin management  
**Priority**: P1 (Critical)  
**Independent Test**: User proposes event → Admin approves → Event appears on public calendar  
**Dependencies**: Phase 2 (Authentication) must be complete

### Backend - Event Module

- [x] T076 [US2] Create backend/src/controllers/eventController.js with proposeEvent, getEvents, getPendingEvents, createEvent (admin), updateEvent, deleteEvent, approveEvent, rejectEvent functions
- [x] T077 [US2] Create backend/src/routes/events.js with GET /api/events, GET /api/events/pending, POST /api/events/propose, POST /api/events, PATCH /api/events/:id, DELETE /api/events/:id, PATCH /api/events/:id/approve, PATCH /api/events/:id/reject endpoints
- [x] T078 [US2] Apply RBAC middleware (students/faculty can propose, admins can manage all)
- [x] T079 [US2] Register event routes in backend/src/server.js
- [x] T080 [US2] Implement event notification in backend/src/utils/notifications.js for creation, updates, deletions

### Frontend - Calendar Component

- [x] T081 [P] [US2] Install React Big Calendar: `npm install react-big-calendar`
- [x] T082 [P] [US2] Create frontend/src/services/eventService.js with API calls (getEvents, proposeEvent, createEvent, updateEvent, deleteEvent, approveEvent, rejectEvent)
- [x] T083 [US2] Create frontend/src/pages/EventsPage.jsx with calendar view and event list toggle
- [x] T084 [US2] Create frontend/src/components/events/Calendar.jsx wrapper around React Big Calendar with custom styling
- [x] T085 [US2] Implement event click handler in Calendar to show event details modal
- [x] T086 [US2] Create frontend/src/components/events/EventDetailsModal.jsx to display event info

### Frontend - Event Proposal

- [x] T087 [P] [US2] Create frontend/src/components/events/EventProposalForm.jsx with title, description, date, time, location, facility fields
- [x] T088 [US2] Create frontend/src/components/events/ProposeEventButton.jsx to open EventProposalForm modal
- [x] T089 [US2] Integrate EventProposalForm submission with eventService.proposeEvent API call
- [x] T090 [US2] Display success message after event proposal submission

### Frontend - Admin Calendar Management

- [x] T091 [US2] Create frontend/src/components/events/PendingEventsList.jsx in AdminPage to show pending event proposals
- [x] T092 [US2] Create frontend/src/components/events/EventApprovalModal.jsx with approve/reject/request changes actions
- [x] T093 [US2] Create frontend/src/components/events/EventManagementPanel.jsx for admins to create, edit, delete events directly
- [x] T094 [US2] Implement inline event editing in Calendar for admins (click event → edit modal)
- [x] T095 [US2] Implement event deletion confirmation dialog in Calendar

### Integration & Testing

- [ ] T096 [US2] Manually test event proposal workflow: login as student → propose event → login as admin → approve → verify calendar updated
- [ ] T097 [US2] Manually test admin direct event creation: login as admin → create event → verify appears on calendar for all users
- [ ] T098 [US2] Manually test event editing: login as admin → edit event → verify changes reflected on calendar
- [ ] T099 [US2] Manually test event rejection: login as admin → reject proposal with reason → verify student sees rejection

**Milestone 4**: Event scheduling complete with public calendar and admin workflows

---

## Phase 5: User Story 3 - Maintenance Tracking (Day 10)

**User Story**: Submit and track maintenance requests through resolution  
**Priority**: P1 (Critical)  
**Independent Test**: User submits request → Maintenance staff updates status → User receives completion notification  
**Dependencies**: Phase 2 (Authentication) must be complete

### Backend - Maintenance Module

- [x] T100 [US3] Create backend/src/controllers/maintenanceController.js with createRequest, getRequests, getRequestById, updateRequestStatus functions
- [x] T101 [US3] Create backend/src/routes/maintenance.js with GET /api/maintenance, POST /api/maintenance, GET /api/maintenance/:id, PATCH /api/maintenance/:id/status endpoints
- [x] T102 [US3] Apply RBAC middleware (all authenticated users can create/view own, maintenance staff can view all and update)
- [x] T103 [US3] Register maintenance routes in backend/src/server.js
- [x] T104 [US3] Implement duplicate detection in backend/src/utils/maintenanceDuplicates.js (same facility + similar description)
- [x] T105 [US3] Integrate completion notification in maintenanceController when status changes to "Completed"

### Frontend - Maintenance Request UI

- [x] T106 [P] [US3] Create frontend/src/services/maintenanceService.js with API calls (createRequest, getRequests, updateStatus)
- [x] T107 [US3] Create frontend/src/pages/MaintenancePage.jsx with request form and list view
- [x] T108 [US3] Create frontend/src/components/maintenance/MaintenanceRequestForm.jsx with facility, description, optional image upload fields
- [x] T109 [US3] Create frontend/src/components/maintenance/MaintenanceRequestList.jsx to show user's requests with status badges
- [x] T110 [US3] Create frontend/src/components/maintenance/RequestStatusBadge.jsx with color-coded status display
- [x] T111 [US3] Implement request submission in MaintenanceRequestForm with success feedback

### Frontend - Maintenance Staff Dashboard

- [x] T112 [US3] Create frontend/src/components/maintenance/StaffRequestQueue.jsx to display all requests organized by status
- [x] T113 [US3] Create frontend/src/components/maintenance/RequestDetailsModal.jsx with status update dropdown and comment field
- [x] T114 [US3] Implement status update action in StaffRequestQueue (Pending → In Progress → Completed)
- [x] T115 [US3] Add duplicate warning in MaintenanceRequestForm if similar request exists

### Integration & Testing

- [ ] T116 [US3] Manually test maintenance request lifecycle: login as student → submit request → login as maintenance → update to In Progress → update to Completed → verify student notification
- [ ] T117 [US3] Manually test duplicate detection: submit similar request for same facility → verify warning message
- [ ] T118 [US3] Manually test maintenance dashboard: login as maintenance staff → verify all requests visible → verify status updates work

**Milestone 5**: Maintenance tracking complete and operational

---

## Phase 6: Integration, Testing & Deployment (Days 11-15)

**Purpose**: System integration, manual testing, bug fixes, deployment  
**Goal**: Production-ready MVP accessible via HTTPS

### Cross-Story Integration

- [x] T119 Verify all API endpoints are documented in docs/API.md with request/response examples
- [ ] T120 Test cross-feature workflows: booking facility for event → create event → link event to facility booking
- [x] T121 Implement global error handling in backend/src/middleware/errorHandler.js
- [x] T122 Implement frontend error boundary in frontend/src/components/common/ErrorBoundary.jsx
- [x] T123 Add loading states to all async operations (buttons, pages, modals)
- [x] T124 Implement toast notifications in frontend for success/error messages using react-hot-toast or similar

### Manual Testing (Constitution Compliant)

- [ ] T125 Test all P1 acceptance scenarios from spec.md for US1 (Facility Booking) - 5 scenarios
- [ ] T126 Test all P1 acceptance scenarios from spec.md for US2 (Event Scheduling) - 5 scenarios
- [ ] T127 Test all P1 acceptance scenarios from spec.md for US3 (Maintenance Tracking) - 5 scenarios
- [ ] T128 Test all P1 acceptance scenarios from spec.md for US4 (Authentication) - 5 scenarios
- [ ] T129 Test edge cases from spec.md: SSO down, booking conflicts, maintenance duplicates, invalid inputs
- [ ] T130 Perform role switching test: login as each role → verify correct features visible → verify unauthorized access blocked
- [ ] T131 Test all error scenarios: invalid login, unauthorized access, missing data, server errors
- [ ] T132 Verify response times <3 seconds for all core operations (per NFR-1)

### Bug Fixes & Polish

- [ ] T133 Fix any critical bugs discovered during manual testing (blocking functionality)
- [ ] T134 Fix any major bugs discovered during manual testing (degraded functionality)
- [ ] T135 Add input validation to all forms (frontend + backend)
- [ ] T136 Implement proper error messages for all validation failures
- [ ] T137 Add confirmation dialogs for destructive actions (delete event, reject booking)
- [ ] T138 Ensure consistent styling across all pages using MUI theme

### Deployment Preparation

- [x] T139 Create Dockerfile for frontend in frontend/Dockerfile (multi-stage build for production)
- [x] T140 Create Dockerfile for backend in backend/Dockerfile
- [x] T141 Update docker-compose.yml for production deployment with environment variables
- [x] T142 Create production environment variable templates (.env.production.example)
- [x] T143 Set up PostgreSQL backup strategy (document in docs/DEPLOYMENT.md)
- [x] T144 Configure CORS for production domain in backend/src/server.js
- [ ] T145 Test Docker builds locally: `docker-compose up --build`

### Deployment to Production

- [ ] T146 Deploy PostgreSQL database to cloud (AWS RDS or Azure Database for PostgreSQL)
- [ ] T147 Run Prisma migrations on production database: `npx prisma migrate deploy`
- [ ] T148 Deploy backend to cloud (AWS EC2/ECS or Azure App Service)
- [ ] T149 Deploy frontend to cloud (AWS S3+CloudFront or Azure Static Web Apps)
- [ ] T150 Configure SSL/TLS certificate (Let's Encrypt or cloud provider certificate)
- [ ] T151 Set up custom domain (if available) or use cloud provider URL
- [ ] T152 Verify HTTPS access to production system
- [ ] T153 Run smoke tests on production: login, create booking, view calendar, submit maintenance request

### Documentation & Handoff

- [ ] T154 Update docs/README.md with final setup instructions and prerequisites
- [ ] T155 Create docs/DEPLOYMENT.md with production deployment steps
- [ ] T156 Document all API endpoints in docs/API.md (complete from T119)
- [ ] T157 Create docs/USER_GUIDE.md with screenshots for each user role (1-2 pages)
- [ ] T158 Record demo video (5-10 minutes) showing all P1 user stories in action
- [ ] T159 Create presentation slides for final project submission (20-30 slides)
- [ ] T160 Prepare retrospective notes: what worked, what to improve, lessons learned

**Milestone 6**: MVP deployed to production and documented

---

## Dependencies & Execution Order

### Critical Path (Must Complete in Order)

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational - Auth & RBAC) ← BLOCKING for all user stories
    ↓
    ├─→ Phase 3 (US1 - Booking)
    ├─→ Phase 4 (US2 - Events)      } Can run in parallel
    └─→ Phase 5 (US3 - Maintenance)
    ↓
Phase 6 (Integration & Deployment)
```

### Story Dependencies

- **US1 (Booking)**: No dependencies on other stories (independent)
- **US2 (Events)**: No dependencies on other stories (independent)
- **US3 (Maintenance)**: No dependencies on other stories (independent)
- **US4 (Auth)**: Implemented in Phase 2, blocks all other stories

### Parallel Execution Opportunities

**Within Setup (Phase 1)**:
- Frontend and backend initialization can run in parallel (T002, T003)
- Docker, env files, linting setup can run in parallel (T004-T008)
- Backend utils can be created in parallel (T017, T018)
- Frontend components can be created in parallel (T022-T025)

**Within Foundational (Phase 2)**:
- Frontend auth components can be built while backend auth is being implemented
- Dashboard components for different roles can be built in parallel (T044-T047)

**Across User Stories (Phases 3-5)**:
- After Phase 2 completes, US1, US2, US3 can be developed simultaneously by different team members
- Within each story, frontend and backend tasks with [P] marker can run in parallel

**Example Parallel Execution Plan**:
- **Developer 1**: Backend (T051-T060 for US1)
- **Developer 2**: Frontend (T061-T072 for US1)
- **Developer 3**: Backend (T076-T080 for US2)
- **Developer 4**: Frontend (T081-T095 for US2)

---

## MVP Scope Recommendation

**Suggested MVP (Minimum for Demo)**:
- **Phase 1**: Complete (foundational requirement)
- **Phase 2**: Complete (security requirement)
- **Phase 3**: Complete (US1 - Facility Booking is core value proposition)
- **Phase 4**: Partial (US2 - Public calendar view only, defer event proposals if time-pressed)
- **Phase 5**: Optional (US3 - Maintenance tracking, defer if timeline critical)
- **Phase 6**: Essential (testing and deployment required)

**Fastest MVP Path** (if timeline at risk):
1. Complete Phase 1 (Setup) - 2 days
2. Complete Phase 2 (Auth) - 2 days
3. Complete Phase 3 (US1 Booking) - 3 days
4. Minimal Phase 4 (Calendar view only) - 1 day
5. Complete Phase 6 (Testing & Deploy) - 3 days

**Total**: 11 days (leaves buffer for bug fixes and polish)

---

## Task Summary

**Total Tasks**: 160  
**Setup Tasks**: 28 (T001-T028)  
**Foundational Tasks**: 22 (T029-T050)  
**US1 (Booking) Tasks**: 25 (T051-T075)  
**US2 (Events) Tasks**: 24 (T076-T099)  
**US3 (Maintenance) Tasks**: 19 (T100-T118)  
**Integration & Deployment Tasks**: 42 (T119-T160)

**Parallelizable Tasks**: 47 tasks marked with [P]  
**Independent User Stories**: 3 (US1, US2, US3 can be developed in parallel after Phase 2)

**Constitution Compliance**:
- ✅ MVP-First: Focus on P1 user stories only (US1-US4)
- ✅ Working Software: Manual testing acceptable (T125-T132)
- ✅ Clean Code: No comprehensive test suite required
- ✅ Timeline Priority: 160 tasks for 15 days = ~11 tasks/day (achievable with 4-person team)

---

## Format Validation

All tasks follow the required checklist format:
- ✅ Checkbox prefix `- [ ]`
- ✅ Task ID (T001-T160)
- ✅ [P] marker for parallel tasks
- ✅ [Story] label for user story tasks (US1-US3)
- ✅ Clear description with file paths
- ✅ Organized by phase and user story
- ✅ Dependencies documented
- ✅ Independent test criteria per story

**Ready for implementation**: Start with T001 and proceed sequentially within each phase, leveraging parallel opportunities where marked.

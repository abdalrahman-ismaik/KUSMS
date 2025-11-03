# Implementation Plan: KU Smart Management System (MVP)

**Branch**: `001-kusms-mvp` | **Date**: 2025-11-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-kusms-mvp/spec.md`

## Summary

The KU Smart Management System (KUSMS) is a comprehensive campus management platform that digitizes and streamlines facility booking, event scheduling, maintenance tracking, and user management for Khalifa University. The MVP focuses on delivering core functionality (P1 user stories) within a 3-week timeline, with optional AI enhancements (P2/P3) deferred to post-MVP phase. The system replaces fragmented manual processes with a unified web-based solution that improves efficiency, transparency, and user experience for students, faculty, administrators, and maintenance staff.

**Primary Requirement**: Enable authenticated users to book facilities with admin approval, view/propose events on a centralized calendar, submit and track maintenance requests, and access role-appropriate dashboards.

**Technical Approach**: Modern web application using proven technologies (React/Node.js stack), PostgreSQL database, role-based access control, and Docker deployment. AI features use commercial APIs (OpenAI/Hugging Face) only if P1 scope completes early.

---

## Technical Context

**Language/Version**: JavaScript/TypeScript (ES2022), Node.js 18 LTS, React 18  
**Primary Dependencies**: Express 4.18, React 18, PostgreSQL 15, Prisma ORM 5.x, JWT for auth  
**Storage**: PostgreSQL 15 (relational data: users, bookings, events, maintenance requests)  
**Testing**: Manual testing for MVP (Jest for critical path tests if time permits)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge latest versions), Linux/Windows server  
**Project Type**: Web application (frontend + backend, single repository monorepo)  
**Performance Goals**: <3 second response time for core operations under normal load (10-50 concurrent users)  
**Constraints**: 3-week timeline, AED 2,600-9,000 budget (cloud + APIs), must integrate with university SSO or mock auth  
**Scale/Scope**: MVP for ~500 users (Khalifa University pilot), 50-100 facilities, 200-500 bookings/month

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**MVP-First Validation** (per Constitution v1.0.0):
- [x] Feature delivers clear user value (P1 priority justified)
  - *Core booking, scheduling, maintenance, and auth features are essential campus operations*
- [x] Scope is minimal viable implementation (no gold-plating)
  - *Only P1 user stories required; AI features (P2/P3) explicitly deferred*
- [x] User stories are independently testable
  - *Each story has clear acceptance criteria and can be demonstrated standalone*
- [x] Implementation can complete within timeline constraints
  - *3-week timeline with 4-person team; scope aligned with feasibility study*
- [x] Uses proven technologies (no experimental tools)
  - *React, Node.js, PostgreSQL, Express are mature, well-documented technologies*

**Pre-Deployment Gates**:
- [ ] P1 user stories manually tested and working
- [ ] No critical bugs blocking core functionality  
- [ ] Basic error handling in place

**NOT Required for MVP**:
- ❌ Test coverage thresholds (manual testing acceptable)
- ❌ Performance benchmarks (basic performance acceptable)
- ❌ Comprehensive documentation (README + inline comments only)

---

## Project Structure

### Documentation (this feature)

```text
specs/001-kusms-mvp/
├── plan.md              # This file (implementation plan)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0 technical research (TBD)
├── data-model.md        # Phase 1 database schema design (TBD)
├── quickstart.md        # Phase 1 setup instructions (TBD)
├── contracts/           # Phase 1 API endpoint specifications (TBD)
└── tasks.md             # Phase 2 task breakdown (TBD)
```

### Source Code (repository root)

**Option 1: Monorepo (RECOMMENDED for MVP)**

```text
kusms/
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── common/  # Buttons, inputs, modals
│   │   │   ├── booking/ # Booking-related components
│   │   │   ├── events/  # Event calendar components
│   │   │   └── maintenance/ # Maintenance request components
│   │   ├── pages/       # Top-level route pages
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── MaintenancePage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── services/    # API client functions
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Helper functions
│   │   └── App.jsx      # Main app component
│   ├── public/
│   └── package.json
│
├── backend/             # Node.js/Express API
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   │   ├── auth.js  # Authentication endpoints
│   │   │   ├── bookings.js
│   │   │   ├── events.js
│   │   │   ├── maintenance.js
│   │   │   └── users.js
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth, validation, error handling
│   │   ├── models/      # Prisma models (auto-generated)
│   │   ├── utils/       # Helper functions
│   │   └── server.js    # Express app setup
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── tests/           # Optional: critical path tests
│   └── package.json
│
├── docs/                # Minimal documentation
│   ├── README.md        # Setup + deployment instructions
│   └── API.md           # API endpoint reference (optional)
│
├── docker-compose.yml   # Local dev environment
├── .env.example         # Environment variable template
└── README.md            # Project overview
```

**Rationale for Monorepo**:
- Simpler for 3-week MVP timeline
- Single git repository reduces coordination overhead
- Frontend and backend can share TypeScript types (if using TS)
- Easier deployment with Docker Compose

---

## Phase 0: Research (2-3 hours)

**Goals**: Identify implementation patterns, validate technology choices, explore SSO integration options

### Research Topics

1. **SSO Integration Options**
   - Can we integrate with Khalifa University's actual SSO? (likely CAS or SAML)
   - If not available: Mock authentication with JWT tokens (email/password)
   - Research: Passport.js strategies for SSO vs. custom JWT implementation

2. **Database Schema Design**
   - Entities: Users, Roles, Facilities, Bookings, Events, MaintenanceRequests
   - Relationships: Users have Bookings, Events, MaintenanceRequests; Facilities have Bookings; Events reference Facilities
   - Research: Prisma ORM schema patterns, best practices for status enums (Pending/Approved/Rejected)

3. **Frontend Architecture**
   - React Router v6 for navigation (role-based route protection)
   - State management: Context API (sufficient for MVP) vs. Redux (overkill for MVP)
   - UI library: Material-UI (MUI) or Ant Design for rapid development vs. custom CSS

4. **Deployment Strategy**
   - Docker Compose for local development (frontend + backend + PostgreSQL)
   - Production: University servers (if available) or AWS/Azure education credits
   - CI/CD: Basic GitHub Actions for automated deployment (optional)

5. **Calendar Component**
   - Full calendar view: React Big Calendar library (mature, well-documented)
   - Alternative: FullCalendar.io React wrapper
   - Must support: Event display, date selection, month/week/day views

### Research Deliverables

Create `research.md` with:
- Decision matrix for SSO vs. mock auth (pros/cons, timeline impact)
- Database schema draft (ERD diagram optional, text description sufficient)
- Frontend architecture recommendation (Context API vs. Redux, UI library choice)
- Deployment approach (Docker setup, hosting platform)
- Calendar library comparison (React Big Calendar vs. FullCalendar)

---

## Phase 1: Design (1-2 days)

**Goals**: Finalize data model, define API contracts, create quickstart guide

### 1.1 Data Model Design

Create `data-model.md` with Prisma schema for:

**Core Entities** (P1):
- `User` (id, email, name, role, passwordHash, createdAt, updatedAt)
- `Role` (enum: STUDENT, FACULTY, ADMIN, MAINTENANCE)
- `Facility` (id, name, type, capacity, location, description)
- `Booking` (id, userId, facilityId, startTime, endTime, purpose, status, adminNotes, createdAt)
- `BookingStatus` (enum: PENDING, APPROVED, REJECTED)
- `Event` (id, title, description, startTime, endTime, location, creatorId, status, createdAt)
- `EventStatus` (enum: DRAFT, PENDING, APPROVED, PUBLISHED, REJECTED)
- `MaintenanceRequest` (id, userId, facilityId, description, status, assignedTo, completedAt, createdAt)
- `MaintenanceStatus` (enum: PENDING, IN_PROGRESS, ON_HOLD, COMPLETED)

**Relationships**:
- User `has many` Bookings, Events, MaintenanceRequests
- Facility `has many` Bookings
- Event `references` Facility (optional, for events with location)
- MaintenanceRequest `references` Facility, assigned to User (maintenance staff)

**Indexes** (for performance):
- Booking: facilityId + startTime, userId + createdAt
- Event: startTime, status
- MaintenanceRequest: facilityId, assignedTo, status

### 1.2 API Contract Design

Create `contracts/` folder with endpoint specifications:

**auth.md** (Authentication):
- `POST /api/auth/login` - Login with email/password, returns JWT token
- `POST /api/auth/logout` - Invalidate token
- `GET /api/auth/me` - Get current user info

**bookings.md** (Facility Booking):
- `GET /api/bookings` - List user's bookings (student/faculty) or all bookings (admin)
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking request (auto status: PENDING)
- `PATCH /api/bookings/:id/approve` - Approve booking (admin only)
- `PATCH /api/bookings/:id/reject` - Reject booking (admin only)
- `GET /api/facilities` - List all facilities with availability
- `GET /api/facilities/:id/availability` - Check conflicts for date range

**events.md** (Event Scheduling):
- `GET /api/events` - List all published events (calendar view)
- `GET /api/events/pending` - List pending event proposals (admin only)
- `POST /api/events/propose` - Submit event proposal (student/faculty)
- `POST /api/events` - Create event directly (admin only)
- `PATCH /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)
- `PATCH /api/events/:id/approve` - Approve proposal (admin only)
- `PATCH /api/events/:id/reject` - Reject proposal (admin only)

**maintenance.md** (Maintenance Requests):
- `GET /api/maintenance` - List user's requests (student/faculty) or all requests (maintenance staff)
- `GET /api/maintenance/:id` - Get request details
- `POST /api/maintenance` - Submit maintenance request
- `PATCH /api/maintenance/:id/status` - Update status (maintenance staff only)

**users.md** (User Management - Admin):
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user details
- `PATCH /api/users/:id/role` - Update user role (admin only)

### 1.3 Quickstart Guide

Create `quickstart.md` with:
- Prerequisites (Node.js 18, Docker, Git)
- Clone repository instructions
- Environment setup (`.env` file with DATABASE_URL, JWT_SECRET)
- Database setup (`npx prisma migrate dev`)
- Seed data script (sample users, facilities)
- Run development servers (frontend: `npm run dev`, backend: `npm run dev`)
- Access application (http://localhost:3000)
- Test user credentials (student, faculty, admin, maintenance)

---

## Phase 2: Task Breakdown

**Output**: `tasks.md` file with granular implementation tasks

Tasks will be organized by user story (US1-US4 for P1, US5-US7 for P2/P3) to enable independent development and testing.

**Task Structure**:
- Phase 1: Setup (shared infrastructure)
- Phase 2: US1 - Facility Booking (P1)
- Phase 3: US2 - Event Scheduling (P1)
- Phase 4: US3 - Maintenance Tracking (P1)
- Phase 5: US4 - Authentication & Roles (P1)
- Phase 6: Integration & Testing (P1)
- Phase 7: US5 - AI Assistant (P2 - optional)
- Phase 8: US6/US7 - Analytics (P3 - optional)

See `/speckit.tasks` command for detailed task generation.

---

## Implementation Strategy

### Week 1: Foundation (Days 1-5)

**Priority**: Database + Authentication + Basic UI

**Days 1-2: Setup & Database**
- Project initialization (frontend + backend scaffolding)
- Docker Compose setup (PostgreSQL + backend + frontend)
- Prisma schema definition (all entities)
- Database migrations and seed data
- Basic Express server with health check endpoint

**Days 3-4: Authentication System**
- JWT authentication middleware
- Login/logout endpoints
- Role-based access control (RBAC) middleware
- Frontend: Login page, protected routes, auth context
- Test: Users can log in and see role-appropriate dashboards

**Day 5: UI Foundation**
- React Router setup with role-based navigation
- Layout components (header, sidebar, main content)
- Dashboard pages for each role (empty placeholders)
- Responsive CSS framework (MUI or Ant Design)

**Milestone 1**: Users can log in, see personalized dashboards, navigate between pages

---

### Week 2: Core Features (Days 6-10)

**Priority**: Booking + Events + Maintenance (P1 user stories)

**Days 6-7: Facility Booking (US1)**
- Backend: Booking endpoints (create, list, approve, reject)
- Backend: Conflict detection logic
- Backend: Notification system (basic email or in-app alerts)
- Frontend: Booking form with facility selection, date/time pickers
- Frontend: Booking list view (user's bookings)
- Frontend: Admin approval interface
- Test: Complete booking workflow (request → admin approval → notification)

**Days 8-9: Event Scheduling (US2)**
- Backend: Event endpoints (create, list, propose, approve, reject)
- Frontend: Calendar component (React Big Calendar)
- Frontend: Event proposal form (student/faculty)
- Frontend: Calendar management interface (admin)
- Test: Event lifecycle (proposal → admin approval → public calendar)

**Day 10: Maintenance Tracking (US3)**
- Backend: Maintenance request endpoints (create, list, update status)
- Frontend: Maintenance request form
- Frontend: Request tracking page (user view)
- Frontend: Maintenance dashboard (staff view)
- Test: Request workflow (submit → staff updates → completion notification)

**Milestone 2**: All P1 user stories (US1-US4) implemented and manually tested

---

### Week 3: Integration & Polish (Days 11-15)

**Priority**: Testing + Bug fixes + Deployment

**Days 11-12: Integration Testing**
- End-to-end manual testing of all P1 user stories
- Role switching tests (student → admin → maintenance)
- Edge case handling (conflicts, duplicates, invalid inputs)
- Bug fixes and error handling improvements

**Days 13-14: Deployment Preparation**
- Docker production build (multi-stage Dockerfile)
- Environment configuration (production DATABASE_URL, secrets)
- Deploy to university server or cloud (AWS/Azure)
- SSL/TLS setup (HTTPS)
- Smoke testing on production

**Day 15: Documentation & Handoff**
- Update README with deployment instructions
- Record demo video (5-10 minutes showing all P1 features)
- Create user guide (1-2 pages with screenshots)
- Retrospective meeting (what worked, what to improve)

**Milestone 3**: MVP deployed and accessible to test users

---

### Optional: Week 4 (If Time Permits)

**Priority**: P2 features (AI Assistant, Dashboards)

**AI Assistant (US5)**:
- Integrate OpenAI API or Hugging Face
- Chat interface component
- Natural language query processing (booking, events, FAQs)
- Fallback to manual navigation if AI unavailable

**Personalized Dashboards (US6)**:
- Student dashboard: Upcoming bookings, events, class schedule
- Maintenance dashboard: Assigned tasks, priority requests
- Admin dashboard: Pending approvals, system stats

**Only implement if P1 scope completes ahead of schedule**

---

## Risk Management

### High-Priority Risks

**Risk 1: Timeline Overrun**
- **Likelihood**: Medium | **Impact**: Critical
- **Mitigation**: 
  - Daily standups to identify blockers early
  - Cut P2/P3 features immediately if P1 slips
  - Pair programming for complex features (booking conflicts, RBAC)
- **Contingency**: If Week 2 slips, skip US3 (Maintenance) temporarily, focus on US1+US2

**Risk 2: SSO Integration Complexity**
- **Likelihood**: High | **Impact**: High
- **Mitigation**:
  - Start with mock authentication (email/password + JWT)
  - Research actual SSO options in parallel (Phase 0)
  - Integrate real SSO only if mock auth completes early
- **Contingency**: Use mock auth for MVP, document SSO integration for post-MVP

**Risk 3: Team Coordination**
- **Likelihood**: Medium | **Impact**: Medium
- **Mitigation**:
  - Clear task ownership (frontend/backend split)
  - API contracts defined early (Phase 1)
  - Shared Figma/design doc for UI consistency
- **Contingency**: Reduce parallel work, implement features sequentially if coordination issues

### Medium-Priority Risks

**Risk 4: Database Schema Changes**
- **Likelihood**: Low | **Impact**: Medium
- **Mitigation**: Start with comprehensive schema design (Phase 1), minimize changes
- **Contingency**: Prisma migrations handle schema evolution gracefully

**Risk 5: UI/UX Complexity**
- **Likelihood**: Low | **Impact**: Low
- **Mitigation**: Use UI library (MUI/Ant Design) for consistent components
- **Contingency**: Focus on functional UI over aesthetic polish (per Constitution)

---

## Success Metrics

### MVP Success (Required for P1)

**Functional Metrics**:
- ✅ All 4 P1 user stories implemented and working
- ✅ Users can complete core workflows without errors
- ✅ Role-based access control enforces security boundaries
- ✅ System deployed and accessible via HTTPS

**Quality Metrics** (Per Constitution: Manual testing acceptable):
- ✅ Zero critical bugs (blocking core functionality)
- ✅ Basic error handling (no silent failures)
- ✅ Response time <3 seconds for 90% of operations

**Documentation Metrics**:
- ✅ README with setup instructions
- ✅ API endpoint reference (if using Postman/Swagger)
- ✅ Demo video or presentation slides

### Extended Success (P2/P3 - Optional)

- 🎯 AI assistant can answer basic queries
- 🎯 Personalized dashboards enhance UX
- 🎯 Basic analytics reports (if data available)

---

## Dependencies & Prerequisites

### External Dependencies

**Required**:
- Node.js 18 LTS (team must install)
- PostgreSQL 15 (via Docker or managed service)
- Git & GitHub (version control, collaboration)
- Docker Desktop (for local development)

**Optional**:
- University SSO system (fallback: mock auth)
- AWS/Azure education credits (fallback: free tier or university servers)
- OpenAI API key (P2 only, fallback: skip AI features)

### Internal Dependencies

**Blocking Dependencies**:
1. Database schema (Phase 1) → All features depend on this
2. Authentication system (Week 1) → Must complete before any role-specific features
3. API contracts (Phase 1) → Frontend/backend teams work in parallel after this

**Non-Blocking Dependencies**:
- Calendar library choice (can swap later if needed)
- UI library choice (MUI vs. Ant Design, minimal refactor if changed)
- Deployment platform (local dev works independently)

---

## Team Roles & Responsibilities

**Project Manager** (Abd Alrahman & Maher):
- Daily standup coordination
- Scope management (enforce P1 focus)
- Stakeholder communication
- Risk tracking

**Requirement Analysts** (Abdullah & Maher):
- Phase 0 research
- Phase 1 design (data model, API contracts)
- User acceptance testing

**Lead Developer** (Maher Abdul Gafoor & Abdullah):
- Architecture decisions (tech stack, folder structure)
- Code review (quality gates)
- Complex feature implementation (RBAC, conflict detection)

**Frontend Developers** (Habtamu Tenaw & Abd Alrahman):
- React components, pages, routing
- UI/UX implementation (forms, calendar, dashboards)
- Frontend state management

**Backend Developers** (Assign from team):
- Express API endpoints
- Database queries (Prisma ORM)
- Business logic, validation, error handling

**AI/Data Engineer** (Habtamu & Abd Alrahman - P2 only):
- AI assistant integration (if time permits)
- Predictive analytics (P3, likely post-MVP)

**QA Tester** (All team members):
- Manual testing of acceptance scenarios
- Bug reporting and verification
- Edge case exploration

---

## Next Steps

1. **Approve this plan** with team and stakeholders (30 minutes)
2. **Execute Phase 0 research** (2-3 hours, assign to Requirement Analysts)
3. **Complete Phase 1 design** (1-2 days, collaborative)
4. **Generate task breakdown** (`/speckit.tasks` command)
5. **Begin Week 1 implementation** (Setup + Database + Auth)

**Critical Success Factor**: Maintain ruthless focus on P1 user stories. Every feature decision should pass the Constitution Check: "Does this deliver working MVP functionality within 3 weeks?"

---

## Appendix: Technology Justification

### Why React?
- Team familiarity (COSC 230 OOP experience)
- Large ecosystem (UI libraries, calendar components)
- Fast development for dynamic UIs (forms, dashboards)

### Why Node.js/Express?
- JavaScript full-stack (shared language with frontend)
- Mature ecosystem (passport, JWT, nodemailer)
- Lightweight, suitable for API-driven architecture

### Why PostgreSQL?
- Relational data model fits well (users, bookings, events)
- ACID compliance for transactional integrity (booking conflicts)
- Widely supported, reliable, free

### Why Prisma ORM?
- Type-safe database queries (reduces bugs)
- Excellent migration system (schema evolution)
- Auto-generated client (faster development)

### Why Docker?
- Consistent dev environment across team
- Easy PostgreSQL setup (no manual DB installation)
- Production deployment ready

**All choices align with Constitution principle: Proven technologies, no experimental tools**

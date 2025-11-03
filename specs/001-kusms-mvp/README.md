# KU Smart Management System (KUSMS) - MVP Specification

**Project**: Smart, AI-Driven Sustainable Campus Management System  
**Team**: Khalifa University COSC 336 Project  
**Timeline**: 3 weeks (November 3 - November 24, 2025)  
**Constitution**: v1.0.0 (MVP-First Development)

---

## 📋 Quick Navigation

### Core Documents

1. **[spec.md](./specs/001-kusms-mvp/spec.md)** - Feature Specification
   - User stories prioritized by importance (P1/P2/P3)
   - Functional & non-functional requirements
   - Acceptance criteria for all features
   - Success metrics and scope boundaries

2. **[plan.md](./specs/001-kusms-mvp/plan.md)** - Implementation Plan
   - Technical architecture and technology stack
   - 3-week development timeline
   - Risk management strategy
   - Team roles and responsibilities

3. **[constitution.md](./.specify/memory/constitution.md)** - Project Constitution
   - MVP-first development principles
   - Quality gates (minimal for speed)
   - Governance and decision-making rules

---

## 🎯 MVP Scope (Priority 1 - Required)

### Must-Have Features (3-week deadline)

**User Story 1: Facility Booking** ✅ Critical
- Students/faculty book facilities (classrooms, labs, sports)
- Automatic conflict detection
- Admin approval workflow
- Notifications on booking status

**User Story 2: Event Scheduling & Calendar** ✅ Critical
- Centralized university calendar
- Event proposal submission (students/faculty)
- Admin calendar management
- Public calendar view for all users

**User Story 3: Maintenance Request Tracking** ✅ Critical
- Submit facility issue reports
- Status tracking (Pending → In Progress → Completed)
- Maintenance staff dashboard
- Requester notifications

**User Story 4: Authentication & Role Management** ✅ Critical
- SSO integration (or mock auth for MVP)
- Role-based access control (Student, Faculty, Admin, Maintenance)
- Personalized dashboards per role

---

## 🚀 Extended Features (Priority 2/3 - Optional)

**Only implement if P1 completes ahead of schedule**

**User Story 5: AI Assistant** (P2)
- Natural language query interface
- Booking assistance
- FAQ answering

**User Story 6: Resource Analytics** (P3)
- Energy/water usage reports
- Predictive forecasting
- Conservation recommendations

**User Story 7: Space Utilization** (P3)
- Booking pattern analysis
- Underutilized facility identification
- Optimization suggestions

---

## 🛠️ Technology Stack (Proven, No Experiments)

### Frontend
- **Framework**: React 18 with React Router v6
- **UI Library**: Material-UI (MUI) or Ant Design
- **State Management**: Context API (Redux if needed)
- **Calendar**: React Big Calendar

### Backend
- **Runtime**: Node.js 18 LTS
- **Framework**: Express 4.18
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5.x
- **Auth**: JWT tokens

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: University servers or AWS/Azure (education credits)
- **Version Control**: Git & GitHub

---

## 📅 3-Week Timeline

### Week 1: Foundation (Days 1-5)
- **Day 1-2**: Project setup, database schema, Docker environment
- **Day 3-4**: Authentication system (login, RBAC middleware)
- **Day 5**: UI foundation (routing, layouts, dashboards)
- **Milestone 1**: Users can log in and see role-appropriate dashboards

### Week 2: Core Features (Days 6-10)
- **Day 6-7**: Facility booking (US1) - complete workflow
- **Day 8-9**: Event scheduling (US2) - calendar + proposals
- **Day 10**: Maintenance tracking (US3) - request lifecycle
- **Milestone 2**: All P1 user stories implemented

### Week 3: Integration & Deployment (Days 11-15)
- **Day 11-12**: Manual testing, bug fixes, error handling
- **Day 13-14**: Production deployment, SSL setup
- **Day 15**: Documentation, demo video, presentation
- **Milestone 3**: MVP deployed and accessible

### Optional Week 4: Enhancements (If Time Permits)
- AI assistant integration (P2)
- Personalized dashboards (P2)
- Basic analytics (P3)

---

## ✅ Constitution Compliance

**MVP-First Development** ✅
- Focus on P1 user stories exclusively
- Defer nice-to-haves (AI features) to post-MVP
- Ship working increments independently

**Clean Code Over Documentation** ✅
- Self-documenting code (clear naming, simple logic)
- Minimal comments (only "why", not "what")
- README + inline comments sufficient (no comprehensive docs)

**Working Software Over Testing** ✅
- Manual testing of acceptance scenarios
- Automated tests only for critical paths (optional)
- No test coverage requirements

**3-Week Timeline Priority** ✅
- Ruthless scope cuts if needed
- Daily standups to identify blockers
- Constitution gates prevent scope creep

---

## 👥 Team Assignments

| Role | Team Member(s) | Responsibilities |
|------|----------------|------------------|
| **Project Manager** | Abd Alrahman & Maher | Coordination, scope management, stakeholder communication |
| **Requirements Analyst** | Abdullah & Maher | Research, design, user acceptance testing |
| **Lead Developer** | Maher Abdul Gafoor & Abdullah | Architecture, code review, complex features |
| **Frontend Dev** | Habtamu Tenaw & Abd Alrahman | React components, UI/UX, routing |
| **Backend Dev** | (Assign from team) | Express API, database, business logic |
| **AI/Data Engineer** | Habtamu & Abd Alrahman | AI features (P2 only, if time permits) |
| **QA Tester** | All team members | Manual testing, bug reporting |

---

## 📊 Success Criteria

### MVP Success (Required)
- ✅ All 4 P1 user stories implemented and working
- ✅ Users can complete core workflows without errors
- ✅ Role-based access control enforces security
- ✅ System deployed and accessible via HTTPS
- ✅ Zero critical bugs blocking functionality
- ✅ Response time <3 seconds for 90% of operations

### Documentation Success
- ✅ README with setup instructions
- ✅ API endpoint reference (contracts/)
- ✅ Demo video or presentation (5-10 minutes)

---

## 🚨 Risk Management

### Top 3 Risks

**1. Timeline Overrun** (Medium likelihood, Critical impact)
- **Mitigation**: Daily standups, ruthless P1 focus, pair programming
- **Contingency**: Cut US3 (Maintenance) temporarily if Week 2 slips

**2. SSO Integration Complexity** (High likelihood, High impact)
- **Mitigation**: Start with mock auth (email/password + JWT)
- **Contingency**: Use mock auth for MVP, document real SSO for post-MVP

**3. Team Coordination** (Medium likelihood, Medium impact)
- **Mitigation**: Clear task ownership, API contracts defined early
- **Contingency**: Reduce parallel work, sequential implementation

---

## 🎯 Next Steps

1. **Review & Approve** - Team meeting to review spec.md and plan.md (30 min)
2. **Phase 0 Research** - Technical research on SSO, database design (2-3 hours)
3. **Phase 1 Design** - Finalize data model, API contracts, quickstart guide (1-2 days)
4. **Task Breakdown** - Generate tasks.md using `/speckit.tasks` command
5. **Begin Implementation** - Week 1, Day 1: Project setup and database

---

## 📁 Document Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| constitution.md | ✅ Complete | 2025-11-03 |
| spec.md | ✅ Complete | 2025-11-03 |
| plan.md | ✅ Complete | 2025-11-03 |
| research.md | ⏳ Pending | Phase 0 |
| data-model.md | ⏳ Pending | Phase 1 |
| quickstart.md | ⏳ Pending | Phase 1 |
| contracts/ | ⏳ Pending | Phase 1 |
| tasks.md | ⏳ Pending | Phase 2 |

---

## 💡 Key Principles to Remember

1. **MVP First**: If it's not P1, it's not required
2. **Working Software**: Ship features, not perfection
3. **Clean Code**: Self-documenting, simple logic
4. **Timeline Wins**: Cut scope, not quality
5. **Test Manually**: Automated tests are optional
6. **Document Lightly**: README + comments, not novels

---

## 🔗 Additional Resources

- **Constitution**: `.specify/memory/constitution.md` - Development principles
- **Templates**: `.specify/templates/` - Spec, plan, task templates
- **Phase 1 Deliverable**: Requirements Document (already provided)
- **Phase 2 Deliverable**: Feasibility Study (already provided)
- **Phase 3 Deliverable**: Requirements Specification (already provided)

---

**Ready to build?** Start with Phase 0 research, then dive into Week 1 implementation! 🚀

**Questions?** Review the constitution for decision-making guidance or discuss with project managers.

**Scope Creep Alert?** Ask: "Is this P1? Does it deliver MVP value? Can we do it in 3 weeks?" If no, defer it.

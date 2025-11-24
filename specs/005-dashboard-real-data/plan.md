# Implementation Plan: Dashboard Real Data Implementation

**Branch**: `005-dashboard-real-data` | **Date**: 2025-11-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-dashboard-real-data/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement real-time data fetching for Admin, Student, and Maintenance dashboards. This involves creating a new backend API endpoint (`/api/dashboard/stats`) to aggregate data from `User`, `Booking`, `Facility`, `MaintenanceRequest`, and `Event` models, and updating frontend dashboard components to consume this API instead of using mock data.

## Technical Context

**Language/Version**: Node.js (Backend), TypeScript/React (Frontend)
**Primary Dependencies**: Express, Prisma, React, Material UI
**Storage**: SQLite (via Prisma)
**Testing**: Manual testing per Constitution
**Target Platform**: Web
**Project Type**: Web application
**Performance Goals**: Dashboard load < 2s
**Constraints**: Must use existing authentication context
**Scale/Scope**: ~5 dashboard components, 1 new API controller

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**MVP-First Validation** (per Constitution v1.0.0):
- [x] Feature delivers clear user value (P1 priority justified)
- [x] Scope is minimal viable implementation (no gold-plating)
- [x] User stories are independently testable
- [x] Implementation can complete within timeline constraints
- [x] Uses proven technologies (no experimental tools)

**Pre-Deployment Gates**:
- [ ] P1 user stories manually tested and working
- [ ] No critical bugs blocking core functionality  
- [ ] Basic error handling in place

**NOT Required for MVP**:
- ❌ Test coverage thresholds
- ❌ Performance benchmarks
- ❌ Comprehensive documentation

## Project Structure

### Documentation (this feature)

```text
specs/005-dashboard-real-data/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── controllers/
│   │   └── dashboardController.js  # NEW: Aggregates stats
│   ├── routes/
│   │   └── dashboard.js            # NEW: API routes
│   └── server.js                   # UPDATE: Register new route
frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.tsx       # UPDATE: Fetch real data
│   │   │   ├── StudentDashboard.tsx     # UPDATE: Fetch real data
│   │   │   └── MaintenanceDashboard.tsx # UPDATE: Fetch real data
│   │   └── common/
│   │       └── StatCard.tsx             # CHECK: Ensure dynamic props
│   └── services/
│       └── dashboardService.ts          # NEW: API client
```

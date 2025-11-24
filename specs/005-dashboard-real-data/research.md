# Research: Dashboard Real Data Implementation

**Feature**: Dashboard Real Data
**Status**: Complete

## Decisions

### 1. API Endpoint Structure
**Decision**: Use a single endpoint `/api/dashboard/stats` that returns different data based on the authenticated user's role.
**Rationale**: Simplifies the frontend logic. The client doesn't need to know which specific endpoints to call; it just asks for "stats" and the backend provides the relevant context.
**Alternatives Considered**:
- Separate endpoints per role (e.g., `/api/admin/stats`, `/api/student/stats`). Rejected because it leaks role logic to the API surface more than necessary and requires frontend to switch endpoints.

### 2. Data Aggregation Strategy
**Decision**: Use `Promise.all` to execute independent Prisma queries in parallel within the controller.
**Rationale**: Minimizes response time. The counts (users, bookings, etc.) are independent and can be fetched concurrently.
**Performance**: SQLite handles concurrent reads well enough for this scale.

### 3. Frontend State Management
**Decision**: Use local state (`useState`, `useEffect`) in each Dashboard component.
**Rationale**: Global state (Context/Redux) is overkill for dashboard stats that are read-only and refreshed on page load.

## Unknowns Resolved
- **API Structure**: Defined as role-based response.
- **Data Sources**: All data is available via existing Prisma models.

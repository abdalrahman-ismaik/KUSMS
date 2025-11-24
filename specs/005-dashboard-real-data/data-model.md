# Data Model: Dashboard Real Data

**Feature**: Dashboard Real Data

## Entities

No new database entities are required. This feature aggregates data from existing entities.

### Read-Only Views (API Responses)

#### Admin Stats
```typescript
interface AdminStats {
  totalUsers: number;
  pendingApprovals: number;
  activeBookings: number;
  totalFacilities: number;
  recentActivity: Array<{
    id: string;
    type: 'BOOKING' | 'EVENT' | 'MAINTENANCE';
    title: string; // e.g., "Room B101 Booking"
    status: string;
    date: string;
  }>;
}
```

#### Student Stats
```typescript
interface StudentStats {
  activeBookings: number;
  upcomingEvents: number;
}
```

#### Maintenance Stats
```typescript
interface MaintenanceStats {
  pendingRequests: number;
  assignedTasks: number;
}
```

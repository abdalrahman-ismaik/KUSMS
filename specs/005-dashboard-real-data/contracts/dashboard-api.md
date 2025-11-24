# API Contract: Dashboard Stats

**Endpoint**: `GET /api/dashboard/stats`
**Auth**: Required (Any Role)

## Request
- Headers: `Authorization: Bearer <token>`

## Response

### 200 OK (Admin)
```json
{
  "stats": {
    "totalUsers": 248,
    "pendingApprovals": 5,
    "activeBookings": 42,
    "totalFacilities": 15,
    "recentActivity": [
      {
        "id": "1",
        "type": "BOOKING",
        "title": "Room B101 - John Doe",
        "status": "PENDING",
        "date": "2025-11-24T10:00:00Z"
      }
    ]
  }
}
```

### 200 OK (Student)
```json
{
  "stats": {
    "activeBookings": 2,
    "upcomingEvents": 3
  }
}
```

### 200 OK (Maintenance)
```json
{
  "stats": {
    "pendingRequests": 4,
    "assignedTasks": 1
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch dashboard stats"
}
```

# KUSMS API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### POST /api/auth/login

Login with email and password.

**Request Body:**
```json
{
  "email": "student@ku.ac.ae",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "student@ku.ac.ae",
    "name": "Test Student",
    "role": "STUDENT"
  }
}
```

### POST /api/auth/logout

Logout current user (invalidates token).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### GET /api/auth/me

Get current authenticated user.

**Response (200):**
```json
{
  "id": "uuid",
  "email": "student@ku.ac.ae",
  "name": "Test Student",
  "role": "STUDENT"
}
```

---

## Bookings

### GET /api/bookings

List bookings (user's own bookings for students/faculty, all bookings for admins).

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, APPROVED, REJECTED)
- `startDate` (optional): Filter by start date (ISO 8601)
- `endDate` (optional): Filter by end date (ISO 8601)

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "facilityId": "uuid",
    "startTime": "2025-11-11T10:00:00.000Z",
    "endTime": "2025-11-11T12:00:00.000Z",
    "purpose": "COSC 336 Project Meeting",
    "status": "PENDING",
    "adminNotes": null,
    "createdAt": "2025-11-10T12:00:00.000Z",
    "user": {
      "name": "Test Student",
      "email": "student@ku.ac.ae"
    },
    "facility": {
      "name": "Innovation Lab",
      "type": "Lab",
      "location": "Building A, Floor 2"
    }
  }
]
```

### GET /api/bookings/:id

Get booking by ID.

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "facilityId": "uuid",
  "startTime": "2025-11-11T10:00:00.000Z",
  "endTime": "2025-11-11T12:00:00.000Z",
  "purpose": "COSC 336 Project Meeting",
  "status": "PENDING",
  "adminNotes": null,
  "user": { ... },
  "facility": { ... }
}
```

### POST /api/bookings

Create a new booking request.

**Request Body:**
```json
{
  "facilityId": "uuid",
  "startTime": "2025-11-11T10:00:00.000Z",
  "endTime": "2025-11-11T12:00:00.000Z",
  "purpose": "Team meeting for project"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "status": "PENDING",
  "message": "Booking request created successfully"
}
```

**Error (409) - Conflict:**
```json
{
  "error": "Booking conflict detected",
  "conflicts": [
    {
      "id": "uuid",
      "startTime": "2025-11-11T09:00:00.000Z",
      "endTime": "2025-11-11T11:00:00.000Z"
    }
  ],
  "suggestions": [
    {
      "startTime": "2025-11-11T12:00:00.000Z",
      "endTime": "2025-11-11T14:00:00.000Z"
    }
  ]
}
```

### PATCH /api/bookings/:id/approve

Approve a booking (Admin only).

**Request Body:**
```json
{
  "adminNotes": "Approved for project work"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "APPROVED",
  "message": "Booking approved successfully"
}
```

### PATCH /api/bookings/:id/reject

Reject a booking (Admin only).

**Request Body:**
```json
{
  "adminNotes": "Facility already booked for another event"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "REJECTED",
  "message": "Booking rejected"
}
```

---

## Facilities

### GET /api/facilities

List all facilities.

**Query Parameters:**
- `type` (optional): Filter by facility type

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Innovation Lab",
    "type": "Lab",
    "capacity": 30,
    "location": "Building A, Floor 2",
    "description": "Computer lab with latest equipment"
  }
]
```

### GET /api/facilities/:id

Get facility by ID.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Innovation Lab",
  "type": "Lab",
  "capacity": 30,
  "location": "Building A, Floor 2",
  "description": "Computer lab with latest equipment",
  "bookings": [ ... ]
}
```

### GET /api/facilities/:id/availability

Check facility availability for a date range.

**Query Parameters:**
- `startDate` (required): Start date (ISO 8601)
- `endDate` (required): End date (ISO 8601)

**Response (200):**
```json
{
  "facilityId": "uuid",
  "available": false,
  "conflicts": [
    {
      "startTime": "2025-11-11T10:00:00.000Z",
      "endTime": "2025-11-11T12:00:00.000Z",
      "purpose": "Existing booking"
    }
  ],
  "suggestions": [
    {
      "startTime": "2025-11-11T14:00:00.000Z",
      "endTime": "2025-11-11T16:00:00.000Z"
    }
  ]
}
```

---

## Events

### GET /api/events

List all published events (or all events for admins).

**Query Parameters:**
- `status` (optional): Filter by status (Admin only)
- `startDate` (optional): Filter by start date
- `endDate` (optional): Filter by end date

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Tech Talk: AI in Education",
    "description": "Guest speaker discussing AI applications",
    "startTime": "2025-11-17T14:00:00.000Z",
    "endTime": "2025-11-17T16:00:00.000Z",
    "location": "Lecture Hall 101",
    "status": "PUBLISHED",
    "creator": {
      "name": "Dr. Test Faculty"
    }
  }
]
```

### GET /api/events/pending

List pending event proposals (Admin only).

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Student Tech Club Meeting",
    "status": "PENDING",
    "creator": { ... }
  }
]
```

### POST /api/events/propose

Submit an event proposal (Student/Faculty).

**Request Body:**
```json
{
  "title": "Tech Workshop",
  "description": "Hands-on coding workshop",
  "startTime": "2025-11-20T14:00:00.000Z",
  "endTime": "2025-11-20T16:00:00.000Z",
  "location": "Innovation Lab",
  "facilityId": "uuid"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "status": "PENDING",
  "message": "Event proposal submitted for review"
}
```

### POST /api/events

Create an event directly (Admin only).

**Request Body:**
```json
{
  "title": "University Open Day",
  "description": "Annual open day event",
  "startTime": "2025-12-01T09:00:00.000Z",
  "endTime": "2025-12-01T17:00:00.000Z",
  "location": "Main Campus"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "status": "PUBLISHED",
  "message": "Event created successfully"
}
```

---

## Maintenance

### GET /api/maintenance

List maintenance requests.

**Query Parameters:**
- `status` (optional): Filter by status
- `assignedTo` (optional): Filter by assigned staff (UUID)

**Response (200):**
```json
[
  {
    "id": "uuid",
    "description": "Projector not working properly",
    "status": "PENDING",
    "facility": {
      "name": "Lecture Hall 101",
      "location": "Building B, Floor 1"
    },
    "user": {
      "name": "Dr. Test Faculty"
    },
    "assignedStaff": null,
    "createdAt": "2025-11-10T12:00:00.000Z"
  }
]
```

### POST /api/maintenance

Create a maintenance request.

**Request Body:**
```json
{
  "facilityId": "uuid",
  "description": "Air conditioning not working"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "status": "PENDING",
  "message": "Maintenance request created successfully"
}
```

### PATCH /api/maintenance/:id

Update maintenance request status (Maintenance staff/Admin).

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "assignedTo": "uuid"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "IN_PROGRESS",
  "message": "Maintenance request updated"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "ValidationError",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "AuthError",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "ForbiddenError",
  "message": "Access forbidden"
}
```

### 404 Not Found
```json
{
  "error": "NotFoundError",
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "ConflictError",
  "message": "Resource conflict"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

---

## Roles & Permissions

| Endpoint | Student | Faculty | Admin | Maintenance |
|----------|---------|---------|-------|-------------|
| POST /api/bookings | ✅ | ✅ | ✅ | ❌ |
| PATCH /api/bookings/:id/approve | ❌ | ❌ | ✅ | ❌ |
| POST /api/events/propose | ✅ | ✅ | ✅ | ❌ |
| POST /api/events | ❌ | ❌ | ✅ | ❌ |
| POST /api/maintenance | ✅ | ✅ | ✅ | ✅ |
| PATCH /api/maintenance/:id | ❌ | ❌ | ✅ | ✅ |

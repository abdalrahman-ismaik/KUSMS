# Quickstart: Dashboard Real Data

## Prerequisites
- Backend running (`npm run dev` in `backend/`)
- Frontend running (`npm run dev` in `frontend/`)
- Database seeded (`npx prisma db seed` in `backend/`)

## Testing Steps

1. **Admin Dashboard**:
   - Log in as Admin (`admin@kusms.edu` / `admin123`).
   - Verify "Total Users" matches the database count.
   - Create a new user via "Manage Users".
   - Refresh dashboard and verify count increments.

2. **Student Dashboard**:
   - Log in as Student (`student@kusms.edu` / `student123`).
   - Verify "Active Bookings" count.
   - Create a new booking.
   - Refresh dashboard and verify count increments.

3. **Maintenance Dashboard**:
   - Log in as Maintenance (`maintenance@kusms.edu` / `maintenance123`).
   - Verify "Pending Requests" count.
   - Submit a new maintenance request (as any user).
   - Refresh maintenance dashboard and verify count increments.

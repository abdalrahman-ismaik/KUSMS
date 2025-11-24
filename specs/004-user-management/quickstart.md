# Quickstart: User Management System

## Prerequisites
- Backend running on port 3000
- Frontend running on port 5173
- Logged in as an Admin user

## Testing Steps

1. **Login as Admin**
   - Go to `http://localhost:5173/login`
   - Enter Admin credentials

2. **Navigate to User Management**
   - Click "Users" tab in the Admin Dashboard

3. **Create User**
   - Click "Add User"
   - Enter Name: "Test Faculty"
   - Enter Email: "faculty@test.com"
   - Enter Password: "password123"
   - Select Role: "FACULTY"
   - Click "Create"
   - Verify user appears in the list

4. **Update User**
   - Find "Test Faculty" in the list
   - Click "Edit" icon
   - Change Name to "Updated Faculty"
   - Click "Update"
   - Verify name change in list

5. **Delete User**
   - Find "Updated Faculty" in the list
   - Click "Delete" icon
   - Confirm deletion
   - Verify user is removed from list

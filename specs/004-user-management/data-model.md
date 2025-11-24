# Data Model: User Management System

## Entities

### User
Represents a system user (Student, Faculty, Admin, Maintenance Staff).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String (UUID) | Yes | Unique identifier |
| email | String | Yes | Unique email address |
| name | String | Yes | Full name |
| role | String | Yes | Role: STUDENT, FACULTY, ADMIN, MAINTENANCE |
| password | String | Yes | Hashed password |
| createdAt | DateTime | Yes | Creation timestamp |
| updatedAt | DateTime | Yes | Last update timestamp |

## API Contracts

### List Users
- **Endpoint**: `GET /api/users`
- **Access**: Admin only
- **Query Params**:
    - `role` (optional): Filter by role
- **Response**: `200 OK`
    ```json
    {
      "users": [
        {
          "id": "uuid",
          "email": "user@example.com",
          "name": "John Doe",
          "role": "STUDENT",
          "createdAt": "2025-01-01T00:00:00Z"
        }
      ]
    }
    ```

### Create User
- **Endpoint**: `POST /api/users`
- **Access**: Admin only
- **Body**:
    ```json
    {
      "email": "new@example.com",
      "name": "Jane Doe",
      "role": "FACULTY",
      "password": "securePassword123"
    }
    ```
- **Response**: `201 Created`
    ```json
    {
      "user": {
        "id": "uuid",
        "email": "new@example.com",
        "name": "Jane Doe",
        "role": "FACULTY"
      }
    }
    ```

### Update User
- **Endpoint**: `PATCH /api/users/:id`
- **Access**: Admin only
- **Body**:
    ```json
    {
      "name": "Jane Smith",
      "role": "ADMIN"
    }
    ```
- **Response**: `200 OK`
    ```json
    {
      "user": {
        "id": "uuid",
        "email": "new@example.com",
        "name": "Jane Smith",
        "role": "ADMIN"
      }
    }
    ```

### Delete User
- **Endpoint**: `DELETE /api/users/:id`
- **Access**: Admin only
- **Response**: `200 OK`
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

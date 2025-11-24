# API Contracts: Professional Sidebar Navigation System

**Feature**: 002-sidebar-navigation  
**Date**: November 24, 2025  
**Status**: UI-only feature - No API changes required

## Overview

This feature is a **frontend-only enhancement** that modifies the presentation layer of the KUSMS application. No new API endpoints, request/response formats, or backend contracts are introduced.

## Existing API Dependencies

The sidebar navigation feature relies on existing authentication APIs that are **already implemented** and require **no modifications**:

### 1. User Authentication Endpoint (Existing)

**Used For**: Retrieving current user information for role-based menu filtering

**Endpoint**: `POST /api/auth/login` (existing)

**Response Format** (existing, unchanged):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john.doe@ku.edu",
    "role": "STUDENT"
  }
}
```

**Usage in Sidebar**:
- `user.name`: Displayed in sidebar footer user profile
- `user.email`: Displayed in sidebar footer user profile
- `user.role`: Used to filter visible navigation items

**Contract Status**: ✅ No changes required

---

### 2. User Session Endpoint (Existing)

**Used For**: Retrieving current user session for authenticated requests

**Endpoint**: `GET /api/auth/me` (existing)

**Response Format** (existing, unchanged):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@ku.edu",
  "role": "FACULTY"
}
```

**Usage in Sidebar**:
- Called on app initialization to restore user session
- Provides user data for AuthContext

**Contract Status**: ✅ No changes required

---

### 3. Logout Endpoint (Existing)

**Used For**: Logging out user from sidebar profile menu

**Endpoint**: `POST /api/auth/logout` (existing)

**Request Format** (existing, unchanged):
```json
{}
```

**Response Format** (existing, unchanged):
```json
{
  "message": "Logged out successfully"
}
```

**Usage in Sidebar**:
- Triggered when user clicks "Sign Out" button in sidebar footer
- Clears authentication state

**Contract Status**: ✅ No changes required

---

## No New API Endpoints

**Confirmation**: This feature introduces **ZERO** new API endpoints or backend changes:

- ❌ No new REST endpoints
- ❌ No new GraphQL queries or mutations
- ❌ No changes to existing endpoint contracts
- ❌ No database queries or modifications
- ❌ No backend service changes
- ❌ No authentication or authorization changes

---

## Frontend-Only Contracts

The sidebar navigation feature uses **client-side contracts** for component communication:

### NavigationItem Interface

```typescript
/**
 * Represents a menu item in the sidebar navigation
 * Client-side only - not transmitted over network
 */
interface MenuItem {
  /** Display text for the menu item */
  text: string;
  
  /** Material-UI icon component */
  icon: React.ReactNode;
  
  /** React Router path for navigation */
  path: string;
  
  /** User roles that can see this item */
  roles: UserRole[];
}

/** Valid user roles in the system */
type UserRole = "STUDENT" | "FACULTY" | "ADMIN" | "MAINTENANCE";
```

### Layout Component Props

```typescript
/**
 * Props for the Layout component wrapper
 * Used to render page content within sidebar layout
 */
interface LayoutProps {
  /** Page content to render in main area */
  children: React.ReactNode;
}
```

### Menu Item Configuration

```typescript
/**
 * Static configuration for base menu items
 * Available to all authenticated users
 */
const baseMenuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['STUDENT', 'FACULTY', 'ADMIN', 'MAINTENANCE'] },
  { text: 'Bookings', icon: <BookIcon />, path: '/bookings', roles: ['STUDENT', 'FACULTY', 'ADMIN'] },
  { text: 'Events', icon: <EventIcon />, path: '/events', roles: ['STUDENT', 'FACULTY', 'ADMIN'] },
  { text: 'Maintenance', icon: <BuildIcon />, path: '/maintenance', roles: ['STUDENT', 'FACULTY', 'ADMIN', 'MAINTENANCE'] },
];

/**
 * Static configuration for admin-only menu items
 * Only visible to users with ADMIN role
 */
const adminMenuItems: MenuItem[] = [
  { text: 'Users', icon: <PeopleIcon />, path: '/users', roles: ['ADMIN'] },
  { text: 'Facilities', icon: <DomainIcon />, path: '/facilities', roles: ['ADMIN'] },
];
```

---

## Integration Points

### AuthContext Integration (Existing)

**Interface**: `useAuth()` hook from `contexts/AuthContext.tsx`

**Contract**:
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
```

**Usage**: Sidebar consumes `user` and `logout` from this context

**Status**: ✅ No changes to AuthContext required

---

### React Router Integration (Existing)

**Interface**: React Router DOM v7 hooks

**Contract**:
```typescript
// useNavigate hook - programmatic navigation
const navigate: NavigateFunction = useNavigate();
navigate('/dashboard'); // Navigate to route

// useLocation hook - current route information
const location: Location = useLocation();
location.pathname; // e.g., "/dashboard"
```

**Usage**: Sidebar uses `navigate` for menu clicks, `useLocation` for active state

**Status**: ✅ No changes to routing required

---

## Backward Compatibility

**Guarantee**: This feature maintains **100% backward compatibility** with existing APIs:

- ✅ All existing API calls remain unchanged
- ✅ No breaking changes to authentication flow
- ✅ No changes to authorization logic
- ✅ No impact on other frontend components
- ✅ Existing pages work identically
- ✅ No database schema changes

---

## Testing Contracts

### Manual Testing Checklist

**Authentication Flow**:
1. Login with valid credentials → Sidebar shows correct menu items for role
2. Navigate between pages → Active item highlights correctly
3. Logout from sidebar → Returns to login page
4. Refresh page → Sidebar state persists (via AuthContext)

**Role-Based Access**:
1. Login as STUDENT → See Dashboard, Bookings, Events, Maintenance
2. Login as FACULTY → See Dashboard, Bookings, Events, Maintenance
3. Login as ADMIN → See all items including Users, Facilities
4. Login as MAINTENANCE → See Dashboard, Maintenance

**Navigation**:
1. Click menu item → Navigate to correct page
2. Browser back button → Active item updates
3. Direct URL navigation → Active item updates

---

## Future API Considerations (Out of Scope)

Features that **would** require API changes (deferred to future):

### Notification Badges (P3 Feature)
Would require new endpoints:
- `GET /api/notifications/counts` - Get pending item counts
- WebSocket or polling for real-time updates

### User Preferences (Future Enhancement)
Would require new endpoints:
- `GET /api/user/preferences` - Get sidebar preferences
- `PUT /api/user/preferences` - Save sidebar state (collapsed, pinned items)

**Status**: ⚠️ Not implemented in this feature (out of scope)

---

## Summary

This feature has **NO API CONTRACT CHANGES**. It is a pure frontend enhancement that:

1. Uses existing authentication APIs (unchanged)
2. Implements client-side navigation logic
3. Renders UI based on existing user role data
4. Maintains 100% backward compatibility

**Backend developers**: No action required for this feature.
**Frontend developers**: All implementation is in `Layout.tsx` component.

---

## References

- Existing Auth API: `backend/src/routes/auth.js`
- AuthContext: `frontend/src/contexts/AuthContext.tsx`
- Auth Service: `frontend/src/services/authService.ts`
- React Router: https://reactrouter.com/en/main

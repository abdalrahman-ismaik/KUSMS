# Data Model: Professional Sidebar Navigation System

**Feature**: 002-sidebar-navigation  
**Date**: November 24, 2025  
**Status**: UI-only feature, no database changes required

## Overview

This feature is a **UI/UX enhancement** that modifies only the frontend presentation layer. No new database entities, API endpoints, or backend changes are required. This document describes the client-side data structures used for sidebar navigation state management.

## Entities

### NavigationItem

**Description**: Represents a single menu item in the sidebar navigation

**Attributes**:
- `text` (string, required): Display label for the menu item (e.g., "Dashboard", "Bookings")
- `icon` (ReactNode, required): Material-UI icon component to display
- `path` (string, required): React Router path for navigation (e.g., "/dashboard", "/bookings")
- `roles` (string[], required): Array of user roles allowed to see this item (e.g., ["STUDENT", "FACULTY"])

**Validation Rules**:
- `text` must not be empty
- `path` must start with "/"
- `roles` array must contain at least one valid role
- Valid roles: "STUDENT", "FACULTY", "ADMIN", "MAINTENANCE"

**Example**:
```typescript
{
  text: "Dashboard",
  icon: <DashboardIcon />,
  path: "/dashboard",
  roles: ["STUDENT", "FACULTY", "ADMIN", "MAINTENANCE"]
}
```

**Source**: Defined locally in `Layout.tsx` component

**Relationships**:
- Filtered based on current User's role
- Associated with route definitions in App.tsx

---

### User (Reference Only)

**Description**: Authenticated user information from AuthContext (existing entity, not modified)

**Relevant Attributes** (for sidebar):
- `name` (string): User's full name for profile display
- `email` (string): User's email for profile display
- `role` (enum): User's role for menu filtering
  - Values: "STUDENT" | "FACULTY" | "ADMIN" | "MAINTENANCE"

**Source**: Provided by `AuthContext.tsx` (existing)

**Usage in Sidebar**:
- `role`: Determines which navigation items are visible
- `name`: Displayed in user profile section at sidebar bottom
- `email`: Displayed in user profile section
- Avatar initial: First character of `name`

**Relationships**:
- Filters NavigationItem array based on role match

---

### SidebarState (Local Component State)

**Description**: React component state for managing sidebar UI interactions

**Attributes**:
- `anchorEl` (HTMLElement | null): Anchor element for user profile menu popover
- `mobileOpen` (boolean, future): Controls mobile drawer open/close state (P2 feature)

**State Transitions**:
```
User Profile Menu:
- null → HTMLElement: User clicks avatar/name
- HTMLElement → null: User selects menu option or clicks outside

Mobile Drawer (P2):
- false → true: User clicks hamburger menu
- true → false: User clicks outside or selects menu item
```

**Source**: Managed by React useState hooks in Layout component

**Validation Rules**:
- `anchorEl` must be a valid DOM element or null
- State changes trigger UI re-renders

---

### RouteLocation (Reference Only)

**Description**: Current route information from React Router (existing, not modified)

**Relevant Attributes**:
- `pathname` (string): Current URL path (e.g., "/dashboard", "/bookings/123")

**Source**: Provided by `useLocation()` hook from react-router-dom

**Usage in Sidebar**:
- Compared against NavigationItem.path to determine active menu item
- Triggers active state highlighting when match found

**Relationships**:
- Compared with each NavigationItem.path for active state detection

---

## Data Flow

### Navigation Item Filtering Flow

```
1. User authenticates → AuthContext provides User object
2. Layout component receives User from useAuth() hook
3. baseMenuItems + adminMenuItems are combined
4. Combined items filtered by user.role
5. Filtered items rendered in sidebar
6. Active item determined by comparing location.pathname with item.path
```

### Active State Detection Flow

```
1. React Router updates location.pathname on navigation
2. useLocation() hook returns new location object
3. For each NavigationItem, compare item.path === location.pathname
4. If match: isActive = true → Apply active styling
5. If no match: isActive = false → Apply default styling
```

### User Profile Menu Flow

```
1. User clicks avatar/profile area
2. onClick event sets anchorEl to clicked element
3. MUI Menu component opens, anchored to anchorEl
4. User selects menu option (Profile, Logout)
5. Action executed, anchorEl set to null
6. Menu closes
```

---

## Type Definitions

```typescript
// Navigation Item Type
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}

// User Role Type (from existing system)
type UserRole = "STUDENT" | "FACULTY" | "ADMIN" | "MAINTENANCE";

// User Type (from AuthContext, simplified)
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Sidebar State Type
interface SidebarState {
  anchorEl: HTMLElement | null;
  mobileOpen?: boolean; // P2 feature
}

// Route Location Type (from React Router)
interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}
```

---

## No Database Changes

**Confirmation**: This feature requires **NO** backend or database modifications:

- ✅ No new tables or collections
- ✅ No schema changes
- ✅ No new API endpoints
- ✅ No changes to existing API contracts
- ✅ No data migration scripts

All data structures are **client-side only** and managed within React component state and props.

---

## State Management Strategy

**Approach**: Local component state with React hooks (no global state management needed)

**Rationale**:
- Sidebar state is UI-only, not shared across components
- Navigation items are static configuration, not dynamic data
- User data comes from existing AuthContext (already implemented)
- No need for Redux, Zustand, or other state management libraries

**Implementation**:
```typescript
// Local state in Layout component
const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

// Context hook (existing)
const { user, logout } = useAuth();

// Router hook (existing)
const location = useLocation();
const navigate = useNavigate();

// Derived state (computed on render)
const menuItems = useMemo(() => {
  if (!user) return baseMenuItems;
  return [...baseMenuItems, ...adminMenuItems]
    .filter(item => item.roles.includes(user.role));
}, [user?.role]);
```

---

## Performance Considerations

**Memoization Strategy**:
- `menuItems`: Memoized with `useMemo` (dependency: `user.role`)
- Navigation handlers: Memoized with `useCallback` (dependency: `navigate`)
- Menu item components: Wrapped with `React.memo` to prevent unnecessary re-renders

**Re-render Triggers**:
- Route change: Re-renders to update active state
- User role change: Re-renders to update visible menu items
- Profile menu open/close: Re-renders only menu section

**Optimization Target**: <100ms sidebar render time (spec requirement)

---

## Summary

This data model defines the **client-side structures** for sidebar navigation. All data is ephemeral (component state) or derived from existing backend systems (user authentication). No new backend development, database schemas, or API contracts are required for this feature.

**Key Points**:
- UI-only feature with no backend changes
- Leverages existing AuthContext for user data
- Uses local component state for UI interactions
- Navigation items are static configuration
- Active state derived from React Router location

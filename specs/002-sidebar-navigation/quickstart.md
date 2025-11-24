# Quickstart Guide: Professional Sidebar Navigation System

**Feature**: 002-sidebar-navigation  
**Date**: November 24, 2025  
**Estimated Time**: 30 minutes setup + 4-8 hours implementation

## Overview

This guide helps developers set up their environment and implement the professional sidebar navigation system for KUSMS. The feature enhances the existing `Layout.tsx` component with improved visual design, accessibility, and user experience.

## Prerequisites

✅ **Required**:
- Node.js 18+ installed
- Git configured
- VS Code (or preferred editor)
- Access to KUSMS repository
- Branch `002-sidebar-navigation` checked out

✅ **Knowledge**:
- React 18+ and TypeScript
- Material-UI (MUI) basics
- React Router DOM
- React hooks (useState, useMemo, useCallback)

---

## Quick Setup (5 minutes)

### 1. Clone and Switch Branch

```bash
# If not already cloned
git clone https://github.com/abdalrahman-ismaik/KUSMS.git
cd KUSMS

# Switch to feature branch
git checkout 002-sidebar-navigation

# Ensure you're on correct branch
git branch --show-current
# Should output: 002-sidebar-navigation
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Verify key dependencies
npm list @mui/material @mui/icons-material react-router-dom
```

**Expected versions**:
- @mui/material: ^7.3.5
- @mui/icons-material: ^7.3.5
- react-router-dom: ^7.9.5

### 3. Start Development Server

```bash
# From frontend directory
npm run dev
```

**Expected output**:
```
VITE v7.2.2  ready in 350 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 4. Open in Browser

Navigate to `http://localhost:5173/`

**Test authentication**:
- Username: `admin@ku.edu`
- Password: `password` (from seed data)

---

## Implementation Roadmap

### Phase 1: Accessibility Enhancements (P1) - 2-3 hours

**Goal**: Add ARIA labels, keyboard navigation, and focus states

**Files to modify**:
- `frontend/src/components/common/Layout.tsx`

**Implementation steps**:

1. **Add ARIA labels to sidebar container**:
```typescript
<Box 
  role="navigation" 
  aria-label="Main navigation"
  sx={{ height: '100vh', display: 'flex', flexDirection: 'column', ... }}
>
```

2. **Add ARIA labels to menu list**:
```typescript
<List role="menu" aria-label="Main menu" sx={{ px: 2 }}>
```

3. **Update menu items with ARIA attributes**:
```typescript
<ListItemButton 
  role="menuitem"
  aria-current={isActive ? 'page' : undefined}
  aria-label={`${item.text}${isActive ? ' (current page)' : ''}`}
  onClick={() => navigate(item.path)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(item.path);
    }
  }}
  sx={{ ... }}
>
```

4. **Add focus-visible states**:
```typescript
sx={{
  // ... existing styles
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '-2px',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)'
  }
}}
```

5. **Add skip-to-content link** (before sidebar):
```typescript
<Box
  component="a"
  href="#main-content"
  sx={{
    position: 'absolute',
    left: '-9999px',
    top: 0,
    bgcolor: 'primary.main',
    color: 'white',
    p: 2,
    zIndex: 9999,
    '&:focus': {
      left: 0
    }
  }}
>
  Skip to main content
</Box>
```

6. **Add id to main content area**:
```typescript
<Box
  id="main-content"
  component="main"
  sx={{ flexGrow: 1, ml: `${SIDEBAR_WIDTH}px`, ... }}
>
```

**Testing**:
- Tab through menu items (focus ring should be visible)
- Press Enter/Space on focused item (should navigate)
- Test with screen reader (NVDA/JAWS/VoiceOver)
- Test skip link (Tab from page load)

---

### Phase 2: Performance Optimization (P2) - 1-2 hours

**Goal**: Reduce unnecessary re-renders with memoization

**Implementation steps**:

1. **Memoize filtered menu items**:
```typescript
const menuItems = useMemo(() => {
  if (!user) return baseMenuItems;
  return [...baseMenuItems, ...adminMenuItems]
    .filter(item => item.roles.includes(user.role));
}, [user?.role]);
```

2. **Extract MenuItem component**:
```typescript
interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
}

const NavigationMenuItem = React.memo(({ item, isActive, onClick }: MenuItemProps) => (
  <ListItem disablePadding sx={{ mb: 0.75 }}>
    <ListItemButton 
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
      sx={{ /* ... existing styles ... */ }}
    >
      <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 36 }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText 
        primary={item.text} 
        primaryTypographyProps={{
          fontSize: '0.9375rem',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? 'primary.main' : 'text.primary',
        }}
      />
    </ListItemButton>
  </ListItem>
));

NavigationMenuItem.displayName = 'NavigationMenuItem';
```

3. **Memoize navigation handler**:
```typescript
const handleNavigate = useCallback((path: string) => {
  navigate(path);
}, [navigate]);
```

4. **Use memoized component in render**:
```typescript
{menuItems.map((item) => {
  const isActive = location.pathname === item.path;
  return (
    <NavigationMenuItem
      key={item.path}
      item={item}
      isActive={isActive}
      onClick={() => handleNavigate(item.path)}
    />
  );
})}
```

**Testing**:
- Open React DevTools Profiler
- Navigate between pages
- Verify only affected components re-render
- Check render time <100ms

---

### Phase 3: Responsive Behavior (P2) - 2-3 hours

**Goal**: Add mobile drawer for small screens

**Implementation steps**:

1. **Add mobile state**:
```typescript
const [mobileOpen, setMobileOpen] = useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};
```

2. **Extract sidebar content to variable** (already done in existing code):
```typescript
const sidebarContent = (
  <Box sx={{ /* ... existing sidebar content ... */ }}>
    {/* All sidebar content here */}
  </Box>
);
```

3. **Add mobile Drawer component**:
```typescript
// Add this before the fixed Box sidebar
<Drawer
  variant="temporary"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  ModalProps={{ keepMounted: true }}
  sx={{
    display: { xs: 'block', lg: 'none' },
    '& .MuiDrawer-paper': { 
      width: SIDEBAR_WIDTH,
      boxSizing: 'border-box' 
    }
  }}
>
  {sidebarContent}
</Drawer>
```

4. **Update fixed sidebar to hide on mobile**:
```typescript
<Box sx={{ 
  display: { xs: 'none', lg: 'block' },
  // ... existing styles
}}>
  {sidebarContent}
</Box>
```

5. **Add hamburger menu button to AppBar**:
```typescript
<AppBar position="sticky" elevation={0} sx={{ /* ... */ }}>
  <Toolbar sx={{ /* ... */ }}>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { lg: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    
    <Typography variant="h6" noWrap>
      Dashboard
    </Typography>
    
    {/* ... rest of toolbar ... */}
  </Toolbar>
</AppBar>
```

6. **Import MenuIcon**:
```typescript
import MenuIcon from '@mui/icons-material/Menu';
```

**Testing**:
- Resize browser to mobile width (<1024px)
- Hamburger menu should appear
- Click hamburger → drawer opens
- Click menu item → drawer closes and navigates
- Click outside drawer → drawer closes

---

## Manual Testing Checklist

### Functional Tests

**Navigation** (5 minutes):
- [ ] Click each menu item → Navigates to correct page
- [ ] Active item highlights correctly
- [ ] Browser back/forward buttons work
- [ ] Direct URL entry updates active state

**Role-Based Access** (10 minutes):
- [ ] Login as Student → See Dashboard, Bookings, Events, Maintenance
- [ ] Login as Faculty → See Dashboard, Bookings, Events, Maintenance
- [ ] Login as Admin → See all items + Users, Facilities
- [ ] Login as Maintenance → See Dashboard, Maintenance

**Accessibility** (10 minutes):
- [ ] Tab through menu items → Focus ring visible
- [ ] Press Enter on focused item → Navigates
- [ ] Press Space on focused item → Navigates
- [ ] Skip link works (Tab from load → press Enter)
- [ ] Screen reader announces items correctly
- [ ] ARIA current page announced

**Visual Design** (5 minutes):
- [ ] Sidebar width is 280px
- [ ] Section headers visible and styled
- [ ] Icons aligned properly
- [ ] Hover effects work smoothly
- [ ] Active state clearly visible
- [ ] User profile section displays correctly

**Performance** (5 minutes):
- [ ] Sidebar loads in <100ms
- [ ] Navigation feels instant (<1s)
- [ ] No console errors
- [ ] No layout shift on load

**Responsive** (10 minutes, if implemented):
- [ ] Desktop (>1024px): Fixed sidebar visible
- [ ] Tablet (768-1024px): Sidebar behavior appropriate
- [ ] Mobile (<768px): Hamburger menu appears
- [ ] Drawer opens/closes smoothly
- [ ] Touch interactions work

---

## Common Issues & Solutions

### Issue 1: Menu items not filtering by role

**Symptom**: All users see all menu items

**Solution**: Check user object from AuthContext
```typescript
console.log('User role:', user?.role);
console.log('Filtered items:', menuItems);
```

Ensure `user.role` matches role strings in menu items exactly (case-sensitive).

### Issue 2: Active state not highlighting

**Symptom**: No menu item highlighted as active

**Solution**: Verify path comparison
```typescript
console.log('Current path:', location.pathname);
console.log('Item path:', item.path);
console.log('Is active:', location.pathname === item.path);
```

Ensure paths match exactly (including trailing slashes).

### Issue 3: Focus ring not visible

**Symptom**: No visual indication when tabbing through items

**Solution**: Check if `:focus-visible` styles are applied
```typescript
'&:focus-visible': {
  outline: '2px solid',
  outlineColor: 'primary.main',
  outlineOffset: '-2px'
}
```

Some browsers may need `&:focus` in addition to `&:focus-visible`.

### Issue 4: Performance lag on navigation

**Symptom**: Sidebar takes >100ms to render

**Solution**: Implement memoization (Phase 2)
- Memoize menu items with `useMemo`
- Extract MenuItem component with `React.memo`
- Memoize handlers with `useCallback`

### Issue 5: Mobile drawer not working

**Symptom**: Hamburger menu doesn't open drawer

**Solution**: Check state management
```typescript
console.log('Mobile open:', mobileOpen);
```

Ensure `handleDrawerToggle` is called and state updates correctly.

---

## Development Tools

### React DevTools

Install: https://react.dev/learn/react-developer-tools

**Usage**:
1. Open browser DevTools
2. Click "Components" tab
3. Select Layout component
4. Inspect props and state

### React DevTools Profiler

**Usage**:
1. Open "Profiler" tab in React DevTools
2. Click record button
3. Navigate between pages
4. Stop recording
5. Analyze render times and causes

### Accessibility Testing

**Tools**:
- **WAVE**: https://wave.webaim.org/extension/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **NVDA Screen Reader** (Windows): https://www.nvaccess.org/
- **VoiceOver** (Mac): Built-in

---

## Code Structure Reference

```
frontend/src/components/common/Layout.tsx
├── Constants
│   └── SIDEBAR_WIDTH = 280
├── State
│   ├── anchorEl (user menu)
│   └── mobileOpen (responsive drawer)
├── Hooks
│   ├── useNavigate()
│   ├── useLocation()
│   └── useAuth()
├── Menu Configuration
│   ├── baseMenuItems[]
│   └── adminMenuItems[]
├── Filtered Items
│   └── menuItems (computed)
├── Sidebar Content
│   ├── Header (logo + title)
│   ├── Navigation Menu
│   │   ├── Section Header
│   │   └── Menu Items (mapped)
│   └── User Profile Section
├── Mobile Drawer (P2)
└── Main Content Area
    ├── AppBar (with hamburger button)
    └── Page Content
```

---

## Next Steps After Implementation

### 1. Code Review Checklist

- [ ] All P1 accessibility features implemented
- [ ] TypeScript types are correct
- [ ] No ESLint warnings
- [ ] No console errors or warnings
- [ ] Code follows existing patterns in Layout.tsx

### 2. Manual Testing

Complete all tests in "Manual Testing Checklist" section above.

### 3. Documentation

- [ ] Update component documentation comments
- [ ] Document any deviations from spec
- [ ] Note any issues for future improvement

### 4. Commit Changes

```bash
git add frontend/src/components/common/Layout.tsx
git commit -m "feat(ui): enhance sidebar with accessibility and improved design

- Add ARIA labels and keyboard navigation
- Implement focus-visible states
- Add skip-to-content link
- Optimize performance with memoization
- Add mobile responsive drawer (if implemented)

Closes #002"
```

### 5. Create Pull Request

- Title: `feat(ui): Professional Sidebar Navigation System`
- Link to spec: `specs/002-sidebar-navigation/spec.md`
- Include screenshots of before/after
- List manual testing completed
- Request review from team

---

## Resources

**Documentation**:
- Material-UI: https://mui.com/material-ui/
- React Router: https://reactrouter.com/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

**Design References**:
- Material Design Navigation: https://m3.material.io/components/navigation-drawer
- Campus Management Systems: Canvas, Blackboard, Moodle

**Related Files**:
- Spec: `specs/002-sidebar-navigation/spec.md`
- Research: `specs/002-sidebar-navigation/research.md`
- Data Model: `specs/002-sidebar-navigation/data-model.md`
- Plan: `specs/002-sidebar-navigation/plan.md`

---

## Support

**Questions?** Check the following resources:

1. Read the spec: `specs/002-sidebar-navigation/spec.md`
2. Review research: `specs/002-sidebar-navigation/research.md`
3. Check existing code: `frontend/src/components/common/Layout.tsx`
4. Ask team via project communication channel

**Stuck?** Document the issue and current progress for team discussion.

---

## Summary

This quickstart provides everything needed to implement the professional sidebar navigation system:

1. ✅ Setup instructions (5 minutes)
2. ✅ Implementation roadmap (4-8 hours total)
3. ✅ Testing guidelines
4. ✅ Troubleshooting tips
5. ✅ Development tools
6. ✅ Next steps after completion

Focus on **P1 features first** (accessibility) to deliver core value, then add P2 features (performance, responsive) as time permits.

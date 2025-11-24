# Tasks: Professional Sidebar Navigation System

**Input**: Design documents from `/specs/002-sidebar-navigation/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**MVP-First Task Planning** (per Constitution v1.0.0):
- Focus on P1 user stories ONLY for initial implementation (Stories 1 & 2)
- Manual testing of acceptance scenarios is acceptable
- Automated tests are OPTIONAL for this UI feature
- Defer P2+ stories (Stories 3-5) unless P1 scope completes early

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend-only feature**: All changes in `frontend/src/`
- Primary file: `frontend/src/components/common/Layout.tsx`
- Reference files: `frontend/src/contexts/AuthContext.tsx`, `frontend/src/hooks/useAuth.ts`

---

## Phase 1: Setup (Project Verification)

**Purpose**: Verify development environment and existing implementation

- [x] T001 Verify Node.js 18+ and dependencies installed per quickstart.md
- [x] T002 Checkout branch `002-sidebar-navigation` and verify clean working directory
- [x] T003 [P] Start frontend development server (`npm run dev` in frontend/)
- [x] T004 [P] Review current Layout.tsx implementation to understand existing sidebar structure
- [x] T005 Test login with seed data (admin@ku.edu / password) to verify current navigation

**Checkpoint**: Development environment ready, current implementation understood

---

## Phase 2: Foundational (Accessibility Framework)

**Purpose**: Core accessibility infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: These tasks establish WCAG 2.1 AA compliance foundation required by P1

- [x] T006 Add ARIA navigation container role to sidebar Box in frontend/src/components/common/Layout.tsx
- [x] T007 Add ARIA menu role to List component in frontend/src/components/common/Layout.tsx
- [x] T008 Add skip-to-content link before sidebar in frontend/src/components/common/Layout.tsx
- [x] T009 Add id="main-content" to main content area Box in frontend/src/components/common/Layout.tsx
- [x] T010 Import necessary ARIA-related types from @mui/material in frontend/src/components/common/Layout.tsx

**Checkpoint**: Accessibility foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Persistent Sidebar Navigation (Priority: P1) 🎯 MVP

**Goal**: Ensure fixed sidebar is visible on all pages with role-based menu filtering and accurate active state highlighting

**Independent Test**: Login as different user roles (student, faculty, admin, maintenance), navigate between pages, verify sidebar remains visible, correct menu items shown, and active item highlights correctly

### Implementation for User Story 1

- [x] T011 [P] [US1] Add ARIA menuitem role to ListItemButton components in frontend/src/components/common/Layout.tsx
- [x] T012 [P] [US1] Add aria-current="page" attribute to active menu items in frontend/src/components/common/Layout.tsx
- [x] T013 [P] [US1] Add descriptive aria-label to each ListItemButton (include "current page" for active) in frontend/src/components/common/Layout.tsx
- [x] T014 [US1] Implement keyboard navigation support (Enter/Space keys) on ListItemButton in frontend/src/components/common/Layout.tsx
- [x] T015 [US1] Add onKeyDown handler to ListItemButton for keyboard navigation in frontend/src/components/common/Layout.tsx
- [x] T016 [US1] Ensure tabIndex={0} is set on all ListItemButton components in frontend/src/components/common/Layout.tsx
- [x] T017 [US1] Verify role-based menu filtering works correctly for all 4 roles in frontend/src/components/common/Layout.tsx
- [x] T018 [US1] Test sidebar remains fixed during page scroll (verify position: fixed styles)
- [x] T019 [US1] Verify active state detection works with location.pathname comparison in frontend/src/components/common/Layout.tsx

**Manual Testing for User Story 1**:
- [ ] T020 [US1] Login as Student → Verify sees Dashboard, Bookings, Events, Maintenance only
- [ ] T021 [US1] Login as Faculty → Verify sees Dashboard, Bookings, Events, Maintenance only
- [ ] T022 [US1] Login as Admin → Verify sees all items including Users, Facilities
- [ ] T023 [US1] Login as Maintenance → Verify sees Dashboard, Maintenance only
- [ ] T024 [US1] Click each menu item → Verify navigation works and sidebar remains visible
- [ ] T025 [US1] Navigate via browser back button → Verify active item updates correctly
- [ ] T026 [US1] Tab through menu items → Verify focus is visible
- [ ] T027 [US1] Press Enter on focused item → Verify navigation occurs
- [ ] T028 [US1] Press Space on focused item → Verify navigation occurs

**Checkpoint**: User Story 1 complete - Persistent sidebar navigation is fully functional and accessible

---

## Phase 4: User Story 2 - Visual Hierarchy & Professional Styling (Priority: P1) 🎯 MVP

**Goal**: Enhance visual design with clear section grouping, professional styling, and improved hover/active states

**Independent Test**: Visual inspection shows clear section headers, consistent spacing, professional color scheme, smooth hover effects, and distinct active state highlighting

### Implementation for User Story 2

- [x] T029 [P] [US2] Add focus-visible styles to ListItemButton in frontend/src/components/common/Layout.tsx
- [x] T030 [P] [US2] Implement focus ring with outline and boxShadow for keyboard users in frontend/src/components/common/Layout.tsx
- [x] T031 [P] [US2] Verify section headers (MAIN MENU, ADMIN TOOLS) have proper OVERLINE typography in frontend/src/components/common/Layout.tsx
- [x] T032 [P] [US2] Add role="presentation" and aria-hidden="true" to section headers in frontend/src/components/common/Layout.tsx
- [x] T033 [US2] Verify hover effect transitions are smooth (0.2s ease) in frontend/src/components/common/Layout.tsx
- [x] T034 [US2] Verify active state uses multi-layer approach (background + border + color) in frontend/src/components/common/Layout.tsx
- [x] T035 [US2] Ensure translateX(2px) hover effect works smoothly in frontend/src/components/common/Layout.tsx
- [x] T036 [US2] Verify icon sizes and spacing are consistent (minWidth: 36, fontSize: 1.35rem) in frontend/src/components/common/Layout.tsx
- [x] T037 [US2] Verify typography hierarchy (section: 0.7rem, items: 0.9375rem) in frontend/src/components/common/Layout.tsx
- [x] T038 [US2] Ensure color contrast meets WCAG 2.1 AA standards (4.5:1 for text) in frontend/src/components/common/Layout.tsx

**Manual Testing for User Story 2**:
- [ ] T039 [US2] Visual inspection → Verify section headers are clearly visible and styled
- [ ] T040 [US2] Hover over menu items → Verify subtle background color change and translateX effect
- [ ] T041 [US2] Navigate to different pages → Verify active item has distinct background and border
- [ ] T042 [US2] Compare spacing → Verify consistent padding and gaps between items
- [ ] T043 [US2] Tab through items → Verify focus ring is visible and properly styled
- [ ] T044 [US2] Check typography → Verify font sizes, weights, and letter spacing are consistent
- [ ] T045 [US2] Compare to commercial systems → Verify professional appearance (Canvas, Blackboard)
- [ ] T046 [US2] Test in different browsers (Chrome, Firefox, Safari, Edge) → Verify consistent rendering

**Checkpoint**: User Story 2 complete - Visual hierarchy and professional styling are fully implemented

---

## Phase 5: User Story 3 - Responsive Behavior & Accessibility (Priority: P2)

**Goal**: Add mobile-responsive drawer with hamburger menu for small screens

**Independent Test**: Resize browser to mobile width (<768px), verify hamburger menu appears, drawer opens/closes correctly, and navigation works on all screen sizes

### Implementation for User Story 3

- [ ] T047 [US3] Add mobileOpen state with useState<boolean>(false) in frontend/src/components/common/Layout.tsx
- [ ] T048 [US3] Create handleDrawerToggle function to toggle mobileOpen state in frontend/src/components/common/Layout.tsx
- [ ] T049 [US3] Import MenuIcon from @mui/icons-material/Menu in frontend/src/components/common/Layout.tsx
- [ ] T050 [US3] Import Drawer component from @mui/material in frontend/src/components/common/Layout.tsx
- [ ] T051 [US3] Add Drawer component with variant="temporary" before fixed sidebar in frontend/src/components/common/Layout.tsx
- [ ] T052 [US3] Configure Drawer to use sidebarContent variable for content in frontend/src/components/common/Layout.tsx
- [ ] T053 [US3] Set Drawer sx to display: { xs: 'block', lg: 'none' } in frontend/src/components/common/Layout.tsx
- [ ] T054 [US3] Set Drawer ModalProps keepMounted: true for better mobile performance in frontend/src/components/common/Layout.tsx
- [ ] T055 [US3] Update fixed sidebar Box to display: { xs: 'none', lg: 'block' } in frontend/src/components/common/Layout.tsx
- [ ] T056 [US3] Add hamburger IconButton to AppBar Toolbar with edge="start" in frontend/src/components/common/Layout.tsx
- [ ] T057 [US3] Set hamburger button sx to display: { lg: 'none' } in frontend/src/components/common/Layout.tsx
- [ ] T058 [US3] Add onClick={handleDrawerToggle} to hamburger button in frontend/src/components/common/Layout.tsx
- [ ] T059 [US3] Add aria-label="open drawer" to hamburger button in frontend/src/components/common/Layout.tsx
- [ ] T060 [US3] Update menu item onClick to call handleDrawerToggle on mobile in frontend/src/components/common/Layout.tsx

**Manual Testing for User Story 3**:
- [ ] T061 [US3] Desktop (>1024px) → Verify fixed sidebar visible, no hamburger menu
- [ ] T062 [US3] Tablet (768-1024px) → Verify appropriate sidebar behavior
- [ ] T063 [US3] Mobile (<768px) → Verify hamburger menu appears, sidebar hidden
- [ ] T064 [US3] Click hamburger → Verify drawer opens from left with smooth animation
- [ ] T065 [US3] Click menu item in drawer → Verify navigation occurs and drawer closes
- [ ] T066 [US3] Click outside drawer → Verify drawer closes
- [ ] T067 [US3] Press Escape with drawer open → Verify drawer closes
- [ ] T068 [US3] Test touch interactions on mobile device → Verify swipe gestures work

**Checkpoint**: User Story 3 complete - Responsive behavior works across all screen sizes

---

## Phase 6: User Story 4 - User Profile Integration in Sidebar (Priority: P2)

**Goal**: Enhance user profile section in sidebar footer with improved interaction and profile menu

**Independent Test**: User profile section displays name, avatar, role badge; clicking opens profile menu with logout working correctly

### Implementation for User Story 4

- [ ] T069 [US4] Verify user profile section exists in sidebar footer in frontend/src/components/common/Layout.tsx
- [ ] T070 [US4] Verify Avatar component shows first letter of user name in frontend/src/components/common/Layout.tsx
- [ ] T071 [US4] Verify Chip component shows user role with appropriate color in frontend/src/components/common/Layout.tsx
- [ ] T072 [US4] Verify getRoleColor function returns correct colors for each role in frontend/src/components/common/Layout.tsx
- [ ] T073 [US4] Add aria-label to user profile section in frontend/src/components/common/Layout.tsx
- [ ] T074 [US4] Verify logout button has aria-label in frontend/src/components/common/Layout.tsx
- [ ] T075 [US4] Add keyboard support (Enter/Space) to logout button in frontend/src/components/common/Layout.tsx
- [ ] T076 [US4] Verify Menu component opens on avatar click with proper ARIA attributes in frontend/src/components/common/Layout.tsx
- [ ] T077 [US4] Test profile menu items (Profile, Logout) are keyboard accessible in frontend/src/components/common/Layout.tsx
- [ ] T078 [US4] Add text truncation with ellipsis for long names/emails in frontend/src/components/common/Layout.tsx
- [ ] T079 [US4] Add tooltip on hover for truncated text in frontend/src/components/common/Layout.tsx

**Manual Testing for User Story 4**:
- [ ] T080 [US4] Login with user → Verify name, email, role display correctly
- [ ] T081 [US4] Verify role badge shows correct color (Admin: red, Faculty: blue, etc.)
- [ ] T082 [US4] Click avatar → Verify profile menu opens
- [ ] T083 [US4] Click Profile menu item → Verify navigation (if /profile exists)
- [ ] T084 [US4] Click Logout → Verify logout and redirect to login page
- [ ] T085 [US4] Tab to logout button → Verify focus visible
- [ ] T086 [US4] Press Enter on logout button → Verify logout works
- [ ] T087 [US4] Test with long name/email → Verify text truncates with ellipsis

**Checkpoint**: User Story 4 complete - User profile integration is fully functional

---

## Phase 7: User Story 5 - Notification & Quick Access Badge (Priority: P3)

**Goal**: Add notification badges to menu items showing pending action counts

**Independent Test**: Menu items display badge counts for pending items; counts update when items are addressed

**⚠️ NOTE**: This story requires backend API changes for notification counts - marked as future enhancement

### Implementation for User Story 5 (DEFERRED - POST-MVP)

- [ ] T088 [US5] Design notification count API endpoint specification
- [ ] T089 [US5] Import Badge component from @mui/material in frontend/src/components/common/Layout.tsx
- [ ] T090 [US5] Create useNotifications hook to fetch notification counts in frontend/src/hooks/useNotifications.ts
- [ ] T091 [US5] Integrate notification counts with menu items in frontend/src/components/common/Layout.tsx
- [ ] T092 [US5] Wrap menu item icons with Badge component in frontend/src/components/common/Layout.tsx
- [ ] T093 [US5] Configure Badge to show count only when > 0 in frontend/src/components/common/Layout.tsx
- [ ] T094 [US5] Add real-time update mechanism (WebSocket or polling) for notification counts
- [ ] T095 [US5] Test notification badge visibility for admin users (bookings, maintenance)
- [ ] T096 [US5] Test notification badge updates when items are addressed

**Checkpoint**: User Story 5 deferred to post-MVP (requires backend API)

---

## Phase 8: Performance Optimization (Cross-Cutting)

**Purpose**: Optimize rendering performance across all user stories

- [x] T097 [P] Extract NavigationMenuItem component with React.memo in frontend/src/components/common/Layout.tsx
- [x] T098 [P] Add useMemo for filtered menuItems based on user.role in frontend/src/components/common/Layout.tsx
- [x] T099 [P] Add useCallback for handleNavigate function in frontend/src/components/common/Layout.tsx
- [x] T100 [P] Add useMemo for isActive comparison per menu item in frontend/src/components/common/Layout.tsx
- [x] T101 Test sidebar render time using React DevTools Profiler → Verify <100ms
- [x] T102 Test navigation interaction time → Verify <1 second
- [x] T103 Test active state update time → Verify <200ms

**Checkpoint**: Performance optimizations complete - all targets met

---

## Phase 9: Polish & Final Validation

**Purpose**: Final testing and documentation before deployment

- [x] T104 [P] Add JSDoc comments to Layout component in frontend/src/components/common/Layout.tsx
- [x] T105 [P] Add TypeScript interface documentation for MenuItem type in frontend/src/components/common/Layout.tsx
- [x] T106 Run ESLint → Fix any warnings in Layout.tsx
- [x] T107 Run TypeScript compiler → Verify no type errors
- [ ] T108 Test in Chrome → Verify all features work
- [ ] T109 Test in Firefox → Verify all features work
- [ ] T110 Test in Safari → Verify all features work
- [ ] T111 Test in Edge → Verify all features work
- [ ] T112 Run WAVE accessibility checker → Verify no critical issues
- [ ] T113 Run axe DevTools → Verify WCAG 2.1 AA compliance
- [ ] T114 Test with screen reader (NVDA/VoiceOver) → Verify navigation announces correctly
- [ ] T115 Complete all acceptance scenarios from spec.md for P1 stories (Stories 1 & 2)
- [ ] T116 Verify all success criteria SC-001 through SC-008 from spec.md
- [ ] T117 Take before/after screenshots for PR documentation
- [ ] T118 Review quickstart.md validation checklist → Complete all items
- [x] T119 Git commit with message: "feat(ui): enhance sidebar with accessibility and professional design"
- [ ] T120 Create pull request with spec link, screenshots, and testing checklist

**Checkpoint**: Feature complete and ready for code review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase - Can start immediately after
- **User Story 2 (Phase 4)**: Depends on Foundational phase - Can run parallel with US1
- **User Story 3 (Phase 5)**: Depends on US1 and US2 completion (P2 priority)
- **User Story 4 (Phase 6)**: Independent of other stories (P2 priority)
- **User Story 5 (Phase 7)**: DEFERRED - Requires backend API (P3 priority)
- **Performance (Phase 8)**: Depends on US1 and US2 completion
- **Polish (Phase 9)**: Depends on all implemented user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Can run parallel with US1
- **User Story 3 (P2)**: Depends on US1 and US2 completion (builds on navigation)
- **User Story 4 (P2)**: Independent - Can start after Foundational phase
- **User Story 5 (P3)**: DEFERRED - Marked as post-MVP

### MVP Scope (Recommended)

**For 2-week sprint, implement ONLY**:
1. ✅ Phase 1: Setup (1 hour)
2. ✅ Phase 2: Foundational (2 hours)
3. ✅ Phase 3: User Story 1 - Persistent Navigation (3-4 hours)
4. ✅ Phase 4: User Story 2 - Visual Styling (2-3 hours)
5. ✅ Phase 8: Performance Optimization (1-2 hours)
6. ✅ Phase 9: Polish & Validation (2-3 hours)

**Total MVP Effort**: 11-15 hours

**DEFER to Post-MVP**:
- Phase 5: User Story 3 (Responsive) - 2-3 hours
- Phase 6: User Story 4 (Profile Enhancement) - 1-2 hours
- Phase 7: User Story 5 (Notification Badges) - Requires backend

### Parallel Opportunities

**Within Phase 1 (Setup)**:
- T003, T004, T005 can all run in parallel after T001-T002 complete

**Within Phase 2 (Foundational)**:
- T006-T010 can all be implemented in parallel (different sections of same file)

**Within Phase 3 (User Story 1)**:
- T011-T013 (ARIA attributes) can run in parallel
- T020-T028 (manual tests) can run in parallel if multiple testers

**Within Phase 4 (User Story 2)**:
- T029-T032 (visual enhancements) can run in parallel
- T039-T048 (manual tests) can run in parallel if multiple testers

**Across Phases**:
- User Story 1 (Phase 3) and User Story 2 (Phase 4) can be developed in parallel
- User Story 4 (Phase 6) can be developed in parallel with User Story 3 (Phase 5)

**Within Phase 8 (Performance)**:
- T097-T100 can all be implemented in parallel (independent optimizations)

**Within Phase 9 (Polish)**:
- T104-T105 (documentation) can run in parallel
- T108-T111 (browser testing) can run in parallel
- T112-T114 (accessibility testing) can run in parallel

### Sequential Requirements

**Must be sequential**:
- Phase 1 → Phase 2 → Phase 3/4 (Setup → Foundation → Implementation)
- T014 → T015 (keyboard support must be added before handler)
- T051-T054 → T055-T060 (Drawer setup before integration)
- T106-T107 → T108-T111 (Fix linting before browser testing)
- T115-T116 → T117-T120 (Complete testing before PR)

---

## Implementation Strategy

### Week 1: Core MVP (P1 Stories)

**Days 1-2**:
- Complete Phase 1: Setup
- Complete Phase 2: Foundational
- Begin Phase 3: User Story 1

**Days 3-4**:
- Complete Phase 3: User Story 1
- Complete Phase 4: User Story 2
- Manual testing for P1 stories

**Day 5**:
- Phase 8: Performance Optimization
- Phase 9: Polish & Validation (partial)

### Week 2: P2 Enhancements (Optional)

**Days 6-7**:
- Phase 5: User Story 3 (Responsive)
- Phase 6: User Story 4 (Profile Enhancement)

**Days 8-9**:
- Complete manual testing for P2 stories
- Complete Phase 9: Polish & Validation
- Code review and PR

**Day 10**:
- Address PR feedback
- Final testing and deployment

### Incremental Delivery Checkpoints

1. **After Phase 3**: User Story 1 is independently deployable and testable
2. **After Phase 4**: User Stories 1 & 2 together form minimum viable MVP
3. **After Phase 5**: Responsive behavior adds mobile support
4. **After Phase 6**: Enhanced profile integration improves UX
5. **After Phase 9**: Production-ready feature with full testing

---

## Task Summary

**Total Tasks**: 120
- Setup: 5 tasks
- Foundational: 5 tasks
- User Story 1 (P1): 19 tasks (11 implementation + 8 testing)
- User Story 2 (P1): 19 tasks (11 implementation + 8 testing)
- User Story 3 (P2): 22 tasks (14 implementation + 8 testing)
- User Story 4 (P2): 19 tasks (11 implementation + 8 testing)
- User Story 5 (P3): 9 tasks (deferred - requires backend)
- Performance: 7 tasks
- Polish: 17 tasks

**MVP Tasks (P1 + Core)**: 72 tasks
**P2 Enhancement Tasks**: 41 tasks
**P3 Future Tasks**: 9 tasks (deferred)

**Parallel Tasks**: 35 tasks marked with [P]
**Sequential Tasks**: 85 tasks (must follow dependencies)

**Estimated Effort**:
- MVP (P1 stories): 11-15 hours
- P2 enhancements: 4-6 hours
- P3 features: TBD (requires backend API)

**Constitution Compliance**: ✅ MVP-first approach, P1 stories prioritized, manual testing acceptable

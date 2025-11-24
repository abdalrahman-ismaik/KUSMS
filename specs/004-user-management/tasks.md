# Tasks: User Management System

## Phase 1: Setup
**Goal**: Initialize project structure for user management.

- [ ] T001 Create `backend/src/controllers/userController.js`
- [ ] T002 Create `backend/src/routes/users.js`
- [ ] T003 Create `frontend/src/components/users` directory
- [ ] T004 Create `frontend/src/services/userService.ts`

## Phase 2: Foundational
**Goal**: Ensure backend infrastructure is ready.

- [ ] T005 Verify `User` model in `backend/prisma/schema.prisma` matches requirements
- [ ] T006 Register user routes in `backend/src/server.js`

## Phase 3: View User List (US1)
**Goal**: Admin can view a list of all users.
**Test Criteria**: Admin sees user table; Non-admin gets 403.

- [ ] T007 [US1] Implement `getUsers` controller in `backend/src/controllers/userController.js`
- [ ] T008 [US1] Define `GET /` route in `backend/src/routes/users.js` with auth middleware
- [ ] T009 [US1] Implement `getUsers` method in `frontend/src/services/userService.ts`
- [ ] T010 [US1] Create `UserList.tsx` component in `frontend/src/components/users/UserList.tsx`
- [ ] T011 [US1] Integrate `UserList` into `frontend/src/pages/AdminPage.tsx`

## Phase 4: Create User (US2)
**Goal**: Admin can create new users.
**Test Criteria**: New user appears in list; Email validation works.

- [ ] T012 [US2] Implement `createUser` controller in `backend/src/controllers/userController.js`
- [ ] T013 [US2] Define `POST /` route in `backend/src/routes/users.js`
- [ ] T014 [US2] Implement `createUser` method in `frontend/src/services/userService.ts`
- [ ] T015 [US2] Create `UserForm.tsx` component in `frontend/src/components/users/UserForm.tsx`
- [ ] T016 [US2] Create `UserModal.tsx` wrapper in `frontend/src/components/users/UserModal.tsx`
- [ ] T017 [US2] Add "Add User" button and modal logic to `frontend/src/components/users/UserList.tsx`

## Phase 5: Update User Role (US3)
**Goal**: Admin can update user details and roles.
**Test Criteria**: Role change persists; Self-demotion protection (optional/backend check).

- [ ] T018 [US3] Implement `updateUser` controller in `backend/src/controllers/userController.js`
- [ ] T019 [US3] Define `PATCH /:id` route in `backend/src/routes/users.js`
- [ ] T020 [US3] Implement `updateUser` method in `frontend/src/services/userService.ts`
- [ ] T021 [US3] Update `UserForm.tsx` to support editing mode in `frontend/src/components/users/UserForm.tsx`
- [ ] T022 [US3] Add "Edit" action to `frontend/src/components/users/UserList.tsx`

## Phase 6: Delete User (US4)
**Goal**: Admin can delete users.
**Test Criteria**: User removed from list; Self-deletion prevented.

- [ ] T023 [US4] Implement `deleteUser` controller in `backend/src/controllers/userController.js`
- [ ] T024 [US4] Define `DELETE /:id` route in `backend/src/routes/users.js`
- [ ] T025 [US4] Implement `deleteUser` method in `frontend/src/services/userService.ts`
- [ ] T026 [US4] Add "Delete" action with confirmation to `frontend/src/components/users/UserList.tsx`

## Phase 7: Polish
**Goal**: Ensure robust error handling and UX.

- [ ] T027 Add error handling and loading states to `UserList.tsx`
- [ ] T028 Add form validation feedback to `UserForm.tsx`

## Dependencies
1. Setup & Foundational -> US1
2. US1 -> US2, US3, US4 (UI dependency on List)
3. US2, US3, US4 can be implemented in parallel after US1

## Implementation Strategy
- **MVP Scope**: All phases (US1-US4) are P1 and required for MVP.
- **Execution**:
    1. Backend API first for each story.
    2. Frontend Service integration.
    3. UI Component implementation.
    4. Integration into Admin Dashboard.

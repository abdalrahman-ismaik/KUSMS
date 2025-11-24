# Implementation Plan: Facility Management Frontend

**Branch**: `003-facility-management` | **Date**: 2025-11-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-facility-management/spec.md`

## Summary

Implement the frontend interface for managing facilities in the Admin Dashboard. This includes listing facilities, creating new ones, editing existing ones, and deleting them. The backend API is already available.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Framework**: Vite
**Styling**: CSS Modules / Tailwind (existing patterns)
**State Management**: React Context / Local State
**API**: Existing `facilityService.ts`

## Proposed Changes

### Frontend

#### 1. Components
- Create `src/components/facilities/` directory.
- **`FacilityList.tsx`**:
    - Fetches and displays a list of facilities.
    - Uses `facilityService.getAll()`.
    - Columns: Name, Type, Capacity, Location, Actions (Edit, Delete).
- **`FacilityForm.tsx`**:
    - Form for creating/editing a facility.
    - Fields: Name, Type (dropdown), Capacity (number), Location, Description.
    - Validation: Required fields.
- **`FacilityModal.tsx`**:
    - Wraps `FacilityForm` in a modal for "Add" and "Edit" actions.

#### 2. Pages
- **`src/pages/AdminPage.tsx`**:
    - Replace the "Facility management coming soon..." placeholder.
    - Render `FacilityList` when the "Facilities" tab is active.

#### 3. Services
- Verify `src/services/facilityService.ts` has all necessary methods (`getAll`, `create`, `update`, `delete`).

## Verification Plan

### Automated Tests
- Run `npm test` (if applicable).
- Linting: `npm run lint`.

### Manual Verification
1.  **List**: Login as Admin -> Go to Facilities -> Check if list loads.
2.  **Create**: Click "Add Facility" -> Fill form -> Submit -> Check list update.
3.  **Edit**: Click "Edit" -> Change data -> Submit -> Check list update.
4.  **Delete**: Click "Delete" -> Confirm -> Check list update.  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**MVP-First Validation** (per Constitution v1.0.0):
- [ ] Feature delivers clear user value (P1 priority justified)
- [ ] Scope is minimal viable implementation (no gold-plating)
- [ ] User stories are independently testable
- [ ] Implementation can complete within timeline constraints
- [ ] Uses proven technologies (no experimental tools)

**Pre-Deployment Gates**:
- [ ] P1 user stories manually tested and working
- [ ] No critical bugs blocking core functionality  
- [ ] Basic error handling in place

**NOT Required for MVP**:
- ❌ Test coverage thresholds
- ❌ Performance benchmarks
- ❌ Comprehensive documentation

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

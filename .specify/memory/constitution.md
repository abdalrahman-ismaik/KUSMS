<!--
Sync Impact Report - Constitution v1.0.0
========================================
Version Change: Initial → 1.0.0 (INITIAL RELEASE)
Rationale: First constitution establishing MVP-focused development principles for 3-week timeline

Principles Defined:
  ✓ I. MVP-First Development (speed over perfection)
  ✓ II. Clean Code Over Documentation (readable, self-documenting code)
  ✓ III. Working Software Over Comprehensive Testing (functional tests only)

Modified Sections:
  ✓ Added: MVP Development Standards
  ✓ Added: Quality Gates (minimal for speed)

Templates Requiring Updates:
  ⚠ plan-template.md - Review Constitution Check section
  ⚠ spec-template.md - Align with MVP-first approach
  ⚠ tasks-template.md - Ensure MVP task prioritization

Follow-up TODOs:
  - None (all placeholders filled)

Commit Message: "docs: establish constitution v1.0.0 (MVP-first for 3-week timeline)"
-->

# KUSMS Constitution

## Core Principles

### I. MVP-First Development

**Rule**: Deliver working functionality over perfect implementation. Every feature MUST be independently deployable and demonstrable.

**Rationale**: With a 3-week timeline, speed is critical. Focus on core user journeys (P1 priority) that deliver immediate value. Defer nice-to-haves (P2+) until MVP is validated.

**Requirements**:
- Implement minimum viable scope for each feature
- Prioritize functional completeness over code elegance
- Ship features incrementally as they become usable
- No gold-plating or premature optimization

### II. Clean Code Over Documentation

**Rule**: Code MUST be self-documenting through clear naming, simple logic, and minimal abstraction. Heavy documentation is NOT required.

**Rationale**: Documentation becomes outdated quickly in fast-paced development. Clean, readable code is the best documentation and enables rapid iteration.

**Requirements**:
- Use descriptive variable/function names that explain intent
- Keep functions small and focused (single responsibility)
- Avoid deep nesting and complex conditionals
- Comments only for "why" decisions, not "what" the code does
- No requirement for comprehensive API documentation in MVP phase

### III. Working Software Over Comprehensive Testing

**Rule**: Focus on functional testing that proves the feature works. Unit tests are OPTIONAL unless explicitly needed.

**Rationale**: For MVP speed, manual testing of user scenarios is acceptable. Automated testing should focus on critical paths and high-risk areas only.

**Requirements**:
- Every user story MUST be manually testable with clear acceptance criteria
- Automated tests only for: critical business logic, data persistence, authentication/authorization
- Integration tests for end-to-end user journeys (P1 priority stories)
- No test coverage requirements—test what matters for user confidence

## MVP Development Standards

**Scope Management**:
- Implement P1 (critical) user stories first
- P2+ stories deferred unless time permits
- Features must be independently testable and deployable
- Cut scope aggressively to meet 3-week deadline

**Technical Decisions**:
- Use proven, familiar technologies (no experimental tools)
- Leverage existing libraries/frameworks over custom solutions
- Monolithic architecture acceptable for MVP (microservices deferred)
- Minimal infrastructure—prefer simple deployment (e.g., single server, managed services)

**Code Organization**:
- Simple folder structure: `src/`, `tests/`, `docs/`
- Co-locate related functionality (avoid premature modularization)
- Refactor only when necessary for next feature

## Quality Gates

**Pre-Implementation**:
- [ ] Constitution check: Feature aligns with MVP-first principles
- [ ] User stories prioritized (P1/P2/P3)
- [ ] Acceptance criteria defined and manually testable

**Pre-Deployment**:
- [ ] P1 user stories manually tested and working
- [ ] No critical bugs blocking core functionality
- [ ] Basic error handling in place (no silent failures)

**NOT Required for MVP**:
- ❌ Code review approvals (optional but not blocking)
- ❌ Test coverage thresholds
- ❌ Performance benchmarks
- ❌ Comprehensive logging/monitoring
- ❌ Security audits (basic security practices applied, formal audit deferred)

## Governance

**Amendment Process**:
- Constitution changes require clear justification tied to project needs
- Version increments follow semantic versioning:
  - MAJOR: Principle removal or fundamental philosophy change
  - MINOR: New principle or section added
  - PATCH: Clarifications, wording improvements

**Compliance**:
- This constitution supersedes all other development practices
- When in conflict between principle and timeline, timeline takes precedence (document the deviation)
- Post-MVP, revisit constitution to add rigor (testing, documentation, code review)

**Decision Authority**:
- Project lead has final say on scope cuts and priority decisions
- Team members empowered to make technical decisions aligned with MVP-first principle
- Complexity must be justified against 3-week timeline constraint

**Version**: 1.0.0 | **Ratified**: 2025-11-03 | **Last Amended**: 2025-11-03

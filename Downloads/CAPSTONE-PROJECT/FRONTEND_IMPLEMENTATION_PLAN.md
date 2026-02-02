# VoteXpert Frontend Implementation Plan

## Overview
Building a modern React frontend for the VoteXpert e-voting platform using TanStack Router, TanStack Query, shadcn/ui, and nanostores following atomic design principles.

---

## Tech Stack
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query (React Query)** - Server state management & caching
- **nanostores** - Client state management (auth, UI state)
- **shadcn/ui** - UI component library (built on Radix UI + Tailwind)
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hook Form + Zod** - Form handling & validation

---

## Project Structure (Atomic Design)

```
src/
├── api/                          # API layer
│   ├── client.ts                 # Axios instance with interceptors
│   ├── endpoints.ts              # API endpoint constants
│   └── services/
│       ├── admin.service.ts      # Admin API calls
│       ├── voter.service.ts      # Voter API calls
│       └── election.service.ts   # Election API calls
│
├── components/
│   ├── atoms/                    # Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Badge/
│   │   ├── Spinner/
│   │   ├── Avatar/
│   │   └── Icon/
│   │
│   ├── molecules/                # Combinations of atoms
│   │   ├── FormField/
│   │   ├── OtpInput/
│   │   ├── SearchInput/
│   │   ├── StatCard/
│   │   ├── CandidateCard/
│   │   ├── ElectionCard/
│   │   └── AlertMessage/
│   │
│   ├── organisms/                # Complex UI sections
│   │   ├── LoginForm/
│   │   ├── OtpVerificationForm/
│   │   ├── FaceCapture/
│   │   ├── ElectionList/
│   │   ├── CandidateGrid/
│   │   ├── VotingBallot/
│   │   ├── ResultsChart/
│   │   ├── StatisticsDashboard/
│   │   ├── CreateElectionForm/
│   │   ├── CsvUploader/
│   │   └── DataTable/
│   │
│   └── templates/                # Page layouts
│       ├── AuthLayout/           # Login/OTP/Face verification layout
│       ├── VoterLayout/          # Voter dashboard layout
│       └── AdminLayout/          # Admin dashboard layout
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useCamera.ts
│   ├── useElection.ts
│   └── useVoting.ts
│
├── stores/                       # Nanostore state
│   ├── auth.store.ts             # Authentication state
│   ├── election.store.ts         # Current election state
│   └── ui.store.ts               # UI state (modals, toasts)
│
├── routes/                       # TanStack Router pages
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Landing/mode selection
│   │
│   ├── voter/
│   │   ├── login.tsx
│   │   ├── verify-email.$token.tsx
│   │   ├── otp.tsx
│   │   ├── face-verification.tsx
│   │   ├── elections/
│   │   │   ├── index.tsx         # Election list
│   │   │   └── $electionId/
│   │   │       ├── index.tsx     # Election details
│   │   │       ├── vote.tsx      # Voting ballot
│   │   │       └── success.tsx   # Vote confirmation
│   │   └── results.$electionId.tsx
│   │
│   └── admin/
│       ├── login.tsx
│       ├── otp.tsx
│       ├── dashboard.tsx
│       └── elections/
│           ├── index.tsx         # Elections list
│           ├── create.tsx        # Create election
│           └── $electionId/
│               ├── index.tsx     # Election details
│               └── statistics.tsx
│
├── lib/                          # Utilities
│   ├── utils.ts                  # General utilities (cn, formatDate)
│   ├── validators.ts             # Zod schemas
│   └── constants.ts              # App constants
│
├── types/                        # TypeScript types
│   ├── api.types.ts              # API response types
│   ├── auth.types.ts             # Auth-related types
│   ├── election.types.ts         # Election types
│   └── voter.types.ts            # Voter types
│
├── App.tsx                       # Router provider setup
├── main.tsx                      # Entry point
└── index.css                     # Global styles + Tailwind
```

---

## Implementation Phases (Commits)

### Phase 1: Project Setup & Core Infrastructure
**Commit 1.1: Initialize project with Vite + React + TypeScript**
- Create new Vite project
- Configure TypeScript
- Set up folder structure
- Add essential dev dependencies

**Commit 1.2: Install and configure Tailwind CSS + shadcn/ui**
- Install Tailwind CSS
- Configure tailwind.config.js with custom theme (blue-950, green-400 brand colors)
- Initialize shadcn/ui
- Add base shadcn components (Button, Input, Card, etc.)

**Commit 1.3: Set up TanStack Router**
- Install @tanstack/react-router
- Create root route and route tree
- Set up file-based routing structure
- Create basic route guards for auth

**Commit 1.4: Set up TanStack Query**
- Install @tanstack/react-query
- Configure QueryClient with defaults
- Set up QueryClientProvider
- Add React Query DevTools

**Commit 1.5: Set up nanostores for state management**
- Install nanostores and @nanostores/react
- Create auth store (tokens, user info, isAuthenticated)
- Create UI store (loading states, modals, toasts)
- Create election store (current election context)

**Commit 1.6: Create API client and services**
- Set up Axios instance with base URL
- Add request/response interceptors for auth tokens
- Add token refresh logic
- Create service files for admin, voter, election APIs

---

### Phase 2: Atomic Components (Atoms & Molecules)
**Commit 2.1: Create atom components**
- Button (variants: primary, secondary, outline, ghost, destructive)
- Input (with error state support)
- Label
- Badge (for status indicators)
- Spinner/Loader
- Avatar (for candidate photos)
- Icon wrapper component

**Commit 2.2: Create molecule components - Part 1**
- FormField (Label + Input + Error message)
- OtpInput (6-digit input with auto-focus)
- SearchInput (Input + search icon)
- AlertMessage (success/error/warning/info)

**Commit 2.3: Create molecule components - Part 2**
- StatCard (icon + label + value + trend)
- CandidateCard (photo + name + position + bio)
- ElectionCard (name + status badge + dates + action button)
- StepIndicator (progress steps for auth flow)

---

### Phase 3: Complex Components (Organisms)
**Commit 3.1: Authentication organisms**
- LoginForm (admin & voter variants)
- OtpVerificationForm (with timer and resend)
- FaceCapture (camera access, capture, preview)

**Commit 3.2: Election organisms**
- ElectionList (grid of ElectionCards with filtering)
- CandidateGrid (grouped by position)
- VotingBallot (position-by-position selection)
- VoteReceipt (confirmation details)

**Commit 3.3: Admin organisms**
- CreateElectionForm (multi-step form)
- CsvUploader (drag-drop with preview)
- DataTable (sortable, filterable table for voters/candidates)
- StatisticsDashboard (charts + real-time stats)

**Commit 3.4: Results organisms**
- ResultsChart (bar/pie charts per position)
- WinnerCard (highlighted winner display)
- TurnoutStats (voter participation metrics)

---

### Phase 4: Layout Templates
**Commit 4.1: Create AuthLayout template**
- Centered card layout
- Logo + branding
- Step indicator for multi-step flows
- Background styling

**Commit 4.2: Create VoterLayout template**
- Header with voter info + logout
- Main content area
- Navigation breadcrumbs
- Mobile-responsive design

**Commit 4.3: Create AdminLayout template**
- Sidebar navigation
- Top bar with admin info
- Main content area with breadcrumbs
- Collapsible sidebar for mobile

---

### Phase 5: Voter Flow Implementation
**Commit 5.1: Voter login route**
- Login page with voter_id + email form
- Integration with voter/login/initiate API
- Error handling and validation
- Redirect to email verification message

**Commit 5.2: Email verification route**
- Handle /voter/verify/:token route
- Auto-verify and redirect to OTP
- Error handling for invalid/expired tokens

**Commit 5.3: OTP verification route**
- OTP input form
- Timer with resend functionality
- Integration with voter/verify/otp API
- Redirect to face verification

**Commit 5.4: Face verification route**
- Camera access and preview
- Capture and submit photo
- Integration with voter/verify/face API
- Store tokens on success
- Redirect to elections

**Commit 5.5: Election selection route**
- List available elections for voter
- Show election status and dates
- Integration with voter/profile and voter/elections APIs
- Navigate to voting or results based on status

**Commit 5.6: Voting ballot route**
- Display candidates by position
- Selection mechanism (one per position)
- Review selections before submit
- Integration with voter/elections/{id}/vote API
- Prevent double voting

**Commit 5.7: Vote success route**
- Display vote receipt
- Show confirmation details
- Option to view results (if available)
- Logout option

**Commit 5.8: Results viewing route**
- Display election results
- Charts and statistics
- Winners per position
- Integration with elections/{id}/results API

---

### Phase 6: Admin Flow Implementation
**Commit 6.1: Admin login route**
- Login form (username/email + password)
- Integration with admin/login API
- Store session token
- Redirect to OTP verification

**Commit 6.2: Admin OTP verification route**
- OTP input form
- Integration with admin/verify-otp API
- Store access/refresh tokens
- Redirect to dashboard

**Commit 6.3: Admin dashboard route**
- Overview statistics cards
- Recent elections list
- Quick actions (create election)
- Integration with admin APIs

**Commit 6.4: Elections list route (admin)**
- DataTable of all elections
- Filter by status
- Pagination
- Actions (view, edit status)

**Commit 6.5: Create election route**
- Multi-step form:
  1. Basic info (name, description, dates)
  2. Positions configuration
  3. Candidates CSV upload
  4. Voters CSV upload
  5. Review and submit
- Integration with admin/elections POST API

**Commit 6.6: Election details route (admin)**
- Full election information
- Candidates list
- Voters list (with voting status)
- Status management
- Integration with admin/elections/{id} API

**Commit 6.7: Live statistics route**
- Real-time voting statistics
- Auto-refresh with configurable interval
- Charts (turnout trend, votes by position)
- Integration with admin/elections/{id}/statistics API

---

### Phase 7: Polish & Production Ready
**Commit 7.1: Error handling & loading states**
- Global error boundary
- API error handling with toast notifications
- Skeleton loaders for all data-fetching states
- Retry mechanisms

**Commit 7.2: Form validation with Zod**
- Create Zod schemas for all forms
- Integrate with React Hook Form
- Display validation errors inline
- Server-side error mapping

**Commit 7.3: Responsive design refinements**
- Mobile-first approach review
- Tablet breakpoints
- Touch-friendly interactions
- Test on various screen sizes

**Commit 7.4: Accessibility improvements**
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader testing

**Commit 7.5: Performance optimization**
- Code splitting with lazy routes
- Image optimization
- React Query cache tuning
- Bundle size analysis

**Commit 7.6: Security hardening**
- XSS prevention
- CSRF protection
- Secure token storage
- Input sanitization

**Commit 7.7: Final testing & documentation**
- Component documentation
- API integration tests
- E2E testing setup
- README with setup instructions

---

## API Endpoints Summary

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /admin/login | Request OTP (username + password) |
| POST | /admin/verify-otp | Verify OTP, get tokens |
| POST | /admin/elections | Create new election |
| GET | /admin/elections/{id} | Get election details |
| GET | /admin/elections/{id}/statistics | Get live statistics |
| PATCH | /admin/elections/{id}/status | Update election status |

### Voter Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /voter/login/initiate | Send verification email |
| GET | /voter/verify/{token} | Verify email, send OTP |
| POST | /voter/verify/otp | Verify OTP |
| POST | /voter/verify/face | Face verification |
| GET | /voter/profile | Get voter profile |
| GET | /voter/elections/{id} | Get election info |
| GET | /voter/elections/{id}/candidates | Get candidates |
| POST | /voter/elections/{id}/vote | Cast vote |

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /elections/{id}/results | Get election results |

---

## State Management Strategy

### Nanostores (Client State)
```typescript
// auth.store.ts
- $accessToken: atom<string | null>
- $refreshToken: atom<string | null>
- $user: atom<Admin | Voter | null>
- $userType: atom<'admin' | 'voter' | null>
- $isAuthenticated: computed

// ui.store.ts
- $isLoading: atom<boolean>
- $toasts: atom<Toast[]>
- $activeModal: atom<string | null>

// election.store.ts
- $currentElectionId: atom<string | null>
- $selectedCandidates: map<Record<string, string>>
```

### TanStack Query (Server State)
- All API data fetching
- Automatic caching and invalidation
- Optimistic updates where appropriate
- Background refetching for live data

---

## Reusable Patterns (DRY)

### Custom Hooks
- `useAuth()` - Authentication actions and state
- `useProtectedRoute()` - Route guard hook
- `useCamera()` - Camera access and capture
- `useCountdown()` - Timer for OTP expiry
- `useApiMutation()` - Standardized mutation handling

### Shared Validators
- Email validation schema
- OTP validation schema
- Election form validation schema
- CSV file validation

### Component Composition
- All form fields use FormField molecule
- All cards follow consistent spacing/styling
- All data tables use same DataTable organism
- All modals use consistent Modal template

---

## Brand Theme
```javascript
// tailwind.config.js colors
colors: {
  primary: {
    DEFAULT: '#22c55e', // green-500
    foreground: '#ffffff',
  },
  background: '#172554', // blue-950
  card: 'rgba(51, 65, 85, 0.5)', // slate-700/50
  accent: '#4ade80', // green-400
  muted: '#94a3b8', // slate-400
}
```

---

## Next Steps
1. Review this plan
2. Confirm any modifications needed
3. Begin implementation phase by phase
4. Review after each phase completion

---

*Plan created: January 2026*
*Target: Production-ready voting platform frontend*

# Project Constitution: Conference / Webinar Registration + Admin Dashboard

## 1. Data Schemas
> **Status:** Defined (Phase 1)
> **storage:** `src/data/db.json` (Local JSON Source of Truth)

### `RegistrationDraft` (Client-side State)
```typescript
interface RegistrationDraft {
  currentStep: number; // 1, 2, 3
  personal?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
  };
  motivation?: {
    message: string; // "Why do you want to join?"
  };
}
```

### `RegistrationRecord` (Persisted)
```typescript
interface RegistrationRecord extends RegistrationDraft {
  id: string; // UUID
  createdAt: string; // ISO Date
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  webinarLink?: string; // Assigned webinar link
}
```

### `AdminCredentials` (Mock Auth)
```typescript
interface AdminCredentials {
  id: string;
  email: string;
  passwordHash: string; // Simple mock hash or plain for demo if allowed
  name: string;
}
```

### `FinanceEntry`
```typescript
interface FinanceEntry {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  date: string;
  category: string;
}
```

### `CalendarEvent`
```typescript
interface CalendarEvent {
  id: string;
  title: string; // e.g., "Webinar Session 1"
  start: string; // ISO Date
  end: string;   // ISO Date
  link?: string; // Google Meet Link
  attendees?: string[]; // Array of RegistrationRecord IDs
}
```

## 2. Behavioral Rules
- **Priority:** Reliability > Speed.
- **Logic:** Never guess business logic. Use strict defaults.
- **UI:** Clean, deterministic, self-healing.
- **Registration:** 
    - 3 Steps: Personal -> Address -> Motivation.
    - Post-Submit: Modal Popup "Account created. Wait for Meet link."
- **Admin:**
    - Local Auth (Email/Pass).
    - Dashboard: Members, Analytics, Finance, Calendar.


## 3. Route Map
| Route | Description |
| :--- | :--- |
| `/` | Landing / Redirect |
| `/register` | Registration Step 1 (Personal) |
| `/register/address` | Registration Step 2 (Address) |
| `/register/motivation` | Registration Step 3 (Motivation) |
| `/register/success` | Success Modal / Popup |
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Dashboard Home |
| `/admin/dashboard/members` | Registered Users |
| `/admin/dashboard/analytics` | Analytics |
| `/admin/dashboard/finance` | Finance |
| `/admin/dashboard/calendar` | Calendar |

## 4. UI Theme & Tokens
> **Source:** Reference Image (Pending)
> **Palette:** TBD

## Database Constitution
> **Status:** Pending Discovery
> **Target:** Supabase (Default) or Neon
> **Rules:**
> - Never store raw passwords.
> - `end_at` > `start_at` for events.
> - `amount` > 0 for finance.

### Schema Definitions (Final)
#### `registrations`
- `id`: uuid (PK)
- `first_name`: text
- `last_name`: text
- `email`: text (UNIQUE)
- `phone`: text
- `address_street`: text
- `address_city`: text
- `address_country`: text
- `address_zip`: text
- `motivation`: text
- `status`: text (default: 'PENDING')
- `created_at`: timestamptz (default: now())

#### `admin_users`
- `id`: uuid (PK)
- `email`: text (UNIQUE)
- `password_hash`: text
- `name`: text
- `role`: text (default: 'admin')
- `created_at`: timestamptz

#### `calendar_events`
- `id`: uuid (PK)
- `title`: text
- `start_at`: timestamptz
- `end_at`: timestamptz
- `meet_link`: text
- `created_at`: timestamptz

#### `finance_entries`
- `id`: uuid (PK)
- `type`: text ('INCOME' | 'EXPENSE')
- `amount`: numeric
- `category`: text
- `description`: text
- `date`: date
- `created_at`: timestamptz

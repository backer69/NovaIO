# SOP: Admin Authentication

## Overview
Simple handling of admin login using local credentials. No external providers.

## Credentials
- Sources from `src/data/db.json` (or hardcoded for MVP if requested, but JSON preferred per schema).
- **Auth Flow**:
    1. User enters Email/Password at `/admin/login`.
    2. System hashes input password (simple comparison for MVP).
    3. Finds admin in `AdminCredentials`.
    4. If match -> Set Session Cookie (or LocalStorage token) -> Redirect to `/admin/dashboard`.

## Session Management
- **Middleware**: customized `middleware.ts` to protect `/admin/dashboard/*` routes.
- **Check**: Verify presence of valid auth token.

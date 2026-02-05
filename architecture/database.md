# SOP: Database Management

## Overview
We use Supabase (PostgreSQL) as the primary data store, with a fallback to `src/data/db.json` for strictly local development if keys are missing.

## Schema
See `architecture/schema.sql` for the SQL definitions.

## Tables
1.  **registrations**: All user sign-ups.
2.  **admin_users**: Access to the dashboard.
3.  **calendar_events**: Webinar schedules.
4.  **finance_entries**: Income/Expense tracking.

## Connecting
1.  Create a Supabase project.
2.  Run the contents of `architecture/schema.sql` in the Supabase SQL Editor.
3.  Copy the Project URL and Anon Key.
4.  Paste them into `.env.local`.
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=...
    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
    ```

## Logic
The application logic in `lib/data.ts` (future update) will attempt to read from Supabase. If valid credentials are not found, it handles data locally.

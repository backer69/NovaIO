create extension if not exists "uuid-ossp";

create table public.registrations (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  address_street text,
  address_city text,
  address_country text,
  address_zip text,
  motivation text not null,
  status text default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Admin Users Table
create table public.admin_users (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  password_hash text not null,
  name text,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Calendar Events Table
create table public.calendar_events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  start_at timestamp with time zone not null,
  end_at timestamp with time zone not null,
  meet_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  check (end_at > start_at)
);

-- 4. Finance Entries Table
create table public.finance_entries (
  id uuid default uuid_generate_v4() primary key,
  type text not null check (type in ('INCOME', 'EXPENSE')),
  amount numeric not null check (amount > 0),
  category text,
  description text,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies would go here.
-- For now, we assume service role key usage or public access depending on auth setup.
-- Standard practice: Enable RLS.
alter table public.registrations enable row level security;
alter table public.admin_users enable row level security;
alter table public.calendar_events enable row level security;
alter table public.finance_entries enable row level security;

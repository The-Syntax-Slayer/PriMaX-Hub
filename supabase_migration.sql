-- =============================================
-- PriMaX Hub — Supabase Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- PROFILES (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  focus_areas text[] default '{}',
  primary_goal text,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users manage own profile" on public.profiles
  for all using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- TASKS (Productivity)
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo','inprogress','done')),
  priority text default 'medium' check (priority in ('low','medium','high')),
  due_date date,
  created_at timestamptz default now()
);
alter table public.tasks enable row level security;
create policy "Users manage own tasks" on public.tasks
  for all using (auth.uid() = user_id);

-- HABITS
create table if not exists public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  icon text default '✅',
  color text default '#7c3aed',
  module text default 'productivity' check (module in ('productivity','fitness','mental')),
  completions date[] default '{}',
  streak int default 0,
  created_at timestamptz default now()
);
alter table public.habits enable row level security;
create policy "Users manage own habits" on public.habits
  for all using (auth.uid() = user_id);

-- NOTES (Productivity)
create table if not exists public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.notes enable row level security;
create policy "Users manage own notes" on public.notes
  for all using (auth.uid() = user_id);

-- CAREER PROFILES
-- Note: "current_role" is a PostgreSQL reserved word; using "current_position" instead.
create table if not exists public.career_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  current_position text,
  target_role text,
  industry text,
  current_skills text[] default '{}',
  target_skills text[] default '{}',
  timeline text,
  ai_summary text,
  ai_quick_win text,
  skill_gaps text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.career_profiles enable row level security;
create policy "Users manage own career profile" on public.career_profiles
  for all using (auth.uid() = user_id);

-- CAREER MILESTONES
create table if not exists public.career_milestones (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  deadline text,
  description text,
  color text default '#7c3aed',
  progress int default 0,
  status text default 'upcoming' check (status in ('active','upcoming','done')),
  created_at timestamptz default now()
);
alter table public.career_milestones enable row level security;
create policy "Users manage own milestones" on public.career_milestones
  for all using (auth.uid() = user_id);

-- JOB APPLICATIONS
-- Note: "role" is a PostgreSQL reserved word; using "job_role" instead.
create table if not exists public.job_applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  company text not null,
  job_role text not null,
  status text default 'Applied' check (status in ('Applied','Screening','Interview','Offer','Rejected')),
  salary text,
  notes text,
  applied_date date default current_date,
  color text default '#7c3aed',
  created_at timestamptz default now()
);
alter table public.job_applications enable row level security;
create policy "Users manage own job apps" on public.job_applications
  for all using (auth.uid() = user_id);

-- TRANSACTIONS (Finance)
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount decimal(12,2) not null,
  type text not null check (type in ('income','expense')),
  category text,
  date date default current_date,
  created_at timestamptz default now()
);
alter table public.transactions enable row level security;
create policy "Users manage own transactions" on public.transactions
  for all using (auth.uid() = user_id);

-- BUDGETS
create table if not exists public.budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  limit_amount decimal(12,2) not null,
  color text default '#7c3aed',
  created_at timestamptz default now()
);
alter table public.budgets enable row level security;
create policy "Users manage own budgets" on public.budgets
  for all using (auth.uid() = user_id);

-- SAVINGS GOALS
create table if not exists public.savings_goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  target_amount decimal(12,2) not null,
  current_amount decimal(12,2) default 0,
  target_date date,
  color text default '#10b981',
  icon text default '🎯',
  created_at timestamptz default now()
);
alter table public.savings_goals enable row level security;
create policy "Users manage own savings goals" on public.savings_goals
  for all using (auth.uid() = user_id);

-- SUBSCRIPTIONS
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  amount decimal(12,2) not null,
  billing_cycle text default 'monthly' check (billing_cycle in ('monthly','yearly','weekly')),
  category text,
  color text default '#7c3aed',
  next_billing date,
  created_at timestamptz default now()
);
alter table public.subscriptions enable row level security;
create policy "Users manage own subscriptions" on public.subscriptions
  for all using (auth.uid() = user_id);

-- WORKOUTS (Fitness)
create table if not exists public.workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text,
  duration_minutes int,
  notes text,
  completed_at date default current_date,
  created_at timestamptz default now()
);
alter table public.workouts enable row level security;
create policy "Users manage own workouts" on public.workouts
  for all using (auth.uid() = user_id);

-- JOURNAL ENTRIES (Mental Growth)
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text,
  content text not null,
  mood_icon text default '📝',
  color text default '#7c3aed',
  created_at timestamptz default now()
);
alter table public.journal_entries enable row level security;
create policy "Users manage own journal entries" on public.journal_entries
  for all using (auth.uid() = user_id);

-- MOOD LOGS
create table if not exists public.mood_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  mood_value int not null check (mood_value between 1 and 5),
  note text,
  logged_at timestamptz default now()
);
alter table public.mood_logs enable row level security;
create policy "Users manage own mood logs" on public.mood_logs
  for all using (auth.uid() = user_id);

-- GRATITUDE ENTRIES
create table if not exists public.gratitude_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  items text[] not null,
  created_at timestamptz default now()
);
alter table public.gratitude_entries enable row level security;
create policy "Users manage own gratitude entries" on public.gratitude_entries
  for all using (auth.uid() = user_id);

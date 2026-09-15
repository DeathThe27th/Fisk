create extension if not exists pgcrypto;

create table if not exists profiles (user_id text primary key, email text, display_name text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists preferences (user_id text primary key references profiles(user_id) on delete cascade, sectors jsonb not null default '[]', risk_tolerance text, horizon text, experience_level text, default_view text, updated_at timestamptz not null default now());
create table if not exists watchlist_items (id uuid primary key default gen_random_uuid(), user_id text not null references profiles(user_id) on delete cascade, ticker text not null, asset_type text not null check (asset_type in ('equity','rtoken')), created_at timestamptz not null default now(), unique(user_id,ticker,asset_type));
create table if not exists research_sessions (id uuid primary key default gen_random_uuid(), user_id text not null references profiles(user_id) on delete cascade, title text not null, query text not null, primary_ticker text, status text not null default 'complete', synthesis jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists research_evidence (id uuid primary key default gen_random_uuid(), session_id uuid not null references research_sessions(id) on delete cascade, provider text not null, source_url text, title text not null, published_at timestamptz, fetched_at timestamptz not null, payload jsonb not null default '{}');
create table if not exists research_steps (id uuid primary key default gen_random_uuid(), session_id uuid not null references research_sessions(id) on delete cascade, tool_name text not null, state text not null, summary text, started_at timestamptz not null default now(), completed_at timestamptz);
create table if not exists journal_entries (id uuid primary key default gen_random_uuid(), user_id text not null references profiles(user_id) on delete cascade, session_id uuid references research_sessions(id) on delete set null, ticker text not null, decision text not null check (decision in ('watching','bullish','bearish','no-action')), thesis text not null, confidence text not null, invalidation text not null, horizon text, review_at timestamptz, outcome jsonb not null default '[]', created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create index if not exists watchlist_user_time on watchlist_items(user_id,created_at desc);
create index if not exists watchlist_ticker_time on watchlist_items(ticker,created_at desc);
create index if not exists research_user_time on research_sessions(user_id,created_at desc);
create index if not exists research_ticker_time on research_sessions(primary_ticker,created_at desc);
create index if not exists evidence_session on research_evidence(session_id);
create index if not exists steps_session on research_steps(session_id);
create index if not exists journal_user_time on journal_entries(user_id,created_at desc);
create index if not exists journal_ticker_time on journal_entries(ticker,created_at desc);

alter table profiles enable row level security;
alter table preferences enable row level security;
alter table watchlist_items enable row level security;
alter table research_sessions enable row level security;
alter table research_evidence enable row level security;
alter table research_steps enable row level security;
alter table journal_entries enable row level security;

revoke all on profiles, preferences, watchlist_items, research_sessions, research_evidence, research_steps, journal_entries from anon, authenticated;

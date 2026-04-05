create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id bigserial primary key,
  external_id text unique not null,
  name text not null,
  firstname text,
  lastname text,
  nationality text,
  birth_date date,
  position text,
  photo_url text,
  team_external_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id bigserial primary key,
  external_id text unique not null,
  competition_external_id text,
  competition_name text,
  home_team_external_id text not null,
  home_team_name text not null,
  away_team_external_id text not null,
  away_team_name text not null,
  utc_date timestamptz not null,
  status text,
  season integer,
  stage text,
  matchday integer,
  venue text,
  home_score integer,
  away_score integer,
  created_at timestamptz not null default now()
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null check (entity_type in ('match','player','coach','club','competition','stadium')),
  entity_external_id text not null,
  rating integer not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entity_type, entity_external_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null check (entity_type in ('match','player','coach','club','competition','stadium')),
  entity_external_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create view public.entity_rating_summary as
select
  entity_type,
  entity_external_id,
  round(avg(rating)::numeric, 2) as avg_rating,
  count(*)::int as ratings_count
from public.ratings
group by entity_type, entity_external_id;

alter table public.profiles enable row level security;
alter table public.ratings enable row level security;
alter table public.comments enable row level security;

create policy "profiles are viewable by everyone" on public.profiles for select using (true);
create policy "users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "ratings are viewable by everyone" on public.ratings for select using (true);
create policy "users can insert own ratings" on public.ratings for insert with check (auth.uid() = user_id);
create policy "users can update own ratings" on public.ratings for update using (auth.uid() = user_id);

create policy "comments are viewable by everyone" on public.comments for select using (true);
create policy "users can insert own comments" on public.comments for insert with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (new.id, split_part(new.email, '@', 1), split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Database Schema Setup Script
-- Paste this script into the Supabase SQL Editor to create the leads table.

-- 1. Create leads table
create table public.leads (
  id bigint primary key,          -- Preserves exact lead IDs (1-600)
  target text not null,           -- estetica, realestate, dentisti, hotellerie, boutique, profumeria, artigianato, d2c
  name text not null,             -- Business or Doctor Name
  location text not null,         -- Location string
  phone text,                     -- Phone number
  email text,                     -- Email address
  instagram text,                 -- Instagram handle
  status text default 'new',      -- new, contacted, followup, booked, closed, lost
  notes text default ''           -- Closer's notes
);

-- 2. Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- 3. Create security policy
create policy "Allow public read-write for outreach team" 
on public.leads for all 
using (true) 
with check (true);

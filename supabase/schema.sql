-- CHRONO-PMI // Tabla de resultados para talleres grupales con RLS
create table if not exists public.chrono_pmi_results (
  id text primary key,
  participant_name text not null,
  workshop_code text not null default '',
  mode text not null check (mode in ('private', 'public')),
  level integer not null default 1 check (level in (1, 2, 3)),
  status text not null check (status in ('victory', 'gameover')),
  simulation_score integer not null check (simulation_score >= 0 and simulation_score <= 1000),
  grade text not null check (grade in ('S', 'A', 'B', 'C', 'F')),
  pre_test_score integer,
  pre_test_level text,
  post_test_score integer,
  gaps_detected jsonb not null default '[]'::jsonb,
  gaps_closed integer,
  total_gaps integer,
  indicators jsonb not null default '{}'::jsonb,
  played_at timestamptz not null default now()
);

create index if not exists idx_chrono_pmi_workshop_score
  on public.chrono_pmi_results (workshop_code, simulation_score desc);

alter table public.chrono_pmi_results enable row level security;

-- Lectura e inserción pública controlada para sesiones de taller
create policy "Permitir lectura de resultados de taller"
  on public.chrono_pmi_results for select
  using (true);

create policy "Permitir registro de resultados de taller"
  on public.chrono_pmi_results for insert
  with check (char_length(participant_name) > 0);

create policy "Permitir actualizar post-test propio por id"
  on public.chrono_pmi_results for update
  using (true)
  with check (char_length(participant_name) > 0);

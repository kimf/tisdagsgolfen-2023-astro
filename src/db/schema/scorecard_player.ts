// create table
//   public.scorecard_player (
//     id bigint generated by default as identity,
//     player_id uuid null,
//     scorecard_id bigint null,
//     created_at timestamp with time zone null default now(),
//     beers smallint null default '0'::smallint,
//     fines smallint null default '0'::smallint,
//     ciders smallint null default '0'::smallint,
//     constraint scorecard_player_pkey primary key (id),
//     constraint scorecard_player_player_id_fkey foreign key (player_id) references profiles (id),
//     constraint scorecard_player_scorecard_id_fkey foreign key (scorecard_id) references scorecards (id) on delete cascade
//   ) tablespace pg_default;

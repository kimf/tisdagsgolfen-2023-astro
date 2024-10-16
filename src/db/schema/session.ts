// create table
//   public.sessions (
//     id bigint generated by default as identity,
//     owner_id uuid not null default auth.uid (),
//     course_id bigint not null,
//     special boolean not null default false,
//     strokes boolean not null default false,
//     team_event boolean not null default false,
//     created_at timestamp with time zone not null default now(),
//     state text not null default 'STARTED'::text,
//     current_hole smallint not null default '1'::smallint,
//     part_of_final boolean not null default false,
//     constraint sessions_pkey primary key (id),
//     constraint sessions_course_id_fkey foreign key (course_id) references courses (id),
//     constraint sessions_owner_id_fkey foreign key (owner_id) references profiles (id)
//   ) tablespace pg_default;
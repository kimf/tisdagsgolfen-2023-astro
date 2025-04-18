// create table
//   public.events (
//     id bigint generated by default as identity,
//     created_at timestamp with time zone null default now(),
//     course_id bigint not null,
//     special boolean not null,
//     strokes boolean not null,
//     team_event boolean not null,
//     season_id bigint not null,
//     constraint events_pkey primary key (id),
//     constraint events_course_id_fkey foreign key (course_id) references courses (id),
//     constraint public_events_season_id_fkey foreign key (season_id) references season (id)
//   ) tablespace pg_default;

// create trigger "Rebuild Website on new Events"
// after insert
// or delete
// or
// update on events for each row
// execute function supabase_functions.http_request (
//   'https://api.vercel.com/v1/integrations/deploy/prj_hOvFuqL3aSRlue7RGyNYIqSaWIgp/CKnAqNMQSn',
//   'POST',
//   '{"Content-type":"application/json"}',
//   '{}',
//   '1000'
// );

// create table
//   public.profiles (
//     id uuid not null,
//     updated_at timestamp with time zone null,
//     full_name text null,
//     avatar_url text null,
//     guest boolean not null default false,
//     active boolean not null default true,
//     constraint profiles_pkey primary key (id),
//     constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
//   ) tablespace pg_default;

// create trigger before_profile_changes before delete
// or
// update of avatar_url on profiles for each row
// execute function delete_old_avatar ();
